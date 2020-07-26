let routes = [
  {
    path:'/',
    name:'layout',
    redirect:{name: 'index'}, //默认跳转到name为index的路由
    component: ()=>import('../../views/layout.vue'),
    // 该路径下的子路径
    children: [
      {
        path:'/index',
        name:'index',
        component:()=>import('../../views/index/index.vue'),
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    // 懒加载
    component: ()=>import('../../views/login/index.vue')
  },
  {
    // 如果没有匹配到以上路由，则跳转到index页面
    path:"*",
    redirect:"index"
  }
]

export default routes