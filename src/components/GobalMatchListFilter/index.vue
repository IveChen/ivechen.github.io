<template>
  <el-form inline>
    <el-form-item>
      <el-date-picker :disabled-date="disabledDate"   :shortcuts="shortcuts" start-placeholder="开始时间" end-placeholder="结束时间" type="daterange" v-model="state.form.date" clearable></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-select placeholder="选择比赛类型" v-model="state.form.matchType" clearable>
        <el-option v-for="(item,index) in MatchTypeList" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 会有节奏，先放弃该功能 -->
    <!-- <el-form-item label="不包括">
      <el-select placeholder="不包括人员" v-model="state.form.excludePlayer" clearable filterable multiple style="width:250px">
        <el-option v-for="(item,index) in NoBalancePlayerList" :key="index" :label="item" :value="item">
          {{item}}
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <el-button @click="handleSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import { state } from './globalFilteData'
import getMatchList from '@/utils/matchList'
import { shortcuts } from '@/utils/commonConfig'
import { MatchTypeList } from '@/CONST'

const disabledDate = (v) => {
  return dayjs(v) > dayjs()
}

const getFilterMatchList = () => {
  return getMatchList().filter((match) => {
    if (state.form.date) {
      const isValid = dayjs(match.matchDate) >= dayjs(state.form.date[0]) && dayjs(match.matchDate) <= dayjs(state.form.date[1])
      if (!isValid) {
        return false
      }
    }
    if (state.form.matchType) {
      if (match.matchType !== state.form.matchType) {
        return false
      }
    }
    if (state.form.excludePlayer?.length) {
      const isValid = match.matchTeamList.flat().find((item) => {
        return state.form.excludePlayer.some((player) => {
          return item.player === player
        })
      })
      if (isValid) {
        return false
      }
    }
    return true
  })
}

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit', getFilterMatchList())
}
handleSubmit()
</script>
