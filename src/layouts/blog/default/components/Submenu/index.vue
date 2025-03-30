<script setup lang="ts">

import { blogMenuJump } from '@/utils/blogMenuJump'

import { computed } from 'vue'

const props = withDefaults(defineProps<PropsType>(), {
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

// 类型定义
type PropsType = {

  /**
   *  菜单标题
   */
  title?: string

  /**
   *  菜单列表
   */
  list?: BlogType.MenuListType[]

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
const route = useRoute()

/**
 *  过滤菜单列表
 */
const filteredMenuItemList = computed(() => filterRouteList(props.list))

/**
 *  关闭菜单
 */
const closeMenu = () => emit('close')

/**
 *  跳转页面
 */
function goPage(item: BlogType.MenuListType) {
  closeMenu()
  blogMenuJump(item)
}

/**
 *  判断是否有子菜单
 */
function hasChildren(item: BlogType.MenuListType): boolean {
  return Boolean(item.children?.length)
}

/**
 *  过滤路由列表
 */
function filterRouteList(items: BlogType.MenuListType[]): BlogType.MenuListType[] {
  return items
    .filter(item => !item.meta.isHide)
    .map(item => ({
      ...item,
      children: item.children ? filterRouteList(item.children) : undefined,
    }))
}

</script>

<script lang="ts">
export default {
  name: 'Submenu',
}
</script>

<template>
  <template
    v-for="item in filteredMenuItemList"
    :key="item.id"
  >
    <!-- 包含子菜单的项目 -->
    <el-sub-menu
      v-if="hasChildren(item)"
      :index="item.path || item.meta.title"
      :level="level"
      :class="{ activeSubMenu: route.path.includes(item.path) }"
    >
      <template
        #title
      >
        <SvgIcon
          v-if="item.meta.icon"
          :icon="item.meta.icon"
          :size="26"
          class="mr-2"
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

      <Submenu
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
      <SvgIcon
        v-if="item.meta.icon"
        :icon="item.meta.icon"
        :size="26"
        class="mr-2"
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
          v-if="item.meta.externalUrl"
          class="text-badge"
        >
          外链
        </div>

        <div
          v-else-if="item.meta.showTextBadge"
          class="text-badge"
        >
          {{ item.meta.showTextBadge }}
        </div>
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
//   .activeSubMenu > :deep(.el-sub-menu__title) {
//   color: var(--main-color) !important;
//   background-color: var(--el-color-primary-light-9);
//   background-image: var(--el-color-primary-custom-14);

//   &::before {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 4px;
//     height: 100%;
//     content: '';
//     background: var(--main-color);
//   }
// }

// .activeSubMenu > :deep(.el-sub-menu__title):hover {
//   color: var(--main-color) !important;
//   background: var(--el-color-primary-light-9) !important;
//   background-image: var(--el-color-primary-custom-14) !important;
// }
</style>
