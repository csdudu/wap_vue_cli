<template>
   <transition name="t1">
     <div class="du_pop" v-if="visible">
         <slot></slot>
     </div>
   </transition>
</template>
<script>
export default {
 name: "du_pop",
 data() {
  return {
    txt:"",
  };
 },
 watch: {},
 props: ["visible"],
 computed: {},
 mounted() {
   
 },
 methods: {
   show(str){
    //   this.visible = true;
      this.txt = str;
   }
 }
};
</script>

<style lang="scss">
  .du_pop{
    position: absolute; width:100%; height:100%; background-color: rgba(0, 0, 0, 0.8);
    display: flex; align-items: center; justify-content: center;
    color: #fff; z-index: 3; font-size: .3rem;
    .strong{display: inline-block; background-color: #900; color: #fff; margin: 0 .2em; width: 1.4em;
    text-align: center; font-size: .3rem; border-radius: 5px;}
  }
</style>
