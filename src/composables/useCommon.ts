import { useSettingStore } from '@/store'

import { getTabConfig } from '@/utils/tabs'

/**
 * 通用工具 Hook
 * @description 提供应用中常用的通用功能方法
 * @returns  包含各种通用方法的对象
 */
export function useCommon() {
  const settingStore = useSettingStore()

  /**
   * 刷新当前页面
   * @description 通过修改状态管理中的 reload 标志触发页面刷新
   */
  const refresh = (): void => {
    settingStore.reload()
  }

  /**
   * 平滑滚动到页面顶部
   * @description 使用平滑滚动效果将页面滚动到顶部
   * @param {ScrollBehavior} [behavior] - 滚动行为，默认为平滑滚动
   */
  const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
    window.scrollTo({
      top: 0,
      behavior,
    })
  }

  /**
   *  是否显示工作标签
   */
  const showWorkTab = computed(() => settingStore.showWorkTab)

  /**
   *  当前 tab 样式s
   */
  const tabStyle = computed(() => settingStore.tabStyle)

  /**
   *  页面最小高度s
   */
  const containerMinHeight = computed(() => {
    const { openHeight, closeHeight } = getTabConfig(tabStyle.value)

    return `calc(100vh - ${showWorkTab.value ? openHeight : closeHeight}px)`
  })

  return {
    refresh,
    scrollToTop,
    containerMinHeight,
  }
}
