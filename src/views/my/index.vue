<template>
  <div class="my-container">
    <!-- 以登录头部 -->
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        class="base-info"
        center
        :border="false"
      >
        <template #title>
          <van-image
          class="avatar"
            round
            :src="currentUser.photo"
          />
        </template> 

        <span>{{currentUser.name}}</span>   <!-- 布局未成功 -->

        <template #right-icon>
          <van-button round size="small" class="update-info">编辑资料</van-button>
        </template>
      </van-cell>

      <van-grid :border="false" class="data-info">
        <van-grid-item text="头条" class="data-info-item">
          <span slot="icon">{{currentUser.art_count}}</span>
        </van-grid-item>
        <van-grid-item text="关注" class="data-info-item">
          <span slot="icon">{{currentUser.follow_count}}</span>
        </van-grid-item>
        <van-grid-item text="粉丝" class="data-info-item">
          <span slot="icon">{{currentUser.fans_count}}</span>
        </van-grid-item>
        <van-grid-item text="获赞" class="data-info-item">
          <span slot="icon">{{currentUser.like_count}}</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录头部 -->
    <div v-else class="not-login">
      <div class="img" @click="$router.push('/login')">
        <img src="./mobile.png">
      </div>
      <span class="text">点击登录</span>
    </div>

    <van-grid :column-num="2" class="nav-grid" :border="false">
      <van-grid-item icon="star-o" text="收藏" class="nav-grid-item" />
      <van-grid-item icon="underway-o" text="历史" class="nav-grid-item" />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" class="top-10" />
    <van-cell title="小智同学" is-link to="/" />
    <van-cell v-if="user" title="退出登录" class="logout-cell top-10" @click="onLogout" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getCurrentUser} from '@/api/user'

export default {
  name: 'MyIndex',
  data() {
    return {
      currentUser: {}   // 当前用户登录信息
    }
  },
  computed: {
    ...mapState(['user'])   // 映射到本地
  },
  created() {
    this.loadCurrentUser()
  },
  methods: {
    // 请求当前用户信息
    async loadCurrentUser() {
      const {data} = await getCurrentUser()
      this.currentUser = data.data
    },
    onLogout() {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？',
      })
      .then(() => {
        // on confirm 
        this.$store.commit('setUser', null)
      })
      .catch(() => {
        // on cancel
      });
    }
  }
  
}
</script>

<style lang="less" scoped>
  .my-container {
    .my-info {
      background: url("./banner.png") no-repeat;
      background-size: cover;
      // 头像，昵称，编辑资料
      .base-info {
        box-sizing: border-box;
        background-color: unset;
        height: 230px;
        .avatar {
          box-sizing: border-box;
          border: 1px solid #fff;
          width: 132px;
          height: 132px;
        }
        .van-cell__value {  // 昵称
          text-align: left;
          font-size: 30px;
          color: #fff;
        }
        .update-info {
          height: 42px;
          font-size: 20px;
          color: #666;
        }
      }
      // 头条，关注，粉丝，获赞
      .data-info {
        /deep/ .van-grid-item__content {  
          background-color: unset;
        }
        // 数字
        .data-info-item {
          color: #fff;
          font-size: 36px;
        }
        // 头条，关注，粉丝，获赞  文字
        /deep/ .van-grid-item__text {
          color: #fff;
          font-size: 22px;
        }
      }
    }

    .not-login {
      height: 360px;
      background: url('./banner.png') no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      .img img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }

    // 收藏，历史
    /deep/ .nav-grid {  // /deep/ 深度作用操作符
      height: 140px;
      .nav-grid-item {
        .van-icon-star-o {
          color: #eb5253;
          font-size: 44px;
        }
        .van-icon-underway-o {
          color: #ff9d1d;
          font-size: 44px;
        }
        .van-grid-item__text {
          font-size: 28px;
        }
      }
    }
    // 上边距
    .top-10 {
      margin-top: 10px;
    }
    // 退出登录
    .logout-cell {
      text-align: center;
      color: #d86262;
      // margin-left: 10px;
      // margin-right: 10px; margin-right 不可用
    }
  }
</style>