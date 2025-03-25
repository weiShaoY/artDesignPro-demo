<!--
 * 工作标签页组件
 * @description 管理多标签页的打开、关闭和导航功能，支持右键菜单操作
 -->
<script setup lang="ts">
import type { WorkTabType } from '@/types/store'

import type { LocationQueryRaw } from 'vue-router'

import type { MenuItemType } from '../MenuRight/index.vue'

import { useWorkTabStore } from '@/store/modules/workTab'

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CircleClose,
  Close,
} from '@element-plus/icons-vue'

/**
 * 导入Vue组合式API
 */
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue'

import {
  useRoute,
  useRouter,
} from 'vue-router'

/**
 * 导入子组件
 */
import MenuRight from '../MenuRight/index.vue'

/**
 * 状态管理
 */
const store = useWorkTabStore()

const route = useRoute()

const router = useRouter()

const { currentRoute } = router

/**
 * DOM元素引用
 */
const scrollRef = ref<HTMLElement | null>(null) // 滚动容器

const tabsRef = ref<HTMLElement | null>(null) // 标签列表容器

const menuRef = ref() // 右键菜单组件实例

/**
 * 滚动状态
 */
const translateX = ref(0) // 水平滚动偏移量

const transition = ref('') // 过渡动画效果

const clickedPath = ref('') // 当前点击的标签路径

let startX = 0 // 触摸起始X坐标

let currentX = 0 // 当前触摸X坐标

/**
 * 计算属性
 */
const list = computed(() => store.opened) // 已打开的标签页列表

const activeTab = computed(() => currentRoute.value.path) // 当前激活的标签页

/**
 * 获取当前激活标签的索引
 */
const activeTabIndex = computed(() =>
  list.value.findIndex(tab => tab.path === activeTab.value),
)

/**
 * 右键菜单选项配置
 */
const menuItems = computed(() => {
  const clickedIndex = list.value.findIndex(tab => tab.path === clickedPath.value)

  const isLastTab = clickedIndex === list.value.length - 1

  const isFirstOrSecondTab = clickedIndex <= 1

  const isOneTab = list.value.length === 1

  const disableOther = list.value.length === 2 && clickedIndex === 1

  return [
    {
      key: 'left',
      label: '关闭左侧',
      icon: 'ArrowLeft',
      disabled: isFirstOrSecondTab,
    },
    {
      key: 'right',
      label: '关闭右侧',
      icon: 'ArrowRight',
      disabled: isLastTab,
    },
    {
      key: 'other',
      label: '关闭其它',
      icon: 'Close',
      disabled: isOneTab || disableOther,
    },
    {
      key: 'all',
      label: '关闭全部',
      icon: 'CircleClose',
      disabled: isOneTab,
    },
  ]
})

/**
 * 获取当前激活标签页的DOM元素
 */
function getCurTabEl() {
  return document.getElementById(`scroll-li-${activeTabIndex.value}`) as HTMLElement
}

/**
 * 设置过渡动画效果
 */
function setTransition() {
  transition.value = 'transform 0.5s ease-in-out'
  setTimeout(() => {
    transition.value = ''
  }, 300)
}

/**
 * 自动定位当前标签页到可视区域
 */
function workTabAutoPosition() {
  if (!scrollRef.value || !tabsRef.value) {
    return
  }

  const scrollWidth = scrollRef.value.offsetWidth

  const ulWidth = tabsRef.value.offsetWidth

  const curTabEl = getCurTabEl()

  if (!curTabEl) {
    return
  }

  const { offsetLeft, clientWidth } = curTabEl

  const curTabRight = offsetLeft + clientWidth

  const targetLeft = scrollWidth - curTabRight

  if (
    (offsetLeft > Math.abs(translateX.value) && curTabRight <= scrollWidth)
    || (translateX.value < targetLeft && targetLeft < 0)
  ) {
    return
  }

  requestAnimationFrame(() => {
    if (curTabRight > scrollWidth) {
      translateX.value = Math.max(targetLeft - 6, scrollWidth - ulWidth)
    }
    else if (offsetLeft < Math.abs(translateX.value)) {
      translateX.value = -offsetLeft
    }
  })
}

/**
 * 生命周期钩子
 */
onMounted(() => {
  listenerScroll() // 初始化滚动监听
  addTouchListeners() // 添加触摸事件
  workTabAutoPosition() // 初始定位
})

/**
 * 监听路由变化
 */
watch(
  () => currentRoute.value,
  () => {
    setTransition()
    workTabAutoPosition()
  },
)

/**
 * 点击标签页导航
 */
function clickTab(item: WorkTabType) {
  router.push({
    path: item.path,
    query: item.query as LocationQueryRaw,
  })
}

/**
 * 关闭标签页
 * @param type 关闭类型: current/left/right/other/all
 * @param tabPath 目标标签路径
 */
function closeWorkTab(type: string, tabPath: string) {
  const path = typeof tabPath === 'string' ? tabPath : route.path

  switch (type) {
    case 'current':
      store.removeTab(path)
      break
    case 'left':
      store.removeLeft(path)
      break
    case 'right':
      store.removeRight(path)
      break
    case 'other':
      store.removeOthers(path)
      break
    case 'all':
      store.removeAll(path)
      break
  }

  setTimeout(() => {
    workTabClosePosition()
  }, 100)
}

/**
 * 关闭标签页后的位置调整
 */
function workTabClosePosition() {
  if (!scrollRef.value || !tabsRef.value) {
    return
  }

  const curTabEl = getCurTabEl()

  if (!curTabEl) {
    return
  }

  const { offsetLeft, clientWidth } = curTabEl

  const scrollWidth = scrollRef.value.offsetWidth

  const ulWidth = tabsRef.value.offsetWidth

  const curTabLeft = offsetLeft + clientWidth

  requestAnimationFrame(() => {
    translateX.value = curTabLeft > scrollWidth ? scrollWidth - ulWidth : 0
  })
}

/**
 * 显示右键菜单
 */
function showMenu(e: MouseEvent, path?: string) {
  clickedPath.value = path || ''
  menuRef.value?.show(e)
  e.preventDefault()
  e.stopPropagation()
}

/**
 * 处理右键菜单选择
 */
function handleSelect(item: MenuItemType) {
  const { key } = item

  const activeIndex = list.value.findIndex(tab => tab.path === activeTab.value)

  const clickedIndex = list.value.findIndex(tab => tab.path === clickedPath.value)

  // 处理标签跳转逻辑
  const shouldNavigate
     = (key === 'left' && activeIndex < clickedIndex)
       || (key === 'right' && activeIndex > clickedIndex)
       || key === 'other'

  if (shouldNavigate) {
    router.push(clickedPath.value)
  }

  closeWorkTab(key, clickedPath.value)
}

/**
 * 监听滚动事件
 */
function listenerScroll() {
  const xMax = 0

  tabsRef.value?.addEventListener(
    'wheel',
    (event: WheelEvent) => {
      if (!scrollRef.value || !tabsRef.value) {
        return
      }

      event.preventDefault()

      if (tabsRef.value.offsetWidth <= scrollRef.value.offsetWidth) {
        return
      }

      const xMin = scrollRef.value.offsetWidth - tabsRef.value.offsetWidth

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY

      translateX.value = Math.min(Math.max(translateX.value - delta, xMin), xMax)
    },
    {
      passive: false,
    },
  )
}

/**
 * 添加触摸事件监听
 */
function addTouchListeners() {
  tabsRef.value?.addEventListener('touchstart', handleTouchStart)
  tabsRef.value?.addEventListener('touchmove', handleTouchMove)
  tabsRef.value?.addEventListener('touchend', handleTouchEnd)
}

/**
 * 处理触摸开始事件
 */
function handleTouchStart(event: TouchEvent) {
  startX = event.touches[0].clientX
}

/**
 * 处理触摸移动事件
 */
function handleTouchMove(event: TouchEvent) {
  if (!scrollRef.value || !tabsRef.value) {
    return
  }

  currentX = event.touches[0].clientX
  const deltaX = currentX - startX

  const xMin = scrollRef.value.offsetWidth - tabsRef.value.offsetWidth

  translateX.value = Math.min(Math.max(translateX.value + deltaX, xMin), 0)
  startX = currentX
}

/**
 * 处理触摸结束事件
 */
function handleTouchEnd() {
  setTransition()
}
</script>

<template>
  <div
    class="workTab"
  >
    <!-- 标签页滚动区域 -->
    <div
      ref="scrollRef"
      class="scroll-view"
    >
      <ul
        ref="tabsRef"
        class="tabs"
        :style="{
          transform: `translateX(${translateX}px)`,
          transition,
        }"
      >
        <li
          v-for="(item, index) in list"
          :id="`scroll-li-${index}`"
          :key="item.path"
          class="art-custom-card"
          :class="{ 'activ-tab': item.path === activeTab }"
          @click="clickTab(item)"
          @contextmenu.prevent="(e: MouseEvent) => showMenu(e, item.path)"
        >
          {{ item.title }}
          <!-- 关闭按钮 -->
          <el-icon
            v-if="index !== 0"
            @click.stop="closeWorkTab('current', item.path)"
          >
            <Close />
          </el-icon>
        </li>
      </ul>
    </div>

    <!-- 右侧操作菜单 -->
    <div
      class="right"
    >
      <el-dropdown
        @command="closeWorkTab"
      >
        <el-icon
          class="btn console-box art-custom-card"
        >
          <ArrowDown />
        </el-icon>

        <template
          #dropdown
        >
          <el-dropdown-menu>
            <el-dropdown-item
              :icon="ArrowLeft"
              command="left"
              :disabled="activeTabIndex === 0 || activeTabIndex === 1"
            >
              关闭左侧
            </el-dropdown-item>

            <el-dropdown-item
              :icon="ArrowRight"
              command="right"
              :disabled="activeTabIndex === list.length - 1"
            >
              关闭右侧
            </el-dropdown-item>

            <el-dropdown-item
              :icon="Close"
              command="other"
              :disabled="list.length === 1 || (list.length === 2 && activeTabIndex === 1)"
            >
              关闭其它
            </el-dropdown-item>

            <el-dropdown-item
              :icon="CircleClose"
              command="all"
              :disabled="list.length === 1"
            >
              关闭全部
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 右键菜单组件 -->
    <MenuRight
      ref="menuRef"
      :menu-items="menuItems"
      @select="handleSelect"
    />
  </div>
</template>

 <style lang="scss" scoped>
 @use './style';
</style>
