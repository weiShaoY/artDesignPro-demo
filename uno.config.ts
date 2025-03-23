import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

/**
 *  @description UnoCSS 配置文件
 */
export default defineConfig({

  /**
   *  @description 定义全局主题设置，供规则或组件之间共享
   */
  theme: {

    /**
     *  @description 主题颜色
     */
    colors: {

      /**
       *  @description 主题色
       */
      primary: '#FEC451',

      /**
       *  @description 红色
       */
      red: '#E43961',

    },

    /**
     *  twind写法的字体配置
     *  @description 字体相关的配置
     */
    // fontFamily: {
    //   /**
    //    *  @description 改良瘦金体
    //    */
    //   gaiLiangShouJinTi: ['gaiLiangShouJinTi', 'sans-serif'],

    // },

  },

  /**
   *  @description 预定义的样式快捷方式，可直接在模板中通过类名使用
   */
  shortcuts: [
    // 宽高 100%
    ['wh-full', 'w-full h-full'],

    // Flex 布局居中
    ['flex-center', 'flex justify-center items-center'],

    // Flex 列布局
    ['flex-col', 'flex flex-col'],

    // 文本溢出显示省略号
    ['text-ellipsis', 'truncate'],
  ],

  /**
   *  @description 自定义生成 CSS 工具的规则，后定义的规则优先级更高
   *  @example /^bc-(.+)$/ 将 `bc-颜色值` 转换为对应的 border-color 样式
   */
  rules: [
    //  将 `bc-颜色值` 转换为对应的 border-color 样式
    [/^bc-(.+)$/, ([, color]) => ({
      'border-color': `#${color}`,
    })],
  ],

  /**
   *  @description UnoCSS 使用的转换器，处理高级指令与变体组合
   */
  transformers: [
    /**
     *  @description 支持 `@apply` 等指令的转换器
     *  @see https://github.com/unocss/unocss#transformer-directives
     */
    transformerDirectives(),

    /**
     *  @description 允许通过逗号分隔的语法同时应用多个变体 例如 hover:(text-red bg-blue)
     *  @see https://github.com/unocss/unocss#transformer-variantgroup
     */
    transformerVariantGroup(),
  ],

  /**
   *  @description UnoCSS 使用的预设
   */
  presets: [
    /**
     *  @description UnoCSS 的核心预设
     *  @see https://github.com/unocss/unocss#preset-uno
     */
    presetUno(),

    /**
     *  @description 属性化预设，允许通过 HTML 属性直接应用样式
     *  @see https://github.com/unocss/unocss#preset-attributify
     */
    presetAttributify(),

    /**
     *  @description 图标预设，支持通过类名插入 SVG 图标
     *  @see https://github.com/unocss/unocss#preset-icons
     */
    presetIcons({
      // /**
      //  *  @description 设置图标的缩放比例
      //  */
      // scale: 1.2,
      /**
       *   @description 开启警告提示
       */
      warn: true,
    }),

    /**
     *  @description 排版预设，提供优化的排版样式
     *  @see https://github.com/unocss/unocss#preset-typography
     */
    presetTypography(),

    /**
     *  @description Google Web Fonts 预设，自动生成 Web 字体相关的 CSS
     *  @see https://github.com/unocss/unocss#preset-webfonts
     */
    presetWebFonts(
      {
        provider: 'none',

        /**
         *  @description 定义字体家族
         */
        fonts: {

          /**
           *  @description 中文字体
           *  @default '改良瘦金体'
           */
          theme: ['gaiLiangShouJinTi', 'Fira Code VF'],

        },
      },
    ),

  ],

})
