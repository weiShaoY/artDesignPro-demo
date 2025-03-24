import type { WorkTabType } from '@/types/store'

import { router } from '@/router'

import { HOME_PAGE } from '@/router/index'

import { getSysStorage } from '@/utils/storage'

import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useWorkTabStore = defineStore('workTabStore', () => {
  // 状态定义
  const opened = ref<WorkTabType[]>([]) // 已打开的选项卡

  const current = ref<Partial<WorkTabType>>({
  }) // 当前激活的选项卡

  const keepAliveExclude = ref<string[]>([]) // 需要排除缓存的组件名称

  /**
   * 将指定选项卡添加到 keepAlive 排除列表中，只有当该选项卡的 keepAlive 为 true 时才进行添加
   * @param tab 选项卡对象
   */
  const addKeepAliveExclude = (tab: WorkTabType) => {
    if (tab.keepAlive && tab.name && !keepAliveExclude.value.includes(tab.name)) {
      keepAliveExclude.value.push(tab.name)
    }
  }

  /**
   * 将传入的一组选项卡的组件名称标记为排除缓存
   * @param tabs 需要标记的选项卡数组
   */
  const markTabsToRemove = (tabs: WorkTabType[]) => {
    tabs.forEach((tab) => {
      if (tab.name) {
        addKeepAliveExclude(tab)
      }
    })
  }

  // 核心操作函数

  /**
   * 关闭指定的选项卡，并处理激活状态和路由跳转
   * @param path 要关闭的路由路径
   */
  const removeTab = (path: string) => {
    const noCurrentTab = opened.value.find(tab => tab.path === path)

    const index = opened.value.findIndex(tab => tab.path === path)

    if (index === -1) {
      return
    }

    opened.value.splice(index, 1)

    // 若关闭后无选项卡，且关闭的不是首页，则跳转首页
    if (!opened.value.length && path !== HOME_PAGE) {
      router.push(HOME_PAGE)
      return
    }

    // 若关闭的是当前激活标签，则标记其为缓存排除，并激活相邻标签
    if (current.value.path === path) {
      if (current.value.name) {
        addKeepAliveExclude(current.value as WorkTabType)
      }

      const newIndex = index >= opened.value.length ? opened.value.length - 1 : index

      current.value = opened.value[newIndex]
      router.push(current.value.path as string)
    }
    else if (noCurrentTab?.name) {
      addKeepAliveExclude(noCurrentTab)
    }
  }

  /**
   * 关闭当前标签左侧（不包括首页）的所有选项卡
   * @param path 当前选项卡的路由路径
   */
  const removeLeft = (path: string) => {
    const index = opened.value.findIndex(tab => tab.path === path)

    if (index > 1) {
      const tabsToRemove = opened.value.slice(1, index)

      markTabsToRemove(tabsToRemove)
      opened.value.splice(1, index - 1)
    }
  }

  /**
   * 关闭当前标签右侧的所有选项卡
   * @param path 当前选项卡的路由路径
   */
  const removeRight = (path: string) => {
    const index = opened.value.findIndex(tab => tab.path === path)

    if (index !== -1 && index < opened.value.length - 1) {
      const tabsToRemove = opened.value.slice(index + 1)

      markTabsToRemove(tabsToRemove)
      opened.value.splice(index + 1)
    }
  }

  /**
   * 关闭除当前标签和首页外的所有选项卡
   * @param path 当前选项卡的路由路径
   */
  const removeOthers = (path: string) => {
    const tabsToRemove = opened.value.filter(
      tab => tab.path !== path && tab.path !== HOME_PAGE,
    )

    markTabsToRemove(tabsToRemove)
    opened.value = opened.value.filter(tab => tab.path === path || tab.path === HOME_PAGE)
  }

  /**
   * 关闭所有选项卡（当传入的 path 不是首页时关闭全部；首页时只保留首页）
   * @param path 当前选项卡的路由路径
   */
  const removeAll = (path: string) => {
    if (path !== HOME_PAGE) {
      markTabsToRemove(opened.value)
      current.value = {
      }
      opened.value = []
      router.push(HOME_PAGE)
    }
    else {
      const tabsToRemove = opened.value.filter(tab => tab.path !== HOME_PAGE)

      markTabsToRemove(tabsToRemove)
      opened.value = opened.value.filter(tab => tab.path === HOME_PAGE)
      if (opened.value.length === 0) {
        router.push(HOME_PAGE)
      }
    }
  }

  // 辅助函数
  /**
   * 辅助函数：比较两个查询参数是否相等
   * @param query1 第一个查询参数
   * @param query2 第二个查询参数
   * @returns 是否相等
   */
  const areQueriesEqual = (query1: any, query2: any): boolean => {
    return JSON.stringify(query1) === JSON.stringify(query2)
  }

  /**
   * 从 keepAlive 排除列表中移除指定组件名称
   * @param name 路由组件名称
   */
  const removeKeepAliveExclude = (name: string) => {
    keepAliveExclude.value = keepAliveExclude.value.filter(item => item !== name)
  }

  /**
   * 打开或激活一个选项卡
   * @param tab 目标选项卡信息
   */
  const openTab = (tab: WorkTabType): void => {
    removeKeepAliveExclude(tab.name as string)

    const index = opened.value.findIndex(item => item.path === tab.path)

    if (index === -1) {
      opened.value.push({
        ...tab,
      })
    }
    else {
      const existingTab = opened.value[index]

      if (!areQueriesEqual(existingTab.query, tab.query)) {
        opened.value[index] = {
          ...existingTab,
          query: tab.query,
          title: tab.title || existingTab.title,
        }
      }
    }

    current.value = opened.value[index === -1 ? opened.value.length - 1 : index]
  }

  /**
   * 检查第一个选项卡是否为首页，否则清空所有标签并跳转首页
   */
  const checkFirstHomePage = () => {
    if (opened.value.length && opened.value[0].path !== HOME_PAGE) {
      removeAll(HOME_PAGE)
    }
  }

  /**
   * 初始化状态，从系统存储中加载工作台配置
   */
  const initState = () => {
    const sysStorage = getSysStorage()

    if (sysStorage) {
      const sys = JSON.parse(sysStorage)

      const { workTab } = sys.user

      current.value = workTab.current || {
      }
      opened.value = workTab.opened || []
      checkFirstHomePage()
    }
  }

  return {
    opened,
    current,
    keepAliveExclude,
    initState,
    openTab,
    removeTab,
    removeLeft,
    removeRight,
    removeOthers,
    removeAll,
    checkFirstHomePage,
    addKeepAliveExclude,
    removeKeepAliveExclude,
    markTabsToRemove,
  }
})
