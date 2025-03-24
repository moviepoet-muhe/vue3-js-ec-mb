<template>
  <div class="login">
    <van-notice-bar scrollable left-icon="volume-o">新春大促！新老用户注册登录即送满减券！</van-notice-bar>

    <van-image style="margin-top: 30px; " round width="100px" height="100px"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />

    <van-form style="margin-top: 30px;" autocomplete="off">
      <van-cell-group inset>
        <van-field v-model="username" name="手机号" label="手机号" placeholder="手机号"
          :rules="[{ required: true, pattern, message: '手机号码格式错误' }]" />
        <van-field v-model="password" :type="show ? 'text' : 'password'" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" :right-icon="show ? 'eye-o' : 'closed-eye'"
          @click-right-icon="switchIcon" />
      </van-cell-group>
      <div style="margin: 30px 30px;">
        <van-button round block type="primary" native-type="submit"
          style="background-color: #fff; color: red; border: none;" @click="loginFn">登录账号</van-button>
      </div>
      <van-divider :style="{ color: 'white', borderColor: 'white', padding: '0 16px', fontSize: '15px' }">
        还没有账号？点击下方按钮去注册吧
      </van-divider>
      <div style="margin: 30px 30px;">
        <van-button round block type="primary" native-type="submit"
          style="background-color: #fff; color: red; border: none;" @click="$router.push('/register')">注册账号</van-button>
      </div>

    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { showFailToast } from 'vant';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      pattern: /^1[3-9]\d{9}$/,
      show: false
    }
  },
  methods: {
    switchIcon() {
      this.show = !this.show
    },
    async loginFn() {
      try {
        console.log('开始登录请求，用户名：', this.username, '密码：', this.password);
        const { data } = await login(this.username, this.password);
        console.log('登录请求返回数据：', data);
        if (data.status != 200) {
          showFailToast(data.message);
          return;
        }
        // 登录成功，需要存储 token 
        localStorage.setItem('token', data.token);

        // 页面跳转
        // 页面跳转，添加默认路径
        // 携带未登录用户在商品详情页的商品ID用于登录后确定是哪件商品
        const id = this.$route.query.id;
        const targetPath = this.$route.query.path || '/home';
        if (id) {
          this.$router.push({ path: targetPath, query: { id } });
        } else {
          this.$router.push({ path: targetPath });
        }
      } catch (error) {
        console.error('登录请求出错：', error);
        showFailToast('登录请求出错，请稍后重试');
      }
    }
  },
}
</script>

<style lang='less' scoped>
.login {
  height: calc(100vh - 46px);
  background-color: rgba(216, 30, 6, .8);
  overflow: hidden;
  padding: 30px;
}

.van-image {
  margin-left: 110px;
}
</style>
