# 六顶思考帽（华文口试）网站

小学华文口试自学网站，供三年级至六年级学生练习。使用 GitHub Pages 免费托管。

## 网站结构

```
six-hats-oral-web/
├── index.html          ← 首页（标题、六顶思考帽说明、四个年级）
├── lessons-data.js      ← 所有课程的清单（老师主要编辑这个文件）
├── images/
│   └── six-hats-explained.jpg   ← 首页的六顶思考帽说明图
├── lessons/
│   ├── coming-soon.html         ← "即将推出" 占位页面
│   └── （日后每一课一个 html 文件，例如 p3-1.html）
└── README.md            ← 本说明文件
```

## 老师如何添加新课程（不需要懂程式）

1. 打开 `lessons-data.js`。
2. 找到对应年级（`p3` / `p4` / `p5` / `p6`），在方括号 `[ ]` 里
   最后一个课程后面，新增一行，例如：

   ```js
   { title: "我的假期", icon: "🏖️", link: "lessons/p3-4.html" }
   ```

   记得在前一行的结尾加上逗号 `,`。

3. 把真正的课程内容做成一个新的 html 文件（可以复制
   `lessons/coming-soon.html` 作为模板），放进 `lessons` 文件夹，
   文件名要跟上面 `link` 写的一致，例如 `lessons/p3-4.html`。

4. 在 GitHub 网页上，把改好的 `lessons-data.js` 和新的 html 文件
   上传 / 提交（commit）。网站会在一两分钟内自动更新，
   不需要额外操作。

## 如何修改已有课程

* 改标题、图示（emoji）→ 直接在 `lessons-data.js` 里修改文字。
* 改课程内容 → 打开 `lessons` 文件夹里对应的 html 文件修改文字即可。

## 本地预览

不需要安装任何软件，直接用浏览器打开 `index.html` 即可预览整个网站。

## 部署到 GitHub Pages（首次设置，需要技术人员协助一次）

1. 把这个文件夹上传到一个 GitHub 仓库（repository）。
2. 到仓库的 **Settings → Pages**，Source 选择 `main` 分支、
   根目录 `/ (root)`，保存。
3. 几分钟后，GitHub 会提供一个网址，例如：
   `https://<用户名>.github.io/<仓库名>/`，
   把这个网址分享给学生即可。

之后老师只需要在 GitHub 网页上编辑 / 上传文件（第二步的操作），
网站就会自动更新，不需要重复设置。
