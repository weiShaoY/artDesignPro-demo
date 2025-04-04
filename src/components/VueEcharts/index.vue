<!------------------------------------  图标组件  ------------------------------------------------->
<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import type { GeoJSON } from 'echarts/types/src/coord/geo/geoTypes'

import type { CSSProperties } from 'vue'

import { registerMap } from 'echarts/core'

import VCharts from 'vue-echarts'

import 'echarts'

type ChartPropsType = {

  /**
   *  配置
   */
  option: EChartsOption

  /**
   *  是否自动调整大小
   */
  isAutoResize?: boolean

  /**
   *  是否显示 loading
   */
  isLoading?: boolean

  /**
   *  宽
   */
  width?: string | number

  /**
   *  高
   */
  height?: string | number

  /**
   *  是否为深色主题
   */
  isDark?: boolean
} & (
  | {

    /**
     * 地图文件（当传入时需要同时传入 mapName）
     */
    mapJson: Record<string, any> | GeoJSON

    /**
     * 地图名称
     */
    mapName: string
  }
  | {

    /**
     * 不传地图文件时 mapName 也不需要
     */
    mapJson?: null

    /**
     *  不传地图文件时 mapName 也不需要
     */
    mapName?: never // 确保不传
  }
)

const props = withDefaults(defineProps<ChartPropsType>(), {
  isAutoResize: true,
  width: '100%',
  height: '100%',
})

const emit = defineEmits(['click'])

const loadingOptions = {
  text: '加载中...',
  fontSize: 20,
  fontFamily: 'gaiLiangShouJinTi',
  color: '#E43961',
  textColor: '#000',
}

const computedStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

if (props.mapJson && props.mapName) {
  registerMap(props.mapName, props.mapJson as GeoJSON)
}
else if (props.mapJson && !props.mapName) {
  window.$notification?.error('提供地图文件时需要同时提供地图名称')
}

const loading = ref(false)

onBeforeMount(() => {
  loading.value = props.isLoading || true
})

onMounted(() => {
  loading.value = false
})

</script>

<template>
  <VCharts
    :theme="isDark ? 'dark' : ''"
    :option="option"
    :autoresize="isAutoResize"
    :style="computedStyle"
    :loading="loading"
    :loading-options="loadingOptions"
    @click="emit('click', $event)"
  />
</template>
