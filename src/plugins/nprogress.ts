import NProgress from 'nprogress'

/** 配置并初始化 NProgress 进度条插件 */
export function setupNProgress() {
  // 配置进度条的动画效果和速度
  NProgress.configure({
    easing: 'ease',
    speed: 500,
  })

  // 将 NProgress 挂载到全局 window 对象，方便在其他地方调用
  window.NProgress = NProgress
}
