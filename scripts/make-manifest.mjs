// 生成更新清单 manifest.json：版本号 + 每个可更新文件的 sha256。
// 用法：npm run manifest（发版前跑一次，产物随代码一起提交）
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { isManifestCandidate } from '../src/update-paths.js';

const ROOT = path.resolve(import.meta.dirname, '..');

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name);
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    if (ent.isDirectory()) {
      if (rel.split('/').some((s) => ['.git', 'node_modules', 'state'].includes(s))) continue;
      walk(abs, out);
    } else if (isManifestCandidate(rel)) {
      out.push(rel);
    }
  }
  return out;
}

const files = walk(ROOT).sort();
const map = {};
for (const rel of files) {
  map[rel] = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex');
}

// VERSION.txt 只有首行是版本号，后面是说明文字
const version = fs.readFileSync(path.join(ROOT, 'VERSION.txt'), 'utf8').split('\n')[0].trim();
const manifest = { version, generated: new Date().toISOString(), files: map };
fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`manifest.json 已生成：${version}，${files.length} 个文件`);
