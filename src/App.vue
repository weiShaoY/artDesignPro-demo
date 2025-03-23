<script setup lang="ts">
import zh from 'element-plus/es/locale/lang/zh-cn'

import { initState, saveUserData } from './utils/storage'

import { systemUpgrade } from './utils/upgrade'

const elSize = computed(() => (document.body.clientWidth >= 500 ? 'large' : 'default'))

onBeforeMount(() => {
  setBodyClass(true)
})

onMounted(() => {
  initState()
  saveUserData()
  setBodyClass(false)
  systemUpgrade()
})

// 提升暗黑主题下页面刷新视觉体验
function setBodyClass(addClass: boolean) {
  let el = document.getElementsByTagName('body')[0]

  if (addClass) {
    el.setAttribute('class', 'theme-change')
  }
  else {
    setTimeout(() => {
      el.removeAttribute('class')
    }, 300)
  }
}
</script>

<template>
  <el-config-provider
    :size="elSize"
    :locale="zh"
    :z-index="3000"
  >
    <router-view />
  </el-config-provider>
</template>
