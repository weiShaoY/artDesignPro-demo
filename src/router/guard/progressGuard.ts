import type { Router } from 'vue-router'

/**
 * 创建进度条守卫
 * @param router - 路由实例
 */
export function createProgressGuard(router: Router) {
  // 在路由开始前启动进度条
  router.beforeEach((_to, _from, next) => {
    window.NProgress?.start?.()
    next()
  })

  // 在路由结束后完成进度条
  router.afterEach(() => {
    window.NProgress?.done?.()
  })
}
