<template>
  <div class="navbar">
    <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-popover v-model:show="showPopover" :actions="actions" :offset="[-50, 20]" @select="select">
          <template #reference>
            <i class="more">···</i>
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { logout } from '@/utils/auth';
export default {
  name: 'NavBar',
  data() {
    return {
      showPopover: false,
      actions: [
        { text: '首页', icon: 'home-o', path: '/home' },
        { text: '购物车', icon: 'shopping-cart-o', path: '/cart' },
        { text: '退出登录', icon: 'more-o', path: '/login' },
        { text: '个人中心', icon: 'user-o', path: '/mine' },
      ],
    }
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    },

    // 点击时触发
    select(action) {
      if (action.text === '退出登录') {
        logout()
      }
      this.$router.push(action.path)
    }
  },



}

</script>

<style lang="less" scoped>
:deep(.van-popover__arrow) {
  left: 84% !important;
}

:deep(.van-nav-bar__left i) {
  color: #d81e06 !important;
}

:deep(.van-nav-bar__text) {
  color: #d81e06 !important;
}

.more {
  font-size: 15px;
  color: #d81e06;
}
</style>