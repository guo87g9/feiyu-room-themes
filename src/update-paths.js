// 更新时可写路径的白名单/黑名单。
// 单独成模块：桥接用它做写盘校验，测试可以直接校验规则本身。
export const UPDATE_ALLOW_PREFIX = ['public/', 'src/', 'scripts/', 'docs/'];
export const UPDATE_ALLOW_FILES = new Set([
  'package.json', 'package-lock.json', 'VERSION.txt', 'README.md', 'CHANGELOG.md', 'START_HERE.txt',
  'manifest.json', '.gitignore', 'LICENSE'
]);
// 这些即使落在白名单目录里也绝不能覆盖：配置、运行态、依赖。
const DENY_PREFIX = ['.git/', 'state/', 'node_modules/', 'public/room/.cache/'];
const DENY_FILES = new Set(['config.json', 'config.local.json', '.env']);

/** 判断一个相对路径能否被更新写入。true 表示允许。 */
export function isUpdatablePath(rel) {
  if (typeof rel !== 'string') return false;
  const p = rel.replace(/\\/g, '/').replace(/^\.\//, '');
  if (!p || p.startsWith('/') || /^[a-zA-Z]:/.test(p)) return false;   // 绝对路径
  if (p.split('/').some((seg) => seg === '..' || seg === '' || seg === '.')) return false; // 穿越/空段
  if (DENY_FILES.has(p)) return false;
  if (DENY_PREFIX.some((d) => p.startsWith(d))) return false;
  if (UPDATE_ALLOW_FILES.has(p)) return true;
  return UPDATE_ALLOW_PREFIX.some((d) => p.startsWith(d));
}

/** 列出当前检出里所有可更新文件的相对路径（用于生成 manifest / 比对哈希）。 */
export function isManifestCandidate(rel) {
  return isUpdatablePath(rel) && rel !== 'manifest.json';
}
