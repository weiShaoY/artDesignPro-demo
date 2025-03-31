import type { SystemConfig } from './types'

import { createBaseConfig } from './core/base-config'

import { envConfig } from './env/env-config'

// export * from './blog'

// 系统配置
const config: SystemConfig = {
  ...createBaseConfig(),
  ...envConfig,
}

// 冻结对象防止运行时修改
export default Object.freeze(config)
