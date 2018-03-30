<template>
  <div class="main">
    <div v-if="!openAttr">
      <van-swipe :autoplay="3000" class="goodsimgs">
        <van-swipe-item v-for="item in gallery" :key="item.id">
          <div :style="{
            'background-image': 'url(' + item.img_url + ')', 
            'background-size': 'cover',
            height: '6.4rem',
            width: '100%'
          }"></div>
        </van-swipe-item>
      </van-swipe>
      <div class="service-policy">
        <div class="item">30天无忧退货</div>
        <div class="item">48小时快速退款</div>
        <div class="item">满88元免邮费</div>
      </div>
      <div class="goods-info">
        <div class="c">
          <span class="name">{{goods.name}}</span>
          <span class="desc">{{goods.goods_brief}}</span>
          <span class="price">￥{{goods.retail_price}}</span>
          <div class="brand" v-if="brand.name">
            <a href="javascript:void(0)">
              <span>{{brand.name}}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="section-nav section-attr">
        <div class="t">请选择规格数量</div>
        <img src="./images/1.png" class="i">
      </div>
      <div class="comments" v-if="comment.count > 0">
        <div class="h">
          <a href="javascript:void(0)">
            <span class="t">评价({{comment.count > 999 ? '999+' : comment.count}})</span>
            <span class="i">查看全部</span>
          </a>
        </div>
        <div class="b">
          <div class="item">
            <div class="info">
              <div class="user">
                <img :src="comment.data.avatar">
                <span>{{comment.data.nickname}}</span>
              </div>
              <div class="time">{{comment.data.add_time}}</div>
            </div>
            <div class="content">{{comment.data.content}}</div>
            <div class="imgs" v-if="comment.data.pic_list.length > 0">
              <img :src="item.pic_url" class="img" v-for="item in comment.data.pic_list" :key="item.id">
            </div>
          </div>
        </div>
      </div>
      <div class="goods-attr">
        <div class="t">商品参数</div>
        <div class="l">
          <div class="item" v-for="item in attribute" :key="item.name">
            <span class="left">{{item.name}}</span>
            <span class="right">{{item.value}}</span>
          </div>
        </div>
      </div>

      <div class="detail editor-content">
        <div v-html="goodsDetail"></div>
      </div>

      <div class="common-problem">
        <div class="h">
          <div class="line"></div>
          <span class="title">常见问题</span>
        </div>
        <div class="b">
          <div class="item" v-for="item in issueList" :key="item.id">
            <div class="question-box">
              <span class="spot"></span>
              <span class="question">{{item.question}}</span>
            </div>
            <div class="answer">{{item.answer}}</div>
          </div>
        </div>
      </div>
      <div class="related-goods" v-if="relatedGoods.length > 0">
        <div class="h">
          <div class="line"></div>
          <span class="title">大家都在看</span>
        </div>
        <div class="b">
          <div class="item" v-for="item in relatedGoods" :key="item.id">
            <a href="javascript:void(0)">
              <img :src="item.list_pic_url" class="img">
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.retail_price}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="attr-pop" v-if="openAttr">
      <div class="img-info">
        <img src="http://ac-3yr0g9cz.clouddn.com/6e5176bd6545b72e130a.png" class="img">
        <div class="info">
          <div class="c">
            <div class="p">价格：￥{{goods.retail_price}}</div>
            <div class="a" v-if="productList.length>0">已选择：{{checkedSpecText}}</div>
          </div>
        </div>
      </div>
      <div class="spec-con">
        <div class="spec-item" v-for="item in specificationList" :key="item.specification_id">
          <div class="name">{{item.name}}</div>
          <div class="values">
            <div class="value" :class="vitem.checked ? 'selected' : ''" v-for="item in item.valueList" :key="item.id">{{vitem.value}}</div>
          </div>
        </div>
        <div class="number-item">
          <div class="name">数量</div>
          <div class="selnum">
            <div class="cut">-</div>
            <input type="number" class="number" :value="number" disabled="disabled">
            <div class="add">+</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="l l-collect" :class="openAttr ? 'back' : ''">
        <img :src="collectBackImage" class="icon">
      </div>
      <div class="l l-cart">
        <div class="box">
          <span class="cart-count">{{cartGoodsCount}}</span>
          <img src="./images/2.png" class="icon">
        </div>
      </div>
      <div class="c">立即购买</div>
      <div class="r">加入购物车</div>
    </div>
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      id: '',
      goods: {},
      gallery: [],
      attribute: [],
      issueList: [],
      comment: [],
      brand: {},
      specificationList: [],
      productList: [],
      relatedGoods: [],
      cartGoodsCount: 0,
      userHasCollect: 0,
      openAttr: false,
      goodsDetail: '',
      number: 1,
      checkedSpecText: '请选择规格数量',
      openAttr: false,
      noCollectImage: "/static/images/icon_collect.png",
      hasCollectImage: "/static/images/icon_collect_checked.png",
      collectBackImage: "/static/images/icon_collect.png"
    }
  },
  methods: {
    getGoodsInfo() {
      this.$http.get(`${urls.GoodsDetail}?id=${this.id}`).then(res => {
        if(res.data.errno === 0) {
          var data = res.data.data
          this.goods = data.info
          this.gallery = data.gallery
          this.attribute = data.attribute
          this.issueList = data.issue
          this.comment = data.comment
          this.brand = data.brand
          this.specificationList = data.specificationList
          this.productList = data.productList
          this.userHasCollect = data.userHasCollect
          this.goodsDetail = data.info.goods_desc
          if(res.data.userHasCollect == 1) {
            this.collectBackImage = this.data.hasCollectImage
          } else {
            this.collectBackImage = this.data.noCollectImage
          }
        }
      })
    },
    getGoodsRelated () {
      this.$http.get(`${urls.GoodsRelated}?id=${this.id}`).then(res => {
        if (res.data.errno === 0) {
          this.relatedGoods = res.data.data.goodsList
        }
      })
    },
    switchAttrPop() {
      if(this.data.data.openAttr == false) {
        this.setData({
          openAttr: !this.data.openAttr,
          collectBackImage: "/static/images/detail_back.png"
        })
      }
    },
    // addToCart () {
    //   if (this.data.openAttr == false) {
    //     //打开规格选择窗口
    //     this.openAttr = !this.data.openAttr,
    //     this.collectBackImage = "/static/images/detail_back.png"
    //   } else {
    //     //提示选择完整规格
    //     if (!this.isCheckedAllSpec()) {
    //       return false;
    //     }
    //     //根据选中的规格，判断是否有对应的sku信息
    //     let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
    //     if (!checkedProduct || checkedProduct.length <= 0) {
    //       //找不到对应的product信息，提示没有库存
    //       return false;
    //     }
    //     //验证库存
    //     if (checkedProduct.goods_number < this.data.number) {
    //       //找不到对应的product信息，提示没有库存
    //       return false;
    //     }
    //     //添加到购物车
    //     this.$http.get(`${urls.CartAdd}, ${ this.goods.id, this.number, this.checkedProduct[0].id }, ${"POST"}`)
    //       .then(res => {
    //         let _res = res;
    //         if (_res.errno == 0) {
    //           this.wx.showToast({
    //             title: '添加成功'
    //           })
    //           this.openAttr = !that.data.openAttr,
    //           this.cartGoodsCount = _res.data.cartTotal.goodsCount
    //           if (this.data.userHasCollect == 1) {
    //             this.collectBackImage = this.data.hasCollectImage
    //           } else {
    //             this.collectBackImage = this.data.noCollectImage
    //           }
    //         } else {
    //           this.wx.showToast({
    //             image: '/static/images/icon_error.png',
    //             title: _res.errmsg,
    //             mask: true
    //           })
    //         }

    //       });
    //   }

    // },
    // closeAttrOrCollect() {
    //   if (this.data.openAttr) {
    //     this.openAttr = false,
    //     if (this.data.userHasCollect == 1) {
    //       this.collectBackImage = this.data.hasCollectImage
    //     } else {
    //       this.collectBackImage = this.data.noCollectImage
    //     }
    //   } else {
    //     //添加或是取消收藏
    //     this.$http.get(`${urls.CollectAddOrDelete}, { typeId: 0, valueId: this.data.id }, "POST"`)
    //       .then(function (res) {
    //         let _res = res;
    //         if (_res.errno == 0) {
    //           if ( _res.data.type == 'add') {
    //             this.setData({
    //               'collectBackImage': this.data.hasCollectImage
    //             });
    //           } else {
    //             this.setData({
    //               'collectBackImage': this.data.noCollectImage
    //             });
    //           }

    //         } else {
    //           wx.showToast({
    //             image: '/static/images/icon_error.png',
    //             title: _res.errmsg,
    //             mask: true
    //           });
    //         }

    //       });
    //   }
    // }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getGoodsInfo()
    this.getGoodsRelated()
  }
}
</script>
<style>
.editor-content img {
  display: block;
  max-width: 100%;
}
</style>
<style scoped src="./style.css">
</style>