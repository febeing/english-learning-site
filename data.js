// ===== 种子内容（用户可在界面中继续添加） =====

// 听力素材：url 可留空，使用本地文件上传；transcript 为 [start, end, 英文, 中文]
const SEED_MATERIALS = [
  {
    id: "demo-speech",
    title: "示范素材 · 英语短文（请替换为你自己的素材）",
    type: "audio",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp3",
    transcript: [
      [0, 4, "Learning a language is a journey, not a race.", "学一门语言是一段旅程，而非一场赛跑。"],
      [4, 8, "Listen carefully, and repeat what you hear.", "仔细听，然后复述你听到的内容。"],
      [8, 12, "Small daily habits lead to big results.", "每天的小习惯会带来巨大的成果。"],
      [12, 17, "Mistakes are simply steps toward fluency.", "犯错只是通向流利的阶梯。"]
    ]
  }
];

// 每日俚语
const SLANGS = [
  { word: "Break the ice", phon: "/breɪk ðə aɪs/", mean: "打破沉默、<b>破冰</b>，让气氛轻松起来。", en: "He told a joke to break the ice at the meeting.", zh: "他讲了个笑话，在会上打破了僵局。" },
  { word: "Hit the books", phon: "/hɪt ðə bʊks/", mean: "用功读书、<b>啃书本</b>。", en: "Final exams are next week, so I have to hit the books.", zh: "下周就期末考试了，我得埋头苦读了。" },
  { word: "Piece of cake", phon: "/piːs əv keɪk/", mean: "小菜一碟，<b>非常容易</b>的事。", en: "The test was a piece of cake.", zh: "那场考试简直是小菜一碟。" },
  { word: "Under the weather", phon: "/ˈʌndər ðə ˈweðər/", mean: "身体不适、<b>不舒服</b>。", en: "She is feeling under the weather today.", zh: "她今天身体不太舒服。" },
  { word: "Spill the beans", phon: "/spɪl ðə biːnz/", mean: "<b>泄露秘密</b>、说漏嘴。", en: "Come on, spill the beans about the surprise party!", zh: "快点，把惊喜派对的秘密说出来吧！" },
  { word: "Bite the bullet", phon: "/baɪt ðə ˈbʊlɪt/", mean: "咬紧牙关<b>硬扛</b>、勉强接受困难。", en: "I bit the bullet and paid the expensive bill.", zh: "我咬咬牙，付了那笔昂贵的账单。" },
  { word: "Call it a day", phon: "/kɔːl ɪt ə deɪ/", mean: "收工、<b>到此为止</b>。", en: "We're tired; let's call it a day.", zh: "我们累了，今天就到此为止吧。" },
  { word: "Couch potato", phon: "/kaʊtʃ pəˈteɪtoʊ/", mean: "<b>电视迷</b>、懒洋洋不想动的人。", en: "On weekends he becomes a total couch potato.", zh: "一到周末他就成了彻头彻尾的宅家电视迷。" },
  { word: "Hit the nail on the head", phon: "/hɪt ðə neɪl ɒn ðə hɛd/", mean: "<b>一针见血</b>、说得正中要害。", en: "You hit the nail on the head with that comment.", zh: "你那番评论真是一针见血。" },
  { word: "Once in a blue moon", phon: "/wʌns ɪn ə bluː muːn/", mean: "<b>千载难逢</b>、极其罕见。", en: "We eat out only once in a blue moon.", zh: "我们很少下馆子，简直是难得一次。" },
  { word: "Burn the midnight oil", phon: "/bɜːrn ðə ˈmɪdnaɪt ɔɪl/", mean: "<b>挑灯夜战</b>、熬夜用功。", en: "She burned the midnight oil to finish the report.", zh: "她熬夜把报告赶完了。" },
  { word: "The ball is in your court", phon: "/ðə bɔːl ɪz ɪn jɔːr kɔːrt/", mean: "<b>该你行动了</b>、主动权在你。", en: "I've done my part; the ball is in your court now.", zh: "我该做的都做了，现在看你的了。" }
];

// 新闻拆解
const NEWS = [
  {
    tag: "SCIENCE",
    title: "A Tiny Robot Learns to Walk on Its Own",
    en: "Researchers have built a small robot that teaches itself to walk. Instead of following pre-written code, it experiments with movement and keeps what works. The team says this could help machines adapt to unfamiliar places, from disaster zones to other planets.",
    zh: "研究人员造出了一台会自己学会走路的小型机器人。它不依赖预先写好的程序，而是通过不断尝试动作、保留奏效的部分来学习。团队表示，这能帮助机器适应陌生环境——从灾区到其他星球皆可。",
    vocab: [
      { w: "adapt", m: "适应" }, { w: "unfamiliar", m: "陌生的" },
      { w: "disaster zone", m: "灾区" }, { w: "pre-written", m: "预先写好的" }
    ],
    grammar: [
      "Instead of + 动名词：表示“而不是做某事”，后接 V-ing。",
      "that teaches itself to walk 为定语从句，修饰 a small robot。",
      "could help (machines) adapt：help 后的宾语补足语用动词原形（help sb do）。"
    ]
  },
  {
    tag: "CULTURE",
    title: "Why Cities Are Planting More Trees",
    en: "More cities are adding trees to their streets. Studies show that green spaces lower stress and cool the air. Local governments hope that, over time, these changes will make urban life healthier for everyone.",
    zh: "越来越多城市在街道上种树。研究表明，绿地能缓解压力、降低气温。地方政府希望，随着时间推移，这些变化能让每个人的城市生活更健康。",
    vocab: [
      { w: "green spaces", m: "绿地" }, { w: "lower stress", m: "缓解压力" },
      { w: "urban", m: "城市的" }, { w: "over time", m: "随着时间推移" }
    ],
    grammar: [
      "More ... are + V-ing：现在进行时表正在发生的变化趋势。",
      "that green spaces lower stress：that 引导宾语从句，作 show 的宾语。",
      "hope that ... will make：hope 后接 that 从句，从句用一般将来时。"
    ]
  },
  {
    tag: "TECH",
    title: "Reading on Screens Changes How We Think",
    en: "A new report suggests that people skim more when they read on phones. Because text feels endless, readers often jump to the end. Experts argue that slow, deep reading still matters for learning.",
    zh: "一份新报告指出，人们在手机上阅读时更容易略读。因为文字似乎无穷无尽，读者常常直接跳到结尾。专家认为，缓慢而深入的阅读对学习依然重要。",
    vocab: [
      { w: "skim", m: "略读" }, { w: "endless", m: "无穷的" },
      { w: "deep reading", m: "深度阅读" }, { w: "argue", m: "主张、认为" }
    ],
    grammar: [
      "suggests that ... skim：suggest 后的 that 从句用一般现在时表陈述。",
      "Because + 句子：原因状语从句，解释略读的原因。",
      "still matters：still 强调“仍然”，matters = be important。"
    ]
  }
];

// 名人名言
const QUOTES = [
  { q: "The only way to do great work is to love what you do.", a: "Steve Jobs", e: "成就伟大工作的唯一途径，是热爱你所做的事。提醒我们：热爱是持续的源动力。" },
  { q: "Success is not final, failure is not fatal.", a: "Winston Churchill", e: "成功非终点，失败非末日。强调坚持与韧性比一时胜负更重要。" },
  { q: "The beautiful thing about learning is that no one can take it away from you.", a: "B. B. King", e: "学习的美妙在于，谁也无法把它从你身上夺走。知识一旦拥有，便属于自己。" },
  { q: "Well done is better than well said.", a: "Benjamin Franklin", e: "做得好胜过说得好。行动胜于空谈。" },
  { q: "It does not matter how slowly you go as long as you do not stop.", a: "Confucius", e: "只要不停下脚步，走得慢也无妨。重在持续，不在速度。" },
  { q: "Education is the most powerful weapon which you can use to change the world.", a: "Nelson Mandela", e: "教育是你能用来改变世界的最有力武器。凸显学习的力量。" },
  { q: "A journey of a thousand miles begins with a single step.", a: "Lao Tzu", e: "千里之行，始于足下。任何宏大目标都从当下的一步开始。" },
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt", e: "相信自己能做到，就已经成功了一半。自信是起点。" }
];
