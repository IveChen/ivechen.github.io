<template>
  <span class="cursor player-wrapper" :class="`field-${field}`">
    {{player[field]}}
  </span>
</template>
<script lang="ts" setup>
import { PlayerList } from '@/CONST'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  field: {
    type: String,
    default: 'nickName'
  }
})
const player = computed(() => {
  return PlayerList.find((item) => {
    return item.name === props.name || item.nickName === props.name || item.fullName === props.name
  })
})
</script>
