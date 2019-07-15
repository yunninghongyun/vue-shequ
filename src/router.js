import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Topic from './components/Topic'
import User from './components/User'
import CreateTopic from './components/CreateTopic'
import Xiaoxi from './components/Xiaoxi'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/topic/create',
      component: CreateTopic
    },
    {
      path: '/topic/xiaoxi',
      component: Xiaoxi
    },
    {
      path: '/topic/:id',
      component: Topic
    },
    {
      path: '/user/:loginname',
      component: User
    }
  ],
  mode: 'history'
})
