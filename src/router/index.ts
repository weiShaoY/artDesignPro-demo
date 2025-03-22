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

/** 扩展的路由配置类型 */
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

/** 首页路径常量 */
export const HOME_PAGE = '/blog/dashboard/console'

/** 静态路由配置 */
const staticRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_PAGE,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/error/404/index.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/pages/error/500/index.vue'),
    meta: {
      title: '500',
    },
  },
  {
    path: '/blog',
    redirect: import.meta.env.VITE_ROUTER_BLOG_HOME,
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
