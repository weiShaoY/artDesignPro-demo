import type { Router } from 'vue-router'

import { useSettingStore } from '@/store/modules/setting'
import { RouteLocationNormalized } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { formatMenuTitle } from '@/utils/menu'
import { SystemInfo } from '@/config/setting'
import { setWorkTab } from '@/utils/workTab'
import { useMenuStore } from '@/store/modules/menu'
import { getMenuList } from './getMenuList'
import { registerAsyncRoutes } from '../modules/dynamicRoutes'

/**
 * 创建进度条守卫
 *
 * @param router - 路由实例
 */
function createProgressGuard(router: Router) {
  // 在路由开始前启动进度条
  router.beforeEach((_to, _from, next) => {
    window.NProgress?.start?.()
    next()
  })

  // 在路由结束后完成进度条
  router.afterEach(() => {
    window.NProgress?.done?.()
  })
}

/**
 * 创建文档标题守卫
 *
 * @param router - 路由实例
 */
function createDocumentTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { title } = to.meta
    if (title) {
      setTimeout(() => {
        document.title = `${formatMenuTitle(String(title))} - ${SystemInfo.name}`
      }, 150)
    }
  })
}

/**
 *  标记是否已经注册动态路由
 */
const isRouteRegistered = ref(false)
/**
 * 创建路由守卫
 * @param router - 路由实例
 */
function createRouteGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 设置登录注册页面主题
    setSystemTheme(to)

    if (!isRouteRegistered.value) {
      try {
        await getMenuData(router)
        if (to.name === 'Exception404') {
          return next({ path: to.path, query: to.query, replace: true })
        } else {
          return next({ ...to, replace: true })
        }
      } catch (error) {
        console.error('Failed to register routes:', error)
        return next('/exception/500')
      }
    }

    // 检查路由是否存在，若不存在则跳转至404页面
    if (to.matched.length === 0) {
      return next('/exception/404')
    }

    // 设置工作标签页和页面标题
    setWorkTab(to)

    next()
  })
}
/**
 * 根据路由元信息设置系统主题
 * @param to 当前路由对象
 */
const setSystemTheme = (to: RouteLocationNormalized): void => {
  if (to.meta.setTheme) {
    useTheme().switchTheme(useSettingStore().systemThemeType)
  }
}
/**
 * 创建路由守卫
 *
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  // 创建进度条守卫
  createProgressGuard(router)

  // 创建路由守卫
  createRouteGuard(router)

  // 创建文档标题守卫
  createDocumentTitleGuard(router)
}

/**
 * 根据接口返回的菜单列表注册动态路由
 * @throws 若菜单列表为空或获取失败则抛出错误
 */
async function getMenuData(router: any): Promise<void> {
  try {
    // 获取菜单列表
    const { menuList, closeLoading } = await getMenuList()
    console.log('%c Line:129 🍅 menuList', 'color:#e41a6a', menuList)

    // 设置菜单列表
    useMenuStore().setMenuList(menuList as [])

    // 注册异步路由
    registerAsyncRoutes(router, menuList)
    // 标记路由已注册
    isRouteRegistered.value = true

    // 关闭加载动画
    closeLoading()
  } catch (error) {
    console.error('获取菜单列表失败:', error)
    throw error
  }
}
