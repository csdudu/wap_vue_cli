<template>
     <div :id="id" :style="style" class="du_chart"></div>
</template>
<script>

var data = [];
var dataCount = 30;// 测试数据条数

var startTime = 1551369600000; // 2019/3/1 0:0:0 13位的Unix时间戳
var categories = ['提升泵', '加药机', '鼓风机1','鼓风机2'].reverse();
const cc1 = '#1845a2';
const cc2 = '#c6632b';

var types = [{
        name: '运行',
        color: cc1
    },
    {
        name: '停机',
        color: cc2
    },
];
    // value 第一个参数: 设备 index（比如：鼓风机/提升泵）; 
    //       第二个参数: 状态的开始时间;  -13位Unix时间戳--毫秒
    //       第三个参数: 状态的结束时间;  -13位Unix时间戳--毫秒
    //       第四个参数: 状态的持续时间;  -毫秒
    
const data = [
    {name: '运行',value: [0, 1551369600000, 1551403992000, 600000],itemStyle:{normal: {color: cc1}}},
    {name: '停机',value: [0, 1551403992000, 1551414972000, 600000],itemStyle:{normal: {color: cc2}}},
    {name: '运行',value: [0, 1551414972000, 1551430752000, 600000],itemStyle:{normal: {color: cc1}}},
    
    {name: '运行',value: [1, 1551369600000, 1551430752000, 600000],itemStyle:{normal: {color: cc1}}},

    {name: '运行',value: [2, 1551369600000, 1551399132000, 600000],itemStyle:{normal: {color: cc1}}},
    {name: '停机',value: [2, 1551399132000, 1551402732000, 600000],itemStyle:{normal: {color: cc2}}},
    {name: '运行',value: [2, 1551402732000, 1551430752000, 600000],itemStyle:{normal: {color: cc1}}},

    {name: '运行',value: [3, 1551369600000, 1551430752000, 600000],itemStyle:{normal: {color: cc1}}},
    

];
 
 
function renderItem(params, api) {
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = api.size([0, 1])[1] * 0.6;

  return {
      type: 'rect',
      shape: echarts.graphic.clipRectByRect({
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
      }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
      }),
      style: api.style()
  }
}

export default {
 data() {
  return {
   
   chart: {},  //echarts实例
   template_opt: {

        tooltip: {
            formatter: function(params) {
                return params.marker + params.name + ': ' + params.value[3] / 1000 + ' s';
            }
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
        legend: {
            data: types,
            top: 20,
            right: 50,
            selectedMode: false,
            textStyle: {color: '#fff'}
        },
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            height: 10,
            start: 0,
            end: 100, 
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: ''
        }, {
            type: 'inside',
            filterMode: 'weakFilter'
        }],
        grid: {
            height: 270
        },
        xAxis: {
            type: 'time',
            min: startTime,
            scale: true,
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
            data: categories,
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
        series: [
            {name: types[0].name, type: 'bar', data: [], color: types[0].color},
            {name: types[1].name, type: 'bar', data: [], color: types[1].color},
            {
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            encode: {
                x: [1, 2, 3],
                y: 0,
            },
            data: data
        }]
        
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
    // this.template_opt.dataset.source = this.source;
    this.chart.setOption(this.template_opt,true);
  }
 }
};
</script>