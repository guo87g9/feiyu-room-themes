# feiyu-room-themes · 大肥鱼房子主题换装版

> 当前版本：**`v3.2.0-remix`** · 上游代码来源：[`sh2234113/feiyu-room-template`](https://github.com/sh2234113/feiyu-room-template)（MIT）

[安装指南](SETUP.md) · [生成自己的房子](HOUSE_GENERATION_PROMPT.md) · [GitHub 上传教程](GITHUB_UPLOAD.md) · [主题配置说明](public/room/THEMES.md) · [素材授权矩阵](ASSET_LICENSES.md) · [逐文件改动清单](docs/REMIX_CHANGES.md)

> 本项目 `feiyu-room-themes` 是**新建的独立公开仓库**，代码与户型取自
> [`sh2234113/feiyu-room-template`](https://github.com/sh2234113/feiyu-room-template)
> （**非 Fork、不继承其 git 历史**），在其上做视觉二创：只更换房间配色主题，保留上游户型与全部玩法；
> 不隶属于 DeepSeek、SnowLuma、腾讯或 QQ 官方。**不是原创房间**。
> 灵感来源与署名见 [INSPIRATION.md](INSPIRATION.md)（**二次发布时不得改写成「原创」**）。

目标环境：DeepSeek Harness `0.2.1-rc.2`；Node.js `>= 22.13.0`；Three.js 为仓库内 vendor（无 CDN）。

> [!IMPORTANT]
> **双声明：代码 MIT / 2D 立绘素材 CC BY-NC-SA 4.0，两者授权不同。**
> **整体仓库不是纯 MIT —— `package.json` 的 `license: MIT` 与 GitHub 的 MIT 徽标仅描述「代码」，
> 不覆盖素材；素材部分以更严格者为准，`public/room/assets/pet/` 不得被当作 MIT 代码授权。**
> - **代码**：沿用上游 **MIT**，见 [LICENSE](LICENSE)；`LICENSE` 内两行原版权行原样保留，
>   本仓库新增代码同样以 MIT 提供（已追加 `Copyright (c) 2026 guo87g9`）。
> - **2D 立绘 / 动画 / 点击音效**：`public/room/assets/pet/` 来自
>   [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)（蓝毛小女仆），按 **CC BY-NC-SA 4.0** 使用
>   ——需署名、仅限非商业、衍生需相同方式共享；详见
>   [CREDITS](public/room/assets/pet/CREDITS.md)、[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)、
>   [ASSET_LICENSES.md](ASSET_LICENSES.md)、[PRIVACY_AND_ASSETS.md](PRIVACY_AND_ASSETS.md)。
>   页面底部署名必须保留且可读。
> - **整体仅非商业**：不得用于售卖、付费服务或商业宣传。代码单独被取用时 MIT 仍含商用，
>   与仓库整体非商业定位不矛盾。
> - **已移除 / 不含**：不含任何角色 3D 模型文件／私人素材；保留的 2D 立绘是已署名的第三方 CC 素材。
>   作者提供的 3 个 GLB 模型文件与 `tools/` 下第三方安装包均已移除，不再随仓库分发；
>   **3D 模式由 `actor3d.js` 的代码级程序化几何提供**（家具 / 天空 / 植被同为 Three.js 几何与材质）。
>   若你想放自己的模型，请先确认授权，见 [models/README.md](public/room/assets/models/README.md)。
> - 仓库不含作者的角色卡、QQ 号、群号、聊天记录、记忆、语音、照片、API Key、Cookie 或 `state/`。

```text
浏览器 /room/  ──>  qq-bridge（本项目 Node 进程）──>  DSH Web API
       │                                      │
       ├── Three.js 房间 / 菜园 / 电视          ├── SnowLuma（可选，QQ）
       └── 本地房间 API                        └── MCP / agent presets
```

## 能做什么

| 场景 | 功能 |
| --- | --- |
| 3D 房间 | 客厅、厨房、餐厅、卧室、卫生间、阳台、玄关、走廊、屋后菜园、屋前水上乐园；家具、灯光、昼夜、相机与第一视角；同房间地图寻路、自动避开大件家具 |
| **主题换装** | 一键切换「蓝白小屋（默认）／海边小屋／森林木屋／中式小院」4 套配色；**只改材质、灯光与贴图色值，户型、家具碰撞、寻路、菜园与聊天逻辑完全不变**；选择保存在浏览器本地，刷新后保留。见 [THEMES.md](public/room/THEMES.md) |
| 3D 角色 | 默认 2D 立绘；切到 3D 时使用**程序化生成的 Q 版角色**（纯代码几何，无模型文件、无下载、无加载失败空白）。可选自定义模型机制见 [models/README.md](public/room/assets/models/README.md) |
| 角色互动 | 点击移动、长按抓取、摸头/喂食/倒水/陪玩/叫醒、气泡、立绘/3D 模式切换；右侧动作栏可跳舞、伸懒腰、行礼等 |
| 房间私聊 | 网页内和同一个角色聊天，不经过 QQ；聊天记录只存在浏览器 localStorage |
| 电视投屏 | 用 `getDisplayMedia` 把浏览器标签页共享到房间电视；50% / 80% / 全屏 |
| 跟随一起看 | 左下角立绘陪伴层，可调大小、开关气泡、截取电视画面说观后感 |
| 菜园 | 8 畦菜地、12 种作物、翻土/播种/浇水/施肥/采收/出售/买种子/买堆肥、自主照料 |
| **水上乐园**（v3.2.0） | 房子另一侧的海上甲板：**4.2 × 7.6 m 泳池**（与客厅同尺寸）+ **CatmullRom 螺旋滑道**（U 型凹槽截面、圆角倒角、半透明橙色弧形护栏）。点滑道她会爬上塔顶盘旋滑下、入水游泳；点水面直接下水；点甲板任意位置就走到那儿。顶部 `🛝 进入水上乐园` 进入，与菜园互斥切换。**QQ 里也能指挥**：「去滑滑梯」「去游泳」用 `qq_home_action` 的 `action=waterpark` 配 `ride` |
| QQ 桥接 | 文本、图片、表情、引用、合并转发；两代群聊仿真、角色卡、记忆与白名单 |
| 本地控制台 | 切换模式、管理白名单、查看日志和 token 用量 |

> 主题名沿用上游 [HOUSE_GENERATION_PROMPT.md](HOUSE_GENERATION_PROMPT.md) 的风格方向，
> 但本分支是**同一户型换配色**，不是从零生成新房子；「中式小院」取小院之意，不取小院之形。

## 两种使用方式

### 方式 A：直接复刻这套房子

适合想快速看到效果的人。按 [SETUP.md](SETUP.md) 安装，得到和模板一致的户型、菜园、电视、陪伴层和 QQ 桥接。

### 方式 B：让 DSH 生成你自己的房子

适合想要不同风格、不同户型的人。不复制现有房子，只把需求告诉 DSH，让它从零搭自己的版本。

入口：[HOUSE_GENERATION_PROMPT.md](HOUSE_GENERATION_PROMPT.md)。
里面有需求访谈、分阶段提示词、五套风格方向和一份可直接复制的设计 brief。

> 方式 A 是「代码/界面接近 1:1」；方式 B 是「生成你自己的版本」，两者不要混着用。

## 快速开始

准备：

- **Node.js >= 22.13**；
- **DeepSeek Harness**（目标 `0.2.1-rc.2`）；
- **SnowLuma**（可选，只影响 QQ；单独安装）；
- Chrome / Edge（投屏需要 `getDisplayMedia`）。

### 1. 获取项目

本仓库定名 **`feiyu-room-themes`**，是**新建的独立公开仓库**（非 Fork、不继承上游 git 历史），
不要往上游 `sh2234113/feiyu-room-template` 提交：

```bash
git clone https://github.com/guo87g9/feiyu-room-themes.git
cd feiyu-room-themes
npm ci
```

没有 Git 就下载 ZIP，解压后**进入解压出来的那一层目录**（本机工作副本目录名为 `大肥鱼`）；
不要照抄任何示例目录名，以你实际看到的目录为准。上传与命名见 [GITHUB_UPLOAD.md](GITHUB_UPLOAD.md)。

### 2. 创建配置

```bash
cp config.example.json config.json
```

Windows PowerShell：

```powershell
Copy-Item config.example.json config.json
```

### 3. 填写配置

编辑 `config.json`，至少核对这些字段：

| 字段 | 填写内容 |
| --- | --- |
| `ownerQQ` | 你的管理员 QQ；只填自己的 |
| `allow.private` / `allow.groups` | 允许接入的 QQ / 群；空白名单不响应任何会话 |
| `consoleToken` | 自己生成的一长串随机字符；不要发到群里 |
| `snowluma.wsUrl` / `httpUrl` | OneBot WS/HTTP 地址，默认 `ws://127.0.0.1:3001` / `http://127.0.0.1:3000` |
| `snowluma.accessToken` | 如果 SnowLuma 配了 token 才填 |
| `dsh.baseUrl` | DSH Web 地址，默认 `http://127.0.0.1:3080` |
| `dsh.provider` / `dsh.model` | 必须是当前 DSH 真实可用的 provider/model |
| `room.access` | 默认 `loopback`；房间只允许本机回环访问 |

> 主题选择只存在浏览器 localStorage，**不需要也不应该**写进 `config.json` 或提交到仓库。

### 4. 安装 DSH preset / MCP

```bash
node scripts/setup-dsh.mjs
```

这一步会注册 `qq-chat` / `qq-chat-v2` preset、三个 MCP server 和两个 DSH 插件。
完成后**重启 DSH Web**，否则 preset 和工具不会生效。

### 5. 启动

```bash
npm start
```

打开：

```text
http://127.0.0.1:13100/room/
```

必须带结尾 `/`；`/room` 会 302，相对路径可能解析错。

Windows 也可以双击 `scripts/start.bat`；Linux/macOS 可运行 `./scripts/start.sh`。

### 6. 验收

```bash
npm run test:room
npm run test:home
npm run test:garden
npm run test:waterpark
npm run test:controls
npm run test:mcp-servers
```

浏览器检查：

- 进入菜园 / 返回小屋正常；
- 8 块菜畦、12 种作物、自主照料按钮存在；
- **点「🛝 进入水上乐园」切到甲板视角，点滑道她会爬梯、盘旋下滑入水，点水面会下水游泳，点甲板能走过去；换主题后甲板/池水/滑道配色同步变化**；
- 电视投屏能选标签页；
- 「跟随一起看」左下角出现陪伴层，大小滑块、气泡、截屏按钮可用；
- 右上角「主题」下拉能切换 4 套配色，且不重载页面、不丢角色/菜园状态；
- 刷新页面无 500、无未捕获 JS 异常。

## 目录

```text
src/                桥接、DSH 客户端、MCP、记忆卡、花园、房间状态
public/room/        房间前端（Three.js / 菜园 / 水上乐园 / 电视 / 陪伴层）
  theme.js          4 套主题的唯一配置表
  THEMES.md         主题清单与「如何加第 5 套」
  garden-world.js   屋后菜园场景
  waterpark-world.js 水上乐园场景（甲板 / 泳池 / 螺旋滑道 / U 型槽扫掠）
  waterpark-client.js 水上乐园交互与桌宠演出状态机
  waterpark-camera.js 水上乐园取景
  actor3d.js        程序化 3D 角色（默认 3D 模式）
  model-actor.js    可选自定义 GLB 播放器（默认不加载）
public/console.html 控制台页面
plugins/            DSH 插件：qq-agent-presets / qq-mode-console
dsh/                qq-chat / qq-chat-v2 preset 源
roles/              示例角色卡（example.md）
scripts/            安装、预览、截图、测试
assets/             你自己的贴纸/图片目录（默认不提交）
docs/               指南与 REMIX_CHANGES.md
```

运行后会自动生成 `config.json`、`state/`、`audio/`、`assets/` 等本地数据，均已被 `.gitignore` 排除。

## 文档与开发

| 我想…… | 入口 |
| --- | --- |
| 从零安装、配置、排查 | [SETUP.md](SETUP.md) |
| 让另一个 DSH 接手安装 | [AI_SETUP_PROMPT.md](AI_SETUP_PROMPT.md) |
| 生成自己的房子 | [HOUSE_GENERATION_PROMPT.md](HOUSE_GENERATION_PROMPT.md) |
| 上传到 GitHub | [GITHUB_UPLOAD.md](GITHUB_UPLOAD.md) |
| 查看隐私与素材边界 | [PRIVACY_AND_ASSETS.md](PRIVACY_AND_ASSETS.md) |
| 查看灵感来源 / 署名 | [INSPIRATION.md](INSPIRATION.md) |
| 查看第三方许可证 | [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) |
| 查看四层素材授权矩阵 | [ASSET_LICENSES.md](ASSET_LICENSES.md) |
| 查看主题色值 / 加主题 | [public/room/THEMES.md](public/room/THEMES.md) |
| 查看本分支逐文件改动 | [docs/REMIX_CHANGES.md](docs/REMIX_CHANGES.md) |
| 用 NapCat 接 QQ | [docs/guides/NAPCAT.md](docs/guides/NAPCAT.md) |

## 素材与许可

> [!WARNING]
> **整体仓库不是纯 MIT**，代码与素材授权不同，素材以更严格者为准；
> `public/room/assets/pet/` **不得被当作 MIT 代码授权**，`package.json` 的 `"license": "MIT"`
> 仅描述代码部分，不代表整体仓库的授权。本仓库整体仅供个人学习与**非商业**用途，
> 不得用于售卖、付费服务或商业宣传。完整四层矩阵见 [ASSET_LICENSES.md](ASSET_LICENSES.md)。

- **代码**：MIT，见 [LICENSE](LICENSE)；上游 MIT 两行原版权行与许可证全文原样保留，
  本仓库新增代码同样以 MIT 提供。本项目是**基于上游复制文件建立的独立二创仓库**（非 Fork、
  不继承上游 git 历史），**不是原创**。完整四层授权矩阵见 [ASSET_LICENSES.md](ASSET_LICENSES.md)。
- **2D 立绘 / 动画 / 点击音效**：来自 [dsh-pet](https://github.com/PC2005-cloud/dsh-pet)，
  **CC BY-NC-SA 4.0**（署名、非商业、相同方式共享），详见
  [CREDITS](public/room/assets/pet/CREDITS.md)。**不得改动素材文件本身的任何字节**；
  主题系统只在代码层改材质与灯光颜色。
- **Three.js**：MIT，见 [LICENSE-three](public/room/vendor/LICENSE-three.txt)；vendor 源码未改动。
- **3D 模型 / 第三方安装包**：**本仓库完全不含**。作者自制模型与第三方 AI 管家安装包已彻底移除，
  不提供文件、不提供下载链接、不作任何授权声明；详见
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 与 [models/README.md](public/room/assets/models/README.md)。
- **SnowLuma**：独立专有软件，不在本仓库内，也不随本仓库分发。
- **房间灵感来源**：见 [INSPIRATION.md](INSPIRATION.md)，只参考氛围，不复制原博主的视频/图片/文字；
  二次发布必须保留本文件，不得写成「原创」。

## 使用边界

- 仅在自己知情并获准的 QQ 会话中使用，遵守平台规则；非官方 QQ 后端可能导致账号受限。
- 聊天内容会经 DSH 发送给你配置的模型服务；电视截屏观后感会把截图发送给支持图片输入的模型。
- `config.json`、`state/`、`audio/`、`assets/`、私人模型不要提交到公开仓库。
- 本模板不实现 QQ 登录或 OneBot 协议，不安装/打包/启停 SnowLuma。
- 电视投屏是浏览器标签页镜像，声音仍在原标签页；投屏控制扩展不随本仓库分发。
- 本仓库**整体仅非商业**，NC 是长期约束：不得用于售卖、付费服务或商业宣传；
  不规划「替换素材以便商用」的路径。代码单独被取用时 MIT 仍含商用，与仓库整体定位不矛盾。
- **整体仓库不是纯 MIT**：`package.json` 的 `license: MIT` 与 GitHub 的 MIT 徽标仅描述代码，
  素材为 CC BY-NC-SA 4.0，两者授权不同，素材以更严格者为准。
- 本仓库不含作者的角色人格、私人记忆、语音与 3D 模型文件，所以**代码/界面接近 1:1，私人身份不 1:1**。
- 二次发布必须保留：[INSPIRATION.md](INSPIRATION.md)、[LICENSE](LICENSE)、
  [ASSET_LICENSES.md](ASSET_LICENSES.md)、[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)、[PRIVACY_AND_ASSETS.md](PRIVACY_AND_ASSETS.md)、
  `public/room/assets/pet/CREDITS.md` 与页面底部的 dsh-pet 署名。
