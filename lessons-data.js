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
   ============================================================ */

window.LESSONS = {
  p3: [
    { title: "阅读角落123", thumb: "lessons/p3-reading-corner/assets/thumbnail.jpg", link: "lessons/p3-reading-corner/index.html" },
    { title: "我的学校", icon: "🏫", link: "lessons/coming-soon.html" },
    { title: "我的家人", icon: "👨‍👩‍👧‍👦", link: "lessons/coming-soon.html" },
    { title: "我的宠物", icon: "🐶", link: "lessons/coming-soon.html" }
  ],
  p4: [
    { title: "春节习俗", icon: "🧧", link: "lessons/coming-soon.html" },
    { title: "我的爱好", icon: "🎨", link: "lessons/coming-soon.html" },
    { title: "拜访亲戚", icon: "🏠", link: "lessons/coming-soon.html" }
  ],
  p5: [
    { title: "环保生活", icon: "🌱", link: "lessons/coming-soon.html" },
    { title: "社区活动", icon: "🤝", link: "lessons/coming-soon.html" },
    { title: "健康饮食", icon: "🥗", link: "lessons/coming-soon.html" }
  ],
  p6: [
    { title: "国庆庆典", icon: "🎉", link: "lessons/coming-soon.html" },
    { title: "科技与生活", icon: "💻", link: "lessons/coming-soon.html" },
    { title: "未来的梦想", icon: "🌟", link: "lessons/coming-soon.html" }
  ]
};
