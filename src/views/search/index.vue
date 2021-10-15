<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isShowResult=false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result 
      v-if="isShowResult"
      :search-text="searchText"
    />

    <!-- 联想建议 -->
    <search-suggestion 
      v-else-if="searchText" 
      :search-text="searchText"
      @search="onSearch"
    />

    <!-- 搜索历史 -->
    <search-history 
      :searchHistories="searchHistories"
      @search="onSearch"
      @updata-histories="searchHistories=$event"
      v-else
    />

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import {getSearchHistories} from '@/api/search'
import {setItem, getItem} from '@/utils/storage'
import {mapState} from 'vuex'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data() {
    return {
      searchText: '',  // 搜索框输入内容
      isShowResult: false,  // 是否显示搜索结果
      searchHistories: []   // 搜索历史记录
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch(searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText

      // 记录搜索历史 
      const index = this.searchHistories.indexOf(searchText)
      if(index !== -1) {
        // 删除重复项
        this.searchHistories.splice(index, 1)
      }
      // 把最新的历史记录放到顶部
      this.searchHistories.unshift(searchText)

      // 没有登录，存储到本地
      setItem('search-histories', this.searchHistories)

      // 显示搜索结果
      this.isShowResult = true
    },

    async loadSearchHistories() {
      // 用户线上搜索记录只能存4条，所以将本地历史记录与线上历史记录合并，最好的办法还是线上历史记录多存一些
      let searchHistories = getItem('search-histories') || []
      // 用户登录
      if(this.user) {
        const {data} = await getSearchHistories()
        
        // 合并线上与本地历史记录并去重
        searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      }

      this.searchHistories = searchHistories
    }
  },
  created() {
    this.loadSearchHistories()
  }
}
</script>

<style>

</style>