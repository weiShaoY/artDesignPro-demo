/**
 *  格式化modules模块(将modules模块转化为数组)
 *  @param  _modules - modules模块
 *  @param  result - 格式化后的数组
 */
export function formatModules(_modules: any, result: any[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default

    if (!defaultModule) {
      return
    }

    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]

    moduleList.forEach((route: any) => {
      setRouteDefaultRedirect(route)
    })

    result.push(...moduleList)
  })

  return result
}

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
