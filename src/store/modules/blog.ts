import { blogConfig } from '@/config'

import { defineStore } from 'pinia'

import { ref } from 'vue'

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
    menuThemeType: BlogTypeTest.MenuThemeEnum.DESIGN,
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

    isDark: false,
    menuTheme: blogConfig.menuThemeList[0],
    searchHistoryList: [],
  })

  // watchEffect(() => {
  //   state.value.isDark = state.value.systemThemeType === BlogTypeTest.SystemThemeModeEnum.DARK

  //   state.value.menuTheme = (
  //     state.value.isDark
  //       ? blogConfig.menu.menuDarkThemeList
  //       : blogConfig.menu.menuThemeList
  //   ).find(item => item.theme === state.value.menuThemeType) ?? blogConfig.menu.menuThemeList[0]

  //   state.value.menuOpenWidth = state.value.menuOpenWidth || blogConfig.menu.menuDefaultOpenWidth

  //   state.value.menuCloseWidth = state.value.menuCloseWidth || blogConfig.menu.menuDefaultCloseWidth

  //   state.value.customRadius = state.value.customRadius || blogConfig.setting.defaultCustomRadius
  // })

  return {
    state,
  }
})
