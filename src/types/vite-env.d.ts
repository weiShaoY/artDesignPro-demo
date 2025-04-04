// eslint-disable-next-line ts/consistent-type-definitions
interface ImportMeta {
  readonly env: Env.ImportMeta
}

/**
 * 命名空间 Env
 *
 * 用于声明 import.meta 对象的类型
 */
declare namespace Env {

  /**
   * 路由历史模式
   */
  type RouterHistoryMode = 'hash' | 'history' | 'memory'

  /** import.meta 接口 */
  type ImportMeta = {

    /**
     *  应用-端口号
     */
    readonly VITE_APP_PORT: string

    /**
     *  应用-标题
     */
    readonly VITE_APP_TITLE: string

    /**
     *  应用-版本号
     */
    readonly VITE_APP_VERSION: string

    /**
     *  应用-API地址前缀
     */
    readonly VITE_APP_API_URL: string

    /**
     *  Github 地址
     */
    readonly VITE_GITHUB_URL: string

    /**
     *  路由历史模式
     */
    readonly VITE_ROUTER_HISTORY_MODE: RouterHistoryMode

    /**
     *  路由信息是否打开
     */
    readonly VITE_ROUTE_INFO_OPEN: boolean

    /**
     *  路由-根路由默认重定向地址
     */
    readonly VITE_ROUTER_ROOT_REDIRECT_PATH: string

    /**
     *  路由-博客模块路径
     */
    readonly VITE_ROUTER_BLOG_PATH: string

    /**
     *  路由-博客模块首页路径
     */
    readonly VITE_ROUTER_BLOG_HOME_PATH: string

  } & ImportMetaEnv

}
