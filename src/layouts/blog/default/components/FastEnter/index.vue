<script setup lang="ts">
import { RoutesAlias } from '@/router/modules/routesAlias'

import { ref } from 'vue'

import { useRouter } from 'vue-router'

const WEB_LINKS = {
  // Github 主页
  GITHUB_HOME: 'https://github.com/Daymychen',

  // 项目 Github 主页
  GITHUB: 'https://github.com/Daymychen/art-design-pro',

  // 个人博客
  BLOG: 'https://www.lingchen.kim',

  // 项目文档
  DOCS: 'https://www.lingchen.kim/art-design-pro/docs',

  // 项目社区
  COMMUNITY: 'https://www.lingchen.kim/art-design-pro/docs/guide/community/communicate.html',

  // 个人 Bilibili 主页
  BILIBILI: 'https://space.bilibili.com/425500936?spm_id_from=333.1007.0.0',

  // 项目介绍
  INTRODUCE: 'https://www.lingchen.kim/art-design-pro/docs/guide/introduce.html',
}

const router = useRouter()

const popoverRef = ref()

type Application = {
  name: string
  description: string
  icon: string
  iconColor: string
  path: string
}

type QuickLink = {
  name: string
  path: string
}

const applications: Application[] = [
  {
    name: '工作台',
    description: '系统概览与数据统计',
    icon: '&#xe721;',
    iconColor: '#377dff',
    path: RoutesAlias.Dashboard,
  },
  {
    name: '分析页',
    description: '数据分析与可视化',
    icon: '&#xe812;',
    iconColor: '#ff3b30',
    path: RoutesAlias.Analysis,
  },
  {
    name: '礼花效果',
    description: '动画特效展示',
    icon: '&#xe7ed;',
    iconColor: '#7A7FFF',
    path: RoutesAlias.Fireworks,
  },
  {
    name: '聊天',
    description: '即时通讯功能',
    icon: '&#xe70a;',
    iconColor: '#13DEB9',
    path: RoutesAlias.Chat,
  },
  {
    name: '官方文档',
    description: '使用指南与开发文档',
    icon: '&#xe788;',
    iconColor: '#ffb100',
    path: WEB_LINKS.DOCS,
  },
  {
    name: '技术支持',
    description: '技术支持与问题反馈',
    icon: '&#xe86e;',
    iconColor: '#ff6b6b',
    path: WEB_LINKS.COMMUNITY,
  },
  {
    name: '更新日志',
    description: '版本更新与变更记录',
    icon: '&#xe81c;',
    iconColor: '#38C0FC',
    path: RoutesAlias.ChangeLog,
  },
  {
    name: '哔哩哔哩',
    description: '技术分享与交流',
    icon: '&#xe6b4;',
    iconColor: '#FB7299',
    path: WEB_LINKS.BILIBILI,
  },
]

const quickLinks: QuickLink[] = [
  {
    name: '登录',
    path: '/login',
  },
  {
    name: '注册',
    path: '/register',
  },
  {
    name: '忘记密码',
    path: '/forget-password',
  },
  {
    name: '定价',
    path: '/template/pricing',
  },
  {
    name: '个人中心',
    path: '/user/user',
  },
  {
    name: '留言管理',
    path: '/article/comment',
  },
]

function handleAppClick(path: string) {
  if (path.startsWith('http')) {
    window.open(path, '_blank')
  }
  else {
    router.push(path)
  }

  popoverRef.value?.hide()
}
</script>

<template>
  <el-popover
    ref="popoverRef"
    :width="700"
    trigger="hover"
    popper-class="fast-enter-popover"
    :show-arrow="false"
    placement="bottom-start"
    :offset="0"
    popper-style="border: 1px solid var(--art-border-dashed-color); border-radius: calc(var(--custom-radius) / 2 + 4px); "
  >
    <template
      #reference
    >
      <div
        class="fast-enter-trigger"
      >
        <div
          class="btn"
        >
          <i
            class="iconfont-sys"
          >&#xe81a;</i>

          <span
            class="red-dot"
          />
        </div>
      </div>
    </template>

    <div
      class="fast-enter"
    >
      <div
        class="apps-section"
      >
        <div
          class="apps-grid"
        >
          <!-- 左侧应用列表 -->
          <div
            v-for="app in applications"
            :key="app.name"
            class="app-item"
            @click="handleAppClick(app.path)"
          >
            <div
              class="app-icon"
            >
              <i
                class="iconfont-sys"
                :style="{ color: app.iconColor }"
                v-html="app.icon"
              />
            </div>

            <div
              class="app-info"
            >
              <h3>
                {{ app.name }}
              </h3>

              <p>
                {{ app.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="quick-links"
      >
        <h3>
          快速链接
        </h3>

        <ul>
          <li
            v-for="link in quickLinks"
            :key="link.name"
            @click="handleAppClick(link.path)"
          >
            <span>{{ link.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </el-popover>
</template>

<style lang="scss" scoped>
  .fast-enter-trigger {
  display: flex;
  gap: 8px;
  align-items: center;

  .btn {
    position: relative;
    display: block;
    width: 38px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;

    i {
      display: block;
      font-size: 19px;
      color: var(--art-gray-600);
    }

    &:hover {
      color: var(--main-color);
      background-color: rgba(var(--art-gray-200-rgb), 0.7);
    }

    .red-dot {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 6px;
      height: 6px;
      background-color: var(--el-color-danger);
      border-radius: 50%;
    }
  }
}

.fast-enter {
  display: grid;
  grid-template-columns: 2fr 0.8fr;

  .apps-section {
    .apps-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
    }

    .app-item {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 8px 12px;
      margin-right: 12px;
      cursor: pointer;
      border-radius: 8px;

      &:hover {
        background-color: rgba(var(--art-gray-200-rgb), 0.7);

        .app-icon {
          background-color: transparent !important;
        }
      }

      .app-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        background-color: rgba(var(--art-gray-200-rgb), 0.7);
        border-radius: 8px;

        i {
          font-size: 20px;
        }
      }

      .app-info {
        h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: var(--art-text-gray-800);
        }

        p {
          margin: 4px 0 0;
          font-size: 12px;
          color: var(--art-text-gray-500);
        }
      }
    }
  }

  .quick-links {
    padding: 8px 0 0 24px;
    border-left: 1px solid var(--el-border-color-lighter);

    h3 {
      margin: 0 0 10px;
      font-size: 16px;
      font-weight: 500;
      color: var(--art-text-gray-800);
    }

    ul {
      li {
        padding: 8px 0;
        cursor: pointer;

        &:hover {
          span {
            color: var(--el-color-primary);
          }
        }

        span {
          color: var(--art-text-gray-600);
          text-decoration: none;
        }
      }
    }
  }
}
</style>
