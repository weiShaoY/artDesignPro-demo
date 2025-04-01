import { SIMPLE_LAYOUT } from '@/layouts'

/**
 *  错误路由
 */
const errorRouter: RouterType.RouteRecordRaw[] = [{
  path: '/403',
  component: SIMPLE_LAYOUT,
  children: [
    {
      path: '',
      name: '403',
      component: () => import('@/pages/error/403/index.vue'),
      meta: {
        title: '403',
      },
    },
  ],
}, {
  path: '/404',
  component: SIMPLE_LAYOUT,
  children: [
    {
      path: '',
      name: '404',
      component: () => import('@/pages/error/404/index.vue'),
      meta: {
        title: '404',
      },
    },
  ],
}, {
  path: '/500',
  component: SIMPLE_LAYOUT,
  children: [
    {
      path: '',
      name: '500',
      component: () => import('@/pages/error/500/index.vue'),
      meta: {
        title: '500',
      },
    },
  ],
}]

export default errorRouter
