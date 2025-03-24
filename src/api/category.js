import serves from "@/utils/serves"

// 获取分类
export const getTabs = () => serves.get('/api/tabs')

// 获取子分类
export const getGridList = (id) => serves.get(`/api/tab/${id}`)