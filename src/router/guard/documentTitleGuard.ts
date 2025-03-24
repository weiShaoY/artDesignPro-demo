import type { Router } from 'vue-router'

import { SystemInfo } from '@/config/setting'


/**
 * 创建文档标题守卫
 *
 * @param router - 路由实例
 */
export function createDocumentTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { title } = to.meta

    if (title) {
      setTimeout(() => {
        document.title = `${title} - ${SystemInfo.name}`
      }, 150)
    }
  })
}
