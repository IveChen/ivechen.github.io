<template>
  <div class="layout-full layout-v">
    <GlobalMatchListFilter @submit="handleSubmit"></GlobalMatchListFilter>
    <div class="layout-fill container">
      <div class="gutter-v page-header">
        <el-page-header @back="handleBack">
          <template #content>
            <div class="layout-h layout-align-center">
              <HeroAvatar :name="name" class="gutter-h"></HeroAvatar>
              <span class="gutter-h">{{name}}</span>
              <Percent :number1="hero.winCount" :number2="hero.count"></Percent>
            </div>
          </template>
        </el-page-header>
      </div>
      <div class="player-list">
        <el-card  v-for="(item,index) in hero.playerList" :key="index" class="gutter-v">
          <template #header>
            <div class="layout-h">
              <span class="gutter-h">{{item.player}}</span><Percent :number1="item.winCount" :number2="item.count"></Percent>
            </div>
          </template>

          <el-collapse accordion>
            <el-collapse-item :title="`胜利(${item.winCacheList?.length})`" class="gutter-v" v-if="item.winCacheList?.length">
              <div class="game-item" v-for="(cacheItem,cindex) in sortGameList(item.winCacheList)" :key="cindex">
                <div class="title">
                  <router-link :to="{path:'/matchDetail',query:{matchId:cacheItem.match.id}}">{{cacheItem.match.matchDate}} {{cacheItem.match.matchType}} 第{{cacheItem.gameIndex + 1}}局</router-link>
                </div>
                <div class="game">
                  <GamePanel :game="cacheItem.match.gameList[cacheItem.gameIndex]"></GamePanel>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="`失败(${item.loseCacheList?.length})`"  v-if="item.loseCacheList?.length">
              <div class="game-item" v-for="(cacheItem,cindex) in sortGameList(item.loseCacheList)" :key="cindex">
                <div class="title">
                  <router-link :to="{path:'/matchDetail',query:{matchId:cacheItem.match.id}}">{{cacheItem.match.matchDate}} {{cacheItem.match.matchType}} 第{{cacheItem.gameIndex + 1}}局</router-link>
                </div>
                <div class="game">
                  <GamePanel :game="cacheItem.match.gameList[cacheItem.gameIndex]"></GamePanel>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
import getMatchList from '@/utils/matchList'
// @ts-ignore
import { parseMatchList } from '@/utils/dataHelper'
import Player from '@/components/Player/index.vue'
import GamePanel from '@/components/GamePanel/index.vue'
import Percent from '@/components/Percent/index.vue'
import HeroAvatar from '@/components/HeroAvatar/index.vue'
import GlobalMatchListFilter from '@/components/GobalMatchListFilter/index.vue'
import { PlayerList } from '@/CONST'
import { computed, reactive } from 'vue'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()

const { name } = route.query

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

const hero = computed(() => {
  const { heroManagement } = parsedData.value
  return heroManagement.getHero(name)
})

const sortGameList = (list) => {
  list.sort((a, b) => {
    return dayjs(a.match.matchDate) < dayjs(b.match.matchDate) ? 1 : -1
  })
  return list
}

const handleBack = () => {
  router.go(-1)
}
</script>
<style lang="less" scoped>
.container {
  overflow: auto;
}
.filter-selected {
  :deep {
    .el-select {
      width: 100%;
    }
  }
}
.game-item {
  padding: 10px 0;
  margin-bottom: 10px;
  .title {
    margin-bottom: 10px;
    font-size: 16px;
    text-align: center;
  }
}
.player-list {
  :deep {
    .el-card {
      overflow: visible;
    }
    .el-card__header {
      position: sticky;
      top: 0;
      background: #fff;
    }
  }
}
</style>
