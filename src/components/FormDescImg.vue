<template>
    <div class="form-desc-img clearfix" id="formDescImg">
        <img @dblclick="descImgDBClick" :src="formDescImg.content" :width="formDescImg.width" :height="formDescImg.height" :style="{top: formDescImg.y + 'px',left: formDescImg.x + 'px', transform: 'rotate('+ formDescImg.angle + 'deg)'}" @mousedown="moveDesc">
    </div>
</template>
<style scoped>
.titleImg {
  position: absolute;
  z-index: 10;
}
.form-desc-img {
  background: transparent;
  position: relative;
}
.form-desc-img > img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
}
</style>

<script>
import Bus from '../assets/js/bus'
export default {
  name: "formDescImg",
  props: ["formDescImg"],
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
      var initX = parseInt(this.formDescImg.x);
      var initY = parseInt(this.formDescImg.y);
      console.log("initX:", this.formDescImg.x);
      console.log("initY:", this.formDescImg.y);
      var target = e.target;
      var flag = 1;
      if (flag == 1) {
        target.onmousemove = function(e) {
          that.formDescImg.x = e.clientX - eClientX + initX;
          that.formDescImg.y = e.clientY - eClientY + initY;
          target.onmouseup = function() {
            target.onmousemove = null;
            target.onmousedown = null;
            console.log("放开1");
            console.log("formDescImg.x:", that.formDescImg.x);
            console.log("formDescImg.y:", that.formDescImg.y);
            var msg = JSON.parse(JSON.stringify(that.formDescImg));
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
    },
    descImgDBClick(){
      var msg = 4;
      Bus.$emit("getActive",msg);
    }
  },
  mounted() {
    var that = this;
    // console.log("test: ", this.formDescImg);
  }
};
</script>

