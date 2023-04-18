<template>
  <div class="game-wrapper">
    <div class="team-info" :class="{
      winTeam: team.isWin,
      loseTeam: team.isLose
    }" v-for="(team,index) in gameList" :key="index">
      <div class="team-location">
        <span>{{team.location}}</span>
          <span v-if="team.isWin">(胜利)</span>
          <span v-if="team.isLose">(失败)</span>
      </div>
      <div class="hero-list">
        <div class="hero-item" v-for="(heroObj,hindex) in team.heroList" :key="hindex">
          <div class="hero">
            <HeroAvatar :name="heroObj.hero"></HeroAvatar>
          </div>
          <div class="player">{{heroObj.player}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TeamLocationList } from '@/CONST'
import { computed } from 'vue'
import HeroAvatar from '@/components/HeroAvatar/index.vue'
import { getOpponentTeamIndex } from '@/utils/index'

const props = defineProps({
  game: {
    type: Object,
    default: null
  }
})

const gameList = computed(() => {
  const list = props.game.teamList.map((team, index) => {
    return {
      originIndex: index,
      isWin: props.game.winTeamIndex === index,
      isLose: props.game.winTeamIndex === getOpponentTeamIndex(index),
      ...team
    }
  })
  list.sort((a, b) => {
    return TeamLocationList.indexOf(a.location) > TeamLocationList.indexOf(b.location) ? 1 : -1
  })
  return list
})
</script>
<style lang="less" scoped>
.game-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.game-result-text {
  margin: 0 20px;
  font-size: 20px;
}
.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 10px;
  &:nth-child(1) {
    margin-right: 10px;
  }

  &.winTeam {
    // background: rgba(103, 194, 58,0.1);
    box-shadow: inset 0 0 10px 0 rgba(103, 194, 58,0.5);
    border: 1px solid #67c23a;
  }
  &.loseTeam {
    // background: rgba(245, 108, 108,0.1);
    box-shadow: inset 0 0 10px 0 rgba(245, 108, 108,0.5);
    border: 1px solid #f56c6c;
  }
}
.hero-list {
  display: flex;
  text-align: center;
  .hero-item {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  .player {
    font-size: 14px;
  }
}
</style>
