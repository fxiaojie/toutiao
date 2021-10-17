<template>
  <div class="article-container">
    <!-- 头部 -->
    <!-- $router.back() 从那来回哪去 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"  
    />

    <div class="article-wrap">
      <!-- 标题 -->
      <h1 class="title">{{article.title}}</h1>
    
      <!-- 作者信息 -->
      <van-cell 
        center 
        :icon="article.aut_photo"
        class="user-info"
      >
        <template #title>
          <div class="name">{{article.aut_name}}</div>
        </template>
        <template #label>
          <span class="pubdate">{{article.pubdate | relativeTime}}</span>
        </template>

        <!-- 按钮 -->
        <van-button
          class="follow-btn"
          :type="article.is_followed ? 'info' : 'primary'" 
          round 
          :icon="article.is_followed ? '' : 'plus'"
          size="mini"
          :loading="isFollowLoading"
          @click="onFollow"
        >{{article.is_followed ? '已关注' : '关注'}}</van-button>
      </van-cell>

      <!-- 正文 -->
      <div
        ref="article-content"
        class="markdown-body" 
        v-html="article.content"></div>
      <van-cell title="全部评论"></van-cell>
      <!-- 评论回复 -->
      <comment-list 
        :source="articleId" 
        :list="commentList"
        @updata-comments="totalComments=$event"
        @reply-click="onReplyClick"
      />
    </div>

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
      <van-icon
        class="comment-icon"
        :badge="totalComments"
        name="comment-o"
      />
      <!-- 收藏 -->
      <van-icon
        class="btn-item"
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <!-- 点赞 -->
      <van-icon
        class="btn-item"
        :color="article.attitude === 1 ? 'pink' : '#777'"
        :name="article.attitude === 1 ? 'like' : 'like-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 发布评论弹出层 -->
    <van-popup 
      v-model="isPostShow" 
      position="bottom"
    >
      <post-comment
        :target="articleId"
        @post-success="addComment"
      />
    </van-popup>

    <!-- 评论回复弹出层 -->
    <van-popup 
      v-model="isReplyShow" 
      position="bottom"
      :style="{ height: '70%' }"
    >
      <!-- v-if 是让组件随着弹出层的显示进行渲染和销毁，防止加载过的组件不重新渲染导致数据不会重新加载的问题 -->
      <comment-reply
        v-if="isReplyShow"
        :comment="replyComment"
        :article-id="articleId"
        @closeReplyComment="isReplyShow=false"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import { ImagePreview } from 'vant'
import {addFollow, deleteFollow} from '@/api/user'
import {getArticleById, addCollect, deleteCollect, addLike, deleteLike} from '@/api/article'
import CommentList from './components/comment-list.vue'
import PostComment from './components/post-comment.vue'
import CommentReply from './components/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {    // 路由传值
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      article: {},   // 文章详情
      isFollowLoading: false,
      isPostShow: false,   // 控制评论显示
      commentList: [],     
      totalComments: 0,   // 评论总数量
      isReplyShow: false,   // 控制评论回复显示
      replyComment: {}    // 当前评论回复
    }
  },
  methods: {
    // 请求获取文章详情
    async loadArticle() {
      const {data} = await getArticleById(this.articleId)
      
      this.article = data.data

      // 因数据改变影响的视图更新（DOM数据）不是立即的，所以需要在修改数据之后马上操作被该数据影响的视图 DOM，需要把这个代码放到 $nextTick 中
      this.$nextTick(() => {
        this.handlePreviewImages()
      })
    },

    handlePreviewImages() {
      // 获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']
      // 得到所有的 img 标签
      const imgs = articleContent.querySelectorAll('img')
      
      const imgPaths = []

      // 循环 imgs 列表，给所有的 img 注册点击事件
      imgs.forEach((img, index) => {
        // 收集图片路径
        imgPaths.push(img.src)
        img.onclick = function() {
          // 调用 ImagePreview 预览图片
          ImagePreview({
            images: imgPaths,   // 预览图片路径
            startPosition: index    // 起始位置
          })
        }
      })
    },

    // 关注按钮
    async onFollow () {
      this.isFollowLoading = true

      if(this.article.is_followed) {
        // 已关注，则取消关注 
        await deleteFollow(this.article.aut_id)
      }else {
        // 未关注，则添加关注
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed

      this.isFollowLoading = false
    },

    // 收藏文章
    async onCollect () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true   // 禁止背景点击
      })

      if(this.article.is_collected) {
        // 已收藏，则取消收藏 
        await deleteCollect(this.articleId)
      }else {
        // 未收藏，则添加收藏
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected

      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功` )
    },

    // 点赞文章
    async onLike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true   // 禁止背景点击
      })

      if(this.article.attitude === 1) {
        // 已点赞，则取消点赞 
        await deleteLike(this.articleId)
        this.article.attitude = -1
      }else {
        // 未点赞，则添加点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }

      this.$toast.success(`${this.article.attitude === 1? '' : '取消'}点赞成功` )
    },

    // 把发布的评论添加到列表上
    addComment(comment) {
      // 将新评论添加到最前面
      this.commentList.unshift(comment)

      // 更新评论总数量
      this.totalComments++

      // 关闭弹窗
      this.isPostShow = false
    },

    // 评论回复
    onReplyClick(comment) {
      this.replyComment = comment
      // 显示评论回复
      this.isReplyShow = true
    }
  },
  created() {
    this.loadArticle()
  }
}
</script>

<style scoped lang="less">
.article-container {
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: auto;
  }

  // 标题
  .title {
    font-size: 40px;
    color: #3a3a3a;
    padding: 24px;
    background-color: #fff;
    margin: 0;
  }

  // 用户信息
  .user-info {
    // 头像
    .van-cell__left-icon {
      width: 70px;
      height: 70px;
      margin-right: 16px;
      .van-icon__image {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        
      }
    }
    // 昵称
    .name {
      font-size: 24px;
      color: #333333;
    }
    // 发布时间
    .pubdate {
      font-size: 20px;
      color: #b4b4b4;
    }

    // 按钮
    .follow-btn {
      width: 170px;
      height: 60px;
      color: #fff;
    }
  }
  .markdown-body {
    padding: 28px;
    background-color: #fff;
  }

  // 底部区域
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
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>