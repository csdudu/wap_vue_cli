<template>
  <div id="list">
    <ul class="my_list">
      <li v-for="item in main_data">
        <div class="tit">
          <div class="ico" :style="{backgroundImage: 'url(' + item.pic_sm + ')'}"></div>
          <div class="tt">
            <h2>{{item.tit}}</h2>
            <h3>类型：{{item.type}} / 景点级别：{{item.brand}}</h3>
          </div>
        </div>

        <div class="pic" :style="{backgroundImage: 'url(' + item.pic_big + ')'}">
          <div class="desc">{{item.tit}}</div>
        </div>
      </li>
    </ul>

    <footer>
      <rlink href='/home' class="back_btn">
        <img src="images/back.svg">返回首页</rlink>
    </footer>
  </div>
</template>

<script>
// import Vue from 'vue';

export default {
  name: "list",
  components: {},
  data: function() {
    return {};
  },

  computed: {},

  methods: {},
  created: function() {
    console.log(this.main_data);
  }
};
</script>

<style lang="scss">
.my_list {
  li {
    margin-bottom: 2em;
    .tit {
      padding: 1em;
      display: flex;
      align-items: center;
      .ico {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border-bottom-right-radius: 50%;
        border: 2px #fff solid;
        margin-right: 0.7em;
      }
      h2 {
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
      }
    }
    .pic {
      height: 7.5rem;
      background-color: #666;
      display: flex;
      align-items: flex-end;
      .desc {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 1em;
        color: #ccc;
      }
    }
  }
}
</style>
