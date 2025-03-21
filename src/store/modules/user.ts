import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LanguageEnum } from '@/enums/appEnum'
import { router } from '@/router'
import { UserInfo } from '@/types/store'
import { useSettingStore } from './setting'
import { useWorktabStore } from './worktab'
import { getSysStorage } from '@/utils/storage'
import { MenuListType } from '@/types/menu'

// interface UserState {
//   language: LanguageEnum // 语言
//   isLogin: boolean // 是否登录
//   isLock: boolean // 是否锁屏
//   lockPassword: string // 锁屏密码
//   info: Partial<UserInfo> // 用户信息
//   searchHistory: MenuListType[] // 搜索历史
//   accessToken: string // 访问令牌
//   refreshToken: string // 刷新令牌
// }

export const useUserStore = defineStore('userStore', () => {
  // State
  const language = ref<LanguageEnum>(LanguageEnum.ZH)
  const isLogin = ref<boolean>(false)
  const isLock = ref<boolean>(false)
  const lockPassword = ref<string>('')
  const info = ref<Partial<UserInfo>>({})
  const searchHistory = ref<MenuListType[]>([])
  const accessToken = ref<string>('')
  const refreshToken = ref<string>('')

  // Getters
  const getUserInfo = computed(() => info.value)
  const getSettingState = computed(() => useSettingStore().$state)
  const getWorktabState = computed(() => useWorktabStore().$state)

  // Actions
  const initState = () => {
    const sys = getSysStorage()
    if (sys) {
      const parsedSys = JSON.parse(sys)
      const {
        info: sysInfo,
        isLogin: sysIsLogin,
        language: sysLanguage,
        searchHistory: sysSearchHistory,
        isLock: sysIsLock,
        lockPassword: sysLockPassword,
        refreshToken: sysRefreshToken
      } = parsedSys.user

      info.value = sysInfo || {}
      isLogin.value = sysIsLogin || false
      isLock.value = sysIsLock || false
      language.value = sysLanguage || LanguageEnum.ZH
      searchHistory.value = sysSearchHistory || []
      lockPassword.value = sysLockPassword || ''
      refreshToken.value = sysRefreshToken || ''
      accessToken.value = sessionStorage.getItem('accessToken') || ''
    }
  }

  const saveUserData = () => {
    saveStoreStorage({
      user: {
        info: info.value,
        isLogin: isLogin.value,
        language: language.value,
        isLock: isLock.value,
        lockPassword: lockPassword.value,
        searchHistory: searchHistory.value,
        refreshToken: refreshToken.value,
        worktab: getWorktabState.value,
        setting: getSettingState.value
      }
    })
  }

  const setUserInfo = (newInfo: UserInfo) => {
    info.value = newInfo
  }

  const setLoginStatus = (loginStatus: boolean) => {
    isLogin.value = loginStatus
  }

  const setLanguage = (lang: LanguageEnum) => {
    language.value = lang
  }

  const setSearchHistory = (list: MenuListType[]) => {
    searchHistory.value = list
  }

  const setLockStatus = (lockStatus: boolean) => {
    isLock.value = lockStatus
  }

  const setLockPassword = (password: string) => {
    lockPassword.value = password
  }

  const setToken = (newAccessToken: string, newRefreshToken?: string) => {
    accessToken.value = newAccessToken
    if (newRefreshToken) {
      refreshToken.value = newRefreshToken
    }
    sessionStorage.setItem('accessToken', newAccessToken)
    saveUserData()
  }

  const logOut = () => {
    setTimeout(() => {
      info.value = {}
      isLogin.value = false
      isLock.value = false
      lockPassword.value = ''
      accessToken.value = ''
      refreshToken.value = ''
      sessionStorage.removeItem('accessToken')
      useWorktabStore().opened = []
      saveUserData()
      sessionStorage.removeItem('iframeRoutes')
      router.push('/login')
    }, 300)
  }

  return {
    language,
    isLogin,
    isLock,
    lockPassword,
    info,
    searchHistory,
    accessToken,
    refreshToken,
    getUserInfo,
    getSettingState,
    getWorktabState,
    initState,
    saveUserData,
    setUserInfo,
    setLoginStatus,
    setLanguage,
    setSearchHistory,
    setLockStatus,
    setLockPassword,
    setToken,
    logOut
  }
})

// 初始化版本信息
function initVersion(version: string) {
  const vs = localStorage.getItem('version')
  if (!vs) {
    localStorage.setItem('version', version)
  }
}

// 数据持久化存储
function saveStoreStorage<T>(newData: T) {
  const version = import.meta.env.VITE_VERSION
  initVersion(version)
  const vs = localStorage.getItem('version') || version
  const storedData = JSON.parse(localStorage.getItem(`sys-v${vs}`) || '{}')

  // 合并新数据与现有数据
  const mergedData = { ...storedData, ...newData }
  localStorage.setItem(`sys-v${vs}`, JSON.stringify(mergedData))
}
