<!-- 购物车小按钮，点击调用购买窗口 -->
<template>
  <i class='iconfont icon-gouwuche1 base_ico_cart' @click="clickH"></i>
</template>

<script>
export default {
  props: ["data","sele"],	//data为商品，sele为本商品被选中的sku
  methods: {
    clickH(){
      // 当前数据压入goods_current
      if(_.isEmpty(this.data.sku_tree)){
        this.toast("请进入商品详情页购买!当前页面无法购买")
      }else{

          // 把当前商品数据及数量压入store
          this.$store.commit('set_goods_current',{info:this.data,sku:this.sele});

          // 打开商品选择器面板
          // this.$store.commit('switch_goods_current',true);
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../style/mixin';
</style>
