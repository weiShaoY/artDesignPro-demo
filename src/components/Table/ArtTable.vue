<!--
 * 增强表格组件
 * @description 基于Element Plus表格的封装，支持分页、选择、序号等功能
 * @example
 * <ArtTable :data="tableData" :columns="columns" pagination>
 *   <el-table-column prop="name" label="姓名" />
 * </ArtTable>
 -->
<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus'

/**
 * 表格组件属性定义
 */
type TableProps = {

  /** 表格数据源 */
  data?: any[]

  /** 是否显示加载状态 */
  loading?: boolean

  /** 行数据的Key，用于标识每一行数据 */
  rowKey?: string

  /** 是否显示边框 */
  border?: boolean

  /** 是否使用斑马纹样式 */
  stripe?: boolean

  /** 是否显示多选列 */
  selection?: boolean

  /** 是否显示序号列 */
  index?: boolean

  /** 表格高度，可以是数字或CSS值 */
  height?: string | number

  /** 表格最大高度，可以是数字或CSS值 */
  maxHeight?: string | number

  /** 是否显示表头 */
  showHeader?: boolean

  /** 是否高亮当前行 */
  highlightCurrentRow?: boolean

  /** 空数据时显示的文本 */
  emptyText?: string

  /** 是否显示分页 */
  pagination?: boolean

  /** 总条目数 */
  total?: number

  /** 当前页码 */
  currentPage?: number

  /** 每页显示条目个数 */
  pageSize?: number

  /** 每页显示个数选择器的选项列表 */
  pageSizes?: number[]

  /** 只有一页时是否隐藏分页器 */
  hideOnSinglePage?: boolean

  /** 分页器的对齐方式 */
  paginationAlign?: 'left' | 'center' | 'right'

  /** 分页器的大小 */
  paginationSize?: 'small' | 'default' | 'large'

  /** 分页器的布局 */
  paginationLayout?: string

  /** 是否显示表头背景色 */
  showHeaderBackground?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  loading: false,
  rowKey: 'id',
  border: false,
  stripe: false,
  selection: false,
  index: false,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: '暂无数据',
  pagination: true,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  hideOnSinglePage: true,
  pageSizes: () => [10, 20, 30, 50],
  paginationAlign: 'center',
  paginationSize: 'default',
  paginationLayout: 'total, sizes, prev, pager, next, jumper',
  showHeaderBackground: false,
})

/**
 * 组件事件定义
 */
const emit = defineEmits<{

  /** 当前页码变化事件 */
  (e: 'update:currentPage', val: number): void

  /** 每页条数变化事件 */
  (e: 'update:pageSize', val: number): void

  /** 选择项变化事件 */
  (e: 'selectionChange', selection: any[]): void

  /** 行点击事件 */
  (e: 'rowClick', row: any, column: TableColumnCtx<any>, event: Event): void

  /** 每页条数变化事件 */
  (e: 'sizeChange', val: number): void

  /** 当前页变化事件 */
  (e: 'currentChange', val: number): void
}>()

/**
 * 计算属性和状态
 */
const tableData = computed(() => props.data)

const currentPage = computed({
  get: () => props.currentPage,
  set: val => emit('update:currentPage', val),
})

const pageSize = computed({
  get: () => props.pageSize,
  set: val => emit('update:pageSize', val),
})

/**
 * 事件处理函数
 */
function handleSelectionChange(selection: any[]) {
  emit('selectionChange', selection)
}

function handleRowClick(row: any, column: TableColumnCtx<any>, event: Event) {
  emit('rowClick', row, column, event)
}

function handleSizeChange(val: number) {
  emit('sizeChange', val)
}

function handleCurrentChange(val: number) {
  emit('currentChange', val)
}
</script>

<template>
  <div
    class="art-table"
    :class="{ 'header-background': showHeaderBackground }"
  >
    <!-- Element Plus 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      :row-key="rowKey"
      :border="border"
      :stripe="stripe"
      :height="height"
      :max-height="maxHeight"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        align="center"
        fixed="left"
      />

      <!-- 序号列 -->
      <el-table-column
        v-if="index"
        type="index"
        width="60"
        label="序号"
        align="center"
        fixed="left"
      />

      <!-- 动态列插槽 -->
      <slot />

      <!-- 空数据状态 -->
      <template
        #empty
      >
        <el-empty
          :description="emptyText"
        />
      </template>
    </el-table>

    <!-- 分页器 -->
    <div
      v-if="pagination"
      class="table-pagination"
      :class="paginationAlign"
    >
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        :background="true"
        :size="paginationSize"
        :layout="paginationLayout"
        :hide-on-single-page="hideOnSinglePage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 .art-table {
  margin-top: 20px;

  .table-pagination {
    display: flex;
    margin-top: 16px;
    padding: 12px 0;

    &.left {
      justify-content: flex-start;
    }

    &.center {
      justify-content: center;
    }

    &.right {
      justify-content: flex-end;
    }
  }

  :deep(.el-table) {
    th.el-table__cell {
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    td.el-table__cell,
    th.el-table__cell {
      padding: 12px 0;
    }

    .el-table__empty-block {
      width: 100% !important;
    }
  }

  &.header-background {
    :deep(.el-table) {
      th.el-table__cell {
        background-color: var(--el-fill-color-light);
      }
    }
  }

  // 解决el-image和el-table层级冲突问题
  :deep(.el-table__cell) {
    position: static !important;
  }
}
</style>
