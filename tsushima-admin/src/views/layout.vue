<template>
  <div>
    <el-container class="fullscrean" style="overflow:hidden">
      <el-header>Header</el-header>
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
</script>

<style>
  .fullscrean {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .el-header {
      background-color: #B3C0D1;
      color: #333;

  }
    
  .el-aside {
    background-color: #D3DCE6;
    color: #333;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;

  }
</style>