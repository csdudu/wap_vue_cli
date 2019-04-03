<template>
   <!-- <div>
      <center class="tit1">{{tit}}- <span v-for="item in option.series[0].data">{{item}}|</span></center>
     <div :id="id" :style="style" class="du_chart"></div>
   </div> -->
     <div :id="id" :style="style" class="du_chart"></div>
</template>
<script>
export default {
 name: "du_chart",
 data() {
  return {
   
   chart: {},  //echarts实例
   default_opt: {  //当无法提供外部option，用这个空option初始化图形

    "legend": {enabled : true},
    "tooltip": {},
    "dataset": {
      "source": [              ]
    },
    "xAxis": {
      "type": "category"
    },
    "yAxis": {},
    "series": [{
        "type": "bar"
      }
    ]
    
   },
  };
 },
 watch: {
   //观察option的变化
   option: {
    handler(newVal, oldVal) {
     if (this.chart) {
      if (newVal) {
       this.chart.setOption(newVal);
      } else {
       this.chart.setOption(oldVal);
      }
     } else {
      console.log('init');
       this.init();
     }
    },
    deep: true //对象内部属性的监听，关键。
   }
  },
 props: {
  //父组件需要传递的参数：id，width，height，option
  id: {
   type: String
  },
  width: {
   type: String,
   default: "100%"
  },
  height: {
   type: String,
   default: "200px"
  },
  tit: {
   type: String,
   default: "默认标题"
  },
  option: {
   type: Object,
   //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
   //使用闭包保证一个vue实例拥有自己的一份props
   default() {
    return {
     xAxis: {
         type: 'category',
         data: []
     },
     yAxis: {
         type: 'value'
     },
     series: [{
         data: [],
         type: 'bar'
     }]
    };
   }
  }
 },
 computed: {
  style() {
   return {
    height: this.height,
    width: this.width
   };
  }
 },
 mounted() {
    this.init();
 },
 methods: {
  init() {
    this.chart = this.$echarts.init(document.getElementById(this.id),null,{renderer: 'svg'});
    const opt = this.option || this.default_opt;

    //边距
    opt.grid = {
          "top": '1%',
          "left": '1%',
          "right": '1%',
          "bottom": '1%',
          "containLabel": true
        };

    // x,y轴默认样式
    opt.xAxis.axisLine = { lineStyle: {color: '#999'} };
    opt.yAxis.axisLine = { lineStyle: {color: '#999'} };
    this.chart.setOption(opt,true);
  }
 }
};
</script>