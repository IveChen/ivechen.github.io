<template>
  <component
    :is="tag"
    class="cursor hero-wrapper"
    :href="link"
    target="_blank
  "
    :title="hero.name_loc"
  >
    <img v-lazy="avatar" :alt="name" :width="width" :height="height" />
    <div class="hero-name" v-if="showName">{{ name }}</div>
  </component>
</template>
<script lang="ts" setup>
import heroList from '@/CONST/hero'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 50
  },
  height: {
    type: Number,
    default: 40
  },
  tag: {
    type: String,
    default: 'a'
  },
  showName: {
    type: Boolean,
    default: true
  }
})
const hero = computed(() => {
  return heroList.find((item) => {
    return item.name_loc === props.name
  })
})
const link = computed(() => {
  return `https://www.dota2.com.cn/hero/${hero.value.name.replace(
    /npc_dota_hero_/,
    ''
  )}`
})
const avatar = computed(() => {
  return `./assets/hero_image/${hero.value.name}.png`
})
</script>
<style lang="less" scoped>
.hero-wrapper {
  img {
    display: block;

    object-fit: contain;
  }
  .hero-name {
    margin-top: -3px;
    color: #999;
    font-size: 12px;
  }
}
</style>
