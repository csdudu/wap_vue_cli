<template>
  <div class="test">
  	--{{user}}--
  	<slot v-bind:user="user">
  		{{user}}
  	</slot>
  </div>
</template>
<script>
export default {
  data(){
    return{
      user:"我的名字"
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
	.red{color: #900;}
</style>