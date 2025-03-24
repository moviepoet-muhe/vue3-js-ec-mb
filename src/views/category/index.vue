<template>
  <div class="category">
    <van-tree-select v-model:main-active-index="activeIndex" width="30%" height="100%" :items="list"
      style="background-color: #c8c9cc;" @click-nav="navFn">
      <template #content>
        <van-grid>
          <van-grid-item v-for="item in categories" :icon="item.imageUrl" :text="item.title" />
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { getTabs, getGridList } from '@/api/category'
export default {
  name: 'Category',
  data() {
    return {
      activeIndex: 0,
      items: [{ text: '分组 1' }, { text: '分组 2' }],
      categories: [],
      word: ''
    }
  },
  async created() {
    const { data: { list } } = await getTabs()
    this.items = list.slice(1)
    this.navFn(0)
  },
  computed: {
    list() {
      return this.items.map(item => {
        return { id: item.id, text: item.name }
      })
    }
  },
  methods: {
    async navFn(index) {
      const id = this.items[index].id
      this.word = this.items[index].name
      const { data: { categories } } = await getGridList(id)
      this.categories = categories
    }
  }
}
</script>

<style lang='less' scoped>
.category {
  height: calc(100vh - 96px);
  background-color: orange;
  overflow: auto;
}

:deep(.van-tree-select__nav) {
  flex: 1;
  overflow: auto;
}

:deep(.van-tree-select__content) {
  flex: 3;
}
</style>
