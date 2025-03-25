import type { MenuThemeEnum, SystemThemeEnum } from '@/enums/appEnum'

/**
 * 用户信息类型
 */
export type UserInfo = {

  /** 用户ID */
  id: number

  /** 用户姓名 */
  name: string

  /** 用户名 */
  username: string

  /** 头像URL */
  avatar: string

  /** 电子邮箱 */
  email: string
}

/**
 * 系统主题样式配置
 */
export type SystemThemeType = {

  /** 应用到HTML元素的类名 */
  className: string
}

/**
 * 系统主题类型映射
 * @description 排除AUTO类型后的系统主题类型映射
 */
export type SystemThemeTypes = {
  [key in Exclude<SystemThemeEnum, SystemThemeEnum.AUTO>]: SystemThemeType
}

/**
 * 菜单主题样式配置
 */
export type MenuThemeType = {

  /** 主题枚举值 */
  theme: MenuThemeEnum

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
}

/**
 * 系统设置类型
 */
export type Setting = {

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
}

/**
 * 工作标签页类型
 * @description 多标签页系统中每个标签页的信息
 */
export type WorkTabType = {

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

/**
 * 主题颜色配置类型
 */
export type ThemeColorConfig = {

  /** 主题名称 */
  name: string

  /** 主题枚举值 */
  theme: SystemThemeEnum

  /** 主题颜色数组 */
  color: string[]

  /** 左侧线条颜色 */
  leftLineColor: string

  /** 右侧线条颜色 */
  rightLineColor: string
}
