<template>
  <span class="cursor player-wrapper" :class="`field-${field}`">
    <template v-if="name === 'X' || name === 'Y'">
      {{name}}
    </template>
    <template v-else>
      {{player[field]}}
    </template>
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
