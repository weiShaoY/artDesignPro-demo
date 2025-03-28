/**
 *  博客模块类型
 */
declare namespace BlogTypeTest {

  /**
   *  全局主题模式枚举
   */
  enum SystemThemeModeEnum {

    /** 深色主题 */
    DARK = 'dark',

    /** 亮色主题 */
    LIGHT = 'light',

    /** 自动模式（跟随系统） */
    AUTO = 'auto',
  }

  /**
   * 菜单主题模式枚举
   * @enum {string}
   */
  enum MenuThemeModeEnum {

    /** 深色主题 */
    DARK = 'dark',

    /** 亮色主题 */
    LIGHT = 'light',

    /** 设计主题 */
    DESIGN = 'design',
  }

  /**
   *  菜单主题
   */
 type MenuTheme = {

   /** 当前主题模式 */
   theme: MenuThemeModeEnum

   /** 菜单背景色 */
   background: string

   /** 系统名称颜色 */
   systemNameColor: string

   /** 普通文本颜色 */
   textColor: string

   /** 激活状态文本颜色 */
   textActiveColor: string

   /** 图标颜色 */
   iconColor: string

   /** 激活状态图标颜色 */
   iconActiveColor: string

   /** 标签栏背景色 */
   tabBarBackground: string

   /** 系统背景色 */
   systemBackground: string

   /** 左侧分割线颜色 */
   leftLineColor: string

   /** 右侧分割线颜色 */
   rightLineColor: string

   /** 图片 */
   img?: string
 }

 /** 菜单布局类型 */
 enum MenuLayoutEnum {

   /** 左侧菜单 */
   LEFT = 'left',

   /** 顶部菜单 */
   TOP = 'top',

   /** 顶部 + 左侧菜单 */
   TOP_LEFT = 'top-left',

   /** 双菜单 */
   DUAL_MENU = 'dual-menu',
 }

 /**
  *  容器宽度枚举
  */
 enum ContainerWidthEnum {

   /** 全屏宽度 */
   FULL = '100%',

   /** 盒子布局（固定宽度） */
   BOXED = '1200px',
 }

 type WorkTabType = {

   /** 标签页标题 */
   title: string

   /** 路由路径 */
   path: string

   /** 路由名称 */
   name: string

   /** 是否保持页面状态 */
   keepAlive: boolean

   /** 路由参数 */
   params?: Record<string, any>

   /** 路由查询参数 */
   query?: Record<string, any>
 }

 type SettingType = {

   /** 菜单布局 */
   menuLayout: MenuLayoutEnum

   /** 菜单主题类型 */
   menuThemeType: MenuThemeModeEnum

   /** 菜单展开宽度 */
   menuOpenWidth: number

   /**  菜单关闭宽度 */
   menuCloseWidth: number

   /** 全局主题类型 light dark */
   systemThemeType: SystemThemeModeEnum

   /** 全局主题模式 light dark auto */
   systemThemeMode: SystemThemeModeEnum

   /** 系统主题颜色 */
   systemThemeColor: string

   /** 盒子模式 border | shadow */
   boxBorderMode: boolean

   /** 是否开启手风琴模式 */
   uniqueOpened: boolean

   /** 是否显示菜单展开按钮 */
   showMenuButton: boolean

   /** 是否显示页面刷新按钮 */
   showRefreshButton: boolean

   /** 是否显示全局面包屑 */
   showCrumbs: boolean

   /** 设置后是否自动关闭窗口 */
   autoClose: boolean

   /** 是否显示多标签 */
   showWorkTab: boolean

   /** 是否显示多语言选择 */
   showLanguage: boolean

   /** 是否显示顶部进度条 */
   showNprogress: boolean

   /** 是否显示弱色模式 */
   colorWeak: boolean

   /** 是否显示设置引导 */
   showSettingGuide: boolean

   /** 页面切换动画 */
   pageTransition: string

   /** 菜单是否展开 */
   menuOpen: boolean

   /** 页面是否刷新 */
   refresh: boolean

   /** 水印是否显示 */
   watermarkVisible: boolean

   /** 自定义圆角 */
   customRadius: string

   /** 是否加载完礼花 */
   holidayFireworksLoaded: boolean

   /** 双列菜单是否显示文本 */
   dualMenuShowText: boolean

   /** 容器宽度 */
   containerWidth: ContainerWidthEnum

 }
}
