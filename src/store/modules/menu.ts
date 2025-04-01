import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuStore', () => {
  /**
   *  菜单列表
   */
  const menuList = ref<RouterType.BlogMenuListType[]>([])

  /**
   *  菜单宽度
   */
  const menuWidth = ref<string>('')

  return {
    /**
     *  菜单列表
     */
    menuList,

    /**
     *  菜单宽度
     */
    menuWidth,
  }
})
