<template>
  <div class="xiaoxi1">
    <div class="top">
      <router-link class="zhuye" to="/">主页 /</router-link>
      <span>新消息</span>

      <div class="inner" v-for="hasNotMessage in hasNotMessages" :key="hasNotMessage.id">
        <div class="inner-text">
          <router-link
            class="title"
            :to="`/user/${hasNotMessage.author.loginname}`"
          >{{hasNotMessage.author.loginname}}</router-link>
          <span class="padding-lr">{{hasNotMessage.type==='at'?'在话题':'回复了你的话题'}}</span>
          <router-link
            class="title"
            :to="`/topics/${hasNotMessage.topic.id}`"
          >{{hasNotMessage.topic.title}}</router-link>
          <span class="padding-lr">{{hasNotMessage.type==='at'?'中@了你':''}}</span>
        </div>
        <div class="time opcity">
          <img src="https://www.vue-js.com/public/images/checkmark_icon&16.png" alt />
        </div>
      </div>
      <div class="cell-more" v-if="!hasNotMessages.length">无话题</div>
    </div>
    <div class="panel">
      <div class="header1">
        <span>过往消息</span>
        <div class="cell" v-for="hasMessage in hasMessages" :key="hasMessage.id">
          <div class="inner-text">
            <router-link
              class="title"
              :to="`/user/${hasMessage.author.loginname}`"
            >{{hasMessage.author.loginname}}</router-link>
            <span class="padding-lr">{{hasMessage.type==='at'?'在话题':'回复了你的话题'}}</span>
            <router-link
              class="title"
              :to="`/topics/${hasMessage.topic.id}`"
            >{{hasMessage.topic.title}}</router-link>
            <span class="padding-lr">{{hasMessage.type==='at'?'中@了你':''}}</span>
          </div>
          <div class="time">
            <img src="https://www.vue-js.com/public/images/checkmark_icon&16.png" alt />
          </div>
        </div>
        <div class="cell-more" v-if="!hasMessages.length">无话题</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "xiaoxi",
  data() {
    return {
      hasMessages: [],
      hasNotMessages: []
    };
  },
  created() {
    // const { id } = this.$route.params;

    axios
      .get(
        `https://www.vue-js.com/api/v1/messages?accesstoken=${sessionStorage.getItem(
          "token"
        )}`
      )
      .then(res => {
        this.hasMessages = res.data.data.has_read_messages;
        this.hasNotMessages = res.data.data.hasnot_read_messages;
        console.log(res.data.data);
      });
  }
};
</script>

<style>
.xiaoxi1 {
  width: 80%;
  min-width: 0;
  margin: 0 auto;
}
.xiaoxi1 .top {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  margin-bottom: 15px;
}
.xiaoxi1 .top .zhuye {
  color: #369219;
  font-size: 14px;
  margin-right: 10px;
}
.xiaoxi1 .top > span {
  color: #999;
  font-size: 14px;
}
.xiaoxi1 .inner {
  line-height: 2em;
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
  display: flex;
  justify-content: space-between;
}
.xiaoxi1 .panel .header1 {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.xiaoxi1 .panel .header1 .cell {
  display: flex;
  justify-content: space-between;
}
.xiaoxi1 .panel .header1 > span {
  color: #369219;
  font-size: 14px;
}
.xiaoxi1 .cell-more {
  margin-top: 10px;
  line-height: 2em;
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
}
.xiaoxi1 .inner-text {
}
</style>
