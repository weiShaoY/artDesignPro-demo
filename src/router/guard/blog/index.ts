import type { MenuListType } from '@/types/menu'

import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'

import { useTheme } from '@/composables/useTheme'

import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

import { useMenuStore } from '@/store/modules/menu'

import { useSettingStore } from '@/store/modules/setting'

import { setWorkTab } from '@/utils/workTab'

import { blogRouteList } from '../../modules/blog'

// 从环境变量中获取博客路由的基础路径
const BLOG_PATH = import.meta.env.VITE_ROUTER_BLOG_PATH

// 定义错误页面和404页面的路径常量
const ERROR_PATH = '/500'

const NOT_FOUND_PATH = '/404'

/**
 *  是否已添加博客菜单
 */
const isAddBlogMenu = ref(false)

/**
 * 为路由及其子路由添加唯一ID
 * @param routeList - 需要处理的路由列表
 * @param parentId - 父级路由的ID，默认为0
 * @returns 添加了ID的路由列表
 */
function addIdsToRoutes(routeList: any[], parentId: number = 0): any[] {
  return routeList.map((route, index) => {
    // 生成当前路由的唯一ID，基于父级ID和当前索引
    const id = parentId * 100 + (index + 1)

    // 如果当前路由有子路由，递归处理子路由
    if (route.children?.length) {
      route.children = addIdsToRoutes(route.children, id)
    }

    // 如果当前路由有权限列表，为每个权限项添加唯一ID
    if (route.meta?.authList) {
      route.meta.authList = route.meta.authList.map((auth: any, authIndex: number) => ({
        ...auth,
        id: id * 100 + (authIndex + 1),
      }))
    }

    // 返回处理后的路由对象
    return {
      ...route,
      id,
    }
  })
}

/**
 * 定义转换后的路由类型，继承 Vue Router 路由类型并扩展 id
 */
type ConvertedRoute = {
  id?: number
  children?: ConvertedRoute[]
  component?: RouteRecordRaw['component'] | (() => Promise<any>)
} & Omit<RouteRecordRaw, 'children'>

function processRouter(route: MenuListType, iframeRoutes: MenuListType[]) {
  const { component, children, ...routeConfig } = route

  /**
   *  创建基础路由对象
   */
  const converted: ConvertedRoute = {
    ...routeConfig,
    // 默认组件为空，稍后处理
    component,
  }

  try {
    // 处理 iframe 类型的路由
    if (route.meta.isIframe) {
      console.log('%c Line:91 🍔 route', 'color:#4fff4B', route)

      // 统一 iframe 路由路径前缀
      // converted.path = `/blog/outside/iframe/${route.name}`

      // 指定 iframe 组件
      converted.component = () => import('@/pages/blog/outside/iframe/index.vue')

      // converted.meta = route.meta

      console.log('%c Line:99 🥚 converted', 'color:#ed9ec7', converted)

      // 将该路由存入 iframe 路由集合
      iframeRoutes.push(route)
    }

    // 处理主容器内部的路由
    else if (route.meta.isInMainContainer) {
      /**
       *  保存原始组件
       */
      const originalComponent = converted.component

      converted.component = () => import('@/layouts/blog/default/index.vue')

      converted.path = `/${route.path?.split('/')
        .slice(1, 3)
        .join('/')}`

      // 清空主路径的 name，避免冲突
      converted.name = ''

      // 定义子路由
      converted.children = [
        {
          id: route.id,
          path: route.path,
          name: route.name,
          component: originalComponent,
          meta: route.meta,
        },
      ]
    }

    // 递归处理子路由
    if (children?.length) {
      converted.children = children.map(child => processRouter(child, iframeRoutes))
    }

    return converted
  }
  catch (error) {
    console.error(`路由转换失败: ${route.name}`, error)
    throw error
  }
}

/**
 * 注册博客路由
 * @throws 如果路由注册失败，抛出错误
 */
function addBlogMenu(router: Router): void {
  try {
    const menuList = addIdsToRoutes(blogRouteList)

    // 设置菜单列表
    useMenuStore().setMenuList(menuList)

    // 用于存储 iframe 类型的路由
    const iframeRoutes: MenuListType[] = []

    menuList.forEach((route: any) => {
      // 递归处理
      const routeConfig = processRouter(route, iframeRoutes)

      console.log('%c Line:164 🧀 routeConfig', 'color:#6ec1c2', routeConfig)

      router.addRoute(routeConfig as RouteRecordRaw)
    })

    // /////////////////////////////

    // 处理 iframe 逻辑

    // 标记路由已注册
    isAddBlogMenu.value = true
  }
  catch (error) {
    console.error('路由注册失败:', error)
    throw new Error('路由注册失败')
  }
}

/**
 * 处理博客菜单路由的导航守卫逻辑
 * @param to - 目标路由对象
 * @param from - 来源路由对象
 * @param next - 导航控制函数
 */
function handleBlogMenuGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router,
): void {
  // 如果博客菜单未添加
  if (!isAddBlogMenu.value) {
    try {
      addBlogMenu(router)

      // 如果目标路由是404，直接放行
      if (to.name === '404') {
        return next()
      }

      // 如果目标路由和来源路由的路径不同，替换当前路由
      if (to.fullPath !== from.fullPath) {
        return next({
          ...to,
          replace: true,
        })
      }
    }
    catch {
      // 如果注册失败，跳转到错误页面
      return next(ERROR_PATH)
    }
  }

  // 如果目标路由未匹配到任何路由，且不是404页面，跳转到404页面
  if (!to.matched.length && to.path !== NOT_FOUND_PATH) {
    return next(NOT_FOUND_PATH)
  }

  // 否则，放行
  next()
}

/**
 * 处理博客工作标签的逻辑
 * @param to - 目标路由对象
 */
function handleBlogWorkTabGuard(to: RouteLocationNormalized): void {
  console.log('%c Line:234 🎂 to', 'color:#465975', to)

  // 设置工作标签
  setWorkTab(to)
}

/**
 * 处理博客主题切换的逻辑
 * @param to - 目标路由对象
 */
function handleBlogThemeGuard(to: RouteLocationNormalized): void {
  // 如果目标路由需要设置主题，切换主题
  if (to.meta.setTheme) {
    useTheme().switchTheme(useSettingStore().systemThemeType)
  }
}

/**
 * 创建博客路由守卫
 * @param router - Vue Router 实例
 */
export function createBlogRouteGuard(router: Router): void {
  // 全局前置守卫
  router.beforeEach((to, from, next) => {
    // 如果目标路径包含博客路径，执行博客菜单守卫逻辑
    if (to.path.includes(BLOG_PATH)) {
      handleBlogMenuGuard(to, from, next, router)
    }
    else {
      // 否则，直接放行
      next()
    }
  })

  // 全局后置守卫
  router.afterEach((to) => {
    // 如果目标路径包含博客路径，执行工作标签和主题守卫逻辑
    if (to.path.includes(BLOG_PATH)) {
      handleBlogWorkTabGuard(to)
      handleBlogThemeGuard(to)
    }
  })
}
