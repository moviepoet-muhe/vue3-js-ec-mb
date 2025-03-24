
import Home from '@/views/home/index.vue'
import Category from '@/views/category/index.vue'
import Cart from '@/views/cart/index.vue'
import Mine from '@/views/mine/index.vue'


const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    name: 'home',
    path: '/home',
    components: {
      default: Home,
      footer: () => import('@/components/TabBar.vue')
    },
    meta: {
      title: '首页', icon: 'home-o'
    }
  },

  {
    name: 'category',
    path: '/category',
    components: {
      header: () => import('@/components/NavBar.vue'),
      default: Category,
      footer: () => import('@/components/TabBar.vue')
    },
    meta: {
      title: '分类', icon: 'list-switch'
    }
  },

  {
    name: 'cart',
    path: '/cart',
    components: {
      header: () => import('@/components/NavBar.vue'),
      default: Cart,
      footer: () => import('@/components/TabBar.vue')
    },
    meta: {
      title: '购物车', icon: 'shopping-cart-o', isLogin: true
    }
  },

  {
    name: 'mine',
    path: '/mine',
    components: {
      header: () => import('@/components/NavBar.vue'),
      default: Mine,
      footer: () => import('@/components/TabBar.vue')
    },
    meta: {
      title: '我的', icon: 'user-o', isLogin: true
    }
  },


  {
    path: '/details',
    components: {
      header: () => import('@/components/NavBar.vue'),
      default: () => import('@/views/details/index.vue')
    },
    meta: {
      title: '商品详情'
    }
  },

  {
    path: '/login',
    components: {
      header: () => import('@/components/NavBar.vue'),
      default: () => import('@/views/login/index.vue')
    },
    meta: { title: '用户登录' }
  },

  {
    path: '/register',
    components: {
      header: () => import('@/components/NavBar.vue'),
      default: () => import('@/views/register/index.vue')
    },
    meta: { title: '用户注册' }
  },

  {
    path: '/search',
    components: {
      header: () => import('@/components/NavBar.vue'),

      default: () => import('@/views/search/index.vue')
    },
    meta: { title: '搜索' }
  },


  {
    path: '/:pathMatch(.*)*',
    components: {
      default: () => import('@/views/not-found/index.vue')
    }
  }


]

export default routes;