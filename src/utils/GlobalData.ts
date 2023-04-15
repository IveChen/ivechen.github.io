import { TeamLocationList, PlayerOrderList } from '@/CONST/index'

/**
 * 通用对象型统计数据
 */
export class CustomObjectData {
  count = 0
  winCount = 0
  loseCount = 0
  drawCount = 0

  win () {
    this.count += 1
    this.winCount += 1
  }

  lose () {
    this.count += 1
    this.loseCount += 1
  }

  draw () {
    this.count += 1
    this.drawCount += 1
  }
}
/**
 * 通用数组型统计数据
 */
export class CustomArrayData {
  dataList = [] // 数据列表
  // 将多个数据聚合在一起
  formatNameFunc = (name) => {
    return name
  }

  constructor (list, formatNameFunc = null) {
    if (typeof formatNameFunc === 'function') {
      this.formatNameFunc = formatNameFunc
    }
    this.dataList = list.map((item) => {
      return {
        key: item,
        count: 0,
        winCount: 0,
        loseCount: 0,
        drawCount: 0
      }
    })
  }

  win (name) {
    const dataItem = this.getData(name)
    if (dataItem) {
      dataItem.count += 1
      dataItem.winCount += 1
    }
  }

  lose (name) {
    const dataItem = this.getData(name)
    if (dataItem) {
      dataItem.count += 1
      dataItem.loseCount += 1
    }
  }

  draw (name) {
    const dataItem = this.getData(name)
    if (dataItem) {
      dataItem.count += 1
      dataItem.drawCount += 1
    }
  }

  getData (name) {
    const realKeyName = this.formatNameFunc(name)
    return this.dataList.find((item) => {
      return item.key === realKeyName
    })
  }
}

export default class GlobalData {
  // 比赛次数
  matchCount = 0
  // 对局次数
  gameCount = 0
  // 对局地图位置数据
  locationData = new CustomArrayData(TeamLocationList)

  // 增加比赛
  addMatch () {
    this.matchCount += 1
  }

  // 增加比赛
  addGame () {
    this.gameCount += 1
  }

  // 添加对局
}
