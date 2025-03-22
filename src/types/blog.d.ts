/**
 *  博客模块类型
 */
declare namespace BlogType {

  /**
   * 路由记录类型
   */
  type AppRouteRecordRaw = {

    /**
     * 路由路径
     */
    path: string

    /**
     * 组件名称
     */
    name: string

    /**
     * 组件路径的异步导入
     */
    component?: RouteRecordRaw['component'] | (() => Promise<any>)

    /**
     *  重定向
     */
    redirect?: string

    /**
     * 路由元信息
     */
    meta: {

      /**
       * 菜单名称
       */
      title: string

      /**
       * 菜单图标
       */
      icon?: string

      /**
       * 是否显示徽标
       */
      showBadge?: boolean

      /**
       * 是否显示文本徽标
       */
      showTextBadge?: string

      /**
       * 是否在菜单中隐藏
       */
      isHide?: boolean

      /**
       * 是否在标签页中隐藏
       */
      isHideTab?: boolean

      /**
       * 外部链接地址
       */
      link?: string

      /**
       * 是否是 iframe 嵌入
       */
      isIframe?: boolean

      /**
       * 是否缓存组件
       */
      keepAlive: boolean

      /**
       * 可操作权限列表
       */
      authList?: any[]

      /**
       * 是否在主容器内
       */
      isInMainContainer?: boolean

      /**
       *  排序
       */
      order?: number
    }

    /**
     * 子路由列表
     */
    children?: AppRouteRecordRaw[]
  }
  type MenuListType = AppRouteRecordRaw & {

    /**
     *  菜单ID
     */
    id: number

    /**
     *  子菜单
     */
    children?: MenuListType[]
  }

}
