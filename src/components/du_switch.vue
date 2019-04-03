<template>
  <div class="du_switch">
      <div class="bg"></div>
      <div class="bar" :class="'b'+value"></div>
      <ul class="tit">
        <li v-for="(item,index) in tit" :class="{'active':index==value}"
          @click="clickH(index)"
        >
          {{item}}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // ttt:["全网控","全自控","全停"]
    }
  },
  props: ["value","tit"],
  created(){
  },
  computed:{
  },
  methods: {
    clickH(n) {
      this.$emit("input",n);
    }
  }
}
</script>

<style lang="scss">
  $width:192px;
  .du_switch{
    margin: 10px;
    background-color: #162d4a;
    border: 1px #2e4a69 solid;
    border-radius: 3px;
    width: $width; height: 30px; position: relative;
    .tit{position: absolute; width: 100%;
      display: flex; align-items: center; height: 100%;
      li{
        flex: 1; height: 100%; display: flex;
        align-items: center; justify-content: center;
        cursor: pointer;
        color: #768eab; transition: all 0.3s;
        &.active{color: #fff;  text-shadow: 0px 0px #172c4c; }
        &.active:nth-child(3){color: #f00;}
      }
    }
    .bar{position: absolute; left:-1px; top:-2px; border-radius: 3px; box-shadow: inset 4px 4px 1px #000;
      width: $width/3; height: 32px; border: 1px #fff solid; box-shadow: 0 0 5px #000;
      background-image: linear-gradient(to top, #29649c, #3b92dc); transition: all 0.3s;
      &.b1{transform: translate($width/3,0%); }
      &.b2{transform: translate($width/3*2,0%); }
    }
  }
</style>
