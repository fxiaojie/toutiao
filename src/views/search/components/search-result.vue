<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell 
        v-for="item in list" 
        :key="item.art_id" 
        :title="item.title" 
      />
    </van-list>
  </div>
</template>

<script>
import {getSearchResults} from '@/api/search/'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,    // 页码
      perPage: 10   // 每页大小
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      const {data} = await getSearchResults({
        page: this.page,   // 页码
        per_page: this.perPage,     // 每页大小
        q: this.searchText
      })

      // 2.将数据放到数据列表中
      const {results} = data.data
      this.list.push(...results)

      // 3.关闭本次的loading
      this.loading = false

      // 4.判断是否还有数据
      if(results.length) {
        // 如果有，则更新获取下一页的代码
        this.page++
      }else {
        // 如果没有，则把 finished设置为true，关闭加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style>
  .search-result {
    /* 顶部不跟随滚动，自身内部滚动 */
    position: fixed;
    top: 108px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
  }
</style>