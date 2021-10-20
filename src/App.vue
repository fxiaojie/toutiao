<template>
  <div id="app">
    <!-- LayoutIndex 组件被缓存 -->
    <keep-alive :include="cachePages">
      <!-- 路由出口 -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less"></style>
