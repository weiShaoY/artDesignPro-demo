<!--
 * 表格工具栏组件
 * @description 提供表格的搜索、刷新、列配置等功能
 -->
<script setup lang="ts">
import type { PropType } from 'vue'

import { useCommon } from '@/composables/useCommon'

import {
  Operation,
  RefreshRight,
  Search,
} from '@element-plus/icons-vue'

/**
 * 表格列配置类型
 */
type TableColumn = {
  name: string
  show: boolean
  [key: string]: any
}

/**
 * 组件属性定义
 */
const props = defineProps({
  /** 是否显示顶部搜索区域 */
  showTop: {
    type: Boolean,
    default: true,
  },

  /** 是否显示底部操作区域 */
  showBottom: {
    type: Boolean,
    default: true,
  },

  /** 表格列配置 */
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
    validator: (value: TableColumn[]) => {
      return value.every(col => 'name' in col && 'show' in col)
    },
  },

  /** 布局配置，包含的功能按钮 */
  layout: {
    type: String,
    default: 'search, refresh, column',
    validator: (value: string) => {
      const validOptions = ['search', 'refresh', 'column']

      return value.split(',').every(opt => validOptions.includes(opt.trim()))
    },
  },
})

/**
 * 组件事件定义
 */
const emit = defineEmits<{

  /** 搜索事件 */
  (e: 'search'): void

  /** 重置事件 */
  (e: 'reset'): void

  /** 列配置变化事件 */
  (e: 'changeColumn', columns: TableColumn[]): void
}>()

/**
 * 组件状态
 */
const showSearchWrap = ref(true) // 是否显示搜索区域

const colOptions = ref<string[]>([]) // 列选项

const colSelect = ref<string[]>([]) // 已选择的列

const columnChange = ref(false) // 列配置是否已初始化

/**
 * 生命周期钩子
 */
onMounted(() => {
  showSearchWrap.value = props.showTop
})

/**
 * 刷新页面
 */
function refresh() {
  useCommon().refresh()
}

/**
 * 切换搜索区域显示状态
 */
function toggleSearchWrap() {
  showSearchWrap.value = !showSearchWrap.value
}

/**
 * 初始化列选择器
 */
function initColumnSelector() {
  if (!columnChange.value) {
    const columnNames = props.columns.map(col => col.name)

    colOptions.value = columnNames
    colSelect.value = columnNames
    columnChange.value = true
  }
}

/**
 * 处理列显示状态变化
 * @param show 是否显示该列
 * @param index 列索引
 */
function handleColumnChange(show: boolean, index: number) {
  const updatedColumns = [...props.columns]

  updatedColumns[index].show = show
  emit('changeColumn', updatedColumns)
}

/**
 * 触发搜索事件
 */
function handleSearch() {
  emit('search')
}

/**
 * 触发重置事件
 */
function handleReset() {
  emit('reset')
}
</script>

<template>
  <div
    class="table-bar"
  >
    <!-- 顶部搜索区域 -->
    <div
      v-show="showSearchWrap"
      class="top-wrap"
    >
      <slot
        name="top"
      />

      <div
        class="buttons"
      >
        <el-button
          v-ripple
          type="primary"
          @click="handleSearch"
        >
          搜索
        </el-button>

        <el-button
          v-ripple
          @click="handleReset"
        >
          重置
        </el-button>
      </div>
    </div>

    <!-- 底部操作区域 -->
    <div
      v-if="showBottom"
      class="bottom-wrap"
    >
      <div
        class="left-wrap"
      >
        <slot
          name="bottom"
        />
      </div>

      <div
        class="right-wrap"
      >
        <el-button-group>
          <!-- 搜索切换按钮 -->
          <el-button
            v-if="layout.includes('search')"
            :icon="Search"
            title="显示/隐藏搜索区域"
            @click="toggleSearchWrap"
          />

          <!-- 刷新按钮 -->
          <el-button
            v-if="layout.includes('refresh')"
            :icon="RefreshRight"
            title="刷新数据"
            @click="refresh"
          />

          <!-- 列配置按钮 -->
          <el-popover
            v-if="layout.includes('column')"
            placement="bottom-end"
            width="160"
            trigger="hover"
            @show="initColumnSelector"
          >
            <el-checkbox-group
              v-model="colOptions"
              :min="1"
            >
              <el-checkbox
                v-for="(item, index) in colSelect"
                :key="item"
                :label="item"
                @change="(val) => handleColumnChange(!!val, index)"
              />
            </el-checkbox-group>

            <template
              #reference
            >
              <el-button
                :icon="Operation"
                title="列配置"
              />
            </template>
          </el-popover>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 .table-bar {
  padding: 0 0 20px;

  .top-wrap {
    position: relative;
    transition: height 0.3s;

    .buttons {
      position: absolute;
      right: 0;
      bottom: 20px;
    }
  }

  .bottom-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }
}

.el-button-group {
  display: flex;
  gap: 8px;
}

@media screen and (max-width: $device-phone) {
  .table-bar {
    .top-wrap {
      padding-bottom: 60px;

      .buttons {
        position: static;
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
