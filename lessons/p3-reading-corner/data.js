/* ============================================================
   data.js — 这一课的全部内容都在这里
   ------------------------------------------------------------
   老师如何修改这一课：
   - title / theme / description → 标题、主题、图片描述
   - events → 图片里发生的事情（列点显示，可以不填）
   - image_file → 图片文件名（放在同一个 assets 文件夹里）
   - hats → 六顶思考帽，每一顶都有：
       helping_phrases：帮助词语（text 是文字，audio_file 是语音
                         文件名，没有语音就填 null）
       model_answer：示范答案文字
       model_audio_file：示范答案语音文件名，没有就填 null
   - final_model_answer / final_audio_file → 完整示范答案和语音
   ============================================================ */

window.LESSON = {
  title: "阅读角落123",
  theme: "培养阅读的good习惯",
  description: "两名学生在课室的阅读角落里专心看书。",
  events: [
    "一个男同学和一个女同学在阅读角落专心看书",
    "书架上摆满了各种各样的书"
  ],
  image_file: "assets/picture.png",

  hats: [
    {
      hat: "white",
      helping_phrases: [
        { text: "有一天早上", audio_file: null },
        { text: "课室的阅读角落", audio_file: null },
        { text: "书架上摆满了书", audio_file: null },
        { text: "一个男同学和一个女同学", audio_file: null },
        { text: "专心看书", audio_file: null }
      ],
      model_answer: "有一天早上，在课室的阅读角落里，一个男同学和一个女同学正在专心看书。书架上摆满了各种各样的书。",
      model_audio_file: null
    },
    {
      hat: "red",
      helping_phrases: [
        { text: "看到这一幕", audio_file: null },
        { text: "感到开心", audio_file: null },
        { text: "做得对", audio_file: null },
        { text: "值得学习", audio_file: null }
      ],
      model_answer: "看到这一幕，我感到很开心。我认为他们做得对，值得我们学习。",
      model_audio_file: null
    },
    {
      hat: "yellow",
      helping_phrases: [
        { text: "学到新知识", audio_file: null },
        { text: "提高华文水平", audio_file: null },
        { text: "开阔眼界", audio_file: null },
        { text: "阅读的好处", audio_file: null }
      ],
      model_answer: "阅读可以让我们学到新知识，也可以提高我们的华文水平和开阔眼界。",
      model_audio_file: null
    },
    {
      hat: "black",
      helping_phrases: [
        { text: "只顾着玩", audio_file: null },
        { text: "浪费时间", audio_file: null },
        { text: "失去学习机会", audio_file: null }
      ],
      model_answer: "如果我们只顾着玩，就会浪费时间，也会失去学习新知识的机会。",
      model_audio_file: null
    },
    {
      hat: "green",
      helping_phrases: [
        { text: "向他们学习", audio_file: null },
        { text: "多到阅读角落", audio_file: null },
        { text: "分享故事", audio_file: null },
        { text: "爱护书本", audio_file: null }
      ],
      model_answer: "我们应该向他们学习，多到阅读角落看书，也可以和同学分享有趣的故事。",
      model_audio_file: null
    },
    {
      hat: "blue",
      helping_phrases: [
        { text: "总的来说", audio_file: null },
        { text: "阅读是好事", audio_file: null },
        { text: "多看书", audio_file: null },
        { text: "养成好习惯", audio_file: null }
      ],
      model_answer: "总的来说，阅读是一件好事。我们应该多看书，养成阅读的好习惯。",
      model_audio_file: null
    }
  ],

  final_model_answer: "有一天早上，在课室的阅读角落里，一个男同学和一个女同学正在专心看书。书架上摆满了各种各样的书。看到这一幕，我感到很开心，因为他们做得对。阅读可以让我们学到新知识，也可以提高我们的华文水平。如果我们只顾着玩，就会失去学习的机会。我们应该向他们学习，多到阅读角落看书，也可以和同学分享有趣的故事。总的来说，阅读是一件好事，我们应该养成阅读的好习惯。",
  final_audio_file: "assets/audio/final_model.mp3"
};
