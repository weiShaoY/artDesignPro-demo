import { defineStore } from 'pinia'
import { MenuListType } from '@/types/menu'

export const useMenuStore = defineStore('menuStore', () => {
  // State
  const menuList = ref<MenuListType[]>([])
  const menuWidth = ref<string>('')

  // Getters
  const getMenuList = computed(() => menuList.value)

  // Actions
  const setMenuList = (list: MenuListType[]) => {
    menuList.value = list
  }

  const setMenuWidth = (width: string) => {
    menuWidth.value = width
  }

  return {
    menuList,
    menuWidth,
    getMenuList,
    setMenuList,
    setMenuWidth
  }
})
