<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
} from 'vue'

import { CountTo } from 'vue3-count-to'

type Props = {
  percentage: number
  title: string
  color?: string
  icon?: string
  iconColor?: string
  iconBgColor?: string
  iconSize?: number
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  strokeWidth: 5,
  color: '#67C23A',
})

const animationDuration = 500

const currentPercentage = ref(0)

function animateProgress() {
  const startTime = Date.now()

  const startValue = currentPercentage.value

  const endValue = props.percentage

  const animate = () => {
    const currentTime = Date.now()

    const elapsed = currentTime - startTime

    const progress = Math.min(elapsed / animationDuration, 1)

    currentPercentage.value = startValue + (endValue - startValue) * progress

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  animateProgress()
})

// 当 percentage 属性变化时重新执行动画
watch(
  () => props.percentage,
  () => {
    animateProgress()
  },
)
</script>

<template>
  <div
    class="progress-card art-custom-card"
  >
    <div
      class="progress-info"
      :style="{ justifyContent: icon ? 'space-between' : 'flex-start' }"
    >
      <div
        class="left"
      >
        <i
          v-if="icon"
          class="iconfont-sys"
          :style="{
            color: iconColor,
            backgroundColor: iconBgColor,
            fontSize: `${iconSize}px`,
          }"
          v-html="icon"
        />
      </div>

      <div
        class="right"
      >
        <CountTo
          :key="percentage"
          class="percentage"
          :style="{ textAlign: icon ? 'right' : 'left' }"
          :end-val="percentage"
          :duration="2000"
          suffix="%"
        />

        <p
          class="title"
        >
          {{ title }}
        </p>
      </div>
    </div>

    <el-progress
      :percentage="currentPercentage"
      :stroke-width="strokeWidth"
      :show-text="false"
      :color="color"
    />
  </div>
</template>

<style lang="scss" scoped>
  .progress-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8rem;
  padding: 0 20px;
  background-color: var(--art-main-bg-color);
  border-radius: calc(var(--custom-radius) + 4px);

  .progress-info {
    display: flex;
    align-items: center;
    margin-block-end: 15px;

    .left {
      i {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        background-color: var(--art-gray-300);
        border-radius: 8px;
      }
    }

    .right {
      .percentage {
        display: block;
        margin-block-end: 4px;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--art-gray-900);
      }

      .title {
        font-size: 0.875rem;
        color: var(--art-gray-600);
      }
    }
  }

  :deep(.el-progress-bar__outer) {
    background-color: rgb(240 240 240);
  }
}
</style>
