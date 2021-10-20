<template>
  <div class="article-list" ref="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh 
      v-model="isRefreshLoading" 
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1000"
    >
      <!-- list 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in articleList" 
          :key="index" 
          :item="item" 
        />
        <!-- <van-cell v-for="item in articleList" :key="item.art_id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {getArticles} from '@/api/article.js'
// 加载 AritcleItem 组件
import ArticleItem from '@/components/article-item/index.vue'
import {debounce} from 'lodash'

export default {
// 该组件使用 vant 中 list列表，具体 API 在 vant 官网查看
// 该组件使用 vant 中 list列表，具体 API 在 vant 官网查看
// 该组件使用 vant 中 list列表，具体 API 在 vant 官网查看
// 该组件使用 vant 中 list列表，具体 API 在 vant 官网查看
// 该组件使用 vant 中 list列表，具体 API 在 vant 官网查看
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      articleList: [],   // 数据列表
      loading: false,   // 控制加载中的 loading 状态
      finished: false,   // 控制加载结束的状态，当加载结束，不再触发加载更多
      timestamp: null,   // 获取下一页数据的时间戳
      isRefreshLoading: false,   // 下拉刷新 loading 状态
      refreshSuccessText: null,    // 下拉刷新成功的文字提示
      scrollTop: 0    // 列表滚动到顶部的距离
    };
  },
  methods: {
    async onLoad() {
      // 发起请求
      const {data} = await getArticles({
        channel_id: this.channel.id,
        // this.timestamp 不为 null 的话就用t his.timestamp，否则使用 Date.now()
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      }) 
      // console.log(data);
      // 把刚加载的数据进行合并
      this.articleList.push(...data.data.results)

      // 设置本次加载状态结束
      this.loading = false

      if(data.data.results.length) {
        // 修改获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      }else {
        // 没有数据
        this.finished = true
      }
    },

    async onRefresh() {
      // 发起请求
      const {data} = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })

      // 把新数据存入列表
      this.articleList.unshift(...data.data.results)

      // 关闭下拉刷新，否则会一直转
      this.isRefreshLoading = false

      // 下拉刷新成功的文字提示
      this.refreshSuccessText = `刷新了${data.data.results.length}数据`
    }
  },

  mounted() {
    const articleScroll = this.$refs['article-list']

    articleScroll.onscroll = debounce(() => {
      this.scrollTop = articleScroll.scrollTop
    }, 50)
  },

  activated() {
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="less">
  // 控制文章列表滚动区域
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 180px;
    bottom: 100px;
    overflow-y: auto;
  }
</style>