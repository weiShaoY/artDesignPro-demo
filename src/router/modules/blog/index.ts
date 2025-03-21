export const blogList = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: '/index/index',
    meta: {
      title: 'menus.dashboard.title',
      icon: '&#xe721;',
      keepAlive: false
    },
    children: [
      {
        path: 'console',
        name: 'Console',
        component: '/dashboard/console',
        meta: {
          title: 'menus.dashboard.console',
          keepAlive: true
        }
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: '/dashboard/analysis',
        meta: {
          title: 'menus.dashboard.analysis',
          keepAlive: true
        }
      },
      {
        path: 'ecommerce',
        name: 'Ecommerce',
        component: '/dashboard/ecommerce',
        meta: {
          title: 'menus.dashboard.ecommerce',
          keepAlive: true,
          showTextBadge: 'new'
        }
      }
    ]
  },
  {
    path: '/menu',
    name: 'Menu',
    component: '/index/index',
    meta: {
      title: 'menus.menu.title',
      icon: '&#xe8a4;',
      keepAlive: false
    },
    children: [
      {
        path: 'menu',
        name: 'Menus',
        component: '/menu/Menu',
        meta: {
          title: 'menus.menu.menu',
          icon: '&#xe8a4;',
          keepAlive: true,
          authList: [
            {
              title: '新增',
              auth_mark: 'add'
            },
            {
              title: '编辑',
              auth_mark: 'edit'
            },
            {
              title: '删除',
              auth_mark: 'delete'
            }
          ]
        }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: '/menu/Permission',
        meta: {
          title: 'menus.menu.permission',
          icon: '&#xe831;',
          showTextBadge: 'new',
          keepAlive: true,
          authList: [
            {
              title: '新增',
              auth_mark: 'add'
            },
            {
              title: '编辑',
              auth_mark: 'edit'
            },
            {
              title: '删除',
              auth_mark: 'delete'
            }
          ]
        }
      },
      {
        path: 'nested',
        name: 'Nested',
        component: '',
        meta: {
          title: 'menus.menu.nested',
          icon: '&#xe676;',
          keepAlive: true
        },
        children: [
          {
            path: 'menu1',
            name: 'NestedMenu1',
            component: '/menu/nested/Menu1',
            meta: {
              title: 'menus.menu.menu1',
              icon: '&#xe676;',
              keepAlive: true
            }
          },
          {
            path: 'menu2',
            name: 'NestedMenu2',
            component: '',
            meta: {
              title: 'menus.menu.menu2',
              icon: '&#xe676;',
              keepAlive: true
            },
            children: [
              {
                path: 'menu2-1',
                name: 'NestedMenu2-1',
                component: '/menu/nested/menu2/Menu2-1',
                meta: {
                  title: 'menus.menu.menu21',
                  icon: '&#xe676;',
                  keepAlive: true
                }
              }
            ]
          },
          {
            path: 'menu3',
            name: 'NestedMenu3',
            component: '',
            meta: {
              title: 'menus.menu.menu3',
              icon: '&#xe676;',
              keepAlive: true
            },
            children: [
              {
                path: 'menu3-1',
                name: 'NestedMenu3-1',
                component: '/menu/nested/menu3/Menu3-1',
                meta: {
                  title: 'menus.menu.menu31',
                  icon: '&#xe676;',
                  keepAlive: true
                }
              },
              {
                path: 'menu3-2',
                name: 'NestedMenu3-2',
                component: '',
                meta: {
                  title: 'menus.menu.menu32',
                  icon: '&#xe676;',
                  keepAlive: true
                },
                children: [
                  {
                    path: 'menu3-2-1',
                    name: 'NestedMenu3-2-1',
                    component: '/menu/nested/menu3/menu3-2/Menu3-2-1',
                    meta: {
                      title: 'menus.menu.menu321',
                      icon: '&#xe676;',
                      keepAlive: true
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  // 一级菜单
  {
    name: 'ChangeLog',
    path: '/log/changeLog',
    component: '/log/ChangeLog',
    meta: {
      title: 'menus.plan.log',
      showTextBadge: `v2.2.4`,
      icon: '&#xe712;',
      keepAlive: false,
      isInMainContainer: true
    }
  }
]
