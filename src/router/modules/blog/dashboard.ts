import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const dashboardRoute: RouterType.BlogRouteRecordRaw = {
  path: 'dashboard',
  name: 'Dashboard',
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    title: '仪表盘',
    icon: 'blog-menu-creativity',
    keepAlive: false,
  },
  children: [
    {
      path: 'console',
      name: 'Console',
      component: () => import('@/pages/blog/dashboard/console/index.vue'),
      meta: {
        title: '工作台11',
        keepAlive: true,
        icon: 'blog-menu-creativity',
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/blog/dashboard/analysis/index.vue'),
      meta: {
        title: '分析页',
        keepAlive: true,
        icon: 'blog-menu-creativity',
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
        icon: 'blog-menu-creativity',
        order: 0,
      },
    },
  ],
}

export default dashboardRoute
