import type { Router } from 'vue-router'

/**
 * 创建文档标题守卫
 *
 * @param router - 路由实例
 */
export function createDocumentTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { title } = to.meta

    if (title) {
      const documentTitle = `${title} - ${import.meta.env.VITE_APP_TITLE}`

      useTitle(documentTitle)
    }
  })
}
