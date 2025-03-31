<script setup lang="ts">

/**
 *  导入类型定义
 */
import type { RouteLocationMatched, RouteRecordRaw } from 'vue-router'

/**
 *  导入Vue组合式API
 */
import { ref, watch } from 'vue'

/**
 *  导入路由相关API
 */
import { useRoute, useRouter } from 'vue-router'

/**
 *  面包屑项类型定义
 */
export type BreadcrumbItem = {
  path: string
  meta: RouteRecordRaw['meta']
}

/**
 *  路由实例
 */
const route = useRoute()

const router = useRouter()

/**
 *  面包屑数据
 */
const breadList = ref<BreadcrumbItem[]>([])

/**
 *  判断是否为最后一项
 *  @param index 当前索引
 *  @returns 是否为最后一项
 */
const isLastItem = (index: number) => index === breadList.value.length - 1

/**
 *  判断是否为首页路由
 *  @param route 路由匹配项
 *  @returns 是否为首页
 */
const isHome = (route: RouteLocationMatched) => route.name === '/'

/**
 *  获取面包屑数据
 *  @description 根据当前路由生成面包屑导航
 */
function getBreadcrumb() {
  const { matched } = route

  console.log('%c Line:58 🥛 matched', 'color:#3f7cff', matched)

  // 首页特殊处理
  if (isHome(matched[0])) {
    breadList.value = []
    return
  }

  // 主容器内的一级菜单特殊处理
  if (matched[0].meta.isInMainContainer) {
    const currentRoute = matched[matched.length - 1]

    breadList.value = [{
      path: currentRoute.path,
      meta: currentRoute.meta,
    }]
    return
  }

  // 常规路由处理
  breadList.value = matched.map(({ path, meta }) => ({
    path,
    meta,
  }))
}

watchEffect(() => {
  console.log('%c Line:83 🍤 breadList.value', 'color:#b03734', breadList.value)
})

/**
 *  处理面包屑点击事件
 *  @param item 点击的面包屑项
 *  @description 根据点击项执行路由跳转
 */
async function handleClick(item: BreadcrumbItem) {
  const { path } = item

  // 外部链接特殊处理
  if (path === '/outside') {
    return
  }

  const currentRoute = router.getRoutes().find(route => route.path === path)

  // 无子路由直接跳转
  if (!currentRoute?.children?.length) {
    await router.push(path)
    return
  }

  // 查找第一个有效子路由
  const firstValidChild = currentRoute.children.find(
    child => !child.redirect && !child.meta?.isHide,
  )

  // 有有效子路由则跳转，否则跳转当前路由
  if (firstValidChild) {
    const fullPath = `/${firstValidChild.path}`.replace('//', '/')

    await router.push(fullPath)
  }
  else {
    await router.push(path)
  }
}

/**
 *  监听路由变化
 *  @description 路由变化时重新生成面包屑
 */
watch(() => route.path, getBreadcrumb, {
  immediate: true,
})
</script>

<template>
  <nav
    class="breadcrumb"
    aria-label="breadcrumb"
  >
    <ul>
      <li
        v-for="(item, index) in breadList"
        :key="item.path"
      >
        <div
          :class="{ clickable: item.path !== '/outside' && !isLastItem(index) }"
          @click="!isLastItem(index) && handleClick(item)"
        >
          <span>
            {{ item.meta?.title }}
          </span>
        </div>

        <i
          v-if="!isLastItem(index) && item.meta?.title"
          aria-hidden="true"
        >
          /
        </i>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  @use './style';

ul {
  li {
    display: flex;
    align-items: center;

    .clickable {
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
