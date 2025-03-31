<script lang="ts" setup>
import { blogMenuJump } from '@/utils/blogMenuJump'

/**
 * 组件属性类型定义
 */
type PropsType = {

  /**
   * 菜单项数据对象
   * 包含菜单路径、名称、图标、子菜单等完整信息
   */
  item: BlogType.MenuListType

  /**
   * 主题配置对象
   */
  theme?: {

    /**
     * 菜单图标颜色
     */
    iconColor?: string
  }

  /**
   * 是否移动端模式
   * @default false
   */
  isMobile?: boolean

  /**
   * 当前菜单层级
   * 从0开始计数，0表示一级菜单
   * @default 0
   */
  level?: number
}

// 设置属性默认值
withDefaults(defineProps<PropsType>(), {
  /**
   * 主题配置默认值
   */
  theme: () => ({
  }),

  /**
   * 默认非移动端模式
   */
  isMobile: false,

  /**
   * 默认菜单层级为0(一级菜单)
   */
  level: 0,
})

/**
 * 组件事件定义
 * @function close - 关闭菜单事件(主要用于移动端)
 */
const emit = defineEmits(['close'])

/**
 * 跳转到菜单对应页面
 * @param item - 要跳转的菜单项
 */
function goPage(item: BlogType.MenuListType) {
  closeMenu() // 先关闭菜单
  blogMenuJump(item) // 执行页面跳转
}

/**
 * 关闭当前菜单
 * 主要用于移动端点击菜单项后自动收起菜单
 */
function closeMenu() {
  emit('close') // 触发close事件
}

/**
 * 判断菜单是否有子项
 * @param  children - 子菜单数组
 * @returns  是否有子菜单项
 */
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
      <svgIcon
        v-if="item.meta.icon"
        :style="{ color: theme?.iconColor }"
        :icon="item.meta.icon"
        :size="26"
        class="mr-2"
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
      <svgIcon
        v-if="item.meta.icon"
        :style="{ color: theme?.iconColor }"
        :icon="item.meta.icon"
        :size="26"
        class="mr-2"
      />

      <span>{{ item.meta.title }}</span>

      <div
        v-if="item.meta.showDefaultBadge"
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
