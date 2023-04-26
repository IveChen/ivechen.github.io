<template>
  <a class="cursor hero-wrapper" :href="link" target="_blank
  " :title="hero.name_loc">
    <img :src="avatar" :alt="name" width="50" height="40">
    <div class="hero-name">{{name}}</div>
  </a>
</template>
<script lang="ts" setup>
import heroList from '@/CONST/hero'
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
const avatar = computed(() => {
  return `./assets/hero_image/${hero.value.name}.png`
})
</script>
<style lang="less" scoped>
.hero-wrapper {
  img {
    display: block;
    margin: 0 auto;

    object-fit: contain;
  }
  .hero-name {
    margin-top: -3px;
    color: #999;
    font-size: 12px;
  }
}
</style>
