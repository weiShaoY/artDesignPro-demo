import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const documentRoute: BlogType.AppRouteRecordRaw = {
  path: 'document',
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
      path: 'typescript',
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
      path: 'vite',
      name: 'Vite',
      meta: {
        title: 'Vite',
        icon: 'blog-menu-vite',
        iframeUrl: 'https://cn.vitejs.dev/',
        keepAlive: false,
      },
    },
    {
      path: 'react',
      name: 'React',
      meta: {
        title: 'React',
        icon: 'blog-menu-react',
        iframeUrl: 'https://zh-hans.react.dev/',
        keepAlive: false,
      },
    },
    {
      path: 'vue',
      name: 'Vue',
      meta: {
        title: 'Vue',
        icon: 'blog-menu-vue',
        externalUrl: 'https://cn.vuejs.org/',
        keepAlive: false,
      },
    },
    {
      path: 'angular',
      name: 'Angular',
      meta: {
        title: 'Angular',
        icon: 'blog-menu-angular',
        iframeUrl: 'https://angular.io/',
        keepAlive: false,
      },
    },
    {
      path: 'pinia',
      name: 'Pinia',
      meta: {
        title: 'Pinia',
        icon: 'blog-menu-pinia',
        iframeUrl: 'https://pinia.vuejs.org/zh/',
        keepAlive: false,
      },
    },
    {
      path: 'vueuse',
      name: 'VueUse',
      meta: {
        title: 'vueuse',
        icon: 'blog-menu-vueuse',
        iframeUrl: 'https://vueuse.pages.dev/',
        keepAlive: false,
      },
    },
    {
      path: 'unocss',
      name: 'Unocss',
      meta: {
        title: 'Unocss',
        icon: 'blog-menu-unocss',
        iframeUrl: 'https://unocss-cn.pages.dev/',
        keepAlive: false,
      },
    },
    {
      path: 'tailwindCss',
      name: 'TailwindCss',
      meta: {
        title: 'TailwindCss',
        icon: 'blog-menu-tailwindCss',
        iframeUrl: 'https://tailwindcss.com/docs/installation',
        keepAlive: false,
      },
    },
    {
      path: 'eslint',
      name: 'Eslint',
      meta: {
        title: 'Eslint',
        icon: 'blog-menu-eslint',
        iframeUrl: 'https://eslint.org/docs/latest/',
        keepAlive: false,
      },
    },
    {
      path: 'prettier',
      name: 'Prettier',
      meta: {
        title: 'Prettier',
        icon: 'blog-menu-prettier',
        iframeUrl: 'https://prettier.io/',
        keepAlive: false,
      },
    },
    {
      path: 'docker',
      name: 'Docker',
      meta: {
        title: 'Docker',
        icon: 'blog-menu-docker',
        externalUrl: 'https://docs.docker.com/build-cloud/',
        keepAlive: false,
      },
    },
    {
      path: 'echarts',
      name: 'Echarts',
      meta: {
        title: 'Echarts',
        icon: 'blog-menu-echarts',
        externalUrl: 'https://echarts.apache.org/zh/index.html',
        keepAlive: false,
      },
    },
    {
      path: 'nginx',
      name: 'Nginx',
      meta: {
        title: 'Nginx',
        icon: 'blog-menu-nginx',
        iframeUrl: 'https://nginx.org/en/docs/',
        keepAlive: false,
      },
    },
    {
      path: 'electron',
      name: 'Electron',
      meta: {
        title: 'Electron',
        icon: 'blog-menu-electron',
        iframeUrl: 'https://www.electronjs.org/zh/docs/latest/',
        keepAlive: false,
      },
    },
    {
      path: 'nextJs',
      name: 'NextJs',
      meta: {
        title: 'NextJs',
        icon: 'blog-menu-nextJs',
        externalUrl: 'https://www.nextjs.cn/',
        keepAlive: false,
      },
    },
  ],
}

export default documentRoute
