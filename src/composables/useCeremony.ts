import { festivalList } from '@/config/ceremony'

import { useSettingStore } from '@/store/modules/setting'

import { blogMittBus } from '@/utils'

import {
  useDateFormat,
  useIntervalFn,
  useTimeoutFn,
} from '@vueuse/core'

import { computed } from 'vue'

/**
 * 节日庆典配置类型
 */
type FestivalConfigType = {

  /** 初始延迟时间(ms) */
  INITIAL_DELAY: number

  /** 烟花效果触发间隔(ms) */
  FIREWORK_INTERVAL: number

  /** 文本显示延迟时间(ms) */
  TEXT_DELAY: number

  /** 最大触发次数 */
  MAX_TRIGGERS: number
}

/**
 * 节日庆典 Hook
 * @description 提供节日检测、烟花效果和祝福文本显示功能
 * @returns {object} 节日庆典相关方法和状态
 */
export function useCeremony() {
  const settingStore = useSettingStore()

  let fireworksInterval: { pause: () => void } | null = null

  /**
   * 节日庆典配置常量
   */
  const FESTIVAL_CONFIG: FestivalConfigType = {
    INITIAL_DELAY: 300,
    FIREWORK_INTERVAL: 1000,
    TEXT_DELAY: 2000,
    MAX_TRIGGERS: 6,
  } as const

  /**
   * 获取当前节日数据
   */
  const currentFestivalData = computed(() => {
    const currentDate = useDateFormat(new Date(), 'YYYY-MM-DD').value

    return festivalList.find(item => item.date === currentDate)
  })

  /**
   * 设置当前节日日期到状态管理
   */
  const setFestivalDate = () => {
    settingStore.setFestivalDate(currentFestivalData.value?.date || '')
  }

  /**
   * 烟花效果是否已加载
   */
  const holidayFireworksLoaded = computed(
    () => settingStore.holidayFireworksLoaded,
  )

  /**
   * 是否显示烟花效果
   */
  const isShowFireworks = computed(
    () => settingStore.isShowFireworks,
  )

  /**
   * 判断是否应该触发节日效果
   */
  const shouldTriggerFestival = () => {
    return currentFestivalData.value && isShowFireworks.value
  }

  /**
   * 触发单个烟花效果
   */
  const triggerFireworkEffect = () => {
    blogMittBus.emit('triggerFireworks', currentFestivalData.value?.image)
  }

  /**
   * 判断是否应该停止烟花效果
   * @param triggers 已触发次数
   */
  const shouldStopFireworks = (triggers: number) => {
    return triggers >= FESTIVAL_CONFIG.MAX_TRIGGERS
  }

  /**
   * 停止烟花并显示祝福文本
   * @param pause 停止函数
   */
  const stopFireworksAndShowText = (pause: () => void) => {
    pause()
    settingStore.setholidayFireworksLoaded(true)

    useTimeoutFn(() => {
      settingStore.setShowFestivalText(true)
      setFestivalDate()
    }, FESTIVAL_CONFIG.TEXT_DELAY)
  }

  /**
   * 存储烟花间隔引用
   * @param pause 停止函数
   */
  const storeFireworksInterval = (pause: () => void) => {
    fireworksInterval = {
      pause,
    }
  }

  /**
   * 开启节日庆典效果
   * @description 触发烟花效果并显示节日祝福文本
   */
  const openFestival = () => {
    if (!shouldTriggerFestival()) {
      return
    }

    let triggers = 0

    const { start: startFireworks } = useTimeoutFn(() => {
      const { pause } = useIntervalFn(() => {
        triggerFireworkEffect()
        triggers++

        if (shouldStopFireworks(triggers)) {
          stopFireworksAndShowText(pause)
        }
      }, FESTIVAL_CONFIG.FIREWORK_INTERVAL)

      storeFireworksInterval(pause)
    }, FESTIVAL_CONFIG.INITIAL_DELAY)

    startFireworks()
  }

  /**
   * 清理节日庆典效果
   * @description 停止烟花效果并隐藏祝福文本
   */
  const cleanup = () => {
    if (fireworksInterval) {
      fireworksInterval.pause()
      settingStore.setShowFestivalText(false)
      setFestivalDate()
    }
  }

  return {
    openFestival,
    cleanup,
    holidayFireworksLoaded,
    currentFestivalData,
    isShowFireworks,
  }
}
