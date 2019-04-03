<template>
  <rlink :href="url" class="pic_bg"     :style="{backgroundImage: 'url(' + src + ')'}">
    <template vif="!src"><slot></slot></template>
  </rlink>
</template>

<script>

export default {
  props: {
    src: {type: String, default: null },
    url: {type: String, default: null }
  },
  mounted(){},
  methods:{
    onClickLeft(){
      
    }
  }
}
</script>

<style lang="scss">
  .pic_bg{
    display: block; width: 100%; background-size: cover; background-position: center center; background-repeat: no-repeat;
  }
</style>
