<script setup lang="ts">

/**
 *  导入类型定义
 */
import type { Handler } from 'mitt'

/**
 *  导入工具和资源
 */
import { blogMittBus } from '@/utils'

import bp from '@imgs/ceremony/hb.png'

import sd from '@imgs/ceremony/sd.png'

import yd from '@imgs/ceremony/yd.png'

/**
 *  导入Vue组合式API
 */
import { useEventListener } from '@vueuse/core'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

/**
 *  烟花系统常量配置
 */
const CONFIG = {
  POOL_SIZE: 600, // 对象池大小
  PARTICLES_PER_BURST: 200, // 每次爆炸产生的粒子数量

  SIZES: {
    RECTANGLE: {
      WIDTH: 24,
      HEIGHT: 12,
    },
    SQUARE: {
      SIZE: 12,
    },
    CIRCLE: {
      SIZE: 12,
    },
    TRIANGLE: {
      SIZE: 10,
    },
    OVAL: {
      WIDTH: 24,
      HEIGHT: 12,
    },
    IMAGE: {
      WIDTH: 30,
      HEIGHT: 30,
    },
  },

  ROTATION: {
    BASE_SPEED: 2,
    RANDOM_SPEED: 3,
    DECAY: 0.85,
  },

  COLORS: [
    'rgba(255, 68, 68, 1)',
    'rgba(255, 68, 68, 0.9)',

    // ...其他颜色配置
  ],

  SHAPES: [
    'rectangle',
    'rectangle',
    'rectangle', // 矩形更高概率
    'circle',
    'triangle',
    'oval',
  ],
}

/**
 *  烟花粒子类型定义
 */
type Firework = {
  x: number
  y: number
  color: string
  velocity: { x: number, y: number }
  rotation: number
  rotationX: number
  rotationY: number
  scale: number
  shape: string
  active: boolean
  rotationSpeed: { x: number, y: number, z: number }
  imageUrl?: string
  opacity: number
}

/**
 *  画布和上下文引用
 */
const canvas = ref<HTMLCanvasElement | null>(null)

const ctx = ref<CanvasRenderingContext2D | null>(null)

/**
 *  粒子池和活动烟花
 */
const particlePool = ref<Firework[]>([])

const fireworks = ref<Firework[]>([])

/**
 *  图片缓存对象
 */
const imageCache: Record<string, HTMLImageElement> = {
}

/**
 *  预加载图片
 *  @param url 图片URL
 *  @returns 加载完成的图片对象
 */
function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (imageCache[url]?.complete) {
      resolve(imageCache[url])
      return
    }

    const img = new Image()

    img.crossOrigin = 'anonymous'
    img.src = url

    img.onload = () => {
      imageCache[url] = img
      resolve(img)
    }

    img.onerror = reject
  })
}

/**
 *  初始化粒子对象池
 */
function initParticlePool() {
  particlePool.value = Array.from({
    length: CONFIG.POOL_SIZE,
  }, () => ({
    x: 0,
    y: 0,
    color: '',
    velocity: {
      x: 0,
      y: 0,
    },
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    shape: 'circle',
    active: false,
    rotationSpeed: {
      x: 0,
      y: 0,
      z: 0,
    },
    opacity: 1,
  }))
}

/**
 *  从对象池获取可用粒子
 *  @returns 可用粒子或null
 */
function getParticleFromPool(): Firework | null {
  const particle = particlePool.value.find(p => !p.active)

  if (particle) {
    particle.active = true
  }

  return particle || null
}

/**
 *  创建烟花效果
 *  @param imageUrl 可选图片URL
 */
function createFirework(imageUrl?: string) {
  setTimeout(() => {
    const startX = Math.random() * window.innerWidth

    const startY = window.innerHeight

    const shapes = imageUrl && imageCache[imageUrl] ? ['image'] : CONFIG.SHAPES

    for (let i = 0; i < CONFIG.PARTICLES_PER_BURST; i++) {
      const particle = getParticleFromPool()

      if (!particle) {
        continue
      }

      const angle = (Math.PI * i) / (CONFIG.PARTICLES_PER_BURST / 2)

      const speed = (12 + Math.random() * 6) * 1.5

      const spread = Math.random() * Math.PI * 2

      Object.assign(particle, {
        x: startX,
        y: startY,
        color: CONFIG.COLORS[Math.floor(Math.random() * CONFIG.COLORS.length)],
        velocity: {
          x: Math.cos(angle) * Math.cos(spread) * speed * (Math.random() * 0.5 + 0.5),
          y: Math.sin(angle) * speed - 15,
        },
        rotation: Math.random() * 360,
        rotationX: Math.random() * 360 - 180,
        rotationY: Math.random() * 360 - 180,
        scale: 0.8 + Math.random() * 0.4,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        imageUrl: imageUrl && imageCache[imageUrl] ? imageUrl : undefined,
        rotationSpeed: {
          x: (Math.random() * CONFIG.ROTATION.RANDOM_SPEED + CONFIG.ROTATION.BASE_SPEED) * (Math.random() > 0.5 ? 1 : -1),
          y: (Math.random() * CONFIG.ROTATION.RANDOM_SPEED + CONFIG.ROTATION.BASE_SPEED) * (Math.random() > 0.5 ? 1 : -1),
          z: (Math.random() * CONFIG.ROTATION.RANDOM_SPEED + CONFIG.ROTATION.BASE_SPEED) * (Math.random() > 0.5 ? 1 : -1),
        },
        opacity: 1,
      })

      fireworks.value.push(particle)
    }
  }, 0)
}

/**
 *  更新所有烟花状态
 */
function updateFireworks() {
  const VELOCITY_THRESHOLD = 10

  const OPACITY_DECAY = 0.02

  for (let i = fireworks.value.length - 1; i >= 0; i--) {
    const f = fireworks.value[i]

    f.x += f.velocity.x
    f.y += f.velocity.y
    f.velocity.y += 0.525
    f.rotation += f.rotationSpeed.z
    f.rotationX += f.rotationSpeed.x
    f.rotationY += f.rotationSpeed.y

    f.rotationSpeed.x *= CONFIG.ROTATION.DECAY
    f.rotationSpeed.y *= CONFIG.ROTATION.DECAY
    f.rotationSpeed.z *= CONFIG.ROTATION.DECAY

    if (f.velocity.y > VELOCITY_THRESHOLD) {
      f.opacity -= OPACITY_DECAY
      if (f.opacity <= 0) {
        f.active = false
        fireworks.value.splice(i, 1)
        continue
      }
    }

    if (f.x < -100 || f.x > window.innerWidth + 100
      || f.y < -100 || f.y > window.innerHeight + 100) {
      f.active = false
      fireworks.value.splice(i, 1)
    }
  }
}

/**
 *  绘制单个烟花粒子
 *  @param firework 烟花粒子对象
 */
function drawFirework(firework: Firework) {
  if (!ctx.value) {
    return
  }

  ctx.value.save()
  ctx.value.globalAlpha = firework.opacity
  ctx.value.translate(firework.x, firework.y)
  ctx.value.rotate((firework.rotation * Math.PI) / 180)
  ctx.value.scale(firework.scale, firework.scale)

  switch (firework.shape) {
    case 'rectangle':
      ctx.value.fillStyle = firework.color
      ctx.value.fillRect(
        -CONFIG.SIZES.RECTANGLE.WIDTH / 2,
        -CONFIG.SIZES.RECTANGLE.HEIGHT / 2,
        CONFIG.SIZES.RECTANGLE.WIDTH,
        CONFIG.SIZES.RECTANGLE.HEIGHT,
      )
      break
    case 'square':
      ctx.value.fillStyle = firework.color
      ctx.value.fillRect(
        -CONFIG.SIZES.SQUARE.SIZE / 2,
        -CONFIG.SIZES.SQUARE.SIZE / 2,
        CONFIG.SIZES.SQUARE.SIZE,
        CONFIG.SIZES.SQUARE.SIZE,
      )
      break
    case 'circle':
      ctx.value.fillStyle = firework.color
      ctx.value.beginPath()
      ctx.value.arc(0, 0, CONFIG.SIZES.CIRCLE.SIZE / 2, 0, Math.PI * 2)
      ctx.value.closePath()
      ctx.value.fill()
      break
    case 'triangle':
      ctx.value.fillStyle = firework.color
      ctx.value.beginPath()
      ctx.value.moveTo(0, -CONFIG.SIZES.TRIANGLE.SIZE)
      ctx.value.lineTo(CONFIG.SIZES.TRIANGLE.SIZE, CONFIG.SIZES.TRIANGLE.SIZE)
      ctx.value.lineTo(-CONFIG.SIZES.TRIANGLE.SIZE, CONFIG.SIZES.TRIANGLE.SIZE)
      ctx.value.closePath()
      ctx.value.fill()
      break
    case 'oval':
      ctx.value.fillStyle = firework.color
      ctx.value.beginPath()
      ctx.value.ellipse(
        0,
        0,
        CONFIG.SIZES.OVAL.WIDTH / 2,
        CONFIG.SIZES.OVAL.HEIGHT / 2,
        0,
        0,
        Math.PI * 2,
      )
      ctx.value.closePath()
      ctx.value.fill()
      break
    case 'image':
      if (firework.imageUrl) {
        const img = imageCache[firework.imageUrl]

        if (img && img.complete) {
          ctx.value.drawImage(
            img,
            -CONFIG.SIZES.IMAGE.WIDTH / 2,
            -CONFIG.SIZES.IMAGE.HEIGHT / 2,
            CONFIG.SIZES.IMAGE.WIDTH,
            CONFIG.SIZES.IMAGE.HEIGHT,
          )
        }
      }

      break
    default:
      break
  }

  ctx.value.restore()
}

/**
 *  主绘制函数
 */
function draw() {
  if (!ctx.value || !canvas.value) {
    return
  }

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.value.globalCompositeOperation = 'lighter'

  fireworks.value.forEach(drawFirework)
}

/**
 *  动画循环控制
 */
let animationFrame: number

function animate() {
  updateFireworks()
  draw()
  animationFrame = requestAnimationFrame(animate)
}

/**
 *  处理快捷键触发
 *  @param event 键盘事件
 */
function handleKeyPress(event: KeyboardEvent) {
  // 检查是否同时按下 Ctrl + Shift + F (Windows/Linux) 或 Command + Shift + F (macOS)

  if (
    (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'p')
    || (event.metaKey && event.shiftKey && event.key.toLowerCase() === 'p')
  ) {
    event.preventDefault()
    createFirework()
  }
}

/**
 *  调整画布尺寸
 */
function resizeCanvas() {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }
}

/**
 *  预加载所有图片资源
 */
async function preloadAllImages() {
  try {
    await Promise.all([bp, sd, yd].map(preloadImage))
  }
  catch (error) {
    console.error('图片预加载失败:', error)
  }
}

/**
 *  组件挂载生命周期
 */
onMounted(async () => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    resizeCanvas()
  }

  initParticlePool()
  await preloadAllImages()

  animate()
  useEventListener(window, 'keydown', handleKeyPress)
  useEventListener(window, 'resize', resizeCanvas)

  // 监听触发烟花的事件
  blogMittBus.on('triggerFireworks', ((event: unknown) => {
    const imageUrl = event as string | undefined

    if (imageUrl && imageCache[imageUrl]?.complete) {
      createFirework(imageUrl)
    }
    else {
      createFirework()
    }
  }) as Handler<unknown>)
})

/**
 *  组件卸载生命周期
 */
onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  blogMittBus.off('triggerFireworks')
})
</script>

<template>
  <canvas
    ref="canvas"
    class="fireworks-canvas"
  />
</template>

<style scoped>
  .fireworks-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
