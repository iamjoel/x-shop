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
    getTopic() {
         this.scrollTop = 0
         this.showPage = false
         this.topicList = []
        // 页面渲染完成
        // this.showToast({
        //     title: '加载中...',
        //     icon: 'loading',
        //     duration: 2000
        // });

        this.$http.get(`${urls.TopicList}?page=${this.page}&size=${this.size}`).then(res => {
          debugger
          if (res.data.errno === 0) {
            this.scrollTop = 0
            this.topicList = res.data.data.data
            this.showPage = true
            this.count = res.data.data.count
          }
        });
        
    },
  },
  mounted() {
    this.getTopic()
  }
}
</script>

<style scoped src="./style.css">
</style>