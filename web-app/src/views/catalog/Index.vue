<template>
  <div class="main">
    <div class="search">
      <a href="javascript:void(5)" class="input">
        <img src="###" class="icon">
        <span class="txt">商品搜索, 共{{goodsCount}}款好物</span>
      </a>
    </div>
    <div class="catalog">
      <div class="nav">
        <div class="item" :class="currentCategory.id == item.id ? 'active' : ''" v-for="item in navList" :key="item.id" @click="switchCate(item.id)">{{item.name}}</div>
      </div>
      <div class="cate">
        <a href="javascript:void(0)" class="banner">
          <img :src="currentCategory.wap_banner_url" class="image">
          <div class="txt">{{currentCategory.front_name}}</div>
        </a>
        <div class="hd">
          <span class="line"></span>
          <span class="txt">{{currentCategory.name}}分类</span>
          <span class="line"></span>
        </div>
        <div class="bd">
          <a href="javascript:void(0)" class="item" :class="(index+1) % 3 == 0 ? 'last' : ''" v-for="(item, index) in currentCategory.subCategoryList" :key="item.id" @click="$router.push('/category/' + item.id)">
            <img :src="item.wap_banner_url" class="icon">
            <span class="txt">{{item.name}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      id: '',
      navList: [],
      categoryList: [],
      currentCategory: {},
      scrollLeft: 0,
      scrollTop: 0,
      goodsCount: 0,
      scrollHeight: 0
    }
  },
  methods: {
    getCatalog() {
      this.$http.get(urls.CatalogList).then(res => {
          this.navList = res.data.data.categoryList,
          this.currentCategory = res.data.data.currentCategory
        });
      this.$http.get(urls.GoodsCount).then(res => {
        this.goodsCount = res.data.data.goodsCount
      });
    },
    getCurrentCategory(id) {
      this.$http.get(urls.CatalogCurrent,{params:{id}})
      .then(res => {
        this.currentCategory = res.data.data.currentCategory
      })
    },
    switchCate: function (id) {
        var currentTarget = event.currentTarget;
        this.getCurrentCategory(id);
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getCatalog()
    // this.getCurrentCategory()
  }
}
</script>

<style scoped src="./style.css">
</style>