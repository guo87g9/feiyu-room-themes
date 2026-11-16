import * as THREE from './vendor/three.module.js';
import { WATERPARK_LAYOUT } from './waterpark-world.js';

// 取景框：把整块平台（含滑梯塔顶与泳池）塞进面板外的可用区域。
// 相机站在海侧（+z）回望，房子自然成为背景。
export const WATERPARK_FRAME_POINTS = Object.freeze([
  ...[WATERPARK_LAYOUT.deck.x0, WATERPARK_LAYOUT.deck.x1].flatMap((x) =>
    [WATERPARK_LAYOUT.deck.z0, WATERPARK_LAYOUT.deck.z1].flatMap((z) => [0, 1.2].map((y) => Object.freeze([x, y, z])))
  ),
  Object.freeze([WATERPARK_LAYOUT.tower.x, 5.4, WATERPARK_LAYOUT.tower.z]),
  Object.freeze([WATERPARK_LAYOUT.pool.x0, 0.1, WATERPARK_LAYOUT.pool.z0]),
  Object.freeze([WATERPARK_LAYOUT.pool.x1, 0.1, WATERPARK_LAYOUT.pool.z1])
]);

export function getWaterparkFraming(width, height, panelLeft = width - 402) {
  const narrow = width <= 900;
  const rect = narrow
    ? { left: 8, right: width - 8, top: 72, bottom: height * 0.49 }
    : { left: 22, right: Math.max(220, panelLeft - 18), top: Math.max(90, height * 0.12), bottom: height - 28 };
  const availableWidth = Math.max(100, rect.right - rect.left);
  const availableHeight = Math.max(100, rect.bottom - rect.top);
  const target = [7.0, 0.9, 17.4];
  const az = 0.18;
  const elev = narrow ? 0.9 : Math.max(0.6, Math.min(1.0, 1.2 - availableWidth / availableHeight * 0.2));
  const fov = narrow ? 52 : 40;
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.08, 220);
  const corners = WATERPARK_FRAME_POINTS.map((p) => new THREE.Vector3(...p));
  function bounds(radius) {
    camera.position.set(
      target[0] + Math.sin(az) * Math.cos(elev) * radius,
      target[1] + Math.sin(elev) * radius,
      target[2] + Math.cos(az) * Math.cos(elev) * radius
    );
    camera.lookAt(...target);
    camera.updateMatrixWorld(true);
    const points = corners.map((p) => p.clone().project(camera));
    const xs = points.map((p) => (p.x + 1) * width / 2);
    const ys = points.map((p) => (1 - p.y) * height / 2);
    return { left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys) };
  }
  let low = 8, high = 160;
  for (let i = 0; i < 26; i++) {
    const mid = (low + high) / 2, b = bounds(mid);
    if (b.right - b.left > availableWidth || b.bottom - b.top > availableHeight) low = mid;
    else high = mid;
  }
  const radius = high, b = bounds(radius);
  return {
    az, elev, fov, radius, target,
    offsetX: (b.left + b.right - rect.left - rect.right) / 2,
    offsetY: (b.top + b.bottom - rect.top - rect.bottom) / 2,
    rect
  };
}
