# 第三方素材与依赖

> **双声明**：本仓库**代码 MIT**，但 `public/room/assets/pet/` 与 `public/room/assets/sound/`
> 的 2D 立绘 / 动画 / 点击音效是 **dsh-pet 的 CC BY-NC-SA 4.0 素材**。
> 两者授权不同，**整体仓库不是纯 MIT**，「`license: MIT`」仅描述代码、素材以更严格者为准。
> 本仓库是基于 / 二次创作自 `sh2234113/feiyu-room-template`（MIT）**复制文件建立的独立二创项目**，
> **不是原创房间**；新建独立公开仓库、不建立 fork 关系、不继承上游 git 历史。
> 四层授权矩阵（允许 / 禁止 / 必须保留）见 [`ASSET_LICENSES.md`](ASSET_LICENSES.md)。

## 代码

本项目代码：MIT，见 `LICENSE`。上游 MIT 版权行与许可证全文保留；
`public/room/vendor/three.module.js` 等 vendor 源码未改动。

## 2D 立绘 / 动画 / 点击音效

- 来源：**dsh-pet** <https://github.com/PC2005-cloud/dsh-pet>
- 内容：`public/room/assets/pet/*.webm`、`*.png`、`public/room/assets/sound/click-duck.wav`
- 授权：**CC BY-NC-SA 4.0**
- 约束：署名、**非商业**、**相同方式共享**
- 详细署名：`public/room/assets/pet/CREDITS.md`（必须保留）
- 页面底部 dsh-pet 署名必须保留且可读
- **本轮视觉换皮只在代码层改材质 / 灯光 / 贴图色值，绝不改动这些素材文件的任何字节**
  （避免触发「相同方式共享」传染）

公开仓库必须保留：

- `public/room/assets/pet/CREDITS.md`
- 页面底部的 dsh-pet 署名
- `THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`INSPIRATION.md`
- `LICENSE`（MIT 全文）

## 已彻底移除、不在本仓库内的资产

以下内容**曾**出现在上游模板中，本二创分支已**物理删除**，**不分发、不提供文件、不提供下载链接、
不作任何授权声明**。不得写成 MIT、CC 或公共领域，也不得保留任何形式的副本
（工作副本、git 历史对象、LFS、Release 附件、压缩包、CDN、镜像、备份）。

- **作者自制 3D 角色模型**：包括根目录的一份 `.glb` 源模型，以及
  `public/room/assets/models/` 下的优化展示版与原始工程文件（均为 `.glb`）。版权归原作者，
  仅随**原模板**用于个人非商业展示；二创、再分发、商用均需原作者书面许可，
  **本仓库未取得该许可**，不分发、不链接、不留副本。
- **第三方安装包**：原 `tools/` 目录下的第三方 AI 管家 Windows / macOS 安装程序、
  以及该目录内的说明文件与校验和文件。该软件的分发授权只授予**原项目发布者**，具人身属性，
  **不随 MIT 代码转移给本仓库发布者**；本仓库不是被授权主体。如需请自行通过官方渠道获取。

当前房间视觉全部由 **Three.js 程序化几何与材质**实现：
3D 角色是 `public/room/actor3d.js` 的纯代码 ChibiActor，家具、植被、天空均为几何与 canvas 贴图，
**不含任何 3D 模型文件**。可选自定义模型机制见 `public/room/assets/models/README.md`，
授权与分发责任完全由放置者自行承担。

## Three.js

- `public/room/vendor/three.module.js`、`GLTFLoader.js`、`BufferGeometryUtils.js`
- 授权：MIT
- 许可证文本：`public/room/vendor/LICENSE-three.txt`
- 主题系统未修改 vendor 源码，未引入任何 CDN / 外部图片 / 新 3D 资产

## 运行依赖

见 `package.json`：

- `@deepseek-ai/dsh-host-apiproxy`
- `@deepseek-ai/schemastery`
- `@modelcontextprotocol/sdk`
- `@snowluma/mcp`
- `@snowluma/sdk`
- `js-yaml`
- `zod`

各自遵循其上游许可证。`@snowluma/*` 是第三方 SDK，本仓库不重新授权它。

## SnowLuma

SnowLuma 是独立软件，**不在本仓库内，也不随本仓库分发**。
使用前请自行确认其许可证和 QQ 平台规则。

## 房间灵感来源

见 `INSPIRATION.md`。只做公开署名，不复制原作者的视频、图片或文字；
**二次发布必须保留该文件，不得写成「原创」**。

## 未包含

- 作者角色卡、语音、照片、聊天记录；
- 任何 API Key、Cookie、token；
- 任何 3D 模型文件、第三方安装包、私人素材；
- `config.json`、`state/`、`audio/` 等运行时私有数据。

## 使用边界

本仓库**整体仅作非商业用途**。若将来需要商用，唯一路径是替换全部 CC BY-NC-SA 素材
为自有 / 可商用授权素材，并自行取得所需 3D 资产的授权。
