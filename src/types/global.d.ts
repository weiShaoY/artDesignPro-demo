export {}

declare global {

  /** 全局 Window 对象类型 */
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface Window {

    /** NProgress 实例 */
    NProgress?: import('nprogress').NProgress

    /** MessageBox 实例 */
    $messageBox?: import('element-plus').IElMessageBox

    /** Message 实例 */
    $message?: import('element-plus').Message

    /** Notification 实例 */
    $notification?: import('element-plus').Notify
  }

  /** 项目构建时间 */
  export const BUILD_TIME: string
}
