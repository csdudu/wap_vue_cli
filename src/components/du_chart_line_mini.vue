<template>
     <div :id="id" :style="style" class="du_chart"></div>
</template>
<script>
export default {
 data() {
  return {
   
   chart: {},  //echarts实例
   template_opt: {  //当无法提供外部option，用这个空option初始化图形
      color:['#00ffff','#00ff00','#8000ff'],
      legend: {
        data:[],
        borderWidth: 0, 
        padding: 0, 
        itemGap: 10, 
        // itemWidth: 16,             // 图例图形宽度
        // itemHeight: 10,            // 图例图形高度
        textStyle: {color: '#f17623'}          // 图例文字颜色
      },
      tooltip: {},
      grid : {
          "top": '1%',
          "left": '1%',
          "right": '1%',
          "bottom": '1%',
          "containLabel": true
        },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1','2','3','4','5','6','7','8'],
        axisLine: {lineStyle: {color: '#aaa'}},
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#aaa",
            fontSize: 12
          }
        }
      },

      yAxis: {
        show : false,
        axisLabel : { "show":false }
      },
      series: [
        {
            name:'',
            smooth:true,
            type:'line',
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#00ffff'  
                    }  
                }  
            }, 
            data:[]
        },
        {
            name:'',
            smooth:true,
            type:'line',
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#00ff00'  
                    }  
                }  
            }, 
            data:[]
        },
        {
            name:'',
            smooth:true,
            type:'line',
            stack: '总量',
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#8000ff'  
                    }  
                }  
            }, 
            data:[]
        }
      ]
    
   },
  };
 },
 watch: {
   //观察option的变化
   source: {
    handler(newVal, oldVal) {
     if (this.chart) {
      if (newVal) {
        this.template_opt.dataset.source = newVal;
        this.chart.setOption(this.template_opt,true);
      } else {
       // this.chart.setOption(oldVal);
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
  source: {
   type: Array
  },
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
   type: Object
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
/*    
    let _arr = this.template_opt.series;
    setInterval(
      ()=>{
        for (var iii = 0; iii < _arr.length; iii++) {
          for (var i = 0; i < _arr[iii].data.length; i++) {
            _arr[iii].data[i] += _.random(-20,20);
          }
        }

        this.chart.setOption(this.template_opt,true);
      },this.$interval);*/
 },
 methods: {
  anim() {
    
  },
  init() {
    this.chart = this.$echarts.init(document.getElementById(this.id));
    for (var i = 0; i < this.source.length; i++) {
      this.template_opt.series[i].data = this.source[i].data;
      this.template_opt.series[i].name = this.source[i].tit;
      this.template_opt.legend.data.push(this.source[i].tit);
    }
    this.chart.setOption(this.template_opt,true);
  }
 }
};
</script>