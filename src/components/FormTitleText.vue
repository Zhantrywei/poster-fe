<template>
  <div class="form-title-text" id="formTitleText" @mousedown="moveTitle">
    <h1 @dblclick="titleTextDBClick" :style="{top: formText.y + 'px',left: formText.x + 'px', transform: 'rotate('+ formText.angle + 'deg)', fontFamily: formText.fontFamily, fontSize: formText.fontSize+'px', color: formText.fontColor}">{{formText.content}}</h1>
  </div>
</template>
<script>
import Bus from "../assets/js/bus";
export default {
  name: "formTitleText",
  props: ["formText"],
  data() {
    return {};
  },
  methods: {
    moveTitle(e) {
      e.preventDefault();
      console.log("点击进入");
      var that = this;
      //先获取初始位置
      var eClientX = e.clientX;
      var eClientY = e.clientY;
      var initX = parseInt(this.formText.x);
      var initY = parseInt(this.formText.y);
      console.log("initX:", this.formText.x);
      console.log("initY:", this.formText.y);
      var target = e.target;
      var flag = 1;
      if (flag == 1) {
        target.onmousemove = function(e) {
          that.formText.x = e.clientX - eClientX + initX;
          that.formText.y = e.clientY - eClientY + initY;
          target.onmouseup = function() {
            target.onmousemove = null;
            target.onmousedown = null;
            console.log("放开1");
            console.log("formText.x:", that.formText.x);
            console.log("formText.y:", that.formText.y);
            var msg = JSON.parse(JSON.stringify(that.formText));
            Bus.$emit("sendFormTitle", msg);
          };
        };
        target.onmouseup = function() {
          target.onmousemove = null;
          target.onmousedown = null;
          console.log("放开2");
        };
        flag = 0;
      }
    },
    titleTextDBClick(){
      var msg = 3;
      Bus.$emit("getActive",msg);
    }
  },
  mounted() {
    // console.log(typeof(this.$props.color))
  },
  updated() {}
};
</script>
<style scoped>
.form-title-text {
  overflow: hidden;
  /* position: relative; */
}
.form-title-text h1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
  /* line-height: 1.5; */
  /* font-size: 30px; */
  z-index: 99;
}
.form-title-text h1:hover {
  cursor: pointer;
}
</style>


