import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const menuRoute: RouterType.BlogRouteRecordRaw = {
  path: 'menu',
  name: 'Menu',
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    title: '多级路由模版',
    icon: '&#xe8a4;',
    keepAlive: false,
  },
  children: [
    {
      path: 'menu1',
      name: 'Menus',
      component: () => import('@/pages/blog/menu/Menu.vue'),
      meta: {
        title: '菜单权限',
        icon: '&#xe8a4;',
        keepAlive: true,
      },
    },
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('@/pages/blog/menu/Permission.vue'),

      meta: {
        title: '权限控制',
        icon: '&#xe831;',
        textBadge: 'new',
        keepAlive: true,
      },
    },
    {
      path: 'nested',
      name: 'Nested',
      meta: {
        title: '嵌套菜单',
        icon: '&#xe676;',
        keepAlive: true,
      },
      children: [
        {
          path: 'menu1',
          name: 'NestedMenu1',
          component: () => import('@/pages/blog/menu/nested/Menu1.vue'),
          meta: {
            title: '菜单1',
            icon: '&#xe676;',
            keepAlive: true,
          },
        },
        {
          path: 'menu2',
          name: 'NestedMenu2',

          // component: '',
          meta: {
            title: '菜单2',
            icon: '&#xe676;',
            keepAlive: true,
          },
          children: [
            {
              path: 'menu2-1',
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
          path: 'menu3',
          name: 'NestedMenu3',

          // component: '',
          meta: {
            title: '菜单3',
            icon: '&#xe676;',
            keepAlive: true,
          },
          children: [
            {
              path: 'menu3-1',
              name: 'NestedMenu3-1',
              component: () => import('@/pages/blog/menu/nested/menu3/Menu3-1.vue'),
              meta: {
                title: '菜单3-1',
                icon: '&#xe676;',
                keepAlive: true,
              },
            },
            {
              path: 'menu3-2',
              name: 'NestedMenu3-2',
              meta: {
                title: '菜单3-2',
                icon: '&#xe676;',
                keepAlive: true,
              },
              children: [
                {
                  path: 'menu3-2-1',
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
}

export default menuRoute
