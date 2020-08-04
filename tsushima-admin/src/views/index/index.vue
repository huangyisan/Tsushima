<template>
  <div>
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
      <el-col :span="12" style="height: 370px; justify-content: space-between" class="d-flex flex-column">
        <el-card class="box-card mb-auto" shadow="never" v-for="(item,index) in tips" :key="index">
          <div slot="header" class="clearfix">
            <span>{{item.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{item.desc}}</el-button>
          </div>
          <div class="row">
            <div :class="item.list.length | getCol" v-for="(iten, indey) in item.list" :key="indey">
              <button class="btn-light btn w-100">
                <h4 mb-1>{{iten.value}}</h4>
                <small class="text-muted">{{iten.name}}</small>
              </button>
            </div>      
          </div>
        </el-card>
      </el-col>

       <!-- 统计图 -->
      <el-col :span="12">
        <el-card class="box-card" shadow="never" style="height:370px">
          <div slot="header" class="clearfix">
            <span>统计图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            <!-- ref用来echarts初始化的时候选择该div -->
            <!-- 统计图 -->
            <div ref="myChart" style="width:100%;height:270px"></div>
          </div>
            
        </el-card> 
      </el-col>
    </el-row>


      <!-- 销售情况统计 -->
    <el-row :gutter="20"  class="my-3">
      <el-col :span="12">
          <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

          <!-- 里面使用bootstrap的布局->媒体 -->
          <div class="media align-items-center border">
            <span class="py-4 px-3 bg-light border-right">
              昨日销量
            </span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-2 pt-1 mb-1"><span>数量0</span></div>
              <div class="pl-3"><span>数量0</span></div>
            </div>

          </div>

          <div class="media align-items-center border mt-3">
            <span class="py-4 px-3 bg-light border-right">
              昨日销量
            </span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-2 pt-1 mb-1"><span>数量0</span></div>
              <div class="pl-3"><span>数量0</span></div>
            </div>

          </div>
            
        </el-card> 
      </el-col>

      <el-col :span="12">
          <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>单品畅销</span>
            <el-button style="float: right; padding: 3px 0" type="text">商家统计订单和金额</el-button>
          </div>
          <div class="text item">
         <el-table
          :data="tableData"
          height="164"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品信息"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sells"
            label="销量">
          </el-table-column>
        </el-table>
          </div>
            
        </el-card> 
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入echart
import echarts from "echarts"

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
      ],
      tips: [
        { 
          title:"店铺及商品提示",
          desc:"需要关注店铺信息及处理注意事项",
          list: [
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},

          ]
        },
        { 
          title:"店铺及商品提示",
          desc:"需要关注店铺信息及处理注意事项",
          list: [
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},
            { name: "出售中", value: 64},

          ]
        }
      ],
        tableData: [
          {
            name: '雪碧',
            sells: 1
          },
          {
            name: '可乐',
            sells: 2
          },
          {
            name: '芬达',
            sells: 30
          },
          {
            name: '红牛',
            sells: 14
          },
          {
            name: '椰子汁',
            sells: 145
          },
      ]
    }
  },
  filters: {
    // 动态获取行数
    getCol(value) {
      return `col-${12 / value}`
    }
  },

  // mounted为dom全部渲染完毕后的生命周期
  mounted() {
    // 调用methods中drawLine方法进行画图, 因为drawLine需要初始化echarts对象
    // 且该对象初始化又要用到dom   (this.$refs.myChart), 所以需要放到mounted生命周期函数内.
    this.drawLine()
  
  },

  methods: {
    // 定义echarts展现方法
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.myChart);
      myChart.setOption({
tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
      })
    }
  }
}
</script>

<style>

</style>