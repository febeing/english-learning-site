// ===== 种子内容（用户可在界面中继续添加；听力示范片段可替换为自己的材料） =====

// 听力素材：url 可留空，使用本地文件上传；transcript 为 [start, end, 英文, 中文]
// 说明：以下示范片段使用 Google 官方示例 CDN（稳定可直链），字幕为「示范文本」，仅用于演示循环功能；
// 真实语音字幕请用「＋添加素材」上传你自己的文件并粘贴字幕，或待上线浏览器端 Whisper 自动转写。
const SEED_MATERIALS = [
  {
    id: "demo-1",
    title: "示范素材 · 片段一（请替换为你自己的听力材料）",
    type: "audio",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp3",
    transcript: [
      [0, 4, "Learning a language is a journey not a race", "学一门语言是一段旅程而非一场赛跑"],
      [4, 8, "Listen carefully and repeat what you hear", "仔细听并复述你听到的内容"],
      [8, 12, "Small daily habits lead to big results", "每天的小习惯会带来巨大的成果"],
      [12, 17, "Mistakes are simply steps toward fluency", "犯错只是通向流利的阶梯"]
    ]
  },
  {
    id: "demo-2",
    title: "示范素材 · 片段二（请替换为你自己的听力材料）",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    transcript: [
      [0, 4, "Reading expands your vocabulary every day", "阅读每天都在拓展你的词汇量"],
      [4, 8, "Try to guess meaning from the context", "试着从上下文猜测词义"],
      [8, 12, "A notebook helps you remember new words", "笔记本能帮你记住新单词"],
      [12, 16, "Review your notes before you sleep", "睡前复习你的笔记"]
    ]
  },
  {
    id: "demo-3",
    title: "示范素材 · 片段三（请替换为你自己的听力材料）",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    transcript: [
      [0, 4, "Speaking takes more courage than reading", "开口说比阅读更需要勇气"],
      [4, 8, "Find a partner and practice each week", "找个搭档每周练习"],
      [8, 12, "Do not fear making small mistakes", "不要害怕犯小错误"],
      [12, 16, "Confidence grows with every conversation", "自信会随着每次对话增长"]
    ]
  },
  {
    id: "demo-4",
    title: "示范素材 · 片段四（请替换为你自己的听力材料）",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    transcript: [
      [0, 4, "Write a short diary in English daily", "每天用英文写一篇短日记"],
      [4, 8, "Use the new words you have learned", "用上你学到的新词"],
      [8, 12, "Keep your sentences clear and simple", "保持句子清晰简洁"],
      [12, 16, "Progress is invisible until it is sudden", "进步在爆发前往往不易察觉"]
    ]
  },
  {
    id: "demo-5",
    title: "示范素材 · 片段五（请替换为你自己的听力材料）",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    transcript: [
      [0, 4, "Travel opens your eyes to new cultures", "旅行让你看见不同的文化"],
      [4, 8, "Learn a few phrases before you go", "出发前学几句当地用语"],
      [8, 12, "Locals appreciate your small effort", "当地人会感激你小小的努力"],
      [12, 16, "Language is a bridge between people", "语言是人与人之间的一座桥"]
    ]
  }
];

// 每日俚语（real, common idioms）
const SLANGS = [
  { word: "Break the ice", phon: "/breɪk ðə aɪs/", mean: "打破沉默、<b>破冰</b>，让气氛轻松起来。", en: "He told a joke to break the ice at the meeting.", zh: "他讲了个笑话在会上打破了僵局。" },
  { word: "Hit the books", phon: "/hɪt ðə bʊks/", mean: "用功读书、<b>啃书本</b>。", en: "Final exams are next week so I have to hit the books.", zh: "下周就期末考试了我得埋头苦读了。" },
  { word: "Piece of cake", phon: "/piːs əv keɪk/", mean: "小菜一碟，<b>非常容易</b>的事。", en: "The test was a piece of cake.", zh: "那场考试简直是小菜一碟。" },
  { word: "Under the weather", phon: "/ˈʌndər ðə ˈweðər/", mean: "身体不适、<b>不舒服</b>。", en: "She is feeling under the weather today.", zh: "她今天身体不太舒服。" },
  { word: "Spill the beans", phon: "/spɪl ðə biːnz/", mean: "<b>泄露秘密</b>、说漏嘴。", en: "Come on spill the beans about the surprise party!", zh: "快点把惊喜派对的秘密说出来吧！" },
  { word: "Bite the bullet", phon: "/baɪt ðə ˈbʊlɪt/", mean: "咬紧牙关<b>硬扛</b>、勉强接受困难。", en: "I bit the bullet and paid the expensive bill.", zh: "我咬咬牙付了那笔昂贵的账单。" },
  { word: "Call it a day", phon: "/kɔːl ɪt ə deɪ/", mean: "收工、<b>到此为止</b>。", en: "We are tired so let us call it a day.", zh: "我们累了今天就到此为止吧。" },
  { word: "Couch potato", phon: "/kaʊtʃ pəˈteɪtoʊ/", mean: "<b>电视迷</b>、懒洋洋不想动的人。", en: "On weekends he becomes a total couch potato.", zh: "一到周末他就成了彻头彻尾的宅家电视迷。" },
  { word: "Hit the nail on the head", phon: "/hɪt ðə neɪl ɒn ðə hɛd/", mean: "<b>一针见血</b>、说得正中要害。", en: "You hit the nail on the head with that comment.", zh: "你那番评论真是一针见血。" },
  { word: "Once in a blue moon", phon: "/wʌns ɪn ə bluː muːn/", mean: "<b>千载难逢</b>、极其罕见。", en: "We eat out only once in a blue moon.", zh: "我们很少下馆子简直是难得一次。" },
  { word: "Burn the midnight oil", phon: "/bɜːrn ðə ˈmɪdnaɪt ɔɪl/", mean: "<b>挑灯夜战</b>、熬夜用功。", en: "She burned the midnight oil to finish the report.", zh: "她熬夜把报告赶完了。" },
  { word: "The ball is in your court", phon: "/ðə bɔːl ɪz ɪn jɔːr kɔːrt/", mean: "<b>该你行动了</b>、主动权在你。", en: "I have done my part so the ball is in your court now.", zh: "我该做的都做了现在看你的了。" },
  { word: "The early bird catches the worm", phon: "/ðə ˈɜːrli bɜːrd kætʃɪz ðə wɜːrm/", mean: "<b>早起的鸟儿有虫吃</b>；先到先得。", en: "To get good seats arrive early the early bird catches the worm.", zh: "想坐好位置就早点来早起的鸟儿有虫吃。" },
  { word: "Speak of the devil", phon: "/spiːk əv ðə ˈdɛvəl/", mean: "<b>说曹操曹操到</b>。", en: "Speak of the devil here comes John now.", zh: "说曹操曹操到约翰这就来了。" },
  { word: "Kill two birds with one stone", phon: "/kɪl tuː bɜːrdz wɪð wʌn stoʊn/", mean: "<b>一石二鸟</b>、一举两得。", en: "Cycling to work kills two birds with one stone.", zh: "骑车上班一举两得既锻炼又环保。" },
  { word: "Let the cat out of the bag", phon: "/lɛt ðə kæt aʊt əv ðə bæg/", mean: "<b>说漏嘴</b>、泄露秘密。", en: "She let the cat out of the bag about the gift.", zh: "她把礼物的事说漏嘴了。" },
  { word: "Cost an arm and a leg", phon: "/kɔːst ən ɑːrm ənd ə lɛg/", mean: "<b>贵得离谱</b>、花费巨大。", en: "The concert tickets cost an arm and a leg.", zh: "那场演唱会的票贵得离谱。" },
  { word: "Cut corners", phon: "/kʌt ˈkɔːrnərz/", mean: "<b>偷工减料</b>、走捷径（常含贬义）。", en: "They cut corners to finish the project faster.", zh: "他们为赶工偷工减料。" },
  { word: "Get out of hand", phon: "/ɡɛt aʊt əv hænd/", mean: "<b>失控</b>、难以收拾。", en: "The argument got out of hand quickly.", zh: "那场争执很快失控了。" },
  { word: "Hang in there", phon: "/hæŋ ɪn ðɛr/", mean: "<b>坚持住</b>、挺住。", en: "The exam is hard but hang in there.", zh: "考试很难但请坚持住。" },
  { word: "Jump on the bandwagon", phon: "/dʒʌmp ɒn ðə ˈbændwæɡən/", mean: "<b>跟风</b>、随大流。", en: "Everyone jumped on the bandwagon of that trend.", zh: "大家都跟风追那个潮流。" },
  { word: "Pull yourself together", phon: "/pʊl jɔːrˈsɛlf təˈɡɛðər/", mean: "<b>振作起来</b>、冷静下来。", en: "Pull yourself together and finish the speech.", zh: "振作起来把演讲完成。" },
  { word: "Think outside the box", phon: "/θɪŋk aʊtˈsaɪd ðə bɒks/", mean: "<b>跳出框架</b>、创新思维。", en: "We need to think outside the box for this problem.", zh: "这道题我们需要跳出框架来思考。" },
  { word: "When pigs fly", phon: "/wɛn pɪɡz flaɪ/", mean: "<b>绝不可能</b>、太阳从西边出来。", en: "He will apologize when pigs fly.", zh: "他要道歉简直是太阳从西边出来。" }
];

// 新闻拆解（英文为学习用示例文本，中文为准确翻译；可替换为真实新闻）
const NEWS = [
  {
    tag: "SCIENCE",
    title: "A Tiny Robot Learns to Walk on Its Own",
    en: "Researchers have built a small robot that teaches itself to walk. Instead of following pre-written code it experiments with movement and keeps what works. The team says this could help machines adapt to unfamiliar places from disaster zones to other planets.",
    zh: "研究人员造出了一台会自己学会走路的小型机器人。它不依赖预先写好的程序，而是通过不断尝试动作、保留奏效的部分来学习。团队表示这能帮助机器适应陌生环境——从灾区到其他星球皆可。",
    vocab: [
      { w: "adapt", m: "适应" }, { w: "unfamiliar", m: "陌生的" },
      { w: "disaster zone", m: "灾区" }, { w: "pre-written", m: "预先写好的" }
    ],
    grammar: [
      "Instead of + 动名词：表示「而不是做某事」后接 V-ing。",
      "that teaches itself to walk 为定语从句修饰 a small robot。",
      "could help machines adapt：help 后的宾语补足语用动词原形即 help sb do。"
    ]
  },
  {
    tag: "CULTURE",
    title: "Why Cities Are Planting More Trees",
    en: "More cities are adding trees to their streets. Studies show that green spaces lower stress and cool the air. Local governments hope that over time these changes will make urban life healthier for everyone.",
    zh: "越来越多城市在街道上种树。研究表明绿地能缓解压力、降低气温。地方政府希望随着时间推移这些变化能让每个人的城市生活更健康。",
    vocab: [
      { w: "green spaces", m: "绿地" }, { w: "lower stress", m: "缓解压力" },
      { w: "urban", m: "城市的" }, { w: "over time", m: "随着时间推移" }
    ],
    grammar: [
      "More ... are + V-ing：现在进行时表正在发生的变化趋势。",
      "that green spaces lower stress：that 引导宾语从句作 show 的宾语。",
      "hope that ... will make：hope 后接 that 从句从句用一般将来时。"
    ]
  },
  {
    tag: "TECH",
    title: "Reading on Screens Changes How We Think",
    en: "A new report suggests that people skim more when they read on phones. Because text feels endless readers often jump to the end. Experts argue that slow deep reading still matters for learning.",
    zh: "一份新报告指出人们在手机上阅读时更容易略读。因为文字似乎无穷无尽读者常常直接跳到结尾。专家认为缓慢而深入的阅读对学习依然重要。",
    vocab: [
      { w: "skim", m: "略读" }, { w: "endless", m: "无穷的" },
      { w: "deep reading", m: "深度阅读" }, { w: "argue", m: "主张、认为" }
    ],
    grammar: [
      "suggests that ... skim：suggest 后的 that 从句用一般现在时表陈述。",
      "Because + 句子：原因状语从句解释略读的原因。",
      "still matters：still 强调「仍然」matters 等于 be important。"
    ]
  },
  {
    tag: "ENVIRONMENT",
    title: "Cities Turn Rooftops into Gardens",
    en: "Some cities are turning empty rooftops into small gardens. Plants on roofs can cool buildings and clean the air. Supporters say green roofs also give people a quiet place to rest in busy cities.",
    zh: "一些城市正把空置的屋顶改造成小花园。屋顶上的植物能给建筑降温并净化空气。支持者说绿色屋顶还能在繁忙都市里给人一处安静的休憩之地。",
    vocab: [
      { w: "rooftop", m: "屋顶" }, { w: "green roof", m: "绿色屋顶" },
      { w: "clean the air", m: "净化空气" }, { w: "supporter", m: "支持者" }
    ],
    grammar: [
      "are turning ... into ...：现在进行时表持续进行的改造。",
      "can cool buildings and clean the air：情态动词 can 后接动词原形并列。",
      "give people a place to rest：to rest 为不定式作后置定语修饰 place。"
    ]
  },
  {
    tag: "HEALTH",
    title: "A Short Daily Walk Helps the Heart",
    en: "Doctors say a ten-minute walk each day can improve heart health. Walking is easy for most people and needs no special equipment. Small amounts of regular exercise are better than none at all.",
    zh: "医生说每天步行十分钟就能改善心脏健康。对大多数人而言步行很容易且无需特殊器材。少量规律运动总好过完全不运动。",
    vocab: [
      { w: "improve", m: "改善" }, { w: "equipment", m: "器材、设备" },
      { w: "regular", m: "规律的" }, { w: "none at all", m: "完全没有" }
    ],
    grammar: [
      "say (that) ... can improve：say 后接 that 宾语从句。",
      "needs no special equipment：need 作实义动词否定用 no + 名词。",
      "better than none at all：than 引导比较结构。"
    ]
  },
  {
    tag: "TECH",
    title: "Apps That Teach You to Sleep Better",
    en: "New phone apps promise to improve sleep. They track your bedtime and suggest small changes. Scientists warn that the results are mixed and good habits still matter most.",
    zh: "新的手机应用承诺改善睡眠。它们记录你的就寝时间并给出微小调整建议。科学家提醒效果参差良好习惯依然最关键。",
    vocab: [
      { w: "promise", m: "承诺" }, { w: "track", m: "追踪、记录" },
      { w: "mixed", m: "参差的、好坏不一的" }, { w: "matter most", m: "最关键" }
    ],
    grammar: [
      "promise to improve sleep：promise to do 承诺做某事。",
      "that the results are mixed：that 引导宾语从句。",
      "and good habits still matter most：matter 作系动词表「重要」。"
    ]
  },
  {
    tag: "SCIENCE",
    title: "Old Forests Store More Carbon Than We Thought",
    en: "A long study finds that older forests hold far more carbon than expected. Big old trees keep absorbing carbon for centuries. Protecting these forests may be one of the cheapest ways to slow climate change.",
    zh: "一项长期研究发现古老森林储存的碳远超预期。高大古树能持续吸收碳数百年。保护这些森林或许是最廉价的减缓气候变化的方式之一。",
    vocab: [
      { w: "carbon", m: "碳" }, { w: "absorb", m: "吸收" },
      { w: "century", m: "世纪" }, { w: "climate change", m: "气候变化" }
    ],
    grammar: [
      "finds that ... hold：find 后接 that 宾语从句。",
      "keep absorbing carbon：keep doing 持续做某事。",
      "one of the + 最高级 + 复数名词：最……的之一。"
    ]
  }
];

// 名人名言（real, with 中文释义）
const QUOTES = [
  { q: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", a: "《Pride and Prejudice》· Jane Austen", e: "《傲慢与偏见》开篇名句，以反讽笔调写尽婚恋与门第的世相。" },
  { q: "Happy families are all alike; every unhappy family is unhappy in its own way.", a: "《Anna Karenina》· Leo Tolstoy", e: "《安娜·卡列尼娜》题首，托尔斯泰以一语定调全书的悲剧母题。" },
  { q: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.", a: "《A Tale of Two Cities》· Charles Dickens", e: "《双城记》开篇，以矛盾修辞写尽时代的割裂与动荡。" },
  { q: "So we beat on, boats against the current, borne back ceaselessly into the past.", a: "《The Great Gatsby》· F. Scott Fitzgerald", e: "《了不起的盖茨比》结尾，喻示人与时间、与梦想的徒劳搏斗。" },
  { q: "All we have to decide is what to do with the time that is given us.", a: "《The Lord of the Rings》· J. R. R. Tolkien", e: "《魔戒》中甘道夫之语，强调在既定命运中主动抉择的重量。" },
  { q: "Not all those who wander are lost.", a: "《The Lord of the Rings》· J. R. R. Tolkien", e: "《魔戒》诗句，流浪未必迷失，暗喻探索自有其方向。" },
  { q: "It does not do to dwell on dreams and forget to live.", a: "《Harry Potter and the Philosopher's Stone》· J. K. Rowling", e: "《哈利·波特与魔法石》中邓布利多劝诫：梦想要落地于生活。" },
  { q: "Whatever our souls are made of, his and mine are the same.", a: "《Wuthering Heights》· Emily Brontë", e: "《呼啸山庄》凯瑟琳之语，写尽灵魂同源的炽烈爱恋。" },
  { q: "We are all in the gutter, but some of us are looking at the stars.", a: "《Lady Windermere's Fan》· Oscar Wilde", e: "王尔德剧作台词：于泥淖中仍仰望星光，是为浪漫与尊严。" },
  { q: "The world breaks everyone, and afterward many are strong at the broken places.", a: "《A Farewell to Arms》· Ernest Hemingway", e: "《永别了，武器》写创伤与重建，苍凉而坚韧。" },
  { q: "Tomorrow is always fresh, with no mistakes in it yet.", a: "《Anne of Green Gables》· L. M. Montgomery", e: "《绿山墙的安妮》之语，把每个清晨都当作重新开始的机会。" },
  { q: "I am no bird; and no net ensnares me: I am a free human being with an independent will.", a: "《Jane Eyre》· Charlotte Brontë", e: "《简·爱》简的自白，宣告人格独立与不可囚禁的自由。" },
  { q: "There is no greater agony than bearing an untold story inside you.", a: "《I Know Why the Caged Bird Sings》· Maya Angelou", e: "安吉罗自传名句，道出未被讲述的故事之于心灵的重负。" },
  { q: "And, when you want something, all the universe conspires in helping you to achieve it.", a: "《The Alchemist》· Paulo Coelho", e: "《牧羊少年奇幻之旅》核心句：信念会引来同向的合力。" },
  { q: "I took a deep breath and listened to the old brag of my heart: I am, I am, I am.", a: "《The Bell Jar》· Sylvia Plath", e: "《钟形罩》结尾，普拉斯以心跳重申「我存在」的倔强。" },
  { q: "We are such stuff as dreams are made on, and our little life is rounded with a sleep.", a: "《The Tempest》· William Shakespeare", e: "莎士比亚《暴风雨》台词，叹人生如梦如戏，终归于长眠。" }
];
