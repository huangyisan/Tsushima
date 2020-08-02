<template>
  <div>
    后台首页
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card" shadow="hover">
          <div  class="d-flex align-items-center">
            <!-- 多个class为数组的形式 -->
            <i :class="[item.icon, item.color]" class="h4 mb-0 mr-3" style="width:40px; height:40px; text-align:center; line-height: 40px;"></i>
            <div>
              <h4 mb-1>{{item.num}}</h4>
              <small class="text-muted">{{item.desc}}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺,订单提示| 统计图 -->
    <el-row :gutter="20" class="mt-3">
      <!-- 店铺 订单提示-->
      <el-col :span="12" style="height: 370px" class="d-flex flex-column">
        <el-card class="box-card mb-auto" shadow="never">
          <div slot="header" class="clearfix">
            <span>店铺及商品提示</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="row">
            <div class="col-3">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            
          </div>
        </el-card>

        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>交易提示</span>
            <el-button style="float: right; padding: 3px 0" type="text">交易提示</el-button>
          </div>
          <div class="row">
            <div class="col-2">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn-light btn w-100">
                <h4 mb-1>50</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>

      <!--  统计图 -->
      <el-col :span="12">
        <el-card class="box-card" shadow="never" style="height:370px">
          <div slot="header" class="clearfix">
            <span>统计图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            统计图
          </div>
            
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      counts: [
        {
          icon: "el-icon-delete-solid",num: 30,desc: "关注人数(个)", color:"bg-primary"
        },
        {
          icon: "el-icon-delete-solid",num: 130,desc: "订单总数(个)", color:"bg-success"
        },
        {
          icon: "el-icon-delete-solid",num: 230,desc: "今日金额(元)", color:"bg-danger"
        },
        {
          icon: "el-icon-delete-solid",num: 1130,desc: "本月金额(元)", color:"bg-warning"
        },
      ]
    }
  }
}
</script>

<style>

</style>