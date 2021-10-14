<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <template #title>
        <van-button icon="search" class="search-btn" round>搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab 
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />  <!-- 把循环出来的 channel 传给子组件 ArticleList -->
      </van-tab>
      
      <!-- 汉堡按钮把最后一个图标挡住了，添加占位符 -->
      <van-tab>
        <div class="wap-nav-placeholder">
        </div>
      </van-tab>
      
      <!-- 汉堡图标 -->
      <template #nav-right>
        <div 
          class="wap-nav-wrap"
          @click="isChannelEditShow=true"
        >
          <van-icon name="wap-nav" />
        </div>
      </template>
    </van-tabs>

    <!-- 弹出层 -->
    <!-- get-container="body"表示挂载到body节点下 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      round
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      get-container="body"
    >
      <!-- 
        模板中的 $event 表示事件参数
      -->
      <channel-edit 
        :userChannels="channels"
        :active="active"
        @updata-active="active=$event"
        @close="isChannelEditShow=false"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import {getUserChannel} from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import {mapState} from 'vuex'
import {getItem} from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: { 
    ArticleList,
    ChannelEdit 
  },
  data() {
    return {
      active: 0,  // 控制被激活的标签
      channels: [],   // 用户频道数据列表
      isChannelEditShow: false  // 弹出层显示
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChannel()
  },
  methods: {
    // 获取导航栏频道
    async loadChannel() {
      let channels = []
      if(this.user) {
        // 登录
        const {data} = await getUserChannel()
        channels = data.data.channels
      }else {
        // 未登录
        const localChannels = getItem('user-channels')

        if(localChannels) {
          // 本地有频道列表
          channels = localChannels
        }else {
          // 本地存储没有频道列表
          const {data} = await getUserChannel()
          channels = data.data.channels
        }
      }
      // 把处理好的数据存储到data中
      this.channels = channels
    },
    // 更新导航栏
    // onUpdateActive(index) {
    //   this.active = index
    // }
  }
}
</script>

<style scoped lang="less">
  .home-container {
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 554px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      color: #fff;
      .van-icon-search {
        font-size: 32px;
        color: #fff;
      }
      .van-button__text {
        font-size: 28px;
      }
    }
    // 文章频道列表项
    .channel-tabs {
      // 不好看，去掉
      // /deep/ .van-tab { 
      //   border-bottom: 1px solid #edeff3;
      //   border-right: 1px solid #edeff3;
      // }
      /deep/ .van-tabs__line {
        bottom: 40px;
        width: 30px !important;
        height: 6px;
        background-color: #3296fa;
      }
      
    }
    // 汉堡图标的占位符
    .wap-nav-placeholder {
      // 不使用flex布局
      flex-shrink: 0;
      width: 66px;
    }
    // 汉堡图标
    .wap-nav-wrap {
      position: fixed;
      right: 0;
      width: 66px;
      height: 86px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: .7;
      .van-icon {
        font-size: 48px;
      }
      &:before {
        content: '';
        width: 2px;
        height: 86px;
        background: url('./line.png') no-repeat;
        background-size: contain;
        position: absolute;
        left: 0;
        top: 0;
      }
    }  
  }
</style>