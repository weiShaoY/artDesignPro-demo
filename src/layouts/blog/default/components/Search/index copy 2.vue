<script lang="ts" setup>
import { useMenuStore } from '@/store/modules/menu'

import { blogMittBus } from '@/utils'

import { useSettingStore } from '@/store/modules/setting'

const router = useRouter()

const settingStore = useSettingStore()

const menuList = computed(() => useMenuStore().menuList)

const showSearchDialog = ref(false)

const searchVal = ref()

const searchResult: any = ref([])

const historyMaxLength = 5 // 历史记录最大长度

const historyResult = computed(() => settingStore.searchHistoryList)

const searchInput = ref<HTMLInputElement | null>(null)

function focusInput() {

  setTimeout(() => {

    searchInput.value?.focus()

  }, 100)
}

/**
  *  打开搜索弹窗
  */
function openSearchDialog() {
  showSearchDialog.value = true
  focusInput()
}

/**
  *  按下 command + k
  */
function handleKeydown(event: KeyboardEvent) {

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  const isCommandKey = isMac ? event.metaKey : event.ctrlKey

  if (isCommandKey && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    showSearchDialog.value = true
    focusInput()
  }
}

onMounted(() => {
  blogMittBus.on('openSearchDialog', openSearchDialog)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 模糊查询
function fuzzyQueryList(
  arr: BlogType.MenuListType[],
  val: string
): BlogType.MenuListType[] {
  const lowerVal = val.toLowerCase() // 将查询值转换为小写
  const searchItem = (
    item: BlogType.MenuListType
  ): BlogType.MenuListType | null => {
    // 如果当前项有 isHide: true，直接过滤掉
    if (item.meta.isHide) return null

    // 将 item.meta.title 转换为小写进行比较
    const lowerItemTitle = item.meta.title.toLowerCase()
    // 查找子项并过滤符合条件的子项
    const children = item.children ? fuzzyQueryList(item.children, val) : []

    // 如果子项符合条件或当前项标题包含查询值，返回该项
    if (children.length || lowerItemTitle.includes(lowerVal)) {
      return { ...item, children }
    }

    // 否则过滤掉
    return null
  }

  // 使用 map 和 filter 来优化处理逻辑，排除 null 结果
  return arr
    .map(searchItem)
    .filter((item): item is BlogType.MenuListType => item !== null)
}

function search(val: string) {
  if (val) {
    let list = fuzzyQueryList(menuList.value, val)
    searchResult.value = list.filter((item) => {
      return item.children!.length
    })
  } else {
    searchResult.value = []
  }
}
// 搜索逻辑
const highlightedIndex = ref([0, 0]) // [parentIndex, childIndex]
const historyHIndex = ref(0)


function searchBlur() {
  highlightedIndex.value = [0, 0]
}

// 搜索框键盘向上切换
function highlightPrevious() {
  if (searchVal.value) {
    const [parentIndex, childIndex] = highlightedIndex.value

    if (childIndex > 0) {
      highlightedIndex.value = [parentIndex, childIndex - 1]
    } else if (parentIndex > 0) {
      const previousParent = searchResult.value[parentIndex - 1]
      const newChildIndex =
        previousParent.children.length > 0
          ? previousParent.children.length - 1
          : -1
      highlightedIndex.value = [parentIndex - 1, newChildIndex]
    } else {
      const lastParentIndex = searchResult.value.length - 1
      const lastParent = searchResult.value[lastParentIndex]
      const newChildIndex =
        lastParent.children.length > 0 ? lastParent.children.length - 1 : -1

      highlightedIndex.value = [lastParentIndex, newChildIndex]
    }
  } else {
    historyHIndex.value = (historyHIndex.value - 1 + historyResult.value.length) % historyResult.value.length
  }
}

// 搜索框键盘向下切换
function highlightNext() {
  if (searchVal.value) {
    const [parentIndex, childIndex] = highlightedIndex.value
    const currentParent = searchResult.value[parentIndex]

    const hasMoreChildren = childIndex < currentParent.children.length - 1

    if (hasMoreChildren) {
      highlightedIndex.value = [parentIndex, childIndex + 1]
    } else if (parentIndex < searchResult.value.length - 1) {
      highlightedIndex.value = [parentIndex + 1, 0]
    } else {
      highlightedIndex.value = [0, 0]
    }
  } else {
    historyHIndex.value = (historyHIndex.value + 1) % historyResult.value.length
  }
}
function cleanItem(item: BlogType.MenuListType) {
  delete item.children
  delete item.meta.authList
}

// 添加历史记录
function updateHistory() {
  if (Array.isArray(historyResult.value)) {
    settingStore.setSearchHistoryList(historyResult.value)
  }
}

function addHistory(item: BlogType.MenuListType) {
  const hasItemIndex = historyResult.value.findIndex(
    (historyItem: BlogType.MenuListType) => historyItem.path === item.path
  )

  if (hasItemIndex !== -1) {
    historyResult.value.splice(hasItemIndex, 1) // 如果存在则删除
  } else if (historyResult.value.length >= historyMaxLength) {
    historyResult.value.pop() // 超过最大记录数则删除最后一个
  }

  cleanItem(item)
  historyResult.value.unshift(item) // 添加新的 item 到头部
  updateHistory()
}
function searchGoPage(item: BlogType.MenuListType) {
  showSearchDialog.value = false

  addHistory(item)

  router.push(item.path)
  searchVal.value = ''
  searchResult.value = []
}

// 搜索框键盘回车跳转页面
function selectHighlighted() {
  if (searchVal.value) {
    const [parentIndex, childIndex] = highlightedIndex.value
    if (parentIndex !== -1) {
      const selectedItem =
        childIndex === -1
          ? searchResult.value[parentIndex]
          : searchResult.value[parentIndex].children[childIndex]
      if (selectedItem) {
        searchInput.value?.blur()
        searchGoPage(selectedItem)
      }
    }
  } else {
    if (!searchVal.value && historyResult.value.length === 0) {
      return
    }
    searchGoPage(historyResult.value[historyHIndex.value])
  }
}

const isHighlighted = (parentIndex: number, childIndex?: number) => {
  const [highlightedParentIndex, highlightedChildIndex] = highlightedIndex.value
  return childIndex === undefined
    ? highlightedParentIndex === parentIndex && highlightedChildIndex === -1
    : highlightedParentIndex === parentIndex &&
    highlightedChildIndex === childIndex
}

/**
 *  关闭搜索弹窗
 */
function closeSearchDialog() {
  searchVal.value = ''
  searchResult.value = []
  highlightedIndex.value = [0, 0]
  historyHIndex.value = 0
}
/**
 *  鼠标 hover 高亮
 */
function highlightOnHover (pIndex: number, cIndex: number) {
  highlightedIndex.value = [pIndex, cIndex]
}

</script>

<template>
  <div class="search-widget">
    <el-dialog
      v-model="showSearchDialog"
      :lock-scroll="false"
      :show-close="false"
      modal-class="search-modal"
      width="600"
      @close="closeSearchDialog"
    >
      <el-input
        ref="searchInput"
        v-model.trim="searchVal"
        :prefix-icon="Search"
        placeholder="搜索页面"
        @blur="searchBlur"
        @input="search"
        @keydown.up.prevent="highlightPrevious"
        @keydown.down.prevent="highlightNext"
        @keydown.enter.prevent="selectHighlighted"
      >
        <template #suffix>
          <div class="search-keydown">
            <span>ESC</span>
          </div>
        </template>
      </el-input>

      <div
        v-show="searchResult.length"
        class="result"
      >
        <div
          v-for="(item, pIndex) in searchResult"
          :key="pIndex"
          class="box"
        >
          <div
            v-for="(cItem, cIndex) in item.children"
            :key="cIndex"
            :class="{
              highlighted: isHighlighted(pIndex, cIndex)
            }"
            @click="searchGoPage(cItem)"
            @mouseenter="highlightOnHover(pIndex, cIndex)"
          >
            {{ cItem.meta.title }}
            <i
              v-show="isHighlighted(pIndex, cIndex)"
              class="selected-icon iconfont-sys"
            >&#xe6e6;</i>
          </div>
        </div>
      </div>

      <!-- 搜索历史 -->
      <div
        v-show="!searchVal && searchResult.length === 0 && historyResult.length > 0
          "
        class="history-box"
      >
        <p class="title">搜索历史</p>
        <div class="history-result">
          <div
            v-for="(item, index) in historyResult"
            :key="index"
            :class="{
              highlighted: historyHIndex === index
            }"
            class="box"
            @click="searchGoPage(item)"
            @mouseenter="historyHIndex = index"
          >
            {{ item.meta.title }}
            <i
              class="selected-icon iconfont-sys"
              @click.stop="deleteHistory(index)"
            >&#xe83a;</i>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <div>
            <i class="iconfont-sys">&#xe864;</i>
            <i class="iconfont-sys">&#xe867;</i>
            <span>切换</span>
          </div>
          <div>
            <i class="iconfont-sys">&#xe6e6;</i>
            <span>选择</span>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use './style';
</style>
