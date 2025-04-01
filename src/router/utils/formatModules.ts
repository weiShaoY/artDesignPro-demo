/**
 * 递归设置路由的默认重定向
 */
function setRouteDefaultRedirect(route: any) {
  if (!route.redirect) {
    if (route.children?.length) {
      route.redirect = route.children[0].path
    }

    // 如果是主容器内的路由
    else if (route.meta?.isInMainContainer) {
      route.redirect = route.path
    }
  }

  // 递归处理子路由
  if (route.children?.length) {
    route.children.forEach((child: any) => setRouteDefaultRedirect(child))
  }
}

/**
 * 自动补全博客路由路径（支持数组和对象）
 * @param routes 原始路由配置（单个或数组）
 * @param parentPath 父级路径（内部递归使用）
 * @returns 转换后的完整路径路由配置
 */
function transformBlogRoutes(
  routes: RouterType.BlogRouteRecordRaw | RouterType.BlogRouteRecordRaw[],
  parentPath: string = '',
): RouterType.BlogRouteRecordRaw | RouterType.BlogRouteRecordRaw[] {
  // 处理数组输入
  if (Array.isArray(routes)) {
    return routes.map(route =>
      transformBlogRoutes(route, parentPath) as RouterType.BlogRouteRecordRaw,
    )
  }

  // 处理单个路由对象
  const route = routes

  // 处理当前路径（清理首尾斜杠）
  const cleanPath = route.path.replace(/^\/|\/$/g, '')

  /**
   *  计算完整路径
   */
  const fullPath = parentPath
    ? `${parentPath}/${cleanPath}`
    : `/blog/${cleanPath}`

  /**
   *  确保路径以斜杠开头
   */
  const normalizedPath = fullPath.startsWith('/') ? fullPath : `/${fullPath}`

  // 处理重定向路径（相对路径转绝对路径）
  let normalizedRedirect = route.redirect

  if (typeof route.redirect === 'string') {
    const redirectPath = route.redirect.replace(/^\/|\/$/g, '')

    normalizedRedirect = `${normalizedPath}/${redirectPath}`
  }

  // 递归处理子路由
  const children = route.children?.map(child =>
    transformBlogRoutes(child, normalizedPath) as RouterType.BlogRouteRecordRaw,
  )

  return {
    ...route,
    path: normalizedPath,
    ...(normalizedRedirect
      ? {
          redirect: normalizedRedirect,
        }
      : {
        }),
    ...(children
      ? {
          children,
        }
      : {
        }),
  }
}

/**
 *  格式化modules模块(将modules模块转化为数组)
 *  @param  _modules - modules模块
 *  @param  result - 格式化后的数组
 *  @param  isBlog - 是否是博客模块
 */
export function formatModules(_modules: any, result: any[], isBlog = false) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default

    if (!defaultModule) {
      return
    }

    // 统一转换为数组
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]

    let processedRoutes: RouterType.BlogRouteRecordRaw[] = moduleList

    //  处理博客路由
    if (isBlog) {
      processedRoutes = transformBlogRoutes(moduleList) as RouterType.BlogRouteRecordRaw[]
    }

    // 设置默认重定向
    processedRoutes.forEach((route: any) => {
      setRouteDefaultRedirect(route)
    })

    result.push(...processedRoutes)
  })

  return result
}

// export function formatModules(_modules: any, result: any[]) {
//   // 遍历_modules对象的属性
//   Object.keys(_modules).forEach((key) => {
//     /**
//      *  获取当前属性的默认模块
//      */
//     const defaultModule = _modules[key].default

//     // 如果当前模块不存在，则直接返回
//     if (!defaultModule) {
//       return
//     }

//     /**
//      *  将defaultModule转化为数组
//      */
//     const moduleList = Array.isArray(defaultModule)
//       ? [...defaultModule]
//       : [defaultModule]

//     // 处理每个路由对象
//     moduleList.forEach((route: any) => {
//       // 如果没有重定向
//       if (!route.redirect) {
//         // 如果有子路由，则重定向到子路由的第一个路径
//         if (route.children?.length) {
//           route.redirect = route.children[0].path
//         }

//         // 如果是主容器内的路由，则重定向到自身路径
//         else if (route.meta?.isInMainContainer) {
//           route.redirect = route.path
//         }
//       }
//     })

//     // 将所有模块添加到result数组中
//     result.push(...moduleList)
//   })

//   /**
//    *  返回格式化后的result数组
//    */
//   return result
// }
