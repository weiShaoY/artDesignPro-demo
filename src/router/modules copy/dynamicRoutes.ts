import type { MenuListType } from '@/types/menu'

/**
 * 动态路由处理
 * 根据接口返回的菜单列表注册动态路由
 */
import type { Router, RouteRecordRaw } from 'vue-router'

import { saveIframeRoutes } from '@/utils/menu'

import { RoutesAlias } from './routesAlias'

/**
 * 动态导入 views 目录下所有 .vue 组件
 * 通过 import.meta.glob() 方法批量导入，便于按需加载
 */
const modules: Record<string, () => Promise<any>> = import.meta.glob('../../views/**/*.vue')

/**
 * 根据组件路径动态加载组件
 * @param  componentPath 组件路径（不包含 ../../views 前缀和 .vue 后缀）
 * @param  routeName 当前路由名称（用于错误提示）
 * @returns 组件加载函数
 */
function loadComponent(componentPath: string, routeName: string): () => Promise<any> {
  // 生成完整的组件路径
  const fullPath = `../../views${componentPath}.vue`

  // 从已导入的模块中查找对应的组件
  const module = modules[fullPath]

  // 如果找不到组件，则在控制台报错
  if (!module && componentPath !== '') {
    console.error(`未找到组件：${routeName} ${fullPath}`)
  }

  return module as () => Promise<any>
}

/**
 * 扩展的路由配置类型，继承 Vue Router 的 RouteRecordRaw 类型
 */
type ConvertedRoute = {

  /**
   *  菜单 ID
   */
  id?: number

  /**
   *  子路由列表
   */
  children?: ConvertedRoute[]
  /**
   *  路由组件
   */
  component?: RouteRecordRaw['component'] | (() => Promise<any>)
} & Omit<RouteRecordRaw, 'children'>

/**
 * 处理 iframe 类型的路由
 * @param  converted 转换后的路由配置
 * @param  route 原始菜单数据
 * @param  iframeRoutes iframe 路由列表（用于存储所有 iframe 路由）
 */
function handleIframeRoute(
  converted: ConvertedRoute,
  route: MenuListType,
  iframeRoutes: MenuListType[],
): void {
  // 设定 iframe 路由的 path 规则
  converted.path = `/outside/iframe/${route.name}`
  // 指定统一的 iframe 组件
  converted.component = () => import('@/views/outside/Iframe.vue')

  // 将当前 iframe 路由存入 iframeRoutes 供后续处理
  iframeRoutes.push(route)
}

/**
 * 处理一级菜单的布局路由
 * @param  converted 转换后的路由配置
 * @param  route 原始菜单数据
 * @param  component 组件路径
 */
function handleLayoutRoute(
  converted: ConvertedRoute,
  route: MenuListType,
  component: string | undefined,
): void {
  // 设置主布局组件
  converted.component = () => import('@/views/index/index.vue')

  // 获取路径的第一级作为主路由路径
  converted.path = `/${(route.path?.split('/')[1] || '').trim()}`

  // 清空主路由的 name，避免冲突
  converted.name = ''

  // 配置子路由
  converted.children = [
    {
      id: route.id,
      path: route.path,
      name: route.name,
      component: loadComponent(component as string, route.name),
      meta: route.meta,
    },
  ]
}

/**
 * 处理普通路由
 * @param  converted 转换后的路由配置
 * @param  component 组件路径
 * @param  routeName 路由名称
 */
function handleNormalRoute(converted: any, component: string | undefined, routeName: string): void {
  if (component) {
    // 从别名映射中查找组件或动态加载
    converted.component
      = RoutesAlias[component as keyof typeof RoutesAlias]
        || loadComponent(component as string, routeName)
  }
}

/**
 * 转换菜单数据为 Vue Router 兼容的路由对象
 * @param  route 菜单数据
 * @param  iframeRoutes 用于存储 iframe 类型路由的列表
 * @returns  转换后的路由对象
 */
function convertRouteComponent(route: MenuListType, iframeRoutes: MenuListType[]): ConvertedRoute {
  const { component, children, ...routeConfig } = route

  // 创建基础路由对象
  const converted: ConvertedRoute = {
    ...routeConfig,
    component: undefined,
  }

  try {
    if (route.meta.isIframe) {
      handleIframeRoute(converted, route, iframeRoutes)
    }
    else if (route.meta.isInMainContainer) {
      handleLayoutRoute(converted, route, component)
    }
    else {
      handleNormalRoute(converted, component, route.name)
    }

    // 递归转换子路由
    if (children?.length) {
      converted.children = children.map(child => convertRouteComponent(child, iframeRoutes))
    }

    return converted
  }
  catch (error) {
    console.error(`路由转换失败: ${route.name}`, error)
    throw error
  }
}

/**
 * 注册异步路由
 * @param  router Vue Router 实例
 * @param  menuList 接口返回的菜单列表
 */
export function registerAsyncRoutes(router: Router, menuList: MenuListType[]): void {
  // 用于收集 iframe 类型路由
  const iframeRoutes: MenuListType[] = []

  // 遍历菜单列表，逐个注册路由
  menuList.forEach((route) => {
    if (route.name && !router.hasRoute(route.name)) {
      // 转换路由配置
      const routeConfig = convertRouteComponent(route, iframeRoutes)

      console.log('%c Line:165 🍒 routeConfig', 'color:#ed9ec7', routeConfig)

      // 动态添加路由
      router.addRoute(routeConfig as RouteRecordRaw)
    }
  })

  // 保存 iframe 类型的路由，方便管理
  saveIframeRoutes(iframeRoutes)
}
