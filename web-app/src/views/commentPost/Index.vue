<template>
  <div class="main">
    <div class="post-comment">
      <div class="input-box">
        <textarea maxlength="140" class="content" placeholder="留言经过筛选后，对所有人可见"></textarea>
        <span class="count"></span>
      </div>
      <div class="btns">
        <div class="close">取消</div>
        <div class="post">发表</div>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from '@/setting'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    // onPost() {
    //   let that = this;
    //   if (!this.data.content) {
    //     util.showErrorToast('请填写评论')
    //     return false;
    //   }


    //   util.request(api.CommentPost, {
    //     typeId: that.data.typeId,
    //     valueId: that.data.valueId,
    //     content: that.data.content
    //   }, 'POST').then(function (res) {
    //     if (res.errno === 0) {
    //       wx.showToast({
    //         title: '评论成功',
    //         complete: function(){
    //           wx.navigateBack({
    //             delta: 1
    //           });
    //         }
    //       })
    //     }
    //     console.log(res)
    //   });
    // },
  },
  mounted() {
    
  }
}
</script>

<style scoped src="./style.css">
</style>