# 素材授权矩阵（四层）

> **本文件与 `LICENSE` 并列**：`LICENSE` **只覆盖代码（MIT）**；本文件说明仓库里
> **代码 / 素材 / 已移除资产 / 第三方依赖** 四层的不同授权与边界。
> **整体仓库不是纯 MIT**：`package.json` 的 `"license": "MIT"` 与 GitHub 的 MIT 徽标
> 仅描述代码部分，不覆盖素材；素材部分以更严格者为准。
> 本项目 `feiyu-room-themes` 是**新建的独立公开仓库**，代码与户型取自
> [`sh2234113/feiyu-room-template`](https://github.com/sh2234113/feiyu-room-template)（**非 Fork、
> 不继承其 git 历史**），在其上做视觉二创；**不是原创房间**。
> 统一署名措辞见 `design/asset-license-matrix.md` §2.2.1。

---

## 一句话结论

| | |
| --- | --- |
| 代码 | **MIT**（`LICENSE` 全文 + 上游两行原版权行 + 追加 `Copyright (c) 2026 guo87g9`） |
| 2D 立绘 / 动画 / 点击音效 | **CC BY-NC-SA 4.0**（署名 · 非商业 · 相同方式共享） |
| 整体用途 | **纯非商业**：仅供个人学习与开源复刻，不得售卖、付费服务、商业宣传 |
| 3D 模型文件 / 第三方安装包 | **已彻底移除，本仓库完全不含** |
| 3D 角色 | `actor3d.js` 的**代码级程序化几何**，属①层代码 MIT，不是模型资产文件 |

---

## 四层矩阵

| 层 | 具体文件 / 目录 | 许可证 / 权利归属 | 允许 | 禁止 | 公开仓库必须保留 |
| --- | --- | --- | --- | --- | --- |
| **① 代码 MIT** | `src/`、`public/room/*.js`（含 `actor3d.js` / `theme.js` / `garden-world.js`）、`public/room/index.html`、`public/room/*.css`、`scripts/`、`*.mjs`、`*.json`、`*.css`、`LICENSE`、根目录与 `docs/` 文档。 **不含** ②层素材目录、**不含** `public/room/vendor/` 第三方代码 | **MIT**。`Copyright (c) 2026 Derpyu520 and qq-bridge / QSH contributors` + `Copyright (c) 2026 sh2234113` + 追加 `Copyright (c) 2026 guo87g9` | 使用、复制、修改、合并、发布、分发、再授权、出售副本，**含商用**（代码**单独**被取用时）；本仓库新增代码同样以 MIT 提供；可**追加**自己的版权行 | 删除或改写原两行版权声明；删除 MIT 全文；把 ②层 CC 素材称作「MIT 代码」并据此授权；把 ③④层资产写成 MIT 覆盖；把整个仓库标成纯 MIT | `LICENSE` 全文原样保留（两行原版权行一字不改，新增行只能追加）；`THIRD_PARTY_NOTICES.md` 保留「本项目代码：MIT」；README 保留上游来源与上游版权可见；本文件 `ASSET_LICENSES.md` |
| **①-a 程序化 Chibi（澄清行，非第五层）** | `public/room/actor3d.js`：代码里用 Three.js 基本几何体运行时拼出的 Q 版角色，无 `.glb`、无外部资产文件 | **①层代码 MIT 的一部分**：代码级程序化几何，**非模型资产文件**，不受作者模型版权限制，也不受 ②层 CC 约束 | 保留 3D 模式；随代码 MIT 自由修改 / 复制 / 分发；可随主题调整材质配色 | **不得**误列进 ③层受限素材；不得写成「已移除 3D 能力」；不得称作「作者自制 3D 模型」；不得与 3 个已删 GLB 混为一谈 | 署名统一措辞：「不含任何角色 3D 模型文件／私人素材；保留的 2D 立绘是已署名的第三方 CC 素材」；`README.md` / `THIRD_PARTY_NOTICES.md` 明确「3D 模式由程序化几何提供」 |
| **② 2D 立绘与音效 dsh-pet** | `public/room/assets/pet/*.webm`（32）、`*.png`（35，含 `examples/`）、`public/room/assets/sound/click-duck.wav`、`public/room/assets/pet/CREDITS.md`。来源 [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)，形象「蓝毛小女仆」 | **CC BY-NC-SA 4.0**（BY 署名 / NC 非商业 / SA 相同方式共享）。注：dsh-pet 的**代码**部分是 MIT，与本层**素材**无关，不得混用 | 原样随仓库**非商业**再分发；原样在页面展示；运行时读取 / 切换 / 缩放显示；**仅在代码层**改材质、灯光、配色；上游既有的「英文 key 重命名 + ffmpeg 抽帧」改动随原样保留，本轮不追加任何新改动 | 任何商业使用：售卖、付费服务、商业宣传、广告变现；**任何改动素材像素**：重绘、调色、换色、裁剪、加滤镜、AI 重绘、重新编码 webm、重新导出 png、抽帧换帧、烘焙进场景贴图 / 图集；删除或弱化署名；把改编产物以 MIT / 闭源 / 更宽松许可发布；单独售卖或拆包素材 | `public/room/assets/pet/CREDITS.md`；**页面底部署名**（`index.html` `.foot` 的 dsh-pet 链接 + `CC BY-NC-SA 4.0` 字样，深色底板 / `#e6f1ff` / ≥12px 保证可读）；`THIRD_PARTY_NOTICES.md`；`PRIVACY_AND_ASSETS.md`；`INSPIRATION.md`；README 顶部与本文件的双声明 |
| **③ 作者自制 3D 模型（已移除）** | 上游模板根目录的一份 `.glb` 源模型，以及 `public/room/assets/models/` 下的优化展示版与原始工程文件（均为 `.glb`）。**现已全部物理删除**，该目录只剩 `README.md` | **作者保留全部版权**；仅随**原模板**用于个人、非商业展示；**二创、再分发、商用均需作者书面许可**（本仓库**未取得**）。**不是 MIT，不是 CC，不是公共领域** | 本仓库内**无任何可用授权**；仅可保留一段「已移除、不在本仓库内、不再分发」的事实声明 | 写成 MIT 或任何开源许可；保留**任何形式的副本**：工作副本、git 历史对象、LFS、Release 附件、压缩包、CDN、镜像、备份；留下载链接 / 磁力 / 镜像地址；沿用「附带作者授权模型」「已获授权」「仅随模板展示」等表述；把 `actor3d.js` 的程序化几何误列为需作者授权的模型资产 | 明确声明「作者自制 3D 模型已彻底移除，房间视觉全部由 Three.js 程序化几何与材质实现」；`THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`public/room/assets/models/README.md`、`README.md`、`SETUP.md`、`START_HERE.txt`、`CHANGELOG.md`、`GITHUB_UPLOAD.md`、页脚与 `app.js` / `model-actor.js` 全部同步；**不得留任何指向模型的 URL** |
| **④ 第三方安装包（已移除）** | 原 `tools/` 目录下的第三方 AI 管家 Windows / macOS 安装程序、目录内说明文件与校验和文件。**现整个目录已删除** | 该软件自有许可与隐私条款，**不属于本项目 MIT**。原分发授权只授予**原项目发布者**的特定授权，具人身属性，**不随 MIT 代码转移给本仓库发布者** | 本仓库 **不是被授权主体**，无任何再分发权；用户如需请自行前往官方渠道获取（仓库只做中性指引，不提供文件、不提供链接到安装包本体） | 随本仓库再分发 MSI / DMG / 压缩包；保留下载链接、邀请码、返利 / 领取活动；沿用「已获官方授权，由项目发布者随模板分发」——**沿用即构成虚假授权声明** | 明确声明「第三方安装包已整体移除，不在本仓库内，不提供下载」；删除授权分发小节、失效链接与历史条目里的授权表述 |

---

## 矩阵外的附带项（不计入四层，发布时不可漏）

| 项 | 位置 | 许可 / 处理 |
| --- | --- | --- |
| Three.js r160 | `public/room/vendor/three.module.js`、`GLTFLoader.js`、`BufferGeometryUtils.js` | **MIT**；必须保留 `public/room/vendor/LICENSE-three.txt`；主题系统**不得修改** vendor 源码 |
| npm 运行依赖 | `package.json` / `package-lock.json`（`@deepseek-ai/*`、`@modelcontextprotocol/sdk`、`@snowluma/*`、`js-yaml`、`zod`） | 各自遵循上游许可证，本仓库不重新授权；`@snowluma/*` 为第三方 SDK，保持不变 |
| SnowLuma / NapCat | **不在仓库内、不随仓库分发** | 使用前自行确认其许可证与 QQ 平台规则 |
| 电视 / 显示器内容 | `world.js` 的 `M.screen` / `M.deskScreen` | 由 `canvasTex` 程序化生成的 emissiveMap，**不属于素材授权层**，也不纳入主题色值表 |
| 私人数据 | 角色卡、`state/`、`audio/`、`config.json`、密钥 | 保持脱敏基线，不入库；`INSPIRATION.md` 只做公开署名，不复制原博主视频 / 图片 / 文字 |

---

## 双声明与非商业（R4 / R5 / R8 已决议采用）

- **代码 MIT / 素材 CC BY-NC-SA 4.0**，两者**授权不同，绝不可写成单一许可证**；
  素材部分以更严格者为准，`public/room/assets/pet/` **不得被当作 MIT 代码授权**。
- **整体仅非商业**：NC 是全仓库用途上限，不得用于售卖、付费服务或商业宣传；
  不规划「替换素材以便商用」的路径。代码**单独被取用**时 MIT 仍含商用，与仓库整体定位不矛盾。
- 4 套主题**只在代码层**写 `THREE.Material.color`、灯光颜色与 canvas 贴图色值，
  `public/room/assets/pet/` 与 `public/room/assets/sound/` **零字节改动**（HC-1 / HC-1b）。
- **灵感来源**：见 `INSPIRATION.md`，二次发布必须保留该文件，**不得宣称灵感来源为自有创作**。
- 可访问性分级：**Standard**（WCAG 2.1 AA 基线 + 4 套主题逐套对比度门禁）。
  3D 房间标签固定深色字 `0x2c2e33`、页面底部署名深色底板 + `#e6f1ff` + ≥12px（HC-5 / HC-6 必修项）。

---

## 相关文件

| 文件 | 作用 |
| --- | --- |
| [`LICENSE`](LICENSE) | **仅代码**的 MIT 全文与版权行 |
| [`ASSET_LICENSES.md`](ASSET_LICENSES.md) | 本文件：四层授权矩阵、双声明、非商业约束 |
| [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) | 第三方素材与依赖清单、已移除资产的事实声明 |
| [`PRIVACY_AND_ASSETS.md`](PRIVACY_AND_ASSETS.md) | 隐私与素材边界 |
| [`public/room/assets/pet/CREDITS.md`](public/room/assets/pet/CREDITS.md) | dsh-pet 逐项署名（必须保留） |
| [`INSPIRATION.md`](INSPIRATION.md) | 灵感来源署名（不得写成原创） |
| [`public/room/assets/models/README.md`](public/room/assets/models/README.md) | 模型目录现状与可选自定义模型约定 |
| [`docs/REMIX_CHANGES.md`](docs/REMIX_CHANGES.md) | 本分支逐文件改动清单 |
| [`public/room/THEMES.md`](public/room/THEMES.md) | 4 套主题色值表与换肤范围 |
