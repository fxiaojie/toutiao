<template>
  <van-cell class="article-item">
    <!-- 文章标题 -->
    <template #title class="title van-multi-ellipsis--l2">
      {{item.title}}
    </template>

    <!-- 3张图片 -->
    <template #label >
      <div v-if="item.cover.type === 3" class="cover-wrap">
        <div 
          v-for="(img, index) in item.cover.images" 
          :key="index" 
          class="cover-wrap-item"
        >
          <van-image
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <!-- 作者，评论，时间 -->
      <div class="label-wrap">
        <span>{{item.aut_name}}</span>
        <span>{{item.comm_count}}评论</span>
        <span>{{item.pubdate | relativeTime}}</span>
      </div>
    </template>

    <!-- 1张图片 -->
    <template #default v-if="item.cover.type === 1">
      <van-image
        class="right-cover"
        fit="cover"
        :src="item.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
  .article-item {
    // 标题文字
    .title {
      font-size: 32px;
      color: #3a3a3a;
    }
    /deep/ .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      margin-left: 12px;
    }
    .right-cover {
      width: 232px;
      height: 146px;
    }
    .cover-wrap {
      padding: 15px 0;
      display: flex;
      flex-wrap: nowrap;
      .cover-wrap-item {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .van-image {
          width: 100%;
          height: 146px;
        }
      }
    }
    .label-wrap {
      color: #b4b4b4;
    }
    .label-wrap span {
      margin-right: 12px;
    }
  }
</style>