import type { Router } from 'vue-router'

import { useTheme } from '@/composables/useTheme'

import { useMenuStore } from '@/store/modules/menu'

import { useSettingStore } from '@/store/modules/setting'

import { setWorkTab } from '@/utils/workTab'

import { blogList } from '../../modules'

// import.meta.env.VITE_ROUTER_BLOG_PATH

/**
 * 为路由数组添加唯一 id
 * @param  routes - 原始路由数组
 * @param  parentId - 父级 id，默认为 0
 * @returns   返回带有 id 的路由数组
 */
function addIdsToRoutes(routes: any, parentId = 0) {
  return routes.map((route: any, index: number) => {
    // 生成当前节点的 id
    const id = parentId * 100 + (index + 1) // 确保 id 唯一且层级清晰

    // 处理子节点
    if (route.children && route.children.length > 0) {
      route.children = addIdsToRoutes(route.children, id)
    }

    // 处理 meta 中的 authList
    if (route.meta?.authList) {
      route.meta.authList = route.meta.authList.map((auth: any, authIndex: number) => ({
        ...auth,
        id: id * 100 + (authIndex + 1), // 为 authList 中的每一项生成唯一 id
      }))
    }

    // 返回带有 id 的新路由对象
    return {
      ...route,
      id,
    }
  })
}

/**
 *  标记是否已经注册动态路由
 */
const isRouteRegistered = ref(false)

/**
 *  创建博客菜单守卫
 */
function createBlogMenuGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 如果没有获取菜单列表
    if (!isRouteRegistered.value) {
      try {
        // 获取菜单列表
        const menuList = addIdsToRoutes(blogList)

        // 设置菜单列表
        useMenuStore().setMenuList(menuList)

        isRouteRegistered.value = true // ✅ 确保只注册一次

        if (to.name === '404') {
          return next()
        }

        if (to.fullPath !== from.fullPath) {
          // ✅ 避免无限循环
          return next({
            ...to,
            replace: true,
          })
        }
      }
      catch (error) {
        console.error('Failed to register routes:', error)
        return next('/500')
      }
    }

    // 防止 `404` 页面无限跳转
    if (to.matched.length === 0 && to.path !== '/404') {
      return next('/404')
    }

    // setWorkTab(to)

    next()
  })
}

// 设置博客工作标签守卫
function createBlogWorkTabGuard(router: Router) {
  router.afterEach((to) => {
    setWorkTab(to)
  })
}

// 创建博客主题守卫
function createBlogThemeGuard(router: Router) {
  router.afterEach((to) => {
    if (to.meta.setTheme) {
      useTheme().switchTheme(useSettingStore().systemThemeType)
    }
  })
}

/**
 * 创建博客模块路由守卫
 * @param router - 路由实例
 */
export function createBlogRouteGuard(router: Router) {
  // 创建博客菜单守卫
  createBlogMenuGuard(router)

  // 设置博客工作标签守卫
  createBlogWorkTabGuard(router)

  // 创建博客主题守卫
  createBlogThemeGuard(router)
}
