<script setup lang="ts">
import type { MenuListType } from '@/types/menu'

import { blogMenuJump } from '@/utils/blogMenuJump'

import { computed } from 'vue'

// 类型定义
type Props = {

  /**
   *   菜单标题
   */
  title?: string

  /**
   *   菜单列表
   */
  list?: MenuListType[]

  /**
   *   菜单主题
   */
  theme?: {

    /**
     *   菜单图标颜色
     */
    iconColor?: string
  }

  /**
   *   是否是移动端
   */
  isMobile?: boolean

  /**
   *   菜单层级
   */
  level?: number
}

// Props定义
const props = withDefaults(defineProps<Props>(), {
  title: '',
  list: () => [],
  theme: () => ({
  }),
  isMobile: false,
  level: 0,
})

// Emits定义
const emit = defineEmits<{
  (e: 'close'): void
}>()

// 计算属性
const filteredMenuItems = computed(() => filterRoutes(props.list))

// 跳转页面
function goPage(item: MenuListType) {
  closeMenu()
  blogMenuJump(item)
}

// 关闭菜单
const closeMenu = () => emit('close')

// 判断是否有子菜单
function hasChildren(item: MenuListType): boolean {
  return Boolean(item.children?.length)
}

// 过滤菜单项
function filterRoutes(items: MenuListType[]): MenuListType[] {
  return items
    .filter(item => !item.meta.isHide)
    .map(item => ({
      ...item,
      children: item.children ? filterRoutes(item.children) : undefined,
    }))
}
</script>

<script lang="ts">
/**
 *  抽取图标组件
 */
const MenuItemIcon = defineComponent({
  name: 'MenuItemIcon',
  props: {
    /**
     *   菜单图标
     */
    icon: String,

    /**
     *   菜单图标颜色
     */
    color: String,
  },
  setup(props) {
    return () =>
      h('i', {
        class: 'menu-icon iconfont-sys',
        style: props.color
          ? {
              color: props.color,
            }
          : undefined,
        innerHTML: props.icon,
      })
  },
})
</script>

<template>
  <template
    v-for="item in filteredMenuItems"
    :key="item.id"
  >
    <!-- 包含子菜单的项目 -->
    <el-sub-menu
      v-if="hasChildren(item)"
      :index="item.path || item.meta.title"
      :level="level"
    >
      <template
        #title
      >
        <MenuItemIcon
          :icon="item.meta.icon"
          :color="theme?.iconColor"
        />

        <span
          class="menu-name"
        >{{ item.meta.title }} </span>

        <div
          v-if="item.meta.showBadge"
          class="badge"
          style="right: 35px"
        />
      </template>

      <submenu
        :list="item.children"
        :is-mobile="isMobile"
        :level="level + 1"
        :theme="theme"
        @close="closeMenu"
      />
    </el-sub-menu>

    <!-- 普通菜单项 -->
    <el-menu-item
      v-else
      :index="item.path || item.meta.title"
      :level-item="level + 1"
      @click="goPage(item)"
    >
      <MenuItemIcon
        :icon="item.meta.icon"
        :color="theme?.iconColor"
      />

      <template
        #title
      >
        <span
          class="menu-name"
        >{{ item.meta.title }} </span>

        <div
          v-if="item.meta.showBadge"
          class="badge"
        />

        <div
          v-if="item.meta.showTextBadge"
          class="text-badge"
        >
          {{ item.meta.showTextBadge }}
        </div>
      </template>
    </el-menu-item>
  </template>
</template>
