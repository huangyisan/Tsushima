<template>
  <div id="app">
    <!-- 显示路由组件 -->
    <router-view></router-view>

  </div>
</template>

<script>

export default {
  data() {
    return {
      radio: 3
    };
  },
  name: 'app',
  components: {
  },
  methods: {
    change(e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>

