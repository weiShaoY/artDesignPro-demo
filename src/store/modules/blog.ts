export const useTestStore = defineStore('testStore', () => {
  /**  菜单类型 */
  const menuType = ref(MenuTypeEnum.LEFT)

  /**  菜单展开宽度 */
  const menuOpenWidth = ref(defaultMenuWidth)

  /**  菜单关闭宽度 */
  const menuCloseWidth = ref(defaultCloseMenuWidth)

  /**  全局主题类型 light dark */
  const themeType = ref(SystemThemeEnum.LIGHT)

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

  /**  是否显示顶部进度条 */
  const showNprogress = ref(true)

  /**  色弱模式 */
  const colorWeak = ref(false)

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

  /**  是否为暗黑模式 */
  const isDark = computed(() => systemThemeType.value === SystemThemeEnum.DARK)
})
