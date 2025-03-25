<!--
 * 全局水印组件
 * @description 基于Element Plus的水印组件封装，支持自定义文本、样式和布局
 -->
<script setup lang="ts">
 /**
  * 水印组件属性类型定义
  */
 type WatermarkProps = {

   /** 水印文本内容 */
   content?: string

   /** 是否显示水印 */
   visible?: boolean

   /** 字体大小（像素） */
   fontSize?: number

   /** 字体颜色（RGBA格式） */
   fontColor?: string

   /** 旋转角度（度数） */
   rotate?: number

   /** 水平间距（像素） */
   gapX?: number

   /** 垂直间距（像素） */
   gapY?: number

   /** 水平偏移量（像素） */
   offsetX?: number

   /** 垂直偏移量（像素） */
   offsetY?: number

   /** 图层层级 */
   zIndex?: number
 }

/**
 * 定义组件属性默认值
 */
withDefaults(defineProps<WatermarkProps>(), {
  content: 'weiShaoY',
  visible: false,
  fontSize: 16,
  fontColor: 'rgba(128, 128, 128, 0.2)',
  rotate: -22,
  gapX: 100,
  gapY: 100,
  offsetX: 50,
  offsetY: 50,
  zIndex: 3100, // 确保在大多数布局中位于顶层
})
</script>

<template>
  <!-- 水印容器 -->
  <div
    v-if="visible"
    class="watermark-container"
    :style="{ zIndex }"
  >
    <!-- Element Plus 水印组件 -->
    <el-watermark
      :content="content"
      :font="{ fontSize, color: fontColor }"
      :rotate="rotate"
      :gap="[gapX, gapY]"
      :offset="[offsetX, offsetY]"
    >
      <!-- 占位元素，确保水印覆盖整个视口 -->
      <div
        style="height: 100vh"
      />
    </el-watermark>
  </div>
</template>

 <style lang="scss" scoped>
 /**
  * 水印容器样式
  * 1. 固定定位覆盖全屏
  * 2. 禁止指针事件穿透
  */
.watermark-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; // 防止水印阻挡页面交互
}
</style>
