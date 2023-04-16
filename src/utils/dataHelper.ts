import { PlayerManagement } from './Player'
import { HeroManagement } from './Hero'
import { IgnoreAnalysisPlayerList } from '@/CONST'
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
    if (match.winTeamIndex === null) {
      match.matchTeamList.forEach((team) => {
        team.forEach((item) => {
          const player = playerManagement.getPlayer(item.player)
          player.setMatchDate(match.matchDate)
          player.drawMatch()
          player.drawOrder(item.order)
        })
      })
      // 平局
    } else {
      const loseMatchTeamIndex = getOpponentTeamIndex(match.winTeamIndex)
      const winMatchTeam = match.matchTeamList[match.winTeamIndex]
      const loseMatchTeam = match.matchTeamList[loseMatchTeamIndex]
      const winTeamPlayerList = winMatchTeam.map((item) => item.player)
      const loseTeamPlayerList = loseMatchTeam.map((item) => item.player)
      winMatchTeam.forEach((item) => {
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

export const getHeroDataFromMatch = (matchList) => {
  const heroManagement = new HeroManagement()
  matchList.forEach((match) => {
    match.gameList.forEach((game) => {
      const loseGameTeamIndex = getOpponentTeamIndex(game.winTeamIndex)
      const winGameTeam = game.teamList[game.winTeamIndex]
      const loseGameTeam = game.teamList[loseGameTeamIndex]
      winGameTeam.heroList.forEach((item) => {
        const hero = heroManagement.getHero(item.hero)
        hero.winGame(item.player)
      })
      loseGameTeam.heroList.forEach((item) => {
        const hero = heroManagement.getHero(item.hero)
        hero.loseGame(item.player)
      })
    })
  })
  return heroManagement
}

export const getLocationDataFromMatch = (matchList) => {
  const locationMap = {}
  matchList.forEach((match) => {
    match.gameList.forEach((game) => {
      const loseGameTeamIndex = getOpponentTeamIndex(game.winTeamIndex)
      const winGameTeam = game.teamList[game.winTeamIndex]
      const loseGameTeam = game.teamList[loseGameTeamIndex]
      if (!locationMap[winGameTeam.location]) {
        locationMap[winGameTeam.location] = {
          location: winGameTeam.location,
          count: 0,
          winCount: 0
        }
      }
      locationMap[winGameTeam.location].count += 1
      locationMap[winGameTeam.location].winCount += 1
      if (!locationMap[loseGameTeam.location]) {
        locationMap[loseGameTeam.location] = {
          location: loseGameTeam.location,
          count: 0,
          winCount: 0
        }
      }
      locationMap[loseGameTeam.location].count += 1
    })
  })
  return Object.values(locationMap)
}

export const parseMatchList = (matchList) => {
  const playerManagement = new PlayerManagement()
  const heroManagement = new HeroManagement()
  const locationMap = {}
  matchList.forEach((match) => {
    if (match.winTeamIndex === null) {
      match.matchTeamList.forEach((team) => {
        team.forEach((item) => {
          if (IgnoreAnalysisPlayerList.indexOf(item.player) > -1) return
          const player = playerManagement.getPlayer(item.player)
          player.setMatchDate(match.matchDate)
          player.drawMatch()
          player.drawOrder(item.order)
        })
      })
      // 平局
    } else {
      const loseMatchTeamIndex = getOpponentTeamIndex(match.winTeamIndex)
      const winMatchTeam = match.matchTeamList[match.winTeamIndex]
      const loseMatchTeam = match.matchTeamList[loseMatchTeamIndex]
      const winTeamPlayerList = winMatchTeam.map((item) => item.player).filter((item) => {
        return IgnoreAnalysisPlayerList.indexOf(item.player) === -1
      })
      const loseTeamPlayerList = loseMatchTeam.map((item) => item.player).filter((item) => {
        return IgnoreAnalysisPlayerList.indexOf(item.player) === -1
      })
      winMatchTeam.forEach((item) => {
        if (IgnoreAnalysisPlayerList.indexOf(item.player) > -1) return
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
    match.gameList.forEach((game) => {
      const loseGameTeamIndex = getOpponentTeamIndex(game.winTeamIndex)
      const winGameTeam = game.teamList[game.winTeamIndex]
      const loseGameTeam = game.teamList[loseGameTeamIndex]
      winGameTeam.heroList.forEach((item) => {
        if (IgnoreAnalysisPlayerList.indexOf(item.player) > -1) return
        const player = playerManagement.getPlayer(item.player)
        player.winGame()
        player.winLocation(winGameTeam.location)
        player.winHero(item.hero)
        const hero = heroManagement.getHero(item.hero)
        hero.winGame(item.player)
      })
      loseGameTeam.heroList.forEach((item) => {
        if (IgnoreAnalysisPlayerList.indexOf(item.player) > -1) return
        const player = playerManagement.getPlayer(item.player)
        player.loseGame()
        player.loseLocation(loseGameTeam.location)
        player.loseHero(item.hero)
        const hero = heroManagement.getHero(item.hero)
        hero.loseGame(item.player)
      })
      if (!locationMap[winGameTeam.location]) {
        locationMap[winGameTeam.location] = {
          location: winGameTeam.location,
          count: 0,
          winCount: 0
        }
      }
      locationMap[winGameTeam.location].count += 1
      locationMap[winGameTeam.location].winCount += 1
      if (!locationMap[loseGameTeam.location]) {
        locationMap[loseGameTeam.location] = {
          location: loseGameTeam.location,
          count: 0,
          winCount: 0
        }
      }
      locationMap[loseGameTeam.location].count += 1
    })
  })
  return {
    playerManagement,
    heroManagement,
    locationMap
  }
}
