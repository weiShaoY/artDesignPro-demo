import type { RouteRecordNormalized } from 'vue-router'

/**
 *  格式化modules模块(将modules模块转化为数组)
 *  @param  _modules - modules模块
 *  @param  result - 格式化后的数组
 */
export function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  console.log('%c Line:9 🍪 _modules', 'color:#3f7cff', _modules)

  // 遍历_modules对象的属性
  Object.keys(_modules).forEach((key) => {
    /**
     *  获取当前属性的默认模块
     */
    const defaultModule = _modules[key].default

    // 如果当前模块不存在，则直接返回
    if (!defaultModule) {
      return
    }

    /**
     *  将defaultModule转化为数组
     */
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]

    // 将所有模块添加到result数组中
    result.push(...moduleList)
  })

  /**
   *  返回格式化后的result数组
   */
  return result
}
