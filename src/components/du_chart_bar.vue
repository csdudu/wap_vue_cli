<template>
     <div :id="id" :style="style" class="du_chart"></div>
</template>
<script>
export default {
 data() {
  return {
   
   chart: {},  //echarts实例
   template_opt: {  //当无法提供外部option，用这个空option初始化图形

      legend: {
        borderWidth: 0, 
        padding: 20, 
        itemGap: 20, 
        itemWidth: 20,             // 图例图形宽度
        itemHeight: 16,            // 图例图形高度
        textStyle: {color: '#fff'}          // 图例文字颜色
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
        source: [
          /*['product', '时间', '次数'],
          ['提升泵', 12, 3],
          ['回流泵', 23, 1],
          ['1#风机', 11, 1],
          ['2#风机', 11, 1],
          ['加药机', 22, 2]*/
        ]
      },
      grid : {
          "top": '12%',
          "left": '3%',
          "right": '3%',
          "bottom": '8%',
          "containLabel": true
        },

      xAxis: {
        type: 'category',
        splitLine: {
            show: true,
            lineStyle:{color: ['#222']}
        },
        axisLine: {lineStyle: {color: '#aaa'}},
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#aaa",
            fontSize: 16
          }
        }
      },

      yAxis: {
        splitLine: {
            show: true,
            lineStyle:{color: ['#222']}
        },
        axisLine: {lineStyle: {color: '#aaa'}},
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#aaa",
            fontSize: 16
          }
        }
      },
      series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                      {offset: 0, color: '#225eda'},
                      {offset: 0.5, color: '#1845a2'}
                  ]
              ),
              label: {
                   show: true,
                   color: "#fff",
                   position: 'top',
                   formatter: function(params) {
                      return params[1];
                    }
              }
            }
          },
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                      {offset: 0, color: '#ff813b'},
                      {offset: 0.5, color: '#c6632b'}
                  ]
              ),
              label: {
                   show: true,
                   color: "#fff",
                   position: 'top',
                   formatter: function(params) {
                      return params[1];
                    }
              }
            }
          }

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