import type { App } from 'vue'

import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const store = createPinia()

store.use(piniaPluginPersistedstate)

export function initStore(app: App<Element>) {
  app.use(store)
}

export * from './modules/setting'

export * from './modules/workTab'
