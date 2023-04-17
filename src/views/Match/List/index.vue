<template>
  <div class="layout-v layout-full">
    <el-form inline>
      <el-form-item>
        <el-date-picker :disabled-date="disabledDate" :shortcuts="shortcuts" start-placeholder="开始时间" end-placeholder="结束时间" type="daterange" v-model="state.form.date" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="包括">
        <el-select placeholder="包括该人员" v-model="state.form.includePlayer" clearable filterable>
          <el-option v-for="(item,index) in PlayerList" :key="index" :label="`${item.nickName}(${item.name})`" :value="item.nickName">
            {{item.nickName}}({{item.name}})
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="不包括">
        <el-select placeholder="不包括该人员" v-model="state.form.excludePlayer" clearable filterable>
          <el-option v-for="(item,index) in PlayerList" :key="index" :label="`${item.nickName}(${item.name})`" :value="item.nickName">
            {{item.nickName}}({{item.name}})
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-select placeholder="包括该英雄" v-model="state.form.hero" clearable filterable>
          <el-option v-for="(item,index) in HeroList" :key="index" :label="`${item.name_loc}(${item.name_english_loc})`" :value="item.name_loc">
            {{item.name_loc}}({{item.name_english_loc}})
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="选择比赛类型" v-model="state.form.matchType" clearable>
          <el-option v-for="(item,index) in MatchTypeList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="handleAdd" type="danger">配置比赛</el-button>
      </el-form-item> -->
    </el-form>
    <div class="gutter-v">共计{{dataSource.length}}场比赛</div>
    <el-table :data="dataSource" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="matchDate" label="比赛时间"></el-table-column>
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
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import getMatchList from '@/utils/matchList'
import { TeamIndex, MatchTypeList, PlayerList } from '@/CONST'
import HeroList from '@/CONST/hero'
import Player from '@/components/Player/index.vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const state = reactive({
  form: {
    date: '',
    includePlayer: '',
    excludePlayer: '',
    hero: '',
    matchType: ''
  }
})

const shortcuts = [
  {
    text: '今年',
    value: () => {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 0)
      return [start, end]
    }
  }
]
const disabledDate = (v) => {
  return dayjs(v) > dayjs()
}

const dataSource = computed(() => {
  return getMatchList().reverse().filter((match) => {
    if (state.form.date) {
      const isValid = dayjs(match.matchDate) >= dayjs(state.form.date[0]) && dayjs(match.matchDate) <= dayjs(state.form.date[1])
      if (!isValid) {
        return false
      }
    }
    if (state.form.includePlayer) {
      const isValid = match.matchTeamList.flat().find((item) => {
        return item.player === state.form.includePlayer
      })
      if (!isValid) {
        return false
      }
    }
    if (state.form.excludePlayer) {
      const isValid = match.matchTeamList.flat().find((item) => {
        return item.player === state.form.excludePlayer
      })
      if (isValid) {
        return false
      }
    }
    if (state.form.hero) {
      const isValid = match.gameList.some((game) => {
        return game.teamList.some((team) => {
          return team.heroList.find((item) => {
            return item.hero === state.form.hero
          })
        })
      })
      if (!isValid) {
        return false
      }
    }
    if (state.form.matchType) {
      if (match.matchType !== state.form.matchType) {
        return false
      }
    }
    return true
  }).map((item) => {
    const playOffScoreList = item.playOffScoreList.join(':')
    return {
      ...item,
      team1: item.matchTeamList[TeamIndex.Team1],
      team2: item.matchTeamList[TeamIndex.Team2],
      scoreList: item.scoreList.join(':'),
      playOffScoreList: playOffScoreList === '0:0' ? null : playOffScoreList
    }
  })
})

const router = useRouter()

// const handleAdd = () => {
//   router.push({
//     path: '/matchEdit'
//   })
// }

const handleView = (matchId) => {
  router.push({
    path: '/matchDetail',
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
