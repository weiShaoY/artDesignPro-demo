import { useSettingStore } from '@/store/modules/setting'

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

  return {
    refresh,
    scrollToTop,
  }
}
