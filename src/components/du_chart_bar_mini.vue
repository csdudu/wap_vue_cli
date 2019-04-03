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
        padding: 0, 
        itemGap: 10, 
        itemWidth: 10,             // 图例图形宽度
        itemHeight: 6,            // 图例图形高度
        textStyle: {color: '#f17623'}          // 图例文字颜色
      },
      tooltip: {},
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
          "top": '18%',
          "left": '1%',
          "right": '1%',
          "bottom": '1%',
          "containLabel": true
        },

      xAxis: {
        type: 'category',
        axisLine: {lineStyle: {color: '#aaa'}},
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#aaa",
            fontSize: 12
          },
          formatter: function(params) {
            return params.split("").join("\n");
          }
        }
      },

      yAxis: {
        show : false,
        axisLabel : { "show":false }
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