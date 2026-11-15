# 第一次把这个模板上传到 GitHub

> 如果你要走“方式 B：生成自己的房子”，先看 `HOUSE_GENERATION_PROMPT.md`。  
> 本文只负责把这个模板仓库上传。



> 你不需要会 Git。下面有三种方式，选一种即可。

## 上传前先做一次隐私检查

确认项目目录里**没有**：

- `config.json`
- `state/`
- `audio/`
- `assets/` 里的私人图片
- `public/room/assets/models/*.glb`
- 任何 `*.log`、`*.bak`、`*.zip`
- `node_modules/`

模板自带的 `.gitignore` 已经排除了这些。仍建议手动看一眼。

---

# 方式 A：GitHub Desktop（最推荐给新手）

## 1. 创建 GitHub 账号

打开 <https://github.com>，注册并登录。

## 2. 安装 GitHub Desktop

<https://desktop.github.com/>  
安装后登录你的 GitHub 账号。

## 3. 新建仓库

GitHub Desktop → **File** → **New repository**

- Name：`feiyu-room-themes`（**项目名已定稿**；**不要用上游仓库名**，避免误以为要往上游提交）
- Description：`An independent visual remix (4 switchable themes) based on feiyu-room-template`
- Local path：选择一个空文件夹的**上一级**，例如 `D:\GitHub`
- 不要勾选 “Initialize this repository with a README”（你已经有 README）
- License：可以稍后加；模板已带 MIT

创建后，把本模板目录里的**所有内容**复制到这个新仓库目录里（不是把模板文件夹再套一层）。

## 4. 提交并发布

GitHub Desktop 会列出变更：

1. 左下角 Summary 填 `Initial room remix`
2. 点 **Commit to main**
3. 点顶部 **Publish repository**
4. 选择 Public（公开模板）或 Private（只给朋友）
5. 不要勾选 “Keep this code private” 如果想让别人复刻

## 5. 检查网页

打开你的 GitHub 仓库地址，确认：
- README 显示正常；
- 没有 `config.json` / `state/` / `audio/`；
- `public/room/assets/models` 里只有 README，没有 GLB。

---

# 方式 B：网页上传（文件不多时）

1. GitHub 右上角 **+** → **New repository**；
2. 填名字，选择 Public/Private；
3. **不要**勾选初始化 README（因为模板已有 README）；
4. 创建后点 **uploading an existing file**；
5. 把模板目录里的文件和文件夹拖进去；
6. Commit changes。

注意：

- 网页上传一次文件数量有限；本模板有几十个文件，建议分两三次上传；
- 不要拖整个外层文件夹，否则 GitHub 会多一层目录；
- 如果文件太多，改用 GitHub Desktop。

---

# 方式 C：命令行（会 Git 的人）

> ✅ **本仓库采用「新建独立公开仓库」**：目标 `https://github.com/guo87g9/feiyu-room-themes.git`。
> **不建立 fork 关系、不继承上游 git 历史**：代码是**从上游模板复制干净文件**后 `git init` 建仓的，
> 署名链靠 `README.md`、`LICENSE` 里原样保留的上游 MIT 版权行、`THIRD_PARTY_NOTICES.md` 与
> `ASSET_LICENSES.md` 保证。
>
> ⚠️ **千万不要把 remote 设成上游 `sh2234113/feiyu-room-template.git`**，那是别人的仓库；
> 也不要往上游提 PR / push —— 这不是给上游提贡献，往那里 push 一定失败。

```bash
cd feiyu-room-themes      # 或你解压出来的实际目录名（本机工作副本为「大肥鱼」）
git init
git add .
git commit -m "Initial room remix"
git branch -M main
git remote add origin https://github.com/guo87g9/feiyu-room-themes.git
git push -u origin main
```

先在 GitHub → **New repository** 建好名 `feiyu-room-themes` 的**空仓库**
（**不要**勾选初始化 README / License / .gitignore），再执行上面的命令。

**两种情形（只有 B 采用）：**

| 情形 | 是否采用 | 说明 |
| --- | --- | --- |
| **A. 继承上游 git 历史的建仓方式** | ❌ **不采用（用户已否决）** | 上游 git 历史里含作者自制 3D 模型的 `.glb` 二进制副本；建立 fork 关系会继承这些历史对象，等于「留副本」，直接抵消「移除模型」的意义。**不要建立 fork 关系、不要 clone 上游再改 remote、不要给上游提 PR。** |
| **B. 新建独立仓库**（**唯一采用**） | ✅ **采用** | GitHub → New repository → `feiyu-room-themes` → 空仓库；本地**复制干净文件 + `git init`**，历史从零开始，天然不含上游 `.glb` 对象。remote 固定为 `https://github.com/guo87g9/feiyu-room-themes.git`。 |

- 情形 B 必须在 README / `INSPIRATION.md` 里**明确写出上游来源、MIT 版权行与「不是原创房间」**，
  否则独立仓库容易被误读成原创；`LICENSE` 内上游两行原版权行一字不改，新增版权行只能追加。
- 如果 GitHub 要求 token，用 **Personal Access Token** 或 GitHub CLI 登录；不要把 token 写进仓库。

**历史核查（二次验证）**：本仓库**不建立 fork 关系、不继承上游历史**，因此不存在历史 GLB 残留，
**不需要** orphan 分支 / 精选 commit / `git filter-repo` 等历史清理。
建仓后建议仍执行一次 `git log --all -- '*.glb'` 作为二次验证，确认输出为空即可。

---

# 上传后要改的地方

1. 仓库名 / remote 固定用 `feiyu-room-themes`，无需再替换占位符；
2. 如果公开，保留 `LICENSE`、`ASSET_LICENSES.md`、`THIRD_PARTY_NOTICES.md`、
   `PRIVACY_AND_ASSETS.md`、`INSPIRATION.md`、`public/room/assets/pet/CREDITS.md` 与页面底部 dsh-pet 署名；
3. 本仓库是基于 / 二次创作自 `sh2234113/feiyu-room-template`（MIT）复制文件建立的独立二创项目，
   **必须**保留上游来源说明、MIT 版权行，以及 `INSPIRATION.md`（不得写成「原创」）；
4. 如果仓库是 Public，**不要**把 `config.json`、`state/`、语音、任何 3D 模型、
   任何第三方安装包和私人角色卡提交进去；
5. 确认 4 套主题切换、3D 程序化角色、`public/room/assets/models/` 只有 README 都正常；
6. 确认「代码 MIT / 素材 CC BY-NC-SA 4.0」双声明与「整体仅非商业」在 README 首屏可见。

---

# 公开仓库前最后检查

```bash
git status
git ls-files | grep -E 'config\.json|state/|audio/|\.log$|\.glb$'
```

有输出就停下来，把对应文件从 Git 跟踪中移除：

```bash
git rm --cached <文件>
```

如果密钥曾经提交过，**删除文件不够**；Git 历史仍然有。应当：
1. 立刻作废/轮换该密钥；
2. 用新仓库重新提交干净内容，或按 GitHub 文档清理历史。

---

# 需要 Release 吗

不需要。别人 `git clone` 或下载 ZIP 就能按 `SETUP.md` 安装。  
如果你以后想发“一键包”，可以再打 Release，但不要在里面放 `config.json` 和 `state/`。
