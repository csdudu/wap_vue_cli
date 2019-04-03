<template>
    <div :id="id" :style="style" class="du_chart"></div>
</template>
<script>
export default {
 data() {
  return {
   
   chart: {},  //echarts实例
   template_opt: {  //初始化图形
      color:['#00ffff','#00ff00','#8000ff'],
      legend: {
        data:['PH值','COD','氨氮'],
        borderWidth: 0, 
        padding: 20, 
        itemGap: 20, 
        textStyle: {color: '#fff'}
      },
      title: {
          text: this.tit,
          padding: [16,30],
          textStyle: {
            color: "#fff",
            fontSize: 16
          },
          left: 'left'
      },
      dataset: {
        source: []
      },
      grid : {
          "top": '10%',
          "left": '3%',
          "right": '3%',
          "bottom": '8%',
          "containLabel": true
        },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1','2','3','4','5','6','7','8'],
        splitLine: {
            show: true,
            lineStyle:{color: ['#222']}
        },
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#666",
            fontSize: 12
          }
        }
      },

      yAxis: {
        splitLine: {
            show: true,
            lineStyle:{color: ['#222']}
        },
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#666",
            fontSize: 12
          }
        }
      },
      series: [
        {
            name:'PH值',
            symbolSize: 12,
            smooth:true,
            type:'line',
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#00ffff',
                        width:3   
                    }  
                }  
            }, 
            data:[120, 132, 101, 134, 90, 230, 210, 210]
        },
        {
            name:'COD',
            symbolSize: 12,
            smooth:true,
            type:'line',
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#00ff00' ,
                        width:3  
                    }  
                }  
            }, 
            data:[220, 182, 191, 234, 290, 330, 310, 310]
        },
        {
            name:'氨氮',
            symbolSize: 12,
            smooth:true,
            type:'line',
            stack: '总量',
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#8000ff',
                        width:3 
                    }  
                }  
            }, 
            data:[150, 232, 201, 154, 190, 330, 410, 410]
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
   default: "折线图默认标题"
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
 },
 methods: {
  init() {
    this.chart = this.$echarts.init(document.getElementById(this.id));
    this.template_opt.dataset.source = this.source;
    this.chart.setOption(this.template_opt,true);
  }
 }
};
</script>