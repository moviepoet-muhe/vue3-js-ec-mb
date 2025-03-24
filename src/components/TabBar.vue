<template>
  <div>
    <van-tabbar v-model="active" active-color="#ee0a24">
      <van-tabbar-item v-for="item in tabBarList" :key="item.path" :icon="item.meta.icon" :to="item.path">{{
        item.meta.title }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
import routes from '@/router/routes';

export default {
  name: 'TabBar',
  data() {
    return {
      active: 0
    }
  },
  computed: {
    tabBarList() {
      return routes.slice(1, -5)
    }
  },
}


</script>

<style lang="less" scoped></style>