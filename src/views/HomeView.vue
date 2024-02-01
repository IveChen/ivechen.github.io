<template>
  <div class="layout-full layout-v">
    <GlobalMatchListFilter @submit="handleSubmit"></GlobalMatchListFilter>
    <div class="layout-fill container">
      <div class="gutter-v">
        <el-alert
          title="录入数据必然存在谬误和缺失，所以数据可作为参考，不能作为最终结论。感兴趣的比赛可前往b站/斗鱼scboy根据日期观看录像。"
          type="error"
        ></el-alert>
        <el-alert
          title="默认统计包含对黑和正赛，方便查看最新比赛情况，其他统计数据您可在上方选择比赛类型进行筛选。非加赛阶段换人，此二人不统计胜负。~~数据更新至2024年01月30日(次日或周末更新)"
          type="error"
        ></el-alert>
      </div>
      <el-card class="gutter-v">
        <el-row>
          <el-col :span="8">
            <el-statistic title="参赛人数" :value="playerList.length" />
          </el-col>
          <el-col :span="8">
            <el-statistic title="比赛次数" :value="matchCount" />
          </el-col>
          <el-col :span="8">
            <el-statistic
              :title="`上场英雄(总${HeroList.length})`"
              :value="heroList.length"
            />
          </el-col>
        </el-row>
      </el-card>
      <el-card class="gutter-v">
        <el-row>
          <el-col :span="6">
            <el-statistic title="对局次数" :value="gameCount" />
          </el-col>
          <el-col :span="6" v-for="(item, index) in locationList" :key="index">
            <el-statistic :title="`${item.location}获胜`" :value="item.winCount" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="先BAN获胜对局/总BP对局" class="ban-count">
              <template #prefix>
                <Percent
                  :number1="parsedData.bpFirstTeamWinCount"
                  :number2="parsedData.wcModelGameCount"
                ></Percent>
              </template>
            </el-statistic>
          </el-col>
        </el-row>
      </el-card>
      <el-card header="人员数据" class="gutter-v">
        <el-table :data="playerList">
          <el-table-column label="名字" prop="nickName" fixed="left">
          </el-table-column>
          <el-table-column label="参赛次数" prop="matchCount" sortable>
            <template #default="scope">
              <Percent
                :number1="scope.row.matchCount"
                :number2="matchCount"
              ></Percent>
            </template>
          </el-table-column>
          <el-table-column label="参赛胜场" prop="matchWinCount" sortable>
            <template #default="scope">
              <Percent
                :number1="scope.row.matchWinCount"
                :number2="scope.row.matchCount"
              ></Percent>
            </template>
          </el-table-column>
          <el-table-column label="使用英雄" sortable prop="heroList.length">
            <template #default="scope">
              <Percent
                :number1="scope.row.heroList.length"
                :number2="HeroList.length"
              ></Percent>
            </template>
          </el-table-column>
          <el-table-column label="最长连胜" prop="maxMatchWinCount" sortable>
          </el-table-column>
          <el-table-column label="最长连败" prop="maxMatchLoseCount" sortable>
          </el-table-column>
          <el-table-column label="当前状态" sortable prop="matchFormCount">
            <template #default="scope">
              <div v-if="scope.row.matchFormCount > 0" class="color-success">
                {{ scope.row.matchFormCount }}连胜
              </div>
              <div v-if="scope.row.matchFormCount === 0">平局</div>
              <div v-if="scope.row.matchFormCount < 0" class="color-danger">
                {{ Math.abs(scope.row.matchFormCount) }}连败
              </div>
            </template>
          </el-table-column>
          <el-table-column label="最后参赛时间" prop="lastMatchDate">
          </el-table-column>
          <el-table-column label="" width="80px">
            <template #default="scope">
              <el-button
                type="text"
                @click="handelGoPlayerDetail(scope.row.nickName)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card header="英雄数据">
        <el-table :data="heroList" border stripe>
          <el-table-column label="英雄" fixed="left" width="200px">
            <template #default="scope">
              <HeroAvatar :name="scope.row.name" :width="80" :height="60"></HeroAvatar>
            </template>
          </el-table-column>
          <el-table-column label="上场次数">
            <template #default="scope">
              <Percent
                :number1="scope.row.winCount"
                :number2="scope.row.count"
              ></Percent>
            </template>
          </el-table-column>
          <el-table-column label="使用人员" min-width="200px">
            <template #default="scope">
              <div
                class="layout-h"
                v-for="(item, index) in scope.row.playerList"
                :key="index"
              >
                <span class="gutter-h">{{ item.player }}</span
                ><Percent
                  :number1="item.winCount"
                  :number2="item.count"
                ></Percent>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="" width="80px">
            <template #default="scope">
              <el-button type="text" @click="handelGoHeroDetail(scope.row.name)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
// @ts-ignore
import { parseMatchList } from '@/utils/dataHelper'
import Percent from '@/components/Percent/index.vue'
import Hero from '@/components/Hero/index.vue'
import HeroAvatar from '@/components/HeroAvatar/index.vue'
import HeroList from '@/CONST/hero'
import GlobalMatchListFilter from '@/components/GobalMatchListFilter/index.vue'
import dayjs from 'dayjs'

const state = reactive({
  matchList: []
})

// 比赛场次
const matchCount = computed(() => {
  return state.matchList.length
})
// 对局场次
const gameCount = computed(() => {
  return state.matchList.reduce((result, item) => {
    return result + item.gameList.length
  }, 0)
})

const parsedData = computed(() => {
  return parseMatchList(state.matchList)
})

const handleSubmit = (matchList) => {
  state.matchList = matchList
}

const playerList = computed(() => {
  const { playerManagement } = parsedData.value
  return playerManagement.playerList.sort((a, b) => {
    if (a.lastMatchDate === b.lastMatchDate) {
      return a.matchFormCount < b.matchFormCount ? 1 : -1
    } else {
      return dayjs(a.lastMatchDate) < dayjs(b.lastMatchDate) ? 1 : -1
    }
  })
})
const heroList = computed(() => {
  const { heroManagement } = parsedData.value
  return heroManagement.heroList.sort((a, b) => {
    return a.count < b.count ? 1 : -1
  })
})
const locationList = computed(() => {
  const { locationMap } = parsedData.value
  return Object.values(locationMap)
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
const handelGoHeroDetail = (name) => {
  router.push({
    path: '/heroDetail',
    query: {
      name
    }
  })
}
</script>
<style lang="less" scoped>
.container {
  overflow: auto;
  :deep {
    .el-card {
      overflow: visible;
    }
    .el-table {
      overflow: visible;
    }
    .el-table__header-wrapper {
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .el-table__body-wrapper {
      z-index: 1;
    }
  }
}
.ban-count{
  :deep{
    .el-statistic__number{
      display: none;
    }
  }
}
</style>
