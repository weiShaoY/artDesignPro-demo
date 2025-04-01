import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const documentRoute: RouterType.BlogRouteRecordRaw = {
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
        icon: 'blog-menu-typeScript',
        iframeUrl: 'https://www.typescriptlang.org/zh/',
        keepAlive: false,
        showDefaultBadge: true,
      },
    },
    {
      path: '/blog/document/vite',
      name: 'Vite',
      meta: {
        title: 'Vite',
        icon: 'blog-menu-vite',
        iframeUrl: 'https://cn.vitejs.dev/',
        keepAlive: false,
      },
    },
    {
      path: '/blog/document/react',
      name: 'React',
      meta: {
        title: 'React',
        icon: 'blog-menu-react',
        iframeUrl: 'https://zh-hans.react.dev/',
        keepAlive: false,
      },
    },
    {
      path: '/blog/document/vue',
      name: 'Vue',
      meta: {
        title: 'Vue',
        icon: 'blog-menu-vue',
        externalUrl: 'https://cn.vuejs.org/',
        keepAlive: false,
      },
    },
    {
      path: '/blog/document/angular',
      name: 'Angular',
      meta: {
        title: 'Angular',
        icon: 'blog-menu-angular',
        iframeUrl: 'https://angular.io/',
        keepAlive: false,
      },
    },
    {
      path: '/blog/document/pinia',
      name: 'Pinia',
      meta: {
        title: 'Pinia',
        icon: 'blog-menu-pinia',
        iframeUrl: 'https://pinia.vuejs.org/zh/',
        keepAlive: false,
      },
    },
    {
      path: '/blog/document/vueuse',
      name: 'VueUse',
      meta: {
        title: 'vueuse',
        icon: 'blog-menu-vueuse',
        iframeUrl: 'https://vueuse.pages.dev/',
        keepAlive: false,
      },
    },
    {
      path: '/blog/document/unocss',
      name: 'Unocss',
      meta: {
        title: 'Unocss',
        icon: 'blog-menu-unocss',
        iframeUrl: 'https://unocss-cn.pages.dev/',
        keepAlive: false,
      },
    },
    {
      path: '/blog/document/tailwindCss',
      name: 'TailwindCss',
      meta: {
        title: 'TailwindCss',
        icon: 'blog-menu-tailwindCss',
        iframeUrl: 'https://tailwindcss.com/docs/installation',
        keepAlive: false,
      },
    },

  ],
}

export default documentRoute
