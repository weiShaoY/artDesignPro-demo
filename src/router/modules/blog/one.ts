const oneRoute: BlogType.AppRouteRecordRaw = {
  path: 'one/iframe',
  name: 'oneIframe',
  meta: {
    title: '一级路由并嵌套iframe模板',
    icon: 'blog-menu-creativity',
    keepAlive: false,
    isInMainContainer: true,
    iframeUrl: 'https://element-plus.org/zh-CN/component/overview.html',
    order: 1,
  },
}

export default oneRoute
