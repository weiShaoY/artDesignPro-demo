// 一级菜单
const logRoute: RouterType.BlogRouteRecordRaw = {
  path: 'log/changeLog',
  name: 'ChangeLog',
  component: () => import('@/pages/blog/log/ChangeLog.vue'),
  meta: {
    title: '一级路由模版',
    textBadge: `v2.2.4`,
    keepAlive: false,
    isInMainContainer: true,
    icon: 'blog-menu-creativity',
  },
}

export default logRoute
