<template>
  <el-container style="position: absolute; top: 74px; bottom: 0; left: 0; right: 0;">
    <el-header  class="d-flex align-items-center border-bottom">
      <div class="d-flex mr-auto">
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option>
          </el-option>
          <el-option>
          </el-option>
        </el-select>
        <el-input  size="mini"></el-input>
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
        <el-button type="success" size="medium">创建相册</el-button>
        <el-button type="warning" size="medium">上传图片</el-button>



    </el-header>
    <el-container>
      <el-aside width="200px" style="position: absolute; top:60px; left:0; bottom: 60px">
      <!-- <el-aside width="200px"> -->
        <div style="height: 1000px">aside</div>
      </el-aside>
      <el-container>
        <el-main style="position: absolute; top:60px; left:200px; bottom: 60px; right:0">
        <!-- <el-main> -->
          <div style="height: 1000px" >main</div>
        </el-main>
        <el-footer  style="position: absolute; bottom: 0px; right:0; left:0;">
          Footer
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style>
 .el-footer {
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