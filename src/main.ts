import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'

import App from './App.vue'

import { registerGlobComp } from './components' // 注册全局组件

import { setupDirectives } from './directives'

import { setupNProgress } from './plugins'

import { initRouter } from './router' // Router

import { initStore } from './store' // Store

import 'default-passive-events'

import '@styles/reset.scss' // 重置HTML样式

import '@styles/app.scss' // 全局样式

import '@styles/pages.scss' // 公共页面样式

import '@styles/el-ui.scss' // 优化element样式

import '@styles/mobile.scss' // 移动端样式优化

import '@styles/change.scss' // 主题切换过渡优化

import '@icons/system/iconfont.js' // 系统彩色图标

import '@icons/system/iconfont.css' // 系统图标

import '@styles/el-light.scss' // Element 自定义主题（亮色）

import '@styles/el-dark.scss' // Element 自定义主题（暗色）

import '@styles/dark.scss' // 系统主题

import '@utils/console.ts' // 控制台输出内容

import '@/themes/index'

async function setupApp() {
  // 设置顶部进度条
  setupNProgress()

  const app = createApp(App)

  initStore(app)
  initRouter(app)
  registerGlobComp(app)

  // 设置指令
  setupDirectives(app)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.mount('#app')
}

// 初始化应用程序
setupApp()
