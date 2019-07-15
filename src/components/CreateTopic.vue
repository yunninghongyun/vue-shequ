<template>
  <div class="public-topic">
    <div class="head">
      <router-link to="/">主页/</router-link>
      <span>发布话题</span>
    </div>
    <div class="main">
      <span class="span-select">选择板块：</span>
      <select name="tab" id="tab-value" v-model="tab">
        <option value>请选择</option>
        <option value="weex">weex</option>
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
      </select>
      <textarea
        name="title"
        id="title"
        rows="1"
        placeholder="标题字数 10 字以上"
        class="title-text"
        v-model="title"
      ></textarea>
      <quill-editor
        class="content-text"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>
      <button @click="submit" class="reply">提交</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "app",
  data() {
    return {
      tab: "",
      title: "",
      content: "",
      editorOption: {}
    };
  },
  components: {
    quillEditor
  },
  methods: {
    submit() {
      axios
        .post("https://www.vue-js.com/api/v1/topics", {
          tab: this.tab,
          content: this.content,
          title: this.title,
          accesstoken: sessionStorage.getItem("token")
        })
        .then(res => {
          console.log(res.data);
          this.tab = "";
          this.title = "";
          this.content = "";
          this.$router.push(`/topic/${res.data.topic_id}`);
        });
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    }
  }
};
</script>

<style>
.public-topic {
  width: 70%;
  margin-left: 50px;
}
.public-topic .main {
  padding: 10px;
}
.public-topic .main .span-select {
  color: #000;
  font-size: 14px;
}
.public-topic .title-text {
  margin-top: 15px;
  display: block;
  resize: none;
  width: 98%;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1em;
  height: 25px;
  padding-top: 5px;
}
.public-topic .content-text {
  width: 98%;
  height: 300px;
  resize: none;
  margin-bottom: 70px;
}
.main {
  background-color: #fff;
}
.public-topic select {
  border-radius: 5px;
  width: 220px;
  background-color: #fff;
  border: 1px solid #ccc;
  height: 25px;
  line-height: 25px;
}
.public-topic .reply {
  display: inline-block;
  float: none;
  padding: 3px 10px;
  border: 0;
  margin: 0;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  letter-spacing: 2px;
  box-shadow: none;
  border-radius: 3px;
  line-height: 2em;
  vertical-align: middle;
  color: #fff;
  background-color: #3374de;
}
.public-topic .head {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  font-size: 14px;
}
</style>