<template>
  <div class="user-profile">
    <!-- 头部 -->
    <!-- $router.back() 从那来回哪去 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"  
    />
    <!-- 头像 -->
    <van-cell 
      title="头像" 
      center 
      is-link 
      @click="$refs.file.click()"
    >
      <van-image
        fit="cover"
        round
        width="30"
        height="30"
        :src="user.photo"
      />
    </van-cell>

    <!-- 选择图片弹窗 -->
    <input 
      type="file" 
      hidden 
      ref="file"
      accept="image/*"
      @change="onFileChange"
    >

    <!-- 昵称 -->
    <van-cell 
      title="昵称" 
      is-link 
      :value="user.name"
      @click="isEditNameShow=true"
    />
    <!-- 性别 -->
    <van-cell 
      title="性别" 
      is-link 
      :value="user.gender ? '女' : '男'"
      @click="isEditGenderShow=true"
    />
    <!-- 生日 -->
    <van-cell 
      title="生日" 
      is-link 
      :value="user.birthday"
      @click="isEditBirthdayShow=true"
    />

    <!-- 修改昵称弹出层 -->
    <van-popup 
      v-model="isEditNameShow" 
      position="bottom" 
      :style="{ height: '100%' }" 
    >
      <update-name
        v-if="isEditNameShow"
        @close="isEditNameShow=false"
        :name="user.name"
        @editName="user.name = $event"
      />
    </van-popup>

    <!-- 修改性别弹出层 -->
    <van-popup 
      v-model="isEditGenderShow" 
      position="bottom" 
    >
      <update-gender
        v-if="isEditGenderShow"
        :gender="user.gender"
        @close="isEditGenderShow=false"
        @change-gender="user.gender=$event"
      />
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <!-- <update-birthday
        v-if="isEditBirthdayShow"
        :birthday="user.birthday"
        @update-birthday="user.birthday=$event"
        @close="isEditBirthdayShow=false"
      /> -->
      <update-birthday
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow=false"
      />
    </van-popup>

    <!-- 修改头像弹出层 -->
    <van-popup
      class="photo-edit"
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-if="isEditPhotoShow"
        @close="isEditPhotoShow=false"
        :file="previewImage"
        @update-photo="user.photo=$event"
      />
    </van-popup>
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data() {
    return {
      user: {},    // 用户信息
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false,
      previewImage: null    // 预览图片
    }
  },
  methods: {
    async loadUserProfile() {
      const {data} = await getUserProfile()
      
      this.user = data.data
    },

    // 选中图片
    onFileChange() {
      this.isEditPhotoShow = true

      // 在弹出层预览图片
      const file = this.$refs.file.files[0]
      this.previewImage = file

      // 解决打开相同图片不触发的问题
      this.$refs.file.value = ''
    }
  },
  created() {
    this.loadUserProfile()
  }
}
</script>

<style scoped lang="less">
  .van-popup {
    background-color: #f5f7f9;
  }
  .photo-edit {
    background-color: #000;
  }
</style>