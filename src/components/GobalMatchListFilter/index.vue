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
    <el-form-item>
      <el-button @click="handleSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import { reactive, watch } from 'vue'
import { state } from './globalFilteData'
import { MatchTypeList } from '@/CONST'
import getMatchList from '@/utils/matchList'
import { parseMatchList } from '@/utils/dataHelper'

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
    return true
  })
}

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit', getFilterMatchList())
}
handleSubmit()
</script>
