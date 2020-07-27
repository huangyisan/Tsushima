let routes = [
  {
    // path:'/',
    // name:'layout',
    redirect:{name: 'index'}, //默认跳转到name为index的路由
    component: 'layout',
    // 该路径下的子路径
    children: [
      {
        // path:'/index',
        // name:'index',
        // component:()=>import('../../views/index/index.vue'),
        component: 'index/index',
      },
      {
        component: 'shop/goods/list'
      }
    ],
    
  },
  {
    // path:'/login',
    // name:'login',
    // 懒加载
    component: 'login/index',
  },
  {
    // 如果没有匹配到以上路由，则跳转到index页面
    path:"*",
    redirect:"index"
  }
]

// 获取路由信息方法
let getRoutes = function(){
  // 生成路由详细信息
  createRoute(routes)
  return routes
}

// 自动生成路由的方法
function createRoute(arr) {
  for (let i = 0; i<arr.length; i++) {
    // 当routes内容没有component的时候,也就是触发默认路由跳转index
    if (! arr[i].component) {
      return
    }
    // 去除component的index, 一下name和path都是根据component进行动态生成,如果代码中已经包含name和path,则以代码中的name和path为准.
    let val = getValue(arr[i].component)
    // 生成name, /替换成_. ||前面表示如果用户配置了name,则不需要额外生成
    arr.name = arr[i].name || val.replace(/\//g,"_")
    // 生成path, component前面加一个/, ||前面表示如果用户配置了path,则不需要额外生成
    arr[i].path = arr[i].path || `/${val}`
    let componentFun = import(`../../views/${arr[i].component}.vue`)
    // 实现了component:()=>import('../../views/xxx.vue')
    arr[i].component = ()=> componentFun
    // 遍历子路由下是否还有子路由, 实现递归
    if (arr[i].children && arr[i].children.length >0 ) {
      createRoute(arr[i].children)
    }


  }
}

// 去除index结尾的方法
function getValue(str) {
  // 获取最后一个/后的内容是否为index
  let index = str.lastIndexOf('/') // 拿到最后一个/的字符串索引值
  // 获取最后一个/后的内容
  let val = str.substring(index+1, str.length)
  // 判断是否index结尾
  if (val === 'index') {
    return str.substring(index,-1)
  }
  return str
}

export default getRoutes()