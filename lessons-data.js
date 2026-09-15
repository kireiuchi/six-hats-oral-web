/* ============================================================
   课程数据 lessons-data.js
   ------------------------------------------------------------
   老师如何添加新课程 (How the teacher adds a new lesson):

   1. 在下面对应年级 (p3 / p4 / p5 / p6) 的方括号 [ ] 里，
      复制一行 { title: "...", icon: "...", link: "..." }，
      贴在最后一个课程后面，记得加上逗号 "," 。

   2. title  → 课程标题（会显示在卡片上）
   3. icon   → 一个表情符号，作为课程小图。如果想用真正的图片
                （例如课程里的插图），把 icon 这一行换成
                thumb: "lessons/你的课程文件夹/assets/thumbnail.jpg"
                图片会自动裁成圆形小图，建议先把图片裁成正方形、
                改小尺寸（约 200x200 像素）再放进去，网站加载会更快。
   4. link   → 该课程网页的文件路径，例如 "lessons/p3-4/index.html"
                请先把新的课程文件夹放进 lessons 文件夹里

   完成后保存文件，GitHub Pages 网站会在几分钟内自动更新。

   注：网站目前只显示三年级和四年级（2026-09-15 起）。以后如果要
   恢复五、六年级，除了在这里加回 p5 / p6 的课程数组，还要在
   index.html 的「选择你的年级」部分加回对应的 <details> 区块
   （可以参考 git 记录里之前的版本）。
   ============================================================ */

window.LESSONS = {
  p3: [
    { title: "阅读角落", thumb: "lessons/p3-reading-corner/assets/thumbnail.jpg", link: "lessons/p3-reading-corner/index.html" },
    { title: "我的学校", icon: "🏫", link: "lessons/coming-soon.html" },
    { title: "我的家人", icon: "👨‍👩‍👧‍👦", link: "lessons/coming-soon.html" },
    { title: "我的宠物", icon: "🐶", link: "lessons/coming-soon.html" }
  ],
  p4: [
    { title: "春节习俗", icon: "🧧", link: "lessons/coming-soon.html" },
    { title: "我的爱好", icon: "🎨", link: "lessons/coming-soon.html" },
    { title: "拜访亲戚", icon: "🏠", link: "lessons/coming-soon.html" }
  ]
};
