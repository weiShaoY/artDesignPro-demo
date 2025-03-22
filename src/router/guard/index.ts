import type { Router } from 'vue-router'

import { createBlogRouteGuard } from './blogRouteGuard'

import { createDocumentTitleGuard } from './documentTitleGuard'

import { createProgressGuard } from './progressGuard'

/**
 * 创建路由守卫
 *
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  // 创建进度条守卫
  createProgressGuard(router)

  // 创建文档标题守卫
  createDocumentTitleGuard(router)

  // 创建博客路由守卫
  createBlogRouteGuard(router)
}
