<template>
  <div class="du_rect">
      <div class="body">
          <slot></slot>
          
      </div>
      <div class="foot"></div>
      <img src="../assets/images/fm4.png" class="rr">
      <du_anim_bar></du_anim_bar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show_bar:false,
      ii:0
    }
  },
  props: [],
  created(){
    
  },
  computed:{
  },
  methods: {
  }
}
</script>

<style lang="scss">
  
</style>