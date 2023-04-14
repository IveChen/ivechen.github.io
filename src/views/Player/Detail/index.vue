<template>
  <div class="gutter-v page-header">
    <el-page-header @back="handleBack">
      <template #content>
        <Player :name="nickName" field="name"></Player>
      </template>
    </el-page-header>
  </div>
  <template v-if="player">
    <el-card header="基础数据" class="gutter-v">
      <el-descriptions column="4">
        <el-descriptions-item label="自述">
          <div class="color-info">
            {{player.info.desc || '--'}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="参赛率">
          <Percent :number1="player.matchCount" :number2="matchCount"></Percent>
        </el-descriptions-item>
        <el-descriptions-item label="使用英雄个数">
          <div>{{player.heroList.length}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="最后参赛时间" span="1">
          <div>{{player.lastMatchDate}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="比赛次数">
          <Percent :number1="player.matchWinCount" :number2="player.matchCount"></Percent>
        </el-descriptions-item>
        <el-descriptions-item label="比赛最长连胜">
          <div class="color-danger">{{player.maxMatchWinCount}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="比赛最长连败">
          <div class="color-success">{{player.maxMatchLoseCount}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="当前比赛状态">
          <div v-if="player.matchFormCount > 0" class="color-danger">{{player.matchFormCount}}连胜</div>
          <div v-if="player.matchFormCount < 0" class="color-success">{{Math.abs(player.matchFormCount)}}连败</div>
        </el-descriptions-item>
        <el-descriptions-item label="对局次数">
          <Percent :number1="player.gameWinCount" :number2="player.gameCount"></Percent>
        </el-descriptions-item>
        <el-descriptions-item label="对局最长连胜">
          <div class="color-danger">{{player.maxGameWinCount}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="对局最长连败">
          <div class="color-success">{{player.maxGameLoseCount}}</div>
        </el-descriptions-item>
        <el-descriptions-item label="当前对局状态">
          <div v-if="player.gameFormCount > 0" class="color-danger">{{player.gameFormCount}}连胜</div>
          <div v-if="player.gameFormCount < 0" class="color-success">{{Math.abs(player.gameFormCount)}}连败</div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card header="位置对局数据" class="gutter-v">
      <el-descriptions :column="2">
        <el-descriptions-item :label="item.location" v-for="(item,index) in player.locationList" :key="index">

          <Percent :number1="item.winCount" :number2="item.count"></Percent>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card :header="`英雄对局数据(共${heroList.length}个英雄)`" class="gutter-v">
      <el-descriptions>
        <el-descriptions-item :label="item.hero" v-for="(item,index) in heroList" :key="index">
          <template #label>
            <Hero :name="item.hero"></Hero>
          </template>
          <Percent :number1="item.winCount" :number2="item.count"></Percent>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card header="选马比赛数据" class="gutter-v">
      <el-descriptions>
        <el-descriptions-item :label="item.orderName" v-for="(item,index) in player.orderList" :key="index">
          <Percent :number1="item.winCount" :number2="item.count"></Percent>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card header="最佳队友" class="gutter-v" >
      <el-card :header="item.header" class="gutter-v" v-for="(item,index) in sameTeamMatchList" :key="index">
        <el-descriptions>
          <el-descriptions-item  v-for="(item,index) in item.list" :key="index">
            <template #label>
              {{item.playerList.join('')}}
            </template>
            <Percent :number1="item.winCount" :number2="item.count"></Percent>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-card>
    <el-card :header="`最惨对手(${nickName}赢的次数/作为对手的次数)`">
      <el-card :header="item.header" class="gutter-v" v-for="(item,index) in diffTeamMatchList" :key="index">
        <el-descriptions>
          <el-descriptions-item  v-for="(item,index) in item.list" :key="index">
            <template #label>
              {{item.playerList.join('')}}
            </template>
            <Percent :number1="item.winCount" :number2="item.count"></Percent>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-card>
  </template>
  <template v-else>
    <el-empty description="没有该人员的数据" />
  </template>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
import getMatchList from '@/utils/matchList'
// @ts-ignore
import { getPlayerDataFromMatch } from '@/utils/dataHelper'
import Player from '@/components/Player/index.vue'
import Percent from '@/components/Percent/index.vue'
import Hero from '@/components/Hero/index.vue'

const route = useRoute()
const router = useRouter()

const { nickName } = route.query

const matchList = getMatchList()
// 比赛场次
const matchCount = matchList.length

const playerManagement = getPlayerDataFromMatch(matchList)
const player = playerManagement.getPlayer(nickName)
const heroList = player.heroList.sort((a, b) => {
  return a.count < b.count ? 1 : -1
})
const getTeamList = (list, size) => {
  return list.filter((item) => {
    return item.playerList.length === size
  }).sort((a, b) => {
    return a.count < b.count ? 1 : -1
  })
}
const sameTeamMatchList = [
  {
    header: '队友1',
    list: getTeamList(player.sameTeamMatchList, 1)
  },
  {
    header: '队友2',
    list: getTeamList(player.sameTeamMatchList, 2)
  },
  {
    header: '队友3',
    list: getTeamList(player.sameTeamMatchList, 3)
  },
  {
    header: '队友4',
    list: getTeamList(player.sameTeamMatchList, 4)
  }
]

const diffTeamMatchList = [
  {
    header: '对手1',
    list: getTeamList(player.diffTeamMatchList, 1)
  },
  {
    header: '对手2',
    list: getTeamList(player.diffTeamMatchList, 2)
  },
  {
    header: '对手3',
    list: getTeamList(player.diffTeamMatchList, 3)
  },
  {
    header: '对手4',
    list: getTeamList(player.diffTeamMatchList, 4)
  },
  {
    header: '对手5',
    list: getTeamList(player.diffTeamMatchList, 5)
  }
]

const handleBack = () => {
  router.go(-1)
}
</script>
