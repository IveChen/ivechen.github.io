// 参赛人员列表
// 女性的fullName暂时不写
export const PlayerList = [
  {
    fullName: '孙一峰',
    name: '孙哥',
    nickName: '孙'
  },
  {
    fullName: '黄旭东',
    name: '黄哥',
    nickName: '黄'
  },
  {
    fullName: '胡翔',
    name: 'Sed',
    nickName: '鹅',
    desc: '全靠我!!!无敌!!!'
  },
  {
    fullName: '??',
    name: '黑心喵',
    nickName: '喵'
  },
  {
    fullName: '??',
    name: '大肠',
    nickName: '肠'
  },
  {
    fullName: '??',
    name: '徐浩楠',
    nickName: '徐'
  },
  {
    fullName: '??',
    name: '貔貅',
    nickName: '王'
  },
  {
    fullName: '??',
    name: 'Momoko',
    nickName: '桃'
  },
  {
    fullName: '??',
    name: '夏一可',
    nickName: '鸽'
  },
  {
    fullName: '??',
    name: '赤小兔',
    nickName: '兔'
  },
  {
    fullName: '??',
    name: 'ams',
    nickName: '娟'
  },
  {
    fullName: '钱赞企',
    name: 'nostalie',
    nickName: '钱'
  },
  {
    fullName: '李培楠',
    name: '牛牛哥哥',
    nickName: '牛'
  },
  {
    fullName: '??',
    name: '马',
    nickName: '仔'
  },
  {
    fullName: '??',
    name: '大妖精',
    nickName: '妖'
  },
  {
    fullName: '??',
    name: 'dc老师',
    nickName: '灿'
  },
  {
    fullName: '??',
    name: '解释',
    nickName: '解'
  },
  {
    fullName: '??',
    name: '驴哥',
    nickName: '驴'
  },
  {
    fullName: '??',
    name: 'Eddie',
    nickName: '迪'
  },
  {
    fullName: '??',
    name: '法人',
    nickName: '法'
  },
  {
    fullName: '??',
    name: '惑小莎',
    nickName: '惑'
  },
  {
    fullName: '??',
    name: '超管',
    nickName: '超',
    infinite: true
  }
]

export const IgnoreAnalysisPlayerList = ['超', '惑']

// 选人模式 定员指跟队长一边
export const BPPlayerModeList = [
  '全部选马',
  '部定部选',
  '全部定员'
]
// 选人顺序列表
export const PlayerOrderList = [
  '队长1',
  '队长2',
  '一选',
  '二选',
  '三选',
  '四选',
  '五选',
  '六选',
  '七选',
  '八选',
  '固定'
]

export const PlayerOrderListForAnalysis = [
  '队长',
  '一选',
  '二选',
  '三选',
  '四选',
  '五选',
  '六选',
  '七选',
  '八选',
  '固定'
]
// 比赛类型
export const MatchTypeList = ['TICU正赛', '对黑']
// 比赛模式
export const MatchModeList = ['队长模式', '单一征召', '全英雄选择', '随机征召', '全英雄随机']
// 对局类型
export const GameTypeList = [
  '正常对局',
  '加赛'
]
// 地图位置
export const TeamLocationList = [
  '天辉',
  '夜魇'
]

export enum TeamIndex {
  Team1 = 0,
  Team2 = 1
}
// 队伍列表
export const TeamList = [
  {
    name: '队伍一',
    code: TeamIndex.Team1
  },
  {
    name: '队伍二',
    code: TeamIndex.Team2
  }
]
// 队伍一先ban先选
export const Team1BFPFList = ['0b', '1b', '0b', '1b', '0p', '1p', '1p', '0p', '0b', '1b', '0b', '1b', '0b', '1b', '1p', '0p', '0p', '1p', '0b', '1b', '0b', '1b', '0p', '1p']

// 队伍二先ban先选
export const Team2BFPFList = ['1b', '0b', '1b', '0b', '1p', '0p', '0p', '1p', '1b', '0b', '1b', '0b', '1b', '0b', '0p', '1p', '1p', '0p', '1b', '0b', '1b', '0b', '1p', '0p']
