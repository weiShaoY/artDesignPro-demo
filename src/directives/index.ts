import type { App } from 'vue'

import { setupHighlightDirective } from './highlight'

import { setupPermissionDirective } from './permission'

import { setupRippleDirective } from './ripple'

/**
 * 注册全局指令
 * @description 集中注册应用中的所有自定义指令
 * @param app Vue应用实例
 */
export function setupDirectives(app: App): void {
  // 注册权限控制指令
  setupPermissionDirective(app)

  // 注册文本高亮指令
  setupHighlightDirective(app)

  // 注册水波纹效果指令
  setupRippleDirective(app)
}

/**
 * 指令类型声明
 * @description 为模板中使用的指令提供类型支持
 */
// declare module '@vue/runtime-core' {
//   type ComponentCustomProperties = {

//     /** 权限控制指令 */
//     vPermission: typeof import('./permission')['vPermission']

//     /** 文本高亮指令 */
//     vHighlight: typeof import('./highlight')['vHighlight']

//     /** 水波纹效果指令 */
//     vRipple: typeof import('./ripple')['vRipple']
//   }
// }
