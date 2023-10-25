import { PlayerManagement } from './Player'
import { HeroManagement } from './Hero'
import { IgnoreAnalysisPlayerList } from '@/CONST'
import { getOpponentTeamIndex, combination } from './index'

const getTeammate = (playerList, player) => {
  return playerList.reduce((result, item) => {
    if (item !== player && item !== 'X' && item !== 'Y') {
      result.push(item)
    }
    return result
  }, [])
}

const checkPlayerIsValid = (player) => {
  return (
    IgnoreAnalysisPlayerList.indexOf(player) === -1 &&
    player !== 'X' &&
    player !== 'Y'
  )
}

export const parseMatchList = (matchList) => {
  const playerManagement = new PlayerManagement()
  const heroManagement = new HeroManagement()
  const locationMap = {
    天辉: 0,
    夜魇: 0
  }
  let wcModelGameCount = 0
  let bpFirstTeamWinCount = 0
  matchList.forEach((match) => {
    if (match.winTeamIndex === null) {
      // 平局
      match.realMatchTeamList.forEach((team) => {
        team.forEach((item) => {
          if (!checkPlayerIsValid(item.player)) return
          const player = playerManagement.getPlayer(item.player)
          player.setMatchDate(match.matchDate)
          player.drawMatch()
          player.drawOrder(item.order)
        })
      })
    } else {
      const loseMatchTeamIndex = getOpponentTeamIndex(match.winTeamIndex)
      const winMatchTeam = match.realMatchTeamList[match.winTeamIndex]
      const loseMatchTeam = match.realMatchTeamList[loseMatchTeamIndex]
      const winTeamPlayerList = winMatchTeam
        .map((item) => item.player)
        .filter((item) => {
          return checkPlayerIsValid(item.player)
        })
      const loseTeamPlayerList = loseMatchTeam
        .map((item) => item.player)
        .filter((item) => {
          return checkPlayerIsValid(item.player)
        })
      winMatchTeam.forEach((item) => {
        if (!checkPlayerIsValid(item.player)) return
        const player = playerManagement.getPlayer(item.player)
        player.winMatch()
        player.setMatchDate(match.matchDate)
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
        if (IgnoreAnalysisPlayerList.indexOf(item.player) > -1) return
        const player = playerManagement.getPlayer(item.player)
        player.setMatchDate(match.matchDate)
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
    }
    match.gameList.forEach((game, gameIndex) => {
      if (match.matchMode === '队长模式') {
        wcModelGameCount += 1
        if (game.bpFirstTeamIndex === game.winTeamIndex) {
          bpFirstTeamWinCount += 1
        }
      }
      const loseGameTeamIndex = getOpponentTeamIndex(game.winTeamIndex)
      const winGameTeam = game.teamList[game.winTeamIndex]
      const loseGameTeam = game.teamList[loseGameTeamIndex]
      winGameTeam.heroList.forEach((item) => {
        if (IgnoreAnalysisPlayerList.indexOf(item.player) > -1) return
        const player = playerManagement.getPlayer(item.player)
        player.winGame()
        player.setMatchDate(match.matchDate)
        player.winLocation(winGameTeam.location)
        player.winHero(item.hero)
        const hero = heroManagement.getHero(item.hero)
        hero.winGame(item.player, match, gameIndex)
      })
      loseGameTeam.heroList.forEach((item) => {
        if (IgnoreAnalysisPlayerList.indexOf(item.player) > -1) return
        const player = playerManagement.getPlayer(item.player)
        player.loseGame()
        player.setMatchDate(match.matchDate)
        player.loseLocation(loseGameTeam.location)
        player.loseHero(item.hero)
        const hero = heroManagement.getHero(item.hero)
        hero.loseGame(item.player, match, gameIndex)
      })
      if (winGameTeam.location) {
        if (!locationMap[winGameTeam.location]) {
          locationMap[winGameTeam.location] = {
            location: winGameTeam.location,
            count: 0,
            winCount: 0
          }
        }
        locationMap[winGameTeam.location].count += 1
        locationMap[winGameTeam.location].winCount += 1
      }
      if (loseGameTeam.location) {
        if (!locationMap[loseGameTeam.location]) {
          locationMap[loseGameTeam.location] = {
            location: loseGameTeam.location,
            count: 0,
            winCount: 0
          }
        }
        locationMap[loseGameTeam.location].count += 1
      }
    })
  })
  return {
    playerManagement,
    heroManagement,
    locationMap,
    wcModelGameCount,
    bpFirstTeamWinCount
  }
}
