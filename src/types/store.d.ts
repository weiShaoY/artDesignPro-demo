import type { MenuThemeEnum, SystemThemeEnum } from '@/enums/appEnum'

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

  /** 图片 */
  img?: string
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
