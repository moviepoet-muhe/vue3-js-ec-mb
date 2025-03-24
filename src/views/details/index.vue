<template>
  <div class="details">
    <!-- 轮播图组件 -->
    <van-swipe :autoplay="3000" lazy-render height="375">
      <van-swipe-item v-for="image in images" :key="image.id">
        <img :src="image.url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品相关的描述信息 -->
    <section>
      <p><b>￥{{ shooping.price?.toFixed(2) }}</b><del>原价：￥{{ shooping.originPrice?.toFixed(2) }}</del><van-tag
          color="#ee0a24" text-color="white" style="margin-right: 10px; float: right;">已售300+</van-tag></p>
      <h3><van-icon name="fire" style="margin-right: 10px; color: #ee0a24;" />{{ shooping.title }}</h3>
      <div class="goods-van-tag">
        <van-tag color="#ee0a24" text-color="white">销量3W+</van-tag>
        <van-tag color="#ee0a24" text-color="white">超千人加购</van-tag>
        <van-tag color="#ffe1e1" text-color="#6b6c6d">我买过的店</van-tag>
        <van-tag color="#ff9018" text-color="white">一件包邮</van-tag>
      </div>
      <div class="entitlement">
        <p style="color: green;">预计7小时内发货&nbsp;&nbsp;|&nbsp;&nbsp;承诺48小时内发货</p>
        <p>四川成都&nbsp;快递：免运费</p>
        <p>88VIP退货包运费&nbsp;&nbsp;|&nbsp;&nbsp;退货宝&nbsp;&nbsp;|&nbsp;&nbsp;假一赔十&nbsp;&nbsp;|&nbsp;&nbsp;极速退款</p>
      </div>
    </section>

    <!-- 商品详情 -->
    <van-tabs v-model:active="active">
      <van-tab title="商品介绍">
        <img style="margin-top: 10px;" v-for="item in shooping.descContentList" :src="item.url" :key="item.id" alt="">
      </van-tab>
      <van-tab class="service" title="售后保障">
        <p>本商品质保周期为1年质保，在此时间范围内可提交维修申请，具体请以厂家服务为准。 </p>
        <p>售后服务电话：400-88-88888</p>
        <p>品牌官方网站： <a href="#">http://www.bing.com/</a></p>
        <van-divider dashed>服务承诺</van-divider>
        <p> 天天优选向您保证所售商品均为正品行货，开具机打发票或电子发票。 凭质保证书及商城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证，请您放心购买！ </p>
        <p> 注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、
          产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p>
        <van-divider dashed>权利声明</van-divider>
        <p> 天天优选上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是商城重要的经营资源，未经许可，禁止非法转载使用。 </p>
        <p><b>注：</b>本站商品信息均来自于厂商，其真实性、准确性和合法性由信息拥有者（厂商）负责。本站不提供任何保证，并不承担任何法律责任。</p>
      </van-tab>
    </van-tabs>


    <!-- 底部组件 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" dot color="#ee0a24" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="badge" @click="$router.push('/cart')" />
      <van-action-bar-icon icon="share-o" text="分享" @click="showShare = true" />
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" />
      <van-action-bar-button type="warning" text="加入购物车" @click="addCartFn" />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>

    <van-back-top right="5vw" bottom="10vh" />

  </div>
</template>

<script>
import { getDetail } from '@/api/details'
import { useCartStore } from '@/stores/cart'
import { isAuthenticated } from '@/utils/auth';
const useCart = useCartStore()
import { showToast } from 'vant';


export default {
  name: 'Details',

  created() {
    this.getDetailFn()
  },

  data() {
    return {
      images: [],
      shooping: {},
      active: 0,
      detail: {},
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],

    }
  },

  computed: {
    badge() {
      // // 获取 id
      // const id = this.$route.query.id
      // // 进行数据对比
      // const goods = useCart.list.find(item => item.id == id)
      // if (!goods) {
      //   return 0
      // } else {
      //   return goods.amount
      // }

      // 计算购物车中所有商品的数量总和
      return useCart.list.reduce((total, item) => total + item.amount, 0)
    }
  },

  methods: {
    async getDetailFn() {
      const { data: { detail } } = await getDetail(this.$route.query.id)
      this.images = detail.photo
      this.shooping.price = detail.price
      this.shooping.title = detail.title
      this.shooping.originPrice = detail.originPrice
      this.shooping.descContentList = detail.descContentList
      this.detail = detail
    },
    addCartFn() {
      if (!isAuthenticated()) {
        showToast('请先登录')
        this.$router.push({ path: '/login', query: { path: this.$route.fullPath, id: this.$route.query.id } });
        return;
      }
      const { id, image, price, title } = this.detail
      const goods = { id, image, price, title }
      useCart.addCart(goods)
      showToast('添加成功')
    }
  },

}

</script>

<style lang="less" scoped>
.van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}

.entitlement {
  margin: 10px;

  p {
    font-size: 14px;
    color: #747576;
    line-height: 25px;
  }
}

section {
  min-height: 80px;
  background-color: #fff;
  margin: 10px 0;
  padding: 5px;

  b {
    font-size: 20px;
    color: #ee0a24;
  }

  del {
    font-size: 14px;
    margin-left: 10px;
    color: #ccc;
  }

  h3 {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 1px;
  }

  .goods-van-tag {
    margin-top: 10px;
    width: 80%;
    justify-content: space-evenly;
    display: flex;
    flex-wrap: wrap;

    .van-tag {
      padding: 3px 5px;
    }
  }
}

.van-tabs {
  min-height: 500px;
  // padding-bottom: 50px;
  padding: 0 10px 50px 10px;


  img {
    width: 100%;
  }
}


.service {
  padding: 0 10px;

  p {
    font-size: 16px;
    margin: 10px 0;
  }
}
</style>