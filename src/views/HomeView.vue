<template>
  <div class="gutter-v">
    <el-alert title="录入数据必然存在谬误和缺失，所以数据仅能作为参考，不能作为最终结论。您可点击上方查看已录入的比赛数据" type="error"></el-alert>
  </div>
  <el-row class="gutter-v">
    <el-col :span="6">
      <el-statistic title="参赛人数" :value="playerList.length" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="总上场英雄" :value="heroList.length" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="比赛次数" :value="matchCount" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="对局次数" :value="gameCount" />
    </el-col>
  </el-row>
  <el-card header="人员数据" class="gutter-v">
    <el-table :data="playerList">
      <el-table-column label="名字" prop="nickName" fixed="left">
      </el-table-column>
      <el-table-column label="参赛次数">
        <template #default="scope">
          <Percent :number1="scope.row.matchCount" :number2="matchCount"></Percent>
        </template>
      </el-table-column>
      <el-table-column label="参赛胜场">
        <template #default="scope">
          <Percent :number1="scope.row.matchWinCount" :number2="scope.row.matchCount"></Percent>
        </template>
      </el-table-column>
      <el-table-column label="使用英雄">
        <template #default="scope">
          {{scope.row.heroList.length}}
        </template>
      </el-table-column>
      <el-table-column label="最长连胜" prop="maxMatchWinCount">
      </el-table-column>
      <el-table-column label="最长连败" prop="maxMatchLoseCount">
      </el-table-column>
      <el-table-column label="当前状态">
        <template #default="scope">
          <div v-if="scope.row.matchFormCount > 0" class="color-danger">{{scope.row.matchFormCount}}连胜</div>
          <div v-if="scope.row.matchFormCount < 0" class="color-success">{{Math.abs(scope.row.matchFormCount)}}连败</div>
        </template>
      </el-table-column>
      <el-table-column label="最后参赛时间" prop="lastMatchDate">
      </el-table-column>
      <el-table-column label="">
        <template #default="scope">
          <el-button type="text" @click="handelGoPlayerDetail(scope.row.nickName)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-card header="英雄数据">
    <el-table :data="heroList" border stripe>
      <el-table-column label="英雄">
        <template #default="scope">
          <Hero :name="scope.row.name"></Hero>
        </template>
      </el-table-column>
      <el-table-column label="上场次数">
        <template #default="scope">
          <Percent :number1="scope.row.winCount" :number2="scope.row.count"></Percent>
        </template>
      </el-table-column>
      <el-table-column label="使用人员">
        <template #default="scope">
          <div class="layout-h" v-for="(item,index) in scope.row.playerList" :key="index">
            <span class="gutter-h">{{item.player}}</span><Percent :number1="item.winCount" :number2="item.count"></Percent>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, reactive, watch } from 'vue'
// @ts-ignore
import getMatchList from '@/utils/matchList'
// @ts-ignore
import { getPlayerDataFromMatch, getHeroDataFromMatch } from '@/utils/dataHelper'
import Percent from '@/components/Percent/index.vue'
import Hero from '@/components/Hero/index.vue'

const matchList = getMatchList()
// 比赛场次
const matchCount = matchList.length
// 对局场次
const gameCount = matchList.reduce((result, item) => {
  return result + item.gameList.length
}, 0)

const playerManagement = getPlayerDataFromMatch(matchList)

const playerList = playerManagement.playerList.sort((a, b) => {
  return a.maxMatchWinCount < b.maxMatchWinCount ? 1 : -1
})

const heroManagement = getHeroDataFromMatch(matchList)

const heroList = heroManagement.heroList.sort((a, b) => {
  return a.count < b.count ? 1 : -1
})

const router = useRouter()
const handelGoPlayerDetail = (nickName) => {
  router.push({
    path: '/playerDetail',
    query: {
      nickName
    }
  })
}
</script>
