<!-- loading层 -->
<template>
  <transition name="t1">
    <div class="du_loading_pop" v-if="flag_loading">
      <center>
        <slot></slot>
        <div class="progress">
          <span></span>
        </div>
        <div class="h50"></div>
        <div class="h50"></div>
        <div class="h50"></div>
      </center>
      
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        flag_loading:true
      }
    },
    props: [],
    created() {
      setTimeout(
      ()=>{
      this.flag_loading = false;
      },2000);
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss">
  .du_loading_pop{
    position: fixed; width:100%; height:100%; background-color: #979388; z-index: 5; display: flex; align-items: center;
    justify-content: center;
    img{width: 1.55rem;}
    .progress{
      height: 0.08rem; background-color: #dcdcdc; display: flex; justify-content: flex-start; border-radius: 0.04rem;
      overflow: hidden; margin-top: .5em;
      span{background-color: #333; width: 0%; height: 100%; animation: progress 2.2s;}
    }
  }
  
  @keyframes progress {
    0% { width: 0%; }
    20% { width: 20%; }
    50% { width: 40%; }
    60% { width: 60%; }
    80% { width: 80%; }
    100% { width: 100%; }
  }
</style>