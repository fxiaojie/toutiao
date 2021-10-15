<template>
  <div class="search-history">
    <!-- 头部 -->
    <van-cell center title="搜索历史">
      <template center #right-icon>
        <div v-if="isDeleteShow">
          <span @click="onAllDelete()">全部删除</span>
          &nbsp;&nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </div>

        <van-icon 
          v-else
          name="delete-o"
          @click="isDeleteShow=true"  
        ></van-icon>
      </template>
    </van-cell>

    <!-- 记录 -->
    <van-cell 
      center
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onDelete(item, index)"
    >
      <template #right-icon>
        <van-icon name="close" v-show="isDeleteShow"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {setItem} from '@/utils/storage'
import {deleteSearchHistories} from '@/api/search'

export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isDeleteShow: false   // 删除按钮显示
    }
  },
  methods: {
    onDelete(history, index) {
      // 可删除状态,执行删除操作
      if(this.isDeleteShow) {
        this.searchHistories.splice(index, 1)  // searchHistories是由父组件经过 props 传过来的，按说不能修改，但修改的是数组的值，没有改变数组地址

        // 数据持久化
        // 删除本地历史记录
        setItem('search-histories', this.searchHistories)
        // 删除线上接口
        // 由于接口问题，不能单个删除，只能全部删除 

        return 
      }

      // 非删除状态，搜索数据
      this.$emit('search', history)
      
    },
    // 删除所有历史记录
    async onAllDelete() {
      this.$emit('updata-histories', [])
      await deleteSearchHistories()
    }
  }
  
}
</script>

<style>

</style>