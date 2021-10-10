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
    </van-tabs>
  </div>
</template>

<script>
import {getUserChannel} from '@/api/user'
import ArticleList from './components/article-list.vue'

export default {
  name: 'HomeIndex',
  components: { 
    ArticleList 
  },
  data() {
    return {
      active: '0',
      channels: []  
    }
  },
  created() {
    this.loadChannel()
  },
  methods: {
    // 获取导航栏频道
    async loadChannel() {
      const {data} = await getUserChannel()
      this.channels = data.data.channels
    }
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
  }
</style>