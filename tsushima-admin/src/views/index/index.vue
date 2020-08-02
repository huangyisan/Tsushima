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