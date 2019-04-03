<!-- 红色的点状线动画 -->
<template>
	<ul class="du_anim_bar" :class="{'right':position=='right'}">
	  <li v-for="item in ii"></li>
	</ul>
</template>

<script>
export default {
  data(){
    return{
    	ii:1
    }
  },
  props: {
  	position:{type: String},
  	len: {
  	 type: Number,
  	 default: 39
  	}
  },
  created(){
  	setInterval(
  	  ()=>{
  	    this.ii++;
  	    if(this.ii==this.len){this.ii=0}
  	  },30);
  },

  methods: {
    show() {    }
  }
}
</script>

