<template>
  <div class="divbox">
    <van-cell class="comment-item" :icon="comment.aut_photo">
      <template #title>
        <div class="name">{{comment.aut_name}}</div>
        <div class="content">{{comment.content}}</div>
      </template>
      <template #label center>
        <span class="date">{{comment.pubdate | datetime('MM-DD HH:mm')}}</span>
        <span>
          <van-button round size="mini" class="reply" @click="$emit('reply-click', comment)">{{comment.reply_count}} 回复</van-button>
        </span>
      </template>
      <!-- 点赞 -->
      <template #right-icon>
        <div>
        <span  :class="{like: comment.is_liking}">
          <van-icon 
            @click="onCommentLike" 
            :name="comment.is_liking ? 'good-job' : 'good-job-o' "
          />
        </span>
        <span>{{comment.like_count}}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {addCommentLike, deleteCommentLike} from '@/api/comment'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike() {
      // 判断是否已点赞
      if(this.comment.is_liking) {
        await deleteCommentLike(this.comment.com_id)
        this.comment.like_count--
      }else {
        await addCommentLike(this.comment.com_id)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang="less">
  .divbox {
    // border-bottom: 1px solid rgb(163, 160, 160);
    .comment-item {
      // 头像
      .van-cell__left-icon {
        width: 70px;
        height: 70px;
        margin-right: 20px;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .name {
        color: #406599;
        font-size: 26px;
      }
      .content {
        font-size: 32px;
      }
      // 日期/回复
      .van-cell__label {
        .date {
          margin-top: 500px;
          line-height: 42px;
        }
        .reply {
          margin-left: 20px;
          height: 100%;
        }
      }
      // 点赞
      .like {
        color: red;
      }
    }
  }
</style>