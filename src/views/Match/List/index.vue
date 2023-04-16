<template>
  <el-form>
    <el-form-item>
      <el-button @click="handleAdd">配置比赛</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataSource" border stripe>
    <el-table-column prop="matchDate" label="比赛时间" fixed="left"></el-table-column>
    <el-table-column prop="matchType" label="比赛类型"></el-table-column>
    <el-table-column prop="matchMode" label="比赛模式"></el-table-column>
    <el-table-column label="结果" width="400px">
      <template #default="scope">
        <div class="layout-h">
          <div class="layout-h">
            <Player v-for="(item,index) in scope.row.team1" :key="index" :name="item.player"></Player>
          </div>
          <div class="score">
            <div>{{scope.row.scoreList}}</div>
            <div v-if="scope.row.playOffScoreList" class="play-off-score">{{scope.row.playOffScoreList}}</div>
          </div>
          <div class="layout-h">
            <Player v-for="(item,index) in scope.row.team2" :key="index" :name="item.player"></Player>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="text" @click="handleView(scope.row.id)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import getMatchList from '@/utils/matchList'
import { TeamIndex } from '@/CONST'
import Player from '@/components/Player/index.vue'
import { useRouter } from 'vue-router'

const dataSource = computed(() => getMatchList().reverse().map((item) => {
  const playOffScoreList = item.playOffScoreList.join(':')
  return {
    ...item,
    team1: item.matchTeamList[TeamIndex.Team1],
    team2: item.matchTeamList[TeamIndex.Team2],
    scoreList: item.scoreList.join(':'),
    playOffScoreList: playOffScoreList === '0:0' ? null : playOffScoreList
  }
}))

const router = useRouter()

const handleAdd = () => {
  router.push({
    path: '/matchEdit'
  })
}

const handleView = (matchId) => {
  router.push({
    path: '/matchEdit',
    query: {
      matchId
    }
  })
}
</script>
<style lang="less" scoped>
.score {
  margin: 0 40px;
  .play-off-score {
    position: relative;
    &::after {
      content: '( 加赛 )';
      position: absolute;
      color: #999;
      font-size: 12px;
      white-space: nowrap;
    }
  }
}
</style>
