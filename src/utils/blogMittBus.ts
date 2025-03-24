/**
 * 全局事件总线，用于全局事件的发布与订阅
 * 用法：
 * blogMittBus.on('event', callback)
 * blogMittBus.emit('event', data)
 */
import mitt from 'mitt'

export const blogMittBus = mitt()
