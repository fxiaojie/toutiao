<template>
  <div class="comment-reply">
    <!-- 头部 -->
    <van-nav-bar
      :title="`${comment.reply_count}条回复`"
    >
      <template #left>
        <van-icon 
          name="cross" 
          @click="$emit('closeReplyComment')"
        />
      </template>
    </van-nav-bar>

    <!-- 当前评论 -->
    <comment-item
      :comment="comment"
    ></comment-item>
    <!-- 评论回复 -->
    <van-cell title="所有回复"></van-cell>
    <comment-list
      :source="comment.com_id"
      type="c"
      :list="commentList"
    ></comment-list>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <!-- 发布评论 -->
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
    </div>

    <!-- 发布评论回复 -->
    <van-popup
      v-model="isPostShow" 
      position="bottom"
    >
      <post-comment
        @post-success="onPostSuccess"
        :target="comment.com_id"
        :article-id="articleId"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import PostComment from './post-comment.vue'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess(comment) {
      this.commentList.unshift(comment)

      this.comment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
  .comment-reply {
    .article-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 88px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .comment-btn {
        width: 400px;
        height: 70px;
        border: 2px solid #eeeeee;
        font-size: 30px;
        line-height: 46px;
        color: #a7a7a7;
        background-color: #3296fa;
      }
    }
  }
</style>