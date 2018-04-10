import Vue from 'vue'
import Router from 'vue-router'

//组件导入
import Main from '../components/Main.vue'
import Activity from '../components/Activity.vue'
import User from '../components/User.vue'
import FormDesign from '../components/FormDesign.vue'
import PosterDesign from '../components/PosterDesign.vue'
import Form from '../components/Form.vue'
import Poster from '../components/Poster.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: "active",
  routes: [
    {
      path: '/', 
      redirect: '/index'   
    },
    {
      path: '/index',
      name: 'index',
      component: Main,
      redirect: '/index/activity',
      children: [
        {
          name: 'activity',
          path: 'activity',
          component: Activity
        },
        {
          name: 'user',
          path: 'user',
          component: User
        },
      ]
    },
    {
      path: '/formdesign',
      name: 'formdesign',
      component: FormDesign
    },
    {
      path: '/posterdesign',
      name: 'posterdesign',
      component: PosterDesign
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/poster',
      name: 'poster',
      component: Poster
    }
  ]
})
