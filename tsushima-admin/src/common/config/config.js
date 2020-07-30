export default {
  logo: "UNI-ADMIN",

  navBar: {
    active: "0",
    list: [
      // 每个分栏下的子页
      { 
        name: "首页",
        subActive: "0",
        submenu: [
          {
            //element查询 icon 图标库
            icon: "el-icon-s-home",
            name:"后台首页"
          },
          {
            icon: "el-icon-s-claim",
            name: "商品列表"
          }
        ] 
        
        },
      { 
        name: "商品", 
        subActive: "0",
        submenu:[
          {
            icon: "el-icon-s-claim",
            name: "商品列表"
          }
        ]
      },
      { name: "订单" },
      { name: "会员" },
      { name: "设置" },
    ]
  },
  circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  size: "small"

}