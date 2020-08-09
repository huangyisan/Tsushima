<template>
  <el-container style="position: absolute; top: 74px; bottom: 0; left: 0; right: 0;">
    <el-header  class="d-flex align-items-center border-bottom">
      <div class="d-flex mr-auto">
        <el-select v-model="searchForm.order" placeholder="请选择图片排序方式" size="mini">
          <el-option v-for="(item,index) in searchForm"
            :key="index"
            :label="item.order"
            :value="item.keyword">
          </el-option>
        </el-select>
        <el-input  size="mini" placeholder="输入相册名称" v-model="searchForm.keyword"></el-input>
        <el-button type="primary" size="mini" >搜索</el-button>
      </div>
        <el-button type="success" size="medium">创建相册</el-button>
        <el-button type="warning" size="medium">上传图片</el-button>



    </el-header>
    <el-container>
      <el-aside width="200px" style="position: absolute; top:60px; left:0; bottom: 60px" class="bg-write border-right">
      <!-- <el-aside width="200px"> -->
        <div style="height: 1000px">
          <!-- 侧边相册列表 -->
          <ul class="list-group list-group-flush">
            <!-- 当前选中索引是否等于激活的索引, 如果为真,则加入active这个class样式 -->
            <li class="list-group-item list-group-item-action d-flex align-items-center" v-for="(item,index) in albums" :key="index"
            @click="albumChange(index)" :class="{'active': albumIndex === index}" style="cursor:pointer">
              {{item.name}}
              <el-dropdown class="ml-auto">
                <span class="btn btn-light btn-sm border">
                  {{item.num}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
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

<script>
export default {
    data() {
      return {
        searchForm: {
          order: '',
          keyword: ''
        },
        albumIndex: 0,
        albums: []
      }
    },
    created() {
      this.__init()
    },
    methods: {
      __init(){
        for (let i = 0; i< 20; i++) {
          this.albums.push({
            name: '相册名称'+i,
            num: Math.floor(Math.random()*100),
            order: 0

          })
        }
      },
      albumChange(index) {
        this.albumIndex = index
      }
    }
  }
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