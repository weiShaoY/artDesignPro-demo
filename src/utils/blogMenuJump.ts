import { router } from '@/router'

/**
 *  打开外部链接
 */
function openExternalLink(link: string) {
  window.open(link, '_blank')
}

/**
 * 博客模块菜单跳转
 * @param item 菜单项
 * @param jumpToFirst 是否跳转到第一个子菜单
 */
export function blogMenuJump(item: BlogType.MenuListType, jumpToFirst: boolean = false) {
  // 处理外部链接
  const { externalUrl } = item.meta

  if (externalUrl) {
    return openExternalLink(externalUrl)
  }

  // 如果不需要跳转到第一个子菜单，或者没有子菜单，直接跳转当前路径
  if (!jumpToFirst || !item.children?.length) {
    return router.push(item.path)
  }

  // 获取第一个可见的子菜单，如果没有则取第一个子菜单
  const firstChild = item.children.find(child => !child.meta.isHide) || item.children[0]

  // 如果第一个子菜单是外部链接 并且不是 iframe，打开外部链接
  if (firstChild.meta?.externalUrl) {
    return openExternalLink(firstChild.meta.externalUrl)
  }

  // 跳转到子菜单路径
  router.push(firstChild.path)
}
