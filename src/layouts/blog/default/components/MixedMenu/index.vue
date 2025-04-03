<script setup lang="ts">
import { useSettingStore } from '@/store'

import { blogMenuJump } from '@/utils/blogMenuJump'

import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

import { onMounted, ref } from 'vue'

/**
 * 组件属性
 */
type PropsType = {

  /**
   * 菜单列表数据
   */
  list?: RouterType.BlogMenuListType[]
}

// 设置默认属性值
withDefaults(defineProps<PropsType>(), {
  list: () => [],
})

/**
 * 当前路由对象(Vue Router)
 */
const route = useRoute()

/**
 * 设置相关的状态仓库实例
 */
const settingStore = useSettingStore()

/**
 * 计算属性：从设置仓库获取菜单展开宽度
 */
const menuOpenWidth = computed(() => settingStore.getMenuOpenWidth)

/**
 * 检查菜单项是否处于激活状态(基于当前路由路径)
 * @param {RouterType.BlogMenuListType} item - 要检查的菜单项
 * @returns {boolean} 如果该项或其任意子项匹配当前路由则返回true
 */
function isActive(item: RouterType.BlogMenuListType): boolean {
  const currentPath = route.path

  if (item.children?.length) {
    return item.children.some((child) => {
      if (child.children?.length) {
        return isActive(child)
      }

      return child.path === currentPath
    })
  }

  return item.path === currentPath
}

/**
 * 滚动条组件的引用
 */
const scrollbarRef = ref()

/**
 * 是否显示左侧滚动箭头
 */
const showLeftArrow = ref(false)

/**
 * 是否显示右侧滚动箭头
 */
const showRightArrow = ref(false)

/**
 * 处理滚动事件以确定箭头显示状态
 */
function handleScroll() {
  if (!scrollbarRef.value) {
    return
  }

  const { scrollLeft, scrollWidth, clientWidth } = scrollbarRef.value.wrapRef

  showLeftArrow.value = scrollLeft > 0
  showRightArrow.value = scrollLeft + clientWidth < scrollWidth
}

/**
 * 水平滚动菜单
 * @param {'left'|'right'} direction - 滚动方向('left'向左/'right'向右)
 */
function scroll(direction: 'left' | 'right') {
  if (!scrollbarRef.value) {
    return
  }

  const scrollDistance = 200 // 每次滚动的距离

  const currentScroll = scrollbarRef.value.wrapRef.scrollLeft

  const targetScroll = direction === 'left'
    ? currentScroll - scrollDistance
    : currentScroll + scrollDistance

  scrollbarRef.value.wrapRef.scrollTo({
    left: targetScroll,
    behavior: 'smooth', // 平滑滚动效果
  })
}

// 组件挂载时初始化滚动状态
onMounted(() => {
  handleScroll()
})
</script>

<template>
  <div
    class="mixed-top-menu"
  >
    <!-- 左侧滚动按钮 -->
    <div
      v-show="showLeftArrow"
      class="scroll-btn left"
      @click="scroll('left')"
    >
      <el-icon>
        <ArrowLeft />
      </el-icon>
    </div>

    <!-- 菜单滚动区域 -->
    <el-scrollbar
      ref="scrollbarRef"
      wrap-class="scrollbar-wrapper"
      :horizontal="true"
      @scroll="handleScroll"
    >
      <div
        class="scroll-bar"
      >
        <!-- 遍历菜单列表 -->
        <template
          v-for="item in list"
          :key="item.meta.title"
        >
          <!-- 单个菜单项 -->
          <div
            v-if="!item.meta.isHide"
            class="item"
            :class="{ active: isActive(item) }"
            @click="blogMenuJump(item, true)"
          >
            <!-- 菜单图标 -->
            <svgIcon
              v-if="item.meta.icon"
              :icon="item.meta.icon"
              :size="26"
              class="mr-2"
            />

            <!-- 菜单标题 -->
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
      </div>
    </el-scrollbar>

    <!-- 右侧滚动按钮 -->
    <div
      v-show="showRightArrow"
      class="scroll-btn right"
      @click="scroll('right')"
    >
      <el-icon>
        <ArrowRight />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 顶部混合菜单容器 */
.mixed-top-menu {
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  overflow: hidden;

  /* 水平滚动条样式 */
  :deep(.el-scrollbar__bar.is-horizontal) {
    bottom: 5px;
    display: none;
    height: 2px;
  }

  /* 滚动区域包装器样式 */
  :deep(.scrollbar-wrapper) {
    width: calc(60vw - v-bind(menuOpenWidth));
    margin: 0 30px;
  }

  /* 滚动条内容区域 */
  .scroll-bar {
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    height: 60px;
    white-space: nowrap;

    /* 单个菜单项样式 */
    .item {
      position: relative;
      height: 40px;
      padding: 0 12px;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      border-radius: 6px;

      /* 菜单图标样式 */
      i {
        margin-right: 5px;
        font-size: 15px;
      }

      /* 悬停效果 */
      &:hover {
        color: var(--main-color);
      }

      /* 激活状态样式 */
      &.active {
        color: var(--main-color);
        background-color: var(--main-bg-color);

        /* 激活状态下的底部指示条 */
        &::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          margin: auto;
          content: '';
          background-color: var(--main-color);
        }
      }
    }
  }

  /* 滚动按钮样式 */
  .scroll-btn {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transform: translateY(-50%);

    /* 悬停效果 */
    &:hover {
      color: var(--main-color);
    }

    /* 左侧按钮位置 */
    &.left {
      left: 0;
    }

    /* 右侧按钮位置 */
    &.right {
      right: 0;
    }
  }
}

/* 笔记本设备下的响应式样式 */
@media (max-width: $device-notebook) {
  .mixed-top-menu {
    :deep(.scrollbar-wrapper) {
      width: calc(48vw - v-bind(menuOpenWidth));
      margin: 0 30px;
    }
  }
}
</style>
