import serves from "@/utils/serves"

// 轮播图请求
export const getBannersList = () => serves.get('/api/tab/1')


// 获取为您推荐商品列表数据
export const getShoppingList = (start = 1) => serves.get(`/api/tab/1/feeds`, { params: { start } })
