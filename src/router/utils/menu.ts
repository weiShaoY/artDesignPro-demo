import { fourDotsSpinnerSvg } from '@/assets/svg/loading'
import { MenuListType } from '@/types/menu'
import { processRoute } from '@/utils/menu'
import { ElLoading } from 'element-plus'

import { blogList } from '@/router/modules/blog'

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
        id: id * 100 + (authIndex + 1) // 为 authList 中的每一项生成唯一 id
      }))
    }

    // 返回带有 id 的新路由对象
    return {
      ...route,
      id
    }
  })
}

/**
 * 递归遍历菜单列表，在 path 前拼接 `/blog`
 * @param  menuList 菜单列表
 * @returns  处理后 path 添加 博客路径 前缀 的路由数组
 */
function addBlogPathToRoutes(routes: any) {
  return routes.map((item: any) => {
    const newItem = { ...item, path: `${import.meta.env.VITE_ROUTER_BLOG_PATH}${item.path}` }

    // 递归处理子菜单
    if (newItem.children) {
      newItem.children = addBlogPathToRoutes(newItem.children)
    }

    return newItem
  })
}

/**
 *  获取博客菜单列表
 * @param delay - 延迟时间，默认为 300ms
 */
export function getBlogMenuList(
  delay: number = 300
): Promise<{ menuList: MenuListType[]; closeLoading: () => void }> {
  /**
   *  添加id后的菜单
   */
  const menuList = addIdsToRoutes(blogList)

  const newMenuList = addBlogPathToRoutes(menuList)
  // import.meta.env.VITE_ROUTER_BLOG_PATH
  console.log(
    '%c Line:53 🥥 import.meta.env.VITE_ROUTER_BLOG_PATH',
    'color:#e41a6a',
    import.meta.env.VITE_ROUTER_BLOG_PATH
  )

  /**
   *  处理后的菜单
   */
  const processedMenuList: MenuListType[] = newMenuList.map((route: any) => processRoute(route))

  console.log('%c Line:782 🍓 processedMenuList', 'color:#ed9ec7', processedMenuList)

  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0)',
    svg: fourDotsSpinnerSvg,
    svgViewBox: '0 0 40 40'
  })

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        menuList: processedMenuList,
        closeLoading: () => loading.close()
      })
    }, delay)
  })
}
