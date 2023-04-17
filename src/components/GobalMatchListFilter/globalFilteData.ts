import { reactive, computed } from 'vue'

export const state = reactive({
  form: {
    date: '',
    matchType: '',
    excludePlayer: []
  }
})
