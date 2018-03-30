<template>
  <div class="main">
    <div class="brand-list">
      <a href="javascript:void(0)" class="item" v-for="item in brandList" :key="id">
        <div class="img-gb">
          <img :src="item.app_list_pic_url">
        </div>
        <div class="txt-box">
          <div class="line">
            <span class="name">{{item.name}}</span>
            <span class="s">|</span>
            <span class="price">{{item.floor_price}}元起</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      brandList: [],
      page: 1,
      size: 10,
      totalPages: 1,
      showLoading: ''
    }
  },
  methods: {
    // onLoad (options) {
    //   // 页面初始化 options为页面跳转所带来的参数
    //   this.getBrandList();
    // },
    getBrandList () {
      // this.wx.showLoading({
      //   title: '加载中...',
      // })
      this.$http.get(urls.BrandList, {params: {
         page: this.data.page, size: this.data.size 
      }}).then(res => {
        debugger
        if (res.data.errno === 0) {
          var data = res.data.data
          this.brandList = data.brandList.concat(data.data),
          this.totalPages = data.totalPages
        }
        return hideLoading();
      })
    },
  },
  mounted() {
    this.id = this.$route.params.id
    this.getBrandList()
  }
}
</script>

<style scoped src="./style.css">
</style>