<template>
  <div id="app">
    <el-scrollbar style="width: 100%;height: 1080px;"> <!-- 滚动条 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </el-scrollbar>
    
  </div>
</template>
<script>

export default {
  components: {
    
  },
  data: function() {
    return {
      
    }},
    methods: {
    },
  created: function() {
    document.title = this.$main_tit;
  }
}
</script>

<style lang="scss">
  #app{min-height: 100%;}
</style>
