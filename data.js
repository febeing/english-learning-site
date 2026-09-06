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

// 新闻拆解（英文为学习用示例文本，中文为准确翻译；来源均为真实报道，见各条 source 字段）
const NEWS = [
  {
    tag: "SCIENCE",
    title: "Webb Telescope Finds a Hidden Planet by Its 'Chemical Fingerprint'",
    en: "NASA's James Webb Space Telescope has found a hidden giant planet in the Beta Pictoris system, 63 light-years from Earth. The planet, called Beta Pictoris d, was not seen as a bright point of light. Instead, scientists detected the unique chemical signature of its atmosphere. This new method can find planets hidden in bright dust, opening a fresh way to study distant worlds.",
    zh: "NASA 的詹姆斯·韦伯空间望远镜在距离地球 63 光年的绘架座 Beta 星系中发现了一颗隐藏的气态巨行星。这颗名为绘架座 Beta d 的行星并非作为一个明亮的光点被看见，而是被科学家通过其大气独特的化学「指纹」探测到。这种新方法能发现隐藏在明亮尘埃中的行星，为研究遥远世界开辟了新路径。",
    vocab: [
      { w: "detected", m: "探测到、检测到" },
      { w: "signature", m: "特征、标记（此处指化学特征）" },
      { w: "atmosphere", m: "大气" },
      { w: "distant", m: "遥远的" }
    ],
    grammar: [
      "Instead, scientists detected ... —— instead 作副词置首，表「相反 / 取而代之」，引出与上文不同的做法。",
      "called Beta Pictoris d —— 过去分词短语作后置定语，修饰 the planet，相当于 which is called。",
      "opening a fresh way to study ... —— 现在分词 opening 作结果状语，表主句动作带来的自然结果。"
    ],
    source: "NASA Science · 2026-07-15 · https://science.nasa.gov/missions/webb/nasas-webb-discovers-hidden-planet-in-famous-star-system/"
  },
  {
    tag: "ENVIRONMENT",
    title: "Ocean Plastic Threats Differ From Sea to Sea",
    en: "A new analysis warns that plastic pollution does not threaten all oceans equally. The study, in Nature Sustainability, maps where risks are highest. The north-eastern Atlantic is a high-risk area for large animals eating plastic. The researchers say clean-up efforts should look beyond well-known 'garbage patches' and also protect coastlines, where entanglement risk is over 100 times higher than in the open ocean.",
    zh: "一项新分析警告称，塑料污染对各海域的威胁并不相同。《自然·可持续发展》刊载的这项研究绘制了风险最高的区域。东北大西洋是大型动物误食塑料的高风险区。研究人员表示，清理行动不应只盯着知名的「垃圾带」，还应保护海岸线——那里的缠绕风险是开阔海域的 100 倍以上。",
    vocab: [
      { w: "equally", m: "同样地、平等地" },
      { w: "entanglement", m: "缠绕" },
      { w: "coastline", m: "海岸线" },
      { w: "beyond", m: "超越、在……之外" }
    ],
    grammar: [
      "does not threaten ... equally —— 否定副词 not 与 equally 搭配，表「并非同等程度地」。",
      "where risks are highest —— where 引导定语从句，修饰 oceans / areas，表地点。",
      "look beyond ... —— beyond 作介词，后接名词，意为「超越……去看待」。"
    ],
    source: "European Commission (Science for Environment Policy) · 2026-06-25 · https://environment.ec.europa.eu/news/threats-marine-ecosystems-plastic-waste-vary-across-worlds-oceans-2026-06-25_en （研究：Zhang et al., Nature Sustainability 8, 1143-1153, 2025）"
  },
  {
    tag: "ENERGY",
    title: "Solar and Wind Outgenerate Gas for the First Time",
    en: "For the first time ever, solar and wind produced more electricity than gas power worldwide. According to the think tank Ember, in April 2026 these two renewables supplied 22% of global electricity, while gas provided 20%. That means 531 terawatt-hours from solar and wind against 477 from gas. Analysts say strong growth in clean energy is reducing the need for imported gas.",
    zh: "有史以来第一次，太阳能和风能发电总量超过了天然气发电。据智库 Ember 数据，2026 年 4 月这两种可再生能源提供了全球 22% 的电力，而天然气为 20%。这意味着太阳能和风能发电 531 太瓦时，高于天然气的 477 太瓦时。分析人士称，清洁能源的强劲增长正在降低对进口天然气的依赖。",
    vocab: [
      { w: "outgenerate", m: "发电量超过" },
      { w: "renewables", m: "可再生能源" },
      { w: "terawatt-hour", m: "太瓦时（电量单位）" },
      { w: "imported", m: "进口的" }
    ],
    grammar: [
      "For the first time ever, ... —— 状语短语置首，强调「有史以来首次」。",
      "while gas provided 20% —— while 在此表对比，意为「而 / 与此同时」，连接两个并列事实。",
      "reducing the need for ... —— 现在分词 reducing 作结果状语。"
    ],
    source: "pv-magazine Global (citing Ember) · 2026-05-22 · https://www.pv-magazine.com/2026/05/22/solar-and-wind-generated-more-electricity-globally-than-gas-power-for-the-first-time-in-april"
  },
  {
    tag: "ENVIRONMENT",
    title: "The Ocean's 'Missing' Plastic Has Gone Invisible",
    en: "Scientists say the ocean's 'missing' plastic has not vanished — it has broken into invisible nanoplastics. A team from the Netherlands Institute for Sea Research sampled the North Atlantic and made the first real estimate: about 27 million tons of nanoplastics may float there. Because the particles are so tiny, they can enter living things, even human brain tissue. The researchers warn these particles are too small and widespread to ever be cleaned up.",
    zh: "科学家表示，海洋中「消失」的塑料并没有凭空消失——而是碎裂成了看不见的纳米塑料。荷兰海洋研究所的团队在北大西洋取样，作出了首个真实估算：那里可能漂浮着约 2700 万吨纳米塑料。由于颗粒极微小，它们能进入生物体内，甚至人类脑组织。研究人员警告，这些颗粒太小、分布太广，永远无法被清理掉。",
    vocab: [
      { w: "vanished", m: "消失" },
      { w: "invisible", m: "看不见的" },
      { w: "particles", m: "颗粒、微粒" },
      { w: "widespread", m: "广泛分布的" }
    ],
    grammar: [
      "has not vanished — it has broken into ... —— 现在完成时强调动作对现在的影响。",
      "so tiny (that) they can enter ... —— so ... that 结果状语从句，that 可省略。",
      "too small ... to be cleaned up —— too ... to 结构，表「太……而不能」。"
    ],
    source: "ScienceDaily (Royal Netherlands Institute for Sea Research / NIOZ) · 2026-03-29 · https://www.sciencedaily.com/releases/2026/03/260329041649.htm"
  },
  {
    tag: "TECH",
    title: "ChatGPT Adds a 'Study Mode' That Guides, Not Answers",
    en: "OpenAI has launched 'Study Mode' for ChatGPT, available to Free, Plus, Pro and Team users since late July 2025. Instead of giving a full answer at once, the tool asks guiding questions and adjusts to the user's level. It breaks ideas into small steps and checks understanding with quizzes. OpenAI says the goal is to support real learning, not simply hand over solutions — a design shaped with teachers and learning-science researchers.",
    zh: "OpenAI 为 ChatGPT 推出了「学习模式」，自 2025 年 7 月底起向 Free、Plus、Pro 与 Team 用户开放。这一工具并非一次性给出完整答案，而是提出引导性问题，并根据用户水平进行调整。它会把概念拆成小步骤，并用小测验检验理解。OpenAI 表示，目标是支持真正的学习，而非直接奉上答案——这一设计是与教师及学习科学研究者共同打造的。",
    vocab: [
      { w: "launched", m: "推出、发布" },
      { w: "guiding", m: "引导的" },
      { w: "adjusts", m: "调整、适应" },
      { w: "quizzes", m: "小测验" }
    ],
    grammar: [
      "available to ... users since late July 2025 —— 形容词短语作后置定语；since + 时间点，与现在完成时呼应。",
      "Instead of giving ... —— instead of + 动名词，表「而不是做某事」。",
      "shaped with teachers ... —— 过去分词 shaped 作后置定语，相当于 which was shaped。"
    ],
    source: "OpenAI Help Center (ChatGPT release notes) · 2025-07-29 · https://help.openai.com/en/articles/6825453-chatgpt-release-notes （详见 openai.com/index/chatgpt-study-mode）"
  },
  {
    tag: "EDUCATION",
    title: "An AI Tutor Beat the Classroom — But Only When Built to Teach",
    en: "A 2025 randomized controlled trial in Scientific Reports compared a carefully designed AI tutor with in-class active learning. In Harvard's large introductory physics course, 194 students each learned one topic with the AI tutor at home and another in class. The AI tutor more than doubled learning gains in less time, with higher engagement. The key was pedagogy: the tutor revealed one step at a time and never gave the full answer, forcing students to reason.",
    zh: "《科学报告》（Scientific Reports）2025 年的一项随机对照试验，将精心设计的 AI 家教与课堂主动学习进行比较。在哈佛大型基础物理课上，194 名学生分别用 AI 家教在家学一个主题、在课堂上学另一个。结果 AI 家教在更短时间内带来了两倍以上的学习收益，且参与度更高。关键在于教学法：该家教一次只揭示一步，绝不给出完整答案，迫使学生自己推理。",
    vocab: [
      { w: "randomized", m: "随机的" },
      { w: "introductory", m: "入门的、基础的" },
      { w: "engagement", m: "参与度" },
      { w: "reasoning", m: "推理" }
    ],
    grammar: [
      "compared ... with ... —— 过去分词 compared 作后置定语，表「被比较的」。",
      "each learned one topic ... and another ... —— each 作主语，后接并列谓语。",
      "forcing students to reason —— 现在分词 forcing 作结果状语；force sb to do 迫使某人做某事。"
    ],
    source: "Scientific Reports (Nature Portfolio), 2025 — Kestin et al., randomized controlled trial (Harvard intro physics, 194 students). https://www.nature.com/articles/s41598-025-97652-6"
  },
  {
    tag: "ENERGY",
    title: "Electric Cars Hit a New Sales Record in 2025",
    en: "Electric car sales reached a record in 2025, growing 20% to pass 20 million worldwide, according to the IEA's Global EV Outlook 2026. About one in four new cars sold was electric. China led with nearly 55% of its new cars electric, while Europe saw sales rise over 30%. The agency expects 23 million electric cars to be sold in 2026, close to 30% of all new cars.",
    zh: "据国际能源署（IEA）《2026 全球电动汽车展望》报告，2025 年电动汽车销量创下纪录，增长 20%、突破 2000 万辆，全球每售出 4 辆新车就有 1 辆是电动。中国领跑，近 55% 的新车为电动；欧洲销量增长超 30%。该机构预计 2026 年电动汽车销量将达 2300 万辆，接近全部新车的 30%。",
    vocab: [
      { w: "record", m: "纪录" },
      { w: "agency", m: "机构（此处指 IEA）" },
      { w: "expects", m: "预计" },
      { w: "nearly", m: "接近、几乎" }
    ],
    grammar: [
      "growing 20% to pass 20 million —— 现在分词 growing 作伴随 / 结果状语。",
      "with nearly 55% of its new cars electric —— with + 宾语 + 形容词 复合结构，作伴随状语。",
      "expects 23 million ... to be sold —— expect + 宾语 + to do（被动）结构。"
    ],
    source: "IEA (Global EV Outlook 2026) · released 2026-05-20 · https://www.iea.org/reports/global-ev-outlook-2026/executive-summary"
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
