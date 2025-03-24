import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { showToast } from 'vant';
import { isAuthenticated } from '../utils/auth';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

/*
    全局前置路由守卫
    + to: 即将要进入的目标 
    + from: 当前导航正要离开的路由 
*/
router.beforeEach((to, from) => {
  if (isAuthenticated()) {
    if (to.path === '/login') {
      showToast('您已经登录了');
      return { path: '/home' };
    }
  } else {
    if (to.meta.isLogin) {
      showToast('您还未登录，请先登录');
      return { path: '/login', query: { path: to.path } };
    }
  }
  return true;
})


export default router