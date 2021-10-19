<template>
  <div class="update-gender">
    <van-picker 
      show-toolbar
      :columns="columns" 
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
// 性别修改不成功，可能是接口问题
// 性别修改不成功，可能是接口问题
// 性别修改不成功，可能是接口问题

import {updateUserProfile} from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.gender
    }
  },
  methods: {
    // 性别改变触发函数
    onGenderChange(picker, value, index) {
      this.defaultIndex = index
    },

    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
      })

      // 发送修改请求
      await updateUserProfile({
        gender: this.defaultIndex
      })
      
      this.$emit('change-gender', this.defaultIndex)

      this.$toast.success('保存成功')

      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>