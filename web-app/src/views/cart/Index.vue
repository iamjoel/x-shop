<template style="height:100%">
  <div class="main">
    <div class="service-policy">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="no-cart" v-if="cartGoods.length <= 0">
      <div class="c">
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png">
        <span>去添加点什么吧</span>
      </div>
    </div>
    <div class="cart-view" v-if="cartGoods.length > 0">
      <div class="list">
        <div class="group-item">
          <div class="goods">
            <div class="item">
              <div class="checkbox"></div>
              <div class="cart-goods">
                <img src="###" class="img">
                <div class="info">
                  <div class="t">
                    <span class="name"></span>
                    <span class="num"></span>
                  </div>
                  <div class="attr"></div>
                  <div class="b">
                    <span class="price"></span>
                    <div class="selnum">
                      <div class="cut">-</div>
                      <input type="number" class="number" value="item.number" disabled="true">
                      <div class="add">+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-bottom">
        <div class="checkbox">全选</div>
        <div class="total"></div>
        <div class="delete"></div>
        <div class="checkout">删除所选</div>
        <div class="checkout">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      cartGoods: [],
      cartTotal: {
        "goodsCount": 0,
        "goodsAmount": 0.00,
        "checkedGoodsCount": 0,
        "checkedGoodsAmount": 0.00
      },
      isEditCart: false,
      checkedAllStatus: true,
      editCartList: []
    }
  },
  methods: {
    getCartList: function () {
      this.$http.get(urls.CartList).then(res => {
        if (res.data.errno === 0) {
          console.log(res.data.data);
          this.cartGoods = res.data.data.cartList,
          this.cartTotal = res.data.data.cartTotal
        }
        this.checkedAllStatus = isCheckedAll()
      });
    },
    isCheckedAll() {
      //判断购物车商品已全选
      return this.data.cartGoods.every(function (element, index, array) {
        if (element.checked == true) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.getCartList()
  }
}
</script>

<style scoped src="./style.css">
</style>