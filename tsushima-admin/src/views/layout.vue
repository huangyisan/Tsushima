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
      <el-container style="height:100%; padding-bottom:60px">
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <!-- <li v-for="i in 100" :key="i">{{i}}</li> -->
          <el-menu default-active="2" @select="slideSelect">
            <el-menu-item :index="index|numToString" v-for="(item, index) in slideMenus" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 主内容 -->
          <li v-for="i in 100" :key="i">{{i}}</li>
        </el-main>
      </el-container>
    </el-container>

    <!-- <router-view></router-view> -->
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
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        size: "small"
      }
    },
    // 页面启动创建的时候,将conf中的navBar信息加载
    created() {
      this.navBar = this.$conf.navBar
    },
    computed: {
      slideMenuActive: {
        set(val) {
          console.log(val)
          this.navBar.list[this.navBar.active].subActive = val
        },
        get() {
          console.log(this.navBar.list[this.navBar.active].subActive)
          return this.navBar.list[this.navBar.active].subActive || "0"

        }
      },
      slideMenus() {
        // 获取侧边栏的submenu, 不存在就返回[]
        return this.navBar.list[this.navBar.active].submenu || []
      }
    },

    methods: {
      // 顶部点击 控制台打印输出
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        // navbar点击后更新active的值,然后让sildebar根据active得到对应的子栏
        this.navBar.active = key
      },
      // 侧边栏点击,控制台输出内容
      slideSelect(key, keyPath) {
        console.log(key, keyPath)
        this.slideMenuActive = key
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