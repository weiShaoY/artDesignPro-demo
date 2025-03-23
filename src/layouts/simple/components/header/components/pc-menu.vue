<script setup>
import { ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

defineProps({
  /**
   *  菜单列表
   */
  menuList: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const route = useRoute()

const router = useRouter()

/**
 * 选择菜单项
 * @param {string} key - 路由路径
 */
function handleSelect(key) {
  router.push(key) // 使用 Vue Router 跳转
}
</script>

<template>
  <div
    class="hidden items-center gap-5 sm:flex"
  >
    <div
      v-for="item in menuList"
      :key="item.key"
      class="flex cursor-pointer items-center text-lg text-[#D0D2D6] font-bold hover:text-white"
      :class="{
        'text-white': route.path === item.key,
      }"
      @click="handleSelect(item.key)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped>
/* 可根据需要添加样式 */
</style>
