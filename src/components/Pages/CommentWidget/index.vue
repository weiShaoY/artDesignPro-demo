<script setup lang="ts">
import { ref } from 'vue'

import CommentItem from './CommentItem.vue'

type Comment = {
  id: number
  author: string
  content: string
  timestamp: string
  replies: Comment[]
}

const commentList = ref<Comment[]>([
  {
    id: 1,
    author: '白夜',
    content: '黑神话悟空的打斗场面真的燃爆了！期待上线！',
    timestamp: '2024-09-04 09:00',
    replies: [
      {
        id: 101,
        author: '星河',
        content: '是啊，特别是那些技能特效，简直帅炸！',
        timestamp: '2024-09-04 09:15',
        replies: [
          {
            id: 201,
            author: '光芒',
            content: '希望优化能跟上，不然这么好的画面如果卡顿就可惜了。',
            timestamp: '2024-09-04 09:30',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: '浮生',
    content: '据说黑神话悟空需要很高的配置，不知道我的电脑能不能跑起来。',
    timestamp: '2024-09-04 10:00',
    replies: [
      {
        id: 102,
        author: '晨曦',
        content: '同担心啊，听说需要至少RTX 3070才能高效运行。',
        timestamp: '2024-09-04 10:20',
        replies: [
          {
            id: 202,
            author: '流光',
            content: '我是打算升级配置，等这款游戏就是了。',
            timestamp: '2024-09-04 10:40',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    author: '风铃',
    content: '130GB的存储要求有点夸张啊，不过画质这么好，也情有可原。',
    timestamp: '2024-09-04 11:00',
    replies: [
      {
        id: 103,
        author: '云端',
        content: '确实有点高，不过为了这种品质的游戏，值得。',
        timestamp: '2024-09-04 11:15',
        replies: [
          {
            id: 203,
            author: '梦境',
            content: '希望发售后能优化一下安装包体积。',
            timestamp: '2024-09-04 11:30',
            replies: [],
          },
        ],
      },
    ],
  },
])

const newComment = ref<Partial<Comment>>({
  author: '',
  content: '',
})

const showReplyForm = ref<number | null>(null)

function addComment() {
  if (newComment.value.author && newComment.value.content) {
    commentList.value.push({
      id: Date.now(),
      author: newComment.value.author,
      content: newComment.value.content,
      timestamp: new Date().toISOString(),
      replies: [],
    })
    newComment.value.author = ''
    newComment.value.content = ''
  }
  else {
    alert('请填写完整的评论信息')
  }
}

function addReply(commentId: number, replyAuthor: string, replyContent: string) {
  const comment = findComment(commentList.value, commentId)

  if (comment && replyAuthor && replyContent) {
    comment.replies.push({
      id: Date.now(),
      author: replyAuthor,
      content: replyContent,
      timestamp: new Date().toISOString(),
      replies: [],
    })
    showReplyForm.value = null
  }
  else {
    alert('请填写完整的回复信息')
  }
}

function toggleReply(commentId: number) {
  showReplyForm.value = showReplyForm.value === commentId ? null : commentId
}

function findComment(commentList: Comment[], commentId: number): Comment | undefined {
  for (const comment of commentList) {
    if (comment.id === commentId) {
      return comment
    }

    const found = findComment(comment.replies, commentId)

    if (found) {
      return found
    }
  }

  return undefined
}
</script>

<template>
  <div
    class="comment-module"
  >
    <form
      @submit.prevent="addComment"
    >
      <div>
        <input
          v-model="newComment.author"
          placeholder="你的名称"
          required
        >

        <textarea
          v-model="newComment.content"
          placeholder="简单说两句..."
          required
        />

        <button
          class="btn"
          type="submit"
        >
          发布
        </button>
      </div>
    </form>

    <ul>
      <div
        class="comment-header"
      >
        评论 {{ commentList.length }}
      </div>

      <CommentItem
        v-for="comment in commentList.slice().reverse()"
        :key="comment.id"
        class="comment-item"
        :comment="comment"
        :show-reply-form="showReplyForm"
        @toggle-reply="toggleReply"
        @add-reply="addReply"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .comment-module {
  .comment-header {
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
    color: var(--art-gray-900);
  }

  .comment-item {
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--art-border-dashed-color);
  }

  form {
    margin-bottom: 40px !important;
  }

  :deep(form) {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 50px;
    margin: auto;

    > div {
      input,
      textarea {
        box-sizing: border-box;
        display: block;
        width: 100%;
        margin-top: 10px;
        border: 1px solid var(--art-border-dashed-color);
        outline: none;
      }

      input {
        height: 36px;
        padding-left: 10px;
      }

      textarea {
        height: 100px;
        padding: 10px;
      }

      .btn {
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-block;
        width: 60px;
        height: 32px;
        margin-top: 15px;
        font-size: 14px;
        line-height: 30px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background-color: var(--main-color);
        border: 0;
        border-radius: 4px;
      }
    }
  }
}
</style>
