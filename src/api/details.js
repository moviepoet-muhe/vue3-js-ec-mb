import serves from "@/utils/serves"
// 获取商品详情
export const getDetail = (id) => serves.get('/api/detail', { params: { id } })