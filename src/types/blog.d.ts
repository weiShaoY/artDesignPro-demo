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
    component?: RouteRecordRaw['component'] | (() => Promise<any>)

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
    children?: AppRouteRecordRaw[]
  }

  /**
   *  博客模块菜单列表菜单项类型
   */
  type MenuListType = Omit<AppRouteRecordRaw, 'children'> & {

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
