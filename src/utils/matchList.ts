/* eslint-disable */
import dayjs from 'dayjs'
import md5 from 'md5'

const files = require.context('../dataSource', true, /\.json$/)

const matchList = []

const handleMatchData = (match) => {
  let gameCount = 0
  let playOffGameCount = 0
  const gamePlayerList = [[], []]
  const playOffGamePlayerList = [[], []]
  match.gameList.forEach((game) => {
    game.teamList.forEach((team, teamIndex) => {
      team.heroList.forEach((item) => {
        if (game.gameType === '正常对局') {
          gamePlayerList[teamIndex].push(item.player)
        }
        if (game.gameType === '加赛') {
          playOffGamePlayerList[teamIndex].push(item.player)
        }
      })
    })
    if (game.gameType === '正常对局') {
      gameCount += 1
    }
    if (game.gameType === '加赛') {
      playOffGameCount += 1
    }
  })
  match.realMatchTeamList = match.matchTeamList.map((team, index) => {
    return team.map((item) => {
      if (gamePlayerList[index].filter((player) => {
        return player === item.player
      }).length === gameCount) {
        return item
      } else {
        return {
          player: index === 0 ? 'X' : 'Y',
          order: item.order,
          replace: true
        }
      }
    })
  })
  match.gameCount = gameCount
  match.playOffGameCount = playOffGameCount
  return match
}

files.keys().forEach((key) => {
  const id = md5(key)
  const match = files(key)
  match.id = id
  handleMatchData(match)
  matchList.push(match)
})
// 日期从小到大排列
matchList.sort((a, b) => {
  return dayjs(a.matchDate) > dayjs(b.matchDate) ? 1 : -1
})
export default () => {
  // 深复制，防止修改
  return JSON.parse(JSON.stringify(matchList))
}
