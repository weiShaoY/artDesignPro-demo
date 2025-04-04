import systemLogo from '/favicon.svg'

// import { DARK_CLASS } from '@/constants/app'

// import { localStg, toggleHtmlClass } from '@/utils'

// import { getRgb } from '@sa/color'

// @unocss-include

/** 初始化应用加载动画，并设置主题颜色与暗黑模式 */
export function setupLoading() {
  /** 获取本地存储的主题颜色，默认为 `#646cff` */
  // const themeColor = localStg.get('themeColor') || '#646cff'

  // /** 获取本地存储的暗黑模式状态，默认为 `false` */
  // const darkMode = localStg.get('darkMode') || false

  /** 解析主题颜色的 RGB 值 */
  // const { r, g, b } = getRgb(themeColor)

  /** 定义 CSS 变量，设置主色调s */
  // const primaryColor = `--primary-color: ${r} ${g} ${b}`

  // 如果启用暗黑模式，则添加相应的类名
  // if (darkMode) {
  //   toggleHtmlClass(DARK_CLASS).add()
  // }

  /** 定义加载动画的小圆点动画类名 */
  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500',
  ]

  /** 给 SVG 图标添加 `class` 以应用 `text-primary` 颜色 */
  const logoWithClass = systemLogo.replace('<svg', `<svg class="size-128px text-primary"`)

  /** 生成四个加载动画小圆点的 HTML 代码 */
  const dot = loadingClasses
    .map((item) => {
      return `<div class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse ${item}"></div>`
    })
    .join('\n')

  /** 生成加载界面的 HTML 代码 */
  const loading = `
  <div class="fixed-center flex-col bg-layout" style="">
    ${logoWithClass}
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        ${dot}
      </div>
    </div>
    <h2 class="text-28px font-500 text-primary">Soybean 管理系统</h2>
  </div>`

  /** 获取 `#app` 容器，并插入加载动画 */
  const app = document.getElementById('app')

  if (app) {
    app.innerHTML = loading
  }
}
