// import type { MenuListType } from '@/types/menu'

import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'

import { fourDotsSpinnerSvg } from '@/assets/svgs/loading'

import { useTheme } from '@/composables/useTheme'

import { BLOG_DEFAULT_LAYOUT, BLOG_IFRAME_LAYOUT } from '@/layouts'

import { useMenuStore } from '@/store/modules/menu'

import { useSettingStore } from '@/store/modules/setting'

import { useWorkTabStore } from '@/store/modules/workTab1'

import { blogRouteList } from '../modules/blog'

/**
 *  博客路由的基础路径
 */
const BLOG_PATH = import.meta.env.VITE_ROUTER_BLOG_PATH

/**
 *  错误页面的路径
 */
const ERROR_PATH = '/500'

/**
 *  未找到页面的路径
 */
const NOT_FOUND_PATH = '/404'

/**
 *  是否已添加博客菜单
 */
const isAddBlogMenu = ref(false)

/**
 * 为路由及其子路由添加唯一ID，并按 meta.order 排序
 * @param routeList - 需要处理的路由列表
 * @param parentId - 父级路由的ID，默认为0
 * @returns 添加了ID并排序后的路由列表
 */
function assignIdsAndSortRoutes(routeList: BlogType.MenuListType[], parentId: number = 0): any[] {
  // 按 meta.order 排序路由列表
  const sortedRouteList = routeList.sort((a, b) => {
    const orderA = a.meta?.order ?? Number.MAX_SAFE_INTEGER // 如果没有 order，则排在后面

    const orderB = b.meta?.order ?? Number.MAX_SAFE_INTEGER // 如果没有 order，则排在后面

    return orderA - orderB // 按 order 升序排序
  })

  return sortedRouteList.map((route, index) => {
    // 生成当前路由的唯一ID，基于父级ID和当前索引
    const id = parentId * 100 + (index + 1)

    // 如果当前路由有子路由，递归处理子路由
    if (route.children?.length) {
      route.children = assignIdsAndSortRoutes(route.children, id)
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

/**
 * 将接口返回的菜单数据转换为 Vue Router 路由对象
 * @param route - 单个菜单项数据
 * @returns 转换后的路由对象
 */
/**
 * 将菜单数据转换为 Vue Router 路由对象
 * @param route - 单个菜单项数据
 * @returns 转换后的路由对象
 */
function convertRouteComponent(route: BlogType.MenuListType): ConvertedRoute {
  const { component, children, ...routeConfig } = route

  // 创建基础路由对象
  const converted: ConvertedRoute = {
    ...routeConfig,
    component, // 默认组件
  }

  try {
    // 处理 iframe 且在主容器内的路由
    if (route.meta.isInMainContainer && route.meta.isIframe) {
      converted.component = BLOG_DEFAULT_LAYOUT
      converted.path = `/${route.path?.split('/')
        .slice(1, 3)
        .join('/')}`
      converted.name = '' // 清空主路径的 name
      converted.children = [
        {
          id: route.id,
          path: route.path,
          name: route.name,
          component: BLOG_IFRAME_LAYOUT,
          meta: route.meta,
        },
      ]
    }

    // 处理主容器内部的路由
    else if (route.meta.isInMainContainer) {
      converted.component = BLOG_DEFAULT_LAYOUT
      converted.path = `/${route.path?.split('/')
        .slice(1, 3)
        .join('/')}`
      converted.name = '' // 清空主路径的 name
      converted.children = [
        {
          id: route.id,
          path: route.path,
          name: route.name,
          component: component as RouteRecordRaw['component'],
          meta: route.meta,
        },
      ]
    }

    // 处理 iframe 类型的路由
    else if (route.meta.isIframe) {
      converted.component = BLOG_IFRAME_LAYOUT
    }

    // 递归处理子路由
    if (children?.length) {
      converted.children = children.map(child => convertRouteComponent(child as BlogType.MenuListType))
    }

    return converted
  }
  catch (error) {
    console.error(`路由转换失败: ${route.name}`, error)
    throw error
  }
}

function handleBlogMenuList(router: Router, delay: number = 300): Promise<{ closeLoading: () => void }> {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0)',
    svg: fourDotsSpinnerSvg,
    svgViewBox: '0 0 40 40',
  })

  const menuList = assignIdsAndSortRoutes(blogRouteList)

  // 设置菜单列表
  useMenuStore().setMenuList(menuList)

  menuList.forEach((route: any) => {
    // 递归处理
    const routeConfig = convertRouteComponent(route)

    router.addRoute(routeConfig as RouteRecordRaw)
  })

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        /**
         *  关闭加载
         */
        closeLoading: () => loading.close(),
      })
    }, delay)
  })
}

/**
 * 处理博客菜单路由的导航守卫逻辑
 * @param to - 目标路由对象
 * @param from - 来源路由对象
 * @param next - 导航控制函数
 */
async function handleBlogMenuGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router,
) {
  // 如果博客菜单未添加
  if (!isAddBlogMenu.value) {
    try {
      try {
        const { closeLoading } = await handleBlogMenuList(router)

        // 标记路由已注册
        isAddBlogMenu.value = true

        closeLoading()
      }
      catch (error) {
        console.error('路由注册失败:', error)
        throw new Error('路由注册失败')
      }

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
  const workTabStore = useWorkTabStore()

  const { meta, path, name, params, query } = to

  if (!meta.isHideTab) {
    workTabStore.openTab({
      title: meta.title as string,
      path,
      name: name as string,
      keepAlive: meta.keepAlive as boolean,
      params,
      query,
    })
  }
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
  router.beforeEach(async (to, from, next) => {
    // 如果目标路径包含博客路径，执行博客菜单守卫逻辑
    if (to.path.includes(BLOG_PATH)) {
      await handleBlogMenuGuard(to, from, next, router)
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
