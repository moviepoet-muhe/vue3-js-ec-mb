<template>
  <div class="cart">
    <!-- v-if 判断购物车列表是否有商品 -->
    <template v-if="useCart.list.length">
      <!-- 通知栏 -->
      <van-notice-bar mode="link" scrollable left-icon="fire-o" @click="$router.push('/home')">新春大促！快来瞧一瞧！看一看！总有一款适合你！
      </van-notice-bar>

      <!-- 遍历购物车列表 -->
      <van-swipe-cell v-for="item in list" :key="item.id">
        <!-- 商品卡片组件，显示商品信息 -->
        <van-card :title="item.title" class="goods-card">
          <template #thumb>
            <!-- 复选框组件，控制商品是否选中 -->
            <van-checkbox v-model="item.checked" checked-color="#ee0a24" style="margin-right: 10px;"
              @change="singleFn"></van-checkbox>
            <img :src="item.image" style="width: 90px; height: 90px;">
          </template>
          <!-- 商品价格 -->
          <template #price>
            <span>￥{{ item.price?.toFixed(2) }}</span>
            <!-- 商品数量选择器，数量与商品的 amount 属性绑定 -->
            <van-stepper v-model="item.amount" theme="round" button-size="22" disable-input
              @change="countFn($event, item.id)" />
          </template>
        </van-card>

        <!-- 滑动单元格的右侧操作区域 -->
        <template #right>
          <!-- 删除按钮，点击时调用 deleteItem 方法，传入商品 ID -->
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteItem(item.id)" />
        </template>
      </van-swipe-cell>

      <!-- 提交订单栏，显示总价和提交按钮 -->
      <van-submit-bar :price="total * 100" button-text="提交订单">
        <!-- 全选复选框，选中状态与 checked 计算属性绑定 -->
        <van-checkbox v-model="checked" checked-color="#ee0a24">全选</van-checkbox>
        <template #tip>
          默认发货地址：四川省&nbsp;|&nbsp;成都市&nbsp;|&nbsp;高新区&nbsp;|&nbsp;中和镇&nbsp;&nbsp; <span class="change-address"
            @click="$router.push('/mine')">去修改地址</span>
        </template>
      </van-submit-bar>
    </template>

    <!-- 购物车列表为空时显示的内容 -->
    <template v-else>
      <van-notice-bar mode="link" scrollable left-icon="fire-o"
        @click="$router.push('/home')">新春大促！快来瞧一瞧！看一看！总有一款适合你！</van-notice-bar>
      <van-empty description="购物车是空的~">
        <van-button type="primary" size="small" @click="$router.push('/home')">快去选购吧！</van-button>
      </van-empty>
    </template>
    <!--回到顶部 -->
    <van-back-top right="5vw" bottom="20vh" />
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'Cart',
  setup() {
    // 调用 useCartStore 函数来获取购物车的 store 实例 useCart
    // 通过 return 语句把 useCart 暴露出去，这样在模板里就能使用它了
    const useCart = useCartStore()
    return {
      useCart
    }
  },

  async mounted() {
    const cartStore = useCartStore();
    // 从服务端获取购物车数据
    await cartStore.fetchCartFromServer()
    // 同步本地购物车数据到服务端
    await cartStore.syncCartToServer();

  },


  computed: {
    list() {
      // list 是一个计算属性，它返回 useCart 实例中的 list 属性，也就是购物车中的商品列表。在模板里可以直接使用 list 来展示商品列表。
      return this.useCart.list
    },

    checked: {
      // getter：首先检查购物车列表是否为空，若为空则返回 false；若不为空，则使用 every 方法检查列表中的每个商品是否都被选中，
      // 若都选中则返回 true，否则返回 false
      get() {
        if (!this.useCart.list.length) {
          return false
        }
        return this.useCart.list.every(item => item.checked)
      },
      // 当 checked 的值被修改时，调用 useCart 实例的 allSelect 方法，将 value 作为参数传入，以此实现全选或全不选的功能
      set(value) {
        this.useCart.allSelect(value)
      }
    },
    // 使用 reduce 方法对购物车列表进行遍历。对于每个被选中的商品（item.checked 为 true），将其数量乘以价格，然后累加到 sum 中。最后返回选中商品的总价
    total() {
      return this.useCart.list.reduce((sum, item) => {
        if (item.checked) {
          sum += item.amount * item.price
        }
        return sum
      }, 0)
    }
  },

  methods: {
    // 单个商品的选中状态改变时被调用，它调用 useCart 实例的 singleSlect 方法来处理单个商品选中状态的变更。
    singleFn() {
      this.useCart.singleSlect()
    },
    // 方法在商品数量改变时被调用
    countFn(value, id) {
      this.useCart.count(value, id)
      console.log(`商品 ID 为 ${id} 的新数量是: ${value}`);
    },
    // 在删除商品时被调用，它调用 useCart 实例的 deleteCartItem 方法，传入商品的 id 作为参数，从而从购物车中删除指定的商品。
    deleteItem(id) {
      this.useCart.deleteCartItem(id);
    },
  }
}
</script>

<style lang='less' scoped>
@white: #fff;

.cart {
  height: calc(100vh - 96px);
  overflow: auto;
  padding-bottom: 100px;
}

.van-submit-bar {
  bottom: 50px;
}

.goods-card {
  margin: 5px 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}

:deep(.van-card__thumb) {
  width: 34vw;
  display: flex;
}

:deep(.van-card__price) {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

:deep(.van-stepper--round .van-stepper__plus) {
  background-color: #ee0a24;
}

:deep(.van-stepper--round .van-stepper__minus) {
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
  color: #fff;
}

.van-button {
  width: 100px;
  background-color: #ee0a24;
  border: none;
  border-radius: 10px;
}

.change-address {
  color: #ee0a24;
  font-weight: bold;
}
</style>
