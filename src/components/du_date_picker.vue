<!-- 调用 -->
<!-- <du_date_picker @change="dateD($event,2)"></du_date_picker> -->
<template>
  <div class="du_date_picker">
    <i class="el-icon-caret-left" @click="prev"></i>
    <a href="#">{{tit}}</a>
    <i class="el-icon-caret-right" @click="next"></i>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data(){
    return{
      offset:0
    }
  },
  props: [],
  created(){
  },
  watch:{
    offset:function(curVal,oldVal){
      if(curVal!=oldVal){
        this.$emit("change",moment().subtract(this.offset,'days'));
      }
    }
  },
  computed:{
    tit() {
      return moment().subtract(this.offset,'days').format("YYYY/MM/DD")
    },
  },
  methods: {
    prev() {
      this.offset++;
      // this.$emit("change",moment().subtract(this.offset,'days'));
    },
    next() {
      this.offset = Math.max(0,this.offset-1);
      // this.$emit("change",moment().subtract(this.offset,'days'));
    }
  }
}
</script>
