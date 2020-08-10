<template>
<div>
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
        <el-button type="success" size="medium" @click="openAlbumModel(false)">创建相册</el-button>
        <el-button type="warning" size="medium">上传图片</el-button>



    </el-header>
    <el-container>
      <el-aside width="200px" style="position: absolute; top:60px; left:0; bottom: 60px" class="bg-write border-right">
      <!-- <el-aside width="200px"> -->
        <div style="height: 1000px">
          <!-- 侧边相册列表 -->
          <ul class="list-group list-group-flush">
            <!-- 将album-item抽出, item和index传递过去 -->
            <album-item v-for="(item,index) in albums" :key="index" 
            :item="item" 
            :index="index"
            :active="albumIndex === index"
            @change="albumChange"
            @edit="openAlbumModel"
            @del="albumDel"
            ></album-item>
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

  <!-- 修改|创建相册 -->
  <el-dialog title="修改相册" :visible.sync="albumsModel">
    <el-form :model="albumForm" ref="form" label-width="80px">
      <el-form-item label="相册名称">
        <el-input v-model="albumForm.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="相册排序">
        <el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="albumsModel = false">取 消</el-button>
      <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
    </div>
  </el-dialog>




  </div>

 



</template>

<script>
import albumItem from '@/components/image/album-item'
export default {
  components: {
    albumItem
  },

  data() {
    return {
      searchForm: {
        order: '',
        keyword: ''
      },
      albumIndex: 0,
      // 当前编辑相册的索引,默认为-1, 当-1的时候表示为新建相册, 如果大于-1,则为编辑
      albumEditIndex: -1,
      albums: [],
      // albums是否课件
      albumsModel: false,
      // albumForm
      albumForm: {
        name: "",
        order: 0
      }
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
    },
    albumDel(index) {

      this.$confirm('是否删除该相册?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除选定的相册
        this.albums.splice(index,1)

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //打开|创建相册修改框 ,如果obj为空,则是创建, 有值则修改
    openAlbumModel(obj){
      // 修改
      if (obj) {
        //结构出obj数据
        let {item, index} = obj
        // 初始化表单
        this.albumForm.name = item.name
        this.albumForm.order = item.order
        this.albumEditIndex = index
        // 打开模态框
        this.albumsModel = true
        // 结束
        return
      }
      // 如果是创建相册创建相册
      this.albumForm = {
        name: "",
        order: 0,
      }
      // 将albumEditIndex置为-1
      this.albumEditIndex = -1
      // 打开模态框
      this.albumsModel = true

    },
    // 点"确定"修改|创建相册框
    confirmAlbumModel() {
      // 判断是否为修改还是创建
      if (this.albumEditIndex > -1) {
        this.albumEdit();
        this.albumsModel = false
        // 结束修改,如果用else来处理下面创建情况,则不需要return
        return
      }
      // 创建的情况
      // unshift, 在左侧追加对象
      this.albums.unshift({
        name: this.albumForm.name,
        order: this.albumForm.order,
        num: 0
      })
      this.albumsModel = false
    },

    albumEdit() {
      // 从albumEditIndex得到当前索引
      this.albums[this.albumEditIndex].name = this.albumForm.name
      this.albums[this.albumEditIndex].order = this.albumForm.order
      // 关闭
      
    },
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