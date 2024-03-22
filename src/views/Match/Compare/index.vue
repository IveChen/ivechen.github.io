<template>
  <div class="layout-full layout-v container">
    <GlobalMatchListFilter @submit="handleSubmit" :hasTimeRange="false">
    </GlobalMatchListFilter>
    <div class="player-selector">
      <el-form>
        <el-form-item label="选择展示参赛选手">
          <el-select
            multiple
            v-model="state.selectedPlayer"
            @remove-tag="handleRemoveTag"
          >
            <el-option
              v-for="(item, index) in PlayerList"
              :label="item.nickName"
              :value="item.nickName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="match-result layout-fill">
      <el-table :data="state.tableData" stripe border>
        <el-table-column
          prop="itemName"
          label="项"
          fixed="left"
        ></el-table-column>
        <el-table-column
          v-for="(nickName, index) in state.selectedPlayer"
          :key="index"
          :label="nickName"
          align="center"
        >
          <el-table-column
            v-for="(yearItem, yindex) in state.yearList"
            :key="yindex"
            :label="`${yearItem}年`"
            align="center"
          >
            <template #default="scope">
              {{ getColumnData(nickName, yearItem, scope.row.prop) }}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
// @ts-ignore
import { parseMatchList } from '@/utils/dataHelper'
import GlobalMatchListFilter from '@/components/GobalMatchListFilter/index.vue'
import { PlayerList } from '@/CONST'
import dayjs from 'dayjs'

const state = reactive({
  matchList: [],
  yearList: [],
  yearlyData: {},
  selectedPlayer: ['孙', '黄'],
  tableData: [
    {
      itemName: '比赛胜率',
      prop: 'rate'
    },
    {
      itemName: '比赛胜场',
      prop: 'matchWinCount'
    },
    {
      itemName: '比赛场次',
      prop: 'matchCount'
    },
    {
      itemName: '最长连胜',
      prop: 'maxMatchWinCount'
    },
    {
      itemName: '最长连败',
      prop: 'maxMatchLoseCount'
    },
    {
      itemName: '使用最多英雄',
      prop: 'headFiveHero'
    }
  ]
})

const yearStart = 2022
const yearEnd = new Date().getFullYear()

const parseYearlyData = () => {
  const yearList = []
  const yearlyData = {}
  for (let i = yearStart; i <= yearEnd; i++) {
    yearList.push(i)
    const yearlyMatch = state.matchList.filter((item) => {
      return item.matchDate.indexOf(i) > -1
    })
    yearlyData[i] = parseMatchList(yearlyMatch)
  }
  state.yearList = yearList
  state.yearlyData = yearlyData
}

const handleSubmit = (matchList) => {
  state.matchList = matchList
  parseYearlyData()
}
const percent = (number1, number2) => {
  const result = (number1 / number2) * 100
  if (!isNaN(result) && number2 !== 0) {
    return result.toFixed(2)
  }
  return '-'
}
const getColumnData = (nickName, year, field) => {
  if (state.yearlyData[year]) {
    if (
      state.yearlyData[year].playerManagement &&
      state.yearlyData[year].playerManagement.playerMap[nickName]
    ) {
      const playerYearlyData =
        state.yearlyData[year].playerManagement.playerMap[nickName]
      if (field === 'rate') {
        return `${percent(
          playerYearlyData.matchWinCount,
          playerYearlyData.matchCount
        )}%`
      }
      if (field === 'matchCount') {
        return playerYearlyData.matchCount
      }
      if (field === 'matchWinCount') {
        return playerYearlyData.matchWinCount
      }
      if (field === 'maxMatchWinCount') {
        return playerYearlyData.maxMatchWinCount
      }
      if (field === 'maxMatchLoseCount') {
        return playerYearlyData.maxMatchLoseCount
      }
      if (field === 'headFiveHero') {
        const heroList = Object.values(playerYearlyData.heroMap)
        heroList.sort((a, b) => {
          return a.count < b.count ? 1 : -1
        })
        return heroList
          .slice(0, 5)
          .map((item, index) => {
            return `${item.hero} - ${item.winCount}/${
              item.count
            }(${percent(item.winCount, item.count)}%)`
          })
          .join('\n')
      }
    }
  }
  return '--'
}
</script>
<style lang="less" scoped>
.container {
  overflow: auto;
  .player-selector {
    :deep {
      .el-select {
        width: 100%;
      }
    }
  }
  :deep {
    .cell {
      white-space: pre-line;
    }
  }
}
</style>
