<script setup lang="ts">
import type { CSSProperties } from 'vue'

type SvgIconPropsType = {

  /**
   * 图标的名称
   */
  icon: string

  /**
   * 图标的前缀
   */
  prefix?: string

  /**
   *  图标的颜色
   */
  color?: string

  /**
   * 图标的大小
   */
  size?: string | number

  /**
   *  额外的 CSS 类名
   */
  class?: string

  /**
   * 行内样式
   */
  style?: CSSProperties
}

const props = withDefaults(defineProps<SvgIconPropsType>(), {
  prefix: 'icon',
  size: '1em',
  color: 'currentColor',
})

/**
 * 计算 `symbolId` 用于引用图标
 */
const symbolId = computed(() => `#${props.prefix}-${props.icon}`)

/**
 * 计算合并后的类名
 */
const computedClass = computed(() =>
  `${props.class} anticon fill-current inline-block h-[1em] w-[1em] overflow-hidden outline-none`,
)

/**
 * 计算 SVG 的行内样式
 */
const computedStyle = computed(() => ({
  verticalAlign: 'middle',
  width: props.size,
  height: props.size,
  color: props.color,
  ...props.style,
}))
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    :aria-label="icon"
    :class="computedClass"
    :style="computedStyle"
  >
    <title>{{ icon }}</title>

    <use
      :xlink:href="symbolId"
      fill="currentColor"
    />
  </svg>
</template>
