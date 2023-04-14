import { PlayerManagement } from './Player'
import { getOpponentTeamIndex, combination } from './index'

const getTeammate = (playerList, player) => {
  return playerList.reduce((result, item) => {
    if (item !== player) {
      result.push(item)
    }
    return result
  }, [])
}

export const getPlayerDataFromMatch = (matchList) => {
  const playerManagement = new PlayerManagement()
  matchList.forEach((match) => {
    const loseMatchTeamIndex = getOpponentTeamIndex(match.winTeamIndex)
    const winMatchTeam = match.matchTeamList[match.winTeamIndex]
    const loseMatchTeam = match.matchTeamList[loseMatchTeamIndex]
    const winTeamPlayerList = winMatchTeam.map((item) => item.player)
    const loseTeamPlayerList = loseMatchTeam.map((item) => item.player)
    winMatchTeam.forEach((item) => {
      const player = playerManagement.getPlayer(item.player)
      player.winMatch()
      player.setLastMatchDate(match.matchDate)
      player.winOrder(item.order)
      const teammate = getTeammate(winTeamPlayerList, item.player)
      for (let i = 1; i <= 4; i++) {
        combination(teammate, i).forEach((item) => {
          player.winSameTeamMatch(item)
        })
      }
      for (let i = 1; i <= 5; i++) {
        combination(loseTeamPlayerList, i).forEach((item) => {
          player.winDiffTeamMatch(item)
        })
      }
    })
    loseMatchTeam.forEach((item) => {
      const player = playerManagement.getPlayer(item.player)
      player.setLastMatchDate(match.matchDate)
      player.loseMatch()
      player.loseOrder(item.order)
      const teammate = getTeammate(loseTeamPlayerList, item.player)
      for (let i = 1; i <= 4; i++) {
        combination(teammate, i).forEach((item) => {
          player.loseSameTeamMatch(item)
        })
      }
      for (let i = 1; i <= 5; i++) {
        combination(winTeamPlayerList, i).forEach((item) => {
          player.loseDiffTeamMatch(item)
        })
      }
    })
    match.gameList.forEach((game) => {
      const loseGameTeamIndex = getOpponentTeamIndex(game.winTeamIndex)
      const winGameTeam = game.teamList[game.winTeamIndex]
      const loseGameTeam = game.teamList[loseGameTeamIndex]
      winGameTeam.heroList.forEach((item) => {
        const player = playerManagement.getPlayer(item.player)
        player.winGame()
        player.winLocation(winGameTeam.location)
        player.winHero(item.hero)
      })
      loseGameTeam.heroList.forEach((item) => {
        const player = playerManagement.getPlayer(item.player)
        player.loseGame()
        player.loseLocation(loseGameTeam.location)
        player.loseHero(item.hero)
      })
    })
  })
  return playerManagement
}
