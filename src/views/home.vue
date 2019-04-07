<template>
  <div id="home" class="app_body" :class="{'long_scr':is_long_scr}">
    <!-- <du_loading_pop>
      <img src="images/logo.png">
    </du_loading_pop> -->
    <du_audio :src="audio_current" :play="flag_play" :visible="false"></du_audio>
    <du_toast ref="du_toast"></du_toast>

    <du_pop :visible.sync="flag_pop_share" title="分享弹窗">
      <center>
          请点击微信窗口右上角的<span class="strong">···</span>加入收藏。
        <div class="h50"></div>
        <div class="btn" @click="flag_pop_share=false">我知道了</div>
      </center>
    </du_pop>
    
    <du_pop :visible.sync="flag_pop_iframe" class="pop_iframe" title="全景弹窗">
      <iframe src="http://www.0123vr.cn/tour/9ba52850640b294a" ref="my_iframe" frameborder="0"></iframe>
      <div class="back" @click="close_iframe"><img src="images/back.svg" class="ico">返回</div>
    </du_pop>

    <div class="swiper-container" id="swiper_main">
          <div class="swiper-wrapper">
             <section class="sec0 jcc swiper-slide" @click="slide_next">
              <center>
                <img src="images/logo.png" class="logo ani"
                  swiper-animate-effect="fadeInUp"
                  swiper-animate-duration="0.5s"
                  swiper-animate-delay="0s">

                <img src="images/home1.png" class="home1 ani"
                  swiper-animate-effect="fadeInUp"
                  swiper-animate-duration="0.5s"
                  swiper-animate-delay="0.3s">


              </center>
            </section>


            <section class="sec1 jcc swiper-slide">
                <center>
                  <div class="h20"></div>
                  <div class="swiper-container" id="swiper_cover">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="item in main_data"
                        :style="{backgroundImage: 'url(' + item.pic_big + ')'}" @click="slide_to(item.id)">
                        <h2>{{item.tit}}</h2>
                        <div class="desc">{{item.desc}}</div>
                      </div>
                    </div>
                  </div>


                  <div class="h20"></div>
                  <nav class="nav">
                    <a href="#" @click="flag_pop_share=true">
                      <img src="images/nav3.png">
                      <h2>收藏</h2>
                    </a>
                    
                    <a href="#" @click="toast('功能正在开发中，静请期待');">
                      <img src="images/nav1.png">
                      <h2>地图</h2>
                    </a>

                    <rlink href='/list'>
                      <img src="images/nav2.png">
                      <h2>专题</h2>
                    </rlink>

                    <a href="http://www.0123vr.cn" >
                      <img src="images/nav0.png">
                      <h2>全景三湘</h2>
                    </a>

                    
                  </nav>
                </center>
              </section>  

            <section class="detail swiper-slide" v-for="item,index in main_data">

              <div class="pic ani"  :style="{backgroundImage: 'url(' + item.pic_sm + ')'}"
                swiper-animate-effect="fadeIn"
                swiper-animate-duration="0.5s"
                swiper-animate-delay="0s">
                <img src="images/logo_white.png" class="ani"
                  swiper-animate-effect="fadeInDown"
                  swiper-animate-duration="0.4s"
                  swiper-animate-delay="0.5s">
              </div>


              <div class="pp">
                <div class="tit jcsb">
                  <h3>{{item.tit}}</h3>
                  <a :href="naviH(item.navi_name)" class="map ani"
                    swiper-animate-effect="fadeInRight"
                    swiper-animate-duration="0.5s"
                    swiper-animate-delay="0s">
                      <img src="images/map.png"></a>
                </div>

                <div
                  class="desc ani"
                  :class="{'active':item.active}"
                  @click="item.active = !item.active"
                  swiper-animate-effect="fadeInUp"
                  swiper-animate-duration="0.3s"
                  swiper-animate-delay="0.3s">{{item.desc}}</div>

                <div class="labels ani"
                  swiper-animate-effect="fadeInUp"
                  swiper-animate-duration="0.3s"
                  swiper-animate-delay="0.5s">
                  <span v-for="label in item.labels">{{label}}</span>
                </div>

                <div class="btns">
                  <a href="#" @click="load_vr(item.url_vr)" class="btn_round"><img src="images/vr.svg"></a>
                  <a href="#" @click="musicH(index)" class="btn_round">
                    <img class="ico" src="images/audio.svg"  v-if="!flag_play">
                    <div class='line-scale-pulse-out' v-if="flag_play"> <i></i><i></i><i></i><i></i> </div>
                  </a>
                </div>
              </div>

              <div class="pp">
                <img src="images/line.png" class="line ani"
                  swiper-animate-effect="fadeInDown"
                  swiper-animate-duration="0.3s"
                  swiper-animate-delay="0.9s">
                <div class="links jcsb ani"
                  swiper-animate-effect="fadeInUp"
                  swiper-animate-duration="0.3s"
                  swiper-animate-delay="0.9s">
                  <div v-for="ii in item.links">
                    <img :src="ii.img"  @click="slide_to(ii.link)">
                  </div>
                </div>
                <transition name="t1">
                  <a href="#" class="ad" ><img src="images/ad.jpg"></a>
                </transition>
              </div>
            </section>

          </div>

          <div class="swiper-pagination"></div>
          <!-- Add Arrows -->
          <!-- <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div> -->
              
        </div>

  </div>
</template>

<script>
  import du_loading_pop from '@/components/du_loading_pop';
  import du_audio from '@/components/du_audio';
  import Swiper from "swiper"

  var mySwiper = null;
  export default {
    name: 'home',
    components: {du_loading_pop,du_audio},
    data: function () {
      return {
        lat:0,lng:0,
        sec_current:0, //序号
        flag_loading:true,
        flag_play:false, //声音播放
        flag_pop_share:false, //收藏弹窗
        flag_pop_iframe:false, //VR弹窗
        audio_current:"audio/吉家大院.mp3",
        page_current:0,
      }
    },

    computed: {},

    methods: {
      close_iframe(){
        this.flag_pop_iframe=false;
      },
      init_swiper:function(){
        let swiper_cover = new Swiper('#swiper_cover', {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          loop : true,
          coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
          }
        });


         mySwiper = new Swiper ('#swiper_main', {
            initialSlide :this.page_current,
            pagination: {
              el: '.swiper-pagination',
              type: 'progressbar',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          on:{
            init: function(){
              swiperAnimateCache(this); //隐藏动画元素 
              swiperAnimate(this); //初始化完成开始动画
            }, 
            slideChangeTransitionEnd: function(){ 
              swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
              //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
            },
            slideChange: ()=>{
              this.audio_current = "";
              this.flag_play = false;
            },
          }
        }) 
     },

     musicH:function(id){
      this.audio_current = this.main_data[id].audio;
        this.flag_play = !this.flag_play;
     },
     load_vr:function(url){
      this.flag_pop_iframe = true;
      setTimeout(
        ()=>{
          this.$refs.my_iframe.src = url;
        },200);
     },
     slide_next:function(){
      mySwiper.slideNext();
     },
     slide_to:function(link_id){
      var slide_id = _.findIndex(this.main_data, { 'id':link_id });
      mySwiper.slideTo(slide_id+mySwiper.slides.length-this.main_data.length);
     },
     naviH:function (navi) {
       
      var str = 'http://api.map.baidu.com/direction?origin=latlng:'+this.lat+','+this.lng+'|name:当前位置&destination='+ navi
      + '&mode=driving&region=长沙&output=html';
      return str;
     },

    //  得到当前坐标
     get_current_position(){
       var geolocation = new BMap.Geolocation();
       geolocation.getCurrentPosition((position)=> {
         this.lat = position.point.lat;
         this.lng = position.point.lng;
         console.log("当前坐标(lat/lng)：",this.lat,this.lng);
       });
     }
    },
    
    mounted: function () {
      this.get_current_position();
      this.$get("data/data.json").then(
        (res)=> {
          this.main_data = res.list;
        }
      );
      
      setTimeout(() => {
        this.init_swiper();
      }, 200);
      
      setTimeout(() => {
        //如果还在第1页，则跳到第2页
        if(mySwiper.activeIndex<1){
          mySwiper.slideNext();
        }
        
      }, 5000);


    }
  }
</script>