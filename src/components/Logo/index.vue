<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

type LogoPropsType = {

  /**
   *  颜色
   */
  textColor?: string
}

const props = withDefaults(defineProps<LogoPropsType>(), {
  textColor: 'white',
})

const router = useRouter()

function handleClick() {
  // if (router.currentRoute.value.path === import.meta.env.VITE_APP_HOME_PAGE) {
  //   return
  // }

  router.push('/')
}
</script>

<template>
  <a
    class="flex items-center gap-2 hover:cursor-pointer"
    @click="handleClick"
  >
    <SvgIcon
      icon="logo"
      size="60"
    />

    <SvgIcon
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
