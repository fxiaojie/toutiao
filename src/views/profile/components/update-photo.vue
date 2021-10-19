<template>
  <div class="update-photo">
    <!-- 图片预览 -->
    <img class="image" :src="image" ref="image">
    <!-- 底部工具栏 -->
    <van-nav-bar
      class="toolnavbar"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import {updateUserPhoto} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      type: File,
      required: true
    }
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null     // 裁切器实例
    }
  },
  methods: {
    getCroppedCanvas() {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      }) 
    },

    async onClickRight() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0   // 持续展示
      })
      
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      
      // 如果要求 Content-Type 是	multipart/form-data，则一定要提交 FormData 数据对象，撰文用于文件上传的，不能提交 {}，没用
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await updateUserPhoto(fd)

      // 更新父组件中的头像
      this.$emit('update-photo', window.URL.createObjectURL(file))

      this.$emit('close')

      this.$toast.success('修改成功')
    }
  },
  mounted() {
    // 裁切图片
    const image = this.$refs.image
     this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style scoped lang="less">
  .toolnavbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
  }
  .image {
    display: block;
    max-width: 100%;
  }
</style>