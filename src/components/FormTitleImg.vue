<template>
    <div class="form-title-img" id="formTitleImg">
        <img @dblclick="titleImgDBClick" @mousedown="moveTitle" :src="formImg.content" :width="formImg.width" :height="formImg.height" :style="{top: formImg.y + 'px',left: formImg.x + 'px', transform: 'rotate('+ formImg.angle + 'deg)'}">
    </div>
</template>
<style scoped>
.titleImg {
  position: absolute;
  z-index: 10;
}
.form-title-img {
  background: transparent;
  position: relative;
}
.form-title-img > img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>

<script>
import Bus from "../assets/js/bus";
export default {
  name: "formTitleImg",
  props: ["formImg"],
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
      var initX = parseInt(this.formImg.x);
      var initY = parseInt(this.formImg.y);
      console.log("initX:", this.formImg.x);
      console.log("initY:", this.formImg.y);
      var target = e.target;
      var flag = 1;
      if (flag == 1) {
        target.onmousemove = function(e) {
          that.formImg.x = e.clientX - eClientX + initX;
          that.formImg.y = e.clientY - eClientY + initY;
          target.onmouseup = function() {
            target.onmousemove = null;
            target.onmousedown = null;
            console.log("放开1");
            console.log("formImg.x:", that.formImg.x);
            console.log("formImg.y:", that.formImg.y);
            var msg = JSON.parse(JSON.stringify(that.formImg));
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
    titleImgDBClick(){
      var msg = 3
      Bus.$emit("getActive",msg);
    }
  },
  mounted() {
    var that = this;
    console.log("test: ", this.formImg);
  }
};
</script>

