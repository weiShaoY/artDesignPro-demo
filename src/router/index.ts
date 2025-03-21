import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import 'nprogress/nprogress.css'
import { RoutesAlias } from './modules/routesAlias'

import { createRouterGuard } from './utils/guards'

import Home from '@views/index/index.vue'

/** 扩展的路由配置类型 */
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

/** 首页路径常量 */
export const HOME_PAGE = '/dashboard/console'

/** 静态路由配置 */
const staticRoutes: AppRouteRecordRaw[] = [
  { path: '/', redirect: HOME_PAGE },
  {
    path: '/dashboard',
    component: Home,
    name: 'Dashboard',
    meta: { title: 'menus.dashboard.title' },
    children: [
      {
        path: RoutesAlias.Dashboard,
        name: 'Console',
        component: () => import('@views/dashboard/console/index.vue'),
        meta: { title: 'menus.dashboard.console', keepAlive: false }
      },
      {
        path: RoutesAlias.Analysis,
        name: 'Analysis',
        component: () => import('@views/dashboard/analysis/index.vue'),
        meta: { title: 'menus.dashboard.analysis', keepAlive: false }
      },
      {
        path: RoutesAlias.Ecommerce,
        name: 'Ecommerce',
        component: () => import('@views/dashboard/ecommerce/index.vue'),
        meta: { title: 'menus.dashboard.ecommerce', keepAlive: false }
      }
    ]
  }
]

/** 创建路由实例 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
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
