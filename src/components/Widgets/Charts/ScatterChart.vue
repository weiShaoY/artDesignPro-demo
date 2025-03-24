<!-- 散点图 -->
<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { useChart, useChartOps } from '@/composables/useChart'

import { getCssVariable } from '@/utils/colors'

const props = withDefaults(defineProps<Props>(), {
  data: () => [{
    value: [0, 0],
  }, {
    value: [0, 0],
  }],
  color: '',
  height: useChartOps().chartHeight,
  symbolSize: 14,
})

const {
  chartRef,
  initChart,
  isDark,
  getAxisLineStyle,
  getAxisLabelStyle,
  getAxisTickStyle,
  getSplitLineStyle,
} = useChart()

type Props = {
  data?: { value: number[] }[]
  color?: string
  height?: string
  symbolSize?: number
}

const options: () => EChartsOption = () => {
  const computedColor = props.color || getCssVariable('--main-color')

  return {
    grid: {
      top: 10,
      right: 10,
      bottom: 0,
      left: 3,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      formatter(params: any) {
        return `(${params.value[0]}, ${params.value[1]})`
      },
    },
    xAxis: {
      type: 'value',
      axisTick: getAxisTickStyle(),
      axisLabel: getAxisLabelStyle(),
      axisLine: getAxisLineStyle(),
      splitLine: getSplitLineStyle(),
    },
    yAxis: {
      type: 'value',
      axisLabel: getAxisLabelStyle(),
      axisLine: getAxisLineStyle(),
      axisTick: getAxisTickStyle(),
      splitLine: getSplitLineStyle(),
    },
    series: [
      {
        data: props.data,
        type: 'scatter',
        itemStyle: {
          color: computedColor,
        },
        symbolSize: props.symbolSize,
      },
    ],
  }
}

watch(isDark, () => {
  return initChart(options())
})

onMounted(() => {
  return initChart(options())
})
</script>

<template>
  <div
    ref="chartRef"
    class="scatter-chart"
    :style="{ height: props.height }"
  />
</template>
