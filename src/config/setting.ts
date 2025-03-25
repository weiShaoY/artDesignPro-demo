import type { MenuThemeType, SystemThemeTypes } from '@/types/store'

import { MenuThemeEnum, SystemThemeEnum } from '@/enums/appEnum'

/**
 * Element Plus 主题配置
 */
export const ElementPlusTheme = {
  /** 主色 */
  primary: '#5D87FF',
} as const

/**
 * 系统信息配置
 */
export const SystemInfo = {
  /** 系统名称 */
  name: 'Art Design Pro',

  /** 登录配置 */
  login: {
    /** 默认用户名 */
    username: 'admin',

    /** 默认密码 */
    password: '123456',
  },
} as const

/**
 * 系统主题样式配置
 */
export const SystemThemeStyles: SystemThemeTypes = {
  [SystemThemeEnum.LIGHT]: {
    className: '',
  },
  [SystemThemeEnum.DARK]: {
    className: SystemThemeEnum.DARK,
  },
} as const

/**
 * 设置中心主题列表配置
 */
export const SettingThemeList = [
  {
    name: '浅色',
    theme: SystemThemeEnum.LIGHT,
    color: ['#fff', '#fff'],
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0',
  },
  {
    name: '深色',
    theme: SystemThemeEnum.DARK,
    color: ['#22252A'],
    leftLineColor: '#3F4257',
    rightLineColor: '#3F4257',
  },
  {
    name: '系统',
    theme: SystemThemeEnum.AUTO,
    color: ['#fff', '#22252A'],
    leftLineColor: '#EDEEF0',
    rightLineColor: '#3F4257',
  },
] as const

/**
 * 菜单主题样式配置
 */
export const ThemeList: MenuThemeType[] = [
  {
    theme: MenuThemeEnum.DESIGN,
    background: '#FFFFFF',
    systemNameColor: 'var(--art-text-gray-800)',
    iconColor: '#6B6B6B',
    textColor: '#29343D',
    textActiveColor: '#3F8CFF',
    iconActiveColor: '#333333',
    tabBarBackground: '#FAFBFC',
    systemBackground: '#FAFBFC',
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0',
  },
  {
    theme: MenuThemeEnum.DARK,
    background: '#191A23',
    systemNameColor: '#BABBBD',
    iconColor: '#BABBBD',
    textColor: '#BABBBD',
    textActiveColor: '#FFFFFF',
    iconActiveColor: '#FFFFFF',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#3F4257',
    rightLineColor: '#EDEEF0',
  },
  {
    theme: MenuThemeEnum.LIGHT,
    background: '#ffffff',
    systemNameColor: '#68758E',
    iconColor: '#6B6B6B',
    textColor: '#29343D',
    textActiveColor: '#3F8CFF',
    iconActiveColor: '#333333',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0',
  },
] as const

/**
 * 暗黑模式下菜单样式配置
 */
export const DarkMenuStyles: MenuThemeType[] = [
  {
    theme: MenuThemeEnum.DARK,
    background: '#161618',
    systemNameColor: '#DDDDDD',
    iconColor: '#BABBBD',
    textColor: 'rgba(#FFFFFF, 0.7)',
    textActiveColor: '',
    iconActiveColor: '#FFFFFF',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#3F4257',
    rightLineColor: '#EDEEF0',
  },
] as const

/**
 * 系统主色配置
 */
export const SystemMainColor = [
  '#5D87FF', // 蓝色
  '#B48DF3', // 紫色
  '#1D84FF', // 深蓝
  '#60C041', // 绿色
  '#38C0FC', // 浅蓝
  '#F9901F', // 橙色
  '#FF80C8', // 粉色
] as const

/**
 * 系统设置中心配置
 */
export const SystemSetting = {
  /** 菜单展开宽度默认值(px) */
  defaultMenuWidth: 252,

  /** 圆角默认值(rem) */
  defaultCustomRadius: '0.75',
} as const
