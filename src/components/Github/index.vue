<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

// import { openUrlInWindow } from '@/utils'

type GithubPropsType = {

  /**
   *  颜色
   */
  color?: string

  /**
   *  大小
   */
  size?: number

}

const props = withDefaults(defineProps<GithubPropsType>(), {
  color: 'white',
  size: 34,
})

function handleClick() {
  window.open(import.meta.env.VITE_GITHUB_URL, '_blank')
}
</script>

<template>
  <SvgIcon
    class="transform cursor-pointer transition-transform duration-500 hover:-translate-y-1"
    icon="github"
    :size="props.size"
    :style="{
      color: props.color,
    }"
    @click="handleClick"
  />
</template>

<style lang="less" scoped>

</style>
