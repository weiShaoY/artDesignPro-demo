/**
 * 错误信息显示模式
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

/**
 * 请求配置选项
 */
export type RequestOptions = {

  /**
   * 是否将参数拼接到URL
   */
  joinParamsToUrl?: boolean

  /**
   * 是否格式化日期
   */
  formatDate?: boolean

  /**
   * 是否转换响应数据
   */
  isTransformResponse?: boolean

  /**
   * 是否返回原生响应
   */
  isReturnNativeResponse?: boolean

  /**
   * 是否拼接前缀
   */
  joinPrefix?: boolean

  /**
   * 自定义API地址
   */
  apiUrl?: string

  /**
   * 错误信息显示模式
   */
  errorMessageMode?: ErrorMessageMode

  /**
   * 是否加入时间戳
   */
  joinTime?: boolean

  /**
   * 是否忽略取消令牌
   */
  ignoreCancelToken?: boolean

  /**
   * 是否携带token
   */
  withToken?: boolean
}

/**
 * 基础接口返回数据结构
 */
export type BaseResult<T = any> = {

  /**
   * 状态码
   */
  code: number

  /**
   * 消息提示
   */
  message: string

  /**
   * 返回数据
   */
  data: T

  /**
   * 可选token字段
   */
  token?: string
}

/**
 * 分页数据结构（继承基础结果结构）
 */
export type PaginationResult<T> = {

  /**
   * 当前页码
   */
  currentPage: number

  /**
   * 每页数据量
   */
  pageSize: number

  /**
   * 总页数
   */
  lastPage: number

  /**
   * 总数据量
   */
  total: number

  /**
   * 分页数据
   */
  data: T
} & BaseResult
