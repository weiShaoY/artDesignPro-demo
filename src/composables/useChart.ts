import type { ECharts, EChartsOption } from 'echarts'

import { SystemThemeEnum } from '@/enums/appEnum'

import { useSettingStore } from '@/store'

import { getCssVariable } from '@/utils/colors'

import * as echarts from 'echarts'

import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

/**
 * 图表主题配置类型
 */
type ChartThemeConfigType = {

  /** 图表高度 */
  chartHeight: string

  /** 字体大小 */
  fontSize: number

  /** 字体颜色 */
  fontColor: string

  /** 主题颜色 */
  themeColor: string
}

/**
 * 获取图表主题配置
 * @returns 图表主题配置对象
 */
export function useChartOps(): ChartThemeConfigType {
  return {
    chartHeight: '16rem',
    fontSize: 13,
    fontColor: '#999',
    themeColor: getCssVariable('--el-color-primary-light-1'),
  }
}

/**
 * ECharts Hook
 * @description 提供ECharts图表初始化、更新和响应式功能
 * @param initOptions 初始图表配置选项
 * @returns 图表相关方法和状态
 */
export function useChart(initOptions?: EChartsOption) {
  const settingStore = useSettingStore()

  const theme = computed(() => settingStore.systemThemeType)

  const isDark = computed(() => theme.value === SystemThemeEnum.DARK)

  const menuOpen = computed(() => settingStore.menuOpen)

  const chartRef = ref<HTMLElement>()

  let chartInstance: ECharts | null = null

  /**
   * 坐标轴线样式配置
   * @param show 是否显示轴线
   * @returns 轴线样式配置
   */
  const getAxisLineStyle = (show: boolean = true) => ({
    show,
    lineStyle: {
      color: isDark.value ? '#444' : '#e8e8e8',
      width: 1,
    },
  })

  /**
   * 分割线样式配置
   * @param show 是否显示分割线
   * @returns 分割线样式配置
   */
  const getSplitLineStyle = (show: boolean = true) => ({
    show,
    lineStyle: {
      color: isDark.value ? '#444' : '#e8e8e8',
      width: 1,
      type: 'dashed' as const,
    },
  })

  /**
   * 坐标轴标签样式配置
   * @param show 是否显示标签
   * @returns 标签样式配置
   */
  const getAxisLabelStyle = (show: boolean = true) => ({
    show,
    color: useChartOps().fontColor,
    fontSize: useChartOps().fontSize,
  })

  /**
   * 坐标轴刻度样式配置
   * @returns 刻度样式配置
   */
  const getAxisTickStyle = () => ({
    show: false,
  })

  /**
   * 初始化图表
   * @param options 图表配置选项
   */
  const initChart = (options: EChartsOption = {
  }) => {
    if (!chartRef.value) {
      return
    }

    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption({
      ...initOptions,
      ...options,
    })
  }

  /**
   * 更新图表配置
   * @param options 新的图表配置选项
   */
  const updateChart = (options: EChartsOption) => {
    chartInstance?.setOption(options)
  }

  /**
   * 调整图表大小
   */
  const handleResize = () => {
    chartInstance?.resize()
  }

  /**
   * 处理菜单状态变化
   * @description 菜单展开/收起时，延迟多次调整图表大小
   */
  const handleMenuChange = () => {
    const delays = [100, 200, 300]

    delays.forEach((delay) => {
      setTimeout(handleResize, delay)
    })
  }

  // 监听菜单状态变化
  watch(menuOpen, handleMenuChange)

  // 组件挂载时添加事件监听
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  // 组件卸载时清理资源
  onUnmounted(() => {
    chartInstance?.dispose()
    window.removeEventListener('resize', handleResize)
  })

  return {
    isDark,
    chartRef,
    initChart,
    updateChart,
    handleResize,
    getAxisLineStyle,
    getSplitLineStyle,
    getAxisLabelStyle,
    getAxisTickStyle,
    useChartOps,
  }
}
