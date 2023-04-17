<template>
  <div class="layout-v" v-if="state.match">
    <div class="gutter-v page-header">
      <el-page-header @back="handleBack">
        <template #content>
          比赛详情
        </template>
      </el-page-header>
    </div>
    <div class="gutter-v">
      <el-alert type="error" title="加赛不会影响结果。选马方式中，全部定员值人员分队是事先确定的，全部选马表示人员是通过队长选取。部定部选指部分人员商定必须在同一支队伍"></el-alert>
    </div>
    <el-card header="基础信息" class="gutter-v">
      <el-descriptions column="4">
        <el-descriptions-item label="比赛日期">
          <div>{{state.match.matchDate}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="比赛类型">
          <div>{{state.match.matchType}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="比赛模式">
          <div>{{state.match.matchMode}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="选马方式">
          <div>{{state.match.matchMemberBPMode}}</div>
        </el-descriptions-item>
        <el-descriptions-item :span="4" label="备注" v-if="state.match.matchRemark">
          <div>{{state.match.matchRemark}}</div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card header="比赛结果" class="gutter-v match-result-card">
      <div class="result-wrapper">
        <div class="team-info" v-for="(team,index) in state.match.matchTeamList" :key="index" :class="{
          'winTeam':index === state.match.winTeamIndex,
          'loseTeam':index === getOpponentTeamIndex(state.match.winTeamIndex)
        }">
          <div class="player-box" v-for="(playerObj,pindex) in team" :key="pindex">
            <div class="player">{{playerObj.player}}</div>
            <div class="order">{{playerObj.order}}</div>
          </div>
        </div>
        <div class="match-result">
          <div class="match-score">
            <div v-for="(item,index) in state.match.scoreList" :key="index" class="score-item">{{item}}</div>
            <div class="game-type">
              <div class="match-result-text">
                <div v-if="state.match.winTeamIndex === 0">胜</div>
                <div v-else-if="state.match.winTeamIndex === 1">负</div>
                <div v-else>平</div>
              </div>
            </div>
          </div>
          <div class="match-score" v-if="state.match.playOffScoreList[0] !== 0 || state.match.playOffScoreList[1] !== 0">
            <div v-for="(item,index) in state.match.playOffScoreList" :key="index" class="score-item">{{item}}</div>
            <div class="game-type">加赛</div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card header="比赛过程" class="gutter-v">
      <el-card v-for="(game,index) in state.match.gameList" :key="index" class="gutter-v">
        <template #header>
          <div v-if="game.gameType === '加赛'">加赛</div>
          <div v-else>正赛{{index+1}}</div>
        </template>
        <GamePanel :game="game"></GamePanel>
      </el-card>
    </el-card>
    <div class="buttons">
      <el-button type="danger" @click="handleGoEdit">查看比赛配置</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import getMatchList from '@/utils/matchList'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getOpponentTeamIndex } from '@/utils/index'
import GamePanel from '@/components/GamePanel/index.vue'

const route = useRoute()
const { matchId } = route.query

const state = reactive({
  match: null
})

const initData = () => {
  state.match = getMatchList().find((item) => {
    return item.id === matchId
  })
}
initData()

const router = useRouter()
const handleBack = () => {
  router.go(-1)
}
const handleGoEdit = () => {
  router.push({
    path: '/matchEdit',
    query: {
      matchId
    }
  })
}
</script>
<style lang="less" scoped>
.result-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.match-result-card {
  position: sticky;
  top: -20px;
}
.team-info {
  display: flex;
  padding: 10px 12px;
  text-align: center;
  border: 1px  solid #ccc;
  .player-box {
    padding: 0 5px;
  }
  .order {
    color: #666;
    font-size: 12px;
  }
  &:nth-child(1) {
    order: 1;
  }
  &:nth-child(2) {
    order: 3;
  }
  &.winTeam {
    background: rgba(103, 194, 58,0.1);
    box-shadow: inset 0 0 10px 0 #67c23a;
    border-color: #67c23a;
  }
  &.loseTeam {
    background: rgba(245, 108, 108,0.1);
    box-shadow: inset 0 0 10px 0 #f56c6c;
    border-color: #f56c6c;
  }
}
.match-result {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  order: 2;
  margin: 0 30px;
}
.match-result-text {
  color: #000;
  font-size: 20px;
  text-align: center;
}
.match-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  font-size: 14px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }
  .score-item {
    &:nth-child(1) {
      order: 1;
    }
    &:nth-child(2) {
      order: 3;
    }
  }
  .game-type {
    order: 2;
    color: #999;
    font-size: 12px;
    font-weight: normal;
  }
}
.buttons {
  text-align: center;
}
</style>
