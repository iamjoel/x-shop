<template>
  <div class="main">
    <van-swipe :autoplay="3000" class="banner">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <a href="javascript:void(0)">
          <div :style="{
            'background-image': 'url(' + item.image_url + ')', 
            'background-size': 'cover',
            height: '3.56rem',
            width: '100%'
          }"></div>
        </a>
      </van-swipe-item>
    </van-swipe>
    <div class="m-menu">
      <a href="javascript:void(0)" class="item" v-for="item in floorGoods" :key="item.id" @click="$router.push('/category/' + item.id)">
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
      <div class="c">
        <div class="item item-1" v-for="item in brand" :key="item.id">
          <a href="javascript:void(0)" @click="$router.push('/brandDetail/' + item.id)">
            <div class="wrap">
              <img :src="item.new_pic_url" class="img">
              <div class="mt">
                <span class="brand">{{item.name}}</span>
                <span class="price">{{item.floor_price}}</span>
                <span class="unit">元起</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="a-section a-new" v-if="newGoods.length > 0">
      <div class="h">
        <div>
          <a href="javascript:void(0)">
            <span class="txt">周一周四 · 新品首发</span>
          </a>
        </div>
      </div>
      <div class="c">
        <div class="item" v-for="item in newGoods" :key="item.id">
          <a href="javascript:void(0)" @click="$router.push('/goods/' + item.id)">
            <img :src="item.list_pic_url" class="img">
            <span class="name">{{item.name}}</span>
            <span class="price">￥{{item.retail_price}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="a-section a-popular" v-if="hotGoods.length > 0">
      <div class="h">
        <div>
          <a href="javascript:void(0)">
            <span class="txt">人气推荐</span>
          </a>
        </div>
      </div>
      <div class="c">
        <div class="item" v-for="item in hotGoods" :key="item.id">
          <a href="javascript:void(0)">
            <img :src="item.list_pic_url" class="img" style="background-size:cover">
            <div class="right">
              <div class="text">
                <span class="name">{{item.name}}</span>
                <span class="desc">{{item.goods_brief}}</span>
                <span class="price">￥{{item.retail_price}}</span>
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
      <div class="c">
        <van-swipe @change="onChange">
          <van-swipe-item class="item" v-for="item in topics" :key="item.id">
            <a href="javascript:void(0)">
              <img :src="item.scene_pic_url" class="img" style="background-size:cover">
              <div class="np">
                <span class="name">{{item.title}}</span>
                <span class="price">￥{{item.price_info}}元起</span>
              </div>
              <span class="desc">{{item.subtitle}}</span>
            </a>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="good-grid" v-for="firstCategory in floorGoods" :key="firstCategory.id">
      <div class="h">
        <div>
          <span>{{firstCategory.name}}</span>
        </div>
      </div>
      <div class="c">
        <div v-for="(secondCategory, index) in firstCategory.goodsList" :key="secondCategory.id">
          <div class="item" :class="index % 2 == 0 ? '' : 'item-b'">
            <a href="javascript:void(0)" class="a">
              <img :src="secondCategory.list_pic_url" class="img" style="background-size:cover">
              <span class="name">{{secondCategory.name}}</span>
              <span class="price">￥{{secondCategory.retail_price}}</span>
            </a>
          </div>
        </div>
        <div class="item item-b item-more">
          <a href="javascript:void(0)" class="more-a">
            <div class="txt">{{'更多'+firstCategory.name+'好物'}}</div>
            <img src="./imagse/1.png" class="icon" style="background-size:cover">
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
      brand: [],
      floorGoods: [],
      banner: [],
      channel: []
    }
  },
  methods: {
    onChange(index) {
      Toast('当前 Swipe 索引：' + index);
    },
    getIndexData() {
      this.$http.get(urls.IndexUrl).then(res => {
        if (res.data.errno === 0) {
          var data = res.data.data
          this.channel = data.channel
          this.brand = data.brandList
          this.newGoods = data.newGoodsList
          this.hotGoods = data.hotGoodsList
          this.topics = data.topicList
          this.floorGoods = data.categoryList.slice(0, 5)
          this.banner = data.banner
        }
      })
    },
  },
  mounted() {
    this.getIndexData()
  }
}
</script>

<style scoped src="./style.css">
</style>