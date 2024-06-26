<template>
  <div class="layout-full layout-v">
    <GlobalMatchListFilter @submit="handleSubmit"></GlobalMatchListFilter>
    <div class="layout-fill container">
      <div class="gutter-v page-header">
        <el-page-header @back="handleBack">
          <template #content>
            <Player :name="nickName" class="gutter-h" field="name"></Player>
            <span class="color-info" v-if="player?.info?.desc">({{player?.info?.desc}})</span>
          </template>
        </el-page-header>
      </div>
      <template v-if="player">
        <el-card header="基础数据" class="gutter-v">
          <el-descriptions column="4">
            <el-descriptions-item label="参赛率">
              <Percent :number1="player.matchCount" :number2="matchCount"></Percent>
            </el-descriptions-item>
            <el-descriptions-item label="使用英雄个数">
              <div>{{player.heroList.length}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="第一场比赛时间">
              <div>{{player.firstMatchDate}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="最后比赛时间" span="1">
              <div>{{player.lastMatchDate}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="比赛次数">
              <Percent :number1="player.matchWinCount" :number2="player.matchCount"></Percent>
            </el-descriptions-item>
            <el-descriptions-item label="比赛最长连胜">
              <div class="color-success">{{player.maxMatchWinCount}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="比赛最长连败">
              <div class="color-danger">{{player.maxMatchLoseCount}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="当前比赛状态">
              <div v-if="player.matchFormCount > 0" class="color-success">{{player.matchFormCount}}连胜</div>
              <div v-if="player.matchFormCount === 0">平局</div>
              <div v-if="player.matchFormCount < 0" class="color-danger">{{Math.abs(player.matchFormCount)}}连败</div>
            </el-descriptions-item>
            <el-descriptions-item label="对局次数">
              <Percent :number1="player.gameWinCount" :number2="player.gameCount"></Percent>
            </el-descriptions-item>
            <el-descriptions-item label="对局最长连胜">
              <div class="color-success">{{player.maxGameWinCount}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="对局最长连败">
              <div class="color-danger">{{player.maxGameLoseCount}}</div>
            </el-descriptions-item>
            <el-descriptions-item label="当前对局状态">
              <div v-if="player.gameFormCount > 0" class="color-success">{{player.gameFormCount}}连胜</div>
              <div v-if="player.gameFormCount < 0" class="color-danger">{{Math.abs(player.gameFormCount)}}连败</div>
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
          <el-descriptions :column='5' class="hero-desc-list">
            <el-descriptions-item :label="item.hero" v-for="(item,index) in heroList" :key="index">
              <template #label>
                <HeroAvatar :name="item.hero"></HeroAvatar>
                <!-- <Hero :name="item.hero"></Hero> -->
              </template>
              <Percent :number1="item.winCount" :number2="item.count"></Percent>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card header="选马比赛数据" class="gutter-v">
          <el-descriptions>
            <el-descriptions-item :label="item.orderName" v-for="(item,index) in orderList" :key="index">
              <Percent :number1="item.winCount" :number2="item.count"></Percent>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="gutter-v" >
          <template #header>
            <div class="layout-h layout-align-center">
              <div class="gutter-h">最佳队友</div>
              <div class="layout-fill filter-selected">
                <el-select placeholder="筛选人员" v-model="state.form.player1" clearable filterable multiple>
                  <el-option v-for="(item,index) in PlayerList" :key="index" :label="`${item.nickName}(${item.name})`" :value="item.nickName">
                    {{item.nickName}}({{item.name}})
                  </el-option>
                </el-select>
              </div>
            </div>
          </template>
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
        <el-card>
          <template #header>
            <div class="layout-h layout-align-center">
              <div class="gutter-h">最惨对手({{nickName}}赢的次数/作为对手的次数)</div>
              <div class="layout-fill filter-selected">
                <el-select placeholder="筛选人员" v-model="state.form.player2" clearable filterable multiple>
                  <el-option v-for="(item,index) in PlayerList" :key="index" :label="`${item.nickName}(${item.name})`" :value="item.nickName">
                    {{item.nickName}}({{item.name}})
                  </el-option>
                </el-select>
              </div>
            </div>
          </template>
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
import { parseMatchList } from '@/utils/dataHelper'
import Player from '@/components/Player/index.vue'
import Percent from '@/components/Percent/index.vue'
import HeroAvatar from '@/components/HeroAvatar/index.vue'
import Hero from '@/components/Hero/index.vue'
import GlobalMatchListFilter from '@/components/GobalMatchListFilter/index.vue'
import { PlayerList } from '@/CONST'
import { computed, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const { nickName } = route.query

const state = reactive({
  matchList: [],
  form: {
    player1: [],
    player2: []
  }
})

const handleSubmit = (matchList) => {
  state.matchList = matchList
}

// 比赛场次
const matchCount = computed(() => {
  return state.matchList.length
})

const parsedData = computed(() => {
  return parseMatchList(state.matchList)
})

const player = computed(() => {
  const { playerManagement } = parsedData.value
  return playerManagement.getPlayer(nickName)
})
const orderList = computed(() => {
  const list = player.value.orderList
  return list.sort((a, b) => {
    if (a.count === b.count) {
      return a.winCount < b.winCount ? 1 : -1
    } else {
      return a.count < b.count ? 1 : -1
    }
  })
})
const heroList = computed(() => {
  const list = player.value.heroList
  return list.sort((a, b) => {
    if (a.count === b.count) {
      return a.winCount < b.winCount ? 1 : -1
    } else {
      return a.count < b.count ? 1 : -1
    }
  })
})

const getTeamList = (list, size) => {
  return list.filter((item) => {
    return item.playerList.length === size
  }).sort((a, b) => {
    if (a.count === b.count) {
      return a.winCount < b.winCount ? 1 : -1
    } else {
      return a.count < b.count ? 1 : -1
    }
  })
}

const filterList = (list, filterList) => {
  if (filterList?.length) {
    return list.filter((item) => {
      return item.playerList.some((player) => {
        return filterList.includes(player)
      })
    })
  }
  return list
}
const sameTeamMatchList = computed(() => {
  return [
    {
      header: '队友1',
      list: filterList(getTeamList(player.value.sameTeamMatchList, 1), state.form.player1)
    },
    {
      header: '队友2',
      list: filterList(getTeamList(player.value.sameTeamMatchList, 2), state.form.player1)
    },
    {
      header: '队友3',
      list: filterList(getTeamList(player.value.sameTeamMatchList, 3), state.form.player1)
    },
    {
      header: '队友4',
      list: filterList(getTeamList(player.value.sameTeamMatchList, 4), state.form.player1)
    }
  ]
})

const diffTeamMatchList = computed(() => {
  return [
    {
      header: '对手1',
      list: filterList(getTeamList(player.value.diffTeamMatchList, 1), state.form.player2)
    },
    {
      header: '对手2',
      list: filterList(getTeamList(player.value.diffTeamMatchList, 2), state.form.player2)
    },
    {
      header: '对手3',
      list: filterList(getTeamList(player.value.diffTeamMatchList, 3), state.form.player2)
    },
    {
      header: '对手4',
      list: filterList(getTeamList(player.value.diffTeamMatchList, 4), state.form.player2)
    },
    {
      header: '对手5',
      list: filterList(getTeamList(player.value.diffTeamMatchList, 5), state.form.player2)
    }
  ]
})

const handleBack = () => {
  router.go(-1)
}
</script>
<style lang="less" scoped>
.container {
  overflow: auto;
  :deep{
    .el-descriptions__label{
      display: inline-block;
    }
  }
}
.filter-selected {
  :deep {
    .el-select {
      width: 100%;
    }
  }
}
.hero-desc-list{
  :deep{
    .el-descriptions__content{
      display: inline-block;
    }
  }
}
</style>
