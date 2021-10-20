<template>
  <div class="user-chat">
    <!-- 头部 -->
    <!-- $router.back() 从那来回哪去 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"  
    />

    <!-- 消息列表 -->
    <van-cell-group class="message-list">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>

    <!-- 发送消息 -->
    <van-cell-group class="send-bottom">
      <van-field 
        v-model="value" 
        placeholder="请输入消息"
        :border="false"
      />

      <van-button 
        class="send-button" 
        type="primary" 
        size="small"
        round
      >
        发送
      </van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  data() {
    return {
      value: '',

    }
  }
}
</script>

<style scoped lang="less">
  .user-chat {
    .message-list {
      position: fixed;
      top: 92px;
      left: 0;
      bottom: 88px;
      right: 0;
      overflow: auto;
      // background-color: rgb(114, 113, 113);
    }
    .send-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      padding: 0 28px;
      align-items: center;
    }
    .send-button {
      width: 120px;
    }
  }
</style>