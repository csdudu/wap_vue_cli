<template>
  <div class="test">
      这是中文测试 <br>
      <rlink href='/test2'>test2</rlink>
      <br>
      <rlink href='/home'>home</rlink>
  </div>
</template>


<script>
  import Vue from "vue";
  /*import {
    Popup
  } from "cube-ui";

  Vue.use(Popup);*/

  export default {
    name: "test",
    components: {},
    data: function () {
      return {
        current: 0,
        visi: false
      };
    },

    computed: {
      ttt() {}
    },
    methods: {
      /*showPopup(refId) {
        const component = this.$refs[refId];
        component.show();
      },
      hide(refId) {
        const component = this.$refs[refId];
        component.hide();
      }*/
    },
    created: function () {
      // this.$tst("test!!!");
      let token = "aaaaa";
      console.log(`ddd ${token}`);
    }
  };
</script>

<style lang="scss">
  .test{font-size: 100px; color: #fff;}
  .cube-my-popup {
    bottom: 50px;

    &.fade-enter,
    &.fade-leave-active {
      opacity: 0
    }

    &.fade-enter-active,
    &.fade-leave-active {
      transition: all .3s ease-in-out
    }

    .move-enter,
    .move-leave-active {
      transform: translate3d(0, 100%, 0)
    }

    .move-enter-active,
    .move-leave-active {
      transition: all .3s ease-in-out
    }

  }

  .singer {
    background-color: #fffddd;
    position: relative;
    height: 100%;
  }

  .pop {
    background-color: #990;
    padding: 20px;
  }
</style>