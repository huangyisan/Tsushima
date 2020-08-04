<template>
  <div>
    <el-container class="fullscrean" style="overflow:hidden">
      <el-header class="d-flex align-items-center" style="background-color: #545c64">
        <!-- header -->

        <a class="h5 text-light mb-0 mr-auto">{{$conf.logo}}</a>

          <el-menu
            :default-active="navBar.active"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!-- 使用过滤器将index转换为string类型,这边框架需要用string类型的index才能被使用 -->
            <el-menu-item :index="index|numToString" v-for="(item, index) in navBar.list" :key="index">{{item.name}}</el-menu-item>

            <!-- 带子目录的tab -->
            <el-submenu index="100">
              <template slot="title">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
                huangyisan</template>
              <el-menu-item index="100-1">修改</el-menu-item>
              <el-menu-item index="100-2">退出</el-menu-item>
            </el-submenu>
          </el-menu>
      </el-header>
      <!-- header占了60px,所以侧边栏被占用了60px, 底部给padding-bottom 60px,  height:100%是给滚动效果 -->
      <!-- <el-container style="height:100%; padding-bottom:60px;"> -->
      <el-container style="height:100%;">
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <!-- <li v-for="i in 100" :key="i">{{i}}</li> -->
          <el-menu :default-active="slideMenuActive" @select="slideSelect" style="height:100%">
            <el-menu-item :index="index|numToString" v-for="(item, index) in slideMenus" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主布局 -->
        <el-main class="bg-light" style="padding-bottom:60px">
          <!-- 面包屑导航 -->
          <div class="border-bottom bg-white" v-if="bran.length > 0">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="padding:20px;">
              <el-breadcrumb-item v-for="(item, index) in bran" :key=index :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 主内容 -->
          <!-- <li v-for="i in 100" :key="i">{{i}}</li> -->
          <router-view></router-view>
          <!-- target=作用的对象， 这边也就是把回到顶部作用在el-main上 -->
            <el-backtop target=".el-main" :bottom="100">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  background-color: #f2f5f6;
                  box-shadow: 0 0 6px rgba(0,0,0, .12);
                  text-align: center;
                  line-height: 40px;
                  color: #1989fa;
                "
              >
                UP
              </div>
            </el-backtop>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// common为一些通用的方法,比如numToString
  import common from "@/common/mixins/common"
  export default {
    // mixins为关键字
    mixins:[common],
    data() {
      return {
        navBar:[],
        bran: [],
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        size: "small"
      }
    },
    // 页面启动创建的时候,将conf中的navBar信息加载
    created() {
      this.navBar = this.$conf.navBar
      this.getRouterBran()
      //初始化选中菜单
      this.__initNavBar()
    },
    computed: {
      // 当前活跃的状态的slidemenu
      slideMenuActive: {
        set(val) {
          this.navBar.list[this.navBar.active].subActive = val
        },
        get() {
          console.log('slidemenu激活')
          console.log(this.navBar.list[this.navBar.active].subActive)
          return this.navBar.list[this.navBar.active].subActive || "0"

        }
      },
      slideMenus() {
        // 获取侧边栏的submenu, 不存在就返回[]
        return this.navBar.list[this.navBar.active].submenu || []
      }
    },
    watch: {
      '$route'(to, from) {
        // console.log(to)
        // console.log(from)
        // 当路由跳转的时候进行本地存储
        localStorage.setItem('navActive', JSON.stringify({
          // 记录顶栏激活的信息
          top: this.navBar.active,
          // 记录侧栏激活的信息
          left: this.slideMenuActive
        }))
        this.getRouterBran()

      }
    },

    methods: {
      //初始化时候载入使用的页面信息
      __initNavBar() {
        let r = localStorage.getItem('navActive')
        console.log(`sdfsdf{r}`)
        if (r) {
          r = JSON.parse(r)
          
          this.navBar.active = r.top
          this.slideMenuActive = r.left
          console.log('navBar激活' + this.navBar.active)
          console.log('sidebar激活' + this.slideMenuActive)
        }
      },
      // 获取面包屑导航
      getRouterBran() {
        // 过滤出带name的内容,从路由里面获取内容信息
        let b = this.$route.matched.filter(v=>v.name)
        let arr = []
        b.forEach((v,k)=> {
          // 过滤layout和index 这个页面不去显示面包屑导航
          if (v.name === "index" || v.name === "layout") return
          arr.push({
            name: v.name,
            path: v.path,
            // title: v.meta.title
            title: v.meta.title || "无title"
          })
        })
        // 如果arr存在,则在数组最前面追加index
        if (arr.length > 0) {
          arr.unshift({
            name: 'index',
            path: '/index',
            title: '后台首页'
          })
        }
        this.bran = arr
      },
      // 顶部点击 控制台打印输出
      handleSelect(key, keyPath) {
        // navbar点击后更新active的值,然后让sildebar根据active得到对应的子栏
        this.navBar.active = key
        // 点击后跳转到激活的左栏第0个
        // 当侧边存在目录的时候,才执行
        if(this.slideMenus.length >0 ) {
          this.$router.push({
            
            name: this.slideMenus[0].pathname
          })
        }
      },
      // 侧边栏点击,控制台输出内容
      slideSelect(key, keyPath) {
        this.slideMenuActive = key
        // 然后跳转到对应的页面
        this.$router.push({
          name: this.slideMenus[key].pathname
        })
        console.log(this.slideMenus[key].pathname)
      }
    }
  }
</script>

<style>
  .fullscrean {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  /* .el-header {
      background-color: #B3C0D1;
      color: #333;

  } */
    
  .el-aside {
    background-color: #D3DCE6;
    color: #333;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;

  }
</style>