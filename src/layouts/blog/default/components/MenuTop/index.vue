<script setup lang="ts">
import type { MenuListType } from '@/types/menu'

import MenuTopSubmenu from './MenuTopSubmenu.vue'

defineProps({
  /**
   *   菜单列表
   */
  list: {
    type: [Array] as PropType<MenuListType[]>,
    default: () => [],
  },

  /**
   *   菜单宽度
   */
  width: {
    type: Number,
    default: 500,
  },
})

const route = useRoute()

const routerPath = computed(() => {
  return route.path
})
</script>

<template>
  <div
    class="menu-top"
  >
    <el-menu
      :ellipsis="true"
      class="el-menu-popper-demo"
      mode="horizontal"
      :default-active="routerPath"
      text-color="var(--art-text-gray-700)"
      :popper-offset="16"
      :style="{ width: `${width}px` }"
      background-color="transparent"
    >
      <MenuTopSubmenu
        v-for="item in list"
        :key="item.id"
        :item="item"
        :is-mobile="false"
        :level="0"
      />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
  // :deep(.el-menu--horizontal > .el-sub-menu.is-active) {
//   background-color: #eee;
// }

:deep(.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title) {
  border: 0 !important;
}

.menu-top {
  .el-menu {
    border: none;
  }
}

@media only screen and (max-width: $device-notebook) {
  .menu-top {
    .el-menu {
      width: 38vw !important;
    }
  }
}
</style>
