import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const documentRoute: BlogType.AppRouteRecordRaw = {
  path: '/blog/widgets',
  name: 'Widgets',
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    title: '文档',
    icon: '&#xe81a;',
    keepAlive: false,
    order: 0,
  },
  children: [
    {
      path: '/blog/outside/iframe/elementui',
      name: 'ElementUI',

      // component: '',
      meta: {
        title: 'elementUI',
        keepAlive: false,
        link: 'https://element-plus.org/zh-CN/component/overview.html',
        isIframe: true,
        showBadge: true,
        icon: '&#xe676;',

      },
    },
  ],
}

export default documentRoute
