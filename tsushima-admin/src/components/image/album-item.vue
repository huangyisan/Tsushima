<template>
  <!-- 当前选中索引是否等于激活的索引, 如果为真,则加入active这个class样式 -->
  <li class="list-group-item list-group-item-action d-flex align-items-center" 
  @click="albumChange(index)" :class="{'active' :active}" style="cursor:pointer">
    {{item.name}}
    <el-dropdown class="ml-auto">
      <span class="btn btn-light btn-sm border">
        {{item.num}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.stop.native="openAlbumModel({index, item})">修改</el-dropdown-item>
        <!-- 事件阻止 + 原生方法 -->
        <el-dropdown-item @click.stop.native="albumDel(index)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </li>
</template>


<script>
export default {
  props: {
    item: Object,
    index: Number,
    active: Boolean
  },
  methods: {
    // 三个方法emit出去,让父组件去监听事件
    albumChange(index) {
      this.$emit('change', index)
    },
    openAlbumModel(obj) {
      this.$emit('edit', obj)
    },
    albumDel(index) {
      this.$emit('del', index)
    }
  }
  
}
</script>

<style>

</style>