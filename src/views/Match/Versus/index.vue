<template>
  <div class="layout-full layout-v container">
    <el-form inline>
      <el-form-item label="时间范围">
        <el-date-picker
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          type="daterange"
          v-model="state.form.date"
          clearable
        ></el-date-picker>
      </el-form-item>
    <el-form-item label="比赛类型">
      <el-select
        placeholder="选择比赛类型"
        v-model="state.form.matchType"
        clearable
        multiple
        style="width: 300px"
      >
        <el-option
          v-for="(item, index) in MatchTypeList"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="对抗人员A">
        <el-select
          placeholder="对抗人员A"
          v-model="state.form.player1"
          clearable
          filterable
          multiple
        >
          <el-option
            v-for="(item, index) in PlayerList"
            :key="index"
            :label="`${item.nickName}(${item.name})`"
            :value="item.nickName"
          >
            {{ item.nickName }}({{ item.name }})
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对抗人员B">
        <el-select
          placeholder="对抗人员B"
          v-model="state.form.player2"
          clearable
          filterable
          multiple
        >
          <el-option
            v-for="(item, index) in PlayerList"
            :key="index"
            :label="`${item.nickName}(${item.name})`"
            :value="item.nickName"
          >
            {{ item.nickName }}({{ item.name }})
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div>
      {{ state.form }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
// @ts-ignore
import { parseMatchList } from '@/utils/dataHelper'
import { PlayerList, MatchTypeList } from '@/CONST'
import { shortcuts } from '@/utils/commonConfig'
import dayjs from 'dayjs'
import getMatchList from '@/utils/matchList'

const state = reactive({
  matchList: [],
  form: {
    date: [],
    player1: [],
    player2: [],
    matchType: ['TICU正赛', '对黑']
  }
})
const disabledDate = (v) => {
  return dayjs(v) > dayjs()
}

const handleSubmit = () => {
  if (!state.form.player1.length || !state.form.player2.length) {
    ElMessage.error('请选择对抗人员')
    return false
  }
  const matchList = getMatchList().filter((match) => {
    if (state.form.date && state.form.date.length) {
      const isValid =
        dayjs(match.matchDate) >= dayjs(state.form.date[0]) &&
        dayjs(match.matchDate) <= dayjs(state.form.date[1])
      if (!isValid) {
        return false
      }
    }
    if (state.form.matchType?.length) {
      if (state.form.matchType.indexOf(match.matchType) === -1) {
        return false
      }
    }
    return true
  })
}
</script>
<style lang="less" scoped></style>
