import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Topic from './components/Topic'
import User from './components/User'
import CreateTopic from './components/CreateTopic'
import Xiaoxi from './components/Xiaoxi'
import { PUBLICURL } from './constants'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: PUBLICURL + '/',
      component: Home
    },
    {
      path: PUBLICURL + '/topic/create',
      component: CreateTopic
    },
    {
      path: PUBLICURL + '/topic/xiaoxi',
      component: Xiaoxi
    },
    {
      path: PUBLICURL + '/topic/:id',
      component: Topic
    },
    {
      path: PUBLICURL + '/user/:loginname',
      component: User
    }
  ],
  mode: 'history'
})
