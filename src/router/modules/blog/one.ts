const oneRoute: BlogType.AppRouteRecordRaw = {
  path: '/blog/one/iframe',
  name: 'oneIframe',
  meta: {
    title: '一级路由并嵌套iframe',
    icon: 'blog-menu-creativity',
    keepAlive: false,
    isIframe: true,
    isInMainContainer: true,
    link: 'https://element-plus.org/zh-CN/component/overview.html',
    order: 1,
  },
}

export default oneRoute
