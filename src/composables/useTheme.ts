import type { SystemThemeTypes } from '@/types/store'

import { SystemThemeStyles } from '@/config/setting'

import { SystemThemeEnum } from '@/enums/appEnum'

import { useSettingStore } from '@/store/modules/setting'

import { getDarkColor, getLightColor } from '@/utils/color'

/**
 * 主题管理 Hook
 * @description 提供系统主题切换、自动主题检测和相关样式管理功能
 */
export function useTheme() {
  const settingStore = useSettingStore()

  /**
   * 临时禁用CSS过渡效果
   * @description 防止主题切换时出现不自然的过渡效果
   */
  const disableTransitions = (): void => {
    const style = document.createElement('style')

    style.id = 'disable-transitions'
    style.textContent = '* { transition: none !important; }'
    document.head.appendChild(style)
  }

  /**
   * 恢复CSS过渡效果
   */
  const enableTransitions = (): void => {
    document.getElementById('disable-transitions')?.remove()
  }

  /**
   * 应用主题颜色变量
   * @param primary 基础主题色
   * @param isDark 是否为暗黑模式
   */
  const applyThemeColors = (primary: string, isDark: boolean): void => {
    for (let i = 1; i <= 9; i++) {
      for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(
          `--el-color-primary-light-${i}`,
          isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`,
        )
      }
    }
  }

  /**
   * 设置系统主题
   * @param theme 主题类型
   * @param themeMode 主题模式（可选）
   */
  const setSystemTheme = (
    theme: SystemThemeEnum,
    themeMode?: SystemThemeEnum,
  ): void => {
    disableTransitions()

    const htmlElement = document.documentElement

    const isDark = theme === SystemThemeEnum.DARK

    const effectiveThemeMode = themeMode || theme

    const currentTheme = SystemThemeStyles[theme as keyof SystemThemeTypes]

    // 应用主题类名
    if (currentTheme) {
      htmlElement.className = currentTheme.className
    }

    // 应用主题颜色
    applyThemeColors(settingStore.systemThemeColor, isDark)

    // 更新状态管理
    settingStore.setGlopTheme(theme, effectiveThemeMode)

    // 下一帧恢复过渡效果
    requestAnimationFrame(() => {
      requestAnimationFrame(enableTransitions)
    })
  }

  /**
   * 根据系统偏好自动设置主题
   */
  const setSystemAutoTheme = (): void => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    setSystemTheme(
      isDarkMode ? SystemThemeEnum.DARK : SystemThemeEnum.LIGHT,
      SystemThemeEnum.AUTO,
    )
  }

  /**
   * 切换主题
   * @param theme 要切换到的主题
   */
  const switchThemeStyles = (theme: SystemThemeEnum): void => {
    theme === SystemThemeEnum.AUTO
      ? setSystemAutoTheme()
      : setSystemTheme(theme)
  }

  return {
    setSystemTheme,
    setSystemAutoTheme,
    switchThemeStyles,
  }
}
