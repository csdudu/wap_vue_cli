<template>
  <div>
    <span v-bind="$attrs">{{$attrs.title}}</span>
    <input type="text"
      v-bind="$attrs"
      @input="$emit('input',$event.target.value)"
      >
  </div>
</template>

<script>

export default {
  props: ["bbb"],
  /*inheritAttrs: false,*/
  data() {
      return {
        // show: true
      };
    },
    computed:{

    },
    mounted() {
        console.log('----',this.bbb,this.title,this.$attrs);
    },
    methods: {
      inputH(flag) {
        console.log('!!!!!!',flag);
        this.closeH();
        // this.$store.commit('switch_goods_current',false);
        // this.show=flag;
      },
      closeH() {
        // this.show = false;
        this.$store.commit('switch_goods_current',false);
      }
    }
}
</script>

<style lang="scss">
  .van-popup{padding: .5rem !important; background-color: #900}
</style>
