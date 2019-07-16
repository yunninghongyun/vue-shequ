<template>
  <div v-if="user" class="user">
    <div class="top">
      <router-link :to="$publicUrl">主页/</router-link>
    </div>
    <div class="userInfo">
      <div class="tou">
        <img :src="user.avatar_url" alt />
        <span>{{user.loginname}}</span>
      </div>
      <span class="score">{{user.score}}&nbsp;&nbsp;积分</span>
      <span class="create-at">注册时间{{myMoment(user.create_at)}}</span>
    </div>
    <div class="panel">
      <div class="header">最近创建的话题</div>
      <div class="cell" v-for="recent_topic in user.recent_topics" :key="recent_topic.id">
        <router-link :to="`${$publicUrl}/user/${recent_topic.author.loginname}`">
          <img :src="recent_topic.author.avatar_url" alt class="avatar" />
        </router-link>
        <div class="count">
          <span class="reply-count">{{recent_topic.reply_count}}</span>
          <span></span>
          <span class="visit-count">{{recent_topic.visit_count}}</span>
        </div>
        <div class="title">
          <router-link :to="`${$publicUrl}/topics/${recent_topic.id}`">{{recent_topic.title}}</router-link>
        </div>
        <span class="time">{{myMoment(recent_topic.last_reply_at)}}</span>
      </div>
    </div>
    <div class="panel">
      <div class="header">最近参与的话题</div>
      <div class="cell" v-for="recent_replie in user.recent_replies" :key="recent_replie.id">
        <router-link :to="`${$publicUrl}/user/${recent_replie.author.loginname}`">
          <img :src="recent_replie.author.avatar_url" alt class="avatar" />
        </router-link>
        <div class="count">
          <span class="reply-count">{{recent_replie.reply_count}}</span>
          <span></span>
          <span class="visit-count">{{recent_replie.visit_count}}</span>
        </div>
        <div class="title">
          <router-link :to="`${$publicUrl}/topics/${recent_replie.id}`">{{recent_replie.title}}</router-link>
        </div>
        <span class="time">{{myMoment(recent_replie.last_reply_at)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "users",
  data() {
    return {
      topic: null,
      user: null,
      text: ""
    };
  },
  created() {
    // const { id } = this.$route.params;
    const { loginname } = this.$route.params;
    console.log(this.$route.params);
    axios.get(`https://www.vue-js.com/api/v1/user/${loginname}`).then(res => {
      this.user = res.data.data;
      console.log(res.data.data);
    });
  },
  methods: {
    myMoment(time) {
      moment.locale("zh-cn");
      return moment(time).fromNow();
    },
    addComment() {
      axios
        .post(`https://www.vue-js.com/api/v1/topic/${this.topic.id}/replies`, {
          accesstoken: sessionStorage.getItem("token"),
          content: this.text
        })
        .then(res => {
          axios.get(`https://www.vue-js.com/api/v1/topic/${this.topic.id}`);
        })
        .then(res => {
          this.topic = res.data.data;
        });
    }
  }
};
</script>

<style>
.user {
  width: 80%;
  margin-left: 20px;
}
.user .top > a {
  text-decoration: none;
  color: #369219;
}
.user .userInfo {
  padding: 12px 0 12px 12px;
  background-color: #fff;
}
.user .userInfo .tou {
  display: flex;
  align-items: flex-start;
}
.user .userInfo .tou > img {
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 5px;
}
.user .userInfo .tou > span {
  margin-left: 10px;
  color: #778087;
  font-size: 12px;
}
.user .userInfo .create-at {
  display: block;
  margin: 14px 0 14px 0px;
  color: #778087;
  font-size: 12px;
}
.user .userInfo > .score {
  display: block;
  font-size: 12px;
  color: #000;
  margin-top: 4px;
}
.user .panel {
  background: #fff;
  margin-bottom: 15px;
}
.user .panel .header,
.user .top {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  font-size: 14px;
}
.user .top {
  border-bottom: 1px solid #ccc;
}
.user .panel .cell {
  display: flex;
  border-top: 1px solid #f0f0f0;
  overflow: hidden;
  position: relative;
  padding: 8px 0 8px 8px;
  font-size: 14px;
}
.user .panel .cell .time {
  margin-right: 10px;
}
.user .panel .cell .avatar {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 4px;
  flex-shrink: 0;
}
.user .panel .cell .title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user .panel .cell .title > a {
  margin-left: 4px;
  color: #08c;
  max-width: 70%;
  line-height: 30px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
}
.user .cell .title > a:hover {
  text-decoration: underline;
}
</style>
