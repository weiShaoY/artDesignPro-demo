<!------------------------------------  木鱼  ------------------------------------------------->
<script lang="ts" setup>
import muyuImage from './image/muyu.png'

import music from './music/music.aac'

/**
 *  功德
 */
const meritNumber = ref(0)

/**
 *  是否被点击
 */
const isStartClick = ref(false)

/**
 *  文字提示
 */
const tips = ref('功德 + 1')

function handleMouseDown() {
  isStartClick.value = true

  const audioElement = new Audio(music)

  audioElement.play()

  meritNumber.value++
}

function handleMouseUp() {
  isStartClick.value = false
}
</script>

<template>
  <ElSpace
    direction="vertical"
    fill
    :size="16"
  >
    <ElCard
      class="card-wrapper"
      body-class="h-full flex items-center justify-center"
    >
      <div
        class="relative h-120 w-full flex items-center justify-center p-6 color-[#C39557] !max-w-full"
      >
        <div
          :class="[{ 'tips-active': isStartClick }]"
          class="absolute left-[50%] top-[30%] translate-x-[-50%] text-center text-6 opacity-0"
        >
          {{ tips }}
        </div>

        <div
          class="text-center text-8"
        >
          功德: {{ meritNumber }}
        </div>

        <div
          class="relative h-full max-w-[200px] w-[60%] cursor-pointer bg-cover bg-contain bg-center bg-no-repeat"
          :class="{
            img_click: isStartClick,
          }"
          :style="{
            backgroundImage: `url(${muyuImage})`,
          }"

          @mousedown.prevent="handleMouseDown"
          @mouseup.prevent="handleMouseUp"
        />
      </div>
    </ElCard>
  </ElSpace>
</template>

<style lang="scss" scoped>
.img_click {
  transform: scale(0.8);
  transition: transform 0.1s ease-in-out;
}

.tips-active {
  animation: textMove 800ms;
}
@keyframes textMove {
  from {
    top: 30%;
    opacity: 1;
  }
  to {
    top: 1%;
    opacity: 0;
  }
}
</style>
