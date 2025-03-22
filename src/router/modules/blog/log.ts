// 一级菜单
const logRoute: BlogType.AppRouteRecordRaw = {
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
}

export default logRoute
