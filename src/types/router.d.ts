/**
 *  路由类型
 */
declare namespace RouterType {
  import type { Component } from 'vue'

  import type { RouteRecordRaw, RouteRedirect } from 'vue-router'

  /**
   *  路由类型
   */
  type RouteRecordRaw = {

    /**
     * 路由路径，例如 `/home`
     */
    path: string

    /**
     * 路由名称（可选），用于命名路由
     */
    name?: string

    /**
     * 路由对应的组件，可以是直接的 Vue 组件或返回 Promise 的动态导入函数
     */
    component?: Component | (() => Promise<Component>)

    /**
     * 路由重定向，可以是路径字符串、路由对象或函数
     */
    redirect?: RouteRedirect

    /**
     * 路由别名，可以是字符串或字符串数组
     */
    alias?: string | string[]

    /**
     * 子路由配置数组
     */
    children?: RouteRecordRaw[]

    /**
     * 额外的元信息，可以存储权限、标题、缓存等自定义数据
     */
    meta?: Record<string, any>
  }

  /**
   * 博客模块路由类型
   */
  type BlogRouteRecordRaw = {

    /**
     * 路由路径
     */
    path: string

    /**
     * 路由名称（唯一标识）
     */
    name: string

    /**
     * 重定向地址
     */
    redirect?: string

    /**
     * 组件路径的异步导入
     */
    component?: Component | (() => Promise<Component>)

    /**
     * 路由元信息
     */
    meta: {

      /**
       * 菜单显示标题（必填）
       */
      title: string

      /**
       * 菜单图标组件
       */
      icon?: string

      /**
       * 是否在菜单中隐藏
       */
      isHide?: boolean

      /**
       * 是否在标签页中隐藏
       */
      isHideTab?: boolean

      /**
       * 是否缓存组件
       */
      keepAlive: boolean

      /**
       * 是否渲染在主容器内
       */
      isInMainContainer?: boolean

      /**
       * 菜单排序（越小越靠前）
       */
      order?: number

      /**
       * 外链跳转地址
       */
      externalUrl?: string

      /**
       * 内嵌iframe地址
       */
      iframeUrl?: string

      /**
       * 文本徽标内容
       */
      textBadge?: string

      /**
       * 图标徽标组件（优先级高于textBadge）
       */
      iconBadge?: string

      /**
       * 是否显示默认徽标
       */
      showDefaultBadge?: boolean
    }

    /**
     * 子路由配置
     */
    children?: BlogRouteRecordRaw[]
  }

  /**
   *  博客模块菜单列表菜单项类型
   */
  type BlogMenuListType = Omit<BlogRouteRecordRaw, 'children'> & {

    /**
     *  菜单ID
     */
    id: number

    /**
     *  子菜单
     */
    children?: BlogMenuListType[]
  }
}
