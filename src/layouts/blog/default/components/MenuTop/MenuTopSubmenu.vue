<script lang="ts" setup>

import { blogMenuJump } from '@/utils/blogMenuJump'

type PropsType = {

  /**
   *  菜单列表
   */
  item: BlogType.MenuListType

  /**
   *  菜单主题
   */
  theme?: {

    /**
     *  菜单图标颜色
     */
    iconColor?: string
  }

  /**
   *  是否是移动端
   */
  isMobile?: boolean

  /**
   *  菜单层级
   */
  level?: number
}

withDefaults(defineProps<PropsType>(), {

  /**
   *   主题
   */
  theme: () => ({
  }),

  /**
   *   是否是移动端
   */
  isMobile: false,

  /**
   *  菜单层级
   */
  level: 0,
})

const emit = defineEmits(['close'])

function goPage(item: BlogType.MenuListType) {
  closeMenu()
  blogMenuJump(item)
}

function closeMenu() {
  emit('close')
}

function isNotEmpty(children: BlogType.MenuListType[] | undefined) {
  return children && children.length > 0
}
</script>

<template>
  <el-sub-menu
    v-if="isNotEmpty(item.children)"
    :index="item.path || item.meta.title"
    :level="level"
  >
    <template
      #title
    >
      <i
        :style="{ color: theme?.iconColor }"
        class="menu-icon iconfont-sys"
        v-html="item.meta.icon"
      />

      <span>{{ item.meta.title }}</span>
    </template>
    <!-- 递归菜单 -->
    <MenuTopSubmenu
      v-for="child in item.children"
      :key="child.id"
      :item="child"
      :level="level + 1"
      :theme="theme"
      @close="closeMenu"
    />
  </el-sub-menu>

  <el-menu-item
    v-if="!isNotEmpty(item.children) && !item.meta.isHide"
    :index="item.path || item.meta.title"
    :level-item="level + 1"
    @click="goPage(item)"
  >
    <template
      #title
    >
      <i
        class="menu-icon iconfont-sys"
        v-html="item.meta.icon"
      />

      <span>{{ item.meta.title }}</span>

      <div
        v-if="item.meta.showBadge"
        class="badge"
      />
    </template>
  </el-menu-item>
</template>

<style lang="scss" scoped>
  .el-sub-menu {
  padding: 0 !important;

  :deep(.el-sub-menu__title) {
    padding: 0 30px 0 15px !important;

    .el-sub-menu__icon-arrow {
      right: 10px !important;
    }
  }
}

.menu-icon {
  margin-right: 5px;
  font-size: 16px;
}
</style>
