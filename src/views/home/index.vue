<template>
  <div class="home">
    <!-- 搜索区域 -->
    <van-search v-model="value" shape="round" background="#d81e06" placeholder="请输入搜索关键词" show-action autocomplete="off"
      @click-input="handleSearchClick">
      <template #left>
        <van-icon name="apps-o" color="#fff" style="margin-right: 10px;" size="23" />
      </template>
      <template #action>
        <span style="color: #fff;" @click="handleLoginOrLogout">{{ isLoggedIn ? '退出登录' : '登录' }}</span>
      </template>
    </van-search>

    <!-- 轮播区域 -->
    <swiper :autoplay="{
      delay: 1000, disableOnInteraction: true,
    }" :pagination="{
      clickable: true,
    }" :effect="'cube'" :cubeEffect="{
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }" :modules="modules">
      <swiper-slide v-for="item in banners" :key="item.id"> <img :src="item.image" /></swiper-slide>
    </swiper>

    <!-- 导航区域 -->
    <van-grid :column-num="5" square style="margin-top:10px;">
      <van-grid-item v-for="item in gridList" :key="item.id" :icon="item.icon" :text="item.text" />
    </van-grid>

    <!-- 秒杀区域 -->
    <div class="seckill">
      <div class="time">
        <b>秒杀</b>
        <span style="color: #d81e06;margin: 0 10px;font-size: 14px;">{{ session }}点场</span>
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours < 10 ? '0' + timeData.hours : timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>

      <!-- 秒杀下面滑动商品列表 -->
      <div class="slider-list">
        <swiper :autoplay="{
          delay: 1000, disableOnInteraction: true,
        }" :slidesPerView="3" :spaceBetween="10" :modules="modules" class="mySwiper">
          <swiper-slide v-for="item in seckillGoodsList" :key="item.id">
            <div class="one-good">
              <img :src="item.image">
              <span>￥{{ item.price }}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!--回到顶部 -->
      <van-back-top right="5vw" bottom="10vh" />

    </div>

    <!-- 分隔线 -->
    <van-divider :style="{ color: 'black', borderColor: 'black', margin: '30px 0', fontWeight: 900 }">为您推荐</van-divider>

    <!-- 商品列表区域 -->
    <div class="shopping-list">
      <!-- 触底加载组件 -->
      <van-list v-model:loading="loading" :finished="finished" finished-text="我也是有底线的" @load="onLoad"
        :immediate-check="true">
        <ul>
          <li v-for="item in goodsList" :key="item.id"
            @click="$router.push({ path: '/details', query: { id: item.id } })">
            <img :src="item.image">
            <van-text-ellipsis :content="item.title" rows="2" />
            <p><span>￥{{ item.price }}</span><del>原价：￥{{ item.originPrice }}</del></p>
          </li>
        </ul>
      </van-list>
    </div>

  </div>

</template>

<script>
import { Pagination, Autoplay, EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import { getBannersList, getShoppingList } from "@/api/home.js";
import { showToast } from 'vant';
import { isAuthenticated, logout } from '@/utils/auth';


export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      value: '',
      // 轮播图数据
      banners: [],

      // 导航区域数据
      gridList: [
        {
          id: 1,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 2,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 3,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 4,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 5,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 6,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 7,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 8,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 9,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
        {
          id: 10,
          icon: 'http://113.45.10.129:3000/assets/1-f250340d.png',
          text: '优选超市',
        },
      ],
      // 倒计时数据
      time: 2000000,
      // 秒杀范围
      seckillList: [0, 8, 10, 12, 14, 16, 20, 23],
      // 秒杀场次
      session: 14,
      goodsList: [], // 商品数组
      start: 1, // 下一页数据起始索引
      loading: false, // 表示数据是否更新完毕，默认是 false，在数据加载的时候 会自动设置为 true，当加载完毕后需要手动设置成 false
      finished: false, // 表示数据全部加载完

      // 秒杀商品轮播图数据
      seckillGoodsList: [
        {
          id: 1,
          price: 100,
          image: 'https://img.alicdn.com/bao/uploaded/i1/3293538305/O1CN010QFW6D2BDk1qswxkN_!!3293538305.jpg'
        },
        {
          id: 2,
          price: 100,
          image: 'https://img.alicdn.com/bao/uploaded/i4/2938780193/O1CN01UE0FDb1DIR1aYIwM5_!!0-item_pic.jpg'
        },
        {
          id: 3,
          price: 100,
          image: 'https://img.alicdn.com/bao/uploaded/i3/447974061/O1CN01i6Eal21frz5fCmqfw_!!447974061.jpg'
        },
        {
          id: 4,
          price: 100,
          image: 'https://img.alicdn.com/bao/uploaded/i2/2702551882/O1CN01krfMov1Pm00WcwN3s_!!2702551882.jpg'
        },
        {
          id: 5,
          price: 100,
          image: 'https://img.alicdn.com/bao/uploaded/i1/447974061/O1CN01Ozpt8q1fryxzWnMbQ_!!447974061.jpg'
        },
        {
          id: 6,
          price: 100,
          image: 'https://img.alicdn.com/bao/uploaded/i4/883604841/O1CN01FAtB691ldDwZuVw6o_!!0-item_pic.jpg'
        }

      ],
      //标记用户是否登录
      isLoggedIn: false,

      // swiper 模块
      modules: [Pagination, Autoplay, EffectCube]
    }
  },

  // 方法调用
  created() {
    // 调用获取轮播图列表
    this.getBannersListFn()
    // 调用获取商品列表
    this.getSeckillFn()
    // 检查登录状态
    this.checkLoginStatus()
  },


  methods: {
    // 获取轮播图数据
    async getBannersListFn() {
      const { code, data: { banners } } = await getBannersList()
      if (code === 200) {
        this.banners = banners
      }
    },

    // 计算秒杀场次
    getSeckillFn() {
      // 获取当前时间
      const d = new Date()
      const h = d.getHours()
      // 计算当前时间距离最近的场次
      const index = this.seckillList.findIndex(item => item > h)
      // 设置当前场次
      this.session = this.seckillList[index - 1]

      // 获取现在的时间戳
      const nowTime = d.getTime()
      // 结束的时间设置
      d.setHours(this.seckillList[index])
      d.setMinutes(0)
      d.setSeconds(0)
      d.setMilliseconds(0)
      // 倒计时毫秒计算
      this.time = d.getTime() - nowTime
    },

    // 获取商品列表
    async getShoppingListFn() {
      const { data: { list, isEnd, nextIndex } } = await getShoppingList(this.start)
      // nextIndex 下一页数据起始索引
      // isEnd 是否所有数据全部查询完毕
      // list 商品数组
      // 无限加载的逻辑：每次请求的数据 + 之前的数据
      this.goodsList = [
        ...this.goodsList, // 表示之前的数据
        ...list // 表示每次请求回来的数据
      ]
      // 表示从哪里开始加载下一页
      this.start = nextIndex
      this.finished = isEnd
      this.loading = false
    },

    onLoad() {
      this.getShoppingListFn()
    },

    // 检查登录状态
    checkLoginStatus() {
      this.isLoggedIn = isAuthenticated();
    },

    // 处理登录或退出登录
    handleLoginOrLogout() {
      if (this.isLoggedIn) {
        logout();
        this.isLoggedIn = false;
        this.$router.push({ path: '/login' });
      } else {
        this.$router.push({ path: '/login', query: { path: '/home' } });
      }
    },

    // 跳转到搜索页面
    handleSearchClick() {
      this.$router.push('/search');
    },


  },


}
</script>

<style lang='less'>
.van-search {
  height: 54px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.home {
  background: #d81e06;
}

.swiper .swiper-slide {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper .swiper-slide img {
  width: 100%;
  height: 100%;
}

.swiper .swiper-button-prev,
.swiper .swiper-button-next {
  color: #d81e06 !important;
  font-size: 10px !important;
}

.swiper .swiper-pagination-bullet-active {
  background-color: #d81e06 !important;
}

.seckill {
  margin: 10px 0;
  height: 200px;
  background-color: #fff;
}

.seckill .time {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.seckill .colon {
  display: inline-block;
  margin: 0 4px;
  color: #1989fa;
}

.seckill .block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #d81e06;
}

.seckill .slider-list {
  width: 100%;
  height: 150px;
}

.shopping-list {
  min-height: 500px;
  padding-bottom: 100px;
}

.shopping-list ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.shopping-list ul li {
  width: 49%;
  height: 200px;
  background-color: #fff;
  padding: 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-bottom: 10px;
}

.shopping-list ul li p {
  line-height: 23px;
}

.shopping-list ul li p span {
  margin-right: 10px;
  font-size: 13px;
  color: red;
}

.shopping-list ul li p del {
  color: #ccc;
}

.shopping-list ul li img {
  width: 100%;
  height: 120px;
}

.slider-list {
  text-align: center;
}

.slider-list span {
  width: 50px;
  height: 20px;
  color: red;
  font-size: 16px;
}

.van-list__finished-text {
  color: black !important;
}

:root:root {
  --van-back-top-background: red;
}
</style>
