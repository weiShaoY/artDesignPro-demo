<script setup lang="ts">
import {
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'

import zh from 'element-plus/es/locale/lang/zh-cn'

import { initState, saveUserData } from './utils/storage'

const elSize = computed(() => (document.body.clientWidth >= 500 ? 'large' : 'default'))

/**
 * 注册全局 Element Plus 消息组件
 */
function registerGlobalMethods() {
  window.$message = ElMessage
  window.$messageBox = ElMessageBox
  window.$notification = ElNotification
}

/**
 * 注销全局 Element Plus 消息组件
 */
function unregisterGlobalMethods() {
  delete window.$message
  delete window.$messageBox
  delete window.$notification
}

onBeforeMount(() => {
  setBodyClass(true)
})

onMounted(() => {
  initState()
  saveUserData()
  setBodyClass(false)
  registerGlobalMethods()
})

onBeforeUnmount(() => {
  unregisterGlobalMethods()
})

// 提升暗黑主题下页面刷新视觉体验
function setBodyClass(addClass: boolean) {
  const el = document.getElementsByTagName('body')[0]

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
