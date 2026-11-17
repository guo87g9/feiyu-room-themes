// 水上乐园的离线单测：布局 / 滑道曲线 / 凹槽几何 / 主题字段 / 演出状态机 / 寻路。
// 不需要浏览器：THREE 只做几何与数学，DOM 用最小桩件。
import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from '../public/room/vendor/three.module.js';
import { createWaterparkWorld, WATERPARK_LAYOUT as S } from '../public/room/waterpark-world.js';
import { getWaterparkFraming } from '../public/room/waterpark-camera.js';
import { THEME_KEYS, THEMES } from '../public/room/theme.js';
import { HOME_LAYOUT, buildMapRoute } from '../src/home-state.js';

globalThis.document = { getElementById: () => null };
globalThis.innerWidth = 1280;
globalThis.innerHeight = 800;

const makeWorld = (theme = 'blue_white') => ({
  scene: new THREE.Scene(),
  theme: THEMES[theme],
  themeHandlers: [],
  quality: 'balanced'
});

test('泳池尺寸与客厅一致（4.2 × 7.6）', () => {
  const living = HOME_LAYOUT.rooms.find((r) => r.id === 'living').bounds;
  const lw = living[2] - living[0], ld = living[3] - living[1];
  const pw = S.pool.x1 - S.pool.x0, pd = S.pool.z1 - S.pool.z0;
  assert.equal(+pw.toFixed(2), +lw.toFixed(2), '泳池宽应等于客厅宽');
  assert.equal(+pd.toFixed(2), +ld.toFixed(2), '泳池深应等于客厅深');
});

test('水上乐园与菜园分居房子两侧', () => {
  const garden = HOME_LAYOUT.rooms.find((r) => r.id === 'garden');
  const park = HOME_LAYOUT.rooms.find((r) => r.id === 'waterpark');
  assert.ok(garden && park, '两块区域都要在布局里');
  assert.ok(park.bounds[1] >= 9, '乐园在 +z 侧（海侧）');
  assert.ok(garden.bounds[3] < 0, '菜园在 -z 侧（屋后）');
  assert.ok(park.bounds[1] > garden.bounds[3], '两者不重叠');
});

test('滑道曲线单调下降，且终点落在泳池水面之上', () => {
  const world = makeWorld();
  const wp = createWaterparkWorld(world, null, {});
  const curve = wp.slideCurve;
  const n = 60;
  let prevY = Infinity;
  for (let i = 0; i <= n; i++) {
    const y = curve.getPointAt(i / n).y;
    assert.ok(Number.isFinite(y), '曲线不能有 NaN');
    assert.ok(y <= prevY + 1e-6, `高度必须单调不升（t=${(i / n).toFixed(2)}）`);
    prevY = y;
  }
  const top = curve.getPointAt(0), end = curve.getPointAt(1);
  assert.ok(top.y > 4, '起点应在塔顶');
  assert.ok(end.y > S.pool.surface && end.y < 0.8, '终点悬在水面上方');
  assert.ok(end.x > S.pool.x0 && end.x < S.pool.x1, '终点 x 在池内');
  assert.ok(end.z > S.pool.z0 && end.z < S.pool.z1, '终点 z 在池内');
  assert.ok(curve.getLength() > 12, '滑道总长应大于 12m');
  wp.dispose();
});

test('U 型凹槽截面闭合且槽口朝上', () => {
  const world = makeWorld();
  const wp = createWaterparkWorld(world, null, {});
  const mesh = wp.group.children.find((c) => c.isMesh && c.geometry.attributes.position.count % 8 === 0 && c.geometry.index);
  assert.ok(mesh, '应存在凹槽网格');
  const pos = mesh.geometry.attributes.position.array;
  for (let i = 0; i < pos.length; i++) assert.ok(Number.isFinite(pos[i]), '顶点不得含 NaN');
  // 取第一个环，槽口两个顶点应高于槽底
  const ring = [];
  for (let i = 0; i < 8; i++) ring.push(new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]));
  const minY = Math.min(...ring.map((p) => p.y));
  const maxY = Math.max(...ring.map((p) => p.y));
  assert.ok(maxY - minY > 0.3, '截面应有明确的立壁高度');
  wp.dispose();
});

test('整块场地的网格不越出甲板范围', () => {
  const world = makeWorld();
  const wp = createWaterparkWorld(world, null, {});
  wp.group.updateMatrixWorld(true);
  const bad = [];
  wp.group.traverse((n) => {
    if (!n.isMesh) return;
    n.geometry.computeBoundingBox();
    const b = n.geometry.boundingBox.clone().applyMatrix4(n.matrixWorld);
    if (b.min.x < S.deck.x0 - 0.6 || b.max.x > S.deck.x1 + 0.6) bad.push(['x', n.geometry.type]);
    if (b.min.z < S.deck.z0 - 0.6 || b.max.z > S.deck.z1 + 0.6) bad.push(['z', n.geometry.type]);
  });
  assert.deepEqual(bad, [], '不应有飞出甲板的网格');
  wp.dispose();
});

test('四套主题都提供完整的水上乐园配色，且键位一致', () => {
  const base = Object.keys(THEMES.blue_white.waterpark).sort();
  assert.equal(base.length, 25, '字段数应为 25');
  for (const key of THEME_KEYS) {
    const wpTheme = THEMES[key].waterpark;
    assert.deepEqual(Object.keys(wpTheme).sort(), base, `${key} 字段应与默认一致`);
    for (const [k, v] of Object.entries(wpTheme)) {
      assert.equal(typeof v, 'number', `${key}.${k} 应是数值色值`);
      assert.ok(v >= 0 && v <= 0xffffff, `${key}.${k} 越界`);
    }
  }
});

test('换主题只改材质颜色，不重建实例', () => {
  const world = makeWorld();
  const wp = createWaterparkWorld(world, null, {});
  assert.equal(world.themeHandlers.length, 1, '应注册一个换肤回调');
  const slideMesh = wp.group.children.find((c) => c.isMesh && c.material && c.geometry.index);
  const matRef = slideMesh.material;
  const before = matRef.color.getHex();
  wp.setTheme(THEMES.forest);
  assert.equal(slideMesh.material, matRef, '材质实例必须复用（HC-9b）');
  const after = matRef.color.getHex();
  assert.notEqual(before, after, '颜色应随主题变化');
  wp.setTheme(THEMES.blue_white);
  assert.equal(matRef.color.getHex(), before, '切回应还原');
  wp.dispose();
  assert.equal(world.themeHandlers.length, 0, 'dispose 后应摘掉回调');
});

test('演出状态机：爬梯 → 下滑 → 入水 → 游泳', async () => {
  const { createWaterparkClient } = await import('../public/room/waterpark-client.js');
  const world = makeWorld();
  const camera = new THREE.PerspectiveCamera(40, 1.6, 0.1, 200);
  const client = createWaterparkClient({ world, renderer: null, camera });
  client.setOpen(true);
  client.startSlide(0);  // 固定时间基，别依赖 performance.now() 的绝对值
  const phases = new Set();
  let sawUnderwater = false;
  for (let t = 200; t <= 14000; t += 200) {
    const r = client.getRide(t, [8.2, 12.4]);
    assert.ok(r, '演出期间每帧都要有姿态');
    assert.ok(Number.isFinite(r.x) && Number.isFinite(r.z) && Number.isFinite(r.elev), '姿态数值必须有限');
    const st = client.inspect().ride;
    if (st) phases.add(st.kind + ':' + st.phase);
    if (r.swimming && r.elev < S.pool.surface) sawUnderwater = true;
    client.tick(t);
  }
  assert.ok([...phases].some((p) => p.includes('climb')), '应经历爬梯');
  assert.ok([...phases].some((p) => p.includes('slide')), '应经历下滑');
  assert.ok(sawUnderwater, '最终应没入水面以下（游泳）');
  const last = client.getRide(14000, [8.2, 12.4]);
  assert.ok(last.x > S.pool.x0 && last.x < S.pool.x1, '游泳点在池内 x');
  assert.ok(last.z > S.pool.z0 && last.z < S.pool.z1, '游泳点在池内 z');
  client.cancelRide();
  assert.equal(client.getRide(15000, [8.2, 12.4]), null, '取消后应把控制权交回');
  client.dispose();
});

test('从客厅能寻路走到泳池 / 滑梯 / 躺椅区', () => {
  const from = [6.3, 5.12];
  for (const target of [[6.6, 18.4], [2.6, 20.8], [10.6, 21.2], [6.2, 13.2]]) {
    const route = buildMapRoute(from, { pos: target }, performance.now());
    assert.ok(route?.points?.length >= 3, `${JSON.stringify(target)} 应有可达路线`);
    const end = route.points[route.points.length - 1];
    assert.ok(Math.hypot(end[0] - target[0], end[1] - target[1]) < 0.01, '末点应落在目标上');
  }
});

test('取景计算在各分辨率下都给出有效半径', () => {
  for (const [w, h] of [[1920, 1080], [1600, 1000], [1366, 768], [390, 844], [768, 1024]]) {
    const f = getWaterparkFraming(w, h);
    assert.ok(Number.isFinite(f.radius) && f.radius > 8 && f.radius < 160, `${w}x${h} 半径应在合理区间`);
    assert.ok(Number.isFinite(f.offsetX) && Number.isFinite(f.offsetY));
    assert.ok(f.elev > 0.5 && f.elev < 1.1);
  }
});

// ── QQ 指令链路（桥接端 /api/socialV2/home-action → applyHomeAction → advance → homeView）──
import { applyHomeAction, advanceHomeState, emptyHomeState, homeView } from '../src/home-state.js';

const T0 = 1_700_000_000_000;
const tick = (s, now) => advanceHomeState(s, now, { gardenReady: false }).state;

test('QQ 指令：waterpark/slide 会走到滑梯下并下发演出', () => {
  let s = emptyHomeState(T0);
  const r = applyHomeAction(s, { action: 'waterpark', ride: 'slide', at: T0 + 1000, by: 'QQ 小蓝鱼' });
  assert.equal(r.changed, true, '动作应生效');
  assert.match(r.event.text, /滑滑梯/);
  s = r.state;
  assert.equal(s.command.room, 'waterpark');
  assert.equal(s.command.spot, 'slide');
  assert.equal(s.waterparkRide.kind, 'slide');
  assert.ok(s.waterparkRide.token, '必须带 token 供客户端去重');

  let now = T0 + 1000, arrivedAt = 0;
  for (let i = 0; i < 60; i++) {
    now += 1000;
    s = tick(s, now);
    const v = homeView(s, now, {});
    if (!v.her.walking && v.her.pos[1] > 20 && !arrivedAt) arrivedAt = now - T0;
    if (arrivedAt) break;
  }
  assert.ok(arrivedAt > 0, '应走到乐园内（z > 20）');
  const v = homeView(s, now, {});
  assert.equal(v.her.room, 'waterpark', '到位后房间应为水上乐园');
  assert.equal(v.her.spot, 'slide');
  assert.ok(Math.hypot(v.her.pos[0] - 6.4, v.her.pos[1] - 24.2) < 0.3, '应停在滑梯下');
  assert.equal(v.her.waterparkRide.kind, 'slide', '视图要带演出指令给前端');
});

test('QQ 指令：waterpark/swim 去泳池边', () => {
  let s = emptyHomeState(T0);
  s = applyHomeAction(s, { action: 'waterpark', ride: 'swim', at: T0 + 1000 }).state;
  assert.equal(s.command.spot, 'pool');
  assert.equal(s.waterparkRide.kind, 'swim');
  let now = T0 + 1000;
  for (let i = 0; i < 60; i++) { now += 1000; s = tick(s, now); }
  const v = homeView(s, now, {});
  assert.equal(v.her.room, 'waterpark');
  assert.ok(Math.hypot(v.her.pos[0] - 6.6, v.her.pos[1] - 21.0) < 0.4, '应停在泳池边');
});

test('演出指令有有效期，过期后视图不再下发', () => {
  let s = emptyHomeState(T0);
  s = applyHomeAction(s, { action: 'waterpark', ride: 'slide', at: T0 + 1000 }).state;
  assert.ok(homeView(s, T0 + 5000, {}).her.waterparkRide, '5 秒内应有效');
  assert.equal(homeView(s, T0 + 3 * 60_000, {}).her.waterparkRide, null, '3 分钟后应失效');
});

test('换动作会清掉未播完的演出指令', () => {
  let s = emptyHomeState(T0);
  s = applyHomeAction(s, { action: 'waterpark', ride: 'slide', at: T0 + 1000 }).state;
  assert.ok(s.waterparkRide);
  s = applyHomeAction(s, { action: 'go', pos: [6.3, 3.0], at: T0 + 2000 }).state;
  assert.equal(s.waterparkRide, null, 'go 应清掉演出');
  s = applyHomeAction(s, { action: 'waterpark', ride: 'swim', at: T0 + 3000 }).state;
  s = applyHomeAction(s, { action: 'sleep', at: T0 + 4000 }).state;
  assert.equal(s.waterparkRide, null, 'sleep 应清掉演出');
});

test('睡着时 waterpark 指令不生效', () => {
  // asleep 由状态机推导（sleepPending + 到床），不能直接赋值，这里走真实路径。
  let s = emptyHomeState(T0);
  s = applyHomeAction(s, { action: 'sleep', at: T0 + 1000 }).state;
  let now = T0 + 1000;
  for (let i = 0; i < 90 && !s.asleep; i++) { now += 1000; s = tick(s, now); }
  assert.equal(s.asleep, true, '应已睡着');
  const r = applyHomeAction(s, { action: 'waterpark', ride: 'slide', at: now + 1000 });
  assert.equal(r.changed, false);
  assert.equal(r.state.waterparkRide, null);
});

test('waterpark 位置已进入提示词可选范围', async () => {
  const { listSpots } = await import('../src/home-state.js');
  const keys = listSpots().map((s) => s.key);
  for (const k of ['waterpark.deck', 'waterpark.pool', 'waterpark.slide', 'waterpark.lounge']) {
    assert.ok(keys.includes(k), `${k} 应可供 QQ 侧 command 使用`);
  }
});

test('端到端：QQ 下发的 waterparkRide 能驱动客户端演出', async () => {
  const { createWaterparkClient } = await import('../public/room/waterpark-client.js');

  // 1) 服务端：走指令 → 走到位
  let s = emptyHomeState(T0);
  s = applyHomeAction(s, { action: 'waterpark', ride: 'slide', at: T0 + 1000, by: 'QQ 小蓝鱼' }).state;
  let now = T0 + 1000;
  for (let i = 0; i < 60; i++) { now += 1000; s = tick(s, now); const h = homeView(s, now, {}).her; if (!h.walking && h.pos[1] > 20) break; }
  const her = homeView(s, now, {}).her;
  assert.equal(her.room, 'waterpark');
  assert.ok(her.waterparkRide, '服务端应下发演出指令');

  // 2) 客户端：喂同一份 her，演出应自动启动并跑到游泳
  const world = makeWorld();
  const camera = new THREE.PerspectiveCamera(40, 1.6, 0.1, 200);
  const client = createWaterparkClient({ world, renderer: null, camera });
  client.syncState(her, 0);
  assert.equal(client.isOpen, true, '远程指令应自动打开乐园视图');
  assert.ok(client.inspect().ride, '应已开始演出');

  let sawSwim = false, sawSlide = false;
  for (let t = 100; t <= 13000; t += 100) {
    const r = client.getRide(t, her.pos);
    assert.ok(r, '演出进行中应有姿态');
    if (r.swimming) sawSwim = true;
    const st = client.inspect().ride;
    if (st && st.phase === 'slide') sawSlide = true;
    client.tick(t);
  }
  assert.ok(sawSlide, '应经历下滑阶段');
  assert.ok(sawSwim, '最终应入水游泳');

  // 3) 同一 token 不重复触发（inspect() 每次是新对象，只能比对字段）
  const before = client.inspect().ride;
  client.syncState(her, 20000);
  const after = client.inspect().ride;
  assert.equal(after.kind, before.kind, '同一 token 不应重开一段演出');
  assert.equal(after.phase, before.phase, '阶段不应被重置');
  client.dispose();
});

test('滑梯整组结构可点击：沿曲线与塔/楼梯打射线必须命中 slide 热区', () => {
  const world = makeWorld();
  const wp = createWaterparkWorld(world, null, {});
  wp.group.updateMatrixWorld(true);
  const ray = new THREE.Raycaster();
  const down = new THREE.Vector3(0, -1, 0);
  const probe = (x, y, z) => {
    ray.set(new THREE.Vector3(x, y, z), down);
    return ray.intersectObjects(wp.pickables, true)[0];
  };
  const miss = [];
  // 沿滑道整条曲线取样（覆盖盘旋段与出水段）
  for (let i = 0; i <= 24; i++) {
    const p = wp.slideCurve.getPointAt(i / 24);
    const hit = probe(p.x, p.y + 2.4, p.z);
    const tag = hit?.object?.userData?.waterparkPick;
    if (tag !== 'slide') miss.push(`curve@${(i / 24).toFixed(2)}→${tag || 'none'}`);
  }
  // 塔顶平台、两跑楼梯、连桥
  for (const p of [[2.6, 6.0, 20.8], [6.4, 5.2, 24.2], [3.4, 5.2, 24.2], [5.4, 5.2, 24.2]]) {
    const hit = probe(p[0], p[1], p[2]);
    const tag = hit?.object?.userData?.waterparkPick;
    if (tag !== 'slide') miss.push(`struct${JSON.stringify(p)}→${tag || 'none'}`);
  }
  assert.deepEqual(miss, [], '这些位置点不中滑梯：' + miss.join('; '));

  // 水面仍然归 water，不能被滑梯热区吞掉
  const w = probe(6.6, 3.0, 15.5);
  assert.equal(w?.object?.userData?.waterparkPick, 'water', '点水面应判定为下水');
  wp.dispose();
});

test('不在乐园视角时也能点中甲板，泳池标记为 pool', async () => {
  const { createWaterparkClient } = await import('../public/room/waterpark-client.js');
  // 模拟小屋视角：从房子上方看向海侧甲板
  const cam = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 200);
  cam.position.set(6.3, 15, 3.0);
  cam.lookAt(6.3, 0.6, 16.5);
  cam.updateMatrixWorld(true); cam.updateProjectionMatrix();
  const client = createWaterparkClient({ world: makeWorld('blue_white'), renderer: null, camera: cam });

  const toScreen = (x, y, z) => {
    const v = new THREE.Vector3(x, y, z).project(cam);
    return { clientX: (v.x * 0.5 + 0.5) * innerWidth, clientY: (-v.y * 0.5 + 0.5) * innerHeight };
  };

  const deck = client.pickDeck(toScreen(2.0, 0.02, 22.0));
  assert.ok(deck?.pos, '甲板点应能被拾取');
  assert.ok(Math.hypot(deck.pos[0] - 2.0, deck.pos[1] - 22.0) < 0.35, `甲板落点偏差过大：${deck.pos}`);

  const pool = client.pickDeck(toScreen(6.6, 0.02, 16.8));
  assert.equal(pool?.pool, true, '泳池内应标记为 pool');

  assert.equal(client.pickDeck(toScreen(6.3, 0.02, 4.0)), null, '房子方向不应算作甲板');
  assert.equal(client.pickDeck(toScreen(6.3, 0.02, 26.5)), null, '甲板外海面不应可点');
  client.dispose();
});

// ── 泳池绕行 ────────────────────────────────────────────────────────────────
import { normalizeFreePoint, listSpots, HOME_NODES } from '../src/home-state.js';
import { WATERPARK_LAYOUT as WP } from '../public/room/waterpark-world.js';

const POOL_RECT = HOME_LAYOUT.waterparkPool;
const inPool = (p) => p[0] > POOL_RECT.x0 && p[0] < POOL_RECT.x1 && p[1] > POOL_RECT.z0 && p[1] < POOL_RECT.z1;
function segCrossEdge(p, q, a, b) {
  const d = (q[0] - p[0]) * (b[1] - a[1]) - (q[1] - p[1]) * (b[0] - a[0]);
  if (Math.abs(d) < 1e-12) return false;
  const t = ((a[0] - p[0]) * (b[1] - a[1]) - (a[1] - p[1]) * (b[0] - a[0])) / d;
  const u = ((a[0] - p[0]) * (q[1] - p[1]) - (a[1] - p[1]) * (q[0] - p[0])) / d;
  return t > 1e-9 && t < 1 - 1e-9 && u > 1e-9 && u < 1 - 1e-9;
}
function routeCrossesPool(points) {
  const c = [[POOL_RECT.x0, POOL_RECT.z0], [POOL_RECT.x1, POOL_RECT.z0], [POOL_RECT.x1, POOL_RECT.z1], [POOL_RECT.x0, POOL_RECT.z1]];
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1], q = points[i];
    if (inPool(p) || inPool(q)) return true;
    for (let k = 0; k < 4; k++) if (segCrossEdge(p, q, c[k], c[(k + 1) % 4])) return true;
  }
  return false;
}

test('服务端泳池矩形与前端场景一致', () => {
  assert.deepEqual(
    { x0: POOL_RECT.x0, z0: POOL_RECT.z0, x1: POOL_RECT.x1, z1: POOL_RECT.z1 },
    { x0: WP.pool.x0, z0: WP.pool.z0, x1: WP.pool.x1, z1: WP.pool.z1 },
    'HOME_LAYOUT.waterparkPool 必须与 WATERPARK_LAYOUT.pool 相同'
  );
});

test('没有路点落在泳池水面里', () => {
  const bad = Object.entries(HOME_NODES).filter(([id, p]) => id.startsWith('wp_') && inPool(p));
  assert.deepEqual(bad.map(([id]) => id), [], '这些路点在水中，会导致「从水面上跑过去」');
});

test('水上乐园内部任意两个站位之间都不跨泳池', () => {
  const spots = listSpots().filter((s) => s.room === 'waterpark');
  assert.equal(spots.length, 4);
  for (const a of spots) {
    for (const b of spots) {
      if (a.key >= b.key) continue;
      const route = buildMapRoute(a.pos, { room: b.room, spot: b.spot }, T0);
      assert.ok(route, `${a.key} → ${b.key} 没有路线`);
      assert.equal(routeCrossesPool(route.points), false, `${a.key} → ${b.key} 穿过了泳池`);
    }
  }
});

test('从屋里走到乐园任意位置也绕开泳池', () => {
  for (const sp of listSpots().filter((s) => s.room === 'waterpark')) {
    const route = buildMapRoute([6.3, 5.12], { room: sp.room, spot: sp.spot }, T0);
    assert.ok(route, `${sp.key} 没有路线`);
    assert.equal(routeCrossesPool(route.points), false, `客厅 → ${sp.key} 穿过了泳池`);
  }
});

test('泳池水面不接受落点，甲板照常接收', () => {
  assert.equal(normalizeFreePoint([6.6, 18.4]), null, '池心不应可站立');
  assert.equal(normalizeFreePoint([4.9, 19.0]), null, '池内靠边也不应可站立');
  assert.deepEqual(normalizeFreePoint([6.6, 21.2]), [6.6, 21.2], '池边应可站立');
  assert.deepEqual(normalizeFreePoint([2.0, 22.0]), [2.0, 22.0], '甲板应可站立');
});

test('点滑梯：人远时先走过去，到位后才开始爬梯（不瞬移）', async () => {
  const { createWaterparkClient } = await import('../public/room/waterpark-client.js');
  const world = makeWorld();
  const cam = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 200);
  cam.position.set(6.5, 16, 25);
  cam.lookAt(5.0, 1.0, 19);
  cam.updateMatrixWorld(true); cam.updateProjectionMatrix();

  const goCalls = [];
  const client = createWaterparkClient({ world, renderer: null, camera: cam, onGo: (p) => goCalls.push(p) });
  client.setOpen(true);

  // 她站在甲板东侧，离楼梯脚很远
  client.syncState({ room: 'waterpark', walking: false, pos: [10.6, 21.2] }, 0);

  // 点滑道
  const p = new THREE.Vector3(2.6, 4.6, 20.8).project(cam); // 瞄准塔身拾取盒中心
  const screen = { clientX: (p.x * 0.5 + 0.5) * innerWidth, clientY: (-p.y * 0.5 + 0.5) * innerHeight };
  client.handlePointer(screen, 100);

  assert.equal(client.inspect().ride, null, '人还远时不应立刻开演');
  assert.equal(client.inspect().pendingSlide, true, '应记下这次点击等落地');
  assert.equal(goCalls.length, 1, '应下发一次走过去');
  assert.ok(Math.hypot(goCalls[0][0] - 6.4, goCalls[0][1] - 24.2) < 0.2, `应走向楼梯脚，实际 ${goCalls[0]}`);

  // 路上：仍然不开演
  client.syncState({ room: 'waterpark', walking: true, pos: [8.0, 23.0] }, 400);
  assert.equal(client.inspect().ride, null, '路上不应开演');

  // 到位
  client.syncState({ room: 'waterpark', walking: false, pos: [6.4, 24.2] }, 800);
  const st = client.inspect();
  assert.equal(st.pendingSlide, false, '到位后应消费掉待办');
  assert.equal(st.ride?.kind, 'slide', '到位后才开始爬梯');
  assert.equal(st.ride?.phase, 'climb');

  // 起手位置必须在楼梯脚附近，而不是她原来站的地方（即没有瞬移）
  const start = client.getRide(820, [6.4, 24.2]);
  assert.ok(Math.hypot(start.x - 6.4, start.z - 24.2) < 1.0, `起点应在楼梯脚，实际 ${start.x.toFixed(2)},${start.z.toFixed(2)}`);
  client.dispose();
});
