<template>
  <div class="search">
    <form action="/">
      <!-- 添加聚焦事件，点击搜索框触发获取提示词 -->
      <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
        @focus="fetchSuggestions" />

      <!-- 热门搜索 -->
      <div class="hot-search">
        <van-tag type="danger" size="small" round>热门搜索</van-tag>
        <van-tag type="danger" size="small" round>热门搜索</van-tag>
        <van-tag type="success" size="small" round>热门搜索</van-tag>
      </div>
      <!-- 显示搜索提示词 -->
      <ul>
        <li v-for="item in suggestions" :key="item.id" @click="selectSuggestion(item.name)">
          {{ item.name }}
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search';
import { showToast } from 'vant';
export default {
  name: 'Search',

  data() {
    return {
      searchValue: '', // 搜索框绑定的值
      suggestions: [] // 存储搜索提示词
    }
  },
  methods: {
    onSearch(value) {
      if (!value) {
        // 如果搜索关键词为空，提示用户输入
        showToast('请输入搜索关键词');
        return;
      }
      // 这里可以添加实际的搜索逻辑，例如调用 API 进行搜索
      console.log(`正在搜索: ${value}`);
    },

    onCancel() {
      // 清空搜索框的值
      this.searchValue = ''
      // 清空提示词
      this.suggestions = []
    },

    // 获取搜索提示词
    async fetchSuggestions() {
      try {
        const response = await getSearchSuggestions(this.searchValue);
        if (response.code === 200) {
          // 从响应数据中提取提示词列表
          this.suggestions = response.data.list.map(item => ({
            id: item._id,
            name: item.name
          }))
        } else {
          showToast('获取搜索提示词失败，请稍后重试');
        }
      } catch (error) {
        console.error('获取搜索提示词出错:', error);
        showToast('获取搜索提示词出错，请稍后重试');
      }
    },

    // 选择搜索提示词
    selectSuggestion(suggestion) {
      console.log('选取的提示词:', suggestion);
      // 将选中的提示词设置为搜索框的值
      this.searchValue = suggestion
      // 清空提示词
      this.suggestions = []
      // 触发搜索
      this.onSearch(suggestion);
    },

  }

}

</script>

<style lang="less" scoped>
.search {
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  /* 与搜索框保持一定间距 */
  border: 1px solid #e5e5e5;
  /* 边框 */
  border-radius: 4px;
  /* 圆角 */
  background-color: #fff;
  /* 背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影 */
  overflow: hidden;
  /* 防止内容溢出 */
}

li {
  padding: 8px 12px;
  font-size: 12px;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

li:last-child {
  border-bottom: none;
}


/* 搜索框样式 */
.van-search {
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border: 1px solid #e5e5e5;
  transition: border-color 0.3s ease;
}

.van-search__content {
  padding: 8px 12px;

}

.van-search__input {
  font-size: 14px;

  color: #333;

}

.van-search__action {
  padding: 0 12px;
}

.van-search__action-text {
  color: #007aff;
  font-weight: 500;
}

.van-search:focus-within {
  border-color: #d81e06;

}
</style>