import Vue from "vue"
import Router from "vue-router"

import layout from "./views/layout.vue"

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      name:'layout',
      component: layout,
      // 该路径下的子路径
      children: [
        {
          path:'/index',
          name:'index',
          component:()=>import('./views/index/index.vue'),
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      // 懒加载
      component: ()=>import('./views/login/index.vue')
    }
  ]
})