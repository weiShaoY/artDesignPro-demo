import { defineStore } from 'pinia'
import { MenuThemeType } from '@/types/store'
import { ThemeList, ElementPlusTheme, DarkMenuStyles, SystemSetting } from '@/config/setting'
import { SystemThemeEnum, MenuThemeEnum, MenuTypeEnum, ContainerWidthEnum } from '@/enums/appEnum'
import { colourBlend, handleElementThemeColor } from '@/utils/colors'
import { getSysStorage } from '@/utils/storage'
import { useCeremony } from '@/composables/useCeremony'
import { ref, computed } from 'vue'

const { defaultMenuWidth, defaultCustomRadius } = SystemSetting

/** Tab 状态管理 */
export const useSettingStore = defineStore('settingStore', () => {
  /**  菜单类型 */
  const menuType = ref(MenuTypeEnum.LEFT)
  /**  菜单展开宽度 */
  const menuOpenWidth = ref(defaultMenuWidth)
  /**  全局主题类型 light dark */
  const systemThemeType = ref(SystemThemeEnum.LIGHT)
  /**  全局主题模式 light dark auto */
  const systemThemeMode = ref(SystemThemeEnum.LIGHT)
  /**  菜单主题类型 */
  const menuThemeType = ref(MenuThemeEnum.DESIGN)
  /**  系统主题颜色 */
  const systemThemeColor = ref(ElementPlusTheme.primary)
  /**  盒子模式 border | shadow */
  const boxBorderMode = ref(true)
  /**  是否开启手风琴模式 */
  const uniqueOpened = ref(true)
  /**  是否显示菜单展开按钮 */
  const showMenuButton = ref(true)
  /**  是否显示页面刷新按钮 */
  const showRefreshButton = ref(true)
  /**  是否显示全局面包屑 */
  const showCrumbs = ref(true)
  /**  设置后是否自动关闭窗口 */
  const autoClose = ref(false)
  /**  是否显示多标签 */
  const showWorkTab = ref(true)
  /**  是否显示多语言选择 */
  const showLanguage = ref(true)
  /**  是否显示顶部进度条 */
  const showNprogress = ref(true)
  /**  色弱模式 */
  const colorWeak = ref(false)
  /**  是否显示设置引导 */
  const showSettingGuide = ref(true)
  /**  页面切换动画 */
  const pageTransition = ref('slide-right')
  /**  菜单是否展开 */
  const menuOpen = ref(true)
  /**  刷新 */
  const refresh = ref(false)
  /**  水印是否显示 */
  const watermarkVisible = ref(false)
  /**  自定义圆角 */
  const customRadius = ref(defaultCustomRadius)
  /**  是否加载完礼花 */
  const holidayFireworksLoaded = ref(false)
  /**  是否显示节日文本 */
  const showFestivalText = ref(false)
  /**  节日日期 */
  const festivalDate = ref('')
  /**  双列菜单是否显示文本 */
  const dualMenuShowText = ref(false)
  /** 容器宽度 */
  const containerWidth = ref(ContainerWidthEnum.FULL)

  /**  获取菜单主题 */
  function getMenuTheme(): MenuThemeType {
    const list = ThemeList.filter((item) => item.theme === menuThemeType.value)
    if (isDark.value) {
      return DarkMenuStyles[0]
    } else {
      return list[0]
    }
  }
  /**  是否为暗黑模式 */
  const isDark = computed(() => systemThemeType.value === SystemThemeEnum.DARK)
  /**  获取菜单展开宽度 */
  const getMenuOpenWidth = computed(() => menuOpenWidth.value + 'px' || defaultMenuWidth + 'px')

  /**  获取自定义圆角 */
  const getCustomRadius = computed(() => customRadius.value + 'rem' || defaultCustomRadius + 'rem')

  /**  节日礼花否显示 */
  const isShowFireworks: ComputedRef<boolean> = computed(() => {
    const currentFestivalDate: string | undefined = useCeremony().currentFestivalData.value?.date
    return festivalDate.value !== currentFestivalDate
  })

  function initState() {
    let sys = getSysStorage()

    if (sys) {
      sys = JSON.parse(sys)
      const { setting } = sys.user
      menuType.value = setting.menuType || MenuTypeEnum.LEFT
      menuOpenWidth.value = Number(setting.menuOpenWidth) || defaultMenuWidth
      systemThemeType.value = setting.systemThemeType || SystemThemeEnum.LIGHT
      systemThemeMode.value = setting.systemThemeMode || SystemThemeEnum.LIGHT
      menuThemeType.value = setting.menuThemeType || MenuThemeEnum.DESIGN
      containerWidth.value = setting.containerWidth || ContainerWidthEnum.FULL
      systemThemeColor.value = setting.systemThemeColor || ElementPlusTheme.primary
      boxBorderMode.value = setting.boxBorderMode
      uniqueOpened.value = setting.uniqueOpened
      showMenuButton.value = setting.showMenuButton
      showRefreshButton.value = setting.showRefreshButton
      showCrumbs.value = setting.showCrumbs
      autoClose.value = setting.autoClose
      showWorkTab.value = setting.showWorkTab
      showLanguage.value = setting.showLanguage
      showNprogress.value = setting.showNprogress
      colorWeak.value = setting.colorWeak
      showSettingGuide.value = setting.showSettingGuide
      pageTransition.value = setting.pageTransition
      menuOpen.value = setting.menuOpen
      watermarkVisible.value = setting.watermarkVisible
      customRadius.value = setting.customRadius || defaultCustomRadius
      holidayFireworksLoaded.value = setting.holidayFireworksLoaded
      showFestivalText.value = setting.showFestivalText
      festivalDate.value = setting.festivalDate
      dualMenuShowText.value = setting.dualMenuShowText
      setCustomRadius(customRadius.value)
      setElementThemeColor(setting.systemThemeColor)
    } else {
      setCustomRadius(customRadius.value)
      setElementThemeColor(ElementPlusTheme.primary)
    }
  }
  function setMenuType(type: MenuTypeEnum) {
    menuType.value = type
  }

  function setMenuOpenWidth(width: number) {
    menuOpenWidth.value = width
  }

  function setGlopTheme(theme: SystemThemeEnum, themeMode: SystemThemeEnum) {
    systemThemeType.value = theme
    systemThemeMode.value = themeMode
  }

  function setMenuTheme(theme: MenuThemeEnum) {
    menuThemeType.value = theme
  }

  function setElementTheme(theme: string) {
    systemThemeColor.value = theme
    setElementThemeColor(theme)
  }

  // 设置盒子模式
  function setBorderMode() {
    boxBorderMode.value = !boxBorderMode.value
  }

  // 设置容器宽度
  function setContainerWidth(width: ContainerWidthEnum) {
    containerWidth.value = width
  }

  // 设置菜单是否为手风琴模式
  function setUniqueOpened() {
    uniqueOpened.value = !uniqueOpened.value
  }

  // 显示侧边栏折叠按钮
  function setButton() {
    showMenuButton.value = !showMenuButton.value
  }

  // 是否自动关闭个性化设置
  function setAutoClose() {
    autoClose.value = !autoClose.value
  }

  // 是否显示页面刷新按钮
  function setShowRefreshButton() {
    showRefreshButton.value = !showRefreshButton.value
  }

  // 是否显示面包屑导航
  function setCrumbs() {
    showCrumbs.value = !showCrumbs.value
  }

  // 是否显示多标签
  function setWorkTab(show: boolean) {
    showWorkTab.value = show
  }

  // 是否显示多语言选择
  function setLanguage() {
    showLanguage.value = !showLanguage.value
  }

  // 是否显示顶部进度条
  function setNprogress() {
    showNprogress.value = !showNprogress.value
  }

  // 色弱模式
  function setColorWeak() {
    colorWeak.value = !colorWeak.value
  }

  // 隐藏设置引导
  function hideSettingGuide() {
    showSettingGuide.value = false
  }

  // 显示设置引导
  function openSettingGuide() {
    showSettingGuide.value = true
  }

  // 设置页面切换动画
  function setPageTransition(transition: string) {
    pageTransition.value = transition
  }

  // 设置菜单是否展开
  function setMenuOpen(open: boolean) {
    menuOpen.value = open
  }

  // 刷新当前页
  function reload() {
    refresh.value = !refresh.value
  }

  // 设置水印是否显示
  function setWatermarkVisible(visible: boolean) {
    watermarkVisible.value = visible
  }

  // 设置自定义圆角
  function setCustomRadius(radius: string) {
    customRadius.value = radius
    document.documentElement.style.setProperty('--custom-radius', `${radius}rem`)
  }

  // 设置是否加载完礼花
  function setholidayFireworksLoaded(isLoad: boolean) {
    holidayFireworksLoaded.value = isLoad
  }

  // 设置是否显示节日文本
  function setShowFestivalText(show: boolean) {
    showFestivalText.value = show
  }

  // 设置节日日期
  function setFestivalDate(date: string) {
    festivalDate.value = date
  }

  // 设置双列菜单是否显示文本
  function setDualMenuShowText(show: boolean) {
    dualMenuShowText.value = show
  }
  return {
    menuType,
    menuOpenWidth,
    systemThemeType,
    systemThemeMode,
    menuThemeType,
    systemThemeColor,
    boxBorderMode,
    uniqueOpened,
    showMenuButton,
    showRefreshButton,
    showCrumbs,
    autoClose,
    showWorkTab,
    showLanguage,
    showNprogress,
    colorWeak,
    showSettingGuide,
    pageTransition,
    menuOpen,
    refresh,
    watermarkVisible,
    customRadius,
    holidayFireworksLoaded,
    showFestivalText,
    festivalDate,
    dualMenuShowText,
    containerWidth,

    //////
    getMenuTheme,
    isDark,
    getMenuOpenWidth,
    getCustomRadius,
    isShowFireworks,
    initState,
    setMenuType,
    setMenuOpenWidth,
    setGlopTheme,
    setMenuTheme,
    setElementTheme,
    setBorderMode,
    setContainerWidth,
    setUniqueOpened,
    setButton,
    setAutoClose,
    setShowRefreshButton,
    setCrumbs,
    setWorkTab,
    setLanguage,
    setNprogress,
    setColorWeak,
    hideSettingGuide,
    openSettingGuide,
    setPageTransition,
    setMenuOpen,
    reload,
    setWatermarkVisible,
    setCustomRadius,
    setholidayFireworksLoaded,
    setShowFestivalText,
    setFestivalDate,
    setDualMenuShowText
  }
})

function setElementThemeColor(color: string) {
  const mixColor = '#ffffff'
  const elStyle = document.documentElement.style

  elStyle.setProperty('--el-color-primary', color)
  handleElementThemeColor(color, useSettingStore().isDark)

  // 生成更淡一点的颜色
  for (let i = 1; i < 16; i++) {
    const itemColor = colourBlend(color, mixColor, i / 16)
    elStyle.setProperty(`--el-color-primary-custom-${i}`, itemColor)
  }
}
