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
        <el-button type="warning" size="medium" @click="uploadModel = true">上传图片</el-button>
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
          <!-- <div style="height: 1000px" >main</div> -->

          <el-row :gutter=10>
            <el-col  :lg="4" :md="6" :sm="8" v-for="(item,index) in imageList" :key="index">
              <!-- 子绝父相, 让蒙版能遮挡一些图片 -->
              <el-card class="box-card mb-3 position-relative" :body-style="{'padding':'0'}" style="cursor:pointer" shadow="hover">
                <!-- 选中图片出现边框 -->
                <!-- <div :class="{'border-left border-danger' : item.ischeck}"> -->
                  <!-- 全部给添加border,如果没选定,则是透明边框 -->
                <div :class="item.ischeck?border_danger:border_transparent">
                  <!-- !!使用原生的标签有助于提高性能,所以不再使用el-tag,而是使用bs提供的的badge -->
                  <!-- <el-tag v-if="item.ischeck" type="danger" effect="dark" style="position: absolute; top: 0; right: 0" size="mini">
                    1
                  </el-tag> -->
                  <!-- 使用bs提供的badge -->
                  <span v-if="item.ischeck" class="badge badge-danger" style="position: absolute; top: 0; right: 0">
                    {{item.checkOrder}}
                  </span>
                  <img :src="item.url" alt="" class="w-100" @click="choose(item)">
                  <!-- 图片标题蒙版 子绝父相 -->
                  <div class="w-100 text-white px-1" style="background: rgba(0,0,0,0.5); margin-top: -25px; position:absolute">
                    <span class="small">{{item.name}}</span>
                  </div>
                  <div  class="p-2 text-center"> 
                    <el-button-group>
                      <el-button icon="el-icon-view" size="mini" class="p-2" @click="previewImage(item.url)"></el-button>
                      <el-button icon="el-icon-edit" size="mini" class="p-2" @click="imageEdit(item,index)"></el-button>
                      <el-button icon="el-icon-delete" size="mini" class="p-2" @click="imageDel(index)"></el-button>
                    </el-button-group>
                  </div>
                </div>
              </el-card>
            </el-col>


          </el-row>
        </el-main>
        <el-footer  style="position: absolute; bottom: 0px; right:0; left:0;">
          Footer
        </el-footer>
      </el-container>
    </el-container>
  </el-container>

  <!-- 修改|创建相册 -->
  <el-dialog :title="albumModelTitle" :visible.sync="albumsModel">
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

  <!-- 图片上传 -->
  <el-dialog title="图片上传" :visible.sync="uploadModel">
    <div class="text-center">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </el-dialog>

  <!-- 使用模态框实现图片预览 -->
  <!-- width="60vw" 横向为视口的50%  距离top为5%的vh-->
  <el-dialog title="预览" :visible.sync="previewModel" width="50vw" top="5vh">
    <!-- 移除图片四周的padding 根据查看未移除之前盒模型的大小,top部分包含了原先 "移除"字样所占用的所有空间为 20+10+24-->
    <div style="margin: -84px -20px -30px -20px">
      <!-- <div> -->
      <img :src="previewUrl" alt="" class="w-100">
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
  computed: {
    albumModelTitle() {
      return this.albumEditIndex > -1 ? "修改相册" : "创建相册"
    }
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
      },
      // 图片上传
      uploadModel: false,
      // 默认关闭图片预览
      previewModel: false,
      previewUrl: "",
      imageList: [],
      border_transparent: 'my-border-transparent',
      border_danger: 'my-border-danger',
      chooseList: [],

    }
  },
  created() {
    this.__init()
  },
  methods: {
    choose(item) {
      if (!item.ischeck) {
        // 加入选中的图片
        this.chooseList.push({
          id: item.id,
          url: item.url
        })
        // 计算序号
        item.checkOrder = this.chooseList.length
        // 修改状态
        item.ischeck = true
        return
      }
      // 已经选中图片的情况,再次点击则
      // 1. 修改状态
      item.ischeck = false
      // 2. 重置序号
      item.checkOrder = 0
      // 3.取消选中
      // 4. 查找到chooseList中的索引,并删除
      let i = this.chooseList.findIndex(v=>v.id === item.id)
      // 找不到则直接返回
      if (i === -1) return
      // 找到情况下
      // 4.1 重新计算序号, 如果取消选择是chooseList最后一个,则不需要重新计算
      let length = this.chooseList.length
      // 不是最后一个的情况. 
      if ( i < length - 1) {
        // 修改i到末尾的序号
        for (let j=i; j<length;j++) {
          // 先尝试找到imageList中的位置
          let no = this.imageList.findIndex(v=>v.id === this.chooseList[j].id)
          // 找到的情况,则将对应的image的checkOrder -1
          if ( no !== -1) {
            this.imageList[no].checkOrder -= 1
          }

        }
      }
      // 4.2 找到则删除
      this.chooseList.splice(i, 1)
    },

    __init(){
      for (let i = 0; i< 20; i++) {
        this.albums.push({
          name: '相册名称'+i,
          num: Math.floor(Math.random()*100),
          order: 0

        })
      };
      for (let i = 0; i< 20; i++) {
        this.imageList.push(
          { 
            id: i,
            url:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg",
            name: "图片",
            ischeck: false,
            checkOrder: 0
          }
        )
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
    // 预览图片
    previewImage(url) {
      this.previewUrl = url
      this.previewModel = true
    },
    // 修改图片名称
    imageEdit(item,index) {
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 初始值
        inputValue: item.name,
        inputValidator(val) {
          if (val === '') {
            return '图片名称不能为空'
          }
        }
      }).then(({ value }) => {
       item.name = value
       this.$message(
         {
           message: "修改成功",
           type: 'success'
         }
       )
      })
    },
    imageDel(index) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.imageList.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      
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
  .my-border-transparent {
    box-sizing:border-box;
    border: solid 1px transparent;

  }
  .my-border-danger {
    box-sizing:border-box;
    border: solid 1px red;
  }
</style>