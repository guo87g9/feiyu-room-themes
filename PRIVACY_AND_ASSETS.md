# 隐私与素材边界

> 本仓库是基于 / 二次创作自 `sh2234113/feiyu-room-template`（MIT）**复制文件建立的独立二创项目**，
> **不是原创房间**；新建独立公开仓库、不建立 fork 关系、不继承上游 git 历史。
> **代码 MIT / 2D 素材 CC BY-NC-SA 4.0**，两者授权不同，整体**仅作非商业用途**。

## 这个模板刻意不包含

- 作者/你的角色卡、私人记忆、聊天记录；
- QQ 号、群号、B 站 UID、账号昵称；
- `config.json`、`state/`、`audio/`、`assets/` 私人素材；
- 日志、备份、浏览器 localStorage（主题选择、聊天记录等只留在本地浏览器）；
- API Key、Cookie、扫码令牌、SnowLuma token、DSH token；
- **任何 3D 模型文件**（作者自制模型与优化展示版已彻底移除，不留副本、不留下载链接）；
- **任何第三方安装包**（原 `tools/` 目录已整体删除）；
- 用户的照片、截图、二维码、语音。

## 这个模板包含

- 代码：桥接、MCP、房间、菜园、测试、安装脚本；
- `public/room/theme.js` / `public/room/THEMES.md`：4 套配色主题（纯代码层换色）；
- `public/room/assets/pet/` 的 2D 立绘/动画与 `public/room/assets/sound/` 的点击音效（dsh-pet）；
- `public/room/vendor/` 的 Three.js（MIT）；
- 程序化 3D 角色 `public/room/actor3d.js`、几何家具与 canvas 贴图；
- 示例角色 `roles/example.md`；
- 示例配置 `config.example.json`。

## 角色卡

模板的 `roles/example.md` 是**示例**，不是作者本人角色。
你可以复制它并改成自己的角色，但**不要把私人角色卡提交到公开仓库**：

```bash
cp roles/example.md roles/我的角色.md
```

`.gitignore` 只保留 `roles/README.md` 和 `roles/example.md`。

## 2D 立绘（CC BY-NC-SA 4.0）

`public/room/assets/pet/` 与 `public/room/assets/sound/` 来自 **dsh-pet**：

- 项目：<https://github.com/PC2005-cloud/dsh-pet>
- 形象：蓝毛小女仆
- 授权：**CC BY-NC-SA 4.0**（署名、非商业、相同方式共享）
- 代码 MIT，素材不是 MIT

公开仓库必须保留：

- `public/room/assets/pet/CREDITS.md`
- 页面底部的 dsh-pet 署名（已加深色底板保证可读）
- `THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`INSPIRATION.md`
- `LICENSE`（MIT 全文）

**不能**把立绘拿去做商业售卖、付费服务或商业宣传；如果改动素材，要按 CC BY-NC-SA 相同方式共享。
本轮 4 套主题**只在代码层改材质 / 灯光 / 贴图色值**，不触碰 `.webm` / `.png` / `.wav` 的任何字节。

## 3D 模型与第三方安装包

**本仓库不含任何 3D 模型文件，也不含任何第三方安装包。**

- 上游模板中作者自制的 3D 角色模型（优化展示版与原始工程文件）已**彻底移除**；
  版权归原作者，**本仓库未取得**二创 / 再分发 / 商用许可，因此不分发、不链接、不留副本。
- 原 `tools/` 目录下的第三方 AI 管家安装包已**整体删除**；其分发授权只授予原项目发布者，
  不随 MIT 代码转移给本仓库发布者。本仓库不提供文件、下载链接或授权声明。
- 3D 模式现在使用 `actor3d.js` 的**程序化 Q 版角色**（纯代码几何，零下载、不会加载失败空白）；
  家具、植被、天空同样是 Three.js 几何与 canvas 贴图。
- 如你**自己拥有合法授权**的模型，可放入 `public/room/assets/models/` 并用 `?model=` 显式配置；
  该目录默认被 `.gitignore` 忽略，授权与分发责任完全由放置者承担。
  详见 `public/room/assets/models/README.md`。

## 主题系统与素材零改动

4 套主题只写 `THREE.Material.color`、灯光颜色与 canvas 贴图色值；
**禁止**重绘、调色、裁剪、重新编码或把立绘烘焙进任何贴图。
主题选择只存浏览器 localStorage，不写入服务端、不进公开仓库、不需要账号。
详见 `public/room/THEMES.md`。

## 语音与贴纸

模板不包含任何人的声音或私人贴纸。
`audio/` 和 `assets/` 默认被 `.gitignore` 排除。

## 房间灵感来源

见 `INSPIRATION.md`。只做公开署名，不复制原作者的视频、图片或文字；
**二次发布必须保留该文件，不得写成「原创」**。
