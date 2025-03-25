<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

type LogoPropsType = {

  /**
   *  颜色
   */
  textColor?: string

  /**
   *  是否隐藏logo
   */
  isHideLogo?: boolean

  /**
   *  是否隐藏文字
   */
  isHideText?: boolean
}

const props = withDefaults(defineProps<LogoPropsType>(), {
  textColor: 'white',
  isHideLogo: false,
  isHideText: false,
})

const router = useRouter()

function handleClick() {
  router.push('/')
}
</script>

<template>
  <a
    class="flex items-center gap-2 hover:cursor-pointer"
    @click="handleClick"
  >
    <SvgIcon
      v-if="!props.isHideLogo"
      icon="logo"
      size="60"
    />

    <SvgIcon
      v-if="!props.isHideText"
      icon="weiShaoY"
      size="120"
      :style="{
        color: props.textColor,
      }"
    />

  </a>
</template>

<style lang="less" scoped>

</style>
