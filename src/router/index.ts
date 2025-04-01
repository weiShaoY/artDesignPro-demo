import type { App } from 'vue'

import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'

import { createRouterGuard } from './guard'

import { formatModules } from './utils'

const appModules = import.meta.glob('./modules/*/index.ts', {
  eager: true,
})

/**
 *  获取路由列表
 */
export const routeList = formatModules(appModules, [])

console.log('%c Line:19 🍖 routeList', 'color:#2eafb0', routeList)

/**
 * 博客模块首页路径常量
 */
export const BLOG_HOME = import.meta.env.VITE_ROUTER_BLOG_HOME

/** 静态路由配置 */
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: BLOG_HOME,
  },

  {
    path: '/blog',
    redirect: BLOG_HOME,
  },

  ...routeList,
]

/** 创建路由实例 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
})

/**
 * 初始化路由，将 Vue Router 实例挂载到 Vue 应用中
 * @param app Vue 应用实例
 */
export async function initRouter(app: App<Element>) {
  app.use(router)

  // 创建并应用路由守卫
  createRouterGuard(router)

  // 等待路由准备就绪
  await router.isReady()
}
