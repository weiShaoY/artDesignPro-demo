import { HOME_DEFAULT_LAYOUT } from '@/layouts'

const homeRoute: BlogType.AppRouteRecordRaw = {
  name: 'home',
  path: '/home',

  component: HOME_DEFAULT_LAYOUT,
  meta: {
    title: '首页',
    icon: '&#xe721;',
    keepAlive: false,
  },
  children: [
    {
      path: '/home/index',
      name: 'Index',
      component: () => import('@/pages/home/index/index.vue'),
      meta: {
        title: '首页',
        keepAlive: false,
      },
    },
  ],
}

export default homeRoute
