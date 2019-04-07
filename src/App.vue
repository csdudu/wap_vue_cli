<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {};
  },
  methods: {},
  created: function() {
    document.title = this.$main_tit;
  }
};
</script>