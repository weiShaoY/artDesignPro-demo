<script lang="ts" setup>

import MenuTopSubmenu from './MenuTopSubmenu.vue'

type PropsType = {

  /**
   *   菜单列表
   */
  list?: BlogType.MenuListType[]

  /**
   *   菜单宽度
   */
  width?: number
}
withDefaults(defineProps<PropsType>(), {
  list: () => [],
  width: 500,
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
      :default-active="routerPath"
      :ellipsis="true"
      :popper-offset="16"
      :style="{ width: `${width}px` }"
      background-color="transparent"
      class="el-menu-popper-demo"
      mode="horizontal"
      text-color="var(--art-text-gray-700)"
    >
      <MenuTopSubmenu
        v-for="item in list"
        :key="item.id"
        :is-mobile="false"
        :item="item"
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
