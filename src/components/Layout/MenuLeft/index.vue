<!-- 左侧菜单 或 双列菜单 -->
<template>
  <div class="left-menu-or-dual-menu">
    <!-- 双列菜单（左侧） -->
    <div class="dual-menu-left" :style="{ background: theme.background }" v-if="isDualMenu">
      <svg class="svg-icon" aria-hidden="true" @click="toHome">
        <use xlink:href="#iconsys-zhaopian-copy"></use>
      </svg>
      <el-scrollbar style="height: calc(100% - 135px)">
        <ul>
          <li v-for="menu in firstLevelMenus" :key="menu.path" @click="handleMenuJump(menu, true)">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t(menu.meta.title)"
              placement="right"
              :offset="25"
              :hide-after="0"
              :disabled="settingStore.dualMenuShowText"
            >
              <div
                :class="{
                  'is-active': menu.meta.isInMainContainer
                    ? menu.path === route.path
                    : menu.path === firstLevelMenuPath
                }"
                :style="{
                  margin: settingStore.dualMenuShowText ? '5px' : '15px',
                  height: settingStore.dualMenuShowText ? '60px' : '46px'
                }"
              >
                <i
                  class="iconfont-sys"
                  v-html="menu.meta.icon"
                  :style="{
                    fontSize: settingStore.dualMenuShowText ? '18px' : '22px',
                    marginBottom: settingStore.dualMenuShowText ? '5px' : '0'
                  }"
                ></i>
                <span v-if="settingStore.dualMenuShowText">
                  {{ $t(menu.meta.title) }}
                </span>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-scrollbar>
      <div class="switch-btn" @click="setDualMenuMode">
        <i class="iconfont-sys">&#xe798;</i>
      </div>
    </div>

    <!-- 左侧菜单 || 双列菜单（右侧） -->
    <div
      class="menu-left"
      id="menu-left"
      :class="`menu-left-${theme.theme} menu-left-${collapse ? 'close' : 'open'}`"
      :style="{ background: theme.background }"
    >
      <div class="header" @click="toHome" :style="{ background: theme.background }">
        <svg class="svg-icon" aria-hidden="true" v-if="!isDualMenu">
          <use xlink:href="#iconsys-zhaopian-copy"></use>
        </svg>
        <p
          :class="{ 'is-dual-menu-name': isDualMenu }"
          :style="{ color: theme.systemNameColor, opacity: collapse ? 0 : 1 }"
        >
          {{ SystemInfo.name }}
        </p>
      </div>
      <el-menu
        :class="'el-menu-' + theme.theme"
        :collapse="collapse"
        :default-active="routerPath"
        :text-color="theme.textColor"
        :unique-opened="uniqueOpened"
        :background-color="theme.background"
        :active-text-color="theme.textActiveColor"
        :default-openeds="defaultOpenedsArray"
        :popper-class="`menu-left-${theme.theme}-popper`"
      >
        <submenu :list="menuList" :isMobile="isMobileModel" :theme="theme" @close="closeMenu" />
      </el-menu>

      <div
        class="menu-model"
        @click="visibleMenu"
        :style="{
          opacity: collapse ? 0 : 1,
          transform: showMobileModel ? 'scale(1)' : 'scale(0)'
        }"
      >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 导入子菜单组件
  import Submenu from '../Submenu/submenu.vue'
  // 导入路由常量
  import { HOME_PAGE } from '@/router/index'
  // 导入设置存储模块
  import { useSettingStore } from '@/store/modules/setting'
  // 导入系统信息配置
  import { SystemInfo } from '@/config/setting'
  // 导入菜单类型和宽度枚举
  import { MenuTypeEnum, MenuWidth } from '@/enums/appEnum'
  // 导入菜单存储模块
  import { useMenuStore } from '@/store/modules/menu'
  // 导入工具函数，判断是否为 iframe
  import { isIframe } from '@/utils/utils'
  // 导入菜单跳转处理函数
  import { handleMenuJump } from '@/utils/jump'
  import { t } from '@wangeditor/editor'

  // 使用路由和路由实例
  const route = useRoute()
  const router = useRouter()
  // 使用设置存储实例
  const settingStore = useSettingStore()
  // 计算菜单展开时的宽度
  const menuOpenWidth = computed(() => settingStore.getMenuOpenWidth)
  // 菜单关闭时的宽度
  const menuCloseWidth = MenuWidth.CLOSE
  /**
   *  判断是否为顶部左侧菜单
   */
  const isTopLeftMenu = computed(() => settingStore.menuType === MenuTypeEnum.TOP_LEFT)

  /**
   *  判断是否为双列菜单
   */
  const isDualMenu = computed(() => settingStore.menuType === MenuTypeEnum.DUAL_MENU)

  // 计算菜单是否折叠
  const collapse = computed(() => !settingStore.menuOpen)
  // 计算菜单是否唯一展开
  const uniqueOpened = computed(() => settingStore.uniqueOpened)
  // 默认展开的菜单项数组
  const defaultOpenedsArray = ref([])

  /**
   *  计算一级菜单列表
   */
  const firstLevelMenus = computed(() => {
    return useMenuStore().getMenuList
  })

  // 打印一级菜单列表

  /**
   *  计算当前显示的菜单列表
   */
  const menuList = computed(() => {
    const list = useMenuStore().getMenuList

    // 如果不是顶部左侧菜单或双列菜单，直接返回完整菜单列表
    if (!isTopLeftMenu.value && !isDualMenu.value) {
      return list
    }

    //  /blog/document/elementui

    // 处理 一级路由 并且是 iframe 路由
    if (route.meta.isInMainContainer && route.meta.isIframe) {
      // 遍历一级菜单查找匹配的子菜单
      for (const menu of list) {
        if (menu.path === route.path) {
            return [menu]
        }
      }
      // 如果没有找到匹配的子菜单，返回空数组
      return []
    }
    


    // 处理主容器内的一级菜单
    if (route.meta.isInMainContainer) {
      return list.filter((menu) => menu.meta.isInMainContainer)
    }

    //  处理 iframe 路由
    if (route.meta.isIframe) {
      return findIframeMenuList(route.path, list)
    }

    // 获取当前路由的顶级路径
    // const currentTopPath = `/${route.path.split('/')[1]}`
    const currentTopPath = `/${route.path?.split('/').slice(1, 3).join('/') || ''}`
    
    // 返回当前顶级路径对应的子菜单
    const currentMenu = list.find((menu) => menu.path === currentTopPath)

    return currentMenu?.children ?? []
  })

  /**
   *  查找 iframe 对应的二级菜单列表
   */
  const findIframeMenuList = (currentPath: string, menuList: any[]) => {
    // 递归查找包含当前路径的菜单项
    const hasPath = (items: any[]) => {
      // 遍历菜单项
      for (const item of items) {
        // 如果当前菜单项的路径与当前路径匹配，返回 true
        if (item.path === currentPath) {
          return true
        }
        // 如果当前菜单项有子菜单，递归查找子菜单
        if (item.children && hasPath(item.children)) {
          return true
        }
      }
      // 如果没有找到匹配的路径，返回 false
      return false
    }

    // 遍历一级菜单查找匹配的子菜单
    for (const menu of menuList) {
      // 如果当前一级菜单有子菜单，并且子菜单中包含当前路径
      if (menu.children && hasPath(menu.children)) {
        // 返回匹配的子菜单列表
        return menu.children
      }
    }
    // 如果没有找到匹配的子菜单，返回空数组
    return []
  }

  // 计算一级菜单路径
  const firstLevelMenuPath = computed(() => {
    return route.matched[0].path
  })

  // 计算当前路由路径
  const routerPath = computed(() => {
    return route.path
  })

  // 组件挂载时监听窗口大小变化
  onMounted(() => {
    listenerWindowResize()
  })

  // 移动端模式状态
  const isMobileModel = ref(false)
  // 是否显示移动端模态框
  const showMobileModel = ref(false)
  // 计算菜单主题
  const theme = computed(() => settingStore.getMenuTheme)

  // 监听菜单折叠状态变化
  watch(
    () => collapse.value,
    (collapse: boolean) => {
      if (!collapse) {
        showMobileModel.value = true
      }
    }
  )

  // 跳转到首页
  const toHome = () => {
    router.push(HOME_PAGE)
  }

  // 屏幕宽度变量
  let screenWidth = 0

  // 监听窗口大小变化
  const listenerWindowResize = () => {
    screenWidth = document.body.clientWidth

    setMenuModel()

    window.onresize = () => {
      return (() => {
        screenWidth = document.body.clientWidth
        setMenuModel()
      })()
    }
  }

  // 设置菜单模式
  const setMenuModel = () => {
    // 小屏幕折叠菜单
    if (screenWidth < 800) {
      settingStore.setMenuOpen(false)
    }
  }

  // 显示或隐藏菜单
  const visibleMenu = () => {
    settingStore.setMenuOpen(!!collapse.value)

    // 移动端模态框
    if (!showMobileModel.value) {
      showMobileModel.value = true
    } else {
      setTimeout(() => {
        showMobileModel.value = false
      }, 200)
    }
  }

  // 关闭菜单
  const closeMenu = () => {
    if (document.body.clientWidth < 800) {
      settingStore.setMenuOpen(false)
      showMobileModel.value = false
    }
  }

  // 设置双列菜单模式
  const setDualMenuMode = () => {
    settingStore.setDualMenuShowText(!settingStore.dualMenuShowText)
  }
</script>
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
