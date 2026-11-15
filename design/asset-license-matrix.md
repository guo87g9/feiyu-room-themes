# 素材授权矩阵与美术视觉规格

> **文档性质**：T-02 交付物 · **只写文档，不改代码**，未修改 `design/` 之外任何文件，未 git commit。
> **负责**：art-director（林绘澄） · 美术方向 / 技术美术 / 素材授权 / 可访问性
> **状态**：v1.2 · 已并入两轮用户拍板与 design-strategist 会签结论；**全部决议已闭环，无待拍板项**（第 6 节改为决议台账）
> **本仓库**：新建**独立公开仓库** `guo87g9/feiyu-room-themes`——**不 Fork、不继承上游 git 历史**（用户第二轮拍板），代码以复制文件方式取自上游模板；项目名 `feiyu-room-themes` 已定稿，全文仓库引用以此为准
> **上游基线**：`https://github.com/sh2234113/feiyu-room-template`（代码 MIT；2D 立绘与音效 dsh-pet CC BY-NC-SA 4.0）—— 作为**来源署名**保留，不是 git 父仓库
> **定位**：**纯非商业开源**；CC BY-NC-SA 4.0 的 NC 为长期约束，不规划商用替换路径
> **用户已定决策**：视觉换皮 + 精简合规版；移除作者提供的 **3 个 GLB 资产文件**（**仅此**，`actor3d.js` 程序化 Chibi 几何保留、3D 模式仍在）；移除第三方安装包；**玩法全保留**（QQ 桥接 / 菜园 / 电视投屏 / 私聊均不动，只精简资产层）；合规呈现全部强化（根目录 `ASSET_LICENSES.md` + README 首屏醒目双声明 + 页脚署名深色底板 / `#e6f1ff` / ≥12px）。主题锁死 4 套，key 固定 `blue_white`（默认）/ `seaside` / `forest` / `courtyard`。
> **已读上下文**：`LICENSE`、`THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`INSPIRATION.md`、`public/room/assets/pet/CREDITS.md`、`public/room/assets/models/README.md`、`README.md`、`public/room/world.js`（含 `M` 对象、`textures` 贴图基色、`skyTexture()`、`buildLights` / `updateEnvironment`）、`public/room/garden-world.js`（含 `M` 对象、菜园粒子、标牌与灯光）、`public/room/index.html`（CSS / 页脚署名）、`design/room-reskin-brief.md`（T-01 定稿）。

---

## 0. 物理状态核验（本文件以此为准，不假设文件还在）

已用文件系统逐项核验，下列为**实测**结果，不是推测：

| 项 | 实测状态 |
| --- | --- |
| `public/room/assets/pet/` | **32 个 `.webm` + 35 个 `.png`**（含 `examples/` 下 3 张示例帧）+ `CREDITS.md` —— 全部保留，一个字节都不动 |
| `public/room/assets/sound/` | `click-duck.wav` 1 个 —— 保留 |
| `public/room/assets/models/` | **只剩 `README.md`**，无任何 `.glb` |
| `tools/` | **空 / 已删除**，无 MSI、DMG、SHA256SUMS |
| 仓库根目录 | 无 `*.glb`（原 `anime maid 3d model.glb` 已删） |
| 工作副本 | 262 MB / 217 文件 → 24 MB / 184 文件 |

> 结论：**②层素材完好、③④层资产已物理清零**。但仓库内仍有大量**文本**在描述③④层资产"存在 / 已获授权 / 可下载"（见 §2.5），这是本轮最大的合规缺口，必须由工程与发布成员同步改写。

---

## 1. 四层授权矩阵（核心）

> 读法：**"公开仓库必须保留什么"是硬性放行条件**，缺一项即不建议发布。四层授权互不等价，越往下越严格；**整体仓库以最严格的 ②层 CC BY-NC-SA 4.0 的 NC 条款为上限**。

| 层 | 具体文件或目录 | 许可证 / 权利归属 | 允许做什么 | 禁止做什么 | 公开仓库必须保留什么 |
| --- | --- | --- | --- | --- | --- |
| **① 代码 MIT** | `src/`、`public/room/*.js`、`public/room/index.html`、`scripts/`、`*.mjs`、`*.json`、`*.css`、`LICENSE`、`design/`、`SETUP.md` 等全部自研源码与文档；**不含** ②层素材目录、**不含** `public/room/vendor/` 第三方代码 | MIT。`Copyright (c) 2026 Derpyu520 and qq-bridge / QSH contributors` + `Copyright (c) 2026 sh2234113` | 使用、复制、修改、合并、发布、分发、再授权、出售副本，**含商用**；本仓库新增代码可**追加**自己的版权行 | 删除或改写原两行版权声明；删除 MIT 全文；把 ②层 CC 素材称作"MIT 代码"并据此授权；把 ③④层资产写成 MIT 覆盖 | `LICENSE` 全文原样保留（两行原版权行一字不改）；新增版权行只能**追加**、不得替换；`THIRD_PARTY_NOTICES.md` 的「代码」段保留 `本项目代码：MIT`；README 保留上游来源与上游版权可见（独立新建仓库，非 Fork） |
| **①-a 澄清行（用户拍板，非第五层）** | `public/room/actor3d.js` 的**程序化 Chibi 几何小人**：代码里用 Three.js 基本几何体运行时拼出，无 `.glb`、无外部资产文件 | **①层代码 MIT 的一部分**：代码级程序化几何，**非模型资产文件，不受作者模型版权限制**，也不受 ②层 CC 约束 | 保留 3D 模式；随代码 MIT 自由修改 / 复制 / 分发（代码单独取用时含商用）；可随主题调整其材质配色 | **不得**把它误列进 ③层受限素材、不得写成「已移除 3D 能力」、不得称作「作者自制 3D 模型」、不得与 3 个已删 GLB 混为一谈；清理 `app.js` / `model-actor.js` 的 `MODEL_URL` 时**只删 GLB 引用，不删 3D 模式** | 署名段落采用统一措辞：「不含任何角色 3D 模型文件／私人素材；保留的 2D 立绘是已署名的第三方 CC 素材」；`README.md` / `THIRD_PARTY_NOTICES.md` 明确「3D 模式由程序化几何提供」；`LICENSE` 原 MIT 版权行原样保留 |
| **② 2D 立绘与音效 dsh-pet** | `public/room/assets/pet/*.webm`（32）、`public/room/assets/pet/*.png`（35，含 `examples/`）、`public/room/assets/sound/click-duck.wav`、`public/room/assets/pet/CREDITS.md`。来源 [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)，形象「蓝毛小女仆」 | **CC BY-NC-SA 4.0**（署名 BY / 非商业 NC / 相同方式共享 SA）。注：dsh-pet 的**代码**部分是 MIT，与本层**素材**无关，不得混用 | 原样随仓库**非商业**再分发；原样在页面展示；运行时读取 / 切换 / 缩放显示；**仅在代码层**改材质、灯光、配色；上游既有的"英文 key 重命名 + ffmpeg 抽 2.4s 透明 PNG"改动（见 `CREDITS.md`）随原样保留，本轮**不追加任何新改动** | 任何商业使用：售卖、付费服务、商业宣传、广告变现；**任何改动素材像素**：重绘、调色、换色、裁剪、加滤镜、AI 重绘、重新编码 webm、重新导出 png、抽帧换帧、烘焙进场景贴图 / 图集；删除或弱化署名；把改编产物以 MIT / 闭源 / 更宽松许可发布；单独售卖或拆包素材 | `public/room/assets/pet/CREDITS.md`；**页面底部署名**（`index.html` `.foot` 的 dsh-pet 链接 + `CC BY-NC-SA 4.0` 字样，且须**可读**，见 §4.3）；`THIRD_PARTY_NOTICES.md`；`PRIVACY_AND_ASSETS.md`；`INSPIRATION.md`（该文件明文要求二次发布必须保留、不得写成"自有创作"）；README 顶部「代码 MIT / 素材 CC BY-NC-SA」**双声明** |
| **③ 作者自制 3D 模型** | 原：根目录 `anime maid 3d model.glb`（58.9 MB）、`public/room/assets/models/da-feiyu.glb`（58.9 MB）、`da-feiyu.opt.glb`（6.7 MB，页面默认加载）。**现已全部物理删除**；目录内仅剩 `README.md`（内容过期，需工程改写） | **作者保留全部版权**；仅随**原模板**用于个人、非商业展示；**二创、再分发、商用均需作者书面许可**（本仓库未取得）。**不是 MIT，不是 CC，不是公共领域** | 本仓库内**无任何可用授权**；仅可保留一段"已移除、不在本仓库内、不再分发"的事实声明 | 写成 MIT 或任何开源许可；保留**任何形式的副本**：工作副本、git 历史对象、LFS、Release 附件、压缩包、CDN、镜像、备份；留下载链接 / 磁力 / 镜像地址；沿用"附带作者授权模型""已获授权""仅随模板展示"等表述；把 `actor3d.js` 的程序化 Chibi 几何误列为需作者授权的模型资产（见 ①-a 行） | 明确声明"作者自制 3D 模型已彻底移除，房间视觉全部由 Three.js 程序化几何与材质实现"；`THIRD_PARTY_NOTICES.md`「作者提供的 3D 模型」节、`PRIVACY_AND_ASSETS.md`「3D 模型」节、`public/room/assets/models/README.md`、`README.md`、`SETUP.md`、`START_HERE.txt`、`CHANGELOG.md`、`GITHUB_UPLOAD.md`、`index.html` 页脚与「画质」按钮、`app.js` / `model-actor.js` 的 `MODEL_URL` 全部同步改写；**不得留任何指向模型的 URL** |
| **④ 第三方安装包** | 原 `tools/`：`AI-Manager-v1.16.1-Windows.msi`（51.7 MB）、`AI-Manager-v1.16.1-macOS.dmg`（62 MB）、`tools/README.md`、`SHA256SUMS`。**现整个目录已删除** | 暴喵AI 自有许可与隐私条款，**不属于本项目 MIT**。原分发授权是暴喵AI官方授予**原项目发布者**的特定授权，具人身属性，**不随 MIT 代码转移给本仓库发布者** | 本仓库 **不是被授权主体**，无任何再分发权；用户如需请自行前往官方渠道获取（仓库只做中性指引，不提供文件、不提供链接到安装包本体） | 随本仓库再分发 MSI / DMG / 压缩包；保留下载链接、邀请码、返利 / 领取活动；沿用「已获暴喵AI官方授权，由项目发布者随模板分发」——**沿用即构成虚假授权声明** | 明确声明"第三方安装包已整体移除，不在本仓库内，不提供下载"；删除 `THIRD_PARTY_NOTICES.md`「暴喵AI管家安装包」节（现第 54–61 行）、`README.md` 中指向 `tools/README.md` 的失效链接、`CHANGELOG.md` 与 `START_HERE.txt` 中的授权表述 |

### 1.1 矩阵外的附带项（不计入四层，但发布时不可漏）

| 项 | 位置 | 许可 / 处理 |
| --- | --- | --- |
| Three.js | `public/room/vendor/three.module.js`、`GLTFLoader.js`、`BufferGeometryUtils.js` | MIT；必须保留 `public/room/vendor/LICENSE-three.txt`；**不得**随主题系统修改 vendor 源码 |
| npm 运行依赖 | `package.json` / `package-lock.json`（`@deepseek-ai/*`、`@modelcontextprotocol/sdk`、`@snowluma/*`、`js-yaml`、`zod`） | 各自遵循上游许可证，**本仓库不重新授权**；`@snowluma/*` 为第三方 SDK，保持不变 |
| SnowLuma | 不在仓库内，不随仓库分发 | 使用前自行确认其许可证与 QQ 平台规则 |
| `screen` / `deskScreen` 材质 | `world.js` `M.screen` / `M.deskScreen` | 由 `canvasTex` 程序化生成的 emissiveMap，**不属于素材授权层**，也不纳入主题色值表（见 §3.1 末） |
| 私人数据 | 角色卡、`state/`、`audio/`、`config.json`、密钥 | 保持脱敏基线，不入库；`INSPIRATION.md` 只做公开署名，不复制原博主视频 / 图片 / 文字 |

---

## 2. 关键风险判定（本轮最重要的两节之一）

### 2.1 SA 传染性：为什么"不改动素材像素"是硬约束

CC BY-NC-SA 4.0 的 **SA（ShareAlike，相同方式共享）**条款规定：一旦对素材构成 **Adapted Material（改编素材）**，该改编产物必须以**同一许可**（CC BY-NC-SA 4.0 或兼容许可）共享，并同时满足：标注改动、保留原署名与许可链接、继续保持 NC 非商业。

对本项目的具体含义：

- **改编的判定线是"素材内容本身是否被改动"，不是"文件是否被复制"。** 对 `public/room/assets/pet/` 下 `webm` / `png` 的任何像素级操作——重绘、调色、换色、裁剪、加滤镜、AI 重绘、重新编码、重新导出、抽帧换帧、把立绘烘焙进场景贴图 / 图集 / 截图产物——都会产生改编素材，该产物**必须**以 CC BY-NC-SA 4.0 共享，且**永远不能商用**。
- **传染范围有边界，但不该被赌。** CC 官方区分「集合（Collection）」与「改编（Adaptation）」：把**未改动**的素材与 MIT 代码并列打包在同一个仓库里，属于集合，代码不会因此变成 CC。但一旦把立绘合成进新的贴图、随主题导出"改色版立绘"、或把主题色烘进角色图像，那个合成物**本身**就是改编素材。本轮是"视觉换皮"，很容易顺手踩线。
- **NC 的上限作用于整个仓库的用途**：即使代码是 MIT，仓库整体也不得用于售卖、付费服务、商业宣传。MIT 的"可商用"只在**代码单独被取用**时成立。

> **判定结论（HC-1）**：本次视觉换皮**只在代码层改材质 / 灯光 / 配色，绝不改动任何素材文件本身**。这不是风格偏好，是让「代码 MIT」与「素材 CC BY-NC-SA」在公开仓库里能干净共存的**唯一**工程路径：主题表只写 `THREE.Material.color` / 灯光颜色，素材目录保持零字节差异。

### 2.2 整体仓库不能标成纯 MIT：必须双声明

`LICENSE` 是**代码**许可文件，把素材塞进去或把仓库 License 标成 `MIT` 都会造成误导性授权（下游会误以为可以商用立绘）。公开仓库必须做**「代码 MIT / 素材 CC BY-NC-SA」双声明**：

| 落点 | 要求 |
| --- | --- |
| `README.md` **首屏醒目区块**（已决议采用，R-5） | 一句话写清两层授权不同、素材以更严格者为准、整体仅非商业，并用醒目提示（引用块 / 徽标）明示「MIT 仅覆盖代码，素材为 CC BY-NC-SA 4.0」；给出 `CREDITS.md`、`THIRD_PARTY_NOTICES.md`、`ASSET_LICENSES.md` 三个链接。现 `README.md` 第 15 行已有雏形，需强化并移除同段第 14 行过期的模型表述 |
| `LICENSE` | 保持 MIT 全文原样，**不追加素材条款**、不改写两行版权行 |
| `THIRD_PARTY_NOTICES.md` | 保留「代码 / 2D 立绘 / Three.js / 运行依赖」段；删除或改写「作者提供的 3D 模型」与「暴喵AI管家安装包」两节 |
| `public/room/assets/pet/CREDITS.md` | **原样保留**，不得改写、不得删除 |
| 页面底部署名 | **必须修复**（R-6 已决议全部强化）：深色底板 `background:rgba(10,16,24,.72)` + 文字 `#e6f1ff` + 字号 ≥ 12px；保留 dsh-pet 链接与 `CC BY-NC-SA 4.0` 字样。现状 10.5px / 42% 不透明度 / 无底板，不合格（HC-6） |
| **根目录 `ASSET_LICENSES.md`（已决议采用，R-5）** | 由 **engineering-lead 落地**：用表格复述 §1 四层授权矩阵（层 / 具体文件 / 许可证 / 允许 / 禁止 / 必须保留），与 `LICENSE`（仅代码 MIT）并列，降低下游误读风险；README 首屏与 `THIRD_PARTY_NOTICES.md` 均链接到它。**不再是「可选」** |

> **已决议（R-5）**：GitHub 仓库的 License 徽标选 `MIT`，并在 README 首屏用醒目提示写明「MIT 仅覆盖代码，素材为 CC BY-NC-SA 4.0，整体非商业」，避免平台自动标注产生误导；根目录另立 `ASSET_LICENSES.md` 承载素材层授权，形成代码 / 素材双声明的物理分离。

### 2.2.1 统一署名措辞（用户拍板，可直接粘贴）

> 本项目 `feiyu-room-themes` 是**新建的独立公开仓库**，代码与户型取自 [`sh2234113/feiyu-room-template`](https://github.com/sh2234113/feiyu-room-template)（**非 Fork、不继承其 git 历史**），在其上做视觉二创：只更换房间配色主题，保留上游户型与全部玩法；不隶属于 DeepSeek、SnowLuma、腾讯或 QQ 官方。
> - **代码**：沿用上游 **MIT**，`LICENSE` 内两行原版权行原样保留；本仓库新增代码同样以 MIT 提供。
> - **2D 立绘与动画**：`public/room/assets/pet/` 来自 [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)（蓝毛小女仆），按 **CC BY-NC-SA 4.0** 使用——需署名、仅限非商业、衍生需相同方式共享；详见 `public/room/assets/pet/CREDITS.md`，页面底部署名保留。
> - **两者授权不同，绝不可写成单一许可证**；素材部分以更严格者为准，`public/room/assets/pet/` 不得被当作 MIT 代码授权。
> - **整体仅非商业**：不得用于售卖、付费服务或商业宣传。
> - **已移除 / 不含**：不含任何角色 3D 模型文件／私人素材；保留的 2D 立绘是已署名的第三方 CC 素材。作者提供的 3 个 GLB 模型文件与 `tools/` 下第三方安装包均已移除，不再随仓库分发。3D 模式由 `actor3d.js` 的代码级程序化几何提供。
> - **灵感来源**：见 `INSPIRATION.md`，二次发布必须保留该文件，不得宣称灵感来源为自有创作。

> 口径自检：① 同时出现 MIT 与 CC BY-NC-SA 4.0 **两个**许可证名并明示「授权不同」；② 不出现把灵感来源写成自有的表述；③ 用「角色 3D 模型**文件**」精确措辞，与保留的程序化 Chibi 几何不矛盾；④ 与 §1 ①-a 行、③层口径一致；⑤ 项目名用 `feiyu-room-themes`，仓库写成「独立新建、非 Fork」；⑥ 出现 `ASSET_LICENSES.md` 且标注为采用。

### 2.3 给 engineering-lead 的硬约束（请 team-lead 原样中转）

| # | 硬约束 | 理由 / 验收方式 |
| --- | --- | --- |
| **HC-1** | **不得改动 `public/room/assets/pet/` 与 `public/room/assets/sound/` 下任何文件的任何字节**。禁止重绘、调色、换色、裁剪、滤镜、AI 重绘、重新编码 `webm`、重新导出 `png`、抽帧换帧、把立绘烘焙进场景贴图 / 图集。主题系统**只写材质与灯光颜色**。 | SA 传染性，见 §2.1。验收：`git diff --stat` 对这两个目录为空；发布前对素材目录做一次哈希基线比对 |
| **HC-1b** | **不要对角色 `<video>` / `<img>` 施加会生成新文件的运行时色彩滤镜**（如 `hue-rotate` 后截图 / 缓存 / 导出）。若确实需要主题化角色，改为**在容器层加背景底板 / 描边 / 阴影**（完全不触碰素材），且需用户单独拍板，见 §6 R-3。 | 运行时显示变换虽未必构成"分发改编物"，但存在解释争议；容器底板方案零风险且同样提升轮廓对比度 |
| **HC-2** | 主题切换**不得写回玩法状态**；不得改户型、家具尺寸 / 位置 / 碰撞体、寻路点、交互热区、菜园数值、动作表、昼夜**判定与时长**。4 套主题的几何体数量、draw call、材质数量保持同一量级。 | 与 T-01 brief 的主题契约一致 |
| **HC-3** | **色值以 §3.2 / §3.3 为准**，`theme.js` 的键名必须逐一对齐 `world.js` 的 `M` 对象属性（见 §3.1 映射表）；4 个 key 固定 `blue_white` / `seaside` / `forest` / `courtyard`，默认 `blue_white`；未知 / 非法 key 回落默认并保留一次可诊断提示。 | 单一配置表（T-01 支柱 P3）；键名不一致会导致材质漏改、出现"半套主题" |
| **HC-4** | **`updateEnvironment()` 会把主题色覆盖掉，必须处理。** `world.js` 第 1785–1861 行在每次环境更新时用硬编码值重设 `world.sun.color`、`world.hemi.color` / `groundColor`、`world.scene.fog.color`，第 1848–1850 行还会把 `world.lampMaterials` 的颜色统一改成 `0xffd9a0` / `0x8f8b84`。若主题只在初始化时设色，**昼夜一刷新主题即失效**。必须把 night / dawn / dusk / day 四组硬编码色参数化为「**主题 × 时段**」矩阵（或让 `updateEnvironment` 读取当前主题的时段调色板），且**只改色调，不改强度基准（`sun.intensity` / `hemi.intensity` / `lamp` 的 `baseIntensity` 系数）**。 | 技术美术核心风险；同时满足 T-01「主题只改变昼夜色调，不改变判定与时长」。见 §3.4 / §3.5 |
| **HC-5** | **存在不经过 `M` 对象的硬编码颜色，属于主题盲区**，需一并收敛或显式豁免：`buildLabels()` 第 1768–1774 行的房间标签文字（`rgba(250,248,242,.9)` 白字 + `rgba(44,48,52,.42)` 描边）、`buildShell` 天花板 `0xf4efe6`、阳台 `0x355b70` / `0x8e8a80`、窗帘 `0xa9b8c8`、地垫 `0xc8d2d0` / `0x6b6f6a`、走廊地毯 `0x7d8ea0`、衣柜衣物 `[0x8fa3b8, 0xe1d6c4, 0x6f89a5, 0xc99a62]`、灯具 `0xffdca8`、以及 `rugTexture('#8d9ba8', …)` / `rugBed('#b3a5a0', …)` 等 canvas 贴图基色。天空渐变 `skyTexture()` 亦为硬编码。 | 不处理会出现"墙换了、地毯没换"的破碎感；**其中 `buildLabels` 的 3D 房间标签文字为「必须修复」项**（白字在四套亮墙上仅约 1.1:1），其余贴图基色可随 HC-9 一并收敛（§4.3） |
| **HC-6** | **页面底部署名必须可读**：`index.html` 第 187–192 行 `.foot` 为 `font-size:10.5px; color:rgba(170,192,214,.42)`、链接 `rgba(190,215,245,.55)`，且**无底板**，直接叠在 3D 亮墙上。**必须修复**（R-6 已决议全部强化）：深色底板 `background:rgba(10,16,24,.72)` + 文字 `#e6f1ff` + 字号 ≥ 12px；不再保留「仅提高不透明度」这个较弱选项。 | 署名"存在但不可读"可能被认为未以合理方式署名，是**授权 + 可访问性双重风险**；且 4 套主题墙色都在高亮区间，问题会被放大 |
| **HC-7** | **合规文本残留必须清零**（清单见 §2.5），尤其不得留任何模型 / 安装包下载链接、"已获授权"表述；`public/room/assets/models/README.md` 由工程改写为「已移除」说明或删除。 | 物理删除了、文档还在说"附带"，公开仓库自相矛盾 |
| **HC-8** | 主题系统**不得修改 `public/room/vendor/` 下任何文件**；不得引入外部图片 / CDN / 真实照片 / 新增 3D 资产。 | T-01 明确不做；vendor 为第三方 MIT 代码 |
| **HC-9** | **色值覆盖点扩展到 4 个文件域，必须一起参数化**（字段与 4 套值见 §3.8）：① `world.js` 的 `M` 调色板（§3.2）；② `world.js` 的 `textures` canvas 贴图基色（`tileKitchen` / `tileBath` / `tileBalcony` / `rugLiving` / `rugBed` / `woodFloorTexture` / `note` / `memoryBoard`）；③ `world.js` 的 `skyTexture(hour)` 四时段渐变与海面；④ `public/room/garden-world.js` 的 `M` 自有键（27 个）、菜园粒子（`sprayMaterial` / `sprinkle`）、标牌、灯笼点光。**玩法全保留**（QQ 桥接 / 菜园 / 电视投屏 / 私聊均不动，只精简资产层），所以菜园必须跟着换皮——只改 `M` 会出现「房间换了皮、菜园还是原色」的破碎感。 | 单一配置表（T-01 支柱 P3）；原色常量散落在上述 4 处。注意贴图基色在原代码里是 `'#RRGGBB'` 字符串，落表时统一转 `0xRRGGBB` 同值，`skyTexture` 的 `#RRGGBB` 同理 |
| **HC-10** | **程序化 Chibi 几何的归属**：`public/room/actor3d.js` 属 ①层代码 MIT（见 §1 ①-a 行），3D 模式与程序化小人**保留**；清理 `app.js` / `model-actor.js` 的 `MODEL_URL` 时只删 3 个 GLB 的引用与失效提示，**不得删除 3D 模式、不得把 `actor3d.js` 列入受限素材**。署名措辞用 §2.2.1 的统一版本。 | 用户拍板结论；避免把 MIT 代码误列进受限素材层，也避免文案写成「已移除 3D 能力」 |

> **优先级定性（design-strategist 会签 + 用户第二轮拍板）**：**HC-5 中的 3D 房间标签文字与 HC-6 页脚署名是「必须修复」，不是优化建议**。依据 §4.3 实测，四套浅色墙面上白色文字仅约 **1.1:1**，远低于 WCAG 2.1 AA 的 4.5:1；页脚署名同时承担 CC BY-NC-SA 4.0 的 **BY 署名义务**（须「以合理方式呈现」）。二者构成 **Standard 分级下的合规 + 可访问性双重阻塞项**：不修复则既不满足署名合规，也不满足本分级承诺的对比度门禁。**T-06 验收必须按 4 套主题逐套核查这两处**，不得作为「可选优化」跳过。页脚整改已由 R-6 决议为深色底板 + `#e6f1ff` + ≥12px。

### 2.4 与 T-01 brief 的对齐说明（供 team-lead 仲裁）

| 点 | T-01 brief 语义锚点 | 本规格的处理 | 是否需拍板 |
| --- | --- | --- | --- |
| T0 主色 | 低饱和浅冷白；**明确禁止高饱和亮蓝做主色**（会与蓝发立绘糊在一起） | `wall = 0xe8edf3` 低饱和冷白；`navy = 0x273b57` 藏青作辅色；`blue` 仅作中蓝过渡，不做主色；点缀 `accent = 0xd8b570` 白金。**★复核 ① 抢色检查已通过，结论见下表** | 否 |
| T0 / T1 区分度 | "若只差一点白，视为验收不通过" | T0 冷白 `0xe8edf3`（B 通道偏高）↔ T1 日晒暖白 `0xf2ebdd`（R 通道偏高），色相差 + 明度差双重可辨；T1 木色整体漂白、玻璃转海玻璃青 | 否 |
| T1 主色 | **日晒暖白**（略带暖调） | 已按暖白定稿（`0xf2ebdd`），未采用冷的"盐白" | 否 |
| T2 主色 | **深木棕**（大面积木作与梁）；同时 brief 第 69 行要求主色低饱和高留白、让立绘始终是焦点，第 122 行标注低照度红线 | **设计折衷**：墙 / 天花保持中高明度亚麻米（`wall = 0xe6ddc8`），把"深木棕"落在 `walnut = 0x5d3d28` / `darkWood = 0x3c281c` / `base = 0xa89073` 与大面积家具木作上。理由：若墙直接刷深棕，蓝发浅色立绘与白字标签的对比度虽升、但房间整体照度感骤降，会触发 brief 自身的"低照度 / 认知过载 / 视觉主导策略"红线。**不降低任何光照强度基准**，炉火橙只做点缀与灯光色温。**design-strategist 会签（2026-11-15）：折衷成立、无替代方案、不需仲裁、不需用户拍板** | **否**（已决议：R-2 会签通过 2026-11-15） |
| 点缀色唯一 | 4 套各只保留**一支**点缀色，承担交互焦点职能 | 每套主题单独给一个 `accent`（UI 交互高亮，不占 `M` 材质键）；同色系的陶器 / 织物色（如 T3 `terracotta`）标注为**材料色**，不算第二支点缀 | 否 |
| 默认与 key | `blue_white` 默认，4 个 key 固定 | 一致；`theme.js` 直接用 `blue_white` / `seaside` / `forest` / `courtyard`，项目名 `feiyu-room-themes` | 否 |
| ★复核 ① blue_white 抢色 | 默认主色不得与 dsh-pet 蓝发 / 藏青白金裙装 / 鲸尾立绘抢色，背景要退让 | **复核通过**：`wall = 0xe8edf3` 与 `ceiling = 0xf4f7fa` 为低饱和浅冷白（饱和度极低、明度高），与立绘浅蓝发同色系但**明度更高、饱和度更低**，构成「背景退让」；`navy = 0x273b57` 藏青与裙装同色，但只用于柜体 / 结构线等小面积，不做大面积背景；`blue = 0x4d7fb8` 仅作中蓝过渡；点缀白金 `0xd8b570` 呼应白金饰边。四套中 `blue_white` 是唯一与角色同冷色系的主题，靠**低饱和 + 高明度 + 小面积深色结构**实现退让，而非靠换色相；立绘轮廓另由容器层深色柔光 / 描边兜底（§3.7） | 否（已闭环） |
| ★复核 ② forest 低照度 | 低照度主题不得吃掉交互热区 | 已给出对比度下限与兜底高亮方案，见 **§4.5**：`accent 0xe8893c` 在 `walnut 0x5d3d28` 上 ≈ 3.7:1 达标；另配跨主题固定的 `0xffda7d` 兜底高亮层（在菜园土上 ≈ 7:1）；且热区高亮须用**不受光照影响的材质**，否则夜间 `sun.intensity 0.18` / `hemi.intensity 0.16` 会把受光材质压暗、使实测对比度失效 | 否（已闭环） |
| courtyard 范围 | 只取氛围，不实体化院落 / 石径 / 竹影实体，复用屋后菜园 | **不为不存在的院落几何写任何色值字段**；§3.8 中 `gravel` / `stone` / `stone2` 是上游 `garden-world.js` **已有的**菜园步道与砂岩踏板，不是新建院落石径；主题只改其材质色，不改几何 / 畦数 / 作物数值 | 否 |
| 程序化 Chibi 归属 | T-01 brief R1 / R2 曾把「不含任何角色模型」列为待拍板 | **用户已拍板**：3 个 GLB 移除，`actor3d.js` 程序化几何保留、3D 模式仍在；署名用 §2.2.1 精确措辞。见 §1 ①-a 行与 HC-10 | 否（已闭环） |
| T2 会签结论（主/辅色层级修正） | design-strategist 会签指出：其 brief §2.1 定义「主色 = 大面积底色，须低饱和高留白」，但 §2.4 却把深木棕写在主色位，属 brief 自身的主 / 辅色层级错配 | 本规格折衷**恰好修正了该错配**：主色回归亚麻米 `0xe6ddc8`（高留白），深木棕归入辅色（`walnut` / `darkWood` / `base` 与大面积木作），炉火橙只做点缀。会签确认与他的设计契约一致，折衷成立、无替代方案 | 否（已闭环） |

### 2.5 合规文本残留清单（实测扫描结果，需工程 / 发布成员同步改写）

| 文件 | 位置 | 现状 | 要求 |
| --- | --- | --- | --- |
| `THIRD_PARTY_NOTICES.md` | 15–21 行、54–61 行 | 仍写「作者提供的 3D 模型」两个 glb 文件、仍写「已获暴喵AI官方授权，由项目发布者随模板分发」 | 删除或改写为「已移除，不在本仓库内，不提供下载」；**不得沿用授权表述** |
| `PRIVACY_AND_ASSETS.md` | 10 行、48–61 行 | 「原始 3D 工程文件已随模板附带」「模板附带作者提供的优化版展示模型」「仓库约 85 MB」 | 改写为已移除；保留 §2D 立绘段的 `CREDITS.md` / 页面署名 / 双声明要求（该段合规，勿删） |
| `public/room/assets/models/README.md` | 全文 | 仍描述两个 glb 的尺寸 / 面数 / 模型约定 / "两个文件都随模板分发" | 由工程改写为「3D 模型资产已移除，房间视觉全部由程序化几何与材质实现」，或删除该文件 |
| `README.md` | 14、29、167、175 行 | 附带模型与 58.9 MB 备份、「画质」按钮切换模型、`tools/README.md` 链接、3D 模型条目 | 按 T-01 brief §5.3 / §5.4 改写；`tools/README.md` 为失效链接，删除 |
| `SETUP.md` | 25、288–302、377 行 | 3D 模型章节与"确认 glb 已下载" | 改写 / 删除 |
| `START_HERE.txt` | 28–30、51–52 行 | 模型路径 +「安装包经暴喵AI官方授权分发」 | 删除或改写 |
| `CHANGELOG.md` | 5–6 行 | 「新增 tools/ 目录：暴喵AI管家安装包」「经官方授权由项目发布者分发」 | 保留历史记录但**补一条本仓库变更**说明已移除；不得让最新状态读起来像仍在分发 |
| `GITHUB_UPLOAD.md` | 18、114 行 | `.glb` 排除规则 | 保留规则无害，但文案需说明模型已不存在 |
| `public/room/index.html` | 369 行「画质」按钮 title、486 行页脚 | 「标准 6.7 MB；高画质加载 58.9 MB 原始模型」；页脚「3D 模型用户提供」 | 改写；页脚只保留 dsh-pet 署名，删除已不存在的 3D 模型署名（**错误署名**）并提升可读性（HC-6） |
| `public/room/app.js` | 480–481 行 | `MODEL_URL` 指向两个不存在的 glb | 由 T-04 处理回落逻辑；**只删 3 个 GLB 引用、保留 3D 模式与 `actor3d.js` 程序化几何**（HC-10）；不得留"可从别处下载"的提示 |
| `public/room/model-actor.js` | 13–14 行 | 同上 | 同上；3D 模式本身不删 |
| `AI_SETUP_PROMPT.md` | 107–108 行 | 已写「3D 模型目录是空的」「不要提交 glb」 | **合规，保留**，可作其他文件的改写范本 |

> **风险登记 · 已规避（请中转 release-ops-lead / T-07）**：原风险为「本仓库若是 Fork，保留上游完整 git 历史时，历史对象里可能仍含 58.9 MB / 6.7 MB 的 glb 二进制，等于留副本，仅删工作副本不够」。
> **状态：已通过改新建仓方式规避** —— 用户第二轮拍板改为**新建独立公开仓库 `guo87g9/feiyu-room-themes`，不 Fork、不继承上游 git 历史**，代码以复制文件方式取自上游模板。新仓库的历史从零开始，天然不含上游 glb 对象，第 ③ 层「不得留副本」因此成立，**不需要** orphan 分支 / 精选 commit / `git filter-repo` 等历史清理。
> **保留核查命令作为二次验证建议**（防止初始化时误用 `git clone` / 导入上游历史）：发布前执行 ① `git log --all -- '*.glb'`（应为空）；② `git rev-list --count --all` 与提交数预期比对；③ `git ls-files | grep -iE '\.glb$|\.msi$|\.dmg$'`（应为空）；④ 确认 remote 只有新仓库、无上游 remote 残留。任一项命中即说明历史被意外继承，需回到「新建空仓 + 复制文件 + 首次提交」流程。

---

## 3. 四套主题完整色值规格（供工程实现 `theme.js`）

> 全部为 `0xRRGGBB`。**默认 `blue_white`**；UI 只显示中文名，代码 / 配置 / 持久化用英文 key。
> **主题 key 已按 T-01 定稿 + 用户拍板锁定**：`blue_white`（默认）/ `seaside` / `forest` / `courtyard`，4 套不再增减；`theme.js` 的顶层 key 逐字使用这四个，项目名 `feiyu-room-themes`。
> 色值是**渲染层参数**，不涉及任何素材文件字节（HC-1）。
> **覆盖范围已扩展**：除 `world.js` 的 `M` 调色板外，贴图基色、`skyTexture()` 渐变、`garden-world.js` 的菜园材质与粒子全部列成可参数化字段，见 **§3.8**（HC-9）。
> 每套主题遵循 T-01 的「主色低饱和高留白 / 辅色与主色保持明度差 / 点缀色唯一」三档语义；四套的墙面均落在 `0xe6–0xf2` 浅区间，保证 2D 立绘始终是视觉焦点。

### 3.1 键位映射：分组 ↔ `world.js` 中 `M` 对象属性 ↔ 运行时字段

| 任务要求的分组 | `M` 属性（键名，`theme.js` 必须逐字对齐） | 运行时落点 / 备注 |
| --- | --- | --- |
| 墙面 | `wall` | `M.wall`；俯瞰剖切时会被替换为 `M.wallGhost` |
| 墙面暖色 | `wallWarm` | `M.wallWarm` |
| 天花板 | `ceiling` | `M.ceiling`（注意 `buildShell` 另有一处硬编码 `0xf4efe6`，见 HC-5） |
| 踢脚线 | `base` | `M.base` |
| 地板木色 3 档 | `oakLight`（浅）→ `oak`（中）→ `walnut`（深） | `M.oakLight` / `M.oak` / `M.walnut`；`darkWood` 为**第 4 档**（最深木 / 梁 / 结构），一并给出 |
| 布艺 4 档 | `fabric` / `fabricBlue` / `fabricCream` / `fabricOchre` | 沙发 / 软装主体；**注意 `buildLaundry` 第 1513 行有同值的硬编码数组**，需一并参数化（HC-5） |
| 中性 / 素色织物 | `white` / `cream` / `linen` / `linenBlue` | 不属于上列 4 档布艺，单独列出 |
| 结构 / 点缀色 | `navy` / `blue` / `teal` / `black` / `dark` / `ceramic` | `navy` 是 T0 藏青辅色核心 |
| 金属 | `brass` / `steel` | `metal()` 工厂，`metalness ≈ 0.85`；`brass` 在 T0 承担白金点缀 |
| 石材 | `stone` / `stoneDark` | `M.stone` / `M.stoneDark` |
| 植物 | `plant` / `plantLight` / `soil` / `terracotta` | `soil` 土壤、`terracotta` 陶盆 / 陶器；**材料色，不算交互点缀色** |
| 玻璃 | `glass` / `glassFrost` / `mirror` | `MeshPhysicalMaterial`；`mirror` 由 `metal()` 构造 |
| 剖切半透明墙 | `wallGhost` | 建议**跟随 `wall` 同值**，否则俯瞰时会出现"墙变色"的破绽 |
| 灯泡色 | `bulb` / `bulbOff` / `bulbWarm` | `MeshBasicMaterial`；**会被 `updateEnvironment` 第 1848–1850 行覆盖**，见 HC-4 |
| 交互点缀色（本规格新增） | `accent`（**非 `M` 键**，UI / 热区高亮用） | 每套**唯一一支**；落 UI 层 CSS 变量与交互热区高亮，不写进 `M` |
| 雾色 | `fog` | `scene.fog.color`（初始 `new THREE.Fog(0x9db6c9, 38, 100)`；`updateEnvironment` 按 day/dawn/dusk/night 覆写） |
| 半球光天 / 地色 | `hemiSky` / `hemiGround` | `world.hemi.color` / `.groundColor`（`buildLights` 第 1688 行初值 + `updateEnvironment` 覆写） |
| 日光色 | `sun` | `world.sun.color`（`buildLights` 第 1692 行 + `updateEnvironment` 覆写） |
| 室内点光色 | `pointLightMain` / `pointLightAccent` | `buildLights` 第 1722 行 9 盏房间灯 `0xffd6a6`、第 1735 行 4 盏台灯 / 落地灯 `0xffc98c` |
| **不纳入色值表** | `screen` / `deskScreen` | 由 `canvasTex` 程序化生成 emissiveMap，非纯色；主题系统不改这两项，避免电视 / 显示器内容随主题漂移 |

### 3.2 主色值表（38 个 `M` 键 + `accent` × 4 套主题）

| 分组 | `M` 键 | 蓝白小屋 `blue_white`（默认） | 海边小屋 `seaside` | 森林木屋 `forest` | 中式小院 `courtyard` | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| 墙面 | `wall` | `0xe8edf3` | `0xf2ebdd` | `0xe6ddc8` | `0xeee9dc` | 低饱和冷白 / 日晒暖白 / 亚麻米 / 宣纸粉墙；四套与深色 UI 文字均 ≥ 10:1（§4.3） |
| 墙面暖色 | `wallWarm` | `0xe5e3da` | `0xe9dfc8` | `0xd8c9ae` | `0xe3d9c4` | 与 `wall` 保持轻微明度差，用于暖侧墙 / 局部 |
| 天花板 | `ceiling` | `0xf4f7fa` | `0xfaf5ea` | `0xeee5d2` | `0xf2ece0` | 恒高于 `wall`，保证上亮下稳 |
| 踢脚线 | `base` | `0xd2dae2` | `0xd9cdb5` | `0xa89073` | `0x6b6f6c` | T3 采用青砖灰，是辅色核心之一 |
| 木色①浅 | `oakLight` | `0xd6b98c` | `0xe0cdb0` | `0xc29968` | `0xbe8a5c` | 3 档地板木色之「浅」；T1 漂白木最亮 |
| 木色②中 | `oak` | `0xc09a6b` | `0xcbb294` | `0xa87a4c` | `0xa06b45` | 3 档之「中」，地板与家具主体 |
| 木色③深 | `walnut` | `0x7a5a3f` | `0x8c7157` | `0x5d3d28` | `0x4e3021` | 3 档之「深」；T2 主色「深木棕」落点 |
| 木色④最深 | `darkWood` | `0x50382a` | `0x5b4a39` | `0x3c281c` | `0x321f16` | 梁 / 结构线 / 深柜，非地板 3 档之一 |
| 素白 | `white` | `0xf6f8fa` | `0xfaf7ef` | `0xf0e8d8` | `0xf5f0e4` | |
| 奶油 | `cream` | `0xeae4d8` | `0xf0e5cf` | `0xe2d3b8` | `0xe8dcc2` | |
| 亚麻 | `linen` | `0xd6dde6` | `0xe3e2d6` | `0xc9bda6` | `0xd4c8ac` | |
| 亚麻蓝 | `linenBlue` | `0x8fa8c4` | `0x9dbecb` | `0x7f8f86` | `0x7b8f92` | T2 转灰绿、T3 转黛青 |
| 藏青 / 深蓝 | `navy` | `0x273b57` | `0x2c4a5c` | `0x2b3a30` | `0x2c3b42` | **T0 辅色核心**，呼应立绘藏青裙装 |
| 蓝 | `blue` | `0x4d7fb8` | `0x5f9bb5` | `0x5a7a6c` | `0x59798a` | 中蓝过渡；**禁止做主色**（避免与蓝发糊色） |
| 青绿 | `teal` | `0x4d7f7c` | `0x4f9b98` | `0x4a7060` | `0x4c7773` | T1 海玻璃青的材料色侧 |
| 黄铜 | `brass` | `0xc0a068` | `0xc3ab77` | `0xb08a4e` | `0xb58b4c` | `metal()`；T0 兼白金点缀质感 |
| 钢 | `steel` | `0xb8c4cc` | `0xc2cdd0` | `0xa9aca0` | `0x9fa8a8` | `metal()` |
| 黑 | `black` | `0x1a1c20` | `0x20262a` | `0x1b1a17` | `0x1d1c1a` | 屏幕 / 电器边框 |
| 深灰 | `dark` | `0x2c2e33` | `0x33404a` | `0x2d2a24` | `0x30302c` | |
| 石材 | `stone` | `0xdadfe4` | `0xe0e4df` | `0xcfc7b5` | `0xc9ccc6` | T3 青石 |
| 深石材 | `stoneDark` | `0x8b939b` | `0x9aa8a4` | `0x7f7a6c` | `0x7d8580` | |
| 植物 | `plant` | `0x4f7a52` | `0x5a8560` | `0x3f6b42` | `0x466b45` | T2 深苔绿 |
| 亮植物 | `plantLight` | `0x6d9a63` | `0x83a976` | `0x67914f` | `0x6f9159` | |
| 土壤 | `soil` | `0x44362a` | `0x4a4034` | `0x3a2e21` | `0x3d3226` | 菜园畦土 |
| 陶瓦 | `terracotta` | `0xb2745a` | `0xc08a6c` | `0x9e6247` | `0xa85a42` | T3 朱陶为**材料色**，不占点缀色名额 |
| 陶瓷 | `ceramic` | `0xe2edf2` | `0xe6f0ec` | `0xd9dcc9` | `0xdfe6df` | T3 青瓷 |
| 布艺① | `fabric` | `0x93a7bd` | `0xa8c2c4` | `0x8b8f78` | `0x9a8f7c` | 蓝灰 / 海雾 / 苔灰 / 素麻 |
| 布艺② | `fabricBlue` | `0x5b83b0` | `0x6fa2bb` | `0x64806a` | `0x6d8792` | |
| 布艺③ | `fabricCream` | `0xe6ded0` | `0xeee4d2` | `0xdcd0b4` | `0xe4d7bb` | |
| 布艺④ | `fabricOchre` | `0xc99a62` | `0xd0a874` | `0xb98a4e` | `0xb5503c` | T3 作朱砂织物色；交互点缀仍以 `accent` 为唯一 |
| 玻璃 | `glass` | `0xbfe3ff` | `0xc4eaf2` | `0xc3dcc4` | `0xc7ded9` | `MeshPhysicalMaterial`，保持 `opacity 0.14` 等参数不变 |
| 磨砂玻璃 | `glassFrost` | `0xd7e6ee` | `0xdceceb` | `0xd5ddd0` | `0xd8e0d9` | T3 仿宣纸糊窗 |
| 镜面 | `mirror` | `0xdde9ee` | `0xe2eff0` | `0xdce3d5` | `0xdbe4dc` | `metal()` |
| 剖切墙 | `wallGhost` | `0xe8edf3` | `0xf2ebdd` | `0xe6ddc8` | `0xeee9dc` | **跟随 `wall` 同值** |
| 灯泡 | `bulb` | `0xffd9a0` | `0xffdfae` | `0xffc879` | `0xffb867` | 会被 HC-4 的覆写逻辑覆盖，需参数化 |
| 灯灭 | `bulbOff` | `0xbfb6a8` | `0xc2beb1` | `0xa89b86` | `0xa39a88` | 同上 |
| 暖灯泡 | `bulbWarm` | `0xffe3b8` | `0xffe7c0` | `0xffd79a` | `0xffcf87` | 同上 |
| **交互点缀（唯一）** | `accent` | `0xd8b570` 白金 | `0x3f9c98` 海玻璃青 | `0xe8893c` 炉火橙 | `0xc0432f` 朱砂 | **非 `M` 键**，落 UI 变量 / 热区高亮；四套各只一支 |

### 3.3 环境与灯光色值表

> 前 6 行为**日间（day）基准值**，供 `buildLights()` 初始化与 `updateEnvironment()` 的 `day` 分支读取；`fogNight` / `hemiSkyNight` 为夜间示例，其余时段按 §3.5 的调制规则推导。
> **强度基准不得随主题改变**：`sun.intensity`（day 2.45 / dawn 1.15 / dusk 1.25 / night 0.18）、`hemi.intensity`（0.42 / 0.34 / 0.32 / 0.16）、`PointLight` 的 `baseIntensity` 与 `indoor` 系数**全部沿用上游数值，只换颜色**（HC-4 / T-01 跨主题不变量）。

| 字段 | 运行时落点 | 蓝白小屋 | 海边小屋 | 森林木屋 | 中式小院 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| `fog` | `scene.fog.color` | `0xa8c0d2` | `0xbcd8dd` | `0xb9c2ae` | `0xc9c8bd` | 沿用上游 day 值；林间雾 / 院落晨雾 / 海雾分别偏绿 / 灰 / 青 |
| `hemiSky` | `world.hemi.color` | `0xbcd7f0` | `0xcfe9f2` | `0xc7d6c0` | `0xd3d8cc` | 半球光天色 |
| `hemiGround` | `world.hemi.groundColor` | `0x8a7a66` | `0x9a9a86` | `0x6b5a44` | `0x8a7c66` | 半球光地色；T2 偏暗但**不降强度**（避免低照度红线） |
| `sun` | `world.sun.color` | `0xfff2dd` | `0xfff6e4` | `0xffe9c4` | `0xffeed2` | 日光色；T1 最冷白、T2 最暖 |
| `pointLightMain` | `buildLights` 第 1722 行 9 盏房间灯 | `0xffd6a6` | `0xffe0b8` | `0xffc482` | `0xffbe78` | 室内主点光 |
| `pointLightAccent` | `buildLights` 第 1735 行 4 盏台灯 / 落地灯 | `0xffc98c` | `0xffd2a0` | `0xffb774` | `0xffa85e` | 辅点光，比主光更暖一档 |
| `fogNight` | `updateEnvironment` night 分支 | `0x0c1828` | `0x0e2028` | `0x101a12` | `0x141a1c` | 夜间雾色，保留各主题色相倾向 |
| `hemiSkyNight` | `updateEnvironment` night 分支 | `0x6f8fb8` | `0x6f9aa8` | `0x6a7f6a` | `0x718290` | 夜间半球天色 |
| `sunDawn` / `sunDusk` | `updateEnvironment` dawn / dusk 分支 | `0xffc79a` / `0xffb187` | `0xffd0a4` / `0xffbd92` | `0xffb878` / `0xffa466` | `0xffcf9e` / `0xffbb88` | 黎明 / 黄昏，只做色温微调 |

### 3.4 `updateEnvironment()` 覆写问题：必须做成「主题 × 时段」矩阵

现状（`world.js` 1785–1861 行）在**每一次**环境更新时硬编码重设颜色：

| 时段 | 现状硬编码 | 主题系统改造后 |
| --- | --- | --- |
| night | `sun 0x9cc0ff`、`hemi 0x6f8fb8 / 0x2a3038`、`fog 0x0c1828` | 读取 `themes[key].timeOfDay.night.*` |
| dawn | `sun 0xffc79a`、`hemi 0xc8c4d8 / 0x7a6a58`、`fog 0xcbb7b0` | 读取 `themes[key].timeOfDay.dawn.*` |
| dusk | `sun 0xffb187`、`hemi 0xc7b8c0 / 0x6f5e50`、`fog 0xc9a99a` | 读取 `themes[key].timeOfDay.dusk.*` |
| day | `sun 0xfff2dd`、`hemi 0xbcd7f0 / 0x8a7a66`、`fog 0xa8c0d2` | 读取 `themes[key].fog / hemiSky / hemiGround / sun`（§3.3 基准值） |
| 灯泡 | 第 1848–1850 行把 `lampMaterials` 统一 `0xffd9a0` / `0x8f8b84` | 改为读取 `themes[key].bulb` / `themes[key].bulbOff`，**不要把主题灯泡色写死覆盖** |

**不允许的两种偷懒做法**：① 只在初始化设一次主题色、昼夜分支保持硬编码 → 首次昼夜刷新后主题丢失；② 在 `updateEnvironment` 之后用主题色再覆盖一遍 → 会把昼夜色调抹平、违反「昼夜判定不变、只换色调」。正确做法是**把四组硬编码抽成每段每主题一份调色板**，由 `updateEnvironment` 直接读当前主题。

### 3.5 时段调制规则（供工程推导未列出的中间值）

1. **判定与强度不变**：`night / dusk / dawn / day` 的时段边界（6.5 / 20.5 / 16.8 / 5.2 / 8 时）、`sun.intensity`、`hemi.intensity`、`indoor` 系数、`castShadow` 逻辑**一律不动**。
2. **只换色调**：以 §3.3 的 day 基准为锚，night 向主题色相的低明度冷色偏移（保留主题色相，如 forest 偏墨绿、courtyard 偏黛青），dawn / dusk 在原暖橙基础上叠加主题色温（T1 略冷、T2/T3 更暖）。
3. **雾色跟随时段但不吞掉主题**：night 雾色虽暗，仍保留各主题色相倾向（见 §3.3 `fogNight`），不要四套共用同一个 `0x0c1828`。
4. **天空 / 窗外**：`skyTexture(h)` 与窗外暖色平面（`0xffe0b0`）为硬编码，按 HC-5 收敛为程序化渐变参数（**禁止引入外部图片 / CDN**）。

### 3.6 `theme.js` 建议数据结构（规格示例，非代码改动）

键名必须与 §3.1 映射表逐字一致，否则会出现"半套主题"。示意：

```js
export const THEME_KEYS = ['blue_white', 'seaside', 'forest', 'courtyard'];
export const DEFAULT_THEME = 'blue_white';

// 每个 key 下：mats 逐键覆盖 world.js 的 M 对象；env 为 day 基准；
// timeOfDay 为 night/dawn/dusk 的调色板（HC-4）；accent 不与 mats 混用。
export const THEMES = {
  blue_white: {
    label: '蓝白小屋',
    mats: { wall: 0xe8edf3, wallWarm: 0xe5e3da, /* … 38 键齐全，见 §3.2 */ },
    env: { fog: 0xa8c0d2, hemiSky: 0xbcd7f0, hemiGround: 0x8a7a66,
           sun: 0xfff2dd, pointLightMain: 0xffd6a6, pointLightAccent: 0xffc98c },
    timeOfDay: { night: { /* … */ }, dawn: { /* … */ }, dusk: { /* … */ } },
    accent: 0xd8b570
  },
  seaside:   { /* … */ },
  forest:    { /* … */ },
  courtyard: { /* … */ }
};
```

**实现约定**：① 应用主题时遍历 `mats` 对 `M[k].color.set(v)`，但 `glass` / `glassFrost` / `mirror` / `wallGhost` 需保留各自材质类型与透明度参数，**只改 `color`**，不要重建材质实例（会导致 draw call 与材质数量漂移，违反 HC-2）；② `screen` / `deskScreen` 不改；③ 未知 key / 本地存储被清空 → 回落 `blue_white`，不白屏、不静默套用残留值（T-01 边缘情况 2 / 3）。

### 3.7 文字与角色立绘的跨主题对比度保证（验收口径）

| 对象 | 约束 |
| --- | --- |
| UI HUD 文本 | HUD 面板是**独立于主题的固定深色层**（`index.html` 现有 `rgba(13,22,34,.6)` 等深色底 + 浅蓝字）。**主题切换不得改变 HUD 文字与面板的配对**，因此主题色值变化不影响 UI 正文对比度。这是本规格刻意选择的架构：让「换皮」与「可读性」解耦。 |
| 3D 房间标签（`buildLabels`） | 直接叠在 3D 墙面上，四套墙色从 `0xe6ddc8` 到 `0xf2ebdd` 变化。现为白字 `rgba(250,248,242,.9)` + 极淡描边 `rgba(44,48,52,.42)`，**在四套亮墙上均不达标**。必须改为「深色文字 `0x2c2e33` + 浅色柔光底」或「白字 + 不透明深色底板」，四套逐套校验 ≥ 4.5:1（HC-5）。 |
| 页面底部署名（`.foot`） | 同 HC-6，加底板 / 提高不透明度 / 字号 ≥ 12px。 |
| 2D 立绘（蓝毛小女仆） | 立绘含浅蓝发、白围裙、藏青裙。四套墙 / 地板均为低饱和浅色，**明度接近的浅蓝发存在轮廓糊边风险**。因 HC-1 禁止改素材像素，兜底手段只能是**容器层**：给 sprite 容器加恒定的低不透明度深色柔光、1–2px 深色描边或固定深色底板（不作用于素材本身、不生成新文件）。**禁止**对 `webm` / `png` 施加 `hue-rotate` 等色彩滤镜并导出。 |
| 交互热区 / 可点击物 | 四套主题下保持**相同对比度下限**（T-01 跨主题不变量）。`accent` 在各自主题底色上须 ≥ 3:1（非文本图形，WCAG 1.4.11）；T2 深木背景上 `0xe8893c` 炉火橙约 3.7:1，达标（详见 §4.5）。低照度主题**不得降低光照强度基准**来"营造氛围"（brief 红线）。 |
| 状态编码 | 灯开 / 关、在线 / 离线、选中态等**不得只靠颜色区分**，须同时有图标 / 文字 / 形状变化；四套主题的点缀色色相不同（白金 / 青 / 橙 / 朱），更需避免"只靠颜色"传达语义。 |

### 3.8 跨文件可参数化字段（贴图 / 天空 / 菜园 / 粒子）—— HC-9 的直接输入

> **为什么要单列这一节**：用户拍板「**玩法全保留，只精简资产层**」，QQ 桥接、菜园、电视投屏、私聊都不动。但颜色常量并不只在 `world.js` 的 `M` 里，还散落在下面 4 个文件域。**只参数化 `M` 会漏掉菜园与窗外**，出现「房间换了皮、菜园与天空还是原色」的破碎感。以下每个字段都必须在 `theme.js` 里有对应键，4 套各给一份值。
> 原代码里 canvas 贴图与天空渐变用 `'#RRGGBB'` 字符串，**落表时统一转 `0xRRGGBB` 同值**（`'#e7e2d8'` → `0xe7e2d8`），数值不变。

| 文件域 | 源码位置 | 需参数化的字段 | 本小节 |
| --- | --- | --- | --- |
| `world.js` `M` 调色板 | 479–534 行 | 38 键 | §3.2 |
| `world.js` `textures` 贴图基色 | 465–477 行 + `woodFloorTexture` / `tileTexture` / `rugTexture` / `noteTexture` / `memoryBoardTexture` | 18 字段 | §3.8.1 |
| `world.js` `skyTexture(hour)` | 386–456 行 | 四时段 `top/mid/low` + 海面 5 字段 = 17 字段 | §3.8.2 |
| `garden-world.js` `M` 自有键 | 20–33 行 | 27 键（另 8 键**引用** `world.mats.*`，随 §3.2 自动跟随） | §3.8.3 |
| `garden-world.js` 粒子 / 灯光 / 标牌 | 212、219、321、349、484、488–489 行 | 11 字段 | §3.8.4 |

#### 3.8.1 `world.js` `textures` 贴图基色（18 字段）

| 字段 | 上游现值 | `blue_white` | `seaside` | `forest` | `courtyard` |
| --- | --- | --- | --- | --- | --- |
| `tex.tileKitchenMain` | `0xe7e2d8` | `0xe8ebee` | `0xf0ece0` | `0xe4dcc9` | `0xeee9dc` |
| `tex.tileKitchenGrout` | `0xc8c0b2` | `0xc4ccd4` | `0xd4cbb4` | `0xb9ae96` | `0xc2c0b4` |
| `tex.tileBathMain` | `0xdfe5e5` | `0xe2ebf0` | `0xe6f0ec` | `0xd9dcc9` | `0xdfe6df` |
| `tex.tileBathGrout` | `0xb9c4c4` | `0xb4c4d0` | `0xbfd0cb` | `0xa8ac9a` | `0xb3bebb` |
| `tex.tileBalconyMain` | `0xcbbba4` | `0xc9cdd4` | `0xdcd0b8` | `0xc9bda6` | `0xc9ccc6` |
| `tex.tileBalconyGrout` | `0xa8937a` | `0x9fa9b4` | `0xb9a98d` | `0x9a8a70` | `0x7d8580` |
| `tex.rugLivingMain` | `0x8d9ba8` | `0x8fa3bd` | `0xa8c2c4` | `0x8b8f78` | `0x9a8f7c` |
| `tex.rugLivingBorder` | `0x5d6b78` | `0x273b57` | `0x4f9b98` | `0x3c281c` | `0x2c3b42` |
| `tex.rugLivingAccent` | `0xd9d2c4` | `0xd8b570` | `0x3f9c98` | `0xe8893c` | `0xc0432f` |
| `tex.rugBedMain` | `0xb3a5a0` | `0xb9c6d6` | `0xd0dedb` | `0xc9bda6` | `0xd4c8ac` |
| `tex.rugBedBorder` | `0x7c6d6b` | `0x5279a3` | `0x6fa2bb` | `0x64806a` | `0x6d8792` |
| `tex.rugBedAccent` | `0xe9dfd2` | `0xe6ded0` | `0xfaf5ea` | `0xeee5d2` | `0xf5f0e4` |
| `tex.woodFloorBase` | `0xc9a97c` | `0xc09a6b` | `0xcbb294` | `0xa87a4c` | `0xa06b45` |
| `tex.woodFloorLight` | `0xf4f0e9` | `0xf4f7fa` | `0xfaf5ea` | `0xeee5d2` | `0xf2ece0` |
| `tex.notePaper` | `0xf2e7c9` | `0xf0f3f7` | `0xf7f0df` | `0xe2d3b8` | `0xe8dcc2` |
| `tex.noteTape` | `0xd9c7a0` | `0xc0a068` | `0xd0a874` | `0xb98a4e` | `0xb58b4c` |
| `tex.memoryBoard` | `0x6b5742` | `0x4a3326` | `0x5b4a39` | `0x3c281c` | `0x321f16` |
| `tex.buildLabelText` | `0xfaf8f2`（白字） | `0x2c2e33`（跨主题固定） | `0x2c2e33` | `0x2c2e33` | `0x2c2e33` |

> `tex.rugLivingAccent` 四套分别等于各自唯一的 `accent`（白金 / 海玻璃青 / 炉火橙 / 朱砂），使「点缀色承担交互焦点职能」在贴图上也一致。
> `tex.buildLabelText` 由白字改为**跨主题固定深色** `0x2c2e33`，依据 §4.3 实测（四套亮墙上白字仅约 1.1:1，深色字 ≥ 10:1）；它不随主题变，故工程实现时可写死，但必须列入 `theme.js` 的「跨主题不变量」区以便审计。
> **显式豁免**：`screenTexture('tv')` / `screenTexture('desk')` 的渐变（`0x22415f` / `0x4e7f9c` / `0xc7a06b` / `0x101820`）是电视与显示器的**内容**，不是房间材质，不随主题变（§3.1 已列）；`buildLabels` 的底板与描边按 HC-5 处理。

#### 3.8.2 `skyTexture(hour)` 四时段渐变与海面（17 字段）

| 字段 | 上游现值 | `blue_white` | `seaside` | `forest` | `courtyard` |
| --- | --- | --- | --- | --- | --- |
| `sky.dayTop` | `0x6fa9d8` | `0x6fa9d8` | `0x7cc0dc` | `0x7f9aa8` | `0x8fa8b4` |
| `sky.dayMid` | `0xb9d8ee` | `0xb9d8ee` | `0xc8e9ee` | `0xb9c9ae` | `0xcfd8cc` |
| `sky.dayLow` | `0xe8f1f4` | `0xe8f1f4` | `0xf2f6ee` | `0xe6e6cf` | `0xf0efe6` |
| `sky.nightTop` | `0x050b17` | `0x050b17` | `0x06131c` | `0x08120d` | `0x0a1014` |
| `sky.nightMid` | `0x0b1930` | `0x0b1930` | `0x0d2430` | `0x112018` | `0x162127` |
| `sky.nightLow` | `0x1a2c44` | `0x1a2c44` | `0x1d3a44` | `0x203026` | `0x27333a` |
| `sky.dawnTop` | `0x3d4f78` | `0x3d4f78` | `0x4a6386` | `0x4a5a6e` | `0x4c5a70` |
| `sky.dawnMid` | `0xa9778f` | `0xa9778f` | `0xb98f96` | `0xa89886` | `0xad9692` |
| `sky.dawnLow` | `0xf0b07c` | `0xf0b07c` | `0xf6c79c` | `0xe8bd86` | `0xeec9a4` |
| `sky.duskTop` | `0x4e5b7d` | `0x4e5b7d` | `0x5b7092` | `0x53596a` | `0x5c6274` |
| `sky.duskMid` | `0xc58a7a` | `0xc58a7a` | `0xcfa292` | `0xb59a7e` | `0xc0a08c` |
| `sky.duskLow` | `0xf4c08a` | `0xf4c08a` | `0xf8d0a2` | `0xe9bd86` | `0xefc9a0` |
| `sky.seaDay` | `0x4c7d99` | `0x4c7d99` | `0x4f9b98` | `0x56796c` | `0x6d8792` |
| `sky.seaDayBottom` | `0x1b3d52` | `0x1b3d52` | `0x20525a` | `0x2a4034` | `0x33474c` |
| `sky.seaDusk` | `0x5f728e` | `0x5f728e` | `0x6d8898` | `0x6b7a70` | `0x7b8790` |
| `sky.seaNight` | `0x0b1a2b` | `0x0b1a2b` | `0x0b2029` | `0x0b1a14` | `0x111e24` |
| `sky.seaNightBottom` | `0x050d16` | `0x050d16` | `0x061318` | `0x060f0b` | `0x0a1116` |

> **判定与几何不变**：`skyTexture` 的时段阈值（night `<5` 或 `≥21`、dawn `5–7.5`、dusk `17.5–21`）与 `updateEnvironment` 的昼夜判定均不动；只换渐变色。太阳 / 月亮、云、远山剪影、海平线亮带属于几何与亮度语义，**跨主题固定**，不列入主题字段（避免 4 套出现不同天体）。
> `forest` 的「海」在氛围语义上是远景林雾带，几何仍是同一张 `skyTexture`，仅做色相偏移；`courtyard` 的竹影只作为窗外剪影，不实体化。禁止引入外部图片 / CDN（HC-8）。
> `updateEnvironment()` 第 1796–1798 行会在时段变化时 `dispose()` 并用 `skyTexture(h)` 重建天空贴图，**重建时必须读取当前主题的 `sky.*` 字段**，否则主题色会被上游硬编码覆盖（与 HC-4 同源风险）。

#### 3.8.3 `garden-world.js` `M` 自有键（27 键）

| 字段 | 上游现值 | `blue_white` | `seaside` | `forest` | `courtyard` |
| --- | --- | --- | --- | --- | --- |
| `garden.soil` | `0x61432d` | `0x5a4130` | `0x6b5238` | `0x4a3524` | `0x55402c` |
| `garden.earth` | `0x75503a` | `0x70503a` | `0x7d5d43` | `0x5e422d` | `0x684c34` |
| `garden.clod` | `0x866044` | `0x826046` | `0x8f6c4e` | `0x6b4c34` | `0x77583c` |
| `garden.grass` | `0x8f9d6a` | `0x8aa176` | `0x9db287` | `0x6f8a58` | `0x82936a` |
| `garden.grassDark` | `0x6d8151` | `0x688050` | `0x779163` | `0x4f6b3f` | `0x5f7550` |
| `garden.gravel` | `0xb5ab8f` | `0xc2c9cf` | `0xd8cdb5` | `0xb0a58a` | `0xc9ccc6` |
| `garden.stone` | `0xd0c4a6` | `0xdadfe4` | `0xe0e4df` | `0xcfc7b5` | `0xc9ccc6` |
| `garden.stone2` | `0xbdb49e` | `0xc4cbd2` | `0xc9cfc6` | `0xb5ac96` | `0xb0b8b2` |
| `garden.stem` | `0x5e8237` | `0x5e8237` | `0x5f8a4a` | `0x4c7130` | `0x557a3c` |
| `garden.leaf` | `0x588b40` | `0x588b40` | `0x5a9360` | `0x3f6b42` | `0x4d7a46` |
| `garden.leafLight` | `0x80a84d` | `0x80a84d` | `0x8bb56a` | `0x67914f` | `0x7a9a58` |
| `garden.leafDark` | `0x386840` | `0x386840` | `0x3d7050` | `0x2b5034` | `0x335c40` |
| `garden.red`（番茄） | `0xc84b3e` | `0xc84b3e` | `0xc84b3e` | `0xc84b3e` | `0xc84b3e` |
| `garden.pink`（草莓） | `0xbf4d66` | `0xbf4d66` | `0xbf4d66` | `0xbf4d66` | `0xbf4d66` |
| `garden.orange` | `0xe0943d` | `0xe0943d` | `0xe0943d` | `0xe0943d` | `0xe0943d` |
| `garden.yellow`（玉米） | `0xe0bd57` | `0xe0bd57` | `0xe0bd57` | `0xe0bd57` | `0xe0bd57` |
| `garden.purple`（茄子） | `0x624065` | `0x624065` | `0x624065` | `0x624065` | `0x624065` |
| `garden.greenFruit` | `0x62884b` | `0x62884b` | `0x62884b` | `0x62884b` | `0x62884b` |
| `garden.cucumber`（黄瓜） | `0x3e7345` | `0x3e7345` | `0x3e7345` | `0x3e7345` | `0x3e7345` |
| `garden.white` | `0xf2e6c9` | `0xf2e6c9` | `0xf2e6c9` | `0xf2e6c9` | `0xf2e6c9` |
| `garden.potato`（土豆） | `0xb69762` | `0xb69762` | `0xb69762` | `0xb69762` | `0xb69762` |
| `garden.teal` | `0x5e8882` | `0x5e8882` | `0x4f9b98` | `0x4a7060` | `0x4c7773` |
| `garden.seed` | `0xd2bc86` | `0xd2bc86` | `0xd8c8a0` | `0xc2b184` | `0xcdbb92` |
| `garden.roof` | `0x516a65` | `0x4a6470` | `0x5b7f7d` | `0x3f5347` | `0x4a5c5e` |
| `garden.cream` | `0xe9dfc6` | `0xeae4d8` | `0xf0e5cf` | `0xe2d3b8` | `0xe8dcc2` |
| `garden.water` | `0x567e86` | `0x5b8296` | `0x4f9ba3` | `0x4a7068` | `0x59798a` |
| `garden.selected`（选中高亮） | `0xffda7d` | `0xffda7d` | `0xffda7d` | `0xffda7d` | `0xffda7d` |

> **跨主题不变量（9 项作物语义色）**：`red` / `pink` / `orange` / `yellow` / `purple` / `greenFruit` / `cucumber` / `white` / `potato` 是**作物识别色**，番茄必须红、茄子必须紫、玉米必须黄。随主题换色相会破坏玩法可读性，违反 T-01「主题不得带来可读性劣势」。它们在 `theme.js` 里仍要有键（便于审计与将来扩展），但四套取同值。
> **`garden.selected` 跨主题固定 `0xffda7d`**（`emissive 0x9d6b23` 保持）：它是交互焦点兜底高亮，在菜园土色上约 **6.6–8.5:1**（随主题土色明度变化），远超 3:1 下限；主题 `accent` 只以描边 / 外发光形式叠加，**不承担唯一对比度职责**。依据 T-01 brief 第 122 行「必要时给交互热区加与主题无关的固定描边 / 高亮层」。详见 §4.5。
> **引用关系（关键）**：`garden-world.js` 第 21–30 行的 `timber` / `endgrain` / `darkwood` / `hardware` / `iron` / `ceramic` / `terracotta` / `brass` 是**直接引用 `world.mats.*` 的同一材质实例**，不新建材质。因此 §3.2 改 `M[k].color` 时菜园会自动跟随；**HC-2「不要重建材质实例」对菜园尤其关键**——一旦主题实现改成 `new THREE.MeshStandardMaterial(...)` 替换实例，菜园这 8 键会断链、退回原色。

#### 3.8.4 菜园粒子 / 灯光 / 标牌（11 字段）

| 字段 | 源码位置 | 上游现值 | `blue_white` | `seaside` | `forest` | `courtyard` |
| --- | --- | --- | --- | --- | --- | --- |
| `garden.particleWater`（浇水粒子 / `sprayMaterial`） | 321、349 行 | `0x9fd9e5` | `0x9fd9e5` | `0xa8e2e6` | `0x9fc9b4` | `0xa8cfd4` |
| `garden.particleSeed`（播种粒子） | 349 行 | `0xd2bc86` | `0xd2bc86` | `0xd8c8a0` | `0xc2b184` | `0xcdbb92` |
| `garden.particleEarth`（翻土粒子） | 349 行 | `0x75503a` | `0x70503a` | `0x7d5d43` | `0x5e422d` | `0x684c34` |
| `garden.soilDry`（湿度 lerp 起点） | 484 行 | `0x75503a` | `0x70503a` | `0x7d5d43` | `0x5e422d` | `0x684c34` |
| `garden.soilWet`（湿度 lerp 终点） | 484 行 | `0x403425` | `0x3a2f22` | `0x453424` | `0x2f2419` | `0x352a1e` |
| `garden.lanternGlow`（灯笼材质色） | 212 行 | `0xffe2ac` | `0xffe3b8` | `0xffe7c0` | `0xffd79a` | `0xffcf87` |
| `garden.lanternEmissive` | 212 行 | `0xffc976` | `0xffd9a0` | `0xffdfae` | `0xffc879` | `0xffb867` |
| `garden.lanternLight`（`PointLight`） | 219 行 | `0xffd396` | `0xffc98c` | `0xffd2a0` | `0xffb774` | `0xffa85e` |
| `garden.signBg`（菜牌底） | 83、488 行 | `0xe9dfc5` | `0xeae4d8` | `0xf0e5cf` | `0xe2d3b8` | `0xe8dcc2` |
| `garden.signFg`（菜牌字 / 框） | 83、488–489 行 | `0x385344` | `0x2c3a32` | `0x2c3a32` | `0x2c3a32` | `0x2c3a32` |
| `garden.signMatureBg`（成熟菜牌底） | 488 行 | `0xe9d391` | `0xe9d391` | `0xead9a2` | `0xd9c184` | `0xe0c78e` |

> `sprinkle.material.color.set(...)` 在第 349 行按类型分支硬编码，须改为读 `garden.particleWater` / `particleSeed` / `particleEarth`；第 484 行的湿度 `lerp` 两端、第 488–489 行的 `ctx.fillStyle` 同理。
> **粒子语义色不随主题换色相**（水 = 蓝、种子 = 米、土 = 棕），只做色温微调：玩家靠颜色区分浇水 / 播种 / 翻土，换色相会造成认知负担。
> `garden.signFg` 改为**跨主题固定深色 `0x2c3a32`**，在四套浅色牌底上 ≥ 7:1，低视力高对比模式也达标；不随主题变。

#### 3.8.5 跨主题不变量清单（工程需单列一区便于审计）

| 不变量 | 值 / 规则 | 理由 |
| --- | --- | --- |
| 10 项作物语义色 | §3.8.3 表中四套同值 | 作物识别属玩法可读性 |
| `garden.selected` 兜底高亮 | `0xffda7d` + `emissive 0x9d6b23`，四套固定 | 交互焦点对比度下限，见 §4.5 |
| 粒子语义色相 | 水蓝 / 种子米 / 土棕，只调色温 | 状态可辨 |
| `tex.buildLabelText` / `garden.signFg` | `0x2c2e33` / `0x2c3a32`，四套固定 | 文字对比度（§4.3） |
| 天空天体 / 云 / 远山剪影 / 海平线亮带 | 几何与亮度语义固定 | 避免 4 套出现不同天体 |
| 时段判定与光照强度基准 | 全部沿用上游 | HC-4 / T-01 不变量 |
| `screen` / `deskScreen` 内容色 | 固定 | 电视 / 显示器内容不随房间主题漂移 |
| 几何体数量 / draw call / 材质数量 | 四套同一量级 | HC-2 |

#### 3.8.6 `courtyard` 的范围声明（不写院落几何色值）

> **中式小院只取氛围，不实体化院落 / 石径 / 竹影实体**，复用上游已有的屋后菜园。因此本规格**不为不存在的院落几何写任何色值字段**——没有「院墙色」「石径色」「竹影实体色」这类键。
> §3.8.3 / §3.8.4 中的 `gravel` / `stone` / `stone2` / `soil` / `earth` 是 `garden-world.js` **已有的**菜园步道、砂岩踏板与 8 畦菜地（第 96–100 行），不是新建院落；`courtyard` 只把它们换成青砖灰 / 青石色调，不改几何、不改畦数、不改作物数值、不改碰撞体。竹影只作为 `skyTexture` 的窗外剪影语义存在。
> 与 T-01 brief §2.5「取小院之意，不取小院之形」一致；任何把「小院」实体化的改动都违反「换皮不改玩法」。

---

## 4. 可访问性分级建议

### 4.1 结论：选 **Standard**（不是 Basic，也不是 Comprehensive）

| 候选 | 判断 |
| --- | --- |
| Basic | **不够**。本轮新增 4 套可切换主题，墙色 / 灯光 / 点缀色在四套间漂移，天然带来对比度衰减与低照度风险（T-01 已把 T2 标为红线）。Basic 不要求系统性对比度门禁，无法覆盖「主题切换不得造成可读性劣势」这条核心红线。 |
| **Standard（选定）** | **恰好**。可在**纯代码层**完整落地，与 HC-1「不改动素材像素」完全自洽：对比度门禁、UI 文本与主题解耦、文本缩放、减少动效、色觉不依赖单一颜色、键盘可达、焦点可见。对「精简合规版 + 公开开源」是合理基线，不引入范围膨胀。 |
| Comprehensive | **本轮不达标且不宜承诺**。角色动画是第三方 `webm`，NC-SA 禁止改像素，屏幕阅读器级的完整动作描述 / 音频描述、全量输入重映射等特性无法在不改素材的前提下完整覆盖；且超出「精简合规版」定位。列为后续升级路线（§4.4），不作为本轮承诺。 |

**分级定义（供 UX 规格引用）**：`Standard = WCAG 2.1 AA 基线 + 4 套主题逐套对比度门禁 + 动效 / 色觉 / 键盘可访问；不含屏幕阅读器全量适配与音频描述。`
> 请 design-strategist 在 UX 规格中**显式引用本分级**（"可访问性分级：Standard，依据 `design/asset-license-matrix.md` §4"），避免 UX 与实现各说各话。此项由 team-lead 中转。

### 4.2 特性矩阵（Standard）

| 特性 | Standard 要求 | 本项目落地方式 | 验收阈值 | 与硬约束的关系 |
| --- | --- | --- | --- | --- |
| 文本对比度 | 正文 ≥ 4.5:1，大字 / 图形 ≥ 3:1（WCAG 1.4.3 / 1.4.11） | HUD 深色面板与主题解耦；3D 标签与页脚署名加底板 | **4 套 × 昼夜 4 时段**逐套校验 | 依赖 HC-5 / HC-6 |
| 低视力对比度增强 | 提供「高对比」开关，正文 ≥ 7:1（AAA 1.4.6） | UI 层独立开关，切换背景 / 文字配对，**不依赖主题色** | 开启后所有文本 ≥ 7:1 | 见 §4.3 |
| 文本缩放 | 支持 200% 缩放不丢失内容 / 功能（1.4.4） | 用 `rem` / 相对单位；现 `index.html` 字号普遍 10.5–12.5px、媒体查询降到 9px，需复核 | 200% 下无截断 / 重叠 | 纯代码层，不碰素材 |
| 主题切换对比度 | 切换**不得**让任何文本 / 热区跌破下限 | `accent` 与底板逐套校验；HUD 配对固定 | 四套间最小对比度一致 | 见 §4.3 |
| 角色立绘辨识 | 立绘轮廓在四套主题下均可辨 | **容器层**深色柔光 / 描边 / 底板，不改素材字节 | 人工四套比对 + 截图留证 | **HC-1 / HC-1b** |
| 非颜色编码 | 状态不得只靠颜色（1.4.1） | 灯 / 在线 / 选中态加图标或文字；`accent` 四套色相不同，此项更重要 | 灰度截图下状态仍可辨 | 纯代码层 |
| 减少动效 | 遵循 `prefers-reduced-motion`（2.3.3） | 现 `index.html` 未见该媒体查询（loader `float` 动画、多处 `transition`）；新增降级 | 开启后无持续动画 / 无主题切换转场 | 纯代码层；**不修改 `webm` 播放本身**（素材不可改），改为允许暂停 / 降低切换频率 |
| 键盘可达 / 焦点可见 | 全部可交互元素可 Tab 到达，焦点样式可见（2.1.1 / 2.4.7） | 主题切换按钮须可达、有 `aria-pressed`、当前主题可读（现 `chip` 已有 `aria-pressed` 用法可复用） | 无键盘陷阱；焦点对比 ≥ 3:1 | 纯代码层 |
| 昼夜 / 低照度 | 暗色组合（夜间 + forest）仍满足热区下限 | **只换色调不降强度基准**（HC-4） | 夜间 + forest 下热区 ≥ 3:1 | HC-4 / T-01 红线 |
| 动效与闪烁 | 无 3Hz 以上闪烁（2.3.1） | 灯光切换用渐变、不闪切 | 无高频闪烁 | 纯代码层 |
| 署名可读性 | 署名须以合理方式呈现 | 页脚加底板 / 提清晰度（HC-6） | 署名文字 ≥ 4.5:1 且 ≥ 12px | **授权合规 + 可访问性双重** |

### 4.3 主题切换对低视力用户的对比度要求与实测

**要求**

1. **架构要求**：HUD / 对话框 / 页脚的「文字色 + 面板底色」配对**不随主题变化**，主题只作用于 3D 场景。这样低视力用户换主题时对比度不跳变，是本分级能成立的前提。
2. **门禁要求**：正文 ≥ 4.5:1；大字 / 图标 / 交互热区 ≥ 3:1；开启「高对比」开关后正文 ≥ 7:1。**四套主题 × 四个时段（day / dawn / dusk / night）共 16 种组合**逐一校验，取最小值作为门禁。
3. **3D 标签与署名**：因 `buildLabels` 与 `.foot` 叠在 3D 亮墙上，必须自带底板，不能依赖墙色。
4. **最坏组合**：`night + forest`（最暗）与 `day + seaside`（最亮）为两个极端用例，须优先截图留证；**不得以"低照度氛围"为由降低 `sun.intensity` / `hemi.intensity`**。
5. **立绘**：见 §3.7，容器层兜底，禁止改素材像素。
6. **T1 / T2 区分度**（design-strategist 会签附带发现）：T2 主色改亚麻米后与 T1 日晒暖白同属暖白系，**墙面明度差不足以承担区分**，区分责任落在辅色木作明度差与点缀色相上；逐套校验判据见 §4.3.1，T-06 需并排截图留证。

**实测（WCAG 2.1 相对亮度公式，深色文字 `0x2c2e33` 对各主题墙面）**

| 主题 | `wall` | 与 `0x2c2e33` 对比度 | 与浅色文字 `0xfafbf9` 对比度 | 结论 |
| --- | --- | --- | --- | --- |
| 蓝白小屋 | `0xe8edf3` | **≈ 11.5:1** | ≈ 1.14:1（不达标） | 深色文字安全；白字必须加底板 |
| 海边小屋 | `0xf2ebdd` | **≈ 11.4:1** | ≈ 1.08:1（不达标） | 同上；四套中墙面最亮，白字风险最高 |
| 森林木屋 | `0xe6ddc8` | **≈ 10.1:1** | ≈ 1.17:1（不达标） | 同上；四套中墙面最暗 |
| 中式小院 | `0xeee9dc` | **≈ 11.2:1** | ≈ 1.11:1（不达标） | 同上 |

> **关键推论**：四套浅色墙面上**白色文字一律不达标（约 1.1:1）**，而 `buildLabels` 现状恰恰是白字 + 极淡深色描边。因此 HC-5 不是"优化建议"而是**必修项**：要么改深色文字，要么给白字加不透明深色底板。深色文字在四套墙面上均 ≥ 10:1，达到 AAA 7:1，可直接作为低视力模式的落地方案。
> 注：上表数值按 WCAG 相对亮度公式手算，工程实现时请用自动化工具（如 `axe` / 对比度计算脚本）复核对全部 16 种组合。

### 4.3.1 T1（海边小屋）/ T2（森林木屋）区分度判据（逐套校验，T-06 截图留证）

**背景**：R-2 会签后，T2 主色由「深木棕」改为亚麻米 `0xe6ddc8`，与 T1 日晒暖白 `0xf2ebdd` 同属暖白系。实测两套墙面的 WCAG 明度对比仅 **≈ 1.14:1**，肉眼几乎无法靠墙色区分。因此「这两套不得看起来像同一套」的验收责任**全部落在辅色木作与点缀色**上，不能依赖主色。这是**区分度提示，不是对 R-2 折衷的否决**。

**量化判据（全部为下限，当前色值已逐项通过）**

| 判据 | 计算方式 | 下限 | 当前实测 | 判定 |
| --- | --- | --- | --- | --- |
| 墙面明度差 | T1 `wall 0xf2ebdd` 与 T2 `wall 0xe6ddc8` 的 WCAG 明度对比 | **不作为区分依据**（明确豁免） | ≈ 1.14:1 | 符合预期，不据此判失败 |
| 木作浅档 `oak` 明度对比 | T1 `0xcbb294` ↔ T2 `0xa87a4c` | ≥ **1.8:1** | ≈ 1.86:1 | 达标 |
| 木作深档 `walnut` 明度对比 | T1 `0x8c7157` ↔ T2 `0x5d3d28` | ≥ **2.0:1** | ≈ 2.13:1 | 达标 |
| 木作最深档 `darkWood` 明度对比 | T1 `0x5b4a39` ↔ T2 `0x3c281c` | ≥ **1.6:1** | ≈ 1.64:1 | 达标 |
| 点缀色 `accent` 色相差 | T1 `0x3f9c98`（海玻璃青，H≈177°）↔ T2 `0xe8893c`（炉火橙，H≈27°），HSV 色相环差 | ≥ **120°** | ≈ 150° | 达标 |
| 布艺 / 玻璃辅助可辨 | `fabric` T1 `0xa8c2c4` ↔ T2 `0x8b8f78`；`glass` T1 `0xc4eaf2` ↔ T2 `0xc3dcc4` | 色相或明度至少一项肉眼可辨 | 海雾青 ↔ 苔灰；青玻璃 ↔ 绿玻璃 | 达标 |

**并排人工判读（T-06 必做）**：同一机位、同一时段（`day`）、同一光照强度、同一相机参数下截取 T1 与 T2 并排图；观察者应能**一眼**分辨「漂白原木 + 海玻璃青」与「深木棕 + 炉火橙」。若需盯看超过 2 秒、或需靠文字提示才能分辨，即判定**验收不通过**，退回 art-director 复核色值（优先加大 `walnut` / `oak` 明度差，其次加大 `accent` 色相差）。

**不因区分度调整而放宽的项**：§4.3 的 16 组「主题 × 时段」对比度门禁、§4.5 的 `forest` 低照度兜底、作物语义色跨主题不变量（§3.8.5）全部保持不变；区分度只通过**辅色与点缀色**实现，**不得**改回「把墙刷深棕」或降低光照强度基准。

### 4.4 后续升级到 Comprehensive 的缺口清单（本轮不做，仅登记）

| 缺口 | 阻塞原因 | 解除条件 |
| --- | --- | --- |
| 角色动画的屏幕阅读器描述 / 音频描述 | `webm` 属 CC BY-NC-SA 素材，不可改像素；完整描述需逐动作覆盖 32 个动画 | 取得 dsh-pet 书面许可，或替换为自有可商用素材 |
| 全量输入重映射 | 需覆盖点击移动 / 长按抓取 / 第一视角相机等自定义交互 | 独立排期 |
| 完整字幕 / 文本替代 | 电视投屏、气泡文本已有 DOM 层可做，但动画语义仍缺 | 与上一项联动 |
| 高对比模式的 3D 场景级适配（非仅 UI） | 需要为 3D 标签 / 热区单独出一套高对比调色板 | 可在 Standard 基础上增量扩展 |
| 商用场景 | **已决议：纯非商业开源**（R-4），CC BY-NC-SA 4.0 的 NC 为长期约束 | **不再列为升级路径、不规划素材替换**；README 与 `ASSET_LICENSES.md` 保留「整体仅非商业」声明。代码层 MIT 在**代码单独被取用**时仍可商用，与仓库整体非商业定位不矛盾（§2.1） |

### 4.5 `forest` 低照度主题：交互热区对比度下限与兜底高亮（必复核项 ②）

**复核结论**：`forest` 是本轮唯一低照度主题，也是 T-01 brief 标注的设计红线——暗背景里找不到可点击物，会让玩家误以为某套主题"更难用"，构成事实上的**视觉主导策略**（玩家被迫选更亮的主题）。本规格已从**色值、光照强度、材质类型、冗余编码**四层给出兜底，结论为**风险闭环**；因此无需把墙刷成深棕（§2.4 折衷成立）。

**对比度下限（硬性门禁）**

| 对象 | 下限 | 依据 | `night + forest` 最坏组合 |
| --- | --- | --- | --- |
| 正文 / 标签文字 | ≥ 4.5:1 | WCAG 2.1 AA 1.4.3 | 仍 ≥ 4.5:1：HUD 与主题解耦；3D 标签改用固定深色字 `0x2c2e33`，在 `wall 0xe6ddc8` 上 ≈ 10.1:1 |
| 交互热区 / 可点击物 / 图标 | ≥ 3:1 | WCAG 2.1 AA 1.4.11 非文本图形 | 仍 ≥ 3:1，见下方实测与兜底 |
| 高对比（低视力）开关开启后正文 | ≥ 7:1 | WCAG AAA 1.4.6 | 固定深色字在四套墙面均 ≥ 10:1，天然达标 |
| 焦点指示 | ≥ 3:1 | 2.4.7 | 用固定兜底色描边，不依赖主题色 |

**实测（WCAG 2.1 相对亮度公式）**

| 配对 | 对比度 | 判定 |
| --- | --- | --- |
| `accent 0xe8893c`（炉火橙）在 `walnut 0x5d3d28`（深木）上 | ≈ 3.7:1 | 达标（≥ 3:1） |
| `accent 0xe8893c` 在 `darkWood 0x3c281c`（最深木 / 梁）上 | ≈ 5.3:1 | 达标 |
| 固定兜底 `0xffda7d` 在 `garden.soil 0x4a3524`（菜园土）上 | ≈ 8.5:1 | 达标，远超下限 |
| 固定兜底 `0xffda7d` 在 `forest wall 0xe6ddc8`（亮墙）上 | ≈ 1.0:1 | **不达标** → 亮底区域必须改用深色描边，不能一个兜底色走天下 |

> 最后一行是关键：兜底高亮**不能一个颜色用到底**。工程实现应按热区所在区域的明度选择「亮底用深色描边 `0x2c2e33` / 暗底用亮色描边 `0xffda7d`」，或统一采用「深色外描边 + 亮色内发光」的**双层描边**，两层各自在其背景上 ≥ 3:1。

**兜底高亮建议（5 条，给 engineering-lead）**

1. **热区高亮必须用不受光照影响的材质**：夜间 `sun.intensity = 0.18`、`hemi.intensity = 0.16`，`MeshStandardMaterial` 的受光结果会被压暗，上表按材质基色算出的对比度在运行时不成立。改用 `MeshBasicMaterial`、`emissive` / `emissiveMap`，或直接用 UI 层 DOM overlay 绘制热区描边。
2. **跨主题固定的双层描边**：深色外描边 `0x2c2e33` + 亮色内发光 `0xffda7d`（或 `0xffe6a8`），颜色**不随主题变**；这正是 T-01 brief 第 122 行要求的「与主题无关的固定描边 / 高亮层」。
3. **主题 `accent` 只做叠加装饰**，不承担唯一对比度职责；`garden.selected` 固定 `0xffda7d`（§3.8.3）同理。
4. **冗余编码**：hover / focus / 选中态同时给尺寸变化、轮廓变化或图标，不只靠颜色；灰度截图下仍可辨。
5. **不得为营造氛围降低强度基准**：`sun.intensity` / `hemi.intensity` / `PointLight.baseIntensity` / `indoor` 系数沿用上游，`forest` 只改色调与色温（HC-4）。「低照度」由材质明度与色温表达，**不由关灯表达**。

**最坏组合验收清单**：`night + forest`（最暗）、`day + seaside`（最亮）、`dusk + forest`、`night + courtyard` 四组逐一截图留证；配合 §4.3 的 16 组「主题 × 时段」门禁，取最小值作为验收阈值。

---

## 5. 资产与合规状态小结

| 项 | 状态 |
| --- | --- |
| 项目名 / 仓库引用 | 新建**独立公开仓库 `guo87g9/feiyu-room-themes`**，项目名已定稿；**不 Fork、不继承上游 git 历史**，上游 `sh2234113/feiyu-room-template` 仅作为代码来源署名保留 |
| 四层授权矩阵 | 已完成（§1），四层 + **①-a 程序化 Chibi 澄清行** + 矩阵外附带项齐全；Chibi 属 ①层代码 MIT，不落入受限素材层 |
| 双声明 / 署名口径 | **现状不满足，但整改方案已决议（R-5 全部强化）**：`README.md` 第 15 行有雏形，第 14 / 29 / 167 / 175 行仍描述已删资产。落地三项：① 根目录 `ASSET_LICENSES.md`（**采用**，engineering-lead 落地）；② README 首屏醒目双声明提示；③ 页脚署名深色底板 + `#e6f1ff` + ≥12px（R-6）。统一措辞见 §2.2.1 |
| 素材目录完整性 | 完好（32 webm + 35 png + 1 wav + CREDITS.md），本轮零字节改动 |
| 3D 模型 / 安装包 | 3 个 GLB 与 `tools/` 物理已清零；**文本残留 10+ 处**（§2.5）；原「Fork git 历史含 glb」风险**已通过改新建独立仓库规避**（§2.5 末，保留核查命令作二次验证）。3D 模式与程序化几何保留（HC-10） |
| 主题 key | 锁死 `blue_white`（默认）/ `seaside` / `forest` / `courtyard` 四个，`theme.js` 顶层 key 逐字一致 |
| 4 套主题色值 | 已完成：`M` 38 键（§3.2）+ 环境光 9 字段（§3.3）+ 唯一 `accent` + **贴图 18 / 天空 17 / 菜园 27 / 粒子灯光标牌 11 共 73 个跨文件字段**（§3.8），全部 `0xRRGGBB`；对齐 T-01 语义锚点 |
| 两条必复核 | ① `blue_white` 背景退让、不与蓝发立绘抢色——**复核通过**（§2.4 ★复核 ①）；② `forest` 低照度热区对比度下限与兜底高亮——**复核通过 / 风险闭环**（§4.5） |
| `courtyard` 范围 | 只取氛围、复用屋后菜园，**未为不存在的院落几何写任何色值字段**（§3.8.6） |
| 可访问性分级 | 建议 **Standard**，特性矩阵、16 组对比度门禁与低照度兜底已给（§4） |
| 与引擎 / 管线风险 | `updateEnvironment` 硬编码覆写（HC-4）、非 `M` 硬编码色盲区（HC-5）、跨文件色值收敛（HC-9）、菜园材质实例引用不可断链（§3.8.3）、vendor 不可改（HC-8）——均需 engineering-lead 确认 |
| 决议状态 | **全部闭环，无待拍板项**：R-1 色值定稿、R-2 会签通过（2026-11-15）、R-3 立绘不随主题变色、R-4 纯非商业、R-5 双声明全部强化、R-6 页脚全部强化（§6 决议台账） |
| 必修项定性 | HC-5（3D 房间标签文字）与 HC-6（页脚署名）为 **Standard 分级下的合规 + 可访问性双重阻塞项**，必须修复；T-06 逐套核查（§2.3 优先级定性、§4.3） |
| T1 / T2 区分度判据 | 新增 §4.3.1：墙面明度差明确豁免，木作三档下限 1.8 / 2.0 / 1.6:1、`accent` 色相差 ≥ 120°，并排人工判读；供 T-06 截图留证 |

---

## 6. 决议台账（原待审批项，现已全部闭环，无待拍板项）

> **两轮用户拍板 + design-strategist 会签，以下事项全部已决议**。本节由「待审批清单」改为「决议台账」，仅作留痕与执行依据。

**已决议的前置项（第一轮 / 补充约束）**

> ① 项目名定稿 `feiyu-room-themes`；② 「砍掉作者自己创的 3D 模型」= **仅指 3 个 GLB 资产文件**，`actor3d.js` 程序化 Chibi 几何保留、3D 模式仍在（§1 ①-a / HC-10）；③ 署名统一措辞（§2.2.1）+ 代码 MIT / 素材 CC BY-NC-SA 4.0 双声明、不得写成单一许可证、不出现宣称灵感来源为自有的表述；④ **玩法全保留**（QQ 桥接 / 菜园 / 电视投屏 / 私聊不动），只精简资产层，故 §3.8 菜园 / 天空 / 粒子色值参数化**仍然必要且已给全**；⑤ 4 套主题锁死，key 固定 `blue_white` / `seaside` / `forest` / `courtyard`；⑥ 两条必复核（blue_white 抢色、forest 低照度热区）已完成。

**已决议的新增项（第二轮用户拍板）**

> ⑦ **建仓方式**：新建独立公开仓库 `guo87g9/feiyu-room-themes`，**不 Fork、不继承上游 git 历史**——§2.5 的「Fork 历史含 GLB」风险已由此规避，保留核查命令作二次验证；⑧ **纯非商业开源**，NC 为长期约束，不规划商用替换路径；⑨ **合规呈现全部强化**：根目录 `ASSET_LICENSES.md`（engineering-lead 落地）+ README 首屏醒目双声明 + 页脚署名深色底板 / `#e6f1ff` / ≥12px。

**已决议的会签项（design-strategist，2026-11-15）**

> ⑩ R-2 折衷**会签通过**：折衷成立、无替代方案、不需仲裁、不需用户拍板；并确认该折衷修正了 brief §2.1 与 §2.4 之间的主 / 辅色层级错配（§2.4 表）。⑪ 附带发现已落地：T1 / T2 区分度判据（§4.3.1）、HC-5 / HC-6 必修项定性（§2.3）。

### 6.1 六项决议台账

| # | 事项 | 决议 | 执行落点 / 依据 |
| --- | --- | --- | --- |
| **R-1** | 4 套色值是否定稿 | **已决议：定稿**，按 §3.2 / §3.3 / §3.8 全部色值原样执行，不再调整饱和度或明度 | `theme.js` 全部字段；team-lead 第二轮拍板；完整规格表见 §3.2 / §3.3 / §3.8 |
| **R-2** | T2 森林木屋墙色折衷 | **已决议：会签通过（2026-11-15），按折衷执行**，无替代方案，不需仲裁、不需用户拍板 | §2.4 表 + §4.5 低照度兜底；design-strategist 会签；同时修正 brief 主 / 辅色层级错配 |
| **R-3** | 角色立绘是否随主题变色 | **已决议：不随主题变色**，按本规格倾向执行；只用容器层底板 / 描边提升轮廓，素材零字节改动 | HC-1 / HC-1b / §3.7；避免 SA 改编争议 |
| **R-4** | 未来是否需要商用 | **已决议：纯非商业**，NC 约束确定成立，**不需要为未来商用预留替换路径**，不规划素材采购 | §2.1 NC 上限、§4.4 缺口清单已改写、§2.2.1「整体仅非商业」；代码 MIT 单独取用时可商用，与仓库定位不矛盾 |
| **R-5** | 双声明落点 | **已决议：全部强化** —— ① 根目录 `ASSET_LICENSES.md` **采用**（由 engineering-lead 落地，**已从「可选」改为「采用」**）；② README 首屏醒目双声明提示；③ `THIRD_PARTY_NOTICES.md` / `CREDITS.md` / `INSPIRATION.md` 保留 | §2.2 落点表、§2.2.1 统一措辞；GitHub License 徽标选 MIT + 首屏醒目提示 |
| **R-6** | 页脚署名整改力度 | **已决议：全部强化**，不再保留「仅提高不透明度」的较弱选项 —— 深色底板 `rgba(10,16,24,.72)` + 文字 `#e6f1ff` + 字号 ≥ 12px | HC-6（已提升为**必须修复**）；§2.3 优先级定性；T-06 逐套核查 |

> **状态复核结论（回应 team-lead 第二条消息第四点）**：R-1 / R-2 / R-3 / R-4 / R-5 / R-6 **六项全部已标为已决议**，无遗漏；§2.5 风险登记已改为「已通过改新建独立仓库规避」并保留 `git log --all -- '*.glb'` 等核查命令作二次验证。**本节不再有待拍板项。**

---

## 7. 本文档的验收标准

- [x] 四层授权矩阵表齐全，含「层 / 具体文件或目录 / 许可证 / 允许 / 禁止 / 公开仓库必须保留」六列
- [x] ①层写明可商用、义务为保留原版权行与 MIT 全文、可追加自己的版权行
- [x] ②层写明必须保留 `CREDITS.md`、页面底部署名、`THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`INSPIRATION.md`
- [x] ③层写明作者保留版权、二创与再分发需书面许可、本仓库已彻底移除、不得写成 MIT、不得留副本 / 链接
- [x] ④层写明授权只给原发布者、已移除、不得沿用授权表述
- [x] 明确说明 SA 传染性，并把「只在代码层改材质 / 灯光 / 配色，不改任何素材文件」写为给工程成员的硬约束
- [x] 明确说明整体仓库不能标纯 MIT，必须「代码 MIT / 素材 CC BY-NC-SA」双声明并给出落点
- [x] 4 套主题给出全部要求的色值（墙 / 暖墙 / 天花 / 踢脚 / 3 档木色 / 4 档布艺 / 金属 / 石材 / 植物 / 玻璃 / 雾 / 半球天+地 / 日光 / 室内点光 / 灯泡），用 `0xRRGGBB`
- [x] 注明每个键对应 `world.js` 中 `M` 对象的属性，并覆盖任务列出的全部键名
- [x] 说明四套之间文字 / 角色立绘的对比度保证，含实测比值
- [x] 可访问性分级三选一并给理由，含主题切换对低视力用户的对比度要求
- [x] 与 T-01 brief 的语义锚点对齐，差异处单独列出待拍板
- [x] 主题 key 固定 `blue_white`（默认）/ `seaside` / `forest` / `courtyard`，项目名 `feiyu-room-themes` 已写入
- [x] 色值覆盖点扩展到 `garden-world.js`（27 键）、`skyTexture(hour)`（17 字段）、菜园粒子 / 灯光 / 标牌（11 字段）、`world.js` 贴图基色（18 字段），全部列成可参数化字段并给全 4 套 `0xRRGGBB`
- [x] 复核 ① `blue_white` 主色不与 dsh-pet 蓝发 / 藏青白金裙装 / 鲸尾立绘抢色，背景退让（§2.4）
- [x] 复核 ② `forest` 低照度主题给出交互热区对比度下限（≥ 3:1）与兜底高亮建议（§4.5）
- [x] `courtyard` 只取氛围，未为不存在的院落几何写任何色值字段，复用屋后菜园（§3.8.6）
- [x] 署名口径：代码 MIT / 2D 立绘 dsh-pet CC BY-NC-SA 4.0 双声明、明确授权不同、无宣称灵感来源为自有的表述（§2.2.1）
- [x] 授权矩阵单列 ①-a 行说明 `actor3d.js` 程序化 Chibi 属代码 MIT、非模型资产文件、不受作者模型版权限制，3D 模式保留
- [x] 建仓方式改为「新建独立公开仓库 `guo87g9/feiyu-room-themes`，不 Fork、不继承上游 git 历史」；§2.5 风险登记状态改为「已规避」并保留核查命令作二次验证
- [x] 纯非商业开源已决议（R-4），§4.4 商用场景行不再列为升级路径、不规划素材替换
- [x] 合规呈现全部强化已决议（R-5 / R-6）：`ASSET_LICENSES.md` 由「可选」改为「采用」、README 首屏醒目双声明、页脚深色底板 + `#e6f1ff` + ≥12px
- [x] HC-5（3D 房间标签文字）与 HC-6（页脚署名）提升为**必须修复**，注明 Standard 分级下合规 + 可访问性双重阻塞项，T-06 逐套核查（§2.3）
- [x] 新增 §4.3.1 T1 / T2 区分度判据：墙面明度差豁免、木作三档 1.8 / 2.0 / 1.6:1、`accent` 色相差 ≥ 120°、并排人工判读，供 T-06 截图留证
- [x] R-2 会签通过（2026-11-15）与 brief 主 / 辅色层级错配修正已写入 §2.4 / §6
- [x] §6 由待审批清单改写为决议台账，六项决议全部闭环、无待拍板项
- [x] 只写 `design/` 下这一份文档，未改代码、未修改 `design/` 之外文件、未 git commit
