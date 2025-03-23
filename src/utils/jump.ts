import type { MenuListType } from '@/types/menu'

import { router } from '@/router'

// 打开外部链接
export function openExternalLink(link: string) {
  window.open(link, '_blank')
}

/**
 * 菜单跳转
 * @param item 菜单项
 * @param jumpToFirst 是否跳转到第一个子菜单
 */
export function handleMenuJump(item: MenuListType, jumpToFirst: boolean = false) {
  // debugger
  console.log('%c Line:17 🥔 item', 'color:#f5ce50', item)

  // 处理外部链接
  const { link, isIframe } = item.meta

  if (link && !isIframe) {
    return openExternalLink(link)
  }

  // 如果不需要跳转到第一个子菜单，或者没有子菜单，直接跳转当前路径
  if (!jumpToFirst || !item.children?.length) {
    return router.push(item.path)
  }

  // 获取第一个可见的子菜单，如果没有则取第一个子菜单
  const firstChild = item.children.find(child => !child.meta.isHide) || item.children[0]

  // 如果第一个子菜单是外部链接 并且不是 iframe，打开外部链接
  if (firstChild.meta?.link && !firstChild.meta.isIframe) {
    return openExternalLink(firstChild.meta.link)
  }

  // 跳转到子菜单路径
  router.push(firstChild.path)
}

// ... existing code ...
