<template>
  <div id="index">

    <el-dialog
      title=""
      :visible.sync="show_pop"
      width="30%">
      <span>这是导航树</span>
    </el-dialog>

    <center class="main_tit">博方环保智能云控平台</center>

      <div class="rect_big">
        <du_anim_bar class="reverse" id="anim1" :len="160"></du_anim_bar>
        <du_anim_bar id="anim2" :len="120"></du_anim_bar>

        <div class="top jcsb">
          <a href="#" class="tree" @click="show_pop=true">下鱼口镇卫生院 <img src="../assets/images/arr_sm.png"></a>

          <img src="../assets/images/weather.png" class="weather">
        </div>

        <div class="h40"></div>

        <div class="rect_c1">
          <el-carousel
            indicator-position="outside"
            :autoplay="false"
            :loop="true"
            height="450"
            trigger="click"
            :initial-index="sec_current"
            ref="cas"
            >
              <el-carousel-item>
                  <section class="sec0">
                    <img src="images/p1.jpg">
                    <table class="tb" id="tb1">
                      <caption><h2>站点统计数据</h2></caption>
                      <tr>
                        <td class="col2">
                          <p>今日流量：XXXX</p>
                          <p>今日开机：XXXX</p>
                          <p>今日运行：XXXX</p>
                          <p>今日能耗：XXXX</p>
                          <p>昨日流量：XXXX</p>
                          <p>昨日开机：XXXX</p>
                          <p>昨日运行：XXXX</p>
                          <p>昨日能耗：XXXX</p>

                        </td>
                      </tr>
                    </table>

                    <table class="tb" id="tb2">
                      <tr> <th>电压</th> <td>
                        <span>A:XXX</span>
                        <span>B:XXX</span>
                        <span>C:XXX</span>
                      </td> </tr>
                      <tr> <th>电流</th> <td>
                          <span>A:XXX</span>
                          <span>B:XXX</span>
                          <span>C:XXX</span>
                      </td> </tr>
                      <tr> <th>功率</th> <td>
                        <p>相序：正常</p>
                        <p>功因：XXX</p>
                        <p>功率：XXX</p>
                      </td> </tr>
                    </table>
                  </section>
              </el-carousel-item>

              <el-carousel-item>
                <section class="sec1">
                <du_chart_timebar id="chart_w0" :style="{width:'1032px',height:'450px'}" tit="启停日志图形"></du_chart_timebar>
                </section>
              </el-carousel-item>

              <el-carousel-item>
                <section class="sec2">
                  <du_chart_bar id="chart_w1" :source="source_runtime" :style="{width:'1032px',height:'450px'}" tit="运行状态"></du_chart_bar>
                </section>
              </el-carousel-item>

              <el-carousel-item>
                <section class="sec3 jcc">
                  <du_chart_line id="chart_w2" :style="{width:'1032px',height:'450px'}"  tit="水质曲线"></du_chart_line>
                </section>
              </el-carousel-item>

              <el-carousel-item>
                <section class="sec3">
                  <du_chart_line id="chart_w3" :style="{width:'1032px',height:'450px'}"  tit="电流曲线"></du_chart_line>
                </section>
              </el-carousel-item>

              <el-carousel-item>
                <section class="sec3">
                  <du_chart_line id="chart_w4" :style="{width:'1032px',height:'450px'}"  tit="功率曲线"></du_chart_line>
                </section>
              </el-carousel-item>

              <el-carousel-item>
                <section class="sec3">
                  <du_chart_line id="chart_w5" :style="{width:'1032px',height:'450px'}"  tit="水位曲线"></du_chart_line>
                </section>
              </el-carousel-item>

              <el-carousel-item>
                <section class="sec3">
                  <du_chart_line id="chart_w6" :style="{width:'1032px',height:'450px'}"  tit="温湿度曲线"></du_chart_line>
                </section>
              </el-carousel-item>
          </el-carousel>
          
          
        </div>

        <div class="h30"></div>

        <div class="rect_c2">
          <el-tabs v-model="equipment_current" type="card">

            <el-tab-pane
              :label="item.tit"
              :name="item.id+''"
              :key="item.id"
              v-for="item,index in equipment_arr">
                <table id="tb3">
                <tr>
                  <th>实时数据</th>
                  <th>统计数据</th>
                  <th>设定参数</th>
                </tr>
                <tr>
                  <td>
                    <p v-for="sub in equipment_type(item.data,1,1)">{{sub.name}}: {{sub.val}}{{sub.unit}}</p>
                  </td>
                  <td class="col3">
                    <p v-for="sub in equipment_type(item.data,2,3)">{{sub.name}}: {{sub.val}}{{sub.unit}}</p>
                  </td>
                  <td><p v-for="sub in equipment_type(item.data,4,5)">{{sub.name}}: {{sub.val}}{{sub.unit}}</p></td>
                </tr>
              </table>
              
              
              
            </el-tab-pane>

          </el-tabs>
        </div>

        <du_switch v-model="switch_num" :tit="switch_arr"></du_switch>

      </div>

       <du_rect class="rect0 tail1">
        <div class="tit"> <h2>视频监控</h2> </div>
        <div class="cont videos">
          <img :src="item" v-for="item in videos">
        </div>
      </du_rect>

      <du_rect class="rect1 tail3">
        <div class="tit">
          <h2>启停日志</h2>

          <a href="#" class="more" @click="set_carousel(1)"><img src="../assets/images/arr_sm.png"></a>
        </div>
        <div class="cont slider_v">
          <table class="tb5">
            <tr v-for="item,index in log_txt" :key="index">
              <td>{{index+1}}</td>
              <th :class="'flag'+item.val">{{item.val==0?"停止":"运行"}}</th>
              <td>{{item.add_time}}--{{item.no}}号{{item.position_name}} </td>
            </tr>
          </table>
        </div>
      </du_rect>

      <du_rect class="rect2 tail2">
        <div class="tit">
          <h2>运行状态</h2>
          <a href="#" class="more" @click="set_carousel(2)"><img src="../assets/images/arr_sm.png"></a>
        </div>
        <div class="cont">
          <du_chart_bar_mini id="chart_c" :source="source_runtime" :style="{height:'200px'}"></du_chart_bar_mini>
        </div>
      </du_rect>

      <du_rect class="rect3 tail2">
        <div class="tit">
          <h2>水质曲线</h2>
          <a href="#" class="more" @click="set_carousel(3)"><img src="../assets/images/arr_sm.png"></a>
        </div>
        <div class="cont">
          <du_chart_line_mini id="chart_d" :source="source_runtime" :style="{height:'200px'}"></du_chart_line_mini>
        </div>
      </du_rect>

      <du_rect class="rect4 tail2">
        <div class="tit">
          <h2>巡护任务完成情况</h2>
        </div>
        <div class="cont list4">
          <el-progress type="circle"
            :width="70"
            :percentage="item.val"
            :color="rand_color(index)"
            :stroke-width="2"
            status="text"
            v-for="(item,index) in arr_finished"
            :key="item.val">
              <h2>{{item.val}}%</h2>
              <h3>{{item.tit}}</h3>
          </el-progress>
        </div>
      </du_rect> 
   
  </div>
</template>

<script>

// import Vue from 'vue';
import du_chart from "../components/du_chart";
import du_chart_line from "../components/du_chart_line";
import du_chart_timebar from "../components/du_chart_timebar";
import du_chart_bar_mini from "../components/du_chart_bar_mini";
import du_chart_bar from "../components/du_chart_bar";
import du_chart_line_mini from "../components/du_chart_line_mini";
import du_switch from "../components/du_switch";
export default {
  name: 'home',
  components: {
      du_chart,
      du_chart_line,
      du_chart_timebar,
      du_chart_bar,
      du_chart_bar_mini,
      du_chart_line_mini,
      du_switch
    },
  data: function() {
    return {
      show_pop:false,   //弹窗显示
      sec_current:1,  //中间大块显示
      switch_num:1,   //三联切换器默认值
      switch_arr:["全站网控","全站自控","全站停机"], //三联切换器可选

      // G基础数据
      equipment_arr:[
        {id:0,tit:"提升泵",eid:13,no:1,data:[]},
        {id:1,tit:"1#风机",eid:14,no:1,data:[]},
        {id:2,tit:"2#风机",eid:14,no:2,data:[]},
        {id:3,tit:"回流泵",eid:17,no:1,data:[]},
        {id:4,tit:"加药机",eid:20,no:1,data:[]}
      ],
      equipment_current:"0",

      // 巡护任务完成
      arr_finished:[
        {tit:"设施",val:30},
        {tit:"设备",val:70},
        {tit:"卫生",val:100},
        {tit:"水质",val:60},
        {tit:"维修",val:80},
        {tit:"更换",val:40}
      ],
      videos:[
        "./images/vv1.png",
        "./images/vv2.png"
      ],    //视频截图
      info_b:null,    //b块-站点统计
      source_runtime:[],
      log_chart:null,    //启停日志-图形
      slider_v_current:1,
      log_txt:{},    //启停日志-文字
      info_f:{},
      
      ttt:"1"
      
    }
  },

  computed: {
  },

  watch:{
     switch_num:function(curVal,oldVal){
        this.$message("三联状态切换为："+this.switch_arr[curVal]);
     }
  },

    methods: {
      // 工具函数：从arr中过滤出type=aaa或type=bbb的数据
      equipment_type(arr,aaa,bbb) {
        let _final = _.filter(arr, function(o) { return o.type==aaa||o.type==bbb });
        return _final;
      },

      // 驱动中间carousel滚屏
      set_carousel(id) {
        this.$refs.cas.setActiveItem(id);
      },

     
      // 暂未用
      dropdown_change(event,oid) {
        /*this.opt[oid].sub_current = event;*/
      },

      // d的日期切换，暂未用
      dateD(event) {
        /*this.opt[3].date_change = event;
        if(this.slider_v_current==0){this.api_log_chart(); }
        if(this.slider_v_current==1){this.api_log_txt(); }*/
      },

      // api开头的都是获取数据、转换数据
      api_video (){
        this.$get("/api_videos", {} )
          .then(
              (res)=> {
                this.videos = res.list;
              }
          );
      },

      api_log_chart (){  //启停日志图形
        this.$get("/api_log_chart", {} )
          .then(
              (res)=> {
                this.log_chart = res;
              }
          );
      },

      api_runtime (){
        this.$get("/tech/loadRuntime", {
          industryId:this.$industryId,
          placeId:this.$placeIdQUERY
        } )
          .then(
              (res)=> {
                // H数据格式转换
                let _arr = [
                  ['product', '时间', '次数']
                ];

                _.forEach(res, function(value, key) {
                  let _item = [
                    value.name+value.no,
                    value.data.td_running_time,
                    value.data.td_runtimes
                  ];
                  _arr.push(_item);
                });
                this.source_runtime = _arr;
              }
          );
      },

      api_log_txt (){ //启停日志文字
        this.$get("/tech/loadAction", {
          day:this.$today,
          industryId:this.$industryId,
          placeId:this.$placeIdQUERY
        })
        .then(
            (res)=> {
              this.log_txt = res;
            }
        );
      },
      api_equipment (){
        for (var i = 0; i < this.equipment_arr.length; i++) {
          let _current = this.equipment_arr[i];
          this.$get("/tech/loadEquipmentData", {
            industryId:this.$industryId,
            placeId:this.$placeIdQUERY,
            eid:_current.eid,
            no:_current.no
          })
          .then(
              (res)=> {
                _current.data = res;
              }
          );
        }
        
      }

    },
  created: function() {
    this.api_runtime();     //今日运行柱状图数据H
    this.api_equipment();   //设备运行数据G
    this.api_log_txt();     //启停日志
  }
}
</script>

