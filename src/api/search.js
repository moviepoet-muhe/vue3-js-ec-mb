import serves from "@/utils/serves"

// 获取搜索提示词
export const getSearchSuggestions = (word) => {
  return serves.get('/api/search/suggest', {
    params: {
      word
    }
  })
}