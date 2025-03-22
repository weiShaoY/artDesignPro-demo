import type { MenuListType } from '@/types/menu'

import { fourDotsSpinnerSvg } from '@/assets/svg/loading'

import { blogRouteList } from '@/router/modules/blog'

import { useMenuStore } from '@/store/modules/menu'

import { processRoute } from '@/utils/menu'

import { ElLoading } from 'element-plus'

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
 *  获取博客菜单列表
 */
export function getBlogMenuList(
  blogList: any[],
) {
  /**
   *  添加id后的菜单
   */
  const menuList = addIdsToRoutes(blogList)

  return menuList

  // import.meta.env.VITE_ROUTER_BLOG_PATH

  /**
   *  处理后的菜单
   */
  // const processedMenuList: MenuListType[] = newMenuList.map((route: any) => processRoute(route))

  // console.log('%c Line:782 🍓 processedMenuList', 'color:#ed9ec7', processedMenuList)

  // const loading = ElLoading.service({
  //   lock: true,
  //   background: 'rgba(0, 0, 0, 0)',
  //   svg: fourDotsSpinnerSvg,
  //   svgViewBox: '0 0 40 40',
  // })

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       menuList: processedMenuList,
  //       closeLoading: () => loading.close(),
  //     })
  //   }, delay)
  // })
}
