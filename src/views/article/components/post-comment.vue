<template>
  <div class="post-comment">
    <!-- 输入框 -->
    <van-field
      v-model.trim="message"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <!-- 发布按钮 -->
    <van-button 
      class="post-btn"
      :disabled="!message"
      @click="postComment"
    >
      发布
    </van-button>
  </div>
</template>

<script>
import {addComment} from '@/api/comment'
import { Toast } from 'vant'

export default {
  name: 'PostComment',
  props: {
    // 如果是文章评论，则传文章id
    // 如果是评论回复，则传评论id
    target: { 
      type: [String, Number, Object],
      required: true
    },
    // 文章评论时不传，评论回复时传文章id
    articleId: {
      type: [String, Number, Object],
      required: false
    }
  },
  data() {
    return {
      message: ''   // 评论信息
    }
  },
  methods: {
    // 发布按钮
    async postComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })

      const {data} = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      
      this.$emit('post-success', data.data.new_obj)

      Toast.success('发布成功')
      // 发布成功，清空内容
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
  .post-comment {
    display: flex;
    align-items: center;
    padding: 28px;
    .post-btn {
      margin-left: 20px;
      width: 140px !important;
    }
  }
</style>