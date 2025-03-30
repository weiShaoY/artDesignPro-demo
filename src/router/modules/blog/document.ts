import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const documentRoute: BlogType.AppRouteRecordRaw = {
  path: '/blog/document',
  name: 'Document',
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    title: '文档',
    keepAlive: false,
    order: 0,
    icon: 'blog-menu-document',
  },
  children: [
    {
      path: '/blog/document/typescript',
      name: 'TypeScript',
      meta: {
        title: 'TypeScript',

        // link: 'https://www.typescriptlang.org/zh/',
        icon: 'blog-menu-typeScript',
        keepAlive: false,

        // isIframe: true,
        showBadge: true,

        iframeUrl: 'https://www.typescriptlang.org/zh/',
      },
    },

    // {
    //   path: '/blog/document/vite',
    //   name: 'Vite',
    //   meta: {
    //     title: 'Vite',
    //     link: 'https://cn.vitejs.dev/',
    //     icon: 'blog-menu-vite',
    //     keepAlive: false,
    //     isIframe: true,
    //   },
    // },
    // {
    //   path: '/blog/document/react',
    //   name: 'React',
    //   meta: {
    //     title: 'React',
    //     link: 'https://zh-hans.react.dev/',
    //     icon: 'blog-menu-react',
    //     keepAlive: false,
    //     isIframe: true,
    //   },
    // },
    // {
    //   path: '/blog/document/vue',
    //   name: 'Vue',
    //   meta: {
    //     title: 'Vue',
    //     link: 'https://cn.vuejs.org/',
    //     icon: 'blog-menu-vue',
    //     keepAlive: false,
    //     showTextBadge: '外链',
    //   },
    // },
  ],
}

export default documentRoute
