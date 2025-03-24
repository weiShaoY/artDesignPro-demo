<script setup lang="ts">
import { useCeremony } from '@/composables/useCeremony'

import { useTheme } from '@/composables/useTheme'

import {
  SettingThemeList,
  SystemMainColor,
  ThemeList,
} from '@/config/setting'

import {
  ContainerWidthEnum,
  MenuThemeEnum,
  MenuTypeEnum,
  SystemThemeEnum,
} from '@/enums/appEnum'

import { useSettingStore } from '@/store/modules/setting'

import { blogMittBus } from '@/utils'

const props = defineProps([
  /**
   *   是否打开设置抽屉
   */
  'open',
])

const { openFestival, cleanup } = useCeremony()

const { setSystemTheme, setSystemAutoTheme, switchTheme } = useTheme()

// 删除原来的相关方法定义，直接使用从useTheme中导入的方法

const store = useSettingStore()

const showDrawer = ref(false)

const { width } = useWindowSize()

// 记录窗口宽度变化前的菜单类型
const beforeMenuType = ref<MenuTypeEnum>()

const hasChangedMenu = ref(false) // 添加标记来跟踪是否已经改变过菜单

watch(width, (newWidth: number) => {
  if (newWidth < 1000) {
    if (!hasChangedMenu.value) {
      beforeMenuType.value = menuType.value
      setMenuType(MenuTypeEnum.LEFT)
      store.setMenuOpen(false)
      hasChangedMenu.value = true
    }
  }
  else {
    if (hasChangedMenu.value && beforeMenuType.value) {
      setMenuType(beforeMenuType.value)
      store.setMenuOpen(true)
      hasChangedMenu.value = false
    }
  }
})

watch(
  () => props.open,
  (val: boolean) => (showDrawer.value = val),
)

const settingThemeList = SettingThemeList

console.log('%c Line:71 🥐 settingThemeList', 'color:#fca650', settingThemeList)

const menuThemeList = ThemeList

const mainColor = SystemMainColor

const isDark = computed(() => store.isDark)

const currentGlopTheme = computed(() => store.systemThemeType)

const systemThemeMode = computed(() => store.systemThemeMode)

const currentMenuTheme = computed(() => store.menuThemeType)

const systemThemeColor = computed(() => store.systemThemeColor)

const boxBorderMode = computed(() => store.boxBorderMode)

const pageTransition = computed(() => store.pageTransition)

const customRadius = computed(() => store.customRadius)

const menuType = computed(() => store.menuType)

const isLeftMenu = computed(() => store.menuType === MenuTypeEnum.LEFT)

const isTopMenu = computed(() => store.menuType === MenuTypeEnum.TOP)

const isTopLeftMenu = computed(() => store.menuType === MenuTypeEnum.TOP_LEFT)

const isDualMenu = computed(() => store.menuType === MenuTypeEnum.DUAL_MENU)

const watermarkVisible = computed(() => store.watermarkVisible)

const menuOpenWidth = ref(store.menuOpenWidth)

const uniqueOpened = ref(true)

const showMenuButton = ref(true)

const autoClose = ref(true)

const showRefreshButton = ref(true)

const showCrumbs = ref(true)

const showWorkTab = ref(true)

const showLanguage = ref(true)

const showNprogress = ref(true)

const colorWeak = ref(false)

const containerWidth = computed(() => store.containerWidth)

const pageTransitionOps = [
  {
    value: '',
    label: '无动画',
  },
  {
    value: 'fade',
    label: 'fade',
  },
  {
    value: 'slide-right',
    label: 'slide-right',
  },
  {
    value: 'slide-top',
    label: 'slide-top',
  },
  {
    value: 'slide-bottom',
    label: 'slide-bottom',
  },
]

const customRadiusOps = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '0.25',
    label: '0.25',
  },
  {
    value: '0.5',
    label: '0.5',
  },
  {
    value: '0.75',
    label: '0.75',
  },
  {
    value: '1',
    label: '1',
  },
]

const containerWidthList = [
  {
    value: ContainerWidthEnum.FULL,
    label: 'setting.container.list[0]',
    icon: '&#xe694;',
  },
  {
    value: ContainerWidthEnum.BOXED,
    label: 'setting.container.list[1]',
    icon: '&#xe6de;',
  },
]

watch(
  () => store.showWorkTab,
  (e: boolean) => {
    showWorkTab.value = e
  },
)

onMounted(() => {
  blogMittBus.on('openSetting', openSetting)

  initSystemColor()
  listenerSystemTheme()
  initUserSetting()
  initSystemTheme()
  openFestival()
})

onUnmounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQuery.removeEventListener('change', initSystemTheme)
  cleanup()
})

//  如果主题色不在列表中，则设置为列表中的第一个元素
function initSystemColor() {
  if (!SystemMainColor.includes(systemThemeColor.value)) {
    setElementTheme(SystemMainColor[0])
  }
}

function initUserSetting() {
  uniqueOpened.value = store.uniqueOpened
  showMenuButton.value = store.showMenuButton
  autoClose.value = store.autoClose
  showRefreshButton.value = store.showRefreshButton
  showCrumbs.value = store.showCrumbs
  showWorkTab.value = store.showWorkTab
  showLanguage.value = store.showLanguage
  showNprogress.value = store.showNprogress
  colorWeak.value = store.colorWeak
  initColorWeak()
  setBoxMode(true, store.boxBorderMode ? 'border-mode' : 'shadow-mode')
}

function setMenuTheme(theme: MenuThemeEnum) {
  if (isDualMenu.value || isTopMenu.value || isDark.value) {
    return
  }

  store.setMenuTheme(theme)
  isAutoClose()
}

// 监听系统主题变化
function listenerSystemTheme() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQuery.addEventListener('change', initSystemTheme)
}

// 初始化系统主题
function initSystemTheme() {
  if (systemThemeMode.value === SystemThemeEnum.AUTO) {
    setSystemAutoTheme()
  }
  else {
    setSystemTheme(currentGlopTheme.value)
  }
}

function setMenuType(type: MenuTypeEnum) {
  if (type === MenuTypeEnum.LEFT || type === MenuTypeEnum.TOP_LEFT) {
    store.setMenuOpen(true)
  }

  store.setMenuType(type)
  if (type === MenuTypeEnum.DUAL_MENU) {
    store.setMenuTheme(MenuThemeEnum.DESIGN)
    store.setMenuOpen(true)
  }

  isAutoClose()
}

function showWorkTabFunc() {
  store.setWorkTab(!store.showWorkTab)
  isAutoClose()
}

// 自动关闭
function isAutoClose() {
  if (autoClose.value) {
    closeDrawer()
  }
}

// 打开或关闭抽屉
function toggleDrawer(open: boolean) {
  const el = document.getElementsByTagName('body')[0]

  if (open) {
    setTimeout(() => {
      el.setAttribute('class', 'theme-change')
    }, 500)
  }
  else {
    el.removeAttribute('class')
  }
}

function openSetting() {
  showDrawer.value = true
}

function closeDrawer() {
  showDrawer.value = false
}

function switchBoxMode(isInit: boolean = false, type: string) {
  if (
    (type === 'shadow-mode' && boxBorderMode.value === false)
    || (type === 'border-mode' && boxBorderMode.value === true)
  ) {
    return
  }

  setBoxMode(isInit, type)
}

// 设置盒子边框 ｜ 阴影 样式
function setBoxMode(isInit: boolean = false, type: string) {
  setTimeout(() => {
    const el = document.documentElement

    el.setAttribute('data-box-mode', type)

    if (!isInit) {
      store.setBorderMode()
    }
  }, 50)
}

function setPageTransition(transition: string) {
  store.setPageTransition(transition)
  isAutoClose()
}

function setCustomRadius(radius: string) {
  store.setCustomRadius(radius)
  isAutoClose()
}

function setContainerWidth(type: ContainerWidthEnum) {
  store.setContainerWidth(type)
  store.reload()
  isAutoClose()
}

function setUniqueOpened() {
  store.setUniqueOpened()
  isAutoClose()
}

function setButton() {
  store.setButton()
  isAutoClose()
}

function setShowRefreshButton() {
  store.setShowRefreshButton()
  isAutoClose()
}

function setCrumbs() {
  store.setCrumbs()
  isAutoClose()
}

function setLanguage() {
  store.setLanguage()
  isAutoClose()
}

function setNprogress() {
  store.setNprogress()
  isAutoClose()
}

function setAutoClose() {
  store.setAutoClose()
  isAutoClose()
}

function setElementTheme(theme: string) {
  store.setElementTheme(theme)
  store.reload()
  isAutoClose()
}

function setColorWeak() {
  const el = document.getElementsByTagName('html')[0]

  if (colorWeak.value) {
    el.setAttribute('class', 'color-weak')
  }
  else {
    el.removeAttribute('class')
    setSystemTheme(SystemThemeEnum.LIGHT)
  }

  store.setColorWeak()
  isAutoClose()
}

function setWatermarkVisible() {
  store.setWatermarkVisible(!watermarkVisible.value)
  isAutoClose()
}

function setMenuOpenSize() {
  if (menuOpenWidth.value) {
    store.setMenuOpenWidth(menuOpenWidth.value)
    isAutoClose()
  }
}

function initColorWeak() {
  if (colorWeak.value) {
    const el = document.getElementsByTagName('html')[0]

    setTimeout(() => {
      el.setAttribute('class', 'color-weak')
    }, 100)
  }
}

watch(
  () => store.menuOpenWidth,
  (newVal) => {
    menuOpenWidth.value = newVal
  },
)
</script>

<template>
  <div
    class="setting"
  >
    <el-drawer
      v-model="showDrawer"
      size="300px"
      :lock-scroll="false"
      :with-header="false"
      :before-close="closeDrawer"
      modal-class="setting-modal"
      @open="toggleDrawer(true)"
      @close="toggleDrawer(false)"
    >
      <div
        class="drawer-con"
      >
        <div
          class="close-wrap"
        >
          <i
            class="iconfont-sys"
            @click="closeDrawer"
          >&#xe7dc;</i>
        </div>

        <!-- 主题风格 -->
        <p
          class="title"
        >
          主题风格
        </p>

        <div
          class="theme-wrap"
        >
          <div
            v-for="(item, index) in settingThemeList"
            :key="item.theme"
            class="item"
            @click="switchTheme(item.theme)"
          >
            <div
              class="box"
              :class="{ 'is-active': item.theme === systemThemeMode }"
            >
              <div
                :style="{ background: `${item.color[0]}!important` }"
              >
                <div
                  v-for="(cItem, subIndex) in 3"
                  :key="subIndex"
                  :class="`line${subIndex}`"
                  :style="{ background: item.leftLineColor }"
                />
              </div>

              <div
                :style="{ background: index === 2 ? item.color[1] : `${item.color[0]}!important` }"
              >
                <div
                  v-for="(cItem, subIndex) in 3"
                  :key="subIndex"
                  :class="`line${subIndex}`"
                  :style="{ background: item.rightLineColor }"
                />
              </div>
            </div>

            <p
              class="name"
            >
              {{ item.name }}
            </p>

            <div
              v-show="item.theme === systemThemeMode"
              class="active"
            />
          </div>
        </div>

        <!-- 菜单布局 -->
        <div
          v-if="width > 1000"
        >
          <p
            class="title"
            style="margin-top: 30px"
          >
            菜单布局
          </p>

          <div
            class="menu-type"
          >
            <div
              class="menu-type-wrap"
            >
              <!-- 左侧菜单 -->
              <div
                class="item"
              >
                <div
                  class="box bl"
                  :class="{ 'is-active': isLeftMenu }"
                  @click="setMenuType(MenuTypeEnum.LEFT)"
                >
                  <div
                    class="bl-menu"
                  >
                    <div
                      v-for="i in 6"
                      :key="i"
                      class="line"
                    />
                  </div>

                  <div
                    class="bl-content"
                  >
                    <div
                      class="header"
                    />

                    <div
                      class="row1"
                    >
                      <div
                        v-for="i in 2"
                        :key="i"
                      />
                    </div>

                    <div
                      class="row2"
                    />
                  </div>
                </div>

                <span
                  class="name"
                >
                  垂直
                </span>
              </div>
              <!-- 顶部菜单 -->
              <div
                class="item"
              >
                <div
                  class="box bt"
                  :class="{ 'is-active': isTopMenu }"
                  @click="setMenuType(MenuTypeEnum.TOP)"
                >
                  <div
                    class="bt-menu"
                  >
                    <div
                      v-for="i in 6"
                      :key="i"
                      class="line"
                    />
                  </div>

                  <div
                    class="bl-content"
                  >
                    <div
                      class="row1"
                    >
                      <div
                        v-for="i in 2"
                        :key="i"
                      />
                    </div>

                    <div
                      class="row2"
                    />
                  </div>
                </div>

                <span
                  class="name"
                >
                  水平
                </span>
              </div>
              <!-- 混合菜单 -->
              <div
                class="item"
              >
                <div
                  class="box tl"
                  :class="{ 'is-active': isTopLeftMenu }"
                  @click="setMenuType(MenuTypeEnum.TOP_LEFT)"
                >
                  <div
                    class="tl-left"
                  >
                    <div
                      v-for="i in 6"
                      :key="i"
                      class="line"
                    />
                  </div>

                  <div
                    class="tl-right"
                  >
                    <div
                      class="bt-menu"
                    >
                      <div
                        v-for="i in 6"
                        :key="i"
                        class="line"
                      />
                    </div>

                    <div
                      class="bl-content"
                    >
                      <div
                        class="row1"
                      >
                        <div
                          v-for="i in 2"
                          :key="i"
                        />
                      </div>

                      <div
                        class="row2"
                      />
                    </div>
                  </div>
                </div>

                <span
                  class="name"
                >
                  混合
                </span>
              </div>
              <!-- 双列菜单 -->
              <div
                class="item"
                style="padding-right: 7px"
              >
                <div
                  class="box dl"
                  :class="{ 'is-active': isDualMenu }"
                  @click="setMenuType(MenuTypeEnum.DUAL_MENU)"
                >
                  <div
                    class="tl1-left"
                    style="width: 8px !important"
                  >
                    <div
                      v-for="i in 1"
                      :key="i"
                      class="line"
                    />
                  </div>

                  <div
                    class="tl2-left"
                  >
                    <div
                      v-for="i in 6"
                      :key="i"
                      class="line"
                    />
                  </div>

                  <div
                    class="tl-right"
                  >
                    <div
                      class="bt-menu"
                    />

                    <div
                      class="bl-content"
                    >
                      <div
                        class="row1"
                      >
                        <div
                          v-for="i in 2"
                          :key="i"
                        />
                      </div>

                      <div
                        class="row2"
                      />
                    </div>
                  </div>
                </div>

                <span
                  class="name"
                >
                  双列
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 菜单风格 -->
        <p
          class="title"
          style="margin-top: 20px"
        >
          菜单风格
        </p>

        <div
          class="menu-theme-wrap"
        >
          <div>
            <div
              v-for="item in menuThemeList"
              :key="item.theme"
              class="item"
              @click="setMenuTheme(item.theme)"
            >
              <div
                class="box"
                :class="{ 'is-active': item.theme === currentMenuTheme }"
                :style="{
                  cursor: isDualMenu || isTopMenu || isDark ? 'no-drop' : 'pointer',
                }"
              >
                <div
                  class="top"
                  :style="{ background: `${item.tabBarBackground}!important` }"
                />

                <div
                  class="left"
                  :style="{ background: `${item.background}!important` }"
                >
                  <div
                    v-for="(cItem, index) in 3"
                    :key="index"
                    :class="`line${index}`"
                    :style="{ background: item.leftLineColor }"
                  />
                </div>

                <div
                  class="right"
                >
                  <div
                    v-for="(cItem, index) in 3"
                    :key="index"
                    :class="`line${index}`"
                    :style="{ background: item.rightLineColor }"
                  />
                </div>
              </div>

              <div
                v-if="item.theme === currentMenuTheme"
                class="active"
              />
            </div>
          </div>
        </div>

        <!-- 系统主题色 -->
        <p
          class="title"
          style="margin-top: 30px"
        >
          主题色
        </p>

        <div
          class="main-color-wrap"
        >
          <div
            class="offset"
          >
            <div
              v-for="color in mainColor"
              :key="color"
              :style="{ background: `${color} !important` }"
              @click="setElementTheme(color)"
            >
              <i
                v-show="color === systemThemeColor"
                class="iconfont-sys"
              >&#xe616;</i>
            </div>
          </div>
        </div>

        <!-- 盒子样式 -->
        <p
          class="title"
          style="margin-top: 40px"
        >
          盒子样式
        </p>

        <div
          class="box-style"
        >
          <div
            v-if="false"
          >
            {{ boxBorderMode }}
          </div>

          <div
            class="button"
            :class="{ 'is-active': boxBorderMode }"
            @click="switchBoxMode(false, 'border-mode')"
          >
            边框
          </div>

          <div
            class="button"
            :class="{ 'is-active': !boxBorderMode }"
            @click="switchBoxMode(false, 'shadow-mode')"
          >
            阴影
          </div>
        </div>

        <!-- 容器宽度 -->
        <p
          class="title"
          style="margin-top: 50px"
        >
          容器宽度
        </p>

        <div
          class="container-width"
        >
          <div
            v-for="item in containerWidthList"
            :key="item.value"
            class="item"
            :class="{ 'is-active': containerWidth === item.value }"
            @click="setContainerWidth(item.value)"
          >
            <i
              class="iconfont-sys"
              v-html="item.icon"
            />

            <span>{{ item.label }}</span>
          </div>
        </div>

        <!-- 基础配置 -->
        <p
          class="title"
          style="margin-top: 40px"
        >
          接触配置
        </p>

        <div
          class="basic-box"
        >
          <div
            class="item"
          >
            <span>开启多标签栏</span>

            <el-switch
              v-model="showWorkTab"
              @change="showWorkTabFunc"
            />
          </div>

          <div
            class="item"
            style="display: flex"
          >
            <span>边栏开启手风琴模式</span>

            <el-switch
              v-model="uniqueOpened"
              @change="setUniqueOpened"
            />
          </div>

          <div
            class="item"
          >
            <span>显示折叠侧边栏按</span>

            <el-switch
              v-model="showMenuButton"
              @change="setButton"
            />
          </div>

          <div
            class="item"
          >
            <span>显示重载页面按钮</span>

            <el-switch
              v-model="showRefreshButton"
              @change="setShowRefreshButton"
            />
          </div>

          <div
            class="item mobile-hide"
          >
            <span>显示全局面包屑导航</span>

            <el-switch
              v-model="showCrumbs"
              @change="setCrumbs"
            />
          </div>

          <div
            class="item"
          >
            <span>显示多语言选择</span>

            <el-switch
              v-model="showLanguage"
              @change="setLanguage"
            />
          </div>

          <div
            class="item"
          >
            <span>显示顶部进度条</span>

            <el-switch
              v-model="showNprogress"
              @change="setNprogress"
            />
          </div>

          <div
            class="item"
          >
            <span>色弱模式</span>

            <el-switch
              v-model="colorWeak"
              @change="setColorWeak()"
            />
          </div>

          <div
            class="item"
          >
            <span>自动关闭设置中心</span>

            <el-switch
              v-model="autoClose"
              @change="setAutoClose"
            />
          </div>

          <div
            class="item"
          >
            <span>全局水印</span>

            <el-switch
              v-model="watermarkVisible"
              @change="setWatermarkVisible"
            />
          </div>

          <div
            class="item"
            style="display: flex"
          >
            <span>菜单宽度</span>

            <el-input-number
              v-model="menuOpenWidth"
              :min="180"
              :max="320"
              size="default"
              :step="10"
              style="width: 120px"
              controls-position="right"
              @change="setMenuOpenSize"
            />
          </div>

          <div
            class="item"
            style="display: flex"
          >
            <span>页面切换动画</span>

            <el-select
              v-model="pageTransition"
              placeholder="Select"
              size="default"
              style="width: 120px"
              @change="setPageTransition"
            >
              <el-option
                v-for="item in pageTransitionOps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div
            class="item"
            style="display: flex"
          >
            <span>自定义圆角</span>

            <el-select
              v-model="customRadius"
              placeholder="Select"
              size="default"
              style="width: 120px"
              @change="setCustomRadius"
            >
              <el-option
                v-for="item in customRadiusOps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss">
  .setting-modal {
  background: transparent !important;

  .el-drawer {
    // 背景滤镜
    background: rgba($color: #fff, $alpha: 50%) !important;
    box-shadow: 0 0 30px rgb(0 0 0 / 10%) !important;

    @include backdropBlur();
  }
}

.dark {
  .setting-modal {
    .el-drawer {
      background: rgba($color: #000, $alpha: 50%) !important;
    }
  }
}

// 去除滚动条
.el-drawer__body::-webkit-scrollbar {
  width: 0 !important;
}
</style>

<style lang="scss" scoped>
  @use './style';
</style>
