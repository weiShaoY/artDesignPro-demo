import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const documentRoute: BlogType.AppRouteRecordRaw = {
  path: '/blog/document',
  name: 'Document',
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    title: '文档',
    keepAlive: false,
    order: 0,
    icon: 'blog-menu-creativity',
  },
  children: [
    {
      path: '/blog/document/elementui',
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
