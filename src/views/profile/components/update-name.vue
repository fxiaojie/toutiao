<template>
  <div class="update-name">
    <!-- 头部 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onEditName"  
    />
    <div class="name-filed">
      <van-field
        v-model="newName"
        rows="2"
        autosize
        type="textarea"
        maxlength="8"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'

export default {
  name: 'UpdateName',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newName: this.name
    }
  },
  methods: {
    async onEditName() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      // 昵称检查
      if(!this.newName.trim()) {
        this.$toast.fail('昵称不能为空')
      }else {
        try {
          // 请求修改昵称
          await updateUserProfile({
            name: this.newName
          })
          
          // 把新昵称传给父组件
          this.$emit('editName', this.newName)
          // 关闭弹出层
          this.$emit('close')

          this.$toast.success('保存成功')
        }catch(err) {
          if(err && err.response && err.response.status === 409) {
            this.$toast.fail('昵称已存在')
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  .name-filed {
    padding: 20px;
  }
</style>