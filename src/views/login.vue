<template>
  <div class="test">
      login <br>
      {{path}}
  </div>
</template>


<script>
  import Vue from "vue";
  /*import {
    Popup
  } from "cube-ui";

  Vue.use(Popup);*/

  export default {
    name: "login",
    components: {},
    data: function () {
      return {
        current: 0,
        visi: false
      };
    },

    computed: {
      path() {
        return this.$route.query.redirect
      }
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
      console.log(this.$route.query.redirect)
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