
export class Hero {
  count = 0 // 总使用次数
  winCount = 0 // 总获胜次数
  playerMap = {} // 使用数据
  banpickMap = {} // bp数据
  constructor (name) {
    this.name = name
  }

  // 使用的人员列表
  get playerList () {
    return Object.values(this.playerMap).sort((a, b) => {
      return a.count < b.count ? 1 : -1
    })
  }

  /** player使用该英雄获得胜利 */
  winGame (player, match, gameIndex) {
    this.count += 1
    this.winCount += 1
    if (!this.playerMap[player]) {
      this.playerMap[player] = {
        player,
        count: 0,
        winCount: 0,
        loseCacheList: [],
        winCacheList: []
      }
    }
    this.playerMap[player].count += 1
    this.playerMap[player].winCount += 1
    this.playerMap[player].winCacheList.push({
      match,
      gameIndex
    })
  }

  /** player使用该英雄输了 */
  loseGame (player, match, gameIndex) {
    this.count += 1
    if (!this.playerMap[player]) {
      this.playerMap[player] = {
        player,
        count: 0,
        winCount: 0,
        loseCacheList: [],
        winCacheList: []
      }
    }
    this.playerMap[player].count += 1
    this.playerMap[player].loseCacheList.push({
      match,
      gameIndex
    })
  }
}

export class HeroManagement {
  // 英雄名单
  heroMap = {}

  // 英雄列表
  get heroList () {
    return Object.values(this.heroMap)
  }

  // 获取英雄单例
  getHero (name) {
    if (!this.heroMap[name]) {
      this.heroMap[name] = new Hero(name)
    }
    return this.heroMap[name]
  }
}
