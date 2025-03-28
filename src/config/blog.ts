import menu_mode_dark from '@/assets/blog/mode/mode/dark.png'

import menu_mode_design from '@/assets/blog/mode/mode/design.png'

import menu_mode_light from '@/assets/blog/mode/mode/light.png'

import menu_layout_dual_column from '@imgs/settings/menu_layouts/dual_column.png'

import menu_layout_horizontal from '@imgs/settings/menu_layouts/horizontal.png'

import menu_layout_mixed from '@imgs/settings/menu_layouts/mixed.png'

import menu_layout_vertical from '@imgs/settings/menu_layouts/vertical.png'

import theme_styles_dark from '@imgs/settings/theme_styles/dark.png'

import theme_styles_light from '@imgs/settings/theme_styles/light.png'

import theme_styles_system from '@imgs/settings/theme_styles/system.png'

/**
 *   博客模块配置
 */
export const blogConfig = {
  /**
   *  菜单主题列表
   */
  menuThemeList: [
    {
      theme: BlogTypeTest.MenuThemeModeEnum.DESIGN,
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
      theme: BlogTypeTest.MenuThemeModeEnum.DARK,
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
      theme: BlogTypeTest.MenuThemeModeEnum.LIGHT,
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
      theme: BlogTypeTest.MenuThemeModeEnum.DARK,
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
}
