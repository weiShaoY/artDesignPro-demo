<script setup lang="ts">
import { useCommon } from '@/composables/useCommon'

import {
  Operation,
  RefreshRight,
  Search,
} from '@element-plus/icons-vue'

const props = defineProps({
  /** 是否显示顶部区域 */
  showTop: {
    type: Boolean,
    default: true,
  },

  /** 是否显示底部区域 */
  showBottom: {
    type: Boolean,
    default: true,
  },

  /** 表格列配置 */
  columns: {
    type: Array as PropType<any[]>, // 建议补充具体类型，如 PropType<ColumnType[]>
    default: () => [],
  },

  /** 布局方式，包含多个功能按钮 */
  layout: {
    type: String,
    default: 'search, refresh, column',
  },
})

const emit = defineEmits(['search', 'reset', 'changeColumn'])

const showSearchWrap = ref(true)

const colOptions = ref([])

const colSelect = ref([])

const columnChange = ref(false)

onMounted(() => {
  showSearchWrap.value = props.showTop
})

// 刷新页面
function refresh() {
  useCommon().refresh()
}

// 是否显示搜索区域
function isShowSearchWrap() {
  showSearchWrap.value = !showSearchWrap.value
}

// 列显示隐藏
function showPopover() {
  if (!columnChange.value) {
    const ops: any = []

    props.columns.forEach((item: any) => {
      ops.push(item.name)
    })

    colOptions.value = ops
    colSelect.value = ops
    columnChange.value = true
  }
}

/**
 *  选择列
 *//**
    *  选择列
    */
function changeColumn(show: any, index: number) {
  const columns = props.columns

  columns.forEach((item: any, i: number) => {
    if (index === i) {
      item.show = show
    }
  })

  console.log(columns)

  emit('changeColumn', columns)
}

function search() {
  emit('search')
}

function reset() {
  emit('reset')
}
</script>

<template>
  <div
    class="table-bar"
  >
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
          @click="search"
        >
          搜索
        </el-button>

        <el-button
          v-ripple
          @click="reset"
        >
          重置
        </el-button>
      </div>
    </div>

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
          <el-button
            v-if="layout.includes('search')"
            :icon="Search"
            @click="isShowSearchWrap()"
          />

          <el-button
            v-if="layout.includes('refresh')"
            :icon="RefreshRight"
            @click="refresh()"
          />

          <el-popover
            v-if="layout.includes('column')"
            placement="bottom-end"
            width="100"
            trigger="hover"
            @show="showPopover"
          >
            <el-checkbox-group
              v-model="colOptions"
              :min="1"
            >
              <el-checkbox
                v-for="(item, index) in colSelect"
                :key="item"
                :label="item"
                @change="changeColumn($event, index)"
              />
            </el-checkbox-group>

            <template
              #reference
            >
              <el-button
                :icon="Operation"
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
  }
}

.el-button-group {
  display: flex;
}

@media screen and (max-width: $device-phone) {
  .table-bar {
    .top-wrap {
      padding-bottom: 60px;
    }
  }

  .el-form {
    padding-bottom: 15px;
  }
}
</style>
