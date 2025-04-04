import {
  Lunar,
  Solar,
  SolarWeek,
} from 'lunar-typescript'

import { ref } from 'vue'

/**
 *  当前时间对象的类型
 */
export type TimeType = {

  /**
   * 当前年
   */
  year: number

  /**
   * 当前月
   */
  month: number

  /**
   *  当前日
   */
  day: number

  /**
   *  当前时  12小时制
   */
  hour12: number

  /**
   *  格式化的小时（12小时制），带补零
   */
  hour12Formatted: string

  /**
   *  当前时 24小时制
   */
  hour24: number

  /**
   *  格式化的小时（24小时制），带补零
   */
  hour24Formatted: string

  /**
   *  当前分
   */
  minute: number

  /**
   *  格式化的分钟，带补零
   */
  minuteFormatted: string

  /**
   *  当前秒
   */
  second: number

  /**
   *  格式化的秒钟，带补零
   */
  secondFormatted: string

  /**
   *  当前星期 (在 本年 中的第几周)
   */
  currentWeekInYear: number

  /**
   *  当前是周几
   */
  week: string

  /**
   *  农历的日
   */
  lunarDay: string

  /**
   *  农历的月
   */
  lunarMonth: string

  /**
   *  农历的年
   */
  lunarYear: string

  /**
   *  农历的时辰
   */
  lunarHour: string

}

/**
 * @description 补零格式化函数
 */
function formatWithLeadingZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`
}

/**
 *  获取当前时间
 */
function getTime(time: TimeType) {
  const now = new Date()

  const solar = Solar.fromDate(now)

  const lunar = Lunar.fromDate(now)

  time.year = solar.getYear()
  time.month = solar.getMonth()
  time.day = solar.getDay()

  time.hour24 = solar.getHour()
  time.hour12 = time.hour24 % 12 || 12 // 12 小时制

  time.minute = solar.getMinute()
  time.second = solar.getSecond()

  // 格式化字符串
  time.hour24Formatted = formatWithLeadingZero(time.hour24)
  time.hour12Formatted = formatWithLeadingZero(time.hour12)
  time.minuteFormatted = formatWithLeadingZero(time.minute)
  time.secondFormatted = formatWithLeadingZero(time.second)

  time.currentWeekInYear = SolarWeek.fromDate(now, 1).getIndexInYear()
  time.week = solar.getWeekInChinese()
  time.lunarDay = lunar.getDayInChinese()
  time.lunarMonth = lunar.getMonthInChinese()
  time.lunarYear = lunar.getYearInChinese()
  time.lunarHour = lunar.getTimeZhi() // 地支
}

/**
 * @description 获取本地时间
 */
export function useGetTime() {
  /**
   *  当前时间对象
   */
  const time = ref<TimeType>(
    {
      year: 0,
      month: 0,
      day: 0,
      hour12: 0,
      hour12Formatted: '',
      hour24: 0,
      hour24Formatted: '',
      minute: 0,
      minuteFormatted: '',
      second: 0,
      secondFormatted: '',
      currentWeekInYear: 0,
      week: '',
      lunarDay: '',
      lunarMonth: '',
      lunarYear: '',
      lunarHour: '',
    },
  )

  const updateTime = () => getTime(time.value)

  // 启动定时器
  const intervalId = setInterval(updateTime, 1000)

  // 在组件卸载时清除定时器
  onUnmounted(() => clearInterval(intervalId))

  // 在组件挂载时初始化时间
  onMounted(updateTime)

  return time
}
