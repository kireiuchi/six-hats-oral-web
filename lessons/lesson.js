/* ============================================================
   lesson.js — 所有课程共用的显示程式
   ------------------------------------------------------------
   这个文件不含任何课程内容，读取每一课自己的 data.js
   （里面有 window.LESSON 这个物件）然后把「情境挑选 → 六顶
   思考帽 → 录音练习 → 挑战题」的页面画出来。

   老师不需要看懂这个文件，只需要编辑每一课的 data.js。

   固定不变、每一课都一样的内容集中放在这里：
   - BUDDY          「口试小伙伴」的头像／名字／打招呼的话
   - HAT_META       六顶帽子固定的名称、颜色、表情符号
   - GREEN_GUIDE    绿帽「三个方向」的固定引导句（教学法规定，
                     每一课都一样，所以不必在 data.js 里重复）
   - DEFAULT_*      一些可以被 data.js 覆盖、但通常不需要改的
                     默认文字

   语音功能使用浏览器内建的「朗读」(speechSynthesis)，不需要
   任何录音文件。录音练习功能使用浏览器内建的麦克风录音
   (MediaRecorder)，只能在 https 网址（例如 GitHub Pages 上线后
   的网址）使用，用 file:// 直接打开网页时无法录音，这是浏览器
   的安全限制，不是网站的问题。
   ============================================================ */

(function () {
  "use strict";

  var BUDDY = {
    avatar: "👧🏻",
    name: "口试小伙伴",
    greeting: "我们一起练习吧！"
  };

  var BRAND_TITLE = "⛽ 口试加油站";
  var BRAND_TAGLINE = "看一看 · 听一听 · 想一想 · 说一说";

  var DEFAULT_EVENT_NOTE = "先观察图片，再选一件最引起你注意的事。遇到不会读的文字，点有 🔊 的卡片听一听。选好后，“口试小伙伴”会陪你戴上思考帽。";
  var DEFAULT_RECORDING_NOTE = "录音只在这次网页练习中播放，不会自动上传。Safari 第一次使用时，请允许麦克风权限。";

  // 六顶帽子固定的名称、颜色 class、表情符号（每一课都一样）
  var HAT_META = {
    white:  { emoji: "⚪", label: "白帽", short: "事实" },
    red:    { emoji: "🔴", label: "红帽", short: "感受＋看法" },
    yellow: { emoji: "🟡", label: "黄帽", short: "好处" },
    black:  { emoji: "⚫", label: "黑帽", short: "坏处／后果" },
    green:  { emoji: "🟢", label: "绿帽", short: "建议" },
    blue:   { emoji: "🔵", label: "蓝帽", short: "总结＋希望" }
  };

  // 绿帽「三个方向」的固定引导句——这是教学法规定的框架，每一课
  // 都一样，所以写在这里，不必在每一课的 data.js 里重复。
  var GREEN_GUIDE = {
    intro: "🟢 想一想，你可以从这三个方向来说：",
    lines: [
      { text: "① 他／她应该 ________。", speak: "他或她应该怎么做？" },
      { text: "② 学校／父母可以 ________。", speak: "学校或父母可以怎么做？" },
      { text: "③ 如果我在场，我会去", options: ["阻止", "提醒", "帮助", "表扬"], suffix: "________。" }
    ],
    buddySpeech: "现在戴上绿帽。想一想：第一，他或她应该怎么做？第二，学校或父母可以怎么做？第三，如果我在场，我会去阻止、提醒、帮助，还是表扬呢？"
  };

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

  // ---------------- 语音朗读 ----------------
  function speak(text) {
    if (!text) return;
    if (!("speechSynthesis" in window)) {
      alert("这个浏览器暂时不支持语音朗读。");
      return;
    }
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    var voices = window.speechSynthesis.getVoices();
    var v = voices.find(function (x) { return /zh-SG/i.test(x.lang); }) ||
      voices.find(function (x) { return /zh-CN|zh-TW|zh-HK/i.test(x.lang); }) ||
      voices.find(function (x) { return /^zh/i.test(x.lang); });
    if (v) {
      u.voice = v;
      u.lang = v.lang;
    } else {
      u.lang = "zh-CN";
    }
    u.rate = 0.72;
    u.volume = 1;
    setTimeout(function () { window.speechSynthesis.speak(u); }, 70);
  }

  function speakButton(label, text, extraClass) {
    var btn = el("button", { type: "button", "class": "speak" + (extraClass ? " " + extraClass : ""), text: label });
    btn.addEventListener("click", function () { speak(text); });
    return btn;
  }

  // ---------------- 各区块组件 ----------------
  function buildHeader(lesson) {
    var brand = el("div", { "class": "brand" }, [
      el("h1", { text: lesson.brand_title || BRAND_TITLE }),
      el("p", { text: lesson.brand_tagline || BRAND_TAGLINE })
    ]);
    var buddy = lesson.buddy || {};
    var friend = el("div", { "class": "friend" }, [
      el("span", { "class": "avatar", "aria-hidden": "true", text: buddy.avatar || BUDDY.avatar }),
      el("span", { text: (buddy.name || BUDDY.name) + "：“" + (buddy.greeting || BUDDY.greeting) + "”" })
    ]);
    var backLink = el("a", { "class": "back-link", href: lesson.backLink || "../../index.html", text: "⬅ 返回首页" });
    var wrapper = document.createDocumentFragment();
    wrapper.appendChild(backLink);
    wrapper.appendChild(el("header", { "class": "top" }, [brand, friend]));
    return wrapper;
  }

  function buildLookCard(lesson) {
    var children = [
      el("span", { "class": "grade", text: lesson.grade_label || lesson.title || "" }),
      el("h2", { style: "margin-top:14px", text: "👀 第一步：看一看" })
    ];
    if (lesson.image_file) {
      children.push(el("img", { "class": "picture", src: lesson.image_file, alt: lesson.image_alt || lesson.title || "" }));
    }
    if (lesson.opening_question) {
      children.push(el("div", { "class": "question", text: lesson.opening_question }));
      children.push(speakButton("🔊 听题目", lesson.opening_question));
    }
    return el("section", { "class": "card" }, children);
  }

  function buildEventCard(lesson) {
    var grid = el("div", { "class": "event-grid" });
    (lesson.events || []).forEach(function (ev) {
      var btn = el("button", { type: "button", "class": "event", "data-event-key": ev.key }, [
        el("span", { "class": "ico", "aria-hidden": "true", text: ev.icon || "❓" }),
        document.createTextNode((ev.label || ev.key) + " 🔊")
      ]);
      btn.addEventListener("click", function () {
        speak(ev.label || "");
        chooseEvent(lesson, ev.key, btn);
      });
      grid.appendChild(btn);
    });
    return el("section", { "class": "card" }, [
      el("h2", { text: "👧🏻 第二步：你最想说哪一件事？" }),
      el("p", { "class": "note", text: lesson.event_prompt_note || DEFAULT_EVENT_NOTE }),
      grid
    ]);
  }

  function buildThinkingCard() {
    var flow = el("div", { "class": "flow", id: "flow" }, [
      el("span", { text: HAT_META.white.emoji + " " + HAT_META.white.short }),
      el("span", { "class": "arrow", text: "→" }),
      el("span", { text: HAT_META.red.emoji + " " + HAT_META.red.short }),
      el("span", { "class": "arrow", text: "→" }),
      el("span", { id: "middle-flow-label", text: HAT_META.black.emoji + " " + HAT_META.black.short }),
      el("span", { "class": "arrow", text: "→" }),
      el("span", { text: HAT_META.green.emoji + " " + HAT_META.green.short }),
      el("span", { "class": "arrow", text: "→" }),
      el("span", { text: HAT_META.blue.emoji + " " + HAT_META.blue.short })
    ]);

    function hatButton(key) {
      var meta = HAT_META[key];
      var btn = el("button", { type: "button", "class": "hat " + key, id: "hat-btn-" + key }, [
        document.createTextNode(meta.emoji + " " + meta.label),
        el("small", { text: meta.short })
      ]);
      btn.addEventListener("click", function () { openHat(key, btn); });
      return btn;
    }

    // 第三个位置（index 2）留给情境决定的黄帽／黑帽，先用黑帽
    // 占位，chooseEvent() 会依情境把它换成对应的帽子。
    var hatsGrid = el("div", { "class": "hats", id: "hats-grid" }, [
      hatButton("white"),
      hatButton("red"),
      hatButton("black"),
      hatButton("green"),
      hatButton("blue")
    ]);

    var greenGuide = el("div", { "class": "green-guide", id: "green-guide", hidden: "" });
    greenGuide.appendChild(el("strong", { text: GREEN_GUIDE.intro }));
    greenGuide.appendChild(el("br"));
    GREEN_GUIDE.lines.forEach(function (line, idx) {
      greenGuide.appendChild(document.createTextNode(line.text + " "));
      if (line.speak) {
        greenGuide.appendChild(speakButton("🔊", line.speak, "word"));
      }
      if (line.options) {
        line.options.forEach(function (opt) {
          greenGuide.appendChild(speakButton(opt + " 🔊", opt, "word"));
        });
      }
      if (line.suffix) {
        greenGuide.appendChild(document.createTextNode(" " + line.suffix));
      }
      if (idx < GREEN_GUIDE.lines.length - 1) greenGuide.appendChild(el("br"));
    });

    var panel = el("div", { "class": "panel", id: "panel", hidden: "" }, [
      el("h3", { id: "panel-title" }),
      el("p", { "class": "prompt", id: "panel-prompt" }),
      greenGuide
    ]);
    var buddySpeak = el("button", { type: "button", "class": "speak", id: "prompt-speak", text: "👧🏻🔊 听口试小伙伴" });
    panel.appendChild(buddySpeak);
    panel.appendChild(el("div", { "class": "words", id: "words" }));
    panel.appendChild(el("div", { "class": "sentence" }, [
      el("strong", { text: "💡 句型：" }),
      el("span", { id: "sentence-text" })
    ]));
    var exampleBox = el("div", { "class": "example hidden-text", id: "example-box" }, [
      el("strong", { text: "🌟 口试小伙伴范例" }),
      el("div", { "class": "answer", id: "answer-text" })
    ]);
    var exampleSpeak = el("button", { type: "button", "class": "speak", id: "example-speak", text: "🔊 听范例" });
    var toggleBtn = el("button", { type: "button", "class": "secondary", text: "👀 显示／隐藏文字" });
    toggleBtn.addEventListener("click", function () {
      exampleBox.classList.toggle("hidden-text");
    });
    exampleBox.appendChild(el("div", { "class": "actions" }, [exampleSpeak, toggleBtn]));
    panel.appendChild(exampleBox);

    return el("section", { "class": "card", id: "thinking-card", hidden: "" }, [
      el("h2", { text: "🎩 第三步：戴上思考帽" }),
      flow,
      hatsGrid,
      panel
    ]);
  }

  function buildRecordCard(lesson) {
    var recordBtn = el("button", { type: "button", "class": "record-btn", id: "record-btn", text: "🎙️ 开始录音" });
    recordBtn.addEventListener("click", toggleRecording);
    return el("section", { "class": "card record-box", id: "record-card", hidden: "" }, [
      el("h2", { text: "🗣️ 第四步：轮到你说！" }),
      el("p", { text: "先看图片和提示词练一练。准备好后，录下自己的回答。" }),
      recordBtn,
      el("div", { "class": "timer", id: "timer", text: "00:00" }),
      el("audio", { "class": "playback", id: "playback", controls: "", hidden: "" }),
      el("p", { "class": "note", text: lesson.recording_note || DEFAULT_RECORDING_NOTE })
    ]);
  }

  function buildChallengeCard(lesson) {
    var challenge = lesson.challenge || {};
    var resetBtn = el("button", { type: "button", "class": "secondary", text: "🔄 选择另一件事" });
    resetBtn.addEventListener("click", resetToEventChoice);
    var children = [el("h2", { text: "⭐ 挑战题" })];
    if (challenge.question) {
      children.push(el("div", { "class": "question", text: challenge.question }));
      children.push(speakButton("🔊 听挑战题", challenge.question));
    }
    if (challenge.buddy_quote) {
      children.push(el("p", null, [
        el("strong", { text: "👧🏻 " + (lesson.buddy && lesson.buddy.name ? lesson.buddy.name : BUDDY.name) + "：" }),
        document.createTextNode("“" + challenge.buddy_quote + "”")
      ]));
    }
    children.push(resetBtn);
    return el("section", { "class": "card challenge", id: "challenge-card", hidden: "" }, children);
  }

  // ---------------- 状态与互动逻辑 ----------------
  var CURRENT_LESSON = null;
  var CURRENT_EVENT_KEY = null;
  var mediaRecorder = null;
  var recordedChunks = [];
  var recordSeconds = 0;
  var recordTimerInt = null;

  function resolveEvent(lesson, key) {
    var ev = (lesson.events || []).find(function (e) { return e.key === key; });
    if (!ev) return null;
    if (ev.sameAs) {
      var base = (lesson.events || []).find(function (e) { return e.key === ev.sameAs; });
      if (base) return { key: key, label: ev.label, icon: ev.icon, positive: base.positive, hats: base.hats };
    }
    return ev;
  }

  function chooseEvent(lesson, key, btnEl) {
    CURRENT_LESSON = lesson;
    CURRENT_EVENT_KEY = key;

    document.querySelectorAll(".event").forEach(function (b) { b.classList.remove("active"); });
    if (btnEl) btnEl.classList.add("active");

    document.getElementById("thinking-card").hidden = false;
    document.getElementById("record-card").hidden = false;
    document.getElementById("challenge-card").hidden = false;

    var evData = resolveEvent(lesson, key);
    var positive = !!(evData && evData.positive);
    var middleKey = positive ? "yellow" : "black";
    var meta = HAT_META[middleKey];

    document.getElementById("middle-flow-label").textContent = meta.emoji + " " + meta.short;

    var hatsGrid = document.getElementById("hats-grid");
    var oldMiddle = hatsGrid.children[2];
    var newMiddle = el("button", { type: "button", "class": "hat " + middleKey, id: "hat-btn-" + middleKey }, [
      document.createTextNode(meta.emoji + " " + meta.label),
      el("small", { text: meta.short })
    ]);
    newMiddle.addEventListener("click", function () { openHat(middleKey, newMiddle); });
    hatsGrid.replaceChild(newMiddle, oldMiddle);

    document.getElementById("panel").hidden = true;
    document.querySelectorAll(".hat").forEach(function (h) { h.classList.remove("active"); });

    document.getElementById("thinking-card").scrollIntoView({ behavior: "smooth" });
  }

  function openHat(hatKey, btnEl) {
    document.querySelectorAll(".hat").forEach(function (h) { h.classList.remove("active"); });
    if (btnEl) btnEl.classList.add("active");

    var evData = resolveEvent(CURRENT_LESSON, CURRENT_EVENT_KEY);
    var hatData = evData && evData.hats ? evData.hats[hatKey] : null;
    if (!hatData) return;

    var greenGuide = document.getElementById("green-guide");
    greenGuide.hidden = hatKey !== "green";

    document.getElementById("panel").hidden = false;
    var meta = HAT_META[hatKey];
    document.getElementById("panel-title").textContent = meta.emoji + " " + meta.label + "｜" + meta.short;
    document.getElementById("panel-prompt").textContent = hatData.prompt || "";

    var buddySpeak = document.getElementById("prompt-speak");
    buddySpeak.onclick = function () {
      speak(hatKey === "green" ? GREEN_GUIDE.buddySpeech : (hatData.prompt || ""));
    };

    var wordsBox = document.getElementById("words");
    wordsBox.innerHTML = "";
    (hatData.words || []).forEach(function (word) {
      var wBtn = el("button", { type: "button", "class": "word", title: "点一下听读音", text: word + " 🔊" });
      wBtn.addEventListener("click", function () { speak(word); });
      wordsBox.appendChild(wBtn);
    });

    document.getElementById("sentence-text").textContent = hatData.sentence || "";
    document.getElementById("answer-text").textContent = hatData.answer || "";
    document.getElementById("example-speak").onclick = function () { speak(hatData.answer || ""); };
    document.getElementById("example-box").classList.add("hidden-text");
  }

  function resetToEventChoice() {
    document.querySelectorAll(".event").forEach(function (b) { b.classList.remove("active"); });
    document.getElementById("thinking-card").hidden = true;
    document.getElementById("record-card").hidden = true;
    document.querySelector(".event-grid").scrollIntoView({ behavior: "smooth" });
  }

  async function toggleRecording() {
    var btn = document.getElementById("record-btn");
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("这个浏览器暂时不能使用网页录音。请尝试较新的 Safari、Chrome 或 Edge。若网页是用 file:// 直接打开的，也可能无法使用麦克风，请改用网站的正式网址。");
      return;
    }
    try {
      var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size) recordedChunks.push(e.data);
      };
      mediaRecorder.onstop = function () {
        clearInterval(recordTimerInt);
        stream.getTracks().forEach(function (t) { t.stop(); });
        var blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || "audio/webm" });
        var audio = document.getElementById("playback");
        audio.src = URL.createObjectURL(blob);
        audio.hidden = false;
        btn.textContent = "🎙️ 再录一次";
        btn.classList.remove("stop");
      };
      mediaRecorder.start();
      recordSeconds = 0;
      updateTimer();
      recordTimerInt = setInterval(function () { recordSeconds++; updateTimer(); }, 1000);
      btn.textContent = "⏹️ 完成录音";
      btn.classList.add("stop");
    } catch (e) {
      alert("无法使用麦克风。请在浏览器设置中允许这个网页使用麦克风。");
    }
  }

  function updateTimer() {
    var m = String(Math.floor(recordSeconds / 60)).padStart(2, "0");
    var s = String(recordSeconds % 60).padStart(2, "0");
    document.getElementById("timer").textContent = m + ":" + s;
  }

  function render(lesson) {
    var root = document.getElementById("lesson-root");
    if (!root || !lesson) return;

    var wrap = el("div", { "class": "wrap" });
    var headerFrag = buildHeader(lesson);
    wrap.appendChild(headerFrag);
    wrap.appendChild(buildLookCard(lesson));
    wrap.appendChild(buildEventCard(lesson));
    wrap.appendChild(buildThinkingCard());
    wrap.appendChild(buildRecordCard(lesson));
    wrap.appendChild(buildChallengeCard(lesson));
    root.appendChild(wrap);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = function () { window.speechSynthesis.getVoices(); };
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    render(window.LESSON);
  });
})();
