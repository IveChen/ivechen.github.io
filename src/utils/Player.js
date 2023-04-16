import dayjs from 'dayjs'
import { PlayerList } from '@/CONST'

export class Player {
  firstMatchDate = null
  lastMatchDate = null
  matchCount = 0 // 参与比赛赛场次
  matchWinCount = 0 // 参与比赛赛胜利场次
  maxMatchWinCount = 0 // 最长比赛连胜
  maxMatchLoseCount = 0 // 最长比赛连败
  matchFormCount = 0 // 当前比赛竞技状态 小于0 连败  大于0 连胜
  gameCount = 0 // 参与对局场次
  gameWinCount = 0 // 参与对局胜利场次
  maxGameWinCount = 0 // 最长对局连胜
  maxGameLoseCount = 0 // 最长对局连败
  gameFormCount = 0 // 当前对局竞技状态 小于0 连败 大于0 连胜
  orderMap = {} // 选马位置统计数据 {[orderName]:{winCount,count}}
  heroMap = {} // 英雄统计数据 { [hero]:{usedCount,winCount }}
  locationMap = {} // 地图位置数据
  sameTeamMatchMap = {} // 与其他玩家一起的对抗数据
  diffTeamMatchMap = {} // 与其他玩家对家的对抗数据
  constructor (nickName) {
    this.nickName = nickName
  }

  get info () {
    return PlayerList.find((item) => {
      return item.nickName === this.nickName
    })
  }

  // 英雄列表
  get heroList () {
    return Object.values(this.heroMap)
  }

  // 地图位置列表
  get locationList () {
    return Object.values(this.locationMap)
  }

  // 同队数据
  get sameTeamMatchList () {
    return Object.values(this.sameTeamMatchMap)
  }

  // 对抗数据
  get diffTeamMatchList () {
    return Object.values(this.diffTeamMatchMap)
  }

  // 选马列表
  get orderList () {
    const list = Object.values(this.orderMap)
    const notCaptainList = list.filter((item) => {
      return item.orderName.indexOf('队长') === -1
    })
    const captainList = list.filter((item) => {
      return item.orderName.indexOf('队长') !== -1
    })
    if (captainList.length) {
      const captainObj = captainList.reduce((result, item) => {
        return {
          orderName: result.orderName,
          count: result.count + item.count,
          winCount: result.winCount + item.winCount,
          loseCount: result.loseCount + item.loseCount
        }
      }, {
        orderName: '队长',
        count: 0,
        winCount: 0,
        loseCount: 0
      })
      return [captainObj, ...notCaptainList]
    }
    return notCaptainList
  }

  setMatchDate (matchDate) {
    if (!matchDate) return
    if (!this.lastMatchDate) {
      this.lastMatchDate = matchDate
    } else if (dayjs(this.lastMatchDate) < dayjs(matchDate)) {
      this.lastMatchDate = matchDate
    }
    if (!this.firstMatchDate) {
      this.firstMatchDate = matchDate
    } else if (dayjs(this.firstMatchDate) > dayjs(matchDate)) {
      this.firstMatchDate = matchDate
    }
  }

  /** 赢一场比赛 */
  winMatch () {
    this.matchCount += 1
    this.matchWinCount += 1
    // 如果当前在连败状态，则更改状态为连胜1，否则连胜场次+1
    if (this.matchFormCount < 0) {
      this.matchFormCount = 1
    } else {
      this.matchFormCount += 1
    }
    // 连胜场次大于最长连胜时，更新最长连胜
    if (this.matchFormCount > this.maxMatchWinCount) {
      this.maxMatchWinCount = this.matchFormCount
    }
  }

  /** 平一场比赛 */
  drawMatch () {
    this.matchCount += 1
  }

  /** 输一场比赛 */
  loseMatch () {
    this.matchCount += 1
    // 如果当前在连败状态，则更改状态为连败1，否则连败场次+1
    if (this.matchFormCount > 0) {
      this.matchFormCount = -1
    } else {
      this.matchFormCount -= 1
    }
    // 连胜场次大于最长连胜时，更新最长连胜
    if (Math.abs(this.matchFormCount) > this.maxMatchLoseCount) {
      this.maxMatchLoseCount = Math.abs(this.matchFormCount)
    }
  }

  /** 赢一场对局 */
  winGame () {
    this.gameCount += 1
    this.gameWinCount += 1
    // 如果当前在连败状态，则更改状态为连胜1，否则连胜场次+1
    if (this.gameFormCount < 0) {
      this.gameFormCount = 1
    } else {
      this.gameFormCount += 1
    }
    // 连胜场次大于最长连胜时，更新最长连胜
    if (this.gameFormCount > this.maxGameWinCount) {
      this.maxGameWinCount = this.gameFormCount
    }
  }

  /** 输一场比赛 */
  loseGame () {
    this.gameCount += 1
    // 如果当前在连败状态，则更改状态为连败1，否则连败场次+1
    if (this.gameFormCount > 0) {
      this.gameFormCount = -1
    } else {
      this.gameFormCount -= 1
    }
    // 连胜场次大于最长连胜时，更新最长连胜
    if (Math.abs(this.gameFormCount) > this.maxGameLoseCount) {
      this.maxGameLoseCount = Math.abs(this.gameFormCount)
    }
  }

  // 在选马位置输一场
  winOrder (orderName) {
    if (!this.orderMap[orderName]) {
      this.orderMap[orderName] = {
        orderName,
        winCount: 0,
        loseCount: 0,
        count: 0
      }
    }
    this.orderMap[orderName].count += 1
    this.orderMap[orderName].winCount += 1
  }

  drawOrder (orderName) {
    if (!this.orderMap[orderName]) {
      this.orderMap[orderName] = {
        orderName,
        winCount: 0,
        loseCount: 0,
        count: 0
      }
    }
    this.orderMap[orderName].count += 1
  }

  // 在选马位置输一场
  loseOrder (orderName) {
    if (!this.orderMap[orderName]) {
      this.orderMap[orderName] = {
        orderName,
        winCount: 0,
        loseCount: 0,
        count: 0
      }
    }
    this.orderMap[orderName].count += 1
    this.orderMap[orderName].loseCount += 1
  }

  // 在地图某位置赢一场
  winLocation (location) {
    if (!this.locationMap[location]) {
      this.locationMap[location] = {
        location,
        winCount: 0,
        loseCount: 0,
        count: 0
      }
    }
    this.locationMap[location].count += 1
    this.locationMap[location].winCount += 1
  }

  // 在地图某位置赢一场
  loseLocation (location) {
    if (!this.locationMap[location]) {
      this.locationMap[location] = {
        location,
        winCount: 0,
        loseCount: 0,
        count: 0
      }
    }
    this.locationMap[location].count += 1
    this.locationMap[location].loseCount += 1
  }

  // 用某英雄赢一场
  winHero (hero) {
    if (!this.heroMap[hero]) {
      this.heroMap[hero] = {
        hero,
        winCount: 0,
        loseCount: 0,
        count: 0
      }
    }
    this.heroMap[hero].count += 1
    this.heroMap[hero].winCount += 1
  }

  // 用某英雄输一场
  loseHero (hero) {
    if (!this.heroMap[hero]) {
      this.heroMap[hero] = {
        hero,
        winCount: 0,
        loseCount: 0,
        count: 0
      }
    }
    this.heroMap[hero].count += 1
    this.heroMap[hero].loseCount += 1
  }

  // 作为队友赢了
  winSameTeamMatch (playerList) {
    playerList.sort()
    const key = playerList.join('')
    if (!this.sameTeamMatchMap[key]) {
      this.sameTeamMatchMap[key] = {
        playerList: playerList,
        winCount: 0,
        count: 0,
        loseCount: 0
      }
    }
    this.sameTeamMatchMap[key].count += 1
    this.sameTeamMatchMap[key].winCount += 1
  }

  // 作为队友输了
  loseSameTeamMatch (playerList) {
    playerList.sort()
    const key = playerList.join('')
    if (!this.sameTeamMatchMap[key]) {
      this.sameTeamMatchMap[key] = {
        playerList: playerList,
        winCount: 0,
        count: 0,
        loseCount: 0
      }
    }
    this.sameTeamMatchMap[key].count += 1
    this.sameTeamMatchMap[key].loseCount += 1
  }

  // 作为对手赢了
  winDiffTeamMatch (playerList) {
    playerList.sort()
    const key = playerList.join('')
    if (!this.diffTeamMatchMap[key]) {
      this.diffTeamMatchMap[key] = {
        playerList: playerList,
        winCount: 0,
        count: 0,
        loseCount: 0
      }
    }
    this.diffTeamMatchMap[key].count += 1
    this.diffTeamMatchMap[key].winCount += 1
  }

  // 作为对手输了
  loseDiffTeamMatch (playerList) {
    playerList.sort()
    const key = playerList.join('')
    if (!this.diffTeamMatchMap[key]) {
      this.diffTeamMatchMap[key] = {
        playerList: playerList,
        winCount: 0,
        count: 0,
        loseCount: 0
      }
    }
    this.diffTeamMatchMap[key].count += 1
    this.diffTeamMatchMap[key].loseCount += 1
  }
}

export class PlayerManagement {
  // 人员名单
  playerMap = {}

  // 人员列表
  get playerList () {
    return Object.values(this.playerMap)
  }

  // 获取人员单例
  getPlayer (nickName) {
    if (!this.playerMap[nickName]) {
      this.playerMap[nickName] = new Player(nickName)
    }
    return this.playerMap[nickName]
  }
}
