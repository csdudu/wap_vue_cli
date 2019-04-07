<template>
   <transition name="t1">
     <div class="du_toast" v-if="visible">
       <center>
         {{txt}}
       </center>
     </div>
   </transition>
</template>
<script>
export default {
 name: "du_toast",
 data() {
  return {
    txt:"",
    visible:false
  };
 },
 watch: {},
 props: {
 },
 computed: {},
 mounted() {
   
 },
 methods: {
   show(str){
      this.visible = true;
      this.txt = str;
     setTimeout(()=> {
      this.txt = "";
      this.visible = false;
     }, 3000);
   }
 }
};
</script>

<style lang="scss" scoped>
  .du_toast{
    position: absolute;
    left:50%; top:50%;
    transform: translate(-50%,-50%);
    width:5rem;min-height:1rem; border-radius: 10px; padding: .3rem; background-color: rgba(0, 0, 0, 0.8);
    display: flex; align-items: center; justify-content: center;
    color: #fff; z-index: 4;
  }
</style>
