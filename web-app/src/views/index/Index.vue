<template>
  <div class="main">
    <van-swipe :autoplay="3000" class="banner">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="m-menu">
      <a href="javascript:void(0)" class="item" v-for="item in channel" :key="item.id">
        <img :src="item.icon_url" style="background-size:cover">
        <span>{{item.name}}</span>
      </a>
    </div>
    <div class="a-section a-brand">
      <div class="h">
        <a href="javascript:void(0)">
          <span class="txt">品牌制造商直供</span>
        </a>
      </div>
      <div class="b">
        <div class="item item-1">
          <a href="javascript:void(0)">
            <div class="wrap">
              <img src="###" class="img">
              <div class="mt">
                <span class="brand">CK制造商</span>
                <span class="price">39</span>
                <span class="unit">元起</span>
              </div>
            </div>
          </a>
        </div>
        <div class="item item-1">
          <a href="javascript:void(0)">
            <div class="wrap">
              <img src="###" class="img">
              <div class="mt">
                <span class="brand">CK制造商</span>
                <span class="price">39</span>
                <span class="unit">元起</span>
              </div>
            </div>
          </a>
        </div>
        <div class="item item-1">
          <a href="javascript:void(0)">
            <div class="wrap">
              <img src="###" class="img">
              <div class="mt">
                <span class="brand">CK制造商</span>
                <span class="price">39</span>
                <span class="unit">元起</span>
              </div>
            </div>
          </a>
        </div>
        <div class="item item-1">
          <a href="javascript:void(0)">
            <div class="wrap">
              <img src="###" class="img">
              <div class="mt">
                <span class="brand">CK制造商</span>
                <span class="price">39</span>
                <span class="unit">元起</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="a-section a-new">
      <div class="h">
        <div>
          <a href="javascript:void(0)">
            <span class="txt">周一周四 · 新品首发</span>
          </a>
        </div>
      </div>
      <div class="b">
        <div class="item">
          <a href="javascript:void(0)">
            <img src="###" class="img">
            <span class="name">蔓越莓曲奇 200克</span>
            <span class="price">￥36</span>
          </a>
        </div>
      </div>
    </div>
    <div class="a-section a-popular">
      <div class="h">
        <div>
          <a href="javascript:void(0)">
            <span class="txt">人气推荐</span>
          </a>
        </div>
      </div>
      <div class="b">
        <div class="item">
          <a href="javascript:void(0)">
            <img src="###" class="img">
            <div class="right">
              <div class="text">
                <span class="name"></span>
                <span class="desc"></span>
                <span class="price">￥</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="a-section a-topic">
      <div class="h">
        <div>
          <a href="javascript:void(0)">
            <span class="txt">专题精选</span>
          </a>
        </div>
      </div>
      <div class="b"> //未完成
        
      </div>
    </div>
    <div class="good-grid">
      <div class="h">
        <div>
          <span></span>
        </div>
      </div>
      <div class="b">
        <div>
          <div class="item">
            <a href="javascript:void(0)" class="a">
              <img src="###" class="img">
              <span class="name"></span>
              <span class="price">￥</span>
            </a>
          </div>
        </div>
        <div class="item item-b item-more">
          <a href="javascript:void(0)" class="more-a">
            <div class="txt"></div>
            <img src="###" class="icon" style="background-size:cover">
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
      newGoods: [],
      hotGoods: [],
      topics: [],
      brands: [],
      floorGoods: [],
      banner: [],
      channel: []
    }
  },
  methods: {
    getIndexData: function () {
      this.$http.get(urls.IndexUrl).then(res => {
          debugger
        if (res.errno === 0) {
          this.channel = res.data.channel
          // that.setData({
          //   newGoods: res.data.newGoodsList,
          //   hotGoods: res.data.hotGoodsList,
          //   topics: res.data.topicList,
          //   brand: res.data.brandList,
          //   floorGoods: res.data.categoryList,
          //   banner: res.data.banner,
          //   channel: res.data.channel
          // });
        }
      }, (err)=> {
        console.error(err)
        debugger
      });
    },
  },
  mounted() {
    this.getIndexData()
  }
}
</script>

<style scoped src="./style.css">
</style>