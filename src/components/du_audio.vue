<template>
  <div class="du_audio" v-show="visible">
    <audio :src="src" loop="loop" ref="audio" style="visibility: hidden;width: 0; height: 0;"></audio>
    {{src}}/play:{{play}}
    <a href="#" class="btn_round">
      <img src="images/audio.svg" v-if="!play" class="ico">
      <div class="line-scale-pulse-out" v-if="play">
        <i></i> <i></i> <i></i> <i></i>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "du_audio",
  data() {
    return {
    };
  },
  watch: {
    play(to, from) {
      if (to) {
        console.log("播放！");
        this.$nextTick(()=>{
          this.$refs.audio.play();
        })
      } else {
        console.log("停止播放");
        this.$nextTick(()=>{
          this.$refs.audio.pause();
        })
        
      }
    }
  },
  props: ["visible", "src", "play"],
  computed: {},
  mounted() {},
  methods: {
    show(str) {
    }
  }
};
</script>

<style lang="scss">
.du_audio {
  background-color: rgba(0, 0, 0, .5);
  color: #ffffff;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 6;
}
</style>
