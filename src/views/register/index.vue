<template>
  <div class="register">
    <van-steps :active="active" active-color="red">
      <van-step>验证手机号</van-step>
      <van-step>发送验证码</van-step>
      <van-step>注册账号</van-step>
      <van-step>完成注册</van-step>
    </van-steps>

    <van-cell-group inset style="margin-top: 30px; padding: 5px;" v-if="active === 0">
      <van-field v-model="tel" type="tel" label="请输入手机号:" placeholder="请输入手机号" />
      <van-button type="danger" size="small" style="float: right; margin-top: 10px;" @click="isPhoneFn">下一步</van-button>
    </van-cell-group>

    <van-cell-group inset style="margin-top: 30px; padding: 10px;" v-if="active === 1">
      <van-field v-model="tel" type="tel" label="手机号" />
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="短信验证码">
        <template #button>
          <van-button size="small" type="danger" @click="getCodeFn">发送验证码</van-button>
        </template>
      </van-field>
      <van-button type="danger" size="small" style="float: right; margin-top: 10px;" @click="nextFn">下一步</van-button>
    </van-cell-group>

    <van-cell-group inset style="margin-top: 30px; padding: 5px;" v-if="active === 2">
      <van-field v-model="tel" type="tel" label="手机号" />

      <van-field v-model="password" :type="show ? 'text' : 'password'" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" :right-icon="show ? 'eye-o' : 'closed-eye'"
        @click-right-icon="switchIcon" />

      <van-button type="danger" size="small" style="float: right; margin-top: 10px;" @click="registerFn">注册</van-button>
    </van-cell-group>

    <van-cell-group inset style="margin-top: 30px; padding: 5px; height: 200px; text-align: center;"
      v-if="active === 3">
      <h3 style="margin-top: 30px;">注册成功</h3>
      <van-button type="danger" size="small" style="margin-top: 30px;" @click="$router.push('/login')">返回登录</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { isPhone, getCode, register, isCode, bindUsername } from '@/api/register'
import { showToast } from 'vant';
export default {
  name: 'Register',
  data() {
    return {
      active: 0,
      // 手机号
      tel: '',
      // 验证码
      sms: '',
      // 密码
      password: '',
      // 密码显示
      show: false,
      // 用户名
      nickname: ''
    }
  },
  methods: {
    // 验证手机号 
    async isPhoneFn() {
      if (this.tel == '') {
        showToast('手机号不能为空')

        return
      }
      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(this.tel)) {
        showToast('手机号格式错误！请输入有效的手机号');
        return;
      }

      // const { data: { status, message } } = await isPhone(this.tel)

      // if (status == 200) {

      //   showFailToast(message)
      //   return
      // }

      const response = await isPhone(this.tel);
      // 检查 response 中 data 是否存在
      if (response && response.data) {
        const { status, message } = response.data;
        if (status === 200) {

          showToast(message);
          return;
        }
      } else {
        showToast('服务器响应异常，请稍后重试');
        return;
      }

      // 如果代码走到这里说明可以进行下一步操作
      this.active = 1
    },
    // 发送验证码
    async getCodeFn() {
      const { data: { code } } = await getCode(this.tel)
      this.sms = code
    },
    // 下一步
    async nextFn() {
      // 调用 isCode 函数进行验证码验证
      const response = await isCode(this.tel, this.sms);
      const { code, data: { status, message } } = response;
      if (code === 200 && status === 200) {
        // 验证码验证成功，进入下一步
        showToast('验证码验证成功')
        this.active = 2
      } else {
        // 验证码验证失败，显示错误信息
        showToast(message)
      }
    },

    // 注册
    async registerFn() {
      // 定义密码验证正则表达式
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      // 验证密码格式
      if (!passwordRegex.test(this.password)) {
        showToast('密码必须至少包含一个大写字母、一个小写字母，且长度为8位及以上');
        return;
      }

      const { data: { status, message } } = await register(this.tel, this.password);
      if (status === 200) {
        showToast(message);
        this.active = 3;
      }
    },
    // 切换密码显示
    switchIcon() {
      this.show = !this.show
    }
  }
}
</script>

<style lang='less' scoped>
.register {
  height: calc(100vh - 46px);
  background-color: rgba(216, 30, 6, .8);
  overflow: hidden;
  padding: 10px;
}

:deep(.van-cell__title) {
  width: 100px;
}
</style>
