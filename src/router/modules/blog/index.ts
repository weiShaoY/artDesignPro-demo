import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

export const blogRouteList: BlogType.AppRouteRecordRaw[] = [

  {
    name: 'Dashboard',
    path: '/blog/dashboard',
    component: BLOG_DEFAULT_LAYOUT,
    meta: {
      title: '仪表盘',
      icon: '&#xe721;',
      keepAlive: false,
    },
    children: [
      {
        path: '/blog/dashboard/console',
        name: 'Console',
        component: () => import('@/pages/blog/dashboard/console/index.vue'),
        meta: {
          title: '工作台',
          keepAlive: true,
        },
      },
      {
        path: '/blog/dashboard/analysis',
        name: 'Analysis',
        component: () => import('@/pages/blog/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
          keepAlive: true,
        },
      },
      {
        path: '/blog/dashboard/ecommerce',
        name: 'Ecommerce',
        component: () => import('@/pages/blog/dashboard/ecommerce/index.vue'),
        meta: {
          title: '电子商务',
          keepAlive: true,
          showTextBadge: 'new',
        },
      },
    ],
  },
  {
    path: '/blog/menu',
    name: 'Menu',
    component: BLOG_DEFAULT_LAYOUT,
    meta: {
      title: '菜单管理',
      icon: '&#xe8a4;',
      keepAlive: false,
    },
    children: [
      {
        path: '/blog/menu/menu',
        name: 'Menus',
        component: () => import('@/pages/blog/menu/Menu.vue'),
        meta: {
          title: '菜单权限',
          icon: '&#xe8a4;',
          keepAlive: true,
          authList: [
            {
              title: '新增',
              auth_mark: 'add',
            },
            {
              title: '编辑',
              auth_mark: 'edit',
            },
            {
              title: '删除',
              auth_mark: 'delete',
            },
          ],
        },
      },
      {
        path: '/blog/menu/permission',
        name: 'Permission',
        component: () => import('@/pages/blog/menu/Permission.vue'),

        meta: {
          title: '权限控制',
          icon: '&#xe831;',
          showTextBadge: 'new',
          keepAlive: true,
          authList: [
            {
              title: '新增',
              auth_mark: 'add',
            },
            {
              title: '编辑',
              auth_mark: 'edit',
            },
            {
              title: '删除',
              auth_mark: 'delete',
            },
          ],
        },
      },
      {
        path: '/blog/menu/nested',
        name: 'Nested',

        // component: '',
        meta: {
          title: '嵌套菜单',
          icon: '&#xe676;',
          keepAlive: true,
        },
        children: [
          {
            path: '/blog/menu/nested/menu1',
            name: 'NestedMenu1',
            component: () => import('@/pages/blog/menu/nested/Menu1.vue'),
            meta: {
              title: '菜单1',
              icon: '&#xe676;',
              keepAlive: true,
            },
          },
          {
            path: '/blog/menu/nested/menu2',
            name: 'NestedMenu2',

            // component: '',
            meta: {
              title: '菜单2',
              icon: '&#xe676;',
              keepAlive: true,
            },
            children: [
              {
                path: '/blog/menu/nested/menu2/menu2-1',
                name: 'NestedMenu2-1',
                component: () => import('@/pages/blog/menu/nested/menu2/Menu2-1.vue'),
                meta: {
                  title: '菜单2-1',
                  icon: '&#xe676;',
                  keepAlive: true,
                },
              },
            ],
          },
          {
            path: '/blog/menu/nested/menu3',
            name: 'NestedMenu3',

            // component: '',
            meta: {
              title: '菜单3',
              icon: '&#xe676;',
              keepAlive: true,
            },
            children: [
              {
                path: '/blog/menu/nested/menu3/menu3-1',
                name: 'NestedMenu3-1',
                component: () => import('@/pages/blog/menu/nested/menu3/Menu3-1.vue'),
                meta: {
                  title: '菜单3-1',
                  icon: '&#xe676;',
                  keepAlive: true,
                },
              },
              {
                path: '/blog/menu/nested/menu3/menu3-2',
                name: 'NestedMenu3-2',

                // component: '',
                meta: {
                  title: '菜单3-2',
                  icon: '&#xe676;',
                  keepAlive: true,
                },
                children: [
                  {
                    path: '/blog/menu/nested/menu3/menu3-2-1',
                    name: 'NestedMenu3-2-1',
                    component: () => import('@/pages/blog/menu/nested/menu3/menu3-2/Menu3-2-1.vue'),
                    meta: {
                      title: '菜单3-2-1',
                      icon: '&#xe676;',
                      keepAlive: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 一级菜单
  {
    path: '/blog/log/changeLog',
    name: 'ChangeLog',
    component: () => import('@/pages/blog/log/ChangeLog.vue'),
    meta: {
      title: '更新日志',
      showTextBadge: `v2.2.4`,
      icon: '&#xe712;',
      keepAlive: false,
      isInMainContainer: true,
    },
  },

  {
    path: '/blog/widgets',
    name: 'Widgets',
    component: BLOG_DEFAULT_LAYOUT,
    meta: {
      title: '测试页面',
      icon: '&#xe81a;',
      keepAlive: false,
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
  },

  {
    path: '/blog/log/test',
    name: 'ChangeLog',
    meta: {
      title: '测试',
      icon: '&#xe712;',
      keepAlive: false,
      isIframe: true,
      isInMainContainer: true,
      link: 'https://element-plus.org/zh-CN/component/overview.html',
    },
  },
]
