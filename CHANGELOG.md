# 版本记录

## v3.1.0-remix

> 基于 / 二次创作自 [`sh2234113/feiyu-room-template`](https://github.com/sh2234113/feiyu-room-template)（MIT）
> **复制文件建立的独立二创项目**，不是原创房间；新建独立公开仓库 `guo87g9/feiyu-room-themes`，
> 不建立 fork 关系、不继承上游 git 历史。上游「最新版 1 / 2 / 3」条目作为历史保留在下方。

- **新增 4 套可切换房间配色主题**：`blue_white`（默认）/ `seaside` / `forest` / `courtyard`。
  唯一配置表 `public/room/theme.js`，运行时 `world.setTheme()` 一键切换、选择存浏览器 localStorage；
  只改材质 / 灯光 / 贴图 / 天空 / 菜园配色，**玩法一项没动**。
- **移除作者自制 3D 模型与第三方安装包**：3 个 `.glb` 模型文件与 `tools/` 目录彻底移除，
  不保留副本、不提供下载链接；**本仓库不含任何角色 3D 模型文件／私人素材**；
  保留的 2D 立绘是已署名的第三方 CC 素材。
- **3D 模式保留并改为程序化角色兜底**：切到 3D 时由 `actor3d.js` 的代码级几何呈现，
  零下载、不请求任何 GLB、加载失败回落 2D 立绘，不白屏；上游「模型画质切换」按钮与对应文案一并移除。
- **四项修复**：版本号统一 `v3.1.0-remix`（`package.json` / `package-lock.json` / `VERSION.txt` / README）；
  写死的上游 remote 改为 `https://github.com/guo87g9/feiyu-room-themes.git`；
  清理悬空 npm scripts；修正 README 的 clone 目录与失效条目。
- **上游测试可移植性修复（D-10）**：原作者把本机环境假设写进测试，任何干净检出都会假红。
  `test-preset-prompt` 的行尾断言从写死 CRLF 改为按源文件主导行尾判定（上游该 YAML 本身即纯 LF，
  原断言不可能通过）；`test-role-card` 对 `.gitignore` 已排除的 `roles/小鲸鱼.md` 改为缺失时跳过，
  并改用随仓库分发的 `roles/example.md` 验证同一套筛选机制。**无任何断言被削弱**。
  连同 Windows 权限位断言条件化，全量 7 条测试现已 `7 / 7 EXIT=0`。
- **纯非商业双声明**：**整体仓库不是纯 MIT** —— 代码 MIT，2D 立绘 / 动画 / 音效为
  dsh-pet **CC BY-NC-SA 4.0**（署名 · 非商业 · 相同方式共享），素材以更严格者为准；
  整体仅供个人学习与**非商业**用途，不得用于售卖、付费服务或商业宣传。
- 保留并强化 `LICENSE`（上游两行原版权行 + 追加 `Copyright (c) 2026 guo87g9`）、
  `ASSET_LICENSES.md`、`THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、
  `INSPIRATION.md`、`public/room/assets/pet/CREDITS.md` 与页面底部署名。

> 逐文件改动清单见 [`docs/REMIX_CHANGES.md`](docs/REMIX_CHANGES.md)。

## 大肥鱼房子最新版 3

- 历史条目中随模板分发的第三方安装包已整体移除，本仓库不再分发任何第三方安装程序，
  也不再沿用任何「已获官方授权」的分发表述。
- 保留原文件的其余说明；功能保持不变。

## 大肥鱼房子最新版 2

- 清理根目录重复的大体积二进制文件
- 删除未引用的 examples 图片和 garden-showcase.html
- 清理 src/bridge.js 中的真实 QQ、本机路径和默认私人角色名
- 修复 README 的占位仓库链接
- 拆分标准 MIT LICENSE 与第三方说明
- 统一 package 身份和版本号
- 功能保持不变

## 大肥鱼房子最新版 1

- 完整 3D 房间、菜园、电视、陪伴层和 QQ 桥接
- 最新走路动画、动作栏、菜园拖拽
- SnowLuma / NapCat 双网关支持
- 安装文档、NapCat 文档、新手 GitHub 教程
