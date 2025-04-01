/**
 *  工作台路由
 */
const workbenchRoute: RouterType.BlogRouteRecordRaw = {
  path: 'workbench/index',
  name: 'Workbench',
  component: () => import('@/pages/blog/workbench/index.vue'),
  meta: {
    title: '工作台',
    icon: 'blog-menu-workbench',
    isInMainContainer: true,
    keepAlive: false,
    order: 0,
  },
}

export default workbenchRoute
