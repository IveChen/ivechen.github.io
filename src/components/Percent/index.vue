<template>
  <div class="percent-wrapper">{{props.number1}}/{{props.number2}}<span class="color-info">({{percent}}%)</span></div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  number1: {
    type: Number,
    default: null
  },
  number2: {
    type: Number,
    default: null
  }
})

const percent = computed(() => {
  const result = props.number1 / props.number2 * 100
  if (!isNaN(result) && props.number2 !== 0) {
    return result.toFixed(2)
  }
  return '-'
})
</script>
<style lang="less" scoped>
.percent-wrapper {
  span {
    margin-left: 5px;
    font-size: 12px;
  }
}
</style>
