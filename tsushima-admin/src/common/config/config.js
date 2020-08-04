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
            name:"后台首页",
            pathname:"index"
          },
          {
            icon: "el-icon-s-claim",
            name: "商品列表",
            pathname: "shop_goods_list"
          },
          {
            icon: "el-icon-s-claim",
            name: "相册管理",
            // 结尾是index,所以只需要填写image,原本是image_index,根据router.js中路径名称来决定,/替换成_
            pathname: "image"
          },
        ] 
        
        },
      { 
        name: "商品", 
        subActive: "0",
        submenu:[
          {
            icon: "el-icon-s-claim",
            name: "商品列表",
            pathname: "shop_goods_list"
          }
        ]
      },
      { name: "订单" },
      { name: "会员" },
      { name: "设置" },
    ]
  },


}