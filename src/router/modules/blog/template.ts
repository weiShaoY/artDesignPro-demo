import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

// eslint-disable-next-line unused-imports/no-unused-vars
const dashboardRoute: BlogType.AppRouteRecordRaw = {
  name: 'Dashboard',
  path: 'dashboard',
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    title: '代码模板',
    icon: '&#xe721;',
    keepAlive: false,
  },
  children: [
    {
      path: 'console',
      name: 'Console',
      component: () => import('@/pages/blog/dashboard/console/index.vue'),
      meta: {
        title: '工作台',
        keepAlive: true,
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/blog/dashboard/analysis/index.vue'),
      meta: {
        title: '分析页',
        keepAlive: true,
      },
    },
    {
      path: 'ecommerce',
      name: 'Ecommerce',
      component: () => import('@/pages/blog/dashboard/ecommerce/index.vue'),
      meta: {
        title: '电子商务',
        keepAlive: true,
        textBadge: 'new',
      },
    },
  ],
}

// export default dashboardRoute
