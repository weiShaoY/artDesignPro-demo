import menu_layout_dual_column from '@/assets/images/blog/menu/layout/dual_column.png'

import menu_layout_horizontal from '@/assets/images/blog/menu/layout/horizontal.png'

import menu_layout_mixed from '@/assets/images/blog/menu/layout/mixed.png'

import menu_layout_vertical from '@/assets/images/blog/menu/layout/vertical.png'

import menu_mode_dark from '@/assets/images/blog/menu/mode/dark.png'

import menu_mode_design from '@/assets/images/blog/menu/mode/design.png'

import menu_mode_light from '@/assets/images/blog/menu/mode/light.png'

import system_theme_dark from '@/assets/images/blog/theme/dark.png'

import system_theme_light from '@/assets/images/blog/theme/light.png'

import system_theme_system from '@/assets/images/blog/theme/system.png'

/**
 *   博客模块配置
 */
export const blogConfig = {

  /**
   *  菜单主题列表
   */
  menuThemeList: [
    {
      theme: BlogTypeTest.MenuThemeEnum.DESIGN,
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
      img: menu_mode_design,
    },
    {
      theme: BlogTypeTest.MenuThemeEnum.DARK,
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
      img: menu_mode_dark,
    },
    {
      theme: BlogTypeTest.MenuThemeEnum.LIGHT,
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
      img: menu_mode_light,
    },
  ],

  /**
   *  菜单深色模式主题
   */
  menuDarkThemeList: [
    {
      theme: BlogTypeTest.MenuThemeEnum.DARK,
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
  ],

  /** 菜单展开宽度默认值(px) */
  menuOpenWidth: 252,

  /** 菜单关闭宽度默认值(px) */
  menuCloseWidth: 70,

  /** 圆角默认值(rem) */
  customRadius: '0.75',

  /**  系统主题样式（light | dark） */
  systemThemeStyles: {
    [BlogTypeTest.SystemThemeModeEnum.LIGHT]: {
      className: '',
    },
    [BlogTypeTest.SystemThemeModeEnum.DARK]: {
      className: BlogTypeTest.SystemThemeModeEnum.DARK,
    },
  },

  /**
   *  设置抽屉-主题风格列表
   */
  settingThemeStyleList: [
    {
      name: '浅色',
      theme: BlogTypeTest.SystemThemeModeEnum.LIGHT,
      img: system_theme_light,
    },
    {
      name: '深色',
      theme: BlogTypeTest.SystemThemeModeEnum.DARK,
      img: system_theme_dark,
    },
    {
      name: '系统',
      theme: BlogTypeTest.SystemThemeModeEnum.AUTO,
      img: system_theme_system,
    },
  ],

  /**
   *  设置抽屉-菜单布局列表
   */
  settingMenuLayoutList: [
    {
      name: '左侧',
      value: BlogTypeTest.MenuLayoutEnum.LEFT,
      img: menu_layout_vertical,
    },
    {
      name: '顶部',
      value: BlogTypeTest.MenuLayoutEnum.TOP,
      img: menu_layout_horizontal,
    },
    {
      name: '混合',
      value: BlogTypeTest.MenuLayoutEnum.TOP_LEFT,
      img: menu_layout_mixed,
    },
    {
      name: '双列',
      value: BlogTypeTest.MenuLayoutEnum.DUAL_MENU,
      img: menu_layout_dual_column,
    },
  ],

  /**
   * Element Plus 主题配置
   */
  elementPlusTheme: {
    /** 主色 */
    primary: '#5D87FF',
  },

  systemColor: [
    '#5D87FF', // 蓝色
    '#B48DF3', // 紫色
    '#1D84FF', // 深蓝
    '#60C041', // 绿色
    '#38C0FC', // 浅蓝
    '#F9901F', // 橙色
    '#FF80C8', // 粉色
  ],

}
