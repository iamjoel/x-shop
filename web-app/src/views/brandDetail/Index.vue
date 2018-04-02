<template>
  <div class="main">
    <div class="brand-info">
      <div class="name">
        <img :src="brand.app_list_pic_url" class="img">
        <div class="info-box">
          <div class="info">
            {{brand.name}}
            <span class="txt">{{brand.name}}</span>
            <span class="line"></span>
          </div>
        </div>
      </div>
      <div class="desc">{{brand.simple_desc}}</div>
    </div>

    <!-- <div class="cate-item">
      <div class="b">
        <div v-for="item in goodsList" :key="item.id"></div>
        <a href="javascript:void(0)" class="item" :class="index % 2 == 0 ? 'item-b' : ''">
          <img :src="item.list_pic_url" class="img">
          <span class="name">{{item.name}}</span>
          <span class="price">￥{{item.retail_price}}</span>
        </a>
      </div>
    </div> -->
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      id: '',
      index: null,
      brand: [],
      goodsList: [],
      page: 1,
      size: 1000
    }
  },
  methods: {
    // onLoad (options) {
    //   // 页面初始化 options为页面跳转所带来的参数
    //   this.id: parseInt(options.id)
    //   this.getBrand();
    // },
    getBrand() {
      this.$http.get(`${urls.BrandDetail}?id=${this.id }`).then(res => {
        if (res.data.errno === 0) {
          this.brand = res.data.data.brand
          this.getGoodsList()
        }
      });
    },
    // getGoodsList() {
    //   this.$http.get(`${urls.GoodsList}?brandId=${this.id}&page=${this.totalPages}&size=${this.pageSize}`)
    //     .then(res => {
    //     debugger
    //       if (res.data.errno === 0) {
    //         this.goodsList = res.data.data.goodsList
    //       }
    //     });
    // }
  },
  mounted() {
    debugger
    this.id = this.$route.params.id
    this.getBrand()
    this.getGoodsList()
  }
}
</script>

<style scoped src="./style.css">
</style>