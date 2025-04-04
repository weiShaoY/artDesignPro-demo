<script lang="ts" setup>
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from 'vue'

const isDarkMode = false

const isActive = ref(true)

const sparkLineDataset = ref(generateSparkLine())

const sparkLineDataset2 = ref(generateSparkLine())

function generateSparkLine() {
  return Array.from({
    length: 12,
  }, (_, i) => ({
    period: i,
    value: Math.round(Math.random() * 100),
  }))
}

const timeout = ref<number | null>(null)

const resizeObserver = ref<ResizeObserver | null>(null)

const clientPosition = shallowRef({
  x: 0,
  y: 0,
})

const viewBox = shallowRef('0 0 0 0')

const targetSize = ref(48)

const resizeContainer = ref<HTMLElement | null>(null)

const boardSize = computed(() => {
  const splitBox = viewBox.value.split(' ')

  return {
    width: +splitBox[2],
    height: +splitBox[3],
  }
})

// 使用 VueUse 的节流函数
const updatePosition = useThrottleFn((x: number, y: number) => {
  clientPosition.value = {
    x,
    y,
  }
}, 16) // 约60fps

function getClientPosition(e: MouseEvent) {
  updatePosition(e.clientX, e.clientY)
}

function setFingerPosition(data: TouchEvent) {
  updatePosition(data.targetTouches[0].clientX, data.targetTouches[0].clientY)
}

// 修复：添加缺失的 setClientPosition 函数
function setClientPosition(e: MouseEvent) {
  updatePosition(e.clientX, e.clientY)
}

// 使用 VueUse 的防抖函数优化 sparkLine 更新
const debouncedSparkLineUpdate = useDebounceFn(() => {
  if (!isActive.value) {
    return
  }

  const newVal = Math.round(Math.random() * 100)

  const newVal2 = Math.round(Math.random() * 100)

  sparkLineDataset.value = [
    ...sparkLineDataset.value.slice(-11),
    {
      period: Math.random(),
      value: newVal,
    },
  ]

  sparkLineDataset2.value = [
    ...sparkLineDataset2.value.slice(-11),
    {
      period: Math.random(),
      value: newVal2,
    },
  ]
}, 1000)

function updateSparkLine() {
  debouncedSparkLineUpdate()
  if (isActive.value) {
    requestAnimationFrame(updateSparkLine)
  }
}

onMounted(() => {
  resizeObserver.value = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect

      viewBox.value = `0 0 ${width} ${height}`
    }
  })

  if (resizeContainer.value) {
    resizeObserver.value.observe(resizeContainer.value)
  }

  requestAnimationFrame(updateSparkLine)

  document.addEventListener('mousemove', getClientPosition, {
    passive: true,
  })
  document.addEventListener('touchmove', setFingerPosition, {
    passive: true,
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', getClientPosition)
  document.removeEventListener('touchmove', setFingerPosition)
  if (timeout.value) {
    clearTimeout(timeout.value)
  }

  if (resizeObserver.value && resizeContainer.value) {
    resizeObserver.value.unobserve(resizeContainer.value)
  }

  isActive.value = false
})
</script>

<template>
  <div
    ref="resizeContainer"
    class="fixed left-0 top-0"
    style="width: 100%; height: 100%; overflow: hidden"
    @mousemove="setClientPosition"
  >

    <svg
      :viewBox="viewBox"
      width="100%"
      class="user-position pointer-events-none absolute left-0 top-0 bg-transparent"
    >
      <line
        :x1="clientPosition.x"
        :x2="clientPosition.x"
        :y1="0"
        :y2="clientPosition.y - targetSize"
        stroke="#616161"
        stroke-width="0.6"
      />

      <!-- <line
        :x1="clientPosition.x"
        :x2="clientPosition.x"
        :y1="clientPosition.y - targetSize"
        :y2="clientPosition.y + targetSize"
        :stroke="isDarkMode ? '#212121' : '#E1E1E1'"
        stroke-width="1"
      /> -->
      <line
        :x1="clientPosition.x"
        :x2="clientPosition.x"
        :y1="clientPosition.y - targetSize"
        :y2="clientPosition.y + targetSize"
        :stroke="isDarkMode ? '#212121' : '#E1E1E1'"
        stroke-width="1"
      />

      <line
        :x1="clientPosition.x"
        :x2="clientPosition.x"
        :y1="clientPosition.y + targetSize"
        :y2="boardSize.height"
        stroke="#616161"
        stroke-width="0.6"
      />

      <line
        :x1="0"
        :x2="clientPosition.x - targetSize"
        :y1="clientPosition.y"
        :y2="clientPosition.y"
        stroke="#616161"
        stroke-width="0.6"
      />

      <line
        :x1="clientPosition.x - targetSize"
        :x2="clientPosition.x + targetSize"
        :y1="clientPosition.y"
        :y2="clientPosition.y"
        :stroke="isDarkMode ? '#212121' : '#E1E1E1'"
        stroke-width="1"
      />

      <line
        :x1="clientPosition.x + targetSize"
        :x2="boardSize.width"
        :y1="clientPosition.y"
        :y2="clientPosition.y"
        stroke="#616161"
        stroke-width="0.6"
      />

      <foreignObject
        :x="clientPosition.x - 34"
        :y="clientPosition.y - targetSize - 34"
        width="28"
        height="28"
        style="overflow: visible"
      >
        <div
          :style="{
            transform: 'rotate(-90deg)',
            height: '16px',
            width: '46px',
            fontSize: '14px',
            color: isDarkMode ? '#616161' : '#8A8A8A',
          }"
        >
          {{ Number(clientPosition.y.toFixed(0)) }}
        </div>
      </foreignObject>

      <foreignObject
        :x="clientPosition.x - targetSize - 34"
        :y="clientPosition.y - 20"
        width="46"
        height="16"
        style="overflow: visible"
      >
        <div
          :style="{
            height: '16px',
            width: '46px',
            fontSize: '14px',
            color: isDarkMode ? '#616161' : '#8A8A8A',
          }"
        >
          {{ Number(clientPosition.x.toFixed(0)) }}
        </div>
      </foreignObject>

      <circle
        :cx="clientPosition.x - targetSize"
        :cy="clientPosition.y"
        r="2"
        fill="#42d392"
      />

      <circle
        :cx="clientPosition.x + targetSize"
        :cy="clientPosition.y"
        r="2"
        fill="#42d392"
      />

      <circle
        :cx="clientPosition.x"
        :cy="clientPosition.y - targetSize"
        r="2"
        fill="#5f8bee"
      />

      <circle
        :cx="clientPosition.x"
        :cy="clientPosition.y + targetSize"
        r="2"
        fill="#5f8bee"
      />

      <circle
        class="moving-target"
        :cx="clientPosition.x"
        :cy="clientPosition.y"
        :r="targetSize"
        :fill="isDarkMode ? '#FFFFFF05' : '#00000005'"
      />

      <circle
        :cx="clientPosition.x"
        :cy="clientPosition.y"
        r="3.5"
        fill="#E33F31"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>

</style>
