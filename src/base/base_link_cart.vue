<!-- 带购买量的购物车小按钮，点击跳转到购物车 -->
<template>
  <rlink href='/cart' class="base_link_cart"><i class='iconfont icon-gouwuche '></i><div class="info" v-if="$store.state.sum_total">{{$store.state.sum_total}}</div></rlink>
</template>

<script>
export default {
  props: [],
  mounted() {
  }
}
</script>

<style scoped lang="scss">
</style>
