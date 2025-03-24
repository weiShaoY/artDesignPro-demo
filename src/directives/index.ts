import type { App } from 'vue'

import { setupHighlightDirective } from './highlight'

import { setupPermissionDirective } from './permission'

import { setupRippleDirective } from './ripple'

export function setupDirectives(app: App) {
  setupPermissionDirective(app) // 权限指令
  setupHighlightDirective(app) // 高亮指令
  setupRippleDirective(app) // 水波纹指令
}
