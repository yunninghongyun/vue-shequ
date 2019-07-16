<template>
  <div class="header">
    <div class="header-inner">
      <router-link :to="$publicUrl+'/'" class="logo">
        <img src="../assets/logo.png" alt />
        <h1>Vue.js</h1>
      </router-link>
      <router-link :to="$publicUrl+'/topic/create'" v-if="userInfo" class="huati">发布话题</router-link>
      <router-link :to="$publicUrl+'/topic/xiaoxi'" v-if="userInfo" class="xiaoxi">未读消息</router-link>
      <div v-if="!userInfo" class="login">
        <input type="text" v-model="text" />
        <button @click="login">登录</button>
      </div>
      <div v-else class="logout">
        <img :src="userInfo.avatar_url" alt />
        <button @click="logout">退出</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tou",
  data() {
    return {
      text: "d2263004-376e-44a6-9304-a303b526ba88",
      userInfo: null
    };
  },
  created() {
    if (sessionStorage.getItem("token")) {
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: sessionStorage.getItem("token")
        })
        .then(res => {
          this.userInfo = res.data;
        });
    }
  },
  methods: {
    login() {
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: this.text
        })
        .then(res => {
          this.userInfo = res.data;
          console.log(res.data.id);
          sessionStorage.setItem("token", this.text);
          sessionStorage.setItem("user_id", res.data.id);
        });
    },
    logout() {
      this.userInfo = null;
      sessionStorage.removeItem("token");
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.header {
  width: 100%;
  height: 55px;
  background-color: #1c6132;
  margin-bottom: 20px;
}
.header-inner {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-inner > .logo {
  display: flex;
  align-items: center;
  height: 55px;
  color: #fff;
}
.header-inner > .logo > img {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.header-inner > .logo > h1 {
  font-size: 24px;
  margin: 0;
}
.header-inner .logout {
  display: flex;
  align-items: center;
}
.header-inner .logout img {
  width: 40px;
}
.header-inner .logout button {
  margin-left: 5px;
  align-self: flex-end;
}
.header-inner .huati {
  background-color: yellowgreen;
  padding: 4px 8px;
  border-radius: 2px;
  border: none;
}
.header-inner .xiaoxi {
  color: #fff;
}
</style>