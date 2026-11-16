// 水上乐园的交互层：进入/退出、点滑道上滑、点水面下水、桌宠沿曲线下坠与游泳。
// 与菜园控制器同构，但不依赖服务端玩法数据 —— 这里只有客户端演出 + 落点同步。
import * as THREE from './vendor/three.module.js';
import { createWaterparkWorld, WATERPARK_LAYOUT as S } from './waterpark-world.js';

const CLIMB_MS = 3400;
const SLIDE_MS = 4200;
const SPLASH_MS = 620;
const ENTER_MS = 900;
const SWIM_ELEV = -0.68;

const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function createWaterparkClient({ world, renderer, camera, onOpen, onClose, onSettle }) {
  const model = createWaterparkWorld(world, renderer, { quality: world.quality });
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let opened = false;
  let ride = null;
  let swimSpot = { x: S.slideExit.x + 0.4, z: S.slideExit.z - 0.6 };

  // 水花：复用一组 Points，落在滑道出口 / 入水点。
  const splashGeo = new THREE.BufferGeometry();
  const SPLASH_N = 30;
  const splashPos = new Float32Array(SPLASH_N * 3);
  splashGeo.setAttribute('position', new THREE.BufferAttribute(splashPos, 3));
  const splashMat = new THREE.PointsMaterial({
    color: 0xdff4ff, size: 0.09, transparent: true, opacity: 0, depthWrite: false
  });
  const splash = new THREE.Points(splashGeo, splashMat);
  splash.frustumCulled = false;
  splash.visible = false;
  world.scene.add(splash);
  let splashAt = 0, splashOrigin = [0, 0, 0];

  function burst(x, y, z, now) {
    splashOrigin = [x, y, z];
    splashAt = now;
    splash.visible = true;
    splash.position.set(x, y, z);
  }

  // 爬梯路径：平台 → 楼梯 → 连桥 → 滑道入口。
  const climbPath = [
    [6.4, 0.02, 24.2], [4.0, 2.3, 24.2], [2.6, 4.34, 24.2],
    [S.tower.x, 4.34, S.tower.z + 1.4], [S.tower.x, 4.3, S.tower.z - 1.32]
  ];

  function startSlide(now, source = 'click') {
    ride = { kind: 'slide', phase: 'climb', t0: now, from: null, source };
    splash.visible = false;
  }

  function startSwim(now, from, source = 'click') {
    ride = { kind: 'swim', phase: 'enter', t0: now, from: from || null, source };
    splash.visible = false;
  }

  // QQ 侧指令：服务端下发 her.waterparkRide 后，等她自己走到位再播演出。
  // token 去重，避免每次快照都重播；只有 state 来源的演出会被状态清除打断。
  let lastRideToken = '';
  function syncState(her, now) {
    const cmd = her?.waterparkRide;
    if (!cmd || !cmd.token) return;
    if (cmd.token === lastRideToken) return;
    if (her.walking) return;            // 还在路上，等落地再开始
    if (her.room !== 'waterpark') return;
    lastRideToken = cmd.token;
    if (!opened) setOpen(true);
    if (cmd.kind === 'swim') {
      swimSpot = { x: S.poolEdge.x - 0.6, z: S.poolEdge.z - 1.6 };
      startSwim(now, null, 'state');
    } else {
      startSlide(now, 'state');
    }
  }

  function cancelRide() {
    if (!ride) return false;
    ride = null;
    splash.visible = false;
    splashMat.opacity = 0;
    return true;
  }

  /** 每帧取当前演出姿态；null 表示交回原有移动系统。 */
  function getRide(now, currentPos) {
    if (!ride) return null;
    const dt = now - ride.t0;
    if (ride.kind === 'slide') {
      if (ride.phase === 'climb') {
        // 起点取桌宠当前站位；若人还在屋里，就从楼梯脚下开始（避免穿墙直线飞过去）。
        if (!ride.from) {
          const inArea = currentPos && currentPos[1] >= S.deck.z0 - 0.4 && currentPos[1] <= S.deck.z1 + 0.4;
          ride.from = inArea ? [currentPos[0], currentPos[1]] : [climbPath[0][0], climbPath[0][2]];
        }
        const path = [[ride.from[0], 0.02, ride.from[1]], ...climbPath];
        const t = Math.min(1, dt / CLIMB_MS);
        const seg = t * (path.length - 1);
        const i = Math.min(path.length - 2, Math.floor(seg));
        const k = easeInOut(seg - i);
        const a = path[i], b = path[i + 1];
        if (t >= 1) { ride.phase = 'slide'; ride.t0 = now; }
        return {
          x: lerp(a[0], b[0], k), z: lerp(a[2], b[2], k), elev: lerp(a[1], b[1], k),
          pose: 'stand', swimming: false, walking: true,
          facing: Math.atan2(b[0] - a[0], -(b[2] - a[2])) * 180 / Math.PI
        };
      }
      if (ride.phase === 'slide') {
        const t = Math.min(1, dt / SLIDE_MS);
        const p = model.slideCurve.getPointAt(t);
        const tan = model.slideCurve.getTangentAt(Math.min(0.999, t));
        if (t >= 1) {
          ride.phase = 'splash'; ride.t0 = now;
          burst(p.x, S.pool.surface + 0.05, p.z, now);
        }
        return {
          x: p.x, z: p.z, elev: p.y + 0.15, pose: 'stand', swimming: false,
          facing: Math.atan2(tan.x, -tan.z) * 180 / Math.PI
        };
      }
      if (ride.phase === 'splash') {
        const t = Math.min(1, dt / SPLASH_MS);
        const end = model.slideCurve.getPointAt(1);
        // 入水完成后必须显式切到 swim，否则会停在落水点不再起伏。
        if (t >= 1) {
          swimSpot = { x: end.x + 0.3, z: end.z - 0.5 };
          ride = { kind: 'swim', phase: 'swim', t0: now };
          return swimPose(now, swimSpot);
        }
        return {
          x: end.x, z: end.z, elev: lerp(end.y + 0.15, SWIM_ELEV, t), pose: 'stand', swimming: true,
          facing: 200
        };
      }
      // 兜底：非预期阶段直接转入游泳
      swimSpot = { x: model.slideCurve.getPointAt(1).x + 0.3, z: model.slideCurve.getPointAt(1).z - 0.5 };
      ride = { kind: 'swim', phase: 'swim', t0: now };
      return swimPose(now, swimSpot);
    }
    if (ride.phase === 'enter') {
      const t = Math.min(1, dt / ENTER_MS);
      const from = ride.from || currentPos || [swimSpot.x, swimSpot.z];
      if (t >= 1) { ride.phase = 'swim'; ride.t0 = now; }
      return {
        x: lerp(from[0], swimSpot.x, easeInOut(t)),
        z: lerp(from[1], swimSpot.z, easeInOut(t)),
        elev: lerp(0.02, SWIM_ELEV, easeInOut(t)),
        pose: 'stand', swimming: true, facing: 200
      };
    }
    return swimPose(now, swimSpot);
  }

  function swimPose(now, spot) {
    const t = now * 0.001;
    return {
      x: spot.x + Math.sin(t * 0.65) * 0.5,
      z: spot.z + Math.cos(t * 0.48) * 0.34,
      elev: SWIM_ELEV + Math.sin(t * 1.9) * 0.05,
      pose: 'stand', swimming: true,
      facing: 180 + Math.sin(t * 0.6) * 30
    };
  }

  function isSwimming() {
    return !!ride && (ride.kind === 'swim' || ride.phase === 'splash');
  }

  function setOpen(value) {
    opened = !!value;
    const chip = document.getElementById('waterparkChip');
    if (chip) {
      const label = opened ? '返回小屋' : '进入水上乐园';
      chip.textContent = (opened ? '🏡 ' : '🛝 ') + label;
      chip.setAttribute('aria-label', label);
      chip.setAttribute('aria-pressed', String(opened));
      chip.title = opened ? '返回小蓝鱼的小屋' : '去屋前的水上乐园';
    }
    if (opened) onOpen?.();
    else { cancelRide(); onClose?.(); }
  }

  /** 点中滑道 → 上滑梯；点中水面 → 下水。返回 true 表示已消费该次点击。 */
  function handlePointer(e) {
    if (!opened) return false;
    ndc.set(e.clientX / innerWidth * 2 - 1, -e.clientY / innerHeight * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(model.pickables, true)[0];
    if (!hit) return false;
    const now = performance.now();
    if (hit.object === model.pickables[0]) { startSlide(now); return true; }
    if (hit.object === model.pickables[1]) {
      swimSpot = { x: hit.point.x, z: hit.point.z };
      startSwim(now, null);
      onSettle?.(S.poolEdge.x, S.poolEdge.z);
      return true;
    }
    return false;
  }

  function tick(now) {
    model.update(now);
    if (splashAt) {
      const t = (now - splashAt) / 900;
      if (t >= 1) { splashAt = 0; splash.visible = false; splashMat.opacity = 0; }
      else {
        for (let i = 0; i < SPLASH_N; i++) {
          const a = i * 2.39996, r = 0.1 + (i % 6) * 0.12;
          splashPos[i * 3] = Math.cos(a) * r * (0.4 + t);
          splashPos[i * 3 + 1] = Math.sin(t * Math.PI) * (0.55 + (i % 4) * 0.16);
          splashPos[i * 3 + 2] = Math.sin(a) * r * (0.4 + t);
        }
        splashGeo.attributes.position.needsUpdate = true;
        splashMat.opacity = 1 - t;
      }
    }
  }

  return {
    get isOpen() { return opened; },
    setOpen,
    toggle: () => setOpen(!opened),
    handlePointer,
    tick,
    getRide,
    isSwimming,
    syncState,
    startSlide: () => startSlide(performance.now()),
    startSwim: () => startSwim(performance.now(), null),
    cancelRide,
    exitWater: () => { ride = null; onSettle?.(S.poolEdge.x, S.poolEdge.z); },
    inspect: () => ({ open: opened, ride: ride && { kind: ride.kind, phase: ride.phase }, ...model.inspect() }),
    dispose() {
      world.scene.remove(splash);
      splashGeo.dispose(); splashMat.dispose();
      model.dispose();
    }
  };
}
