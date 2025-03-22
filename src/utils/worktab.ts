import type { RouteLocationNormalized } from 'vue-router'

import { useWorkTabStore } from '@/store/modules/workTab'

/**
 * 根据当前路由信息设置工作标签页（workTab）
 * @param to 当前路由对象
 */
export function setWorkTab(to: RouteLocationNormalized): void {
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
