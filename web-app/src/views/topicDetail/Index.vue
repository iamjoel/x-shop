<template>
  <div class="main">
    <div class="content">
      <div class="editor-content">
        <div v-html="TopicDetail"></div>
      </div>
      <div class="topic-goods"></div>
      <div class="comments">
        <div class="h">
          <span class="t">精选留言</span>
          <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/comment-add-2aca147c3f.png" class="i" @click="$router.push('/commentPost/' + topicMessage.id +'&typeId=1')">
        </div>
        <div class="has-comments" v-if="commentList.length > 0 ">
          <div class="b">
            <div class="item" v-for="item in commentList" :key="item.id">
              <div class="info">
                <div class="user">
                  <img :src="item.user_info.avatar" class="avatar">
                  <span class="nickname">{{item.user_info.nickname}}</span>
                </div>
                <div class="time">{{item.add_time}}</div>
              </div>
              <div class="comment">{{item.content}}</div>
            </div>
          </div>
          <div class="load" v-if="commentCount > 5">
            <a href="javascript:void(0)">查看更多</a>
          </div>
        </div>
        <div class="no-comments" v-if="commentList.length <= 0">
          <div class="b">
            <img src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-comment-560f87660a.png" class="icon">
            <span class="txt">等你来留言</span>
          </div>
        </div>
      </div>
      <div class="rec-box">
        <div class="h">
          <span class="txt">专题推荐</span>
        </div>
        <div class="b">
          <a href="javascript:void(0)" class="item" v-for="item in topicList" :key="item.id" @click="$router.push('/topicDetail/' + item.id)">
            <img :src="item.scene_pic_url" class="img">
            <span class="title">{{item.title}}</span>
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
      topic: {},
      topicList: [],
      commentCount: null,
      commentList: [],
      TopicDetail:'',
      options: ''
    }
  },
  watch: {
    ['$route.params.id']() {
      this.fecthDatas()
    }
  },
  methods: {
    getTopicDetail() {
      this.$http.get(`${urls.TopicDetail}?id=${this.id}`).then(res => {
        if (res.data.errno === 0) {
          this.TopicDetail = res.data.data.content
          this.topicMessage = res.data.data
        }
      })
    },
    getTopicRelated() {
      this.$http.get(`${urls.TopicRelated}?id=${this.id}`).then(res => {
        if (res.data.errno === 0) {
          this.topicList = res.data.data
        }
      })
    },
    getCommentList() {
      this.$http.get(`${urls.CommentList}?valueId=${this.id}&typeId=1&size=5`).then(res => {
        if (res.data.errno === 0) {
          this.commentList = res.data.data.data
          this.commentCount = res.data.data.count
        }
      })
    },
    fecthDatas() {
      this.id = this.$route.params.id
      this.getTopicDetail()
      this.getTopicRelated()
      this.getCommentList()
    }
  },
  mounted() {
    this.fecthDatas()
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