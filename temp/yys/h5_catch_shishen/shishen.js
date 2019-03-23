// 妖怪
var ssData = [{
    "id": 410,
    "level": "N",
    "name": "招福达摩",
    "isReal": true,
    cv: '',
    categories: [],
    skills: []
  }, {
    "id": 411,
    "level": "N",
    "name": "御行达摩",
    "isReal": true,
    cv: '',
    categories: [],
    skills: []
  }, {
    "id": 412,
    "level": "N",
    "name": "奉为达摩",
    "isReal": true,
    cv: '',
    categories: [],
    skills: []
  }, {
    "id": 413,
    "level": "N",
    "name": "大吉达摩",
    cv: '',
    categories: [],
    skills: []
  }, {
    "id": 427,
    "level": "N",
    "name": "彼岸花呱",
    "material": true,
    "isNew": true,
    cv: '松井晓波',
    categories: [],
    skills: [
      {
        talk: '你想成为我的花泥吗？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我要让这片战场也变成彼岸花呱的花海。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 426,
    "level": "N",
    "name": "荒呱",
    "material": true,
    "isNew": true,
    cv: '岩崎了',
    categories: [],
    skills: [
      {
        talk: '命运的轨迹啊，改变吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '接受命运的惩罚吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 425,
    "level": "N",
    "name": "辉夜姬呱",
    "material": true,
    "isNew": true,
    cv: '池田海咲',
    categories: [],
    skills: [
      {
        talk: '是谁……将我唤醒？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '温柔的月光啊，请照亮我们。',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 424,
    "level": "N",
    "name": "花鸟卷呱",
    "material": true,
    "isNew": true,
    cv: '近藤唯',
    categories: [],
    skills: [
      {
        talk: '要记得回来哦。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '莺燕相闻，花草相生。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 423,
    "level": "N",
    "name": "一目连呱",
    "material": true,
    "isNew": true,
    cv: '滨野大辉',
    categories: [],
    skills: [
      {
        talk: '什么都不用怕，有我在。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '龙啊，把你的力量借给我。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 422,
    "level": "N",
    "name": "妖刀姬呱",
    "material": true,
    "isNew": true,
    cv: '羽饲真梨',
    categories: [],
    skills: [
      {
        talk: '这把刀，正在呼唤我。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '阻碍我的人，都必须……消灭。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 421,
    "level": "N",
    "name": "青行灯呱",
    "material": true,
    "isNew": true,
    cv: '渡边优里奈',
    categories: [],
    skills: [
      {
        talk: '呵，这样你就能解脱了呢。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '懦弱的灵魂没有存在的意义，还是由我收下吧。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 420,
    "level": "N",
    "name": "茨木呱",
    "material": true,
    "isNew": true,
    cv: '安部壮一',
    categories: [],
    skills: [
      {
        talk: '呵，这样就足够解决你了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '就让你见识我真正的力量，降临吧，地狱之手！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 419,
    "level": "N",
    "name": "小鹿男呱",
    "material": true,
    "isNew": true,
    cv: '弓原健史',
    categories: [],
    skills: [
      {
        talk: '接受来自森林的惩罚吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我的角无往不利！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 418,
    "level": "N",
    "name": "两面佛呱",
    "material": true,
    "isNew": true,
    cv: '宫本誉之',
    categories: [],
    skills: [
      {
        talk: '看风！不对，看雷！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '神罪连击！闪电、飓风，听吾召唤！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 417,
    "level": "N",
    "name": "阎魔呱",
    "material": true,
    "isNew": true,
    cv: '有贺由树子',
    categories: [],
    skills: [
      {
        talk: '过来，把这碍事的家伙收拾了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '屈服于我！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 416,
    "level": "N",
    "name": "荒川呱",
    "material": true,
    "isNew": true,
    cv: '寸石和弘',
    categories: [],
    skills: [
      {
        talk: '没用的东西还是退出战场吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '没用的东西就该沉在黑漆漆的海底挣扎。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 415,
    "level": "N",
    "name": "酒吞呱",
    "material": true,
    "isNew": true,
    cv: '大泊贵挥',
    categories: [],
    skills: [
      {
        talk: '这就是本大爷的实力，看好了！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '这就是本大爷真正的实力，看好了！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 414,
    "level": "N",
    "name": "大天狗呱",
    "material": true,
    "isNew": true,
    cv: '君岛哲',
    categories: [],
    skills: [
      {
        talk: '风啊，听吾之命！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '将吾这风之力，铭记在心吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 1001,
    "name": "黑豹",
    "level": "N",
    "isQuick": true,
    cv: '',
    categories: [],
    skills: []
  }, {
    "id": 1002,
    "name": "跳跳犬",
    "level": "N",
    "isQuick": true,
    cv: '',
    categories: [],
    skills: []
  }, {
    "id": 203,
    "name": "灯笼鬼",
    "level": "N",
    "isQuick": true,
    "isReal": true,
    cv: '子安武人',
    categories: ['飞行系', '鬼系', '男系'],
    skills: [
      {
        talk: '让我尝尝你是什么味道～？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '燃烧自己，点亮他人',
        cost: 0,
        type: '被动'
      },
      {
        talk: '照亮黑暗就是我的宿命。',
        cost: 4,
        type: '主动'
      },
    ]
  }, {
    "id": 245,
    "name": "提灯小僧",
    "level": "N",
    "isQuick": true,
    "isReal": true,
    cv: '悠木碧',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '别过来！别碰我！我不是故意的……',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '鬼……鬼火啊，打、打他们！',
        cost: 2,
        type: '主动'
      },
      {
        talk: '鬼……鬼火啊，打、打他们！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 246,
    "name": "赤舌",
    "level": "N",
    "isQuick": true,
    cv: '森久保祥太郎',
    categories: ['飞行系', '鬼系', '男系'],
    skills: [
      {
        talk: '呜哈！控制不住力气。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '加油！我敲！',
        cost: 2,
        type: '主动'
      },
      {
        talk: '呜哇……打雷了！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 400,
    "name": "盗墓小鬼",
    "level": "N",
    "isQuick": true,
    "isReal": true,
    cv: '新谷真弓',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '不准挡住我的去路。',
        cost: 0,
        type: '普攻'
      },
    ]
  }, {
    "id": 401,
    "name": "寄生魂",
    "level": "N",
    "isQuick": true,
    cv: '井上和彦',
    categories: ['飞行系', '鬼系', '男系'],
    skills: [
      {
        talk: '喝……灼烧吧！',
        cost: 0,
        type: '普攻'
      },
    ]
  }, {
    "id": 403,
    "name": "唐纸伞妖",
    "level": "N",
    "isQuick": true,
    "isReal": true,
    cv: '小林优',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '我顶！还不退散？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '看我的厉害！唔……头、头好晕……',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 404,
    "name": "天邪鬼绿",
    "level": "N",
    "isQuick": true,
    cv: '',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '哈啊，打的就是你！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '还没有被打够吗？看招！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 405,
    "name": "天邪鬼赤",
    "level": "N",
    "isQuick": true,
    cv: '',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '哈哈哈，等着被我压成纸片吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '啊，来打我啊？',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 406,
    "name": "天邪鬼黄",
    "level": "N",
    "isQuick": true,
    "isReal": true,
    cv: '',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '嘻嘻，砸中了吗？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '锵锵锵～我来给你们助威啦～',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 407,
    "name": "天邪鬼青",
    "level": "N",
    "isQuick": true,
    "isReal": true,
    cv: '',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '一步都不准再靠近了！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '哼哼哼～',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 408,
    "name": "帚神",
    "level": "N",
    "isQuick": true,
    "isReal": true,
    cv: '',
    categories: [],
    skills: [
      {
        talk: '喝哈……！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '打扫得干干净净才行～',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 409,
    "name": "涂壁",
    "level": "N",
    "isQuick": true,
    cv: '',
    categories: [],
    skills: [
      {
        talk: '喝……！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我的身体，可是很坚固的。',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 202,
    "name": "三尾狐",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '泽城美雪',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '呵呵，我要过来了哦～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '哎呀，来和姐姐一起玩玩嘛，好不好？',
        cost: 0,
        type: '被动'
      },
      {
        talk: '虚无的幻象，还不消散！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 205,
    "name": "座敷童子",
    "level": "R",
    "isQuick": true,
    cv: '竹内顺子',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '灵魂之火，来帮帮我吧。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '大家的运气，我就先收下啦。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '「塞翁失马，焉知非福，塞翁得马，焉知非祸？」',
        cost: 0,
        type: '主动'
      },
    ]
  }, {
    "id": 206,
    "name": "鲤鱼精",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '悠木碧',
    categories: ['水系', '动物系', '女系'],
    skills: [
      {
        talk: '我也会生气的哦！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '泡泡，泡泡！快变成防护罩～',
        cost: 3,
        type: '主动'
      },
      {
        talk: '都说了，不可以乱动哦。',
        cost: 3,
        wait: 1,
        type: '主动'
      },
    ]
  }, {
    "id": 207,
    "name": "九命猫",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '新谷真弓',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '喵哼————！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '只要本喵还有喵命！',
        cost: 0,
        wait: 2,
        type: '被动'
      },
      {
        talk: '本喵还可以再战！吃我一爪！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 208,
    "name": "狸猫",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '保志总一郎',
    categories: ['动物系', '男系'],
    skills: [
      {
        talk: '我的酒壶，可硬了，嗝……！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '酒，酒！拿……嗝……酒来！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '酒不能给你……不过火可以！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 209,
    "name": "河童",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '保志总一郎',
    categories: ['水系', '动物系', '男系'],
    skills: [
      {
        talk: '哈啊————水流弹！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '以清流之名，洗清你的罪孽！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '听吧，这来自大河之水的愤怒！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 212,
    "name": "童男",
    "level": "R",
    "isQuick": true,
    cv: '井上麻里奈',
    categories: ['飞行系', '男系'],
    skills: [
      {
        talk: '就用我的羽毛，保护大家吧。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '妹妹，哥哥就在你身边哦',
        cost: 0,
        type: '被动'
      },
      {
        talk: '我愿意献上我的灵魂。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 213,
    "name": "童女",
    "level": "R",
    "isQuick": true,
    cv: '加隈亚衣',
    categories: ['飞行系', '女系'],
    skills: [
      {
        talk: '唔……我的羽毛……！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '哥哥，你在哪里……？',
        cost: 0,
        type: '被动'
      },
      {
        talk: '我的命，你拿走好了！',
        cost: 1,
        type: '主动'
      },
    ]
  }, {
    "id": 214,
    "name": "饿鬼",
    "level": "R",
    "isQuick": true,
    cv: '井上麻里奈',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '哼，你也尝尝臭馒头吧。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '好饿好饿～快把吃的给我！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '饿死了，好想吃！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 216,
    "name": "巫蛊师",
    "level": "R",
    "isQuick": true,
    cv: '间宫康弘',
    categories: ['男系'],
    skills: [
      {
        talk: '嘿嘿…一不留神，虫子就会爬进去哦。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '蛊虫们，听我命令————！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '咕嘻嘻嘻……爆炸吧，虫子们！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 218,
    "name": "鸦天狗",
    "level": "R",
    "isQuick": true,
    cv: '小林优',
    categories: ['飞行系', '动物系', '男系'],
    skills: [
      {
        talk: '正义一定会战胜邪恶的！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '罪恶，就由我来清除干净吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '正义之天鸦啊，与罪恶一战到底吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 221,
    "name": "食发鬼",
    "level": "R",
    "isQuick": true,
    cv: '间宫康弘',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '能死在我的秀发之下，可是你的荣幸～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '多睡美容觉，皮肤才会好哦～！',
        cost: 3,
        wait: 1,
        type: '被动'
      },
      {
        talk: '非要我露出真面目才肯乖乖的吗？',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 222,
    "name": "武士之灵",
    "level": "R",
    "isQuick": true,
    cv: '井上和彦',
    categories: ['飞行系', '鬼系', '男系'],
    skills: [
      {
        talk: '老夫还没败，再战一场！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '尽情释放怨恨吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '亡魂啊，让他们也尝尝不甘的滋味！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 224,
    "name": "雨女",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '加隈亚衣',
    categories: ['水系', '女系'],
    skills: [
      {
        talk: '呜呜呜……',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '要到什么时候…这心中的泪雨才能停呢？',
        cost: 0,
        type: '被动'
      },
      {
        talk: '天空，你也和我一样在哭泣吗……',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 225,
    "name": "跳跳弟弟",
    "level": "R",
    "isQuick": true,
    cv: '高山南',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '打你哦！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '不准过来！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '唔唔————尝尝这毒气吧！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 226,
    "name": "跳跳妹妹",
    "level": "R",
    "isQuick": true,
    cv: '诹访彩花',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '坏人最讨厌了，通通给我消失！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '呜呜……不玩了啦！呜呜呜……',
        cost: 0,
        type: '被动'
      },
      {
        talk: '番茄，快去咬那帮坏人！出击！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 227,
    "name": "兵俑",
    "level": "R",
    "isQuick": true,
    cv: '石田彰',
    categories: ['男系'],
    skills: [
      {
        talk: '铠甲不坚，长剑不利，魂魄不保！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '在下会接下你的所有攻击！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '没有人能击破我的防御！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 228,
    "name": "丑时之女",
    "level": "R",
    "isQuick": true,
    cv: '斋藤千和',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '钉！钉！我钉！哐哐哐！哈哈哈……！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '嘻嘻嘻～就快结束了～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '草人的伤，全都会到你身上哦～啊哈哈哈！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 230,
    "name": "独眼小僧",
    "level": "R",
    "isQuick": true,
    cv: '小林优',
    categories: ['男系'],
    skills: [
      {
        talk: '呀哈————看我的……小石头！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '就让我来保护师父和大家！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '师父，和我一起……泰山流重压拳！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 232,
    "name": "铁鼠",
    "level": "R",
    "isQuick": true,
    cv: '保志总一郎',
    categories: ['动物系'],
    skills: [
      {
        talk: '叮当，叮当～是时候还我钱了吧？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '只要活着，就需要钱。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '看钱！人在钱下死，做鬼也风流！哈哈哈！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 234,
    "name": "椒图",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '能登麻美子',
    categories: ['水系', '动物系', '女系'],
    skills: [
      {
        talk: '可别小看了水花哦～看招～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '就让椒图给您还击的力量吧～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '痛痛，分一分就飞走了～呼呼～',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 236,
    "name": "管狐",
    "level": "R",
    "isQuick": true,
    cv: '松田健一郎',
    categories: ['飞行系', '动物系', '男系'],
    skills: [
      {
        talk: '想躲可没那么容易！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '你们这些家伙，可别惹我！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '接受雷云的炮轰吧！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 237,
    "name": "山兔",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '丰崎爱生',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '砰————！大纸扇！还听不听话呀～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '嘿～哈～宝宝给大家跳舞加油了哦～',
        cost: 2,
        type: '主动'
      },
      {
        talk: '呱呱～你说宝宝套哪个奖品好呢～',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 238,
    "name": "萤草",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '诹访彩花',
    categories: ['女系'],
    skills: [
      {
        talk: '我也来帮忙～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '只要不放弃，一定还有希望！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '神啊，请您施以治愈的恩泽～',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 241,
    "name": "蝴蝶精",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '悠木碧',
    categories: ['飞行系', '动物系', '女系'],
    skills: [
      {
        talk: '这是很多种花的香味哦～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '在花丛中跳舞吧～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '治愈之舞～',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 243,
    "name": "山童",
    "level": "R",
    "isQuick": true,
    cv: '石田彰',
    categories: ['男系'],
    skills: [
      {
        talk: '哈啊……啊，这就碎了？这也算岩石？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '要比力气吗？我可不会输～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '怎么了，这就受不了了？',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 244,
    "name": "首无",
    "level": "R",
    "isQuick": true,
    cv: '石川介人',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '没有人能阻碍我！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '冥火啊，助我一臂之力！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '放弃挣扎吧，结束了……！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 249,
    "name": "觉",
    "level": "R",
    "isQuick": true,
    cv: '尤加奈',
    categories: ['女系'],
    skills: [
      {
        talk: '是不是很痛哈哈哈！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '敢打伤我，我可不会饶了你！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '猜猜这是什么东西！呀黑————！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 250,
    "name": "青蛙瓷器",
    "level": "R",
    "isQuick": true,
    "isReal": true,
    cv: '言野裕行',
    categories: ['动物系', '男系'],
    skills: [
      {
        talk: '出千？怎么可能！呱呱！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '命运一定会眷顾老朽的，呱！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '命运眷顾的是本呱～！岭上开花！和了～',
        cost: 1,
        type: '主动'
      },
    ]
  }, {
    "id": 274,
    "level": "R",
    "name": "古笼火",
    "isReal": true,
    cv: '松冈祯丞',
    categories: ['飞行系', '鬼系', '男系'],
    skills: [
      {
        talk: '哼哼，抓到一个落单的～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '快给我住手，蠢货！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '不想听你说话，快走开。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 289,
    "level": "R",
    "name": "兔丸",
    cv: '代永翼',
    categories: ['动物系'],
    skills: [
      {
        talk: '别看我这么可爱，我生气起来也是很可怕的～！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '呼呣呼呣～！只有胡萝卜才能治愈我～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '快走开～不准欺负我的朋友！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 301,
    "level": "R",
    "name": "数珠",
    cv: '田村由香里',
    categories: ['女系'],
    skills: [
      {
        talk: '恶灵退散，不准扰我佛门清净～～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '佛说，轮回都是因果……那是什么意思呢？～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '诸法因缘生……唉，后一句是什么来着？',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 302,
    "level": "R",
    "name": "小袖之手",
    cv: '井口裕香',
    categories: ['女系'],
    skills: [
      {
        talk: '他还没有回来，看来今天也不会是例外。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '隔着战场，我们的心是相连着的。',
        cost: 2,
        type: '主动'
      },
      {
        talk: '这战争什么时候才会结束！我会一直等着你的……',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 306,
    "level": "R",
    "name": "虫师",
    cv: '佐仓绫音',
    categories: ['飞行系', '动物系', '女系'],
    skills: [
      {
        talk: '沙啦沙啦，你在看什么？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '像过去的我一样，沉睡吧～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '在我的茧里，不用害怕……',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 323,
    "level": "R",
    "name": "天井下",
    cv: '小仓唯',
    categories: ['辅助'],
    skills: [
      {
        talk: '偷偷地——嘿！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '在这里就安心吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '有回想起重要的人吗？',
        cost: 0,
        type: '主动'
      },
    ]
  }, {
    "id": 310,
    "level": "R",
    "name": "蜜桃&芥子",
    "interactive": true,
    cv: '上坂堇&种崎敦美',
    categories: ['女系'],
    skills: [
      {
        talk: '不用担心，异界的恶鬼就交给我来对付吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '既然一起到了异界……我会保护你的！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '这里是哪里，好想快点回去……',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 200,
    "name": "桃花妖",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '水树奈奈',
    categories: ['女系'],
    skills: [
      {
        talk: '桃花瓣啊，漫天飞舞吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '芬芳的香气，赐予我治愈之力吧。',
        cost: 2,
        type: '主动'
      },
      {
        talk: '哼，不准给我装死，快点起来战斗～',
        cost: 3,
        wait: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 201,
    "name": "雪女",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '诹访彩花',
    categories: ['飞行系', '女系'],
    skills: [
      {
        talk: '呵，接招吧。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '呼啸吧，冰晶。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '冻结一切的洪荒之雪。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 210,
    "name": "鬼使白",
    "level": "SR",
    "isQuick": true,
    cv: '岭村健一',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '冥界的亡魂们，听完召唤！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '时间到了，让我送你去冥界吧。',
        cost: 1,
        type: '主动'
      },
      {
        talk: '怨灵地缚阵，把活着的人拖下冥界吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 211,
    "name": "鬼使黑",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '中井和哉',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '我才没耐心听你解释，下冥界去吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '你逃不掉了～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '你已经死了！跟我走吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 215,
    "name": "孟婆",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '钉宫理惠',
    categories: ['女系'],
    skills: [
      {
        talk: '嘻嘻～尝尝这碗汤吧～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '没错，就是那边～快冲，啊哈哈～',
        cost: 1,
        type: '主动'
      },
      {
        talk: '嘻嘻～看我把他们砸个底朝天～',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 220,
    "name": "犬神",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '关俊彦',
    categories: ['动物系', '男系'],
    skills: [
      {
        talk: '心之所向，剑之所指，拔剑！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我的挚友啊，由我来保护！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '剑随心动，心剑乱舞！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 223,
    "name": "骨女",
    "level": "SR",
    "isQuick": true,
    cv: '诹访彩花',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '别碰我！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我还不想离开这里……接受我的怨恨吧。',
        cost: 0,
        wait: 2,
        type: '被动'
      },
      {
        talk: '别害怕，很快就会结束了。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 231,
    "name": "鬼女红叶",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '桑岛法子',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '呵呵～看…这枫叶多红、多漂亮。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '爆炸吧，哈哈哈！啊哈哈哈哈～！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '来和我跳舞吧，在这红色的枫叶上————！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 233,
    "name": "跳跳哥哥",
    "level": "SR",
    "isQuick": true,
    cv: '远藤大辅',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '你的棺材！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我还要保护弟弟喝妹妹，不能倒下！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '从黄泉路上回来吧！',
        cost: 3,
        wait: 1,
        type: '主动'
      },
    ]
  }, {
    "id": 242,
    "name": "傀儡师",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '能登麻美子',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '我来，攻击。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '干掉你。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '哥哥说他生气了。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 247,
    "name": "海坊主",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '关俊彦',
    categories: ['水系', '动物系', '男系'],
    skills: [
      {
        talk: '水龙卷，出击！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '就让温柔的水来抚平伤痛吧。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '巨浪啊，吞噬一切吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 251,
    "name": "判官",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '石田彰',
    categories: ['男系'],
    skills: [
      {
        talk: '生死簿，勾魂笔，在下就是生死判官。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '生死本自然，何来情理可言。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '就让在下来宣告你的生死。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 252,
    "name": "凤凰火",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '井上麻里奈',
    categories: ['飞行系', '动物系', '女系'],
    skills: [
      {
        talk: '燃烧的凤火啊，祛除一切不净吧。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '弱者，就只配在火焰中化为灰烬。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '尽情在这华丽的火海中沉沦吧，呵呵。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 253,
    "name": "吸血姬",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '由加奈',
    categories: ['动物系', '鬼系', '女系'],
    skills: [
      {
        talk: '呵，害怕吗？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '用血来偿还吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '啊……多么地香醇！让我喝吧！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 254,
    "name": "妖狐",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '岛崎信长',
    categories: ['动物系', '男系'],
    skills: [
      {
        talk: '狂乱的风，释放你的愤怒！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '气流，降临吾身，撕裂挡吾之敌！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '在狂风刃卷中起舞，破裂吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 256,
    "name": "妖琴师",
    "level": "SR",
    "isQuick": true,
    cv: '岛崎信长',
    categories: ['男系'],
    skills: [
      {
        talk: '终于安静下来了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '这首曲就要结束了。',
        cost: 2,
        type: '主动'
      },
      {
        talk: '闭嘴，好好听我的演奏吧。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 257,
    "name": "食梦貘",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '西谷修一',
    categories: ['动物系'],
    skills: [
      {
        talk: '噗噗～快进入梦乡吧～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '睡得太沉，可就真的醒不来了哦～噗噗',
        cost: 0,
        type: '被动'
      },
      {
        talk: '噗噗～你的梦，就让我吃掉吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 260,
    "name": "清姬",
    "level": "SR",
    "isReal": true,
    cv: '行成桃姬',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '你，休想从我这儿逃掉～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '毒，是对爱的赞歌。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '爱就像焚身之火，你也一起为爱献身吧。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 261,
    "name": "镰鼬",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '间宫康弘',
    categories: ['动物系', '男系'],
    skills: [
      {
        talk: '锤？钉粑？剑？总有一款合你口味哈哈～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '哈哈哈～我们可是最强的三兄弟！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '就让你见识一下我们三兄弟的羁绊！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 262,
    "name": "姑获鸟",
    "level": "SR",
    "isReal": true,
    cv: '行成桃姬',
    categories: ['飞行系', '动物系', '女系'],
    skills: [
      {
        talk: '伞，就是吾之剑！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '就让在下略尽绵力！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '以伞为剑，翔于天际，降之天罚，疏而不漏！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 263,
    "name": "二口女",
    "level": "SR",
    cv: '新谷弓真',
    categories: ['女系'],
    skills: [
      {
        talk: '嘻嘻～啊，我只是想和你问好……',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '不要！别过来！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '我、我不是故意的！对不起！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 264,
    "name": "白狼",
    "level": "SR",
    "isReal": true,
    cv: '桑岛法子',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '白狼，参上～！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '摈除杂念，专心一志。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '那么，在下就不客气了！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 267,
    "name": "樱花妖",
    "level": "SR",
    "isQuick": true,
    "isReal": true,
    cv: '能登麻美子',
    categories: ['女系'],
    skills: [
      {
        talk: '山风樱林过，花落舞纷纷。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '初春田野霁，山樱正繁时。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '半山春樱一帘风。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 268,
    "name": "惠比寿",
    "level": "SR",
    "isReal": true,
    cv: '茶风林',
    categories: ['水系', '男系'],
    skills: [
      {
        talk: '好运临门～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '没事没事～接下来就会顺利了。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '给大家都带去好运吧～',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 270,
    "name": "络新妇",
    "level": "SR",
    "isReal": true,
    cv: '伊藤静',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '呵呵，害怕也已经晚了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我的痛苦，你也体会一下吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '看，有新的食物了哦。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 271,
    "name": "般若",
    "level": "SR",
    cv: '梶裕贵',
    categories: ['男系'],
    skills: [
      {
        talk: '哼哼，再多陪我玩一下嘛～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '只有你们才是最丑陋的！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '别这么快就结束嘛，不好玩～',
        cost: 3,
        wait: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 273,
    "level": "SR",
    "name": "青坊主",
    cv: '细谷佳正',
    categories: ['男系'],
    skills: [
      {
        talk: '万物皆虚妄。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '化为尘土，落叶归根吧。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '佛门清净，不可造次。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 275,
    "level": "SR",
    "name": "万年竹",
    "isReal": true,
    cv: '立花慎之介',
    categories: ['男系'],
    skills: [
      {
        talk: '笛身剑心。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '做好觉悟吧。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '且听竹语。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 276,
    "level": "SR",
    "name": "夜叉",
    cv: '小西克幸',
    categories: ['男系'],
    skills: [
      {
        talk: '本大爷要把这里变成废墟！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '这样才有意思，对吧？',
        cost: 0,
        type: '被动'
      },
      {
        talk: '真弱啊，你们这群家伙。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 277,
    "level": "SR",
    "name": "黑童子",
    "isReal": true,
    cv: '杉田智和',
    categories: ['男系'],
    skills: [
      {
        talk: '……为你的罪恶，付出代价吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '唔……白童子在哪里？',
        cost: 0,
        type: '被动'
      },
      {
        talk: '嘻嘻嘻……永别了。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 278,
    "level": "SR",
    "name": "白童子",
    "isReal": true,
    cv: '中村悠一',
    categories: ['男系'],
    skills: [
      {
        talk: '我会努力成为厉害的鬼使的！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '不会让你们伤害同伴的～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '醒来吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 281,
    "level": "SR",
    "name": "烟烟罗",
    "isReal": true,
    cv: '甲斐田裕子',
    categories: ['女系'],
    skills: [
      {
        talk: '呵，我下手可是不会留情的哦？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我可不想变得脏兮兮的～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '哎呀，你还没被欺负够吗？',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 282,
    "level": "SR",
    "name": "金鱼姬",
    "isReal": true,
    cv: '内田真礼',
    categories: ['水系', '动物系', '女系'],
    skills: [
      {
        talk: '哼哼，才不会让你阻碍我的梦想呢！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '你们这些大坏蛋，不准欺负我！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '金鱼啊，跟我一起征服世界吧！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 285,
    "level": "SR",
    "name": "鸩",
    "isReal": true,
    cv: '户松遥',
    categories: ['女系'],
    skills: [
      {
        talk: '羽之箭！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '逃也没用的，放弃吧。',
        cost: 2,
        type: '主动'
      },
      {
        talk: '被毒侵蚀的感觉怎么样？',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 286,
    "level": "SR",
    "name": "以津真天",
    "isReal": true,
    cv: '佐藤聪美',
    categories: ['飞行系', '动物系', '女系'],
    skills: [
      {
        talk: '快点结束这一切吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '黄金羽毛……因为这个遇到不少麻烦呢。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '这就是贪婪的惩罚！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 287,
    "level": "SR",
    "name": "匣中少女",
    "isReal": true,
    cv: '小清水亚美',
    categories: ['飞行系', '女系'],
    skills: [
      {
        talk: '想知道我的匣子里有些什么宝物吗？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '你就是我最珍惜的宝物哦～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '真想把你也藏到我的匣子里……',
        cost: 3,
        wait: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 290,
    "level": "SR",
    "name": "小松丸",
    cv: '茅野爱衣',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '这么想要我的松果啊？给你！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '不要那么凶，我好害怕哦！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '生气了！我真的生气了！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 291,
    "level": "SR",
    "name": "书翁",
    cv: '小野坂昌也',
    categories: ['男系'],
    skills: [
      {
        talk: '是否也要把你记录在我的书中呢？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '云游四方，以明心志。',
        cost: 2,
        type: '主动'
      },
      {
        talk: '世间万象，都在我的笔下。',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 293,
    "level": "SR",
    "name": "百目鬼",
    cv: '日高里菜',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '真是一双美丽的眼睛啊……',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '让我看看，你在想什么，呵呵。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '你的眼睛，也会成为我的眼睛哦～',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 295,
    "level": "SR",
    "name": "追月神",
    cv: '名冢佳织',
    categories: ['飞行系', '女系'],
    skills: [
      {
        talk: '就由我来指引你们。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '你的愿望，我都能满足。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '感激我的降临吧。',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 297,
    "level": "SR",
    "name": "日和坊",
    cv: '三森铃子',
    categories: ['女系'],
    skills: [
      {
        talk: '小心不要被阳光灼伤喔～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '加油啊，大家～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '绝对，绝对不可以放弃！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 298,
    "level": "SR",
    "name": "薰",
    cv: '水濑祈',
    categories: ['女系'],
    skills: [
      {
        talk: '欺负小孩子，就该打！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '鸮，警惕起来！现在可是关键时刻！～',
        cost: 0,
        type: '被动'
      },
      {
        talk: '鸮，和我一起守护大家吧！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 303,
    "level": "SR",
    "name": "弈",
    cv: '柿原彻也',
    categories: ['女系'],
    skills: [
      {
        talk: '这一步棋如何？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '这一局你又要输了。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '天地为局，万物为子',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 307,
    "level": "SR",
    "name": "猫掌柜",
    cv: '堀江由衣',
    categories: ['动物系', '女系'],
    skills: [
      {
        talk: '猫猫们，干掉他们～',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '橘乃，不准偷懒，好好干活！',
        cost: 2,
        wait: 2,
        type: '主动'
      },
      {
        talk: '居然敢在我的酒馆里闹事……！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 309,
    "level": "SR",
    "name": "阿香",
    "interactive": true,
    cv: '喜多村英梨',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '不弄巧成拙就好了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '抱歉，吓到你了吗？',
        cost: 0,
        type: '被动'
      },
      {
        talk: '这里必须用淑女之力阻止你！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 317,
    "level": "SR",
    "name": "人面树",
    cv: '花江夏树',
    categories: [],
    skills: [
      {
        talk: '祈祷，真的能有回应吗？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '红色，是危险的颜色。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '神木亦或祸根，乃他人之相。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 318,
    "level": "SR",
    "name": "於菊虫",
    cv: '羽饲真梨',
    categories: ['动物系'],
    skills: [
      {
        talk: '请认真听我讲话！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '你的茧破开了吗？',
        cost: 0,
        type: '被动'
      },
      {
        talk: '现在后悔已经太晚了吧！',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 320,
    "level": "SR",
    "name": "一反木绵",
    cv: '三石琴乃',
    categories: ['鬼系', '女系'],
    skills: [
      {
        talk: '你无处可逃了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '这是命运的交织，你逃不掉的。',
        cost: 1,
        type: '主动'
      },
      {
        talk: '我会在你喷散而出的血液之中绽放。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 321,
    "level": "SR",
    "name": "入殓师",
    cv: '速水奖',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '为你的死亡施上粉墨。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '感受魂魄被一分为二的感觉吧。',
        cost: 2,
        type: '主动'
      },
      {
        talk: '织雪，连死亡也无法将我们分离。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 324,
    "level": "SR",
    "name": "化鲸",
    cv: '瀬戸麻沙美',
    categories: ['水系'],
    skills: [
      {
        talk: '妈妈跟我回家吧…',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '妈妈的力量会一直陪在我身边…',
        cost: 1,
        type: '主动'
      },
      {
        talk: '妈妈会保护我的…',
        cost: 1,
        type: '主动'
      },
    ]
  }, {
    "id": 217,
    "name": "大天狗",
    "level": "SSR",
    "isQuick": true,
    "isReal": true,
    cv: '前野智昭',
    categories: ['飞行系', '男系'],
    skills: [
      {
        talk: '风啊，听吾之命',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '见吾此羽者，死！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '将吾这风之力，铭记在心吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 219,
    "name": "酒吞童子",
    "level": "SSR",
    "isQuick": true,
    "isReal": true,
    cv: '阪口周平',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '这就是本大爷的实力，看好了！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '本大爷还要更多……更多！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '本大爷还会变得更强！哈哈哈！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 248,
    "name": "荒川之主",
    "level": "SSR",
    "isQuick": true,
    cv: '子安武人',
    categories: ['水系', '男系'],
    skills: [
      {
        talk: '没用的东西还是退出战场吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '逐流而上，往更高处去吧。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '没用的东西就该沉在黑漆漆的海底挣扎。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 255,
    "name": "阎魔",
    "level": "SSR",
    "isQuick": true,
    "isReal": true,
    cv: '能登麻美子',
    categories: ['飞行系', '鬼系', '女系'],
    skills: [
      {
        talk: '过来，把这碍事的家伙收拾了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '你的灵魂属于我了。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '屈服于我！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 258,
    "name": "两面佛",
    "level": "SSR",
    cv: '井上和彦',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '看风！不对，看雷！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '无论面向哪儿，都躲不开吾之愤怒！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '神罪连击！闪电，飓风，听吾召唤！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 259,
    "name": "小鹿男",
    "level": "SSR",
    "isReal": true,
    cv: '河西健吾',
    categories: ['动物系', '男系'],
    skills: [
      {
        talk: '接受来自森林的惩罚吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '生生不息，森林庇护。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '我的角无往不利！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 265,
    "name": "茨木童子",
    "level": "SSR",
    "isReal": true,
    cv: '福山润',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '呵，这样就足够解决你了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '敢伤害我的友人？那就做好觉悟吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '就让你见识我真正的力量，降临吧，地狱之手！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 266,
    "name": "青行灯",
    "level": "SSR",
    "isReal": true,
    cv: '水树奈奈',
    categories: ['飞行系', '女系'],
    skills: [
      {
        talk: '呵，这样你就能解脱了呢。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '那我就稍微帮帮你好了。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '懦弱的灵魂没有存在的意义，还是由我收下吧。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 269,
    "name": "妖刀姬",
    "level": "SSR",
    "isReal": true,
    cv: '井泽诗织',
    categories: ['女系'],
    skills: [
      {
        talk: '这把刀，正在呼唤我',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '抛却一切，斩断杂念吧。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '阻碍我的人，都必须……消灭。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 272,
    "name": "一目连",
    "level": "SSR",
    "isReal": true,
    cv: '绿川光',
    categories: ['男系'],
    skills: [
      {
        talk: '什么都不用怕，有我在。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我的子民就由我来保护。',
        cost: 3,
        type: '主动'
      },
      {
        talk: '龙啊，把你的力量借给我。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 279,
    "level": "SSR",
    "name": "花鸟卷",
    "isReal": true,
    cv: '早见沙织',
    categories: ['飞行系', '女系'],
    skills: [
      {
        talk: '要记得回来哦。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '画中之境，心中之景',
        cost: 0,
        type: '被动'
      },
      {
        talk: '莺燕相闻，花草相生。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 280,
    "level": "SSR",
    "name": "辉夜姬",
    "isReal": true,
    cv: '竹达彩奈',
    categories: ['飞行系', '女系'],
    skills: [
      {
        talk: '是谁……将我唤醒？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '好想回到那片竹林……',
        cost: 0,
        type: '被动'
      },
      {
        talk: '温柔的月光啊，请照亮我们。',
        cost: 2,
        type: '主动'
      },
    ]
  }, {
    "id": 294,
    "level": "SSR",
    "name": "奴良陆生",
    "interactive": true,
    cv: '福山润',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '好像…血液在沸腾…',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '滑头鬼是映于镜里之花浮于水中之月。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '我就是魑魅魍魉之主！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 283,
    "level": "SSR",
    "name": "荒",
    "isReal": true,
    cv: '平川大辅',
    categories: ['男系'],
    skills: [
      {
        talk: '命运的轨迹啊，改变吧！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '踏入我的领地，就要接受我的制裁！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '接受命运的惩罚吧！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 288,
    "level": "SSR",
    "name": "彼岸花",
    "isReal": true,
    cv: '大原沙耶香',
    categories: ['女系'],
    skills: [
      {
        talk: '你想成为我的花泥吗？',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '这诅咒的颜色偏偏又是最华丽的。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '我要让这片战场也变成彼岸花的花海。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 292,
    "level": "SSR",
    "name": "雪童子",
    cv: '井上麻里奈',
    categories: [],
    skills: [
      {
        talk: '记忆中好像从来没有活人…见到过这把刀。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '天…是要下雪了吗？是的…只要我想…',
        cost: 0,
        type: '被动'
      },
      {
        talk: '今晚月色好美，从前我总分外珍惜…',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 296,
    "level": "SSR",
    "name": "山风",
    cv: '增田俊树',
    categories: ['男系'],
    skills: [
      {
        talk: '刀上的血，就是我实力的证据。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我就是森林之王',
        cost: 0,
        type: '被动'
      },
      {
        talk: '终于到了复仇之时！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 300,
    "level": "SSR",
    "name": "玉藻前",
    cv: '朴璐美',
    categories: ['男系'],
    skills: [
      {
        talk: '这个世界上，所有人都有自己的秘密。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '看来必须惩罚你呢～',
        cost: 3,
        type: '主动'
      },
      {
        talk: '表面的美丽，往往让人忘记了危险。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 304,
    "level": "SSR",
    "name": "御馔津",
    cv: '川澄绫子',
    categories: ['女系'],
    skills: [
      {
        talk: '看到你的破绽了！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '和我一起，守护这片土地…',
        cost: 3,
        type: '主动'
      },
      {
        talk: '对不起，这…是我的使命！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 305,
    "level": "SSR",
    "interactive": true,
    "name": "卖药郎",
    cv: '樱井孝宏',
    categories: ['男系'],
    skills: [
      {
        talk: '妖怪得其形，将化为不该存在于世间之物。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '诸位得「真」与「理」，请仔细道来吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '释物之形，道物之真理。依凭「形」「真」「理」，退魔剑，',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 308,
    "level": "SSR",
    "name": "鬼灯",
    "interactive": true,
    cv: '安元洋贵',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '如果打上一架就能解决，就太好了。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '真烦啊……',
        cost: 0,
        type: '被动'
      },
      {
        talk: '既然是在地狱，就用暴力来解决吧。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 311,
    "level": "SSR",
    "name": "面灵气",
    cv: '花泽香菜',
    categories: ['女系'],
    skills: [
      {
        talk: '这是你丢失的痛苦…',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '苏醒的时刻到了。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '忘却一切，变回最初的白吧。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 312,
    "level": "SSR",
    "name": "鬼切",
    cv: '鸟海浩辅',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '人与鬼，从来没有共生的年代。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '吾名为鬼切，斩尽天下恶鬼之刃。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '听过刀鸣的声音吗？',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 313,
    "level": "SSR",
    "name": "犬夜叉",
    "interactive": true,
    cv: '山口胜平',
    categories: ['男系'],
    skills: [
      {
        talk: '风之伤！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '爆流破！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '铁碎牙！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 314,
    "level": "SSR",
    "name": "杀生丸",
    "interactive": true,
    cv: '成田剑',
    categories: ['男系'],
    skills: [
      {
        talk: '就让我的毒爪把你融化吧。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '结界·天生牙！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '爆碎牙！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 316,
    "level": "SSR",
    "name": "白藏主",
    cv: '小林大纪',
    categories: ['动物系'],
    skills: [
      {
        talk: '我是不会逃避的。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '不准伤害大家！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '有小白在，不会有事的！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 319,
    "level": "SSR",
    "name": "桔梗",
    cv: '日高法子',
    categories: ['女系'],
    skills: [
      {
        talk: '接下来，是你的头！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '我不会逃避，也不会躲藏。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '你只有死路一条！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 325,
    "level": "SSR",
    "name": "八岐大蛇",
    cv: '宫野真守',
    categories: [''],
    skills: [
      {
        talk: '我很感兴趣，人类。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '这是神之力，当然，会有代价。',
        cost: 0,
        wait: 1,
        type: '主动'
      },
      {
        talk: '神的掌心，逃得出去吗？',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 315,
    "level": "SP",
    "name": "少羽大天狗",
    cv: '白石凉子',
    categories: ['飞行系', '男系'],
    skills: [
      {
        talk: '风啊，请听命于我！',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '吾定必成为崇天高云最强之羽翼。',
        cost: 0,
        type: '被动'
      },
      {
        talk: '将这风之力，化作吾之利刃！',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 322,
    "level": "SP",
    "name": "炼狱茨木童子",
    cv: '福山润',
    categories: ['鬼系', '男系'],
    skills: [
      {
        talk: '呵，竟敢小看我。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '在这战意中颤抖吧！',
        cost: 0,
        type: '被动'
      },
      {
        talk: '不堪一击！',
        cost: 4,
        type: '主动'
      },
    ]
  }, {
    "id": 326,
    "level": "SP",
    "name": "稻荷神御馔津",
    cv: '川澄绫子',
    categories: [''],
    skills: [
      {
        talk: '以吾之铃，护此一方。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '吾所希冀的，是人类在阳光下得以安稳。',
        cost: 3,
        type: '主动'
      },
      {
        talk: '黑夜来临之际，希望依旧永存。',
        cost: 3,
        type: '主动'
      },
    ]
  }, {
    "id": 327,
    "level": "SP",
    "name": "苍风一目连",
    cv: '绿川光',
    categories: [''],
    skills: [
      {
        talk: '风之灭，如刃之坚。',
        cost: 0,
        type: '普攻'
      },
      {
        talk: '风之守，如心之固。',
        cost: 2,
        wait: 3,
        type: '主动'
      },
      {
        talk: '风尽为盾，风起为刃，仅在一念之间。',
        cost: 3,
        type: '主动'
      },
    ]
  }
];

function getShiShenData(id) {
    return ssData.find(function (item) {
        return item.id == id;
    })
}

// exports.data = ssData;
// exports.getDataById = getShiShenData;
