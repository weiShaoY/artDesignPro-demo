// 创建递归函数处理嵌套路由
/**
 * 处理路由配置,转换为菜单数据结构
 * @param route 路由配置对象
 * @param parentPath 父级路径
 * @returns 处理后的菜单项
 */
export function processRoute(route: BlogType.MenuListType, parentPath = ''): BlogType.MenuListType {
  // 构建完整路径
  const currentPath = route.path
    ? route.meta?.isIframe
      ? route.path // isIframe 为 true 时直接使用原始路径
      : parentPath
        ? `${parentPath}/${route.path}`.replace(/\/+/g, '/') // 规范化路径,避免多余的斜杠
        : route.path
    : ''

  return {
    id: route.id ?? Math.random(), // 使用空值合并运算符
    name: route.name,
    path: currentPath,
    component: route.component,
    meta: route.meta ?? {
    }, // 使用空值合并运算符
    children: Array.isArray(route.children)
      ? route.children.map(child => processRoute(child, currentPath))
      : [],
  }
}

/**
 * 保存 iframe 路由到 sessionStorage 中
 * @param list iframe 路由列表
 */
export function saveIframeRoutes(list: BlogType.MenuListType[]): void {
  if (list.length > 0) {
    sessionStorage.setItem('iframeRoutes', JSON.stringify(list))
  }
}

// 获取 iframe 路由
export function getIframeRoutes() {
  return JSON.parse(sessionStorage.getItem('iframeRoutes') || '[]')
}
