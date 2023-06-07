import { reactive } from 'vue'

export const state = reactive({
  form: {
    date: '',
    matchType: ['TICU正赛', '对黑'],
    excludePlayer: []
  }
})
