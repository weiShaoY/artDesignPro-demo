/**
 * 博客系统核心类型定义
 * @description 采用分层混合架构，平衡组织性和易用性
 */
declare namespace BlogSystem {

  /** 主题模式 */
  enum ThemeMode {

    /** 暗黑模式 */
    DARK = 'dark',

    /** 浅色模式 */
    LIGHT = 'light',

    /** 自动模式 */
    AUTO = 'auto',
  }

  /** 主题样式配置 */
  type ThemeModeType = {
    [key in Exclude<ThemeMode, ThemeMode.AUTO>]: {

      /** 应用到HTML元素的类名 */
      className: string
    }
  }

  /**
   * 背景颜色枚举
   * @description 包含主色、次要色、警告色、错误色、成功色和危险色
   */
  enum BgColorEnum {

    /** 主色 */
    PRIMARY = 'bg-primary',

    /** 次要色 */
    SECONDARY = 'bg-secondary',

    /** 警告色 */
    WARNING = 'bg-warning',

    /** 错误色 */
    ERROR = 'bg-error',

    /** 成功色 */
    SUCCESS = 'bg-success',

    /** 危险色 */
    DANGER = 'bg-danger',
  }

  /** 菜单主题配置 */
  type MenuTheme = {

    /** 当前主题模式 */
    mode: ThemeMode

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
  enum MenuLayout {

    /** 左侧菜单 */
    LEFT = 'left',

    /** 顶部菜单 */
    TOP = 'top',

    /** 顶部 + 左侧菜单 */
    TOP_LEFT = 'top-left',

    /** 双列菜单 */
    DUAL_MENU = 'dual-menu',
  }

  /** 容器宽度模式枚举 */
  enum ContainerWidthEnum {

    /** 流式布局 */
    FLUID = '100%',

    /** 固定宽度 */
    BOXED = '1200px',
  }

  /**
   * 设置类型
   */
  type SettingType = {

    /** 当前主题 */
    theme: string

    /** 是否开启手风琴模式(一次只能展开一个菜单) */
    uniqueOpened: boolean

    /** 是否显示菜单展开按钮 */
    menuButton: boolean

    /** 是否显示页面刷新按钮 */
    showRefreshButton: boolean

    /** 是否显示全局面包屑导航 */
    showCrumbs: boolean

    /** 设置后是否自动关闭窗口 */
    autoClose: boolean

    /** 是否显示多标签页 */
    showWorkTab: boolean

    /** 是否显示多语言选择 */
    showLanguage: boolean

    /** 是否显示顶部进度条 */
    showNprogress: boolean

    /** 主题模式(light/dark/auto) */
    themeModel: string

    /** 容器模式宽度(流式/固定宽度) */
    containerWidth: ContainerWidthEnum
  }

  /**
   * 工作标签页类型
   * @description 多标签页系统中每个标签页的信息
   */
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

}
