<template>
  <div class="main">
    <div class="cate-nav">
      <van-tabs class="cate-nav-body">
        <van-tab v-for="item in navList" :title="item.name" class="item" :class="id == item.id ? 'active' : ''">
          <div class="name">{{item.name}}</div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="cate-item">
      <div class="h">
        <span class="name">{{currentCategory.name}}</span>
        <span class="desc">{{currentCategory.front_name}}</span>
      </div>
      <div class="b">
        <a href="javascript:void(0)" class="item" :class="(index + 1) % 2 == 0 ? 'item-b' : ''" v-for="item in goodsList" @click="$router.push('/goods/' + item.id)">
          <img :src="item.list_pic_url" class="img">
          <span class="name">{{item.name}}</span>
          <span class="name">￥{{item.retail_price}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      index: null,
      navList: [],
      goodsList: [],
      id: '',
      currentCategory: [],
      scrollLeft: 0,
      scrollTop: 0,
      scrollHeight: 0,
      page: 1,
      size: 10000
    }
  },
  methods: {
    getCategoryInfo () {
      this.$http.get(`${urls.GoodsCategory}?id=${ this.id }`)
        .then(res => {
          if (res.data.errno == 0) {
            this.navList = res.data.data.brotherCategory
            this.currentCategory = res.data.data.currentCategory

            //nav位置
            // let currentIndex = 0;
            // let navListCount = this.data.data.navList.length;
            // for (let i = 0; i < navListCount; i++) {
            //   currentIndex += 1;
            //   if (this.data.navList[i].id == this.data.id) {
            //     break;
            //   }
            // }
            // if (currentIndex > navListCount / 2 && navListCount > 5) {
            //   scrollLeft: currentIndex * 60
            // }
            // this.getGoodsList();
          } else {
            //显示错误信息
          }
        });
    },
    getGoodsList () {
      this.$http.get(`${urls.GoodsList}?categoryId=${this.id}&page=${this.totalPages}&size=${this.pageSize} `)
        .then(res => {
          this.goodsList = res.data.data.goodsList
        })
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getCategoryInfo()
    this.getGoodsList()
  }
}
</script>

<style scoped src="./style.css">
</style>