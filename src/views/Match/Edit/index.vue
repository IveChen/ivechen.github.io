<template>
  <div class="layout-padding">
    <div class="gutter-v">
      <el-alert type="error" title="比赛配置完后，点击复制下载配置按钮将文件给开发人员添加/覆盖数据后重新打包即可"></el-alert>
    </div>
    <!-- 比赛基础设置 -->
    <el-card header="比赛设置" class="gutter-v">
      <el-form inline>
        <el-form-item label="比赛日期">
          <el-date-picker :size="size" placeholder="选择比赛日期" type="date" v-model="state.form.matchDate" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="比赛类型">
          <el-select placeholder="选择比赛类型" v-model="state.form.matchType">
            <el-option v-for="(item,index) in MatchTypeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛模式">
          <el-select placeholder="选择比赛类型" v-model="state.form.matchMode">
            <el-option v-for="(item,index) in MatchModeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选马方式">
          <el-select placeholder="选择比赛类型" v-model="state.form.matchMemberBPMode">
            <el-option v-for="(item,index) in BPPlayerModeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 队伍人员设置 -->
    <el-card :header="team.name" class="gutter-v" v-for="(team,tindex) in TeamList" :key="tindex">
      <el-form inline>
        <el-form-item v-for="(item,index) in 5" :key="index">
          <div class="layout-v">
            <div>
              <el-select :placeholder="`选择队员${index+1}`" v-model="state.form.matchTeamList[tindex][index].player" clearable :disabled="state.isLock" filterable>
                <el-option v-for="(item,index) in finalPlayerList" :key="index" :label="`${item.nickName}(${item.name})`" :value="item.nickName"></el-option>
              </el-select>
            </div>
            <div>
              <el-select :placeholder="`选择队员${index+1}顺序`" v-model="state.form.matchTeamList[tindex][index].order" clearable :disabled="state.isLock">
                <el-option v-for="(item,index) in finalPlayerOrderList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 对局设置 -->
    <el-card v-for="(game,gindex) in state.form.gameList" :key="gindex" class="gutter-v">
      <template #header>
        <div class="card-header">
          <span>对局{{gindex+1}}</span>
          <el-button class="button" text @click="handleRemoveGame(gindex)">删除对局</el-button>
        </div>
      </template>
      <el-form inline>
        <el-form-item label="对局类型">
          <el-select :placeholder="`对局类型`" v-model="game.gameType">
            <el-option v-for="(item,index) in GameTypeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获胜队伍">
          <el-select :placeholder="`选择获胜队伍`" v-model="game.winTeamIndex">
            <el-option v-for="(item,index) in TeamList" :key="index" :label="formatTeamName(item.code)" :value="item.code">
              {{ formatTeamName(item.code) }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="先BP队伍">
          <el-select :placeholder="`选择先Ban先选队伍`" v-model="game.bpFirstTeamIndex">
            <el-option v-for="(item,index) in TeamList" :key="index" :label="formatTeamName(item.code)" :value="item.code">
              {{ formatTeamName(item.code) }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="英雄ban选顺序">
            <div>
              {{game.bpHeroQueue?.length}}/24
            </div>
            <el-select :placeholder="`选择英雄`" v-model="game.bpHeroQueue" filterable multiple style="width:100%">
              <el-option v-for="(item,index) in HeroList" :key="index" :label="item.name_loc" :value="item.name_loc">
              </el-option>
              <el-option value="" label="跳过"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div class="layout-h">
        <el-card v-for="(item,tindex) in game.teamList" :key="tindex" :header="formatTeamName(tindex)" class="layout-fill" :class="{'gutter-h':tindex === 0}">
          <el-form-item label="位置">
            <el-select :placeholder="`选择位置`" v-model="item.location">
              <el-option v-for="(item,index) in TeamLocationList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${hitem.player}`" v-for="(hitem,hindex) in item.heroList" :key="hindex">
            <el-select :placeholder="`选择英雄`" v-model="hitem.hero" filterable>
              <el-option v-for="(item,index) in HeroList" :key="index" :label="item.name_loc" :value="item.name_loc">
              </el-option>
            </el-select>
          </el-form-item>
        </el-card>
      </div>
    </el-card>
    <div class="gutter-v" v-if="!state.isLock">
      <el-button @click="handleConfirmMember" type="success">锁定参赛人员</el-button>
    </div>
    <div class="gutter-v" v-if="state.isLock">
      <el-button @click="handleAddGame" type="success" :icon="Plus">添加对局</el-button>
      <el-button @click="handleCopyConfig" type="success">复制下载配置</el-button>
      <el-button type="success" @click="handleRefresh">刷新</el-button>
    </div>
      <el-button @click="handleCheckConfig" v-if="!state.showCode">查看配置</el-button>
      <el-button @click="handleCheckConfig" v-if="state.showCode">收起配置</el-button>
    <pre class="code" v-if="state.showCode">
      <code>{{result}}</code>
    </pre>
  </div>
</template>
<script lang="ts" setup>
import { computed, onUnmounted, reactive, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { MatchTypeList, TeamList, PlayerList, PlayerOrderList, BPPlayerModeList, MatchModeList, GameTypeList, TeamLocationList } from '@/CONST'
import { ElMessage } from 'element-plus'
import HeroList from '@/CONST/hero'
import getMatchList from '@/utils/matchList'
import { useRoute } from 'vue-router'
import FileSaver from 'file-saver'

const getDefaultTeamList = () => {
  return Array.from({ length: 2 }, () => {
    return Array.from({ length: 5 }, () => {
      return {
        player: '',
        order: ''
      }
    })
  })
}

const getDefaultForm = () => {
  return {
    matchDate: null,
    matchType: MatchTypeList[0],
    matchMemberBPMode: BPPlayerModeList[0],
    matchMode: MatchModeList[0],
    matchTeamList: getDefaultTeamList(),
    gameList: [],
    showCode: false
  }
}

const finalPlayerList = computed(() => {
  return PlayerList.filter((item) => {
    return !state.form.matchTeamList.flat().find((titem) => {
      return titem.player === item.nickName
    })
  })
})

const finalPlayerOrderList = computed(() => {
  return PlayerOrderList.filter((item) => {
    return item === '固定' || !state.form.matchTeamList.flat().find((titem) => {
      return titem.order === item
    })
  })
})

const state = reactive({
  form: getDefaultForm(),
  isLock: false
})

const route = useRoute()
const { matchId } = route.query
const key = `match-edit-${matchId}`
const initData = () => {
  if (matchId) {
    const data = getMatchList().find((item) => {
      return item.id === matchId
    })
    if (data) {
      state.isLock = true
      state.form = data
    }
  } else {
    const data = localStorage.getItem(key)
    if (data) {
      state.form = JSON.parse(data)
    }
    if (state.form.gameList?.length) {
      state.isLock = true
    }
  }
}
initData()

const handleConfirmMember = () => {
  if (state.form.matchTeamList?.flat().find((item) => {
    return !item.player || !item.order
  })) {
    ElMessage.error('请选择队伍人员和顺序')
  } else {
    state.isLock = true
  }
}

const handleAddGame = () => {
  const gameOption = {
    gameType: GameTypeList[0],
    winTeamIndex: null,
    bpFirstTeamIndex: TeamList[0],
    bpHeroQueue: [],
    teamList: state.form.matchTeamList.map((team) => {
      return {
        location: null,
        heroList: team.map((item) => {
          return {
            player: item.player,
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

const handleRefresh = () => {
  state.isLock = false
  state.form = getDefaultForm()
}

const handleCheckConfig = () => {
  state.showCode = !state.showCode
}

const formatTeamName = (code) => {
  return state.form.matchTeamList[code]?.map((item) => {
    return item.player
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
  let winTeamIndex = null
  state.form.gameList.forEach((game) => {
    if (game.gameType === '加赛') {
      playOffScoreList[game.winTeamIndex] = playOffScoreList[game.winTeamIndex] + 1
    } else {
      scoreList[game.winTeamIndex] = scoreList[game.winTeamIndex] + 1
    }
  })
  if (scoreList[0] > scoreList[1]) {
    winTeamIndex = 0
  }
  if (scoreList[0] < scoreList[1]) {
    winTeamIndex = 1
  }
  return {
    ...state.form,
    scoreList,
    playOffScoreList,
    winTeamIndex
  }
})

const handleCopyConfig = () => {
  if (!state.form.matchDate) {
    ElMessage.error('请选择比赛时间')
    return
  }
  const blob = new Blob([JSON.stringify(result.value)], { type: 'application/json; charset=utf-8' })
  FileSaver.saveAs(blob, `${state.form.matchDate}.json`)
}

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
//       player: '队员1',
//       order: '队长'
//     }
//   ]],
//   // 比赛过程
//   gameList: [
//     {
//       // 游戏类型
//       gameType: '加赛',
//       // 获胜队伍
//       winTeamIndex: 0,
//       // 先ban先选队伍
//       bpFirstTeamIndex
//       // 队伍表现
//       teamList: [
//         {
//           // 游戏位置
//           location: '近卫',
//           // 队员使用英雄
//           heroList: [{
//             player: '队员1',
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
