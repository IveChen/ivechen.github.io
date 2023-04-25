import { reactive } from 'vue'
import { MatchTypeList } from '@/CONST'

export const state = reactive({
  form: {
    date: '',
    matchType: MatchTypeList[0],
    excludePlayer: []
  }
})
