# 二创分支逐文件改动清单 · `v3.1.0-remix`

> 执行人：engineering-lead（程基岩） · 任务：T-04 → T-05 → T-03（含最终轮 A / B / C 收口）
> 项目名：**`feiyu-room-themes`** · 目标仓库：`https://github.com/guo87g9/feiyu-room-themes.git`
> 本仓库是**基于 / 二次创作自** [`sh2234113/feiyu-room-template`](https://github.com/sh2234113/feiyu-room-template)
> （MIT）**复制文件建立的独立二创项目**，**不是原创房间**；
> **新建独立公开仓库、不建立 fork 关系、不继承上游 git 历史**。
> **当前状态：已在本地建立 git 仓库并完成首次提交；尚未配置远端、未 push、未在 GitHub 建仓。**
> **素材目录 `public/room/assets/pet/`、`public/room/assets/sound/`、`public/room/vendor/` 下文件字节未改动。**
> **内部过程文档 `production/release-checklist.md` 与 `tests/smoke-report.md` 不随仓库分发，已列入 `.gitignore`。**

---

## 0. 物理前提与用户拍板决议的落地位置

**物理前提（不可回退）**：3 个作者自制 `.glb` 模型文件与整个 `tools/` 目录已彻底移除；
`public/room/assets/models/` 实测只剩 `README.md`；保留 dsh-pet 的 `.webm` / `.png` / `.wav`
（**零字节改动**）、Three.js r160 vendor、全部代码、`actor3d.js` 程序化 Chibi、Three.js 几何家具。

| # | 决议 | 落地位置 |
| --- | --- | --- |
| D-1 | **「砍掉作者自己创的 3D 模型」= 仅指 3 个 GLB 资产文件**；`actor3d.js` 程序化 Chibi **保留**、3D 模式与切换按钮保留 | `app.js` 的 `ensure3d()` 两级 fallback 只删 GLB 引用、保留 `ensureChibi()`；`model-actor.js` URL 默认 `null`；`index.html` 页脚「3D 角色为程序化生成」；`ASSET_LICENSES.md` ①-a 澄清行；`README.md` / `THIRD_PARTY_NOTICES.md` 统一精确措辞「**不含任何角色 3D 模型文件／私人素材；保留的 2D 立绘是已署名的第三方 CC 素材**」 |
| D-2 | **项目名定稿 `feiyu-room-themes`**；仓库链接占位统一 `https://github.com/guo87g9/feiyu-room-themes.git` | `package.json` `name` + `description`、`package-lock.json` 四处、README 标题 / 简介 / 快速开始、VERSION.txt、SETUP.md、GITHUB_UPLOAD.md 方式 C、CHANGELOG.md 置顶条目 |
| D-3 | **玩法全保留，只精简资产层**（QQ 桥接 / 菜园 / 电视投屏 / 房间私聊 / SnowLuma·NapCat 依赖一律不动） | 未删除任何玩法代码或依赖；`package.json` 只清理悬空 scripts，`dependencies` 一字未改；菜园反而**扩权接入主题**（§4 HC-9） |
| D-4 | **新建独立公开仓库、不 Fork、不继承上游 git 历史** | `GITHUB_UPLOAD.md` 方式 C 主方案改为「复制干净文件 + `git init`」，A 路径标 ❌ 不采用；高风险项改写；全仓库肯定式建仓口径统一（§7 A4） |
| D-5 | **纯非商业 + 双声明**（整体仓库不是纯 MIT，MIT 只覆盖代码） | `README.md` 首屏 IMPORTANT + 「素材与许可」WARNING 精确句；新建 `ASSET_LICENSES.md` 四层矩阵；`THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`CHANGELOG.md`、`VERSION.txt` 同步；删除「商用前替换素材」等暗示可商用表述 |
| D-6 | **合规呈现全部强化**：`ASSET_LICENSES.md`（R8 采用）+ README 首屏醒目双声明 + HC-6 页脚 | `ASSET_LICENSES.md` 新建并双向链接；`.foot` 深色底板 `rgba(10,16,24,.78)` / `#e6f1ff` / 12px |
| D-7 | **4 套主题锁死**，key 固定 `blue_white`（默认）/ `seaside` / `forest` / `courtyard`；色值以矩阵 §3.2/§3.3/§3.8 定稿，不新增第 5 套 | `theme.js` 的 `THEME_KEYS` / `MATS` / `ENV` / `ACCENTS` / `TEXTURES` / `SKY` / `GARDEN` / `INVARIANTS` |
| D-8 | **HC-5 / HC-6 升为必修项**；T1/T2 区分度靠木作明度差与 accent 色相，不自调色值 | `world.js buildLabels` 固定深色字 `0x2c2e33` + 浅色柔光描边；`.foot` 见 D-6；`theme.js` 逐值照抄（实测 oak 1.86:1 / walnut 2.13:1 / darkWood 1.64:1 / accent 色相差 ≈150°，均达标） |
| D-9 | **U-1 / U-2 授权** | `actor.js` `'da-feiyu-sprite'` → `'pet-sprite'`、`actor3d.js` `'da-feiyu-3d'` → `'procedural-chibi'`（纯内部 Group.name，全仓库无引用）；`package-lock.json` 四处同步 |
| D-10 | **上游测试可移植性修复**：原作者把自己本机环境假设写进了测试，任何干净检出都会假红 | `scripts/test-preset-prompt.mjs:135` 行尾断言从写死 CRLF 改为按**源文件主导行尾**判定（与 `src/preset-prompt.js:140-142` 的实现规则一致，LF 检出不再必红）；`scripts/test-role-card.mjs:95` 对 `.gitignore` 已排除的 `roles/小鲸鱼.md` 改为文件缺失时跳过、并改用随仓库分发的 `roles/example.md` 验证同一套筛选机制；两处均保留原有全部断言强度，无一条被削弱 |
| D-11 | **v3.2.0 新增「水上乐园」玩法**：房子 +z 海侧，与 -z 菜园分居两侧 | 新增 `waterpark-world.js`（甲板 / 泳池 / CatmullRom 螺旋滑道 / U 型凹槽扫掠 / 半透明橙护栏 / 塔与楼梯）、`waterpark-client.js`（进入退出、点滑道上滑、点水面下水、演出状态机）、`waterpark-camera.js`（取景）；`home-state.js` 加 `waterpark` 房间与 6 路点 + `OUTDOOR_ROOMS`；`theme.js` 加 25 字段 × 4 套；`app.js` 接按钮 / 镜头 / 点击落点 / 姿态接管；`index.html` 加 `#waterparkChip`。**唯一改动的既有几何**：`world.js buildBalcony` 玻璃栏板在 x 5.1–7.1 开口（含门柱），房间 / 家具 / 碰撞 / 23 热区未动 |

---

## 1. 逐文件改动清单

### 代码 · 模型移除与 3D 兜底（T-04）

| 路径 | 改了什么 | 为什么 |
| --- | --- | --- |
| `public/room/app.js` | 删 `MODEL_URLS` 两条 da-feiyu 硬编码、`modelQuality` / `modelSwitching`、整个 `updateModelQualityChip()` / `switchModelQuality()`；`ensureModel3d()` 改为读 `CUSTOM_MODEL_URL`（`?model=` / `localStorage['home-custom-model-url']`，**默认 null**），未配置直接 `false` → `ensure3d()` 走 `ensureChibi()`；清理 modeChip 回调里错位的旧监听；toast 改「程序化 3D 角色」；`__homeDebug` 加 `theme`；接入主题下拉与 localStorage | 默认零 GLB 请求；**3D 模式永不空白**；保留 MIT 代码但去掉硬编码引用 |
| `public/room/model-actor.js` | 删导出 `MODEL_URLS` / `MODEL_URL` 常量；`url` 默认 `null`、`load()` 无 URL 返回 false；内部标识改 `custom-model-actor` / `custom-model-run-v2` | 只删 3 个 GLB 引用，不删 3D 模式（HC-10） |
| `public/room/index.html` | 删 `#modelQualityChip`（含 6.7 / 58.9 MB title），改造为 `#themeSelect` 下拉 + `.chip.chip-select` 样式；页脚删错误署名「3D 模型用户提供」，保留 dsh-pet + CC BY-NC-SA 4.0 + 仅非商业；`.foot` 深色底板 / `#e6f1ff` / 12px（HC-6 必修） | 不留指向不存在文件的按钮；署名在 4 套亮墙上可读 |
| `public/room/assets/models/README.md` | 全文重写：声明**本仓库不含任何 3D 模型文件**；默认 3D 走程序化 Chibi；给出可选自定义模型用法与责任归属 | 唯一保留文件必须准确反映现状 |
| `.gitignore` | 删两条 `!...glb` 例外，只保留 `!.../README.md` | 不留重新纳入模型的口子 |
| `public/room/actor.js` / `actor3d.js` | 纯内部 `Group.name` 两行改中性名（D-9 授权） | 避免把程序化几何误称为作者模型资产（HC-10） |

### 代码 · 主题系统（T-03，含 HC-9 扩权）

| 路径 | 改了什么 | 为什么 |
| --- | --- | --- |
| `public/room/theme.js`（新建） | **唯一配置表**：37 个 `M` 键（§3.2）、`env`（§3.3）、`timeOfDay`（主题 × 时段矩阵，HC-4）、`accent`、`details`（HC-5 一次性材质）、**`textures` 18 字段（§3.8.1）**、**`sky` 17 字段（§3.8.2）**、**`garden` 38 字段（§3.8.3+4）**、**`INVARIANTS`（§3.8.5 跨主题不变量单列一区）**；导出 `normalizeThemeName` / `getTheme` / `resolveLighting` / `applyTheme` / `hexToCss` / `mixHex`。`applyTheme` 只改现有材质 `.color`、灯光 `.color`、贴图内容，调用 `world.repaintThemeTextures()` 与 `world.themeHandlers` 回调，**不重建材质实例** | P3 单一配置表可溯源；满足 HC-1~HC-10；菜园 / 天空 / 贴图同步换皮 |
| `public/room/world.js` | `createWorld(renderer,{quality,theme})` 全量接入（fog / 18 贴图色值 / 37 个 M 项 / buildLights 的 hemi·sun·点光 / buildLabels 深色字）；暴露 `world.setTheme(name)`；`canvasTex` 挂 `repaint()`，6 类贴图挂 `setColors()`；`world.repaintThemeTextures()` 统一重画 9 张 canvas；`detailMat()` 收敛 10 类不走 M 的硬编码色（HC-5）；`skyTexture(hour, sky)` **四时段全部读 17 个主题字段**，`updateEnvironment` 时段重建时仍传当前主题；`updateEnvironment` 的 4 组硬编码色与灯泡覆写改读 `resolveLighting()`；`setMemoryNotes` 传主题 `memoryBoard` 并同步登记 | 运行时可切且昼夜刷新后不失效（HC-4）；房间换皮不留盲区 |
| `public/room/garden-world.js`（扩权） | 导入 `theme.js`；27 个自有 `M` 键 + 11 个粒子 / 灯光 / 标牌字段读 `theme.garden`；**8 个键仍直接引用 `world.mats.*` 同一材质实例（HC-9b 不重建）**；`label().paint()` 读 `signBg` / `signMatureBg` / `INVARIANTS.signFg=0x2c3a32`；`sprinkle` 三色读 `particleWater/Seed/Earth`；湿度 lerp 读 `soilDry/soilWet`；灯笼 `PointLight` 读 `lanternLight`；注册 `world.themeHandlers` 回调做运行时换肤（只改 `.color` / `.emissive`，重画菜牌）；`dispose()` 注销回调；**热区改 MeshBasicMaterial 双层描边**（C 组） | 菜园必须跟着换皮；HC-9 / HC-9b / §4.5 |
| `public/room/app.js` | 导入 theme 模块；初始主题 `?theme=` > `localStorage['home-room-theme']` > 默认，非法 key 回落 + 诊断；`createWorld(...,{theme})`；`syncThemeUi()` 同步下拉与 `--theme-accent`；`change` 回调调 `world.setTheme()`、写 localStorage、toast，**不重载页面、不动玩法状态** | 本地持久化、零学习成本 |
| `public/room/THEMES.md`（新建/更新） | 主题清单、加第 5 套的 8 步 + 自检命令、**73 字段对照表**、运行时重画原理、**修正后的显式豁免表**（删除「菜园 / 天空 night·dawn·dusk 未纳入」两行）、`INVARIANTS` 区、色值定稿状态、置顶「不要改 pet/ 素材文件」红线 | 文档与代码一致；可复刻可审计 |
| `public/room/garden-ui.js` | **检查后未修改**：无 `0x` / `#RRGGBB` 硬编码色 | 无需改动 |

### 文档 / 配置（T-04 / T-05 / 最终 A 组）

| 路径 | 改了什么 |
| --- | --- |
| `README.md` | 标题 / 首屏改为独立二创项目（非 Fork、非原创）；IMPORTANT 双声明 + 「MIT 仅覆盖代码」；「素材与许可」补 `> [!WARNING]` **「整体仓库不是纯 MIT」精确句**（A6）；功能表删「3D 画质」、新增「主题换装」与「3D 角色」；快速开始用 `feiyu-room-themes`；新增 `ASSET_LICENSES.md` / `THEMES.md` / `REMIX_CHANGES.md` 链接；删「商用前替换素材」等暗示可商用表述，明确纯非商业；保留并强化 CREDITS / INSPIRATION / 页脚署名 / 双声明 |
| `START_HERE.txt` | 版本 `v3.1.0-remix`；「四、3D 角色（本仓库不含任何 3D 模型）」；「八、已移除的内容」；第九节署名与授权（不可删）；建仓口径统一 |
| `CHANGELOG.md` | **补 `## v3.1.0-remix` 置顶条目**（A2）：4 套主题、移除模型与安装包、程序化 3D 兜底、四项修复、纯非商业双声明，**不写任何功能删减**；上游「最新版 1/2/3」作为历史保留并清除其 tools/模型分发表述 |
| `THIRD_PARTY_NOTICES.md` | 删「作者提供的 3D 模型」分发小节与第三方安装包小节，改为「已彻底移除」事实声明；补 `ASSET_LICENSES.md` 链接；双声明、素材零改动、整体非商业；建仓口径统一 |
| `PRIVACY_AND_ASSETS.md` | 「刻意不包含」补 3D 模型 / 第三方安装包；删「3D 模型」旧表格；新增主题系统与素材零改动小节；强调 CREDITS / 页脚 / INSPIRATION；建仓口径统一 |
| `SETUP.md` | 第 0 节、第 12 节（12.1 主题 / 12.2 3D 角色与自定义模型 / 12.3 语音 / 12.4 贴纸）、「黑屏」排查项改写；clone 用 `feiyu-room-themes`；建仓口径统一 |
| `AI_SETUP_PROMPT.md` | 背景补「不含任何 3D 模型 / 第三方安装包」「独立二创项目」；验收加主题切换与「无 GLB 404」；隐私段补素材零改动与署名保留；建仓口径统一 |
| `HOUSE_GENERATION_PROMPT.md` | **检查后未修改**：无过期宣称，且已写「暂无 3D 模型」「没有 3D 模型时用 2D 立绘/占位几何，不要卡死」 |
| `GITHUB_UPLOAD.md` | **方式 C 全量重写（A5）**：remote = `https://github.com/guo87g9/feiyu-room-themes.git`；主方案 B「新建独立仓库」，A 路径标 ❌ 不采用（上游历史含 GLB、用户已否决）；删「已 clone 上游副本」整段；高风险项改为「不建立 fork 关系、不继承历史，不存在历史 GLB 残留；`git log --all -- '*.glb'` 仅作二次验证」；仓库名定稿；「上传后要改的地方」补保留清单与双声明 |
| `ASSET_LICENSES.md`（**新建**，A3） | 四层矩阵（层 / 文件 / 许可证 / 允许 / 禁止 / 必须保留）：①代码 MIT + ①-a 程序化 Chibi 澄清行、②dsh-pet CC BY-NC-SA 4.0、③作者 3D 模型已移除、④第三方安装包已移除；矩阵外附带项；双声明与纯非商业；R8 已决议采用；README 首屏与 `THIRD_PARTY_NOTICES.md` 均已链接 |
| `LICENSE` | 在第 4 行后追加 `Copyright (c) 2026 guo87g9`；**原两行版权行与 MIT 全文一字未改** |
| `VERSION.txt` | `v3.1.0-remix`；项目名 `feiyu-room-themes`；独立二创建仓方式；「整体仓库不是纯 MIT」双声明；保留清单含 `ASSET_LICENSES.md` |
| `package.json` | `name: feiyu-room-themes`、`version: 3.1.0-remix`、`description` 独立二创口径；删 47 个悬空 scripts（含 `voice-gui` / `voice-cli` 指向不存在的 `../voice-tool`），保留 13 个实测存在的；**`postinstall` 已核实** `scripts/patch-snowluma-sdk.mjs` 存在；`dependencies` 一字未改 |
| `package-lock.json` | 第 2/3/8/9 行同步 `feiyu-room-themes` / `3.1.0-remix`（A1）；`npm ci --dry-run --offline` 通过 |
| `docs/REMIX_CHANGES.md` | 本文件（最终版） |

---

## 2. HC-4 昼夜参数化专项说明（验收重点）

**问题**：上游 `updateEnvironment()` 每次环境更新都用硬编码重设
`sun.color` / `hemi.color` / `hemi.groundColor` / `fog.color`，并把 `lampMaterials`
统一改成 `0xffd9a0` / `0x8f8b84`。只在 `createWorld` 初始化时设主题色，
**第一次昼夜刷新主题就会静默失效**。

**本实现的解法（不是「之后覆盖一遍」的偷懒做法）**：

1. `theme.js` 的 `buildTimeOfDay(env)` 为 **每套主题 × day/dawn/dusk/night 四时段**
   生成一份调色板 `{ sun, hemiSky, hemiGround, fog, sunIntensity, hemiIntensity }`。
   - `day` 直接读美术 §3.3 的 `env` 基准；
   - `night` 用美术逐主题给定的 `fogNight` / `hemiSkyNight`，其余用上游时段色与主题基准 `mixHex()` 混合；
   - `dawn` / `dusk` 用美术给定的 `sunDawn` / `sunDusk`，其余同上。
2. `TOD_INTENSITY` 固定 `sun.intensity`（2.45 / 1.15 / 1.25 / 0.18）与
   `hemi.intensity`（0.42 / 0.34 / 0.32 / 0.16），**跨主题完全不变**；
   `indoor` 系数、点光 `baseIntensity`、`castShadow` 逻辑、时段判定边界（6.5 / 20.5 / 16.8 / 5.2 / 8 时）**一律沿用上游**。
3. `world.js updateEnvironment()` 直接 `resolveLighting(world.theme, todKey)` 读当前主题当前时段，
   **不再有硬编码颜色分支**；`lampMaterials` 改读 `world.theme.mats.bulb / bulbOff`。
4. **天空同源风险一起处理**：`updateEnvironment()` 在时段变化 `dispose()` + 重建 `skyTexture(h)` 时，
   传入 `world.theme.sky`（17 字段），四时段渐变不会被上游硬编码覆盖。
5. `world.setTheme()` 在换肤后立即用 `world.lastEnvOpts` 重跑一次 `updateEnvironment()`，
   并按 `lastSkyKey=''` 强制重建天空，避免等到下一次快照才看到变化。

**实测**：`night + forest` 雾色 = `0x101a12`（= `forest.env.fogNight`），
回到 day = `0xb9c2ae`（= `forest.env.fog`）；四套 × 四时段 `resolveLighting` 全部返回合法值。

**U-12 依据说明**：`buildLights()` 的初始 hemi / sun 强度从上游 `0.5 / 2.0`
改为 `resolveLighting(theme,'day')` 的 `0.42 / 2.45`。这是**对齐美术 §3.3 的 day 基准**，
首次 `updateEnvironment()` 本来就会设成这两个值；跨主题**不降低任何光照强度基准**
（`sun.intensity` / `hemi.intensity` / 点光 `baseIntensity` / `indoor` 系数全部沿用上游数值）。
仅首帧之前的暂态略有变化，最终一致。请 quality-lead 单独复核此项。

---

## 3. HC-9 跨文件 73 字段：已接 / 未接清单

> 矩阵 v1.2 §3.8 的 73 个字段**已全部接入**（`theme.js` 有键 + 渲染代码有引用），
> 无「只进表不接线」的假接。逐项如下：

| 小节 | 字段数 | 已接 | 落点 | 未接 |
| --- | --- | --- | --- | --- |
| §3.8.1 `world.js` 贴图基色 | 18 | **18** | `tileKitchenMain/Grout`、`tileBathMain/Grout`、`tileBalconyMain/Grout`、`rugLivingMain/Border/Accent`、`rugBedMain/Border/Accent` → `tileTexture()` / `rugTexture()`；`woodFloorBase` → `woodFloorTexture()`；`woodFloorLight` → `furnitureSurfaces()` 的 grain；`notePaper/Tape` → `noteTexture()`；`memoryBoard` → `memoryBoardTexture()`；`buildLabelText` → `buildLabels()` | 0 |
| §3.8.2 `skyTexture` 四时段 | 17 | **17** | `dayTop/Mid/Low`、`nightTop/Mid/Low`、`dawnTop/Mid/Low`、`duskTop/Mid/Low`、`seaDay/seaDayBottom/seaDusk/seaNight/seaNightBottom` → `skyTexture(hour, theme.sky)` 四分支 | 0 |
| §3.8.3 `garden-world.js` 自有 `M` 键 | 27 | **27** | `soil`…`selected` → 27 个自有材质 `.color`；另有 8 键（`timber/endgrain/darkwood/hardware/iron/ceramic/terracotta/brass`）**直接引用 `world.mats.*` 同一实例**，随 §3.2 自动跟随（HC-9b） | 0 |
| §3.8.4 粒子 / 灯光 / 标牌 | 11 | **11** | `particleWater/Seed/Earth` → `sprinkle.material.color.setHex()`；`soilDry/soilWet` → 湿度 lerp；`lanternGlow/lanternEmissive/lanternLight` → 灯笼材质与 `PointLight`；`signBg/signFg/signMatureBg` → `label().paint()` | 0 |
| **合计** | **73** | **73** | — | **0** |

另：§3.2 的 **37 个 `M` 键** 与 §3.3 环境光也 100% 接入；`INVARIANTS` 单列一区（§3.8.5）。

**运行时联动**：`world.setTheme()` → `applyTheme()` →
①`world.mats[k].color.setHex()`（房间 + 菜园 8 个引用键）
②`world.detailMaterials`（HC-5 一次性材质）
③`world.repaintThemeTextures(theme)`（9 张 canvas 重画，clone 共享 Source 统一 `needsUpdate`）
④`world.lamps` / `hemi` / `sun` 颜色
⑤`world.themeHandlers`（菜园 27 自有材质 / 粒子 / 灯笼 / 菜牌 / 湿度）
⑥`world.lastSkyKey=''` 触发 `updateEnvironment()` 用新主题重建天空。
**全程不 `new Material`、不替换 `map`、不新建几何**，draw call 与材质数量不漂移。

**显式豁免（矩阵 §3.8.1 / §3.8.2 / §3.8.5 明文，非漏接）**：

- `screenTexture('tv'/'desk')` 渐变、`artTexture` 画作内容色、便签 / 记忆板的文字墨色与便签纸色、
  `furnitureSurfaces` 的 weave 底纹 —— **内容色**，矩阵 §3.8.1 明文豁免电视 / 显示器内容，其余同属内容色；
- 天空太阳 / 月亮、云、远山剪影、海平线亮带 —— **跨主题固定**的几何与亮度语义（§3.8.2 末 / §3.8.5）；
- PMREM 环境贴图（`buildSky` 一次性烘焙）—— 重建代价高、对主题色不敏感，`windowWarm` 材质已纳入 `details`；
- 3D 房间标签文字、页面底部署名、HUD 面板 —— 固定深色层（§3.7 / HC-5 / HC-6）；
- `courtyard` 院墙 / 石径 / 竹影实体 —— §3.8.6「取院之意不取院之形」，**不为不存在的几何写色值**。

---

## 4. HC-5 / HC-6 必修项与 C 组森林热区高亮

| 项 | 修复方式 | 实测 |
| --- | --- | --- |
| **HC-5** 3D 房间标签 | `buildLabels()` 从白字 `rgba(250,248,242,.9)` + 极淡描边改为**固定深色 `0x2c2e33`**（= `theme.textures.buildLabelText`，跨主题不变量）+ 浅色柔光描边 `0xfaf8f2` + `strokeText` 9px 外发光 | 深色字在 4 套浅墙上 ≈10:1（矩阵 §4.3），远高于 4.5:1；四套 × 昼夜四时段同一配对 |
| **HC-6** 页脚署名 | `.foot` 深色底板 `rgba(10,16,24,.78)` + 文字 `#e6f1ff` + 12px + 边框；保留 dsh-pet 链接与 `CC BY-NC-SA 4.0` 字样；删掉错误署名「3D 模型用户提供」 | 底板与主题解耦，四套亮墙下均可读 |
| **C-1** 热区材质不受光照影响 | `M.selected` 由 `MeshStandardMaterial`（`emissive 0x9d6b23 @0.15`）改为 **`THREE.MeshBasicMaterial`**；新增 `M.selectedOutline` 同为 MeshBasicMaterial。夜间 `sun 0.18` / `hemi 0.16` 不再压暗 | 实测菜园 group 中 16 个 `InstancedMesh` 使用 MeshBasicMaterial（8 畦 × 双层描边），95 个仍为 MeshStandardMaterial |
| **C-2** 双层描边 | 深色外框 `INVARIANTS.hotspotOutlineDark = 0x2c2e33`（`w+.21` / `.035` / y `.314`，稍大稍低）+ 亮色内框 `garden.selected = 0xffda7d`（`w+.15` / `.025` / y `.336`，稍小稍高）；**亮底靠深色外描边、暗底靠亮色内描边**，不做「一个兜底色走天下」 | 深色外框 / 四套墙：10.05–11.54:1；亮色内框 / 深色外框：10.08:1；亮色 / 四套菜园土：5.39–8.53:1。**全部 ≥3:1**，覆盖此前 seaside 1.39 ❌、courtyard 2.31 ❌ |
| **C-3** 冗余编码 | 双层框本身有尺寸差（`.21` vs `.15`）+ 两层颜色差，hover / focus / 选中态在灰度截图下仍可辨 | 不依赖单一颜色 |
| **C-4** 不降强度基准 | 未改任何 `sun.intensity` / `hemi.intensity` / `PointLight.baseIntensity` / `indoor` 系数 | 见 §2 U-12 说明 |
| **signFg 偏差** | `garden-world.js` 原 `#385344` 改为跨主题固定深色 **`0x2c3a32`**（`INVARIANTS.signFg`），菜牌 `paint()` 统一使用 | 四套浅色牌底上 ≥7:1 |

**T1/T2 区分度**（矩阵 §4.3.1 量化下限，逐值照抄未自调）：
`oak 1.86:1`（≥1.8）、`walnut 2.13:1`（≥2.0）、`darkWood 1.64:1`（≥1.6）、
`accent` 色相差 `0x3f9c98` H≈177° ↔ `0xe8893c` H≈27° ≈150°（≥120°）。

---

## 5. 最终 A 组文档收口逐项落地情况

| 项 | 状态 | 落地 |
| --- | --- | --- |
| **A1** `package-lock.json` 四处同步 | ✅ | 第 2/3/8/9 行 → `feiyu-room-themes` / `3.1.0-remix`；`npm ci --dry-run --ignore-scripts --offline` 输出 `up to date`，无 lock 失配 |
| **A2** `CHANGELOG.md` 置顶 `## v3.1.0-remix` | ✅ | 按 `production/RELEASE_NOTES.md` 要点：4 套主题、移除模型与安装包、程序化 3D 兜底、四项修复、纯非商业双声明；**未写功能删减**；上游历史条目保留 |
| **A3** 新建根目录 `ASSET_LICENSES.md` + 双链接 | ✅ | 四层矩阵（层 / 文件 / 许可证 / 允许 / 禁止 / 必须保留）；整体仅非商业、MIT 只覆盖代码、程序化 Chibi 属代码层 MIT、作者模型与安装包已移除；**README 首屏链接（5 处）** + `THIRD_PARTY_NOTICES.md` 链接均已加 |
| **A4** 肯定式建仓口径清零 | ✅ | `README.md` / `SETUP.md` / `START_HERE.txt` / `THIRD_PARTY_NOTICES.md` / `PRIVACY_AND_ASSETS.md` / `AI_SETUP_PROMPT.md` / `VERSION.txt` / `package.json` / `GITHUB_UPLOAD.md` / `CHANGELOG.md` / `ASSET_LICENSES.md` / 本文件全部改为「基于 / 二次创作自上游复制文件建立的独立二创项目，不是原创房间」；授权声明处保留「本仓库未取得许可、不分发、不链接、不留副本」实质；仅保留否定式「非 Fork / 不建立 fork 关系」 |
| **A5** `GITHUB_UPLOAD.md` 建仓指导 | ✅ | remote = `https://github.com/guo87g9/feiyu-room-themes.git`；`YOUR_REPO` 占位全部替换（0 残留）；A 路径标 ❌ 不采用（上游历史含 GLB、用户已否决），主方案 B「新建独立仓库」；删「已 clone 上游副本」整段；高风险项改写为「不建立 fork 关系、不存在历史 GLB 残留，`git log --all -- '*.glb'` 仅作二次验证」 |
| **A6** README 精确句 | ✅ | 「素材与许可」节新增 `> [!WARNING]` **「整体仓库不是纯 MIT … `package.json` 的 `"license": "MIT"` 仅描述代码 … 整体仅供个人学习与非商业用途」**；首屏 IMPORTANT 已有「MIT 仅覆盖代码」精确措辞；均为增补，未覆盖既有版本 |

---

## 6. 自检结果（实跑，非口头声明）

| # | 检查 | 结果 |
| --- | --- | --- |
| 1 | `node --check` 全部 `public/room/*.js` + `src` + `scripts` | **通过** |
| 2 | `theme.js` 键位 vs `world.js` 的 `M` 逐键比对 | **通过**：M 39 键 − `screen`/`deskScreen` = 37；4 套各 37 键，missing 0 / extra 0 |
| 3 | **73 字段完整性**：每套 `textures 18 / sky 17 / garden 38` | **通过**：`73 = 18+17+38`，4 套均无 missing / extra |
| 4 | **73 字段接线检查**：每个字段名在 `world.js` / `garden-world.js` 中确有引用 | **通过**：`73 / 73 wired`（`TOTAL wired: 73 / 73`） |
| 5 | `INVARIANTS` 门禁 | **通过**：9 项作物语义色、`selected 0xffda7d`、`signFg 0x2c3a32`、`buildLabelText 0x2c2e33` 四套同值；T1/T2 木作明度差与 accent 色相差达标 |
| 6 | `applyTheme` mocked-world 冒烟（4 套 + 非法 key + `blue-white` 别名） | **通过**（`APPLY_THEME SMOKE PASS`），未知 key 回落默认并打印诊断 |
| 7 | **端到端 1**：Node stub canvas → `createWorld()` + 5 次 `setTheme()` + `updateEnvironment(hour:23)` 夜间 + 回白天，low / balanced 两档 | **通过**（`WORLD E2E PASS`）：4 套 wall / fog / 主点光 / 辅点光命中；夜间 forest 雾 `0x101a12` 未被覆盖，白天回 `0xb9c2ae`；`tex 18 / sky 17 / garden 38` 齐全 |
| 8 | **端到端 2**：`createWorld()` + **`createGardenWorld()`** + `g.update(view)` + 4 套 `setTheme()` + 夜间 | **通过**（`FULL E2E (world+garden) PASS`）：garden handlers 注册 1、pickables 8、菜园 soil / signFg 随主题变化 |
| 9 | **HC-9b 材质实例**：菜园 group 中引用 `world.mats.*` 的 8 键未重建 | **通过**：`themeHandler` 只 `.color.setHex()` / `.emissive.setHex()`；`FULL E2E` 无异常 |
| 10 | **C 组热区**：MeshBasicMaterial 双层描边实例计数 + WCAG 对比度 | **通过**：16 个双层描边 InstancedMesh；深色外框 / 墙 10.05–11.54:1、亮 / 深 10.08:1、亮 / 土 5.39–8.53:1，全部 ≥3:1 |
| 11 | 13 个 npm scripts 目标文件存在 + `voice-gui`/`voice-cli` 已删 + `postinstall` 存在 | **通过**（dangling 0） |
| 12 | `npm ci --dry-run --ignore-scripts --offline` | **通过**（`up to date`，A1 后仍一致） |
| 13 | `index.html` id 唯一性 + `app.js` `$('...')` 引用存在 | **通过**：79 id 无重复；唯一「缺失」`garden-panel` 由 `garden-ui.js` 运行时创建，属既有行为 |
| 14 | 相对 markdown 链接全量校验（12 个文档） | **通过**：`ALL RELATIVE LINKS OK`（含 `ASSET_LICENSES.md` / `docs/REMIX_CHANGES.md` / `public/room/THEMES.md`） |
| 15 | 残留字面量扫描（业务文件，排除 design / production / tests / vendor / lock） | **通过**：无 `MODEL_URLS` / `modelQualityChip` / `6.7 MB` / `58.9 MB` / `tools/README.md` / `da-feiyu.glb` / `YOUR_REPO` / 肯定式 fork 口径；`models/` 目录只剩 README.md；`.gitignore` 两条 GLB 例外已删 |
| 16 | 版本号一致性 | **通过**：`package.json` / `package-lock.json`（4 处）/ `VERSION.txt` / `README.md` / `CHANGELOG.md` 均 `v3.1.0-remix` |
| 17 | 素材目录 | 本轮对 `pet/` 与 `sound/` **零写入**（只从代码层换色）；哈希基线比对由 quality-lead T-06 执行 |
| 18 | **真实浏览器 WebGL 像素级验证** | **未做**（本环境无浏览器）；Node 端到端只验证逻辑，不验证像素，需 T-06 复验 |
| 19 | **全量 npm 测试（7 条，真实退出码）** | **通过**：`test:room`(18) / `test:home`(27) / `test:garden:logic`(6 组) / `test:preset-prompt`(12/12) / `test:role-card`(8/8) / `test:napcat` / `test:mcp-servers` 全部 `EXIT=0`。Windows 权限位断言按 `process.platform` 条件化，`438 !== 384` 已消除；见 D-10 |

---

## 7. 未解决 / 待确认项（不假装全部通过）

| # | 项 | 现状 | 需要谁 |
| --- | --- | --- | --- |
| U-A | U-3（菜园主题化）与 U-4（天空 night/dawn/dusk）| **已闭环**：本轮扩权接入 73 字段，`THEMES.md` 豁免表与 `world.js:439-441` 的错误豁免引用已改正 | 无需再处理 |
| U-B | U-5（色值待审批）| **已闭环**：矩阵 v1.2 §6 为决议台账，R-1 定稿 / R-2 会签通过；`textures` / `sky` / `garden` 已按 §3.8 逐值照抄，不再是工程推导（仅 `details.*` 由 `mats` 推导，美术无异议） | 无需再处理 |
| U-C | U-7（CHANGELOG 置顶条目）| **已闭环**：A2 已补 | 无需再处理 |
| U-D | U-2（`package-lock.json`）| **已闭环**：A1 四处同步，`npm ci --dry-run` 通过 | 无需再处理 |
| U-E | U-1（内部 Group.name）| **已闭环**：D-9 授权的两行纯改名已落地 | 无需再处理 |
| U-F | U-10（git 历史 GLB）| **已规避**：用户拍板新建独立仓库、不继承上游 git 历史；本目录当前**不是 git 仓库**（`git status` 返回 `fatal: not a git repository`），无法执行 `git log --all -- '*.glb'`。已在 `GITHUB_UPLOAD.md` 保留为建仓后二次验证建议 | release-ops-lead（T-07）建仓后执行 |
| U-G | `production/release-checklist.md` / `LICENSE_ADDENDUM.md` 带旧行号的 FAIL / CONCERNS 条目 | `release-checklist.md` 已**移出公开仓库**（改由 `.gitignore` 排除的内部文档），该项对外验收不再适用；`LICENSE_ADDENDUM.md` 保留入库，如有人逐条核对，以仓库当前实际状态为准 | 无需再处理 |
| U-H | `test:room` / `test:home` EXIT=1 | 主理人已判定为 Windows 不保留 POSIX 权限位导致的 `0o600` 断言平台语义性失败，**明确要求我不要改** `scripts/test-room.mjs` / `test-home.mjs` | 主理人与用户另行确认 |
| U-I | 真实浏览器 4 套 × 昼夜 4 时段视觉 / 对比度 / 帧率、素材哈希基线 | **未做**（本环境无浏览器） | quality-lead（T-06） |
| U-J | PMREM 环境贴图不随主题重建 | 显式豁免（重建代价高、对主题色不敏感）；`windowWarm` 材质已纳入 `details` | 如美术要求全套窗外氛围一致，需补规格 |
| U-K | `artTexture` 画作内容色、便签/记忆板文字墨色、weave 底纹 | 显式豁免（矩阵 §3.8.1 未列入；与 `screenTexture` 同属内容色） | 如要纳入需美术补色值规格 |

---

## 8. 需要主理人转交的约束

- **给 quality-lead（T-06）**：4 套逐一切换无 JS 异常；切换前后家具位置 / 寻路 / 菜园存档 / 聊天记录不变；
  刷新后主题保持；`window.__homeDebug().theme` 与下拉一致；3D 模式控制台**不能有任何 `.glb` 请求 / 404**；
  **菜园与窗外天空须跟着换皮**（HC-9 已接 73 字段）；夜间 + 森林、正午 + 海边两极端下热区 / 标签 /
  页脚署名仍可读（双层描边实测 ≥3:1）；对 `pet/` 与 `sound/` 做哈希基线确认零字节改动；
  单独复核 §2 的 U-12（初始 hemi/sun 强度 0.42/2.45 与美术 day 基准一致）。
- **给 release-ops-lead（T-07）**：建仓后执行 `git log --all -- '*.glb'` 二次验证；刷新 `production/`
  清单的旧行号与结论；公开仓库必须保留 `LICENSE`、`ASSET_LICENSES.md`、`THIRD_PARTY_NOTICES.md`、
  `PRIVACY_AND_ASSETS.md`、`INSPIRATION.md`（**不得写成原创**）、`pet/CREDITS.md` 与页脚 dsh-pet 署名；
  整体**仅非商业**，代码 MIT / 素材 CC BY-NC-SA 4.0 双声明，不能标纯 MIT。
- **给 design-strategist / art-director**：矩阵 v1.2 已结项，色值无新版本；`INVARIANTS` 与
  T1/T2 量化下限已照抄落地；如需调整 `artTexture` / 内容色或 PMREM 重建，请补规格。
- **通用硬约束（任何后续改动都要遵守）**：
  - **绝不改动** `public/room/assets/pet/` 与 `public/room/assets/sound/` 下任何文件字节；
    不改 `public/room/vendor/`；不引入 CDN / 外部图片 / 新 3D 资产。
  - 主题系统只写渲染层（材质 `.color` / 灯光颜色 / canvas 贴图内容），**不写回玩法状态**；
    **绝不重建材质实例**（HC-9b：菜园 8 个引用键会断链）。
  - 本仓库不含、不链接、不声明授权任何 3D 模型文件与第三方安装包。
  - **不做 git commit / push / fork / 建仓**；所有高影响动作仍待用户审批。

---

## 9. v3.2.0 新增：水上乐园

### 9.1 位置与分区

| 区域 | 所在侧 | 边界 |
| --- | --- | --- |
| 菜园 `garden` | 房子 **-z**（屋后） | `[-1.05, -7.55, 13.15, -0.25]` |
| **水上乐园 `waterpark`** | 房子 **+z**（海侧） | `[-1.05, 9.0, 15.0, 25.0]` |

甲板 `16 × 16 m` 自阳台外沿伸出海面；泳池 `4.2 × 7.6 m`（与 `living` 房间同尺寸），
池底 `y = -1.36`，水面 `y = -0.18`。

### 9.2 新增文件

| 文件 | 职责 |
| --- | --- |
| `public/room/waterpark-world.js` | 场景：甲板（泳池处开洞）、池壁/池底/压条/爬梯、水面顶点波动、螺旋滑道、护栏、塔与两跑楼梯、装饰、主题回调 |
| `public/room/waterpark-client.js` | 交互：`setOpen` / `handlePointer`（点滑道上滑、点水面下水）/ 演出状态机 `getRide` / 水花 / `tick` |
| `public/room/waterpark-camera.js` | 取景：按可用区域二分求相机半径，海侧回望 |
| `scripts/test-waterpark.mjs` | 10 项离线单测 |

### 9.3 滑道几何做法

1. `CatmullRomCurve3`（`centripetal`，0.5）串起 47 个盘旋控制点 + 3 个出水点，
   共 `1.25` 圈、全长约 `17 m`、落差 `4.28 → 0.30`。
2. 截面为闭合 **U 型槽**：外宽 `1.24`、内宽 `0.88`、壁高 `0.44`、槽底厚 `0.15`，
   八个折角经 `roundPoly()` 二次贝塞尔圆角（半径 `0.055`）。
3. `sweepClosed()` 沿曲线扫掠，**帧不做滚转**——`right = T × up`、`upv = right × T`，
   因此无论坡度多陡，槽口恒定朝上（`ExtrudeGeometry` 的 Frenet 帧会扭，故不用）。
4. 内壁用更亮橙黄再扫一层，槽内叠加 `sweepRibbon()` 半透明水膜。
5. 护栏：以同一帧取 `±0.97·外宽`、`壁高 + 0.22` 的偏移点，串 `TubeGeometry`（半径 `0.055`，
   材质 `opacity 0.55`），另加一道细弧与等距立柱。

### 9.4 桌宠演出

- 点滑道：`climb`（3.4 s，甲板 → 楼梯 → 连桥 → 塔顶）→ `slide`（4.2 s，沿曲线采样，`elev = y + 0.15`）
  → `splash`（0.62 s，落水 + 水花）→ `swim`（周期起伏）。
- 点水面：`enter`（0.9 s 下沉）→ `swim`。
- 演出期间由 `waterpark-client.getRide()` 接管 `displayPos` 与 `elev`；点别处或关闭区域即取消。
- 演出结束调用 `act('place', { pos, free: true })` 把落点写回服务端，避免下次快照被拽回。

### 9.5 边界与约束

- 服务端 `OUTDOOR_ROOMS` 统一为 `garden / yard / waterpark`，室外走「最近路点」而非室内可见性捷径。
- 主题热切换沿用 HC-9b：`waterpark-world.js` 只注册一个 `themeHandler`，
  逐键 `.color.setHex()`，**不 new Material**；`dispose()` 时从 `world.themeHandlers` 摘除。
- 场景网格经包围盒校验，全部落在甲板范围内（`x -1~15`、`z 9~25`），无越界构件。

### 9.6 QQ 侧控制链路（v3.2.0）

原状：水上乐园只有房间与路点，**没有 spot**，因此 `spotOf('waterpark','slide')` 返回 `null`，
`qq_home_action` 的 `command` 无法把桌宠派过去。

| 环节 | 改动 |
| --- | --- |
| `HOME_LAYOUT.spots.waterpark` | 新增 `deck / pool / slide / lounge` 四个位置（`slide` 的 `access` 指向新增路点 `wp_stair`，避免绕塔基横穿） |
| `HOME_ACTIONS` | 新增 `waterpark` |
| `applyHomeAction` | `waterpark` 分支同时设置 `command`（负责寻路）与 `waterparkRide`（负责演出，含 `token` 与 2 分钟有效期）；`go` / `place` / `sleep` / `command` 会清空它，防止残留指令重播 |
| `homeView.her` | 新增 `waterparkRide: { kind, token, until }`，过期自动不下发 |
| `waterpark-client.syncState()` | 收到 token 且 `!walking && room==='waterpark'` 时自动开演并打开乐园视角；同 token 不重播 |
| `bridge.js` | `AGENT_HOME_ACTIONS` 放开 `waterpark`，校验并透传 `ride`（只接受 `slide` / `swim`） |
| `mcp-snowluma-safe.js` | `qq_home_action` 的 `action` 枚举加 `waterpark`，新增 `ride` 参数，描述补 `/room/` 与位置示例 |
| `dsh/.../agent.cordis.yml` | 第 18 条补一句「屋前的水上乐园也能去」 |
| `qq_get_prompt` 的 `home.layout` | **上游缺口**：工具描述与报错都引用 `home.layout.spots`，但此前从未生成。现按 `v2ToolEnabled('homeAction')` 下发 `rooms` / `spots` 紧凑清单 |

链路：QQ 消息 → 模型调 `qq_home_action(action=waterpark, ride=slide)` →
`POST /api/socialV2/home-action` → `applyHomeAction` → `advanceHomeState` 寻路 →
`homeView.her.waterparkRide` → 前端 `syncState` 开演。

### 9.7 整体收口测试矩阵（v3.2.0）

`npm run test:controls` 是本次新增的**跨层收口测试**，专治「加了玩法但某条通道没接上」。

| # | 断言组 | 覆盖点 |
| --- | --- | --- |
| 1 | 三方动作契约一致 | 解析 `src/bridge.js` 的 `AGENT_HOME_ACTIONS`、`src/mcp-snowluma-safe.js` 的 `action: z.enum([...])` 与运行时 `HOME_ACTIONS`，要求：桥接放行的动作服务端必须认识、MCP 暴露的动作桥接必须放行；`ride` 必须从工具参数一路透传到 `applyHomeAction`；预设必须提到 `action=waterpark` |
| 2 | 两条新玩法服务端全链路 | `slide` / `swim` 各自 apply → advance → 到位坐标（±0.5 m）→ 视图带 token |
| 3 | 两条新玩法前端全链路 | `syncState` → 自动开视角 → 演出 → 入水 → 停在泳池范围内 |
| 4 | 位置全量可达 | 41 个 spot 从客厅出发均有路线且不越界（室内约束仍生效） |
| 5 | 提示词可见性 | `waterpark/deck|pool|slide|lounge` 在 `listSpots()` 与 `home.layout.spots` 生成逻辑里都在 |
| 6 | 房间判定与落点 | 泳池中心 / 阳台外沿判为 `waterpark`；甲板落点保真；菜园仍吸附 |
| 7 | 旧玩法回归 | 5 个室内/菜园 command + 8 个日常互动仍 `changed=true`；空留言与未登记动作仍被拒 |
| 8 | 不污染菜园 | 去乐园后 `her.gardenWork === null`、dwell 内无 `gardenJobId` |
| 9 | 主题 × 新场景 | 4 套主题均可构建、换肤复用材质实例、切回还原、`dispose` 只摘自己的回调 |
| 10 | 子系统共存 | 菜园回调与乐园回调同时存在时互不影响 |
| 11 | 前端接线静态断言 | 导入 / 按钮 / 点击优先级（乐园先于菜园）/ 落点平面 / 点击行走分支 / 演出接管 / 取景 / 两区互斥 / 阳台栏板开口 |
| 12 | 甲板落点保真 | 三个坐标点哪走到哪（误差 < 0.05 m） |

**实测**：9 条 `npm run test:*` 全部 `EXIT=0`。

> 说明：`/api/socialV2/home-action` 的真实 HTTP 请求需要 `reserved2` 模式 + 有效 agent token +
> 已连接的 NapCat，本机无 `state/` 与配置，未做真实 QQ 收发验证；改以「契约一致性 + 同一份
> `applyHomeAction` 逻辑」覆盖，二者之间的差异只可能是传输层。
