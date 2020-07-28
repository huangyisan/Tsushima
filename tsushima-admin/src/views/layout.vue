<template>
  <div>
    <el-container class="fullscrean" style="overflow:hidden">
      <el-header class="d-flex align-items-center" style="background-color: #545c64">
        <!-- header -->

        <a class="h5 text-light mb-0 mr-auto">UNI-ADMIN</a>

          <el-menu
            :default-active="navBarIndex"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">商品</el-menu-item>
            <el-menu-item index="3">订单</el-menu-item>
            <el-menu-item index="4">会员</el-menu-item>
            <el-menu-item index="5">设置</el-menu-item>
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
          <li v-for="i in 100" :key="i">{{i}}</li>
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
  export default {
    data() {
      return {
        navBarIndex: '1',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        size: "small"
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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