# LICENSE / 署名文本附录 · v3.1.0-remix（定稿 v1.0）

> **性质**：**精确可复制文本**，供主理人**转交 engineering-lead** 落地到根目录既有文件与新建 `ASSET_LICENSES.md`。
> **负责**：release-ops-lead（路远行）· T-07 · 状态：定稿 v1.0，已按用户两轮拍板结论修订。
> **目标仓库**：`https://github.com/guo87g9/feiyu-room-themes.git`（写死，独立新建的公开仓库，不 Fork、不继承上游 git 历史）。
> **链接基准（B-11 逐处核对，重要）**：本文件位于 `production/`，链接分两类，基准不同：
> - **本文件正文**（非代码块）引用仓库根目录文件一律用 `../<文件>` 形式：[`LICENSE`](../LICENSE) · [`README.md`](../README.md) · [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md) · [`PRIVACY_AND_ASSETS.md`](../PRIVACY_AND_ASSETS.md) · [`INSPIRATION.md`](../INSPIRATION.md)。落地对照表用反引号代码标注文件名，不含相对链接，无需改写。
> - **(b) / (b-2) / (c-2) / (d) 的 `markdown` 代码块是「待整块复制到仓库根目录目标文件」的文本**，其中链接按**目标文件（仓库根目录）**为基准，例如 `[LICENSE](LICENSE)`、`[ASSET_LICENSES.md](ASSET_LICENSES.md)`、`[CREDITS](public/room/assets/pet/CREDITS.md)`。在 `production/` 下预览时这些链接不指向实际文件属预期，**切勿机械改成 `../`**，否则整块复制到根目录后会全部 404。
> - 逐处核对 6 组：① (b) 的 `ASSET_LICENSES.md` / `LICENSE` / `CREDITS` / `LICENSE-three` / `INSPIRATION.md` / `THIRD_PARTY_NOTICES.md` + `PRIVACY_AND_ASSETS.md`；② (b-2) 的 3 个双声明链接；③ (c-2) 的纯文本 URL（绝对地址，非相对链接，无需改）；④ (d) 开头的 `[LICENSE](LICENSE)`；⑤ (d) §2 表格内 `public/room/assets/pet/CREDITS.md` 等路径（目标同为根目录）；⑥ (d) §7 相关文件链接。**结论：6 组全部保持根目录基准，落地对照表已同步注明目标文件；本文件正文链接已改为 `../` 形式。**
> **重要**：本成员**不修改根目录任何既有文件、不创建根目录新文件**。(a)～(d) 请由主理人中转给 engineering-lead，由其在其独占的文件所有权范围内落地；落地位置见文末对照表。
> **硬约束**：`LICENSE` 中上游原有两行版权行**不得删除、不得改写**，MIT 许可全文**不得改动**；本分支只能**追加**自己的版权行。
> **口径约束**：面向社区的文本**一律不出现「Fork 自」/「Fork 视觉二创分支」**，改用「独立新建的公开仓库，代码与户型取自上游模板（不继承上游 git 历史），在其上做视觉二创」；统一署名措辞以 `design/asset-license-matrix.md` **§2.2.1** 为准。

---

## (a) 追加到现有 `LICENSE` 的版权行

### 要追加的那一行（精确文本）

```text
Copyright (c) 2026 guo87g9
```

**插入位置**：现有 `LICENSE` 第 4 行 `Copyright (c) 2026 sh2234113` **之后**、第 6 行 `Permission is hereby granted, ...` **之前**，即作为第 5 行追加；原两行保持原顺序、原文字不动，空行结构保持不变。

追加后文件开头应为（可直接对照核对）：

```text
MIT License

Copyright (c) 2026 Derpyu520 and qq-bridge / QSH contributors
Copyright (c) 2026 sh2234113
Copyright (c) 2026 guo87g9

Permission is hereby granted, free of charge, to any person obtaining a copy
```

### 完整 `LICENSE` 整体替换版（推荐，避免行号歧义）

若 engineering-lead 选择整体替换 `LICENSE`，请用下面整块。除新增第三行版权行外，**MIT 许可全文与上游原文件逐字一致**：

```text
MIT License

Copyright (c) 2026 Derpyu520 and qq-bridge / QSH contributors
Copyright (c) 2026 sh2234113
Copyright (c) 2026 guo87g9

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**说明**：新增行只表示本分支新增部分的版权，**不取代、不覆盖**上游两行版权；MIT 的唯一义务（所有副本保留版权行与许可全文）由此继续履行。

> **明确不做**：`LICENSE` 保持 MIT 全文原样，**不追加任何素材条款 / NOTE 段**（依据矩阵 §2.2 / R-5）。消歧靠 README 首屏醒目提示 (b-2) 与根目录 `ASSET_LICENSES.md` (d)，不靠改 `LICENSE`。GitHub 仓库 License 徽标只能选一个时**选 MIT**。

---

## (b) README「素材与许可」章节的双许可声明

**落地方式**：可整块替换 `README.md` 现有的 `## 素材与许可` 一节，或**只增补**其中缺失的明确表述（见文末「落地状态复核」）。精确可复制：

```markdown
## 素材与许可

`feiyu-room-themes` 是**独立新建的公开仓库**，代码与户型取自
[sh2234113/feiyu-room-template](https://github.com/sh2234113/feiyu-room-template)
（**不继承上游 git 历史**），在其上做视觉二创：只更换房间配色主题，保留上游户型与全部玩法。
它**不是原创房间**，也**不隶属于 DeepSeek、SnowLuma、腾讯或 QQ 官方**。
**整体仓库不是纯 MIT**，代码与素材授权不同，详见下文与
[ASSET_LICENSES.md](ASSET_LICENSES.md)。

- **代码**：沿用上游 **MIT** 许可，见 [LICENSE](LICENSE)。其中原作者版权行
  （`Copyright (c) 2026 Derpyu520 and qq-bridge / QSH contributors`、
  `Copyright (c) 2026 sh2234113`）**原样保留，未删除、未改写**；本仓库追加了
  `Copyright (c) 2026 guo87g9`，新增代码同样以 MIT 提供。
- **2D 立绘 / 动画 / 点击音效**：`public/room/assets/pet/` 与点击音效来自第三方项目
  [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)（蓝毛小女仆），按
  **CC BY-NC-SA 4.0** 使用 —— 需**署名**、**仅限非商业**、衍生需**相同方式共享**。
  详细署名见 [CREDITS](public/room/assets/pet/CREDITS.md)，**页面底部署名保留且可读**。
  素材文件本身未改动任何字节，主题系统只在代码层改材质与灯光颜色。
- **两者授权不同，绝不可写成单一许可证**：代码 MIT 与素材 CC BY-NC-SA 4.0 不能混为一谈；
  素材部分**以更严格者为准**，`public/room/assets/pet/` **不得被当作 MIT 代码授权**，
  `package.json` 的 `"license": "MIT"` **仅描述代码部分**，不代表整体仓库的授权。
- **纯非商业**：本仓库**整体仅供个人学习与非商业用途**，不得用于售卖、付费服务或商业宣传。
  代码 MIT 不覆盖素材，也不构成「整体可商用」的暗示；**NC 是全仓库的用途上限**。
  本仓库**不规划、也不为未来商用预留**素材替换路径。
- **Three.js**：MIT，见 [LICENSE-three](public/room/vendor/LICENSE-three.txt)；vendor 源码未改动。
- **SnowLuma**：独立软件，**不在本仓库内，也不随本仓库分发**。
- **已移除 / 不含**：**不含任何角色 3D 模型文件／私人素材；保留的 2D 立绘是已署名的第三方 CC 素材。**
  上游模板中作者提供的 3 个 `.glb` 模型文件（含优化展示版与 58.9 MB 原始工程）
  以及**第三方安装包**（`tools/` 下的暴喵AI管家安装程序）均已从本仓库移除，
  不再随仓库分发，也不提供任何形式的副本或下载链接。
  该 3D 模型版权归作者、二创 / 再分发需书面许可，本仓库**未取得该许可，不主张该权利，
  也不将其写成 MIT、CC 或公共领域**；安装包的分发授权只授予原项目发布者，本仓库**不沿用**。
- **3D 模式仍在**：房间三维场景由 Three.js 程序化几何与材质实现，3D 角色由
  `public/room/actor3d.js` 的**代码级程序化几何**提供；它是代码，不是模型资产文件，
  随代码按 MIT 提供，不与已移除的 3 个 GLB 混为一谈。
- **不包含的私人内容**：角色卡、私人记忆、聊天记录、QQ 号 / 群号、API Key、
  Cookie、语音、照片；`config.json`、`state/`、`audio/`、`assets/` 等本地数据均不入库。
- **灵感来源**：房间氛围与「和角色一起生活」的交互灵感来源见
  [INSPIRATION.md](INSPIRATION.md)。**二次发布必须保留该文件，不得把灵感来源写成「原创」
  或自有创作**；本仓库只参考氛围方向，未复制原博主的视频、图片或文字。
- 分层授权矩阵见 [ASSET_LICENSES.md](ASSET_LICENSES.md)，第三方清单见
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，隐私与素材边界见
  [PRIVACY_AND_ASSETS.md](PRIVACY_AND_ASSETS.md)。
```

> 该段为 **README 的不可删段落**：下游若再次分发或二次创作，仍须保留 MIT 版权行、
> dsh-pet 署名链、`ASSET_LICENSES.md` 与 `INSPIRATION.md` 溯源。

---

## (b-2) README 首屏醒目提示（新增，精确可复制）

**落地方式**：放在 README 标题下方、正文之前，用引用块 / 醒目区块呈现；并给出三个链接。精确可复制：

```markdown
> [!IMPORTANT]
> **授权双声明 · 请先看这里**
> **MIT 仅覆盖代码**，2D 立绘 / 动画 / 点击音效另按 **CC BY-NC-SA 4.0**
> （署名 · 非商业 · 相同方式共享）；**本仓库整体仅供非商业用途**，不得售卖或用于商业宣传。
> 代码 MIT **不代表整体可商用**，也不为未来商用预留素材替换路径。
> 详见 [ASSET_LICENSES.md](ASSET_LICENSES.md) ·
> [CREDITS](public/room/assets/pet/CREDITS.md) ·
> [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
>
> 本仓库是独立新建的公开仓库，代码与户型取自
> [sh2234113/feiyu-room-template](https://github.com/sh2234113/feiyu-room-template)
> （不继承上游 git 历史），在其上做视觉二创；**不是原创房间**，也不隶属于
> DeepSeek、SnowLuma、腾讯或 QQ 官方。当前版本 `v3.1.0-remix`。
```

> 配套：`THIRD_PARTY_NOTICES.md` 也需**链接到** `ASSET_LICENSES.md`（R-5）；工程侧落地时一并加上。

---

## (c) 页面 / 关于页的简短致谢文本

### c-1 · 页面底部署名（HTML，`public/room/index.html` 的 `.foot`）

> 工程侧当前页脚为「立绘素材 dsh-pet（CC BY-NC-SA 4.0…）· 3D 角色为程序化生成 · 仅非商业使用」，**文字已达标**。本段为**可选加强版**：若主理人希望额外补上上游来源链接，用下面整块替换 `.foot`。**绝不出现「Fork」字样**，溯源用「基于 / 二次创作自」。

```html
  <div class="foot">立绘 / 动画素材 <a href="https://github.com/PC2005-cloud/dsh-pet" target="_blank" rel="noreferrer">dsh-pet</a>（CC BY-NC-SA 4.0 · 署名 · 非商业 · 相同方式共享）· 基于 <a href="https://github.com/sh2234113/feiyu-room-template" target="_blank" rel="noreferrer">feiyu-room-template</a> 二次创作（代码 MIT）· 3D 角色为程序化生成 · 仅非商业使用</div>
```

**可读性样式（HC-6 / R-6，由 engineering-lead 落地，T-06 逐套核查）**：页脚需加**深色半透明底板** `background: rgba(10, 16, 24, .72)`、文字色 **`#e6f1ff`**、字号 **≥ 12px**，署名文字对比度 ≥ 4.5:1；4 套主题下均须可读。样式不作用于素材文件本身，只是容器层呈现。若不采用本加强版，现版页脚文字也已合规，但样式整改仍为必办。

### c-2 · 关于页 / 仓库简介纯文本版（简短致谢，可直接粘贴）

```text
立绘 / 动画素材：dsh-pet（https://github.com/PC2005-cloud/dsh-pet），CC BY-NC-SA 4.0（署名 · 非商业 · 相同方式共享）。代码 MIT，基于 sh2234113/feiyu-room-template（https://github.com/sh2234113/feiyu-room-template）二次创作，独立新建的公开仓库、不继承上游 git 历史。本仓库为房间主题换装版，非原创，整体仅供非商业使用；房间氛围灵感来源见 INSPIRATION.md，分层授权见 ASSET_LICENSES.md。
```

---

## (d) 【供根目录 `ASSET_LICENSES.md` 使用】完整可用文本

> **落地方式**：由 **engineering-lead 新建根目录 `ASSET_LICENSES.md`**，把下面整块**原样复制**进去即可。该文件与 `LICENSE` 并列：`LICENSE` 仅覆盖代码 MIT，本文件承载素材层与已移除资产的授权状态，形成代码 / 素材双声明的**物理分离**（矩阵 §2.2 / R-5 已决议采用，**非可选**）。
> 配套：README 首屏 (b-2) 与 `THIRD_PARTY_NOTICES.md` 均需链接到本文件。

```markdown
# 素材与代码授权说明

> 仓库：https://github.com/guo87g9/feiyu-room-themes.git
>
> 本文件与 [LICENSE](LICENSE) **并列且不等价**：`LICENSE` **仅覆盖代码 MIT**；
> 本文件说明 2D 素材、已移除资产与第三方依赖的授权状态。
> 项目 `feiyu-room-themes` 是**独立新建的公开仓库**，代码与户型取自
> [sh2234113/feiyu-room-template](https://github.com/sh2234113/feiyu-room-template)
> （**不继承上游 git 历史**），在其上做视觉二创；**不是原创房间**，也不隶属于
> DeepSeek、SnowLuma、腾讯或 QQ 官方。
>
> **一句话：代码 MIT / 2D 立绘与音效 dsh-pet CC BY-NC-SA 4.0；整体仅非商业。**
> **NC 是全仓库用途上限**：即使代码为 MIT，本仓库整体也不得用于售卖、付费服务或商业宣传。

## 1. 双声明（先读这一节）

| 层 | 授权 | 覆盖范围 | 是否可商用 |
| --- | --- | --- | --- |
| **代码** | **MIT** | `src/`、`public/room/*.js`、`index.html`、`scripts/`、`*.mjs`、`*.json`、`*.css`、自研文档 | 代码**单独被取用时**含商用 |
| **2D 素材** | **CC BY-NC-SA 4.0** | `public/room/assets/pet/*.webm` / `*.png`、`public/room/assets/sound/click-duck.wav` | **否**，署名 · 非商业 · 相同方式共享 |
| **整体仓库** | **以最严格的 NC 为上限** | 代码 + 素材的集合 | **否，整体仅供非商业** |

`LICENSE` 是**代码**许可文件。把素材塞进 `LICENSE`，或把仓库整体标成 `MIT`，都会造成误导性授权（下游会误以为可以商用立绘）。公开仓库必须保持上述双声明；GitHub License 徽标只能选一个时**选 MIT**，靠 README 首屏醒目标注与本文件消歧。

## 2. 四层授权矩阵

> 读法：**「公开仓库必须保留什么」是硬性放行条件**，缺一项即不建议发布。四层授权互不等价，越往下越严格。

| 层 | 具体文件或目录 | 许可证 / 权利归属 | 允许做什么 | 禁止做什么 | 公开仓库必须保留什么 |
| --- | --- | --- | --- | --- | --- |
| **① 代码 MIT** | `src/`、`public/room/*.js`、`public/room/index.html`、`scripts/`、`*.mjs`、`*.json`、`*.css`、`LICENSE`、`SETUP.md` 等自研源码与文档；**不含** ②层素材目录、**不含** `public/room/vendor/` 第三方代码 | MIT。`Copyright (c) 2026 Derpyu520 and qq-bridge / QSH contributors` + `Copyright (c) 2026 sh2234113`；本仓库追加 `Copyright (c) 2026 guo87g9` | 使用、复制、修改、合并、发布、分发、再授权、出售副本；新增代码可**追加**自己的版权行 | 删除或改写原两行版权声明；删除 MIT 全文；把 ②层 CC 素材称作「MIT 代码」并据此授权；把 ③④层资产写成 MIT 覆盖 | `LICENSE` 全文原样保留（两行原版权行一字不改，新增行只能追加）；`THIRD_PARTY_NOTICES.md` 保留「代码 MIT」段；README 保留上游来源与上游版权可见（独立新建仓库，非 Fork） |
| **①-a 澄清行** | `public/room/actor3d.js` 的**程序化 Chibi 几何小人**：Three.js 基本几何体运行时拼出，无 `.glb`、无外部资产文件 | **①层代码 MIT 的一部分**，代码级程序化几何，**非模型资产文件**，不受作者模型版权限制，也不受 ②层 CC 约束 | 保留 3D 模式；随代码 MIT 自由修改 / 复制 / 分发；可随主题调整其材质配色 | **不得**误列进 ③层受限素材、不得写成「已移除 3D 能力」、不得称作「作者自制 3D 模型」、不得与 3 个已删 GLB 混为一谈；清理 `MODEL_URL` 时**只删 GLB 引用，不删 3D 模式** | 署名段落采用统一措辞（见 §4）；README 与 `THIRD_PARTY_NOTICES.md` 明确「3D 模式由程序化几何提供」 |
| **② 2D 立绘与音效 dsh-pet** | `public/room/assets/pet/*.webm`、`*.png`、`public/room/assets/sound/click-duck.wav`、`CREDITS.md`。来源 [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)，形象「蓝毛小女仆」 | **CC BY-NC-SA 4.0**（署名 BY / 非商业 NC / 相同方式共享 SA）。注：dsh-pet 的**代码**部分是 MIT，与本层**素材**无关 | 原样随仓库**非商业**再分发；原样在页面展示；运行时读取 / 切换 / 缩放显示；**仅在代码层**改材质、灯光、配色；上游既有的「英文 key 重命名 + ffmpeg 抽 2.4s 透明 PNG」改动随原样保留，本轮不追加新改动 | 任何商业使用（售卖、付费服务、商业宣传、广告变现）；**任何改动素材像素**（重绘、调色、换色、裁剪、加滤镜、AI 重绘、重新编码 webm、重新导出 png、抽帧换帧、烘焙进贴图 / 图集）；删除或弱化署名；把改编产物以 MIT / 闭源 / 更宽松许可发布；单独售卖或拆包素材 | `public/room/assets/pet/CREDITS.md` 原样保留；**页面底部署名**（`.foot` 的 dsh-pet 链接 + `CC BY-NC-SA 4.0` 字样，且须**可读**：深色底板 `rgba(10,16,24,.72)` + `#e6f1ff` + ≥12px）；`THIRD_PARTY_NOTICES.md`；`PRIVACY_AND_ASSETS.md`；`INSPIRATION.md`；README 首屏双声明 |
| **③ 作者自制 3D 模型（已移除）** | 原：根目录 `anime maid 3d model.glb`、`public/room/assets/models/da-feiyu.glb`、`da-feiyu.opt.glb`。**3 个文件现均已物理删除**，目录内仅剩 `README.md` | **作者保留全部版权**；仅随**原模板**用于个人、非商业展示；**二创、再分发、商用均需作者书面许可**（本仓库未取得）。**不是 MIT，不是 CC，不是公共领域** | 本仓库内**无任何可用授权**；仅可保留一段「已移除、不在本仓库内、不再分发」的事实声明 | 写成 MIT 或任何开源许可；保留**任何形式的副本**（工作副本、git 历史对象、LFS、Release 附件、压缩包、CDN、镜像、备份）；留下载链接 / 磁力 / 镜像地址；沿用「附带作者授权模型」「已获授权」等表述；把 ①-a 的程序化几何误列为需作者授权的资产 | 明确声明「作者自制 3D 模型已彻底移除，房间视觉全部由 Three.js 程序化几何与材质实现」；`THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`README.md`、`SETUP.md`、`START_HERE.txt`、`CHANGELOG.md`、`GITHUB_UPLOAD.md`、`index.html` 页脚与「画质」按钮、`app.js` / `model-actor.js` 的 `MODEL_URL` 全部同步改写；**不得留任何指向模型的 URL** |
| **④ 第三方安装包（已移除）** | 原 `tools/`：`AI-Manager-v1.16.1-Windows.msi`、`AI-Manager-v1.16.1-macOS.dmg`、`tools/README.md`、`SHA256SUMS`。**现整个目录已删除** | 暴喵AI 自有许可与隐私条款，**不属于本项目 MIT**。原分发授权是暴喵AI官方授予**原项目发布者**的特定授权，具人身属性，**不随 MIT 代码转移给本仓库发布者** | 本仓库**不是被授权主体**，无任何再分发权；用户如需请自行前往官方渠道获取（仓库只做中性指引，不提供文件、不提供链接到安装包本体） | 随本仓库再分发 MSI / DMG / 压缩包；保留下载链接、邀请码、返利 / 领取活动；沿用「已获暴喵AI官方授权，由项目发布者随模板分发」——**沿用即构成虚假授权声明** | 明确声明「第三方安装包已整体移除，不在本仓库内，不提供下载」；删除 `THIRD_PARTY_NOTICES.md`「暴喵AI管家安装包」节、README 中指向 `tools/README.md` 的失效链接、`CHANGELOG.md` 与 `START_HERE.txt` 中的授权表述 |

## 3. 矩阵外的附带项

| 项 | 位置 | 许可 / 处理 |
| --- | --- | --- |
| Three.js | `public/room/vendor/three.module.js`、`GLTFLoader.js`、`BufferGeometryUtils.js` | MIT；必须保留 `public/room/vendor/LICENSE-three.txt`；**不得**随主题系统修改 vendor 源码 |
| npm 运行依赖 | `package.json` / `package-lock.json`（`@deepseek-ai/*`、`@modelcontextprotocol/sdk`、`@snowluma/*`、`js-yaml`、`zod`） | 各自遵循上游许可证，**本仓库不重新授权** |
| SnowLuma | 不在仓库内，不随仓库分发 | 使用前自行确认其许可证与 QQ 平台规则 |
| 电视 / 桌面屏幕材质 | `world.js` 的 `M.screen` / `M.deskScreen` | 由 `canvasTex` 程序化生成的 emissiveMap，**不属于素材授权层** |
| 私人数据 | 角色卡、`state/`、`audio/`、`config.json`、密钥 | 保持脱敏基线，不入库；`INSPIRATION.md` 只做公开署名，不复制原博主视频 / 图片 / 文字 |

## 4. 统一署名措辞（可直接引用）

> 本项目 `feiyu-room-themes` 是**新建的独立公开仓库**，代码与户型取自
> [`sh2234113/feiyu-room-template`](https://github.com/sh2234113/feiyu-room-template)
> （**不继承其 git 历史**），在其上做视觉二创：只更换房间配色主题，保留上游户型与全部玩法；
> 不隶属于 DeepSeek、SnowLuma、腾讯或 QQ 官方。
> - **代码**：沿用上游 **MIT**，`LICENSE` 内两行原版权行原样保留；本仓库新增代码同样以 MIT 提供。
> - **2D 立绘与动画**：`public/room/assets/pet/` 来自 [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)
>   （蓝毛小女仆），按 **CC BY-NC-SA 4.0** 使用 —— 需署名、仅限非商业、衍生需相同方式共享；
>   详见 `public/room/assets/pet/CREDITS.md`，页面底部署名保留。
> - **两者授权不同，绝不可写成单一许可证**；素材部分以更严格者为准，
>   `public/room/assets/pet/` 不得被当作 MIT 代码授权。
> - **整体仅非商业**：不得用于售卖、付费服务或商业宣传。
> - **已移除 / 不含**：**不含任何角色 3D 模型文件／私人素材；保留的 2D 立绘是已署名的第三方 CC 素材。**
>   作者提供的 3 个 GLB 模型文件与 `tools/` 下第三方安装包均已移除，不再随仓库分发。
>   3D 模式由 `actor3d.js` 的**代码级程序化几何**提供。
> - **灵感来源**：见 `INSPIRATION.md`，二次发布必须保留该文件，不得宣称灵感来源为自有创作。

## 5. 署名链（缺一不可）

`LICENSE`（MIT 全文 + 三行版权行）→ README 首屏醒目双声明 → README「素材与许可」→
本文件 `ASSET_LICENSES.md` → `public/room/assets/pet/CREDITS.md` → 页面底部署名 →
`THIRD_PARTY_NOTICES.md` → `PRIVACY_AND_ASSETS.md` → `INSPIRATION.md`。
下游若再次分发或二次创作，以上均须保留，且不得把灵感来源写成「原创」。

## 6. 非商业边界

本仓库**整体仅供个人学习与非商业用途**。代码 MIT **不覆盖素材**，也不构成「整体可商用」的暗示；
MIT 的「可商用」只在**代码单独被取用**时成立。本仓库**不规划、也不为未来商用预留**素材替换路径。
若对 ②层素材做任何像素级改动，改编产物必须以 **CC BY-NC-SA 4.0** 共享并继续保持非商业（SA 条款）；
因此本轮主题系统**只在代码层改材质 / 灯光 / 配色，不改动任何素材文件本身**。

## 7. 相关文件

[LICENSE](LICENSE) · [README.md](README.md) · [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) ·
[PRIVACY_AND_ASSETS.md](PRIVACY_AND_ASSETS.md) ·
[public/room/assets/pet/CREDITS.md](public/room/assets/pet/CREDITS.md) ·
[INSPIRATION.md](INSPIRATION.md)
```

---

## 落地对照表（交主理人中转 engineering-lead）

| 段 | 目标文件 | 落地动作 | 所属权 |
| --- | --- | --- | --- |
| (a) | `LICENSE` | 在原两行版权行之后追加 `Copyright (c) 2026 guo87g9`，或按「整体替换版」替换整个文件；**不追加素材条款** | engineering-lead |
| (b) | `README.md` → `## 素材与许可` | 用 (b) 整块替换现有该节，或只增补缺失的精确句 | engineering-lead |
| (b-2) | `README.md` 首屏 | 新增醒目双声明区块，链接 `ASSET_LICENSES.md` / `CREDITS.md` / `THIRD_PARTY_NOTICES.md` | engineering-lead |
| **(d)** | **新建根目录 `ASSET_LICENSES.md`** | **把 (d) 整块原样复制为新文件**（R-5 已决议采用，非可选） | engineering-lead |
| 配套 | `THIRD_PARTY_NOTICES.md` | 增加指向 `ASSET_LICENSES.md` 的链接 | engineering-lead |
| (c-1) | `public/room/index.html` → `.foot` | 文字已达标，**可选**用 (c-1) 补上游来源链接（用「基于 / 二次创作自」，**绝不出现 Fork**）；**样式整改必办**：深色底板 `rgba(10,16,24,.72)` + `#e6f1ff` + ≥12px | engineering-lead |
| (c-2) | 关于页 / 仓库简介 | 用 (c-2) 纯文本，可选 | 主理人 / 用户 |

> **落地对照表链接基准（B-11 核对）**：表内目标文件均为**仓库根目录**路径（`README.md`、`ASSET_LICENSES.md`、`public/room/index.html` 等），(a)～(d) 代码块内的链接同样以各自目标文件所在目录（仓库根目录）为基准。从 `production/` 预览本附录时用 `../<文件>`；整块复制到根目录目标文件时**保持代码块内原样**，不要改成 `../`。

**本成员不做**：不直接编辑上述文件、不创建根目录新文件，不执行 `git add` / `commit` / `push` / 建仓，不写 `production/` 之外的任何文件。

### 落地状态复核（截至定稿；engineering-lead 改造与主理人中转进行中）

| 段 | 目标文件当前状态 | 结论 |
| --- | --- | --- |
| **(a)** | `LICENSE` 仍只有上游原两行版权行，**未见** `guo87g9` | **必办**：请中转 (a) 的追加行或整体替换版 |
| **(b)** | `README.md`「素材与许可」已有双声明（代码 MIT / dsh-pet CC BY-NC-SA 4.0 / 已移除模型与安装包 / 灵感来源），「使用边界」有「整体为非商业用途」；但缺「整体仓库不是纯 MIT」「以更严格者为准」「`license: MIT` 仅描述代码」「不得当作 MIT」，且需删除「商用前替换素材」类表述 | **建议增补**：可只补 (b) 中的精确句，不必整段替换；若主理人判定现版已足够，请标记「已接受」并留档 |
| **(b-2)** | README 首屏醒目双声明区块尚未落地 | **必办**（R-5） |
| **(d)** | 根目录 `ASSET_LICENSES.md` 尚未创建 | **必办**（R-5）；完整文本已给在 (d) |
| **(c-1)** | 页脚文字已改为「立绘素材 dsh-pet（CC BY-NC-SA 4.0…）· 3D 角色为程序化生成 · 仅非商业使用」，**已达标**；可读性样式待落地 | 文字可选加强（**不得含 Fork**）；**样式整改必办**（HC-6 / R-6） |
| **(c-2)** | 关于页 / 仓库简介尚未使用 | 可选 |

> 说明：本附录起草时 engineering-lead 尚未完成改造，现其已自行落地一版；**T-05 已收口**（`package.json` `3.1.0-remix`、`VERSION.txt` 重写、remote 改 `guo87g9`、悬空 scripts 删除），但 `LICENSE` 追加版权行、`ASSET_LICENSES.md`、README 首屏提示**仍未落地**。**为避免重复改动与覆盖他人成果**，请主理人按上表逐段决定「整段替换 / 局部增补 / 接受现版」，不要无差别覆盖。

---

## 落地后校验（engineering-lead 或 quality-lead 执行）

```bash
cd /path/to/feiyu-room-themes

# 1) 三行版权行都在，且原两行未被改写
grep -nE '^Copyright \(c\) 2026' LICENSE

# 2) MIT 许可全文首尾仍在；LICENSE 未追加素材条款
grep -nE 'Permission is hereby granted|THE SOFTWARE IS PROVIDED "AS IS"|OTHER DEALINGS IN THE SOFTWARE' LICENSE
grep -nEi 'CC BY|NOTE ON ASSETS|素材' LICENSE || echo "OK: LICENSE 未追加素材条款"

# 3) README 双声明与首屏醒目提示
grep -nE 'CC BY-NC-SA 4\.0|不是纯 MIT|MIT 仅覆盖代码|非商业|不是原创|INSPIRATION\.md|ASSET_LICENSES\.md' README.md | head -40

# 4) ASSET_LICENSES.md 存在且四层齐全
test -f ASSET_LICENSES.md && grep -nE 'CC BY-NC-SA 4\.0|①|②|③|④|非商业|程序化' ASSET_LICENSES.md | head -20

# 5) 页脚：有 dsh-pet 署名、可读性样式，且无错误署名 / 无肯定式上游归属字样
grep -nE 'dsh-pet|CC BY-NC-SA 4\.0|e6f1ff|12px|3D 模型用户提供|Fork' public/room/index.html | head -20

# 6) 面向社区文案禁用词（排除 design/ 与 production/ 工作文档）
grep -RInE --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=design --exclude-dir=production \
  --include='*.md' --include='*.txt' --include='*.html' \
  '(原创|Fork 自|可商用|商用前|已获暴喵AI官方授权|3D 模型用户提供)' . | head -40
```

期望：1) 输出 **3 行**（含 `guo87g9`）；2) 输出 3 处且「OK: LICENSE 未追加素材条款」；3) 关键句全部命中；4) 文件存在且四层齐全；5) 命中 dsh-pet / `#e6f1ff` / `12px`，**不**命中「3D 模型用户提供」与「Fork」；6) 零命中（「已移除」事实陈述除外）。

---

## 不得改动清单（落地时请一并守住）

- `LICENSE` 中上游两行版权行、`Permission is hereby granted...` 至 `...IN THE SOFTWARE.` 的 MIT 许可全文；**不追加素材条款**。
- `public/room/assets/pet/CREDITS.md`（保留原文与 dsh-pet 署名链）。
- `INSPIRATION.md`（**原样保留，不得改写、不得删除、不得把灵感来源写成「原创」/ 自有创作**）。
- 页面底部的 dsh-pet 署名链接（可改文案与样式，不可删链接与 `CC BY-NC-SA 4.0` 字样）。
- 已移除的作者 3D 模型与第三方安装包：**不恢复、不留副本、不留下载链接、不写成 MIT / CC / 公共领域、不主张分发授权**。
- 面向社区的任何文本：**不出现「原创」「Fork 自」「可商用」「商用前替换素材」**；3D 模式与 `actor3d.js` 程序化几何保留，不写成「已移除 3D 能力」。
