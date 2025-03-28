<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { useMenuStore } from '@/store/modules/menu'

import { ElMessage, ElMessageBox } from 'element-plus'

const menuList = computed(() => useMenuStore().menuList)

const dialogVisible = ref(false)

const form = reactive({
  // 菜单
  name: '',
  path: '',
  label: '',
  icon: '',
  isEnable: true,
  sort: 1,
  isMenu: true,
  keepAlive: true,
  isHidden: true,
  link: '',
  isIframe: false,

  // 权限 (修改这部分)
  authName: '',
  authLabel: '',
  authIcon: '',
  authSort: 1,
})

const labelPosition = ref('menu')

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'blur',
    },
    {
      min: 2,
      max: 20,
      message: '长度在 2 到 20 个字符',
      trigger: 'blur',
    },
  ],
  path: [{
    required: true,
    message: '请输入路由地址',
    trigger: 'blur',
  }],
  label: [{
    required: true,
    message: '输入权限标识',
    trigger: 'blur',
  }],

  // 修改这部分
  authName: [{
    required: true,
    message: '请输入权限名称',
    trigger: 'blur',
  }],
  authLabel: [{
    required: true,
    message: '请输入权限权限标识',
    trigger: 'blur',
  }],
})

const tableData = menuList.value

const isEdit = ref(false)

const formRef = ref<FormInstance>()

const dialogTitle = computed(() => {
  const type = labelPosition.value === 'menu' ? '菜单' : '权限'

  return isEdit.value ? `编辑${type}` : `新建${type}`
})

function handleChange() {}

async function submitForm() {
  if (!formRef.value) {
    return
  }

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // const menuStore = useMenuStore()
        // const params =
        //   labelPosition.value === 'menu'
        //     ? {
        //         title: form.name,
        //         path: form.path,
        //         name: form.label,
        //         icon: form.icon,
        //         sort: form.sort,
        //         isEnable: form.isEnable,
        //         isMenu: form.isMenu,
        //         keepAlive: form.keepAlive,
        //         isHidden: form.isHidden,
        //         link: form.link
        //       }
        //     : {
        //         title: form.authName,
        //         name: form.authLabel,
        //         icon: form.authIcon,
        //         sort: form.authSort
        //       }

        if (isEdit.value) {
          // await menuStore.updateMenu(params)
        }
        else {
          // await menuStore.addMenu(params)
        }

        ElMessage.success(`${isEdit.value ? '编辑' : '新增'}成功`)
        dialogVisible.value = false

        // 刷新列表
        // await menuStore.getMenuList()
      }
      catch {
        ElMessage.error(`${isEdit.value ? '编辑' : '新增'}失败`)
      }
    }
  })
}

function showModel(type: string, row?: any) {
  dialogVisible.value = true
  labelPosition.value = type
  isEdit.value = false
  resetForm()

  if (row) {
    isEdit.value = true
    nextTick(() => {
      // 回显数据
      if (type === 'menu') {
        // 菜单数据回显
        // console.log(row.meta)
        form.name = row.meta.title
        form.path = row.path
        form.label = row.name
        form.icon = row.meta.icon
        form.sort = row.meta.sort || 1
        form.isMenu = row.meta.isMenu
        form.keepAlive = row.meta.keepAlive
        form.isHidden = row.meta.isHidden || true
        form.isEnable = row.meta.isEnable || true
        form.link = row.meta.link
        form.isIframe = row.meta.isIframe || false
      }
      else {
        // 权限按钮数据回显
        form.authName = row.title
        form.authLabel = row.auth_mark
        form.authIcon = row.icon || ''
        form.authSort = row.sort || 1
      }
    })
  }
}

function resetForm() {
  formRef.value?.resetFields()
  Object.assign(form, {
    // 菜单
    name: '',
    path: '',
    label: '',
    icon: '',
    sort: 1,
    isMenu: true,
    keepAlive: true,
    isHidden: true,
    link: '',
    isIframe: false,

    // 权限
    authName: '',
    authLabel: '',
    authIcon: '',
    authSort: 1,
  })
}

async function deleteAuth() {
  try {
    await ElMessageBox.confirm('确定要删除该权限吗？删除后无法恢复', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    ElMessage.success('删除成功')
  }
  catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 修改计算属性，增加锁定控制参数
const disableMenuType = computed(() => {
  // 编辑权限时锁定为权限类型
  if (isEdit.value && labelPosition.value === 'button') {
    return true
  }

  // 编辑菜单时锁定为菜单类型
  if (isEdit.value && labelPosition.value === 'menu') {
    return true
  }

  // 顶部添加菜单按钮时锁定为菜单类型
  if (!isEdit.value && labelPosition.value === 'menu') {
    return true
  }

  return false
})

</script>

<template>
  <div
    class="page-content"
  >
    <el-row
      :gutter="20"
      style="margin-left: 15px"
    >
      <el-button
        v-auth="'add'"
        v-ripple
        @click="showModel('menu', null)"
      >
        添加菜单
      </el-button>
    </el-row>

    <art-table
      :data="tableData"
    >
      <template
        #default
      >
        <el-table-column
          label="菜单名称"
        >
          <template
            #default="scope"
          >
            {{ scope.row.meta?.title }}
          </template>
        </el-table-column>

        <el-table-column
          prop="path"
          label="路由"
        />

        <el-table-column
          prop="meta.authList"
          label="可操作权限"
        >
          <template
            #default="scope"
          >
            <el-popover
              v-for="(item, index) in scope.row.meta.authList"
              :key="index"
              placement="top-start"
              title="操作"
              :width="200"
              trigger="click"
            >
              <div
                style="margin: 0; text-align: right"
              >
                <el-button
                  size="small"
                  type="primary"
                  @click="showModel('button', item)"
                >
                  编辑
                </el-button>

                <el-button
                  size="small"
                  type="danger"
                  @click="deleteAuth()"
                >
                  删除
                </el-button>
              </div>

              <template
                #reference
              >
                <el-button
                  class="small-btn"
                >
                  {{ item.title }}
                </el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="编辑时间"
          prop="date"
        >
          2022-3-12 12:00:00
        </el-table-column>

      </template>
    </art-table>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="700px"
      align-center
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="85px"
      >
        <el-form-item
          label="菜单类型"
        >
          <el-radio-group
            v-model="labelPosition"
            :disabled="disableMenuType"
          >
            <el-radio-button
              value="menu"
              label="menu"
            >
              菜单
            </el-radio-button>

            <el-radio-button
              value="button"
              label="button"
            >
              权限
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <template
          v-if="labelPosition === 'menu'"
        >
          <el-row
            :gutter="20"
          >
            <el-col
              :span="12"
            >
              <el-form-item
                label="菜单名称"
                prop="name"
              >
                <el-input
                  v-model="form.name"
                  placeholder="菜单名称"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="12"
            >
              <el-form-item
                label="路由地址"
                prop="path"
              >
                <el-input
                  v-model="form.path"
                  placeholder="路由地址"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            :gutter="20"
          >
            <el-col
              :span="12"
            >
              <el-form-item
                label="权限标识"
                prop="label"
              >
                <el-input
                  v-model="form.label"
                  placeholder="权限标识"
                />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row
            :gutter="20"
          >
            <el-col
              :span="12"
            >
              <el-form-item
                label="菜单排序"
                prop="sort"
                style="width: 100%"
              >
                <el-input-number
                  v-model="form.sort"
                  style="width: 100%"
                  :min="1"
                  controls-position="right"
                  @change="handleChange"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="12"
            >
              <el-form-item
                label="外部链接"
                prop="link"
              >
                <el-input
                  v-model="form.link"
                  placeholder="外部链接/内嵌地址(https://www.baidu.com)"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            :gutter="20"
          >
            <el-col
              :span="5"
            >
              <el-form-item
                label="是否启用"
                prop="isEnable"
              >
                <el-switch
                  v-model="form.isEnable"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="5"
            >
              <el-form-item
                label="页面缓存"
                prop="keepAlive"
              >
                <el-switch
                  v-model="form.keepAlive"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="5"
            >
              <el-form-item
                label="是否显示"
                prop="isHidden"
              >
                <el-switch
                  v-model="form.isHidden"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="5"
            >
              <el-form-item
                label="是否内嵌"
                prop="isMenu"
              >
                <el-switch
                  v-model="form.isIframe"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <template
          v-if="labelPosition === 'button'"
        >
          <el-row
            :gutter="20"
          >
            <el-col
              :span="12"
            >
              <el-form-item
                label="权限名称"
                prop="authName"
              >
                <el-input
                  v-model="form.authName"
                  placeholder="权限名称"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="12"
            >
              <el-form-item
                label="权限标识"
                prop="authLabel"
              >
                <el-input
                  v-model="form.authLabel"
                  placeholder="权限标识"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            :gutter="20"
          >
            <el-col
              :span="12"
            >
              <el-form-item
                label="权限排序"
                prop="authSort"
                style="width: 100%"
              >
                <el-input-number
                  v-model="form.authSort"
                  style="width: 100%"
                  :min="1"
                  controls-position="right"
                  @change="handleChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>

      <template
        #footer
      >
        <span
          class="dialog-footer"
        >
          <el-button
            @click="dialogVisible = false"
          >取 消</el-button>

          <el-button
            type="primary"
            @click="submitForm()"
          > 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .page-content {
  .svg-icon {
    width: 1.8em;
    height: 1.8em;
    overflow: hidden;
    vertical-align: -8px;
    fill: currentcolor;
  }

  :deep(.small-btn) {
    height: 30px !important;
    padding: 0 10px !important;
    font-size: 12px !important;
  }
}
</style>
