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
    isDark: false,
  })

  watchEffect(() => {
    state.value.isDark = state.value.systemThemeType === BlogTypeTest.SystemThemeModeEnum.DARK)
  })

  /**
   *  是否为深色模式
   */

  //  state.value.isDark = computed(() => state.value.systemThemeType === BlogTypeTest.SystemThemeModeEnum.DARK)

  /**
   *  获取菜单主题
   */
  const getMenuTheme = computed<BlogTypeTest.MenuTheme>(() => {
    const list = blogConfig.menu.menuThemeList.filter(item => item.theme === state.value.menuThemeType)

    if (isDark.value) {
      return blogConfig.menu.menuDarkThemeList[0]
    }
    else {
      return list[0]
    }
  })

  /**  获取菜单展开宽度 */
  const getMenuOpenWidth = computed(() => `${state.value.menuOpenWidth}px` || `${blogConfig.menu.menuDefaultOpenWidth}px`)

  /**  获取菜单关闭宽度 */
  const getMenuCloseWidth = computed(() => `${state.value.menuCloseWidth.value}px` || `${blogConfig.menu.menuDefaultCloseWidth}px`)

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

    /**
     *  获取菜单展开宽度
     */
    getMenuOpenWidth,

    /**
     *  获取菜单关闭宽度
     */
    getMenuCloseWidth,
  }
})
