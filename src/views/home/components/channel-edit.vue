<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <template #title>
        <span class="channel-title">我的频道</span>
      </template>
      <van-button
        round
        type="danger"
        plain
        size="mini"
        @click="isEdit=!isEdit"
      >
        {{isEdit ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <!-- 我的频道列表 -->
    <van-grid :column-num="4">
      <van-grid-item
        :class="{active: active===index}"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel, index) in userChannels" 
        :key="channel.id"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)" 
      />
    </van-grid>
    

    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <template #title>
        <span class="channel-title">频道推荐</span>
      </template>
    </van-cell>
    <!-- 频道推荐列表 -->
    <van-grid :column-num="4">
      <van-grid-item
        v-for="channel in recommendChannels" 
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {getAllChannels, addUserChannel, deleteUserChannel} from '@/api/channel'
import {mapState} from 'vuex'
import {setItem} from '@/utils/storage'

export default {  
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      allChannels: [],  // 所有频道数据列表
      isEdit: false
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    // 
    ...mapState(['user']),
    // 推荐频道列表
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return channel.id === userChannel.id
        })
      })
    }
  },
  methods: {
    // 请求获取所有频道列表
    async loadAllChannels() {
      const {data} = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 添加到我的频道
    async onAdd(channel) {
      if(this.isEdit) {
        this.userChannels.push(channel)
      }
      
      // 数据持久化
      if(this.user) {
        // 登录，存储到线上
        await addUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length + 1
            }
          ]
        })
      }else {
        // 未登录,存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 我的频道删除切换
    onUserChannelClick(channel, index) {
      if(this.isEdit && index !== 0) {
        // 删除
        this.deleteChannel(channel, index)
      }else {
        // 切换
        this.switchChannel(index)
      }
    },
    // 删除
    async deleteChannel(channel, index) {
      // 如果删除的是当前激活高亮之前的频道
      if(index <= this.active) {
        this.$emit('updata-active', this.active-1)
      }
      this.userChannels.splice(index, 1)

      // 数据持久化
      if(this.user) {
        // 登录
        await deleteUserChannel(channel.id)
      }else {
        // 未登录
        setItem('user-channels', this.userChannels)
      }
    },
    // 切换
    switchChannel(index) {
      // 切换频道
      this.$emit('updata-active', index)
      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
  .channel-edit {
    padding-top: 108px;
    .van-button {
      padding: 0 20px;
    }
    .channel-title {
      font-size: 32px;
      color: #333;
    }
    .van-grid-item {
      padding: 5px 10px;
      width: 160px;
      height: 86px;
      /deep/ .van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 28px;
          color: #222;
          margin-top: 0;
        }
      }
      /deep/ .van-grid-item__icon {
        position: absolute;
        top: -6px;
        right: -6px;
        font-size: 20px;
        color: #ccc;
      }
    }
    // 选中的频道标签高亮
    .active {
      /deep/ .van-grid-item__text {
        color: red !important;
      }
    }
  }
</style>