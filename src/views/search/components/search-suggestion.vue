<template>
  <div class="search-suggestion">
    <van-cell
      icon="search" 
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <template #title>
        <!-- highlight为一个函数 -->
        <span v-html="highlight(str)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {getSearchSuggestions} from '@/api/search'
import {debounce} from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []   // 联想建议数据列表
    }
  },
  watch: {
    // 监视属性完整写法
    searchText: {
      // 数据发生变化时会执行 handler 处理函数
      // debounce: 函数防抖
      handler: debounce(async function() {
        const {data} = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    highlight(str) {
      return str.replace(
        // RegExp 是正则表达式的构造函数
        // 参数1：字符串
        // 参数2：匹配模式
        // 返回值：正则对象
        // gi：g为全局，i为忽略大小写
        new RegExp(this.searchText, 'gi'),
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style>

</style>