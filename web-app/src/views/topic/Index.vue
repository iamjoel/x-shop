<template>
  <div class="main">
    <div class="topic-list">
      <a href="javascript:void(0)" class="item" v-for="item in topicList" :key="item.id">
        <img :src="item.scene_pic_url" class="img">
        <div class="info">
          <span class="title">{{item.title}}</span>
          <span class="desc">{{item.subtitle}}</span>
          <span class="price">{{item.price_info}}元起</span>
        </div>
      </a>
      <div class="page" v-if="showPage">
        <div class="prev" :class="page <= 1 ? 'disabled' : ''">上一页</div>
        <div class="next" :class="(count / size) < page +1 ? 'disabled' : ''">下一页</div>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      topicList: [],
      page: 1,
      size: 10,
      count: 0,
      scrollTop: 0,
      showPage: false
    }
  },
  methods: {
    nextPage (event) {
      console.log();
        if (this.data.page+1 > this.data.count / this.data.size) {
            return true;
        }

        
          this.page = parseInt(this.data.page) + 1

        this.getTopic();
        
    },
    getTopic() {
          this.scrollTop = 0,
          this.showPage = false,
          this.topicList = []
        // 页面渲染完成
        this.wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 2000
        });

        this.$http.get(`${api.TopicList}, `).then(res => {
          if (res.errno === 0) {

            that.setData({
              scrollTop: 0,
              topicList: res.data.data,
              showPage: true,
              count: res.data.count
            });
          }
          wx.hideToast();
        });
        
    },
  },
  mounted() {
    
  }
}
</script>

<style scoped src="./style.css">
</style>