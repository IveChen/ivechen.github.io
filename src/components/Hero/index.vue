<template>
  <span class="cursor hero-wrapper">
    <a :href="link" target="_blank">{{hero.name_loc}}<el-icon><Link></Link></el-icon></a>
  </span>
</template>
<script lang="ts" setup>
import heroList from '@/CONST/hero'
import { Link } from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const hero = computed(() => {
  return heroList.find((item) => {
    return item.name_loc === props.name
  })
})
const link = computed(() => {
  return `https://www.dota2.com.cn/hero/${hero.value.name.replace(/npc_dota_hero_/, '')}`
})
</script>
<style lang="less" scoped>
.hero-wrapper {
  span {
    font-size: 0.8em;
  }
}
</style>
