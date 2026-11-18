// 水上乐园：位于房子 +z 侧（与 -z 的菜园分居两侧），甲板伸出海面。
// 结构：木板甲板 → 泳池（客厅尺寸 4.2×7.6）→ 螺旋滑梯塔 + U 型凹槽滑道。
// 与菜园同构：只把主题色写进材质实例，换主题只改 .color，不重建几何（HC-9b）。
import * as THREE from './vendor/three.module.js';
import { getTheme } from './theme.js';

// 供 app / 客户端共用的世界坐标定义。
export const WATERPARK_LAYOUT = Object.freeze({
  deck: { x0: -1.0, z0: 9.0, x1: 15.0, z1: 25.0, y: 0.02 },
  // 客厅 bounds 为 4.2 × 7.6，泳池按同一尺寸下挖。
  pool: { x0: 4.5, z0: 13.0, x1: 8.7, z1: 20.6, surface: -0.18, floor: -1.36, wall: 0.24 },
  tower: { x: 2.6, z: 20.8, top: 4.32, column: 0.3, platform: 1.3 },
  slide: { a0: -Math.PI / 2, turns: 1.0, top: 4.28, drop: 3.44 },
  // 桌宠下水/上岸用的池边点（脚底坐标）。
  poolEdge: { x: 6.6, z: 21.0 },
  slideExit: { x: 5.6, z: 17.4 },
  lounge: { x: 10.6, z: 21.2 }
});

const S = WATERPARK_LAYOUT;

/** 圆角多边形：把折线的每个尖角替换成二次贝塞尔圆角。 */
function roundPoly(pts, radius, seg = 4) {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    const v1 = new THREE.Vector2(p0.x - p1.x, p0.y - p1.y);
    const v2 = new THREE.Vector2(p2.x - p1.x, p2.y - p1.y);
    const l1 = v1.length(), l2 = v2.length();
    if (l1 < 1e-6 || l2 < 1e-6) { out.push(p1.clone()); continue; }
    const rr = Math.min(radius, l1 * 0.45, l2 * 0.45);
    v1.divideScalar(l1); v2.divideScalar(l2);
    const a = new THREE.Vector2(p1.x + v1.x * rr, p1.y + v1.y * rr);
    const b = new THREE.Vector2(p1.x + v2.x * rr, p1.y + v2.y * rr);
    for (let s = 0; s <= seg; s++) {
      const t = s / seg, it = 1 - t;
      out.push(new THREE.Vector2(
        it * it * a.x + 2 * it * t * p1.x + t * t * b.x,
        it * it * a.y + 2 * it * t * p1.y + t * t * b.y
      ));
    }
  }
  return out;
}

/** 沿曲线扫掠闭合截面，帧不做滚转（up 恒为世界上方投影），保证凹槽始终朝上。 */
function sweepClosed(curve, profile, steps, material) {
  const pos = [], idx = [];
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3(), upv = new THREE.Vector3();
  const m = profile.length;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const P = curve.getPointAt(t);
    const T = curve.getTangentAt(t).normalize();
    right.crossVectors(T, up);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
    right.normalize();
    upv.crossVectors(right, T).normalize();
    for (const q of profile) {
      pos.push(
        P.x + right.x * q.x + upv.x * q.y,
        P.y + right.y * q.x + upv.y * q.y,
        P.z + right.z * q.x + upv.z * q.y
      );
    }
  }
  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < m; j++) {
      const a = i * m + j, b = i * m + (j + 1) % m;
      const c = (i + 1) * m + j, d = (i + 1) * m + (j + 1) % m;
      idx.push(a, c, b, b, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return new THREE.Mesh(g, material);
}

/** 开口带状面（用于滑道内水流），2 点截面。 */
function sweepRibbon(curve, halfW, lift, steps, material) {
  const pos = [], idx = [];
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3(), upv = new THREE.Vector3();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const P = curve.getPointAt(t);
    const T = curve.getTangentAt(t).normalize();
    right.crossVectors(T, up);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
    right.normalize();
    upv.crossVectors(right, T).normalize();
    for (const s of [-1, 1]) {
      pos.push(
        P.x + right.x * halfW * s + upv.x * lift,
        P.y + right.y * halfW * s + upv.y * lift,
        P.z + right.z * halfW * s + upv.z * lift
      );
    }
  }
  for (let i = 0; i < steps; i++) {
    const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return new THREE.Mesh(g, material);
}

/** 沿曲线取偏移点，用于护栏 / 立柱。 */
function offsetPoints(curve, pr, pu, steps) {
  const pts = [];
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3(), upv = new THREE.Vector3();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const P = curve.getPointAt(t);
    const T = curve.getTangentAt(t).normalize();
    right.crossVectors(T, up);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
    right.normalize();
    upv.crossVectors(right, T).normalize();
    pts.push(new THREE.Vector3(
      P.x + right.x * pr + upv.x * pu,
      P.y + right.y * pr + upv.y * pu,
      P.z + right.z * pr + upv.z * pu
    ));
  }
  return pts;
}

export function createWaterparkWorld(world, renderer, { quality = 'balanced' } = {}) {
  const group = new THREE.Group();
  group.name = 'feiyu-waterpark';
  world.scene.add(group);
  const W = (world.theme || getTheme()).waterpark;

  const own = new Set();
  const mat = (color, roughness = 0.82, extra = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, ...extra });
    own.add(m);
    return m;
  };
  const basic = (color, extra = {}) => {
    const m = new THREE.MeshBasicMaterial({ color, ...extra });
    own.add(m);
    return m;
  };

  // 键名与主题字段一一对应，供 themeHandler 直接按 key 回填。
  const M = {
    deck: mat(W.deck, 0.86), deckDark: mat(W.deckDark, 0.9), deckEdge: mat(W.deckEdge, 0.8),
    tile: mat(W.tile, 0.55), tileDark: mat(W.tileDark, 0.6), coping: mat(W.coping, 0.5),
    slide: mat(W.slide, 0.34, { side: THREE.DoubleSide, envMapIntensity: 0.55 }),
    slideInner: mat(W.slideInner, 0.28, { side: THREE.DoubleSide, envMapIntensity: 0.6 }),
    rail: mat(W.rail, 0.22, { transparent: true, opacity: 0.55, side: THREE.DoubleSide }),
    railPost: mat(W.railPost, 0.45),
    tower: mat(W.tower, 0.78), towerDark: mat(W.towerDark, 0.8),
    lounge: mat(W.lounge, 0.9), umbrella: mat(W.umbrella, 0.85), umbrellaAlt: mat(W.umbrellaAlt, 0.85),
    ring: mat(W.ring, 0.6), ladder: mat(W.ladder, 0.35, { metalness: 0.5 }),
    signBg: mat(W.signBg, 0.8), signFg: basic(W.signFg)
  };
  const waterMat = new THREE.MeshStandardMaterial({
    color: W.water, roughness: 0.14, metalness: 0.05,
    transparent: true, opacity: 0.78, envMapIntensity: 0.85
  });
  own.add(waterMat);
  const deepMat = mat(W.waterDeep, 0.9);
  const foamMat = mat(W.foam, 0.4, { transparent: true, opacity: 0.85 });

  // ── 甲板（在泳池位置开洞） ──────────────────────────────────────────────
  const deckW = S.deck.x1 - S.deck.x0, deckD = S.deck.z1 - S.deck.z0;
  const deckCx = (S.deck.x0 + S.deck.x1) / 2, deckCz = (S.deck.z0 + S.deck.z1) / 2;
  // 洞口比池壁外沿再放一点，避免甲板边缘盖住池沿压条。
  const hole = {
    x0: S.pool.x0 - S.pool.wall - 0.02, x1: S.pool.x1 + S.pool.wall + 0.02,
    z0: S.pool.z0 - S.pool.wall - 0.02, z1: S.pool.z1 + S.pool.wall + 0.02
  };
  const addSlab = (x0, x1, z0, z1) => {
    const w = x1 - x0, d = z1 - z0;
    if (w <= 0.01 || d <= 0.01) return null;
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.34, d), M.deck);
    m.position.set((x0 + x1) / 2, S.deck.y - 0.17, (z0 + z1) / 2);
    m.receiveShadow = true;
    group.add(m);
    return m;
  };
  addSlab(S.deck.x0, S.deck.x1, S.deck.z0, hole.z0);   // 北
  addSlab(S.deck.x0, S.deck.x1, hole.z1, S.deck.z1);   // 南
  addSlab(S.deck.x0, hole.x0, hole.z0, hole.z1);       // 西
  addSlab(hole.x1, S.deck.x1, hole.z0, hole.z1);       // 东
  // 板缝：跨过洞口的那几条要断开，否则会浮在水面上。
  for (let x = S.deck.x0 + 1.2; x < S.deck.x1 - 0.3; x += 1.2) {
    const spans = (x > hole.x0 && x < hole.x1)
      ? [[S.deck.z0 + 0.2, hole.z0], [hole.z1, S.deck.z1 - 0.2]]
      : [[S.deck.z0 + 0.2, S.deck.z1 - 0.2]];
    for (const [z0, z1] of spans) {
      if (z1 - z0 < 0.2) continue;
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.012, z1 - z0), M.deckDark);
      seam.position.set(x, S.deck.y + 0.004, (z0 + z1) / 2);
      group.add(seam);
    }
  }
  // 外沿压边
  for (const [w, d, x, z] of [
    [deckW, 0.18, deckCx, S.deck.z0 + 0.09],
    [deckW, 0.18, deckCx, S.deck.z1 - 0.09],
    [0.18, deckD, S.deck.x0 + 0.09, deckCz],
    [0.18, deckD, S.deck.x1 - 0.09, deckCz]
  ]) {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, d), M.deckEdge);
    edge.position.set(x, S.deck.y + 0.02, z);
    group.add(edge);
  }
  // 外围木栏杆：南 / 东 / 西三面，北面接屋侧留空给楼梯。
  const railH = 1.0, postR = 0.045;
  // 横杆长度沿 BoxGeometry 的 x 轴；只有东西两侧需要转 90° 对齐到 z 轴。
  const railRows = [
    { n: Math.round(deckW / 1.6), at: (i, t) => [S.deck.x0 + 0.3 + t * (deckW - 0.6), S.deck.z1 - 0.12], rot: 0, len: deckW - 0.6 },
    { n: Math.round(deckD / 1.6), at: (i, t) => [S.deck.x0 + 0.12, S.deck.z0 + 0.3 + t * (deckD - 0.6)], rot: Math.PI / 2, len: deckD - 0.6 },
    { n: Math.round(deckD / 1.6), at: (i, t) => [S.deck.x1 - 0.12, S.deck.z0 + 0.3 + t * (deckD - 0.6)], rot: Math.PI / 2, len: deckD - 0.6 }
  ];
  for (const row of railRows) {
    for (let i = 0; i <= row.n; i++) {
      const [x, z] = row.at(i, i / row.n);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(postR, postR * 1.1, railH, 8), M.towerDark);
      post.position.set(x, S.deck.y + railH / 2, z);
      group.add(post);
    }
    for (const h of [railH, railH * 0.55]) {
      const [cx, cz] = row.at(0, 0.5);
      const bar = new THREE.Mesh(new THREE.BoxGeometry(row.len, 0.07, 0.07), M.tower);
      bar.position.set(cx, S.deck.y + h, cz);
      bar.rotation.y = row.rot;
      group.add(bar);
    }
  }

  // 北侧靠屋，只在屋子两侧的露空段补短栏杆（西侧 x<0、东侧 x>13.2）。
  for (const [nx0, nx1] of [[S.deck.x0 + 0.12, -0.15], [13.35, S.deck.x1 - 0.12]]) {
    const len = nx1 - nx0;
    if (len <= 0.2) continue;
    for (let x = nx0; x <= nx1 + 1e-6; x += 1.2) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(postR, postR * 1.1, railH, 8), M.towerDark);
      post.position.set(Math.min(x, nx1), S.deck.y + railH / 2, S.deck.z0 + 0.12);
      group.add(post);
    }
    for (const h of [railH, railH * 0.55]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(len, 0.07, 0.07), M.tower);
      bar.position.set((nx0 + nx1) / 2, S.deck.y + h, S.deck.z0 + 0.12);
      group.add(bar);
    }
  }

  // ── 泳池 ────────────────────────────────────────────────────────────────
  const poolW = S.pool.x1 - S.pool.x0, poolD = S.pool.z1 - S.pool.z0;
  const poolCx = (S.pool.x0 + S.pool.x1) / 2, poolCz = (S.pool.z0 + S.pool.z1) / 2;
  const wallH = S.deck.y - S.pool.floor;
  // 四面池壁（内表面朝池内）
  const wallThick = S.pool.wall;
  for (const [w, d, x, z] of [
    [poolW + wallThick * 2, wallThick, poolCx, S.pool.z0 - wallThick / 2],
    [poolW + wallThick * 2, wallThick, poolCx, S.pool.z1 + wallThick / 2],
    [wallThick, poolD, S.pool.x0 - wallThick / 2, poolCz],
    [wallThick, poolD, S.pool.x1 + wallThick / 2, poolCz]
  ]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, d), M.tile);
    wall.position.set(x, S.pool.floor + wallH / 2, z);
    wall.receiveShadow = true;
    group.add(wall);
  }
  // 池边压条：圆角矩形环，四段拼
  const copeW = 0.26;
  for (const [w, d, x, z] of [
    [poolW + wallThick * 2 + copeW, copeW, poolCx, S.pool.z0 - wallThick - copeW / 2],
    [poolW + wallThick * 2 + copeW, copeW, poolCx, S.pool.z1 + wallThick + copeW / 2],
    [copeW, poolD + wallThick * 2, S.pool.x0 - wallThick - copeW / 2, poolCz],
    [copeW, poolD + wallThick * 2, S.pool.x1 + wallThick + copeW / 2, poolCz]
  ]) {
    const cope = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), M.coping);
    cope.position.set(x, S.deck.y + 0.01, z);
    group.add(cope);
  }
  // 池底
  const floor = new THREE.Mesh(new THREE.BoxGeometry(poolW, 0.08, poolD), deepMat);
  floor.position.set(poolCx, S.pool.floor + 0.04, poolCz);
  group.add(floor);
  // 池底泳道线
  for (const x of [poolCx - poolW * 0.22, poolCx + poolW * 0.22]) {
    const lane = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.012, poolD - 0.5), M.tileDark);
    lane.position.set(x, S.pool.floor + 0.09, poolCz);
    group.add(lane);
  }
  // 水面：顶点波动
  const waterGeo = new THREE.PlaneGeometry(poolW - 0.04, poolD - 0.04, 24, 40);
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(poolCx, S.pool.surface, poolCz);
  group.add(water);
  const waterBase = Float32Array.from(waterGeo.attributes.position.array);
  // 池边爬梯
  for (const dx of [-0.24, 0.24]) {
    const rail = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 6, 12, Math.PI), M.ladder);
    rail.position.set(poolCx + dx, S.deck.y + 0.34, S.pool.z1 + 0.02);
    group.add(rail);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 1.5, 8), M.ladder);
    leg.position.set(poolCx + dx, S.pool.surface - 0.4, S.pool.z1 + 0.02);
    group.add(leg);
  }
  for (let i = 0; i < 3; i++) {
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.48, 6), M.ladder);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(poolCx, S.pool.surface + 0.18 - i * 0.32, S.pool.z1 + 0.02);
    group.add(rung);
  }

  // ── 螺旋滑道 ────────────────────────────────────────────────────────────
  const T = S.tower;
  const ctrl = [];
  const N = 46;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const ang = S.slide.a0 + t * S.slide.turns * Math.PI * 2;
    const ramp = Math.min(1, t / 0.18);
    const r = 1.32 + 0.5 * ramp - 0.32 * t;
    const y = S.slide.top - S.slide.drop * t;
    ctrl.push(new THREE.Vector3(T.x + Math.cos(ang) * r, y, T.z + Math.sin(ang) * r));
  }
  // 出水段：甩向泳池，末端悬在水面上方
  ctrl.push(new THREE.Vector3(4.9, 0.55, 19.05));
  ctrl.push(new THREE.Vector3(5.45, 0.37, 18.2));
  ctrl.push(new THREE.Vector3(S.slideExit.x, 0.3, S.slideExit.z));
  const slideCurve = new THREE.CatmullRomCurve3(ctrl, false, 'centripetal', 0.5);

  // U 型凹槽截面：外宽比内宽多两个壁厚，圆角用 roundPoly 生成。
  const W_OUT = 0.62, W_IN = 0.44, H_WALL = 0.44, D_FLOOR = 0.15;
  const profile = roundPoly([
    new THREE.Vector2(-W_OUT, 0), new THREE.Vector2(-W_OUT, H_WALL),
    new THREE.Vector2(-W_IN, H_WALL), new THREE.Vector2(-W_IN, D_FLOOR),
    new THREE.Vector2(W_IN, D_FLOOR), new THREE.Vector2(W_IN, H_WALL),
    new THREE.Vector2(W_OUT, H_WALL), new THREE.Vector2(W_OUT, 0)
  ], 0.055, 3);
  const slideMesh = sweepClosed(slideCurve, profile, 96, M.slide);
  slideMesh.castShadow = true;
  group.add(slideMesh);
  // 凹槽内壁用更亮的橙黄，形成「水槽」层次
  const innerProfile = roundPoly([
    new THREE.Vector2(-W_IN, D_FLOOR), new THREE.Vector2(-W_IN, H_WALL - 0.03),
    new THREE.Vector2(-W_IN + 0.03, H_WALL - 0.03), new THREE.Vector2(-W_IN + 0.03, D_FLOOR + 0.03),
    new THREE.Vector2(W_IN - 0.03, D_FLOOR + 0.03), new THREE.Vector2(W_IN - 0.03, H_WALL - 0.03),
    new THREE.Vector2(W_IN, H_WALL - 0.03), new THREE.Vector2(W_IN, D_FLOOR)
  ], 0.02, 2);
  group.add(sweepClosed(slideCurve, innerProfile, 96, M.slideInner));
  // 槽内流动水膜
  const flow = sweepRibbon(slideCurve, W_IN - 0.06, D_FLOOR + 0.035, 96, foamMat);
  group.add(flow);

  // 半透明橘色弧形护栏：沿两侧槽沿扫出管体 + 立柱
  for (const side of [-1, 1]) {
    const pts = offsetPoints(slideCurve, W_OUT * side * 0.97, H_WALL + 0.22, 40);
    const railCurve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(railCurve, 84, 0.055, 8, false), M.rail);
    group.add(tube);
    // 中间一道细弧线，强化「弧形护栏」的层次
    const pts2 = offsetPoints(slideCurve, W_OUT * side * 0.97, H_WALL + 0.02, 40);
    const railCurve2 = new THREE.CatmullRomCurve3(pts2, false, 'centripetal', 0.5);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(railCurve2, 84, 0.028, 6, false), M.railPost));
    for (let i = 0; i <= 40; i += 4) {
      const p = pts[i];
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.24, 6), M.railPost);
      post.position.set(p.x, p.y - 0.12, p.z);
      group.add(post);
    }
  }

  // ── 滑梯塔 ──────────────────────────────────────────────────────────────
  const column = new THREE.Mesh(new THREE.CylinderGeometry(T.column, T.column * 1.25, T.top, 12), M.tower);
  column.position.set(T.x, T.top / 2, T.z);
  column.castShadow = true;
  group.add(column);
  const platform = new THREE.Mesh(new THREE.BoxGeometry(T.platform * 2, 0.14, T.platform * 2), M.tower);
  platform.position.set(T.x, T.top, T.z);
  group.add(platform);
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(T.platform * 1.05, 0.85, 10), M.slide);
  canopy.position.set(T.x, T.top + 1.32, T.z);
  group.add(canopy);
  for (const [dx, dz] of [[-1.12, -1.12], [1.12, -1.12], [-1.12, 1.12], [1.12, 1.12]]) {
    const legg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 6), M.towerDark);
    legg.position.set(T.x + dx, T.top - 0.5, T.z + dz);
    group.add(legg);
  }
  // 平台上护栏（南侧留滑道口，北侧留桥口）
  for (const [w, d, x, z] of [
    [T.platform * 2, 0.07, T.x, T.z + T.platform],
    [0.07, T.platform * 2, T.x - T.platform, T.z],
    [0.07, T.platform * 2, T.x + T.platform, T.z]
  ]) {
    for (const h of [0.5, 0.9]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, d), M.towerDark);
      bar.position.set(x, T.top + h, z);
      group.add(bar);
    }
  }

  // ── 楼梯 + 连桥（避开滑道扫掠半径） ─────────────────────────────────────
  const stairZ = S.deck.z1 - 0.8;
  const walk = new THREE.Group();
  group.add(walk);
  // 阶梯尺寸：原来 run 0.26 / rise 0.27 ≈ 46°，太陡；改成 run 0.34 / rise 0.25 ≈ 36°。
  // 总高 2×STEPS 级正好落在连桥高度上，末端与连桥同高、同一 x 区间，不再悬空。
  const STEPS = 9;
  const stepRun = 0.34;
  const stepRise = (T.top + 0.02 - S.deck.y - 0.05) / (2 * STEPS - 1);
  const flight = (x0, z0, y0, steps, dir) => {
    for (let i = 0; i < steps; i++) {
      const st = new THREE.Mesh(new THREE.BoxGeometry(stepRun + 0.03, 0.1, 1.0), M.tower);
      st.position.set(x0 + dir * i * stepRun, y0 + i * stepRise + 0.05, z0);
      st.castShadow = true;
      walk.add(st);
      const riser = new THREE.Mesh(new THREE.BoxGeometry(0.04, stepRise, 1.0), M.towerDark);
      riser.position.set(x0 + dir * i * stepRun, y0 + i * stepRise - stepRise / 2 + 0.05, z0);
      walk.add(riser);
    }
  };
  const runA = (STEPS - 1) * stepRun;              // 单跑水平跨度
  const stairX0 = 8.72;                            // 起步在东侧，跑完正好落在连桥下方
  const xEndA = stairX0 - runA;                    // 第一跑末级
  const landY = S.deck.y + STEPS * stepRise;       // 中间平台高度
  const landX = xEndA - 0.5;
  const startB = landX - 0.5;
  const xEndB = startB - runA;                     // 第二跑末级（应正对连桥）
  // 第一跑：从东向西
  flight(stairX0, stairZ, S.deck.y, STEPS, -1);
  const landing = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 1.1), M.tower);
  landing.position.set(landX, landY + 0.05, stairZ);
  walk.add(landing);
  // 第二跑：继续向西，末端与连桥同高
  flight(startB, stairZ, landY, STEPS, -1);
  // 连桥：从楼梯顶接到平台
  const bridgeZ0 = stairZ, bridgeZ1 = T.z + T.platform;
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, Math.abs(bridgeZ1 - bridgeZ0)), M.tower);
  bridge.position.set(T.x, T.top + 0.02, (bridgeZ0 + bridgeZ1) / 2);
  walk.add(bridge);
  for (const s of [-1, 1]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, Math.abs(bridgeZ1 - bridgeZ0)), M.towerDark);
    bar.position.set(T.x + s * 0.44, T.top + 0.95, (bridgeZ0 + bridgeZ1) / 2);
    walk.add(bar);
  }
  // 楼梯扶手：沿两跑斜梁各抬 0.95m，带立柱
  for (const [ax, ay, bx, by] of [
    [stairX0, S.deck.y, xEndA, S.deck.y + (STEPS - 1) * stepRise],
    [startB, landY, xEndB, landY + (STEPS - 1) * stepRise]
  ]) {
    const len = Math.hypot(bx - ax, by - ay);
    for (const dz of [-0.46, 0.46]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(len, 0.055, 0.055), M.tower);
      bar.position.set((ax + bx) / 2, (ay + by) / 2 + 0.95, stairZ + dz);
      bar.rotation.z = Math.atan2(by - ay, bx - ax);
      walk.add(bar);
      for (const t of [0.08, 0.5, 0.92]) {
        const px = ax + (bx - ax) * t, py = ay + (by - ay) * t;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.95, 6), M.towerDark);
        post.position.set(px, py + 0.5, stairZ + dz);
        walk.add(post);
      }
    }
  }

  // 楼梯斜梁：让踏板有支撑，不然看着像悬空的木条
  const stringer = (x0, y0, x1, y1, z) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    for (const dz of [-0.44, 0.44]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(len, 0.11, 0.08), M.towerDark);
      beam.position.set((x0 + x1) / 2, (y0 + y1) / 2 - 0.06, z + dz);
      beam.rotation.z = Math.atan2(y1 - y0, x1 - x0);
      walk.add(beam);
    }
  };
  stringer(stairX0, S.deck.y, xEndA, S.deck.y + (STEPS - 1) * stepRise, stairZ);
  stringer(startB, landY, xEndB, landY + (STEPS - 1) * stepRise, stairZ);
  // 楼梯落地支撑柱
  for (const [sx, sz, sh] of [[6.3, stairZ, 0.0], [2.2, stairZ, S.deck.y + 15 * stepRise]]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, sh > 0 ? sh : 0.1, 8), M.towerDark);
    post.position.set(sx, (sh > 0 ? sh : 0.1) / 2 + S.deck.y, sz);
    walk.add(post);
  }

  // 池边一圈浅色防滑带，把泳池从大片木甲板里分出来
  const apron = 0.62;
  for (const [w, d, x, z] of [
    [poolW + wallThick * 2 + copeW * 2 + apron * 2, apron, poolCx, S.pool.z0 - wallThick - copeW - apron / 2],
    [poolW + wallThick * 2 + copeW * 2 + apron * 2, apron, poolCx, S.pool.z1 + wallThick + copeW + apron / 2],
    [apron, poolD + wallThick * 2 + copeW * 2, S.pool.x0 - wallThick - copeW - apron / 2, poolCz],
    [apron, poolD + wallThick * 2 + copeW * 2, S.pool.x1 + wallThick + copeW + apron / 2, poolCz]
  ]) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(w, 0.03, d), M.tileDark);
    band.position.set(x, S.deck.y + 0.008, z);
    group.add(band);
  }

  // ── 装饰 ────────────────────────────────────────────────────────────────
  // 躺椅 ×2 + 遮阳伞
  for (const [ox, oz, rot] of [[-0.7, 0.9, 0.2], [0.55, 0.9, -0.15]]) {
    const base = new THREE.Group();
    base.position.set(S.lounge.x + ox, S.deck.y + 0.02, S.lounge.z + oz);
    base.rotation.y = rot;
    for (let i = 0; i < 5; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.86), M.tower);
      slat.position.set(-0.3 + i * 0.15, 0.3, 0);
      base.add(slat);
    }
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 0.42), M.lounge);
    back.position.set(0, 0.46, -0.36);
    back.rotation.x = -0.5;
    base.add(back);
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.05, 0.8), M.lounge);
    cushion.position.set(0, 0.34, 0.02);
    base.add(cushion);
    for (const [dx, dz] of [[-0.32, -0.36], [0.32, -0.36], [-0.32, 0.36], [0.32, 0.36]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.3, 6), M.ladder);
      leg.position.set(dx, 0.15, dz);
      base.add(leg);
    }
    group.add(base);
  }
  const umbPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.1, 8), M.ladder);
  umbPole.position.set(S.lounge.x + 1.35, S.deck.y + 1.05, S.lounge.z + 0.9);
  group.add(umbPole);
  const umb = new THREE.Mesh(new THREE.ConeGeometry(1.25, 0.55, 10), M.umbrella);
  umb.position.set(S.lounge.x + 1.35, S.deck.y + 2.15, S.lounge.z + 0.9);
  group.add(umb);
  for (let i = 0; i < 5; i++) {
    const seg = new THREE.Mesh(new THREE.ConeGeometry(1.27, 0.56, 10, 1, true, i * 1.256, 0.628), M.umbrellaAlt);
    seg.position.copy(umb.position);
    group.add(seg);
  }
  // 花池 ×2（深色木框 + 三丛植物），把大甲板的边角收住
  for (const [px, pz] of [[1.15, 23.4], [13.4, 10.3]]) {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.42, 1.1), M.towerDark);
    planter.position.set(px, S.deck.y + 0.21, pz);
    group.add(planter);
    const soilTop = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.06, 0.94), deepMat);
    soilTop.position.set(px, S.deck.y + 0.43, pz);
    group.add(soilTop);
    for (let i = 0; i < 5; i++) {
      const a = i * 1.256;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.62 + (i % 3) * 0.16, 5), M.umbrellaAlt);
      leaf.position.set(px + Math.cos(a) * 0.26, S.deck.y + 0.74 + (i % 3) * 0.08, pz + Math.sin(a) * 0.26);
      leaf.rotation.z = Math.cos(a) * 0.22;
      leaf.rotation.x = -Math.sin(a) * 0.22;
      group.add(leaf);
    }
  }
  // 躺椅之间的小边桌
  const sideTable = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.05, 12), M.coping);
  sideTable.position.set(S.lounge.x - 0.1, S.deck.y + 0.5, S.lounge.z + 1.85);
  group.add(sideTable);
  const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.5, 8), M.ladder);
  tableLeg.position.set(S.lounge.x - 0.1, S.deck.y + 0.25, S.lounge.z + 1.85);
  group.add(tableLeg);
  for (const [dx, col] of [[-0.09, M.ring], [0.1, M.umbrella]]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.12, 8), col);
    cup.position.set(S.lounge.x - 0.1 + dx, S.deck.y + 0.58, S.lounge.z + 1.85);
    group.add(cup);
  }
  // 露天冲淋：立杆 + 花洒 + 接水盘
  const showerBase = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.36, 0.05, 12), M.coping);
  showerBase.position.set(13.15, S.deck.y + 0.025, 22.4);
  group.add(showerBase);
  const showerPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 2.35, 8), M.ladder);
  showerPole.position.set(13.15, S.deck.y + 1.2, 22.4);
  group.add(showerPole);
  const showerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 8), M.ladder);
  showerArm.rotation.z = Math.PI / 2;
  showerArm.position.set(12.93, S.deck.y + 2.33, 22.4);
  group.add(showerArm);
  const showerHead = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.1, 0.09, 12), M.ladder);
  showerHead.position.set(12.7, S.deck.y + 2.27, 22.4);
  group.add(showerHead);

  // 泳圈
  for (const [x, z, r] of [[5.4, 15.2, 0.34], [7.5, 17.8, 0.3], [6.9, 19.4, 0.26]]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, r * 0.36, 8, 18), M.ring);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, S.pool.surface + 0.02, z);
    group.add(ring);
  }
  // 入口指示牌
  const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.5, 8), M.towerDark);
  signPost.position.set(9.6, S.deck.y + 0.75, 10.4);
  group.add(signPost);
  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.42, 0.06), M.signBg);
  signBoard.position.set(9.6, S.deck.y + 1.46, 10.4);
  group.add(signBoard);
  for (let i = 0; i < 3; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.62 - i * 0.14, 0.05, 0.012), M.signFg);
    bar.position.set(9.6, S.deck.y + 1.58 - i * 0.13, 10.44);
    group.add(bar);
  }
  // 平台顶灯
  const glowMat = basic(W.glow);
  const glowLight = new THREE.PointLight(W.glow, 0.9, 6, 2);
  glowLight.position.set(T.x, T.top + 0.9, T.z);
  group.add(glowLight);
  for (const p of [[T.x, T.top + 0.75, T.z], [9.6, S.deck.y + 1.7, 10.4]]) {
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), glowMat);
    bulb.position.set(p[0], p[1], p[2]);
    group.add(bulb);
  }

  // 点击热区：滑道管体细、塔和楼梯又不属于滑道网格，只拿 slideMesh 做拾取会出现
  // 「看着点在滑梯上、射线却穿过去打到地面」→ 变成走过去。这里补不可见拾取体：
  // 沿曲线套一根粗管（跟着滑道形状走），再给塔/楼梯/连桥两个盒子。
  const pickMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
  own.add(pickMat);
  const pickHit = (geo, x, y, z) => {
    const m = new THREE.Mesh(geo, pickMat);
    m.position.set(x, y, z);
    m.userData.waterparkPick = 'slide';
    m.renderOrder = -2;
    group.add(m);
    return m;
  };
  const hitProxies = [
    pickHit(new THREE.TubeGeometry(slideCurve, 72, 0.55, 6, false), 0, 0, 0),
    pickHit(new THREE.BoxGeometry(3.0, 1.9, 3.0), T.x, T.top + 0.35, T.z),
    pickHit(new THREE.BoxGeometry(5.4, 4.6, 1.6), 4.3, 2.25, stairZ)
  ];
  slideMesh.userData.waterparkPick = 'slide';
  water.userData.waterparkPick = 'water';

  // ── 主题热切换 ──────────────────────────────────────────────────────────
  const ownKeys = Object.keys(M).filter((k) => W[k] !== undefined);
  const themeHandler = (theme) => {
    const w = theme.waterpark;
    if (!w) return;
    for (const key of ownKeys) M[key].color.setHex(w[key]);
    waterMat.color.setHex(w.water);
    deepMat.color.setHex(w.waterDeep);
    foamMat.color.setHex(w.particleWater);
    glowMat.color.setHex(w.glow);
    glowLight.color.setHex(w.glow);
  };
  world.themeHandlers = world.themeHandlers || [];
  world.themeHandlers.push(themeHandler);

  // ── 动画 ────────────────────────────────────────────────────────────────
  function update(now) {
    const t = now * 0.001;
    const arr = waterGeo.attributes.position.array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = waterBase[i], y = waterBase[i + 1];
      arr[i + 2] = Math.sin(x * 1.6 + t * 1.7) * 0.018 + Math.cos(y * 1.3 - t * 1.3) * 0.014;
    }
    waterGeo.attributes.position.needsUpdate = true;
    waterGeo.computeVertexNormals();
    foamMat.opacity = 0.6 + Math.sin(t * 2.1) * 0.14;
  }

  return {
    group,
    slideCurve,
    layout: S,
    // 可点击对象：滑道（上滑梯）、水面（下水）、甲板（走过去）
    // 每个可点对象都带 userData.waterparkPick（'slide' | 'water'），客户端按标签分派。
    pickables: [slideMesh, ...hitProxies, water],
    update,
    setTheme: themeHandler,
    inspect: () => ({ meshes: group.children.length, slideTop: S.slide.top, pool: S.pool }),
    dispose() {
      const i = world.themeHandlers?.indexOf(themeHandler) ?? -1;
      if (i >= 0) world.themeHandlers.splice(i, 1);
      group.traverse((n) => { if (n.isMesh && n.geometry) n.geometry.dispose(); });
      for (const m of own) m.dispose();
      world.scene.remove(group);
    }
  };
}
