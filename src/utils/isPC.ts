/**
 * 检查当前设备是否为 PC
 *
 * @returns 如果是 PC 返回 true，否则返回 false
 */
export function isPC(): boolean {
  /** 移动设备的用户代理标识 */
  const agents = ['Android', 'iPhone', 'webOS', 'BlackBerry', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']

  /** 检查用户代理是否包含移动设备标识 */
  const isMobile = agents.some(agent => window.navigator.userAgent.includes(agent))

  return !isMobile
}
