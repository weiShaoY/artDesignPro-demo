import type { MenuListType } from '@/types/menu'

import { fourDotsSpinnerSvg } from '@/assets/svgs/loading'

import { asyncRoutes } from '@/router/modules/asyncRoutes'

import { processRoute } from '@/utils/menu'

import { ElLoading } from 'element-plus'

// 菜单接口
export const menuService = {
  // 获取菜单列表，模拟网络请求
  getMenuList(
    delay: number = 300,
  ): Promise<{ menuList: MenuListType[], closeLoading: () => void }> {
    // 获取到的菜单数据
    const menuList = asyncRoutes

    console.log('%c Line:15 🍿 menuList', 'color:#33a5ff', menuList)

    // 处理后的菜单数据
    const processedMenuList: MenuListType[] = menuList.map(route => processRoute(route))

    console.log('%c Line:19 🍑 processedMenuList', 'color:#e41a6a', processedMenuList)

    const loading = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0)',
      svg: fourDotsSpinnerSvg,
      svgViewBox: '0 0 40 40',
    })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          menuList: processedMenuList,
          closeLoading: () => loading.close(),
        })
      }, delay)
    })
  },
}
