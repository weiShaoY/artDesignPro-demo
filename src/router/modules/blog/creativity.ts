import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const creativityRoute: RouterType.BlogRouteRecordRaw = {
  name: 'Creativity',
  path: 'creativity',
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    title: '创意',
    icon: 'blog-menu-creativity',
    keepAlive: false,
  },
  children: [
    {
      path: 'clock',
      name: 'Clock',
      component: () => import('@/pages/blog/creativity/clock/index.vue'),
      meta: {
        title: '时钟',
        keepAlive: true,
        icon: 'blog-menu-clock',
      },
    },
    {
      path: 'muYu',
      name: 'MuYu',
      component: () => import('@/pages/blog/creativity/muYu/index.vue'),
      meta: {
        title: '木鱼',
        keepAlive: true,
        icon: 'blog-menu-muYu',
      },
    },
  ],
}

export default creativityRoute
