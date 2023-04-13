<template>
  <div class="layout-padding">
    <div class="gutter-v">
      <el-alert type="error" title="当前页面仅供开发人员使用,复制比赛配置到src/data/dataSource.js后再次打包即可。如编辑时发现数据有误，编辑后复制比赛配置覆盖即可。"></el-alert>
    </div>
    <!-- 比赛基础设置 -->
    <el-card header="比赛设置" class="gutter-v">
      <el-form inline>
        <el-form-item label="比赛日期">
          <el-date-picker :size="size" placeholder="选择比赛日期" type="date" v-model="state.form.matchDate" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="比赛类型">
          <el-select placeholder="选择比赛类型" v-model="state.form.matchType">
            <el-option v-for="(item,index) in matchTypeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛模式">
          <el-select placeholder="选择比赛类型" v-model="state.form.matchMode">
            <el-option v-for="(item,index) in matchModeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选马方式">
          <el-select placeholder="选择比赛类型" v-model="state.form.matchMemberBPMode">
            <el-option v-for="(item,index) in memberBPModeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 队伍成员设置 -->
    <el-card :header="team.name" class="gutter-v" v-for="(team,tindex) in teamList" :key="tindex">
      <el-form inline>
        <el-form-item v-for="(item,index) in 5" :key="index">
          <div class="layout-v">
            <div>
              <el-select :placeholder="`选择队员${index+1}`" v-model="state.form.matchTeamList[tindex][index].name" clearable :disabled="state.isLock" filterable>
                <el-option v-for="(item,index) in finalMemberList" :key="index" :label="`${item.nickName}(${item.name})`" :value="item.nickName"></el-option>
              </el-select>
            </div>
            <div>
              <el-select :placeholder="`选择队员${index+1}顺序`" v-model="state.form.matchTeamList[tindex][index].order" clearable  :disabled="state.isLock">
                <el-option v-for="(item,index) in finalMemberOrderList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 赛程设置 -->
    <el-card v-for="(game,gindex) in state.form.gameList" :key="gindex" class="gutter-v">
      <template #header>
        <div class="card-header">
          <span>赛程{{gindex+1}}</span>
          <el-button class="button" text @click="handleRemoveGame(gindex)">删除赛程</el-button>
        </div>
      </template>
      <el-form inline>
        <el-form-item label="赛程类型">
          <el-select :placeholder="`赛程类型`" v-model="game.gameType">
            <el-option v-for="(item,index) in gameTypeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获胜队伍">
          <el-select :placeholder="`选择获胜队伍`" v-model="game.winTeamCode">
            <el-option v-for="(item,index) in teamList" :key="index" :label="item.name" :value="item.code">
              {{ formatTeamName(item.code) }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="layout-h">
        <el-card v-for="(item,tindex) in game.teamList" :key="tindex" :header="teamList[tindex].name" class="layout-fill" :class="{'gutter-h':tindex === 0}">
          <el-form-item label="位置">
            <el-select :placeholder="`选择位置`" v-model="item.location">
              <el-option v-for="(item,index) in teamLocationList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${hitem.user}`" v-for="(hitem,hindex) in item.heroList" :key="hindex">
            <el-select :placeholder="`选择英雄`" v-model="hitem.hero" filterable>
              <el-option v-for="(item,index) in HeroList" :key="index" :label="item.name_loc" :value="item.name_loc">
              </el-option>
            </el-select>
          </el-form-item>
        </el-card>
      </div>
    </el-card>
    <div class="gutter-v" v-if="!state.isLock">
      <el-button @click="handleConfirmMember" type="success">锁定参赛成员</el-button>
    </div>
    <div class="gutter-v" v-if="state.isLock">
      <el-button @click="handleAddGame" type="success" :icon="Plus">添加赛程</el-button>
      <el-button @click="handleAddGame" type="success" :icon="Plus">复制配置</el-button>
    </div>
    <pre class="code">
      <code>{{result}}</code>
    </pre>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { matchTypeList, teamList, memberList, memberOrderList, memberBPModeList, matchModeList, gameTypeList, teamLocationList } from '@/CONST'
import { ElMessage } from 'element-plus'
import HeroList from '@/CONST/hero'

const getDefaultTeamList = () => {
  return Array.from({ length: 2 }, () => {
    return Array.from({ length: 5 }, () => {
      return {
        name: '',
        order: ''
      }
    })
  })
}

const getDefaultForm = () => {
  return {
    matchDate: null,
    matchType: matchTypeList[0],
    matchMemberBPMode: memberBPModeList[0],
    matchMode: matchModeList[0],
    matchTeamList: getDefaultTeamList(),
    gameList: []
  }
}

const finalMemberList = computed(() => {
  return memberList.filter((item) => {
    return !state.form.matchTeamList.flat().find((titem) => {
      return titem.name === item.nickName
    })
  })
})

const finalMemberOrderList = computed(() => {
  return memberOrderList.filter((item) => {
    return item === '固定' || !state.form.matchTeamList.flat().find((titem) => {
      return titem.order === item
    })
  })
})

const state = reactive({
  form: getDefaultForm(),
  isLock: false
})

const key = 'match-edit'
const initData = () => {
  const data = localStorage.getItem(key)
  if (data) {
    state.form = JSON.parse(data)
  }
  if (state.form.gameList?.length) {
    state.isLock = true
  }
}
initData()

const handleConfirmMember = () => {
  if (state.form.matchTeamList?.flat().find((item) => {
    return !item.name || !item.order
  })) {
    ElMessage.error('请选择队伍成员和顺序')
  } else {
    state.isLock = true
  }
}

const handleAddGame = () => {
  const gameOption = {
    gameType: gameTypeList[0],
    winTeamCode: null,
    teamList: state.form.matchTeamList.map((team) => {
      return {
        location: null,
        heroList: team.map((item) => {
          return {
            user: item.name,
            hero: ''
          }
        })
      }
    })
  }
  state.form.gameList.push(gameOption)
}

const handleRemoveGame = (index) => {
  state.form.gameList.splice(index, 1)
}

const formatTeamName = (code) => {
  return state.form.matchTeamList[code]?.map((item) => {
    return item.name
  }).join('')
}

watch(() => state.form, () => {
  localStorage.setItem(key, JSON.stringify(state.form))
}, {
  deep: true
})

const result = computed(() => {
  const scoreList = [0, 0]
  const playOffScoreList = [0, 0]
  let winTeamCode = null
  state.form.gameList.forEach((game) => {
    if (game.gameType === '加赛') {
      playOffScoreList[game.winTeamCode] = playOffScoreList[game.winTeamCode] + 1
    } else {
      scoreList[game.winTeamCode] = scoreList[game.winTeamCode] + 1
    }
  })
  if (scoreList[0] > scoreList[1]) {
    winTeamCode = 0
  }
  if (scoreList[0] < scoreList[1]) {
    winTeamCode = 1
  }
  return {
    ...state.form,
    scoreList,
    playOffScoreList,
    winTeamCode
  }
})

// 数据结构
// const matchDataConstructor = [{
//   // 比赛日期
//   matchDate: '2022-10-11',
//   // 比赛类型
//   matchType: 'TICU正赛',
//   // 比赛模式
//   matchMode: '队长模式',
//   // 比赛人员模式
//   matchMemberBPMode: '全员选马',
//   // 队伍人员列表
//   matchTeamList: [[
//     {
//       name: '队员1',
//       order: '队长'
//     }
//   ]],
//   // 比赛过程
//   gameList: [
//     {
//       // 游戏类型
//       gameType: '加赛',
//       // 获胜队伍
//       winTeamCode: 0,
//       // 获胜队伍比分
//       // 队伍表现
//       teamList: [
//         {
//           // 游戏位置
//           location: '近卫',
//           // 队员使用英雄
//           heroList: [{
//             user: '队员1',
//             hero: '幽鬼'
//           }]
//         }
//       ]
//     }
//   ]
// }]
</script>
<style lang="less" scoped>
.code {
  text-align: left;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
