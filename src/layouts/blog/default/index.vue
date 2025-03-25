<script setup lang="ts">

/**
 *  导入枚举类型
 */
import { MenuTypeEnum, MenuWidth } from '@/enums/appEnum'

/**
 *  导入状态管理模块
 */
import { useMenuStore } from '@/store/modules/menu'

import { useSettingStore } from '@/store/modules/setting'

import { useWorkTabStore } from '@/store/modules/workTab'

/**
 *  导入工具函数
 */
import { blogMittBus } from '@/utils'

import {
  computed,
  nextTick,
  ref,
  watch,
} from 'vue'

/**
 *  导入组件
 */
import Fireworks from './components/Fireworks/index.vue'

import MenuLeft from './components/MenuLeft/index.vue'

import Search from './components/Search/index.vue'

import Setting from './components/Setting/index.vue'

import TopBar from './components/TopBar/index.vue'

import Watermark from './components/Watermark/index.vue'

import WorkTab from './components/WorkTab/index.vue'

/**
 *  导入样式文件
 */
import '@/assets/styles/transition.scss'

/**
 *  网络状态监控
 */
const { isOnline } = useNetwork()

/**
 *  获取全局状态存储
 */
const settingStore = useSettingStore()

const menuStore = useMenuStore()

const workTabStore = useWorkTabStore()

/**
 *  计算菜单打开状态
 */
const menuOpen = computed(() => settingStore.menuOpen)

/**
 *  计算工作标签显示状态
 */
const showWorkTab = computed(() => settingStore.showWorkTab)

/**
 *  计算页面刷新状态
 */
const refresh = computed(() => settingStore.refresh)

/**
 *  计算页面过渡动画设置
 */
const pageTransition = computed(() => settingStore.pageTransition)

/**
 *  计算当前菜单类型
 */
const menuType = computed(() => settingStore.menuType)

/**
 *  计算水印显示状态
 */
const watermarkVisible = computed(() => settingStore.watermarkVisible)

/**
 *  判断是否为双列菜单
 */
const isDualMenu = computed(() => settingStore.menuType === MenuTypeEnum.DUAL_MENU)

/**
 *  计算容器宽度
 */
const containerWidth = computed(() => settingStore.containerWidth)

/**
 *  获取需要排除缓存的组件列表
 */
const keepAliveExclude = computed(() => workTabStore.keepAliveExclude)

/**
 *  判断是否需要显示左侧菜单
 */
const showLeftMenu = computed(
  () => menuType.value === MenuTypeEnum.LEFT || menuType.value === MenuTypeEnum.TOP_LEFT,
)

/**
 *  计算左侧填充宽度
 *  @description 根据菜单状态动态计算布局间距
 */
const paddingLeft = computed(() => {
  const width = menuOpen.value ? settingStore.getMenuOpenWidth : MenuWidth.CLOSE

  menuStore.menuWidth = width // 更新菜单宽度状态

  // 双列菜单特殊处理
  if (menuType.value === MenuTypeEnum.DUAL_MENU) {
    return `calc(${width} + 80px)`
  }

  return menuType.value !== MenuTypeEnum.TOP ? width : 0
})

/**
 *  计算最小高度
 *  @description 根据工作标签状态调整布局高度
 */
const minHeight = computed(() => `calc(100vh - ${showWorkTab.value ? 120 : 75}px)`)

/**
 *  计算顶部填充高度
 */
const paddingTop = computed(() => showWorkTab.value ? '106px' : '60px')

/**
 *  页面刷新状态
 */
const isRefresh = ref(true)

/**
 *  路由信息调试开关
 */
const isOpenRouteInfo = import.meta.env.VITE_OPEN_ROUTE_INFO

/**
 *  执行页面刷新
 *  @description 通过状态切换实现强制重新渲染
 */
function reload() {
  isRefresh.value = false
  nextTick(() => {
    isRefresh.value = true
  })
}

/**
 *  监听刷新状态变化
 */
watch(refresh, () => {
  reload()
})

/**
 *  组件挂载钩子
 */
onMounted(() => {
  // 延迟3秒触发烟花效果
  setTimeout(() => {
    blogMittBus.emit('triggerFireworks')
  }, 3000)
})
</script>

<template>
  <div
    class="frame"
    :style="{ paddingLeft, paddingTop }"
  >
    <!-- 左侧菜单 -->
    <MenuLeft
      v-if="showLeftMenu || isDualMenu"
    />

    <!-- 搜索组件 -->
    <Search />

    <!-- 顶栏 -->
    <TopBar>
      <WorkTab
        v-if="showWorkTab"
      />
    </TopBar>

    <!-- 内容区域 -->
    <div
      class="container"
      :style="{ maxWidth: containerWidth }"
    >
      <!-- 节日文本滚动 -->
      <festival-text-scroll />

      <router-view
        v-if="isRefresh && isOnline"
        v-slot="{ Component, route }"
        :style="{ minHeight }"
      >
        <!-- 路由信息，方便开发者调试 -->
        <div
          v-if="isOpenRouteInfo === 'true'"
        >
          {{ route.meta }}
        </div>

        <transition
          :name="pageTransition"
          mode="out-in"
          appear
        >
          <keep-alive
            :max="10"
            :exclude="keepAliveExclude"
          >
            <component
              :is="Component"
              v-if="route.meta.keepAlive"
              :key="route.path"
            />
          </keep-alive>
        </transition>

        <transition
          :name="pageTransition"
          mode="out-in"
          appear
        >
          <component
            :is="Component"
            v-if="!route.meta.keepAlive"
            :key="route.path"
          />
        </transition>
      </router-view>

      <!-- 网络异常提示组件 -->
      <network
        v-else
      />
    </div>

    <!-- 个性化设置 -->
    <Setting />

    <!-- 烟花组件 -->
    <Fireworks />

    <!-- 水印组件 -->
    <Watermark
      :visible="watermarkVisible"
    />
  </div>
</template>

<style lang="scss" scoped>
  .frame {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: var(--art-bg-color);
  transition: padding 0.3s ease-in-out;

  .container {
    box-sizing: border-box;
    width: calc(100% - 40px);
    margin: auto;

    // 子页面默认style
    :deep(.page-content) {
      position: relative;
      box-sizing: border-box;
      padding: 20px;
      overflow: hidden;
      background: var(--art-main-bg-color);
      border-radius: calc(var(--custom-radius) / 2 + 2px) !important;
    }
  }
}

@media only screen and (max-width: $device-ipad) {
  .frame {
    width: 100%;
    min-height: 100vh;
    padding-left: 0 !important;
    overflow-y: scroll;

    .container {
      width: calc(100% - 20px);
    }
  }
}

@media only screen and (max-width: $device-phone) {
  .frame {
    .container {
      width: calc(100% - 32px);
    }
  }
}
</style>
