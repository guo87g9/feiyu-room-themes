// 整体收口测试：把「QQ 桥接 → 服务端状态机 → 前端演出」三层串起来，
// 并回归旧玩法，确保新增的滑梯 / 游泳两个玩法在每条控制通道上都没被漏掉。
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import * as THREE from '../public/room/vendor/three.module.js';
import {
  HOME_ACTIONS, HOME_LAYOUT, applyHomeAction, advanceHomeState, emptyHomeState,
  homeView, listSpots, roomAtPoint, normalizeFreePoint, buildRoute
} from '../src/home-state.js';
import { createWaterparkWorld } from '../public/room/waterpark-world.js';
import { THEME_KEYS, THEMES } from '../public/room/theme.js';

globalThis.document = { getElementById: () => null };
globalThis.innerWidth = 1280;
globalThis.innerHeight = 800;

const T0 = 1_700_000_000_000;
const tick = (s, now) => advanceHomeState(s, now, { gardenReady: false }).state;
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => fs.readFileSync(`${ROOT}${p}`, 'utf8');
const makeWorld = (theme) => ({
  scene: new THREE.Scene(), theme: THEMES[theme], themeHandlers: [], quality: 'balanced'
});

/** 从源码里抠出一段方括号里的字符串字面量。 */
function literalsIn(src, marker) {
  const i = src.indexOf(marker);
  assert.ok(i >= 0, `源码里找不到 ${marker}`);
  const open = src.indexOf('[', i);
  let depth = 0, end = -1;
  for (let k = open; k < src.length; k++) {
    if (src[k] === '[') depth++;
    else if (src[k] === ']') { depth--; if (!depth) { end = k; break; } }
  }
  assert.ok(end > open, `${marker} 的方括号没有闭合`);
  return [...src.slice(open, end).matchAll(/'([a-z_]+)'/g)].map((m) => m[1]);
}

test('契约一致：服务端动作 / 桥接白名单 / MCP 枚举三方不得脱节', () => {
  const bridge = read('src/bridge.js');
  const mcp = read('src/mcp-snowluma-safe.js');

  const agentAllowed = literalsIn(bridge, 'AGENT_HOME_ACTIONS = new Set(');
  const toolEnum = literalsIn(mcp, "action: z.enum([");

  // 桥接放行的动作必须都是服务端认识的动作（否则 applyHomeAction 静默不动）
  for (const a of agentAllowed) {
    assert.ok(HOME_ACTIONS.includes(a), `桥接放行了服务端不认识的 action「${a}」`);
  }
  // MCP 枚举必须被桥接放行（否则模型调了也拿 400）
  for (const a of toolEnum) {
    assert.ok(agentAllowed.includes(a), `MCP 暴露了「${a}」但桥接白名单没有它`);
  }
  // 本次新增的玩法在三处都要在
  for (const a of ['waterpark']) {
    assert.ok(HOME_ACTIONS.includes(a), `HOME_ACTIONS 缺 ${a}`);
    assert.ok(agentAllowed.includes(a), `AGENT_HOME_ACTIONS 缺 ${a}`);
    assert.ok(toolEnum.includes(a), `qq_home_action 枚举缺 ${a}`);
  }
  // ride 必须从工具一路透传到 applyHomeAction
  assert.match(mcp, /ride: z\.enum\(\['slide',\s*'swim'\]\)/, 'qq_home_action 需要 ride 参数');
  assert.match(mcp, /JSON\.stringify\(\{[^}]*ride[^}]*\}\)/, 'ride 没有被放进请求体');
  assert.match(bridge, /ride, at: now/, 'bridge 没有把 ride 交给 applyHomeAction');
  assert.match(read('dsh/agent-presets/qq-chat-v2/agent.cordis.yml'), /action=waterpark/, '预设没有告诉模型这个能力');
});

test('两种新玩法都能从屋里走到位（slide / swim 各一条）', () => {
  for (const [ride, wantSpot, wantPos] of [
    ['slide', 'slide', [6.4, 24.2]],
    ['swim', 'pool', [6.6, 21.0]]
  ]) {
    let s = emptyHomeState(T0);
    s = applyHomeAction(s, { action: 'waterpark', ride, at: T0 + 1000, by: 'QQ' }).state;
    assert.equal(s.command.room, 'waterpark', `${ride} 应派往水上乐园`);
    assert.equal(s.command.spot, wantSpot, `${ride} 的目标位置不对`);

    let now = T0 + 1000, arrived = false;
    for (let i = 0; i < 80 && !arrived; i++) {
      now += 1000;
      s = tick(s, now);
      const h = homeView(s, now, {}).her;
      if (!h.walking && h.pos[1] > 10) arrived = true;
    }
    assert.ok(arrived, `${ride} 没能走到乐园`);
    const her = homeView(s, now, {}).her;
    assert.equal(her.room, 'waterpark');
    assert.ok(Math.hypot(her.pos[0] - wantPos[0], her.pos[1] - wantPos[1]) < 0.5,
      `${ride} 应停在 ${wantPos}，实际 ${her.pos.map((v) => +v.toFixed(2))}`);
    assert.equal(her.waterparkRide.kind, ride, `${ride} 的演出指令没下发到视图`);
    assert.ok(her.waterparkRide.token, 'token 缺失会导致前端每次快照重播');
  }
});

test('两种新玩法在客户端都能演完，并停在水里', async () => {
  const { createWaterparkClient } = await import('../public/room/waterpark-client.js');
  for (const ride of ['slide', 'swim']) {
    let s = emptyHomeState(T0);
    s = applyHomeAction(s, { action: 'waterpark', ride, at: T0 + 1000 }).state;
    let now = T0 + 1000;
    for (let i = 0; i < 80; i++) { now += 1000; s = tick(s, now); const h = homeView(s, now, {}).her; if (!h.walking && h.pos[1] > 10) break; }
    const her = homeView(s, now, {}).her;

    const client = createWaterparkClient({ world: makeWorld('blue_white'), renderer: null, camera: new THREE.PerspectiveCamera(40, 1.6, 0.1, 200) });
    client.syncState(her, 0);
    assert.equal(client.isOpen, true, `${ride}: 远程指令应自动打开乐园视角`);
    assert.ok(client.inspect().ride, `${ride}: 应开始演出`);

    let swam = false;
    for (let t = 100; t <= 14000; t += 100) {
      const r = client.getRide(t, her.pos);
      assert.ok(r, `${ride}: 演出中每帧都要有姿态`);
      assert.ok(Number.isFinite(r.x) && Number.isFinite(r.z) && Number.isFinite(r.elev), `${ride}: 姿态数值必须有限`);
      if (r.swimming) swam = true;
      client.tick(t);
    }
    assert.ok(swam, `${ride}: 最终应入水游泳`);
    const end = client.getRide(14000, her.pos);
    assert.ok(end.x > 4.5 && end.x < 8.7 && end.z > 13 && end.z < 20.6, `${ride}: 应停在泳池范围内`);
    client.dispose();
  }
});

test('全部 41 个位置都能从客厅走到，且不越界', () => {
  const from = [6.3, 5.12];
  const spots = listSpots();
  assert.equal(spots.length, 41, `位置总数应为 41，实际 ${spots.length}`);
  const outdoor = ['garden', 'yard', 'waterpark'];
  const inOutdoor = (p) => outdoor.some((id) => {
    const b = HOME_LAYOUT.rooms.find((r) => r.id === id).bounds;
    return p[0] >= b[0] && p[0] <= b[2] && p[1] >= b[1] && p[1] <= b[3];
  });
  for (const sp of spots) {
    // 与 test-home 一致：以 spot 的 access 路点为入口算门洞图路线
    const route = buildRoute(from, { access: 'living_sofa' }, { room: sp.room, spot: sp.spot }, T0, 0.55);
    assert.ok(route?.points?.length >= 2, `${sp.key} 没有路线`);
    for (const p of route.points) {
      if (inOutdoor(p)) continue;
      assert.ok(p[0] >= 0 && p[0] <= HOME_LAYOUT.size.w + 0.01, `${sp.key} 路线越界 x`);
      assert.ok(p[1] >= 0 && p[1] <= HOME_LAYOUT.size.d + 0.01, `${sp.key} 路线越界 z`);
    }
  }
});

test('水上乐园的四个位置都在提示词可选范围内', () => {
  const keys = listSpots().map((s) => s.key);
  for (const k of ['waterpark/deck', 'waterpark/pool', 'waterpark/slide', 'waterpark/lounge']) {
    assert.ok(keys.includes(k.replace('/', '.')), `${k} 缺失`);
  }
  // 与 bridge 里 home.layout.spots 的生成方式一致
  const generated = Object.entries(HOME_LAYOUT.spots).flatMap(([room, list]) => Object.keys(list).map((spot) => `${room}/${spot}`));
  assert.ok(generated.includes('waterpark/slide'), 'home.layout.spots 应含 waterpark/slide');
  assert.ok(generated.includes('waterpark/pool'), 'home.layout.spots 应含 waterpark/pool');
});

test('房间判定与点击落点覆盖甲板与泳池', () => {
  assert.equal(roomAtPoint([6.6, 16.8])?.id, 'waterpark', '泳池中心应在乐园房间内');
  assert.equal(roomAtPoint([6.2, 9.5])?.id, 'waterpark', '阳台外沿应在乐园房间内');
  assert.equal(roomAtPoint([6.3, 5.0])?.id, 'living', '客厅判定不受影响');
  const deck = normalizeFreePoint([2.0, 22.0]);
  assert.ok(deck && Math.abs(deck[0] - 2.0) < 0.01, '甲板自由落点应被接受');
  // 菜园吸附行为保持不变
  assert.deepEqual(normalizeFreePoint([5.9, -1.45]), [4.7, -0.9], '菜园点击仍吸附到菜畦');
});

test('旧玩法不回归：室内指令与日常互动仍然生效', () => {
  let s = emptyHomeState(T0);
  // 室内 command
  for (const [room, spot] of [['living', 'sofa'], ['her_room', 'bed'], ['kitchen', 'dining'], ['balcony', 'rail'], ['garden', 'plot0']]) {
    const r = applyHomeAction(s, { action: 'command', room, spot, at: T0 + 1000 });
    assert.equal(r.changed, true, `command ${room}/${spot} 应生效`);
    assert.equal(r.state.command.room, room);
  }
  // 日常互动
  for (const action of ['pet', 'poke', 'feed', 'water', 'play', 'talk', 'sleep', 'lamp']) {
    const r = applyHomeAction(s, { action, text: action === 'talk' ? '在吗' : '', at: T0 + 1000 });
    assert.equal(r.changed, true, `${action} 应生效`);
  }
  assert.equal(applyHomeAction(s, { action: 'talk', text: '', at: T0 }).changed, false, '空留言应被拒');
  assert.equal(applyHomeAction(s, { action: 'fly', at: T0 }).changed, false, '未登记动作应被拒');
});

test('两个新玩法不会污染菜园工作状态', () => {
  let s = emptyHomeState(T0);
  s = applyHomeAction(s, { action: 'waterpark', ride: 'slide', at: T0 + 1000 }).state;
  let now = T0 + 1000;
  for (let i = 0; i < 60; i++) { now += 1000; s = tick(s, now); }
  const her = homeView(s, now, {}).her;
  assert.equal(her.gardenWork, null, '去乐园不应留下菜园任务');
  assert.equal(s.dwell?.target?.gardenJobId, undefined, 'dwell 里不应有 gardenJobId');
});

test('四套主题下新场景都能构建、换肤、销毁', () => {
  for (const key of THEME_KEYS) {
    const world = makeWorld(key);
    const wp = createWaterparkWorld(world, null, { quality: 'balanced' });
    assert.ok(wp.group.children.length > 100, `${key}: 场景对象过少`);
    assert.equal(world.themeHandlers.length, 1, `${key}: 应注册一个换肤回调`);
    const slideMesh = wp.group.children.find((c) => c.isMesh && c.material && c.geometry.index);
    const ref = slideMesh.material;
    const before = ref.color.getHex();
    for (const other of THEME_KEYS) wp.setTheme(THEMES[other]);
    assert.equal(slideMesh.material, ref, `${key}: 换肤不得重建材质实例`);
    wp.setTheme(THEMES[key]);
    assert.equal(ref.color.getHex(), before, `${key}: 切回原主题应还原颜色`);
    wp.dispose();
    assert.equal(world.themeHandlers.length, 0, `${key}: dispose 应摘掉回调`);
  }
  // 两套主题的滑道颜色必须真的不同，否则主题形同虚设
  assert.notEqual(THEMES.blue_white.waterpark.slide, THEMES.forest.waterpark.slide);
});

test('水上乐园与菜园互不干扰：两边场景可共存', () => {
  const world = makeWorld('seaside');
  const wp = createWaterparkWorld(world, null, { quality: 'balanced' });
  const before = world.scene.children.length;
  assert.ok(before >= 1);
  // 模拟菜园也注册一个回调
  const gardenHandler = () => {};
  world.themeHandlers.push(gardenHandler);
  assert.equal(world.themeHandlers.length, 2);
  wp.setTheme(THEMES.courtyard);
  assert.equal(world.themeHandlers.length, 2, '换肤不应影响其他子系统的回调');
  wp.dispose();
  assert.deepEqual(world.themeHandlers, [gardenHandler], '只应摘掉自己的回调');
});

test('前端接线没被漏掉：按钮 / 点击 / 落点 / 演出接管 / 栏板开口', () => {
  const app = read('public/room/app.js');
  const html = read('public/room/index.html');
  const world = read('public/room/world.js');

  // 模块导入
  assert.match(app, /import \{ createWaterparkClient \} from '\.\/waterpark-client\.js';/, 'app 未导入水上乐园控制器');
  assert.match(app, /import \{ getWaterparkFraming \} from '\.\/waterpark-camera\.js';/, 'app 未导入取景模块');

  // 入口按钮：HTML 有 id，app 有监听，缺一不可
  assert.match(html, /id="waterparkChip"/, 'index.html 缺入口按钮');
  assert.match(app, /\$\('waterparkChip'\)\.addEventListener\('click'/, '按钮没绑事件');

  // 点击优先级：水上乐园必须在菜园之前拦截，否则点滑道会被菜园逻辑吃掉
  const onClick = app.slice(app.indexOf('function onClick(e)'), app.indexOf('function onClick(e)') + 400);
  const wpIdx = onClick.indexOf('waterparkController?.handlePointer');
  const gdIdx = onClick.indexOf('gardenController?.handlePointer');
  assert.ok(wpIdx >= 0 && gdIdx > wpIdx, 'onClick 里水上乐园应先于菜园拦截');

  // 点击落点：甲板平面要能被拾取
  assert.match(app, /waterparkController\?\.isOpen\)\s*\{[\s\S]{0,200}intersectPlane/, 'floorPointAt 未接甲板平面');

  // 点击行走分支
  assert.match(app, /if \(waterparkController\?\.isOpen\) \{[\s\S]{0,260}act\('go'/, '缺少水上乐园的点击行走分支');

  // 远程指令接管 + 演出姿态接管
  assert.match(app, /waterparkController\?\.syncState\(her, now\)/, '没有接 QQ 指令同步');
  assert.match(app, /waterparkController\?\.getRide\(performance\.now\(\), displayPos\)/, '没有接管演出位置');
  assert.match(app, /const elevNow = rideView \? rideView\.elev/, '没有接管演出高度');
  assert.match(app, /waterparkController\?\.tick\(now\)/, '没有驱动场景动画');

  // 相机取景
  assert.match(app, /function focusWaterpark\(\)/, '缺少乐园取景函数');
  assert.match(app, /onOpen:\s*focusWaterpark/, '进入时没有切镜头');

  // 两个室外区域互斥
  assert.match(app, /if\(!gardenController\.isOpen\) waterparkController\?\.setOpen\(false\)/, '菜园入口没有关闭乐园');
  assert.match(app, /if\(!waterparkController\.isOpen\) gardenController\?\.setOpen\(false\)/, '乐园入口没有关闭菜园');

  // 阳台栏板开口（否则走不过去）
  assert.match(world, /const RAIL_GAP = \[5\.1, 7\.1\]/, '阳台栏板没有开通行口');
});

test('甲板点击落点保真：点哪走到哪，不吸附到路点', () => {
  for (const target of [[10.0, 22.0], [2.0, 11.0], [13.0, 18.0]]) {
    let s = emptyHomeState(T0);
    s = applyHomeAction(s, { action: 'go', pos: target, at: T0 + 1000 }).state;
    assert.deepEqual(s.freeTarget.pos, target, '甲板落点不应被吸附');
    let now = T0 + 1000;
    for (let i = 0; i < 80; i++) {
      now += 1000;
      s = tick(s, now);
      if (!s.walking && s.route === null) break;
    }
    const her = homeView(s, now, {}).her;
    assert.equal(her.room, 'waterpark', `${target} 应走到乐园`);
    assert.ok(Math.hypot(her.pos[0] - target[0], her.pos[1] - target[1]) < 0.05,
      `${target} 没走到位，实际 ${her.pos.map((v) => +v.toFixed(2))}`);
  }
});
