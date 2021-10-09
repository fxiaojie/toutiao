<template>
  <div class="login-container">
    <!-- 头部 -->
    <!-- $router.back() 从那来回哪去 -->
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"  
    />

    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false" 
      validate-first  
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        label="手机号"
        icon-prefix="icon"
        left-icon="shouji1"
        placeholder="请输入手机号"
        name="mobile"
        center
        :rules="formRules.mobile"
      />
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        clearable
        label="验证码"
        icon-prefix="icon"
        left-icon="yanzhengma1"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code"
      >
        <!-- 发送验证码 -->
        <template #button>
          <van-count-down
            v-if="isCountDownShow" 
            :time="1000 * 60" 
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button 
            v-else
            size="mini" 
            class="send-btn" 
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button type="info" block class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'  // Toast 需要引入

export default {
  name: 'LoginIndex',
  data() {
    return {
      // 表单
      user: {
        mobile: '18888888888',  // 手机号
        code: '246810'  // 验证码
      },

      // 验证规则
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|6|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },

      // 倒计时显示
      isCountDownShow: false,

      // Loading
      isSendSmsLoading: false
    }
  },
  methods: {
    // 登录
    async onLogin() {
      Toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0   // 展示时长(ms)，值为 0 时，toast 不会消失
      })

      try { // 捕获异常
        const { data } = await login(this.user)
        Toast.success('登陆成功')

        // 将后端返回的用户登录状态（token等信息）收到 vuex 容器中
        this.$store.commit('setUser', data.data)

        // 登陆成功，返回原来页面
        this.$router.back()

      } catch(err) {
        Toast.fail('登陆失败')
      }
    },

    // 格式错误
    onFailed(error) {
      Toast({
        message: error.errors[0].message,
        position: 'top'
      })
    },

    // 发送验证码
    async onSendSms() {
      try {
        // 手机号格式校验
        await this.$refs['login-form'].validate('mobile')

        // 防止用户多次点击
        this.isSendSmsLoading = true

        // 发送验证码
        await sendSms(this.user.mobile)

        // 显示倒计时
        this.isCountDownShow = true
      } catch(err) {
        // try 里面的任何错误都会进入 catch
        let message = ''
        if(err && err.response && err.response.status === 429) {
          // 发送频繁
          message = '发送验证码频繁，请稍后重试'
        } else if (err.name == 'mobile') {
          // 手机号格式错误
          message = err.message
        } else {
          message = '未知错误'
        }
        // 提示消息
        Toast({
          message,
          position: 'top'
        })
      }

      // 无论成功与否，关闭加载 Loading
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    .send-btn { // 未调整成功
    //   width: 76px;
    //   height: 23px;
      background-color: #ededed;
      .van-button__text {
        font-size: 11px;
        color: #666;
      }
    }
    .login-btn-wrap {
      padding: 26px 16px;
      .login-btn {
        background-color: #6db4fb;
        border: none;
        .van-button__text {
          font-size: 15px;
        }
      }
    }
  }
</style>