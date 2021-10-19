<template>
  <div class="update-gender">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onChangeBirthday"
    />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
     async onChangeBirthday() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })

      // const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`

      // console.log('aa',(birthday | datetime(YYYY-MM-DD)));
      await updateUserProfile({
        birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
      })

      this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))

      // 关闭弹出层
      this.$emit('close')

      this.$toast.success('修改成功')
    }
  }
}
</script>

<style>

</style>