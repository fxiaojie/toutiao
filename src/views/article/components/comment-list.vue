<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list" 
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import {getComments} from '@/api/comment'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: [Array],
      // 是对象或数组时必须是函数返回值
      default: () => []
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,   // 获取下一页数据的页码
      limit: 10   // 每页大小
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      const {data} = await getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })

      // 把评论数量传给父组件
      this.$emit('updata-comments', data.data.total_count)

      // 2.把数据放到列表中
      const {results} = data.data
      this.list.push(...results)

      // 3.将本次的 loading 关闭
      this.loading = false

      // 4.是否还有数据 
      if(results.length) {
        this.offset = data.data.last_id
      }else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>