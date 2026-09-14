/* ============================================================
   lesson.js — 所有课程共用的显示程式
   ------------------------------------------------------------
   这个文件不含任何课程内容，读取每一课自己的 data.js
   （里面有 window.LESSON 这个物件）然后把六顶思考帽的
   内容画出来。老师不需要看懂这个文件，只需要编辑 data.js。
   ============================================================ */

(function () {
  "use strict";

  // 六顶思考帽的固定问题 / 提示语（每一课都一样，不放进 data.js）
  var HAT_META = {
    white:  { label: "白", fill: "#ffffff", text: "#243447", question: "我看到了什么？",   prompt: "什么时候？在哪里？谁？做什么？" },
    red:    { label: "红", fill: "#e05252", text: "#ffffff", question: "我有什么感受？",   prompt: "看到这一幕，我有什么感受？" },
    yellow: { label: "黄", fill: "#f4c542", text: "#473600", question: "有什么好处？",     prompt: "这件事有什么好处？" },
    black:  { label: "黑", fill: "#333333", text: "#ffffff", question: "有什么问题？",     prompt: "这样做可能有什么问题或后果？" },
    green:  { label: "绿", fill: "#45a66b", text: "#ffffff", question: "我有什么建议？",   prompt: "如果我是他，我会怎么做？" },
    blue:   { label: "蓝", fill: "#4388d6", text: "#ffffff", question: "我学到了什么？",   prompt: "总的来说，我学到了什么？" }
  };

  var SVG_NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "text") {
          node.textContent = attrs[key];
        } else if (key === "html") {
          node.innerHTML = attrs[key];
        } else {
          node.setAttribute(key, attrs[key]);
        }
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function svgEl(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  // 画一顶思考帽的小图示（帽子形状固定，只有颜色和文字不同）
  function hatGraphic(hatKey, meta) {
    var titleId = "hat-title-" + hatKey;
    var svg = svgEl("svg", {
      "class": "hat-graphic",
      viewBox: "0 0 160 100",
      role: "img",
      "aria-labelledby": titleId,
      focusable: "false"
    });
    var title = svgEl("title", { id: titleId });
    title.textContent = meta.label + "帽：" + meta.question;
    svg.appendChild(title);

    svg.appendChild(svgEl("path", {
      d: "M48 64 L54 25 Q55 16 65 16 H95 Q105 16 106 25 L112 64 Z",
      fill: meta.fill, stroke: "#243447", "stroke-width": "4", "stroke-linejoin": "round"
    }));
    svg.appendChild(svgEl("path", {
      d: "M20 62 Q80 52 140 62 L136 78 Q80 92 24 78 Z",
      fill: meta.fill, stroke: "#243447", "stroke-width": "4", "stroke-linejoin": "round"
    }));
    svg.appendChild(svgEl("path", {
      d: "M47 53 H113 L112 65 H48 Z",
      fill: "#ffffff", opacity: "0.28"
    }));
    var text = svgEl("text", {
      x: "80", y: "47", fill: meta.text,
      "font-family": "Microsoft YaHei, PingFang SC, sans-serif",
      "font-size": "24", "font-weight": "700", "text-anchor": "middle"
    });
    text.textContent = meta.label;
    svg.appendChild(text);

    return svg;
  }

  function phraseItem(phrase) {
    var children = [el("span", { text: phrase.text })];
    if (phrase.audio_file) {
      var audio = el("audio", { controls: "", preload: "none" });
      audio.appendChild(el("source", { src: phrase.audio_file }));
      audio.appendChild(document.createTextNode("你的浏览器无法播放这段语音。"));
      children.push(audio);
    }
    return el("li", { "class": "phrase-item" }, children);
  }

  function revealButton(targetId) {
    return el("button", {
      type: "button",
      "class": "reveal-button",
      "data-reveal-target": targetId,
      "data-show-label": "查看示范答案",
      "data-hide-label": "收起示范答案",
      "aria-controls": targetId,
      "aria-expanded": "false",
      text: "查看示范答案"
    });
  }

  function modelAnswerBlock(id, answerText, audioFile) {
    var children = [
      el("h3", { text: "示范答案" }),
      el("p", { text: answerText })
    ];
    if (audioFile) {
      var audio = el("audio", { controls: "", preload: "none" });
      audio.appendChild(el("source", { src: audioFile }));
      audio.appendChild(document.createTextNode("你的浏览器无法播放这段语音。"));
      children.push(audio);
    } else {
      children.push(el("p", { "class": "audio-unavailable", text: "语音将在稍后加入。" }));
    }
    return el("div", { id: id, "class": "model-answer", hidden: "" }, children);
  }

  function hatSection(hatData) {
    var meta = HAT_META[hatData.hat];
    if (!meta) return null;
    var answerId = "answer-" + hatData.hat;

    var visualHeader = el("span", { "class": "hat-visual-header" }, [
      hatGraphic(hatData.hat, meta),
      el("span", { "class": "hat-short-question", text: meta.question })
    ]);

    var summary = el("summary", { "aria-label": meta.label + "帽：" + meta.question }, [visualHeader]);

    var phrasesList = el("ul", { "class": "phrases" },
      (hatData.helping_phrases || []).map(phraseItem));

    var content = el("div", { "class": "hat-content" }, [
      el("p", { "class": "prompt", text: meta.prompt }),
      el("h3", { text: "帮助词语" }),
      phrasesList,
      el("p", { "class": "practice", text: "请先自己说一说，再查看示范答案。" }),
      revealButton(answerId),
      modelAnswerBlock(answerId, hatData.model_answer || "", hatData.model_audio_file)
    ]);

    return el("details", { "class": "hat hat-" + hatData.hat }, [summary, content]);
  }

  function render(lesson) {
    var main = document.getElementById("lesson-root");
    if (!main || !lesson) return;

    var header = el("header", null, [
      el("a", { "class": "back-link", href: lesson.backLink || "../../index.html", text: "⬅ 返回首页" }),
      el("p", { "class": "eyebrow", text: lesson.eyebrow || "看图说话 · 六顶思考帽" }),
      el("h1", { text: lesson.title || "" }),
      el("p", { "class": "theme", text: lesson.theme || "" })
    ]);
    main.appendChild(header);

    if (lesson.image_file) {
      main.appendChild(el("img", {
        "class": "lesson-picture",
        src: lesson.image_file,
        alt: lesson.description || lesson.title || ""
      }));
    }

    var instructionsChildren = [
      el("h2", { text: "观察图片" }),
      el("p", { text: lesson.description || "" })
    ];
    if (lesson.events && lesson.events.length) {
      instructionsChildren.push(el("ul", null, lesson.events.map(function (ev) {
        return el("li", { text: ev });
      })));
    }
    instructionsChildren.push(el("p", { text: "请仔细观察图片，然后用六顶思考帽说一说。" }));
    main.appendChild(el("section", { "class": "instructions" }, instructionsChildren));

    var hatKeys = (lesson.hats || []).map(function (h) { return h.hat; });
    if (hatKeys.indexOf("yellow") !== -1 && hatKeys.indexOf("black") !== -1) {
      main.appendChild(el("p", { "class": "choice-notice", text: "口试时，黑帽和黄帽任选一个来说。" }));
    }

    var hatsSection = el("section", { "class": "hats" },
      (lesson.hats || []).map(hatSection));
    main.appendChild(hatsSection);

    var finalId = "complete-model-answer";
    main.appendChild(el("section", { "class": "final-answer" }, [
      el("h2", { text: "完整示范" }),
      el("p", { text: "请先尝试完整地说一说。" }),
      revealButton(finalId),
      modelAnswerBlock(finalId, lesson.final_model_answer || "", lesson.final_audio_file)
    ]));

    wireInteractions();
  }

  function wireInteractions() {
    document.querySelectorAll("[data-reveal-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        var targetId = button.dataset.revealTarget;
        var answer = document.getElementById(targetId);
        var isOpening = answer.hidden;

        answer.hidden = !isOpening;
        button.setAttribute("aria-expanded", String(isOpening));
        button.textContent = isOpening ? button.dataset.hideLabel : button.dataset.showLabel;
      });
    });

    document.querySelectorAll("audio").forEach(function (player) {
      player.addEventListener("play", function () {
        document.querySelectorAll("audio").forEach(function (otherPlayer) {
          if (otherPlayer !== player) otherPlayer.pause();
        });
      });
    });

    document.querySelectorAll("details.hat").forEach(function (details) {
      details.addEventListener("toggle", function () {
        if (!details.open) {
          details.querySelectorAll("audio").forEach(function (player) {
            player.pause();
          });
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    render(window.LESSON);
  });
})();
