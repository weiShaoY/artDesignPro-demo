<!-- 左侧菜单 或 双列菜单 -->
<script setup lang="ts">

/**
 *  导入菜单类型和宽度枚举
 */
import { MenuTypeEnum } from '@/enums/appEnum'

/**
 *  导入设置存储模块
 */
import { useSettingStore } from '@/store'

/**
 *  导入菜单跳转处理函数
 */
import { blogMenuJump } from '@/utils/blogMenuJump'

/**
 *  导入子菜单组件
 */
import Submenu from '../Submenu/index.vue'

/**
 *  使用路由和路由实例
 */
const route = useRoute()

/**
 *  使用设置存储实例
 */
const settingStore = useSettingStore()

/**
 *  计算菜单展开时的宽度
 */
const menuOpenWidth = computed(() => settingStore.getMenuOpenWidth)

/**
 *  菜单关闭时的宽度
 */
const menuCloseWidth = computed(() => settingStore.getMenuCloseWidth)

/**
 *  判断是否为顶部左侧菜单
 */
const isTopLeftMenu = computed(() => settingStore.menuType === MenuTypeEnum.TOP_LEFT)

/**
 *  判断是否为双列菜单
 */
const isDualMenu = computed(() => settingStore.menuType === MenuTypeEnum.DUAL_MENU)

/**
 *  计算菜单是否折叠
 */
const collapse = computed(() => !settingStore.menuOpen)

/**
 *  计算菜单是否唯一展开
 */
const uniqueOpened = computed(() => settingStore.uniqueOpened)

/**
 *  默认展开的菜单项数组
 */
const defaultOpenedsArray = ref([])

/**
 *  计算一级菜单列表
 */
const firstLevelMenus = computed(() => {
  return settingStore.menuList
})

/**
 *  计算当前显示的菜单列表
 */
const menuList = computed(() => {
  const list = settingStore.menuList

  /**
   *  如果不是顶部左侧菜单或双列菜单，直接返回完整菜单列表
   */
  if (!isTopLeftMenu.value && !isDualMenu.value) {
    return list
  }

  /**
   *  处理一级路由（包括 iframe 路由）
   */
  if (route.meta?.isInMainContainer) {
    for (const menu of list) {
      if (menu.path === route.path) {
        return [menu]
      }
    }

    return []
  }

  /**
   *  处理 iframe 路由
   */
  if (route.meta?.iframeUrl) {
    for (const menu of list) {
      if (menu.children) {
        const iframeMenu = menu.children.find(child => child.path === route.path)

        if (iframeMenu) {
          return menu.children
        }
      }
    }

    return []
  }

  /**
   *  获取当前路由的顶级路径
   */
  const pathSegments = route.path?.split('/').filter(Boolean) || []

  /**
   *  获取当前路由的顶级路径
   */
  const currentTopPath = `/${pathSegments.slice(0, 2).join('/')}`

  /**
   *  返回当前顶级路径对应的子菜单
   */
  const currentMenu = list.find(menu => menu.path === currentTopPath)

  return currentMenu?.children || []
})

/**
 *  计算一级菜单路径
 */
const firstLevelMenuPath = computed(() => {
  return route.matched[0].path
})

/**
 *  计算当前路由路径
 */
const routerPath = computed(() => {
  return route.path
})

/**
 *  移动端模式状态
 */
const isMobileModel = ref(false)

/**
 *  是否显示移动端模态框
 */
const showMobileModel = ref(false)

/**
 *  计算菜单主题
 */
const theme = computed(() => settingStore.getMenuTheme)

/**
 *  屏幕宽度变量
 */
let screenWidth = 0

/**
 *  设置菜单模式
 */
function setMenuModel() {
  /**
   *  小屏幕折叠菜单
   */
  if (screenWidth < 800) {
    settingStore.setMenuOpen(false)
  }
}

/**
 *  切换菜单显示或隐藏
 */
function toggleMenuVisible() {
  settingStore.setMenuOpen(!!collapse.value)

  /**
   *  移动端模态框
   */
  if (!showMobileModel.value) {
    showMobileModel.value = true
  }
  else {
    setTimeout(() => {
      showMobileModel.value = false
    }, 200)
  }
}

/**
 *  关闭菜单
 */
function closeMenu() {
  if (document.body.clientWidth < 800) {
    settingStore.setMenuOpen(false)
    showMobileModel.value = false
  }
}

/**
 *  设置双列菜单模式
 */
function setDualMenuMode() {
  settingStore.setDualMenuShowText(!settingStore.dualMenuShowText)
}

/**
 *  监听窗口大小
 */
function listenerWindowResize() {
  screenWidth = document.body.clientWidth

  setMenuModel()

  window.onresize = () => {
    return (() => {
      screenWidth = document.body.clientWidth
      setMenuModel()
    })()
  }
}

/**
 *  组件挂载时监听窗口大小变化
 */
onMounted(() => {
  listenerWindowResize()
})

/**
 *  监听菜单折叠状态变化
 */
watch(
  () => collapse.value,
  (collapse: boolean) => {
    if (!collapse) {
      showMobileModel.value = true
    }
  },
)
</script>

<template>
  <div
    class="left-menu-or-dual-menu"
  >
    <!-- 双列菜单（左侧） -->
    <div
      v-if="isDualMenu"
      class="dual-menu-left"
      :style="{ background: theme.background }"
    >

      <div
        class="h-15 w-full flex items-center justify-center"
      >
        <Logo
          :is-hide-text="true"
        />
      </div>

      <el-scrollbar
        style="height: calc(100% - 135px)"
      >

        <ul>
          <li
            v-for="menu in firstLevelMenus"
            :key="menu.path"
            @click="blogMenuJump(menu, true)"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="menu.meta.title"
              placement="right"
              :offset="25"
              :hide-after="0"
              :disabled="settingStore.dualMenuShowText"
            >
              <div
                :class="{
                  'is-active': menu.meta.isInMainContainer
                    ? menu.path === route.path
                    : menu.path === firstLevelMenuPath,
                }"
                :style="{
                  margin: settingStore.dualMenuShowText ? '5px' : '15px',
                  height: settingStore.dualMenuShowText ? '80px' : '46px',
                }"
              >
                <SvgIcon
                  v-if="menu.meta.icon"
                  :icon="menu.meta.icon"
                  :size="26"
                />

                <span
                  v-if="settingStore.dualMenuShowText"
                >
                  {{ menu.meta.title }}
                </span>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-scrollbar>

      <div
        class="switch-btn hover:cursor-pointer"
        @click="setDualMenuMode"
      >
        <SvgIcon
          icon="blog-switch"
        />
      </div>

    </div>

    <!-- 左侧菜单 || 双列菜单（右侧） -->
    <div
      id="menu-left"
      class="menu-left"
      :class="`menu-left-${theme.theme} menu-left-${collapse ? 'close' : 'open'}`"
      :style="{ background: theme.background }"
    >
      <div
        class="header h-15 flex items-center justify-center"
      >
        <!-- 如果是双列菜单 则隐藏 logo  -->
        <!-- 如果是双列菜单 则不隐藏文字  -->
        <Logo
          :is-hide-logo="isDualMenu"
          :is-hide-text="collapse"
          :text-color="theme.theme === 'dark' ? 'white' : 'black'"
        />
      </div>

      <el-menu
        :class="`el-menu-${theme.theme}`"
        :collapse="collapse"
        :default-active="routerPath"
        :text-color="theme.textColor"
        :unique-opened="uniqueOpened"
        :background-color="theme.background"
        :active-text-color="theme.textActiveColor"
        :default-openeds="defaultOpenedsArray"
        :popper-class="`menu-left-${theme.theme}-popper`"
      >
        <Submenu
          :list="menuList"
          :is-mobile="isMobileModel"
          :theme="theme"
          @close="closeMenu"
        />

      </el-menu>

      <div
        class="menu-model"
        :style="{
          opacity: collapse ? 0 : 1,
          transform: showMobileModel ? 'scale(1)' : 'scale(0)',
        }"
        @click="toggleMenuVisible"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use './style';
</style>

<style lang="scss">
  @use './theme';

.menu-left {
  // 展开的宽度
  .el-menu:not(.el-menu--collapse) {
    width: v-bind(menuOpenWidth);
  }

  // 折叠后宽度
  .el-menu--collapse {
    width: v-bind(menuCloseWidth);
  }
}
</style>
