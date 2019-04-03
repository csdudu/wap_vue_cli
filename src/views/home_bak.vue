<template>
  <div id="index">

    <center class="main_tit">博方智能云控平台</center>
    <div class="bar">
      <du_rect class="rect0">这是导航结构</du_rect>
      <du_rect class="rect1">
        <div class="pic_w">
          <img src="images/p1.jpg">
        </div>

        <table class="tb tb1" v-if="info_b">
          <caption>{{info_b.tit}}-站点统计数据</caption>
          <tr>
            <td>
              <p v-for="item in info_b.list1">{{item}}</p>
            </td>
            <td>
              <p v-for="item in info_b.list2">{{item}}</p>
            </td>
          </tr>
        </table>

        <table class="tb tb2" v-if="info_b">
          <tr> <th>电压</th> <td>
            <span v-for="item in info_b.list3">{{item}}</span>
          </td> </tr>
          <tr> <th>电流</th> <td><span v-for="item in info_b.list4">{{item}}</span></td> </tr>
          <tr> <th>功率</th> <td>
          <p v-for="item in info_b.list5">{{item}}</p>
          </td> </tr>
        </table>

      </du_rect>

      <!-- c块 -->
      <du_rect class="rect2" :class="{'focus':flag_focus=='rect2'}" @click.native="focus('rect2')">
        <div class="videos">
          <div v-for="item in videos">
            <img :src="item">
          </div>

        </div>
        <div class="chart_wrap">
          <div class="tit">
            <du_dropdown :date="opt[2].sub_map" @change="dropdown_change($event,2)"></du_dropdown>
            <du_date_picker @change="dateD($event,2)"></du_date_picker>
          </div>
          <du_chart id="chart_c" :option="yxtj_chart" :style="{height:'200px'}" :tit="ttt"></du_chart>
        </div>
      </du_rect>

    </div>

    <div class="bar">
      <!-- dddd块 -->
      <du_rect class="rect3">
        <div class="chart_wrap">
          <div class="tit">
            <du_dropdown :date="opt[3].sub_map" @change="toggleD"></du_dropdown>
            <du_date_picker @change="dateD"></du_date_picker>
          </div>
          <!-- <div @click="show_d=!show_d">dd{{show_d}}</div> -->
          <div class="slider_v">
            <transition name="move1">
              <du_chart id="chart_qtrz" :option="qtrz_chart" :style="{width:'100%',height:'360px'}" v-show="show_d==0"></du_chart>
            </transition>

            <transition name="move2">
              <ul class="list1" v-show="show_d==1">
                <li v-for="item in qtrz_txt">
                  [{{item.flag?"停止":"开始"}}] - {{item.tit}}
                </li>
              </ul>
            </transition>
          </div>

          
        </div>
      </du_rect>

      <du_rect class="rect4" title="tab切换块">
        <el-tabs v-model="tab_current" type="card" @tab-click="click_tab">
          <el-tab-pane :label="opt[4].sub_map[0]" name="0">

            <table class="tb">
              <tr>
                <th>实时数据</th>
                <th>统计数据</th>
                <th>设定参数</th>
              </tr>
              <tr>
                <td>
                  <p>PLC控制输出：XX</p>
                  <p>故障：XX</p>
                  <p>本地远程：XX</p>
                  <p>电源：XX</p>
                  <p>运行：XX</p>
                </td><td>
                  <p>闲置时间：XX小时</p>
                  <p>当次运行时间：XX小时</p>
                  <p>今日运行时间：XX小时</p>
                  <p>昨日运行时间：XX小时</p>
                  <p>总运行时间：XX小时</p>
                  <p>今日开机次数：XX</p>
                  <p>昨日开机次数：XX</p>
                  <p>总开机次数：XX</p>

                </td><td>
                  <p>鼓风机组停机时间：XX小时</p>
                  <p>鼓风机组运行时间：XX小时</p>
                  <p>加药机运行时长：XX小时</p>

                </td>
              </tr>
            </table>
            <div class="h20"></div>
            <center>
              <a href="#" class="btn1">全自控/全网控 </a>
              <a href="#" class="btn1" @click="click_to_get">紧急停机</a>
            </center>
            
            
          </el-tab-pane>
          <el-tab-pane :label="opt[4].sub_map[1]" name="1">1#风机</el-tab-pane>
          <el-tab-pane :label="opt[4].sub_map[2]" name="2">2#风机</el-tab-pane>
          <el-tab-pane :label="opt[4].sub_map[3]" name="3">回流泵</el-tab-pane>
          <el-tab-pane :label="opt[4].sub_map[4]" name="4">加药机</el-tab-pane>
        </el-tabs>
      </du_rect>
      
      <du_rect class="rect5">
        <table class="tb">
          <caption>测试块</caption>
          <tr v-for="item in opt" :key="item.oid">
            <td>{{item.tit}}</td>
            <td>{{item.sub_map}}</td>
            <td>{{item.sub_current}}</td>
            <td>{{item.date_change}}</td>
          </tr>
        </table>

        <div class="chart_wrap">
          
          <div class="tit">
            <du_dropdown :date="opt[5].sub_map" @change="dropdown_change($event,5)"></du_dropdown>
            <!-- <du_date_picker @change="dateD($event,5)"></du_date_picker> -->
          </div>
          <!-- <du_chart id="chart5" :option="info_f" :tit="ttt"></du_chart> -->
        </div>

        <div class="h20"></div>
        <h2 class="tit1">巡护任务完成情况</h2>
        <ul class="arr_list">
          <li v-for="item in opt[6].sub_map" :key="item">{{item}}</li>
        </ul>

        
      </du_rect>

    </div>
    
  </div>
</template>

<script>

// import Vue from 'vue';
import du_chart from "../components/du_chart";
import du_dropdown from "../components/du_dropdown";
export default {
  name: 'home',
  components: {du_chart,du_dropdown},
  data: function() {
    return {
      flag_focus:null,  
      opt:[
        {
          oid:0,
          tit:"这是导航结构",
          sub_current:0,
          sub_map:[],
          sub_api:[],
          date_change:null
        },{
          oid:1,
          tit:"中间大图块",
          sub_current:0,
          sub_map:[],
          sub_api:[],
          date_change:null
        },{
          oid:2,
          tit:"运行统计",
          sub_current:0,
          sub_map:["运行统计"],
          sub_api:["运行统计"],
          date_change:null
        },{
          oid:3,
          tit:"启停日志",
          sub_current:0,
          sub_map:["启停日志[图形]","启停日志[文字]"],
          sub_api:["/dd1","/dd2"],
          date_change:null
        },{
          oid:4,
          tit:"tab切换",
          sub_current:0,
          sub_map:["提升泵","1#风机","2#风机","回流泵","加药机"],
          sub_api:["提升泵","1#风机","2#风机","回流泵","加药机"],
          date_change:null
        },{
          oid:5,
          tit:"水质曲线",
          sub_current:0,
          sub_map:["水质曲线","电流曲线","功率曲线","水位曲线","温湿度曲线"],
          sub_api:["水质曲线","电流曲线","功率曲线","水位曲线","温湿度曲线"],
          date_change:null
        },{
          oid:6,
          tit:"任务完成情况",
          sub_current:0,
          sub_map:["设施","设备","卫生","水质","维修","更换"],
          sub_api:["设施","设备","卫生","水质","维修","更换"],
          date_change:null
        },
      ],
      videos:[],    //视频截图
      info_b:null,    //b块-站点统计
      yxtj_chart:null,    //c块-运行统计
      qtrz_chart:null,    //启停日志-图形
      show_d:0,
      qtrz_txt:{},    //启停日志-文字
      info_f:{},
      tab_current:"0",
      ttt:"1"
      
    }},

    computed: {
      /*selectedLabel: {
        get() {
          return this.tabs[this.index].label
        },
        set(newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }*/
    },
    methods: {
      focus(name) {
        console.log('dddd',name);
        this.flag_focus = name;
      },

      click_tab() {
        console.log("--------",this.tab_current);
      },
      
      dropdown_change(event,oid) {
        this.opt[oid].sub_current = event;
      },
      //切换d块
      toggleD(event) {
        this.opt[3].sub_current = event;
        this.show_d = event;
      },
      // d的日期切换
      dateD(event) {
        this.opt[3].date_change = event;
        if(this.show_d==0){this.api_qtrz_chart(); }
        if(this.show_d==1){this.api_qtrz_txt(); }
      },

      click_to_get(event,oid) {
        this.$tst("aaa");
      },

      api_video (){
        this.$get("/api_videos", {} )
          .then(
              (res)=> {
                this.videos = res.list;
              }
          );
      },

      api_yxtj_chart (){
        this.$get("/api_yxtj_chart", {} )
          .then(
              (res)=> {
                this.yxtj_chart = res;
              }
          );
      },

      api_site_info (){
        this.$get("/api_site_info", {} )
          .then(
              (res)=> {
                this.info_b = res;
              }
          );
      },
      api_qtrz_chart (){
        this.$get("/api_qtrz_chart", {} )
          .then(
              (res)=> {
                this.qtrz_chart = res;
              }
          );
      },
      api_qtrz_txt (){
        this.$get("/api_qtrz_txt", {} )
          .then(
              (res)=> {
                this.qtrz_txt = res;
              }
          );
      }

    },
  created: function() {
    const obj={a:1};
    obj.b=222;
    console.log(obj);
    this.api_yxtj_chart();
    this.api_video();
    this.api_site_info();
    this.api_qtrz_chart();
    this.api_qtrz_txt();

    /*post(
      "/submit.asp",
      {"phone":"1133334444",
      "p_number":"湘AVG355",
      "shop":"衡阳翼通汽车服务清江店",
      "id":"MSE4ODg4"}
      )
      .then(doneCallbacks, failCallbacks)
      .then(
      );*/
    
  }
}
</script>

<style lang="scss">
  .home{width: 7.5rem; height: 100%; display: flex; flex-direction: column; position: absolute; left:0; top:0;  }
  .slide-wrapper{
    background-color: #222; flex: 1; 
  }
</style>