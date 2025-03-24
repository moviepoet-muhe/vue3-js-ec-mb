import serves from "@/utils/serves";
import { defineStore } from "pinia"

// 同步购物车数据到服务端
export const syncCart = (token, cart) => {
    return serves.put('/api/carts', { cart }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// 从服务端获取购物车数据
export const fetchCart = (token) => {
    return serves.get('/api/carts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};



// 将购物车列表数据存储到本地存储中，参数：购物车商品列表
const storageFn = (list) => {
    //使用 localStorage.setItem 将列表数据转换为 JSON 字符串并存储到名为 'cart' 的键中
    localStorage.setItem('cart', JSON.stringify(list))
}

// 定义一个名为 'cart' 的 Pinia store
// 返回一个包含购物车状态和操作方法的 store 对象
export const useCartStore = defineStore('cart', {
    //定义 store 的状态
    state() {
        return {
            // 从本地存储中获取 'cart' 键对应的数据，如果不存在则返回空数组
            // JSON.parse 用于将 JSON 字符串转换为 JavaScript 对象
            list: JSON.parse(localStorage.getItem('cart')) || []
        }
    },
    // 定义 store 的 actions，包含一系列用于操作购物车状态的方法
    actions: {
        // 向购物车中添加商品,payload - 要添加的商品信息
        async addCart(payload) {
            // this 指向 state 中的数据
            // 查找购物车中是否已存在相同 id 的商品
            const goods = this.list.find(item => item.id == payload.id)
            // 如果购物车中不存在该商品
            if (!goods) {
                // 将商品添加到购物车列表中，并设置商品的数量（默认为 1）和选中状态为 false
                this.list.push({
                    ...payload,
                    amount: payload.amount ?? 1,
                    checked: false
                })
            } else {
                // 如果商品已存在，增加该商品的数量（默认为增加 1）
                goods.amount += payload.amount ?? 1
            }

            // 商品操作完成后，将最新的购物车列表存储到本地存储中
            storageFn(this.list)
            await this.syncCartToServer(); // 同步数据到服务端
        },
        // 全选或全不选购物车中的商品,payload - 选中状态，true 表示全选，false 表示全不选
        async allSelect(payload) {
            // // 遍历购物车列表，将每个商品的选中状态设置为 payload 的值
            this.list.forEach(item => {
                item.checked = payload
            })
            // 将最新的购物车列表存储到本地存储中
            storageFn(this.list)
            await this.syncCartToServer(); // 同步数据到服务端
        },

        // 单个商品选中状态改变时的处理方法
        async singleSlect() {
            storageFn(this.list)
            await this.syncCartToServer(); // 同步数据到服务端
        },

        // 修改购物车中指定商品的数量,value - 新的商品数量,id - 商品的 id
        async count(value, id) {
            // 查找购物车中指定 id 的商品
            const targetGoods = this.list.find(item => item.id === id);
            // 如果找到该商品将该商品的数量更新为新的值
            if (targetGoods) {
                targetGoods.amount = value;
            }
            // 将最新的购物车列表存储到本地存储中
            storageFn(this.list)
            await this.syncCartToServer(); // 同步数据到服务端
        },
        // 删除购物车商品的方法 id - 要删除的商品的 id
        async deleteCartItem(id) {
            // 使用 filter 方法过滤掉购物车列表中 id 与传入 id 相同的商品
            this.list = this.list.filter(item => item.id !== id);
            // 持久化处理
            storageFn(this.list);
            await this.syncCartToServer(); // 同步数据到服务端
        },

        // 同步本地购物车数据到服务端
        async syncCartToServer() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('未找到有效的 token，无法同步购物车数据');
                return;
            }
            try {
                const response = await syncCart(token, this.list);


                if (response.code === 200) {
                    console.log('购物车数据同步成功:', response.data.message);
                } else {
                    console.error('购物车数据同步失败:', response.data.message);
                }
            } catch (error) {
                console.error('同步购物车数据时出错:', error);
            }
        },



        // 从服务端获取购物车数据
        async fetchCartFromServer() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('未找到有效的 token，无法获取购物车数据');
                return;
            }
            try {
                const response = await fetchCart(token);
                console.log(response);
                if (response.code === 200) {
                    this.list = response.data.cart;
                    storageFn(this.list);
                } else {
                    console.error('获取购物车数据失败:', response.code);
                }
            } catch (error) {
                console.error('获取购物车数据时出错:', error);
            }
        },


    }
})