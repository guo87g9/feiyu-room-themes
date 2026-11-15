# 3D 模型目录（本仓库不含任何模型文件）

> **本仓库不附带、不分发、不链接任何 3D 模型。**
> 上游模板中作者自制的 3D 角色模型（含优化展示版与原始工程文件）已从本二创分支**彻底移除**，
> 第三方安装包目录也已整体移除。房间里的家具、植被、天空和 3D 角色**全部由 Three.js 程序化几何与材质生成**，
> 不依赖任何 `.glb` / `.gltf` / 贴图下载。

## 默认行为

- 页面默认使用 **2D 立绘**（dsh-pet，CC BY-NC-SA 4.0）。
- 切到 **3D** 时，`app.js` 的 `ensure3d()` 直接加载 `actor3d.js` 里的 `ChibiActor`：
  纯代码构造的 Q 版角色，零网络请求、零外部文件，不会出现「加载失败后空白」。
- `model-actor.js` 是保留的 MIT 代码，但**默认不会被加载**：它需要一个显式配置的自定义 URL，
  未提供时 `ModelActor.load()` 直接返回 `false`，页面退回程序化角色。

## 可选：放入你自己的模型

只有当你**自己拥有或已取得合法授权**时，才把 GLB 放进这个目录。本仓库的 `.gitignore`
会忽略本目录下除 `README.md` 以外的所有内容，避免把模型误提交进公开仓库。

启用方式（二选一）：

```text
URL 参数：      /room/?char=3d&model=./assets/models/your-model.glb
浏览器控制台：  localStorage.setItem('home-custom-model-url', './assets/models/your-model.glb')
```

清除配置：`localStorage.removeItem('home-custom-model-url')`，或去掉 `?model=` 参数。

模型约定（沿用 `model-actor.js` 的静态网格播放逻辑）：

- 单位：米；Y 轴向上；原点在脚底；正面朝 `+Z`；
- 运行时会被缩放到约 **1.42 m** 高；
- 静态网格、无骨骼、无动画即可；站立 / 坐 / 躺由根节点变换近似，走路由顶点着色器摆动下半身；
- 不要在这里放 `.glb` 之后又在文档里宣称「随包附带」。

## 授权与责任

- 本目录里若出现任何模型文件，**授权与分发责任完全由放置者自行承担**；
  本仓库的 MIT 许可**不覆盖**这些文件，也不代表作者或上游授予过任何再分发权。
- **不要**把上游作者自制的模型、未授权的第三方模型、或任何来源不明的模型放进公开仓库；
  不要把模型放进 Release 附件、压缩包、CDN 或镜像。
- `public/room/assets/pet/` 与 `public/room/assets/sound/` 是 **CC BY-NC-SA 4.0** 素材，
  与模型无关，且**禁止改动任何字节**（详见 `public/room/assets/pet/CREDITS.md`、
  `THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`）。
- 本仓库整体为**非商业**用途；2D 素材的「相同方式共享」条款不因本目录为空而失效。

## 相关文档

- 主题系统与换色范围：`public/room/THEMES.md`
- 素材与许可：`THIRD_PARTY_NOTICES.md`、`PRIVACY_AND_ASSETS.md`、`INSPIRATION.md`
- 逐文件改动清单：`docs/REMIX_CHANGES.md`
