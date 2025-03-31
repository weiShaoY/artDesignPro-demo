import { formatModules } from '@/router/utils'

/**
 *  获取当前文件名
 */
const currentFileName = import.meta.url.split('/').pop() || ''

/**
 *  获取同级目录下除当前文件外的所有 .ts 文件
 *  @description  使用 eager: true 同步导入模块并过滤当前文件
 */
const modules = Object.fromEntries(
  Object.entries(
    import.meta.glob('./*.ts', {
      eager: true,
    }),
  ).filter(([path]) => {
    /**
     *  排除当前文件
     */
    return !path.endsWith(`/${currentFileName}`)
  }),
)

/**
 * 博客模块 所有子路由格式化后的数组
 * @constant
 * @description 通过调用 `formatModules` 函数格式化模块化路由，并排除当前文件，以便生成代码模块的子路由列表。
 */
export const blogRouteList = formatModules(modules, []) as BlogType.MenuListType[]
