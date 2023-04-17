<template>
  <div class="game-wrapper">
    <div class="team-info" :class="{
      winTeam: locationOneIndex === game.winTeamIndex,
      loseTeam: locationOneIndex === getOpponentTeamIndex(game.winTeamIndex)
    }">
      <div class="team-location">
        {{game.teamList[locationOneIndex].location}}
      </div>
      <div class="hero-list">
        <div class="hero-item" v-for="(heroObj,hindex) in game.teamList[locationOneIndex].heroList" :key="hindex">
          <div class="hero">
            <HeroAvatar :name="heroObj.hero"></HeroAvatar>
          </div>
          <div class="player">{{heroObj.player}}</div>
        </div>
      </div>
    </div>
    <div class="game-result-text">
      <div v-if="game.winTeamIndex === locationOneIndex">胜</div>
      <div v-else-if="game.winTeamIndex === locationTwoIndex">负</div>
      <div v-else>平</div>
    </div>
    <div class="team-info" :class="{
      winTeam: locationTwoIndex === game.winTeamIndex,
      loseTeam: locationTwoIndex === getOpponentTeamIndex(game.winTeamIndex)
    }">
      <div class="team-location">
        {{game.teamList[locationTwoIndex].location}}
      </div>
      <div class="hero-list">
        <div class="hero-item" v-for="(heroObj,hindex) in game.teamList[locationTwoIndex].heroList" :key="hindex">
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

const locationOneIndex = computed(() => {
  return props.game.teamList.findIndex((item) => {
    return item.location === TeamLocationList[0]
  })
})
const locationTwoIndex = computed(() => {
  return getOpponentTeamIndex(locationOneIndex.value)
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

  &.winTeam {
    background: rgba(103, 194, 58,0.1);
    box-shadow: inset 0 0 10px 0 #67c23a;
    border: 1px solid #67c23a;
  }
  &.loseTeam {
    background: rgba(245, 108, 108,0.1);
    box-shadow: inset 0 0 10px 0 #f56c6c;
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
