<script setup lang="ts">

import {
  MenuTypeEnum,
  MenuWidth,
} from '@/enums/appEnum'

import { useMenuStore } from '@/store/modules/menu'

import { useSettingStore } from '@/store/modules/setting'

import { blogMittBus } from '@/utils'

import { themeAnimation } from '@/utils/theme/animation'

import { useFullscreen } from '@vueuse/core'

import Breadcrumb from '../Breadcrumb/index.vue'

import FastEnter from '../FastEnter/index.vue'

import MenuTop from '../MenuTop/index.vue'

import MixedMenu from '../MixedMenu/index.vue'

const isWindows = navigator.userAgent.includes('Windows')

const settingStore = useSettingStore()

/**
 *  显示菜单按钮
 */
const showMenuButton = computed(() => settingStore.showMenuButton)

const showRefreshButton = computed(() => settingStore.showRefreshButton)

const menuOpen = computed(() => settingStore.menuOpen)

const showCrumbs = computed(() => settingStore.showCrumbs)

const menuList = computed(() => useMenuStore().menuList)

const menuType = computed(() => settingStore.menuType)

const isLeftMenu = computed(() => menuType.value === MenuTypeEnum.LEFT)

const isDualMenu = computed(() => menuType.value === MenuTypeEnum.DUAL_MENU)

const isTopMenu = computed(() => menuType.value === MenuTypeEnum.TOP)

const isTopLeftMenu = computed(() => menuType.value === MenuTypeEnum.TOP_LEFT)

const isDark = computed(() => settingStore.isDark)

/**
 *  计算菜单主题
 */
const theme = computed(() => settingStore.getMenuTheme)

const { width } = useWindowSize()

/**
 *   顶部菜单宽度
 */
const menuTopWidth = computed(() => {
  return width.value * 0.5
})

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

function toggleFullScreen() {
  toggleFullscreen()
}

function topBarWidth(): string {
  const { TOP, DUAL_MENU } = MenuTypeEnum

  const { getMenuOpenWidth } = settingStore

  switch (menuType.value) {
    case TOP:
      return '100%'
    case DUAL_MENU:
      return `calc(100% - 80px - ${getMenuOpenWidth})`
    default:
      return menuOpen.value
        ? `calc(100% - ${getMenuOpenWidth})`
        : `calc(100% - ${MenuWidth.CLOSE})`
  }
}

function visibleMenu() {
  settingStore.setMenuOpen(!menuOpen.value)
}

/**
 *  刷新
 */
function reload(time: number = 0) {
  setTimeout(() => {
    settingStore.reload()
  }, time)
}

/**
 *  打开设置
 */
function openSetting() {
  blogMittBus.emit('openSetting')
}

/**
 *  打开顶部搜索框
 */
function openSearchDialog() {
  blogMittBus.emit('openSearchDialog')
}

</script>

<template>
  <div
    class="top-bar"
    :style="{ width: topBarWidth() }"
  >
    <div
      class="menu"
    >
      <div
        class="left"
        style="display: flex"
      >

        <!-- 当前是顶部菜单 -->
        <Logo
          v-if="isTopMenu"
          :is-hide-text="width <= 1400"
          :text-color="theme.theme === 'dark' ? 'white' : 'black'"
          class="m-l-4 block"
        />

        <!-- 手机端显示这个logo -->
        <Logo
          :is-hide-text="true"
          :text-color="theme.theme === 'dark' ? 'white' : 'black'"
          class="svg-icon m-l-4 block"
        />

        <!-- 菜单按钮 -->

        <div
          v-if="isLeftMenu && showMenuButton"
          class="btn-box"
        >
          <div
            class="btn menu-btn"
            @click="visibleMenu"
          >
            <SvgIcon
              :icon="menuOpen ? 'arrow-left' : 'arrow-right'"
            />
          </div>
        </div>

        <!-- 刷新按钮 -->
        <div
          v-if="showRefreshButton"
          class="btn-box"
          @click="reload()"
        >
          <div
            class="btn refresh-btn"
            :style="{ marginLeft: !isLeftMenu ? '10px' : '0' }"
          >
            <SvgIcon
              icon="blog-refresh"
            />
          </div>
        </div>

        <!-- 快速入口 -->
        <FastEnter
          v-if="width >= 1200"
        />

        <!-- 面包屑 -->
        <Breadcrumb
          v-if="(showCrumbs && isLeftMenu) || (showCrumbs && isDualMenu)"
          :style="{ paddingLeft: !showRefreshButton && !showMenuButton ? '10px' : '0' }"
        />

        <!-- 顶部菜单 -->
        <MenuTop
          v-if="isTopMenu"
          :list="menuList"
          :width="menuTopWidth"
        />

        <!-- 混合菜单-顶部 -->
        <MixedMenu
          v-if="isTopLeftMenu"
          :list="menuList"
          :width="menuTopWidth"
        />
      </div>

      <div
        class="right"
      >
        <!-- 搜索 -->
        <div
          class="search-wrap"
        >
          <div
            class="search-input"
            @click="openSearchDialog"
          >
            <div
              class="left"
            >
              <i
                class="iconfont-sys"
              >&#xe710;</i>

              <span>搜索</span>
            </div>

            <div
              class="search-keydown"
            >
              <i
                v-if="isWindows"
                class="iconfont-sys"
              >&#xeeac;</i>

              <i
                v-else
                class="iconfont-sys"
              >&#xe9ab;</i>

              <span>k</span>
            </div>
          </div>
        </div>

        <!-- 全屏按钮 -->
        <div
          class="btn-box screen-box"
          @click="toggleFullScreen"
        >
          <div
            class="btn"
            :class="{ 'full-screen-btn': !isFullscreen, 'exit-full-screen-btn': isFullscreen }"
          >
            <i
              class="iconfont-sys"
            >{{ isFullscreen ? '&#xe62d;' : '&#xe8ce;' }}</i>
          </div>
        </div>

        <!-- 设置 -->

        <div
          class="btn-box"
          @click="openSetting"
        >
          <div
            class="btn theme-btn"
          >
            <i
              class="iconfont-sys"
            >&#xe6d0;</i>
          </div>
        </div>

        <!-- 切换主题 -->
        <div
          class="btn-box"
          @click="themeAnimation"
        >
          <div
            class="btn theme-btn"
          >
            <i
              class="iconfont-sys"
            >{{ isDark ? '&#xe6b5;' : '&#xe725;' }}</i>
          </div>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @use './style';
@use './mobile';
</style>
