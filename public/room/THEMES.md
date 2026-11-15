# 房间主题系统（4 套换肤）

> 本文件面向「想改配色 / 想加第 5 套主题」的人。
> **唯一配置表是 [`theme.js`](theme.js)**：所有色值集中在这一个文件，
> `world.js` 只负责读取与应用，不硬编码任何主题颜色。
> 逐文件改动清单见 [`../../docs/REMIX_CHANGES.md`](../../docs/REMIX_CHANGES.md)。

---

## ⚠️ 第一条：不要改素材文件

`public/room/assets/pet/` 下的 `.webm` / `.png` 与 `public/room/assets/sound/` 下的 `.wav`
来自 **dsh-pet，CC BY-NC-SA 4.0**（署名 · 非商业 · **相同方式共享**）。

- **禁止**重绘、调色、换色、裁剪、滤镜、AI 重绘、重新编码 `webm`、重新导出 `png`、
  抽帧换帧，或把立绘烘焙进任何贴图 / 图集 / 「主题版立绘」。
- **禁止**对角色 `<video>` / `<img>` 施加会生成新文件的运行时色彩滤镜并截图 / 缓存 / 导出。
- 主题系统**只在代码层**写 `THREE.Material.color`、灯光颜色与 canvas 贴图色值，
  素材目录保持**零字节差异**；这是「代码 MIT」与「素材 CC BY-NC-SA」能干净共存的唯一工程路径。
- 需要提升立绘轮廓对比度时，只能用**容器层**的深色底板 / 描边 / 柔光（不作用于素材、不生成新文件），
  且需用户单独拍板。
- 同样**不要**修改 `public/room/vendor/`（Three.js r160，MIT）、**不要**引入外部图片 / CDN /
  照片 / 新 3D 资产。本仓库**不含任何 3D 模型文件**，3D 角色是 `actor3d.js` 的程序化几何。

---

## 主题清单

| key（代码 / 持久化 / URL） | 中文名 | 唯一点缀色 `accent` | 语义锚点 |
| --- | --- | --- | --- |
| `blue_white` **（默认）** | 蓝白小屋 | `0xd8b570` 白金 | 低饱和冷白墙 + 藏青结构 + 白金点缀，呼应 dsh-pet 蓝发 / 藏青白金裙装；**禁止高饱和亮蓝做主色**（会与蓝发糊在一起） |
| `seaside` | 海边小屋 | `0x3f9c98` 海玻璃青 | 日晒暖白 + 漂白木 + 海玻璃青，最明亮通透 |
| `forest` | 森林木屋 | `0xe8893c` 炉火橙 | 亚麻米墙保对比度，深木棕落在木作 / 梁 / 地板，炉火橙只做点缀；**不降低任何光照强度基准** |
| `courtyard` | 中式小院 | `0xc0432f` 朱砂 | 宣纸粉墙 + 青砖灰踢脚 + 青瓷 / 黛青；**取小院之意，不取小院之形**（不新增庭院、不改户型 / 碰撞 / 寻路） |

- 色值来源：[`design/asset-license-matrix.md`](../../design/asset-license-matrix.md) v1.2 §3.2 / §3.3 / **§3.8**（美术定稿，全部 `0xRRGGBB`）。
- **换肤范围是全屋**：房间材质、9 张 canvas 贴图、窗外天空四时段渐变、**菜园**（自有材质 / 作物以外的环境色 / 粒子 / 灯笼 / 菜牌）同步变化；
  只改渲染层，不改户型 / 碰撞 / 寻路 / 热区 / 菜园数值 / 昼夜判定。
- **key 命名**：设计文档固定 `blue_white`（下划线）。早期任务书里出现过 `blue-white`，
  `normalizeThemeName()` 会把 `blue-white` / `bluewhite` / 大小写变体都归一到 `blue_white`，
  但**持久化与 UI 一律用 `blue_white`**。
- 未知 / 非法 key（包括 localStorage 被清空、URL 拼错）→ 回落 `blue_white`，并打印一次
  `[theme] 未知主题 key …` 可诊断提示，不白屏、不静默套残留值。

### 怎么用

- 页面右上角「主题」下拉：一个控件，键盘可达，当前主题直接可读。
- 切换**不重载页面**、不重建场景、不重置角色 / 菜园 / 聊天 / 投屏状态；
  走路、吃饭、睡觉、浇水结算、电视投屏过程中切换都只换渲染参数。
- 选择保存在浏览器 `localStorage['home-room-theme']`；不写服务端、不进公开仓库、不需要账号，
  **不需要也不应该**写进 `config.json`。
- 可用 URL 覆盖一次：`/room/?theme=forest`（不会写入 localStorage，刷新后回到原来的选择）。
- 调试：`window.__homeDebug().theme` 返回当前 key。

### 跨主题不变量（改主题时别踩）

- 户型、家具尺寸 / 位置、碰撞体、寻路点、交互热区、菜园数值、动作表、聊天逻辑**完全不变**。
- 昼夜**判定与时长**不变；主题只改昼夜的**色调**。
- `sun.intensity` / `hemi.intensity` / 点光 `baseIntensity` / `indoor` 系数**一律沿用上游数值**，
  跨主题不漂移（低照度主题不得靠「调暗」营造氛围）。
- 4 套主题的几何体数量、draw call、材质数量保持同一量级：`applyTheme()` **只改现有材质的 `color`**，
  不重建材质实例、不替换 `map`、不新建几何。
- HUD 是**独立于主题的固定深色层**，文字 / 面板配对不随主题变化，可读性不受换色影响。

---

## 色值字段说明（`theme.js`）

每个主题对象由 `buildTheme(id)` 组装，字段如下：

| 字段 | 类型 | 落点 | 说明 |
| --- | --- | --- | --- |
| `id` / `label` | string | UI / 调试 | key 与中文名 |
| `mats` | `Record<string, number>` | `world.mats[k].color` | **37 个键，逐字对齐 `world.js` 的 `M` 对象**（`wall`…`bulbWarm`）。`glass` / `glassFrost` / `mirror` / `wallGhost` 只改 `color`，保留材质类型与 `opacity` / `metalness` 等参数。`screen` / `deskScreen` **不纳入**（emissiveMap 非纯色，避免电视内容随主题漂移） |
| `accent` | number | CSS 变量 `--theme-accent` | 每套**唯一一支**交互点缀色，落 UI 层（主题 chip 的小圆点），不写进 `M` |
| `env` | object | 初始 `buildLights()` + `updateEnvironment()` 的 day 分支 | `fog` / `hemiSky` / `hemiGround` / `sun` / `pointLightMain` / `pointLightAccent`，以及 `fogNight` / `hemiSkyNight` / `sunDawn` / `sunDusk`（美术逐主题给定） |
| `timeOfDay` | object | `updateEnvironment()` | **主题 × 时段矩阵**：`day` / `dawn` / `dusk` / `night`，每项含 `sun` / `hemiSky` / `hemiGround` / `fog` + 固定 `sunIntensity` / `hemiIntensity`。由 `buildTimeOfDay(env)` 生成：day 直接读美术基准，其余时段用上游时段色与主题基准做 `mixHex()` 混合，**只换色调不改强度** |
| `details` | object | `world.detailMaterials[k][]` | 不走 `M` 的一次性材质（HC-5 盲区收敛）：`ground` / `sea` / `ceilingSlab` / `curtain` / `bathmat` / `runner` / `cloth`（4 件衣物，数组）/ `bulbGlow` / `doormat` / `windowWarm`。值由本主题 `mats` 推导，保证「墙换了、地毯 / 窗帘也跟着换」 |
| `textures` | object | `world.repaintThemeTextures()` → 9 张 canvas 贴图 | **§3.8.1 的 18 字段**（`0xRRGGBB` 数值）：`tileKitchenMain/Grout`、`tileBathMain/Grout`、`tileBalconyMain/Grout`、`rugLivingMain/Border/Accent`、`rugBedMain/Border/Accent`、`woodFloorBase/Light`、`notePaper/Tape`、`memoryBoard`、`buildLabelText`。渲染层用 `hexToCss()` 转 CSS 字符串 |
| `sky` | object | `skyTexture(hour, theme.sky)` 的 **day / dawn / dusk / night 四个分支** | **§3.8.2 的 17 字段**：`dayTop/dayMid/dayLow`、`nightTop/nightMid/nightLow`、`dawnTop/dawnMid/dawnLow`、`duskTop/duskMid/duskLow`、`seaDay/seaDayBottom/seaDusk/seaNight/seaNightBottom`。`updateEnvironment()` 在时段重建天空贴图时仍传当前主题（HC-4 / HC-9） |
| `garden` | object | `garden-world.js` 的 27 个自有 `M` 键 + 11 个粒子 / 灯光 / 标牌字段 | **§3.8.3 + §3.8.4 的 38 字段**：`soil`…`selected`、`particleWater/particleSeed/particleEarth`、`soilDry/soilWet`、`lanternGlow/lanternEmissive/lanternLight`、`signBg/signFg/signMatureBg`。`timber` / `endgrain` / `darkwood` / `hardware` / `iron` / `ceramic` / `terracotta` / `brass` **直接引用 `world.mats.*` 同一材质实例**（HC-9b），随 `mats` 自动跟随 |
| `INVARIANTS`（模块级导出） | object | 审计用 | **§3.8.5 跨主题不变量**：9 项作物语义色四套同值、`garden.selected` 固定 `0xffda7d`、热区双层描边 `0x2c2e33` + `0xffda7d`、`buildLabelText` `0x2c2e33`、`signFg` `0x2c3a32`、粒子语义色相、天空天体 / 时段判定与强度基准、`screen`/`deskScreen` 内容色、几何量级 |

### 73 个跨文件字段（HC-9，已全部接入）

| 文件域 | 字段数 | 落点 |
| --- | --- | --- |
| `world.js` `M` 调色板（§3.2） | 37 | `theme.mats` → `world.mats[k].color` |
| `world.js` 贴图基色（§3.8.1） | 18 | `theme.textures` → `woodFloorTexture` / `furnitureSurfaces` / `tileTexture` / `rugTexture` / `noteTexture` / `memoryBoardTexture` / `buildLabels` |
| `world.js` 天空渐变（§3.8.2） | 17 | `theme.sky` → `skyTexture(hour, sky)` 四时段分支与海面 |
| `garden-world.js` 自有 `M` 键（§3.8.3） | 27 | `theme.garden` → 27 个自有材质 `.color` |
| `garden-world.js` 粒子 / 灯光 / 标牌（§3.8.4） | 11 | `theme.garden` → `sprinkle` / 湿度 lerp / 菜牌 `paint()` / 灯笼 `PointLight` |
| **合计** | **73 + 37（M）= 110 个色值落点** | 主题切换时房间、菜园、窗外同步变化 |

### 贴图是怎么在运行时换色的

`canvasTex()` 给每张贴图挂了 `userData.repaint()`，在同一张 canvas 上重画；
`tileTexture()` / `rugTexture()` / `woodFloorTexture()` / `noteTexture()` /
`memoryBoardTexture()` / `furnitureSurfaces()` 把颜色放在可变 `state` 里并挂
`userData.setColors(...)`，由 `world.repaintThemeTextures(theme)` 统一调用。
`Texture.clone()`（three r160）**共享 `Source`**，所以 `buildShell` 里 4 块地砖的 clone
只需统一 `needsUpdate = true` 就会跟着更新——不需要替换 `map`、不需要遍历场景、
不需要 `dispose()`、不会造成材质 / draw call 漂移。

菜园侧由 `world.themeHandlers` 里注册的回调重绘：只改现有材质实例的 `.color` /
`.emissive` / `PointLight.color`，并用 `sign.paint()` 重画同一张菜牌 canvas。
**绝不 `new Material` 替换实例**（HC-9b：8 个引用 `world.mats.*` 的键会断链退回原色）。

### 显式豁免（矩阵 §3.8.1 / §3.8.2 / §3.8.5 已列，别当成漏改）

| 项 | 原因 |
| --- | --- |
| `screenTexture('tv'/'desk')` 渐变、`artTexture` 画作内容色、便签 / 记忆板的文字墨色与便签纸色 | 是**内容**而非房间材质，矩阵 §3.8.1 明文豁免电视 / 显示器内容；其余同属内容色，不随主题漂移 |
| 天空的太阳 / 月亮、云、远山剪影、海平线亮带 | 矩阵 §3.8.2 末与 §3.8.5：几何与亮度语义**跨主题固定**，避免 4 套出现不同天体 |
| PMREM 环境贴图（`buildSky` 里一次性烘焙） | 重建代价高、对主题色不敏感；`windowWarm` 材质已纳入 `details`，只是不重新烘焙 |
| 3D 房间标签文字、页面底部署名、HUD 面板 | 4 套墙色都在 `0xe6–0xf2` 浅区间，统一固定深色字 / 深色底板，与主题解耦反而更稳（§3.7 / HC-5 / HC-6 必修项） |
| `courtyard` 的院墙 / 石径 / 竹影实体 | §3.8.6：只取小院之意、不取小院之形，**不为不存在的几何写色值** |

### 色值来源与定稿状态

矩阵 **v1.2（645 行，已结项）** 的 §3.2 / §3.3 / §3.8 已给出全部定稿 `0xRRGGBB`，
`theme.js` **逐值照抄**；R-1 色值定稿、R-2 森林墙色折衷已由 design-strategist 会签通过，
**不会再有色值新版本**。唯一由工程推导的是 `details.*`（一次性材质，由 `mats` 用
`mixHex()` 推导），美术侧已确认无异议。
T1/T2 区分度按 §4.3.1 量化下限照抄，未自调：`oak 1.86:1`（≥1.8）、
`walnut 2.13:1`（≥2.0）、`darkWood 1.64:1`（≥1.6）、`accent` 色相差 ≈150°（≥120°）。

---

## 如何加第 5 套主题

> 设计 brief 本轮**锁死 4 套**防认知过载；下面是扩展方法，不代表要立刻加。

1. 在 `theme.js` 的 `THEME_KEYS` 里加新 key（例如 `modern`），并在 `THEME_LABELS` 加中文名。
2. 在 `MATS` 里加一份**完整的 37 键**表（缺一个键就会出现「半套主题」：墙换了、某件家具没换）。
   可复制 `MATS.blue_white` 再逐项改色。
3. 在 `ENV` 加一份 `fog / hemiSky / hemiGround / sun / pointLightMain / pointLightAccent /
   fogNight / hemiSkyNight / sunDawn / sunDusk`。
   `timeOfDay` 由 `buildTimeOfDay()` 自动生成，**不用手写 4 套时段**。
4. 在 `ACCENTS` 加**唯一一支**点缀色；在 `TEXTURES`（18 键）、`SKY`（17 键）、
   `GARDEN`（38 键）各加一份完整色值。9 项作物语义色 / `selected` / `signFg` 必须与
   `INVARIANTS` 同值。`details` 由 `buildDetails()` 自动从 `mats` 推导，**不用手写**。
5. 在 `index.html` 的 `#themeSelect` 里加一个 `<option value="modern">…</option>`。
6. 跑一遍校验（见下），确认 37 键 + 18 + 17 + 38 字段齐全、4 时段都能解析、未知 key 回落默认。
7. 更新本文件的「主题清单」表与 `README.md` 的功能表描述。
8. **不要**为新主题添加专属家具 / 交互 / 作物 / 数值 / 解锁条件 / 新 3D 资产。

### 自检命令（Node，无需浏览器）

```bash
node --input-type=module -e '
import { THEMES, THEME_KEYS, resolveLighting, getTheme } from "./public/room/theme.js";
const keys = Object.keys(THEMES.blue_white.mats);
for (const k of THEME_KEYS) {
  const t = THEMES[k];
  const missing = keys.filter(x => !(x in t.mats));
  for (const s of ["day","dawn","dusk","night"]) if (typeof resolveLighting(t,s).fog !== "number") throw new Error(k+" "+s);
  console.log(k, "mats", Object.keys(t.mats).length, "missing", missing.length, "ok");
}
console.log("fallback:", getTheme("nope").id);
'
```

浏览器侧验收：4 套逐一切换无 JS 异常；切换前后家具位置 / 寻路 / 菜园存档 / 聊天记录不变；
刷新后主题保持；`window.__homeDebug().theme` 与下拉一致；夜间 + 森林木屋、正午 + 海边小屋
两个极端下热区 / 标签 / 署名仍可读。

---

## 相关文件

| 文件 | 作用 |
| --- | --- |
| `public/room/theme.js` | **唯一配置表**（37 M 键 + 18 贴图 + 17 天空 + 38 菜园 + `INVARIANTS`）+ `normalizeThemeName` / `getTheme` / `resolveLighting` / `applyTheme` |
| `public/room/world.js` | 读取主题建场景；`createWorld({ theme })`；`world.setTheme(name)` / `world.repaintThemeTextures()` / `world.themeHandlers`；`skyTexture(hour, sky)` 四时段 |
| `public/room/garden-world.js` | 菜园 27 自有材质 + 11 粒子 / 灯光 / 标牌字段；注册换肤回调；MeshBasicMaterial 双层描边热区 |
| `public/room/app.js` | 下拉控件、localStorage 持久化、`--theme-accent` |
| `public/room/index.html` | `#themeSelect` 与 chip 样式、页脚署名底板 |
| `../../ASSET_LICENSES.md` | 四层素材授权矩阵（HC-1 素材零字节改动的合规依据） |
| `design/asset-license-matrix.md` | 色值来源与硬约束（HC-1 ~ HC-10，§3.8 = 73 字段） |
| `design/room-reskin-brief.md` | 主题契约与跨主题不变量 |
| `../../docs/REMIX_CHANGES.md` | 逐文件改动清单、HC-4 昼夜参数化说明、已接/未接字段 |
