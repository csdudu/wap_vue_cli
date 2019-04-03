<!-- 调用 -->
<!-- <du_dropdown :data="opt[2].sub_map" @change="dropdown_change($event,2)"></du_dropdown> -->
<template>
   <el-dropdown @command="dropdown_command">
     <span class="el-dropdown-link">
       <img src="../assets/images/arr_sm.png">
     </span>
     <el-dropdown-menu slot="dropdown">
       <el-dropdown-item :command="index" v-for="(item,index) in data" :key="item">{{item}}</el-dropdown-item>
     </el-dropdown-menu>
   </el-dropdown>
</template>
<script>
export default {
 name: "du_dropdown",
 data() {
  return {
  };
 },

 props: ["data"],
 computed: {},
 mounted() {
 },
 methods: {
  dropdown_command(e) {
    this.$emit("change",e)
  }
 }
};
</script>