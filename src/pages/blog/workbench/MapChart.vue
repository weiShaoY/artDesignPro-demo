<script setup lang="ts">
import chinaMapJson from '@/assets/jsons/chinaMap.json'

import { SystemThemeEnum } from '@/enums/appEnum'

import { useSettingStore } from '@/store'

import * as echarts from 'echarts'

import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

// 定义 emit
const emit = defineEmits<{
  (e: 'onRenderComplete'): void
}>()

// 响应式引用与主题
const chinaMapRef = ref<HTMLElement | null>(null)

const chartInstance = ref<echarts.ECharts | null>(null)

const settingStore = useSettingStore()

const isDark = computed(
  () => settingStore.systemThemeType === SystemThemeEnum.DARK,
)

/**
 *  构造 ECharts 配置项
 */
const option = {
  /**
   *  文字样式配置
   */
  textStyle: {
    fontFamily: 'gaiLiangShouJinTi', // 字体家族
  },

  /**
   *  背景颜色
   */
  backgroundColor: 'transparent',

  /**
   *  标题设置
   */
  title: {
    text: '风里雨里,长沙等你', // 标题文本
    top: '12%', // 标题距离顶部的距离
    left: 'center', // 标题水平居中
    textStyle: {
      color: '#333639', // 标题颜色
      fontSize: 35, // 标题字体大小
      fontWeight: 700, // 标题字体粗细
    },
  },

  /**
   *  鼠标移到图里面的浮动提示框
   */
  tooltip: {
    /**
     *  提示框背景色
     */
    backgroundColor: 'rgba(0,0,0,0.5)',

    /**
     *  边框颜色
     */
    borderColor: 'rgba(0,0,0,0)',

    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 700,
    },

    formatter: (params: any) => {
      // 仅显示省份名称
      return params.name
    },
  },

  /**
   *  地理区域配置
   */
  geo: {
    map: 'china', // 地图类型
    zoom: 1, // 缩放级别
    show: true, // 是否显示地图
    roam: false, // 是否允许缩放和拖拽
    layoutSize: '100%', // 布局大小
    emphasis: {
      label: {
        show: true, // 高亮时是否显示标签
      },
    },
    itemStyle: {
      borderColor: isDark.value ? 'rgba(255,255,255,0.6)' : 'rgba(147,235,248,1)', // 边框颜色
      borderWidth: 2, // 边框宽度
      shadowColor: isDark.value ? 'rgba(0,0,0,0.8)' : 'rgba(128,217,248,1)', // 阴影颜色
      shadowOffsetX: 2, // 阴影 X 偏移
      shadowOffsetY: 15, // 阴影 Y 偏移
      shadowBlur: 15, // 阴影模糊程度
    },
  },

  /**
   *  数据系列
   */
  series: [
    {
      /**
       *  地图数据
       */
      type: 'map',
      map: 'china', // 地图类型
      aspectScale: 0.75, // 纵横比
      zoom: 1, // 缩放级别
      label: {
        // show: true, // 是否显示标签
        color: '#fff', // 标签颜色
        fontSize: 10, // 标签字体大小
      },
      itemStyle: {
        borderColor: 'rgba(147,235,248,0.8)', // 边框颜色
        borderWidth: 2, // 边框宽度
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147,235,248,0.3)', // 渐变起始颜色
            },
            {
              offset: 1,
              color: 'rgba(32,120,207,0.9)', // 渐变结束颜色
            },
          ],
        },
        shadowColor: 'rgba(32,120,207,1)', // 阴影颜色
        shadowOffsetY: 15, // 阴影 Y 偏移
        shadowBlur: 20, // 阴影模糊程度
      },

      //  高亮时
      emphasis: {
        label: {
          show: true, // 高亮时是否显示标签
          color: '#fff', // 标签颜色
        },
        itemStyle: {
          areaColor: 'rgba(82,180,255,0.9)', // 高亮时区域颜色
          borderColor: '#fff', // 高亮时边框颜色
          borderWidth: 3, // 高亮时边框宽度
        },
      },

      /**
       *  增强光照与 3D 效果
       */
      light: {
        main: {
          intensity: 1.5, // 主光源强度
          shadow: true, // 是否显示阴影
          alpha: 40, // 光源角度（俯仰）
          beta: 45, // 光源角度（左右旋转）
        },
        ambient: {
          intensity: 0.3, // 环境光强度
        },
      },

      /**
       *  视角控制
       */
      viewControl: {
        distance: 120, // 观察距离
        alpha: 30, // 俯仰角
        beta: 5, // 旋转角度
        center: [104, 36], // 视角中心点
        pitch: 10, // 俯仰角
      },

      /**
       *  选中区域的样式
       */
      select: {
        label: {
          show: true, // 选中时是否显示标签
          color: '#fff', // 标签颜色
        },
        itemStyle: {
          areaColor: '#4FAEFB', // 选中区域颜色
          borderColor: '#fff', // 选中区域边框颜色
          borderWidth: 2, // 选中区域边框宽度
        },
      },
    },

    /**
     *  带有涟漪特效的散点图
     */
    {
      /**
       *  前5名系列名称
       */
      name: 'Top 5',

      /**
       *  带有涟漪特效的散点图
       */
      type: 'effectScatter',

      /**
       *  使用地理坐标系
       */
      coordinateSystem: 'geo',

      /**
       *  排序后取前5名的数据s
       */
      data: [
        {
          name: '长沙', // 数据点名称
          value: [113, 28.21, 100], // 数据坐标（[经度, 纬度, 数值]）
        },
      ],

      /**
       *  动态设置散点大小
       */
      symbolSize: (val: number[]) => val[2] / 8,

      /**
       *  渲染时显示特效
       */
      showEffectOn: 'render',

      /**
       *  涟漪特效相关配置
       */
      rippleEffect: {
        /**
         *  波纹的数量
         */
        number: 5,

        /**
         *  动画中波纹的最大缩放比例
         */
        scale: 20,

        /**
         *  动画的周期，秒数
         */
        period: 5,

        /**
         *  波纹的绘制方式
         */
        brushType: 'stroke',
      },

      emphasis: {
        /**
         *  鼠标悬停时放大效果
         */
        scale: true,
      },

      tooltip: {
        // 风里雨里,长沙等你
        formatter() {
          return `惟楚有材，于斯为盛`
        },
        textStyle: {
          color: '#E43961',
          fontSize: 20,
          fontWeight: 700,
        },

        // 提示框背景色
        backgroundColor: 'rgba(255,255,255,0.9)',
      },

      label: {
        /**
         *  标注的名称   长沙
         */
        formatter: (params: any) => {
          return `${params.name}`
        },

        /**
         *  标注位置
         */
        position: 'top',

        /**
         *  显示标注
         */
        show: true,

        color: '#E43961',

        fontWeight: 700,

        fontSize: 26,
      },

      itemStyle: {
        /**
         *  散点颜色
         */
        color: '#E43961',

        /**
         *  阴影模糊程度
         */
        shadowBlur: 10,

        /**
         *  阴影颜色
         */
        shadowColor: '#333',
      },

      /**
       *  图层级别
       */
      zlevel: 1,
    },
  ],
}

/**
 *  初始化并渲染地图
 */
async function initMap() {
  if (!chinaMapRef.value) {
    return
  }

  chartInstance.value = echarts.init(chinaMapRef.value)
  chartInstance.value.showLoading()

  try {
    echarts.registerMap('china', chinaMapJson as any)

    chartInstance.value.setOption(option)
    chartInstance.value.hideLoading()

    // 触发渲染完成事件
    emit('onRenderComplete')

    // 点击事件：选中地图区域
    chartInstance.value.on('click', (params: any) => {
      console.log(`选中区域: ${params.name}`, params)

      if (params.name === '长沙') {
        window.$notification?.success('风里雨里，长沙等你')
      }

      chartInstance.value?.dispatchAction({
        type: 'select',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      })
    })
  }
  catch (error) {
    console.error('加载地图数据失败:', error)
    chartInstance.value?.hideLoading()
  }
}

/**
 * 窗口 resize 时调整图表大小
 */
const resizeChart = () => chartInstance.value?.resize()

onMounted(() => {
  initMap().then(() => setTimeout(resizeChart, 100))
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  chartInstance.value?.dispose()
  chartInstance.value = null
  window.removeEventListener('resize', resizeChart)
})

// 监听主题变化，重新初始化地图
watch(isDark, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    chartInstance.value?.dispose()
    chartInstance.value = null
    nextTick(initMap)
  }
})
</script>

<template>
  <div
    class="map-container"
    style="height: calc(100vh - 200px)"
  >
    <div
      id="china-map"
      ref="chinaMapRef"
      class="china-map"
    />
  </div>
</template>

<style lang="scss" scoped>
.map-container {
  width: 100%;

  .china-map {
    width: 100%;
    height: 100%;
  }
}
</style>
