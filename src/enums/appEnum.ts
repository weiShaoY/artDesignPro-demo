// 系统级别枚举

/**
 * 菜单类型枚举
 * @enum {string}
 */
export enum MenuTypeEnum {

  /** 左侧菜单 */
  LEFT = 'left',

  /** 顶部菜单 */
  TOP = 'top',

  /** 顶部 + 左侧菜单 */
  TOP_LEFT = 'top-left',

  /** 双菜单 */
  DUAL_MENU = 'dual-menu',
}

/**
 * 系统主题枚举
 * @enum {string}
 */
export enum SystemThemeEnum {

  /** 暗黑模式 */
  DARK = 'dark',

  /** 亮色模式 */
  LIGHT = 'light',

  /** 自动模式（跟随系统） */
  AUTO = 'auto',
}

/**
 * 菜单主题枚举
 * @enum {string}
 */
export enum MenuThemeEnum {

  /** 暗黑主题 */
  DARK = 'dark',

  /** 亮色主题 */
  LIGHT = 'light',

  /** 设计主题 */
  DESIGN = 'design',
}

/**
 * 容器宽度枚举
 * @enum {string}
 */
export enum ContainerWidthEnum {

  /** 全屏宽度 */
  FULL = '100%',

  /** 盒子布局（固定宽度） */
  BOXED = '1200px',
}

/**
 * 背景颜色枚举
 * @enum {string}
 */
export enum BgColorEnum {

  /** 主色 */
  PRIMARY = 'bg-primary',

  /** 次要色 */
  SECONDARY = 'bg-secondary',

  /** 警告色 */
  WARNING = 'bg-warning',

  /** 错误色 */
  ERROR = 'bg-error',

  /** 成功色 */
  SUCCESS = 'bg-success',

  /** 危险色 */
  DANGER = 'bg-danger',
}
