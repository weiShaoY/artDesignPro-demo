import { blogConfig } from '@/config'

import { defineStore } from 'pinia'

import { computed, ref } from 'vue'

export const useBlogStore = defineStore('BlogStore', () => {
  /**
   *  菜单布局
   */
  const state = ref<BlogTypeTest.SettingType>({
    menuLayout: BlogTypeTest.MenuLayoutEnum.LEFT,
    menuOpenWidth: 230,
    menuCloseWidth: 70,
    systemThemeType: BlogTypeTest.SystemThemeModeEnum.LIGHT,
    systemThemeMode: BlogTypeTest.SystemThemeModeEnum.LIGHT,
    menuThemeType: BlogTypeTest.MenuThemeModeEnum.DESIGN,
    systemThemeColor: '#409EFF',
    boxBorderMode: true,
    uniqueOpened: true,
    showMenuButton: true,
    showRefreshButton: true,
    showCrumbs: true,
    autoClose: false,
    showWorkTab: true,
    showLanguage: true,
    showNprogress: true,
    colorWeak: false,
    showSettingGuide: false,
    pageTransition: 'fade',
    menuOpen: true,
    refresh: false,
    watermarkVisible: false,
    customRadius: '0',
    holidayFireworksLoaded: false,
    dualMenuShowText: false,
    containerWidth: BlogTypeTest.ContainerWidthEnum.FULL,

  })

  /**
   *  是否为深色模式
   */
  const isDark = computed(() => state.value.systemThemeType === BlogTypeTest.SystemThemeModeEnum.DARK)

  /**
   *  获取菜单主题
   */
  const getMenuTheme = computed<BlogTypeTest.MenuTheme>(() => {
    const list = blogConfig.menuThemeList.filter(item => item.theme === state.value.menuThemeType)

    if (isDark.value) {
      return blogConfig.menuDarkThemeList[0]
    }
    else {
      return list[0]
    }
  })

  return {
    state,

    /**
     *  是否为深色模式
     */
    isDark,

    /**
     *  获取菜单主题
     */
    getMenuTheme,
  }
})
