<template>
  <div class="form-desc-text" id="formDescText">
    <p :style="{top: formDescText.y + 'px',left: formDescText.x + 'px', transform: 'rotate('+ formDescText.angle + 'deg)', fontFamily: formDescText.fontFamily, fontSize: formDescText.fontSize+'px', color: formDescText.fontColor}" v-html="formDescText.content" @mousedown="moveDesc"></p>
  </div>
</template>
<script>
import Bus from '../assets/js/bus'
export default {
  name: "formDescText",
  props: ["formDescText"],
  data() {
    return {};
  },
  methods: {
    moveDesc(e) {
      e.preventDefault();
      console.log("点击进入");
      var that = this;
      //先获取初始位置
      var eClientX = e.clientX;
      var eClientY = e.clientY;
      var initX = parseInt(this.formDescText.x);
      var initY = parseInt(this.formDescText.y);
      console.log("initX:", this.formDescText.x);
      console.log("initY:", this.formDescText.y);
      var target = e.target;
      var flag = 1;
      if (flag == 1) {
        target.onmousemove = function(e) {
          that.formDescText.x = e.clientX - eClientX + initX;
          that.formDescText.y = e.clientY - eClientY + initY;
          target.onmouseup = function() {
            target.onmousemove = null;
            target.onmousedown = null;
            console.log("放开1");
            console.log("formDescText.x:", that.formDescText.x);
            console.log("formDescText.y:", that.formDescText.y);
            var msg = JSON.parse(JSON.stringify(that.formDescText));
            Bus.$emit("sendFormDesc", msg);
          };
        };
        target.onmouseup = function() {
          target.onmousemove = null;
          target.onmousedown = null;
          console.log("放开2");
        };
        flag = 0;
      }
    }
  },
  mounted() {
    // console.log(typeof(this.$props.color))
  },
  updated() {}
};
</script>
<style scoped>
.form-desc-text {
  overflow: hidden;
  /* position: relative; */
}
.form-desc-text p {
  position: absolute;
  /* text-indent: 2em; */
  padding: 2px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  /* line-height: 1.5; */
  /* font-size: 30px; */
  z-index: 98;
  cursor: pointer;
}
</style>


