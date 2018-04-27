<template>
    <div class="form-border-img clearfix" id="formBorderImg">
        <img :src="formBorderImg.content" :width="formBorderImg.width" :height="formBorderImg.height" :style="{top: formBorderImg.y + 'px',left: formBorderImg.x + 'px', transform: 'rotate('+ formBorderImg.angle + 'deg)'}" @mousedown="moveDesc">
    </div>
</template>
<style scoped>
.titleImg {
  position: absolute;
  z-index: 10;
}
.form-border-img {
  background: transparent;
  position: relative;
}
.form-border-img > img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 97;
}
</style>

<script>
import Bus from '../assets/js/bus'
export default {
  name: "formBorderImg",
  props: ["formBorderImg"],
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
      var initX = parseInt(this.formBorderImg.x);
      var initY = parseInt(this.formBorderImg.y);
      console.log("initX:", this.formBorderImg.x);
      console.log("initY:", this.formBorderImg.y);
      var target = e.target;
      var flag = 1;
      if (flag == 1) {
        target.onmousemove = function(e) {
          that.formBorderImg.x = e.clientX - eClientX + initX;
          that.formBorderImg.y = e.clientY - eClientY + initY;
          target.onmouseup = function() {
            target.onmousemove = null;
            target.onmousedown = null;
            console.log("放开1");
            console.log("formBorderImg.x:", that.formBorderImg.x);
            console.log("formBorderImg.y:", that.formBorderImg.y);
            var msg = JSON.parse(JSON.stringify(that.formBorderImg));
            Bus.$emit("sendFormBorderImg", msg);
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
    var that = this;
    console.log("test: ", this.formBorderImg);
  }
};
</script>

