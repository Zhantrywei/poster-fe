<template>
    <div class="form-content clearfix" id="formContent" :style="{width: formContent.width+'px', height: formContent.height+'px', top: formContent.y+'px', left: formContent.x+'px', transform:'rotate('+formContent.angle+'deg)', backgroundImage: 'url('+formContent.content+')', paddingTop: formContent.paddingTop+'px',paddingBottom: formContent.paddingBottom + 'px',paddingLeft: formContent.paddingLeft + 'px',paddingRight: formContent.paddingRight + 'px', fontSize: formContent.fontSize+'px', color: formContent.fontColor, fontFamily: formContent.fontFamily}" @mousedown.self="moveForm">
        <!-- <img :src="formContent.content" :width="formContent.width" :height="formContent.height" :style="{top: formContent.y + 'px',left: formContent.x + 'px', transform: 'rotate('+ formContent.angle + 'deg)'}" @mousedown="moveDesc"> -->
        <form>
          <!-- <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator> -->
          <input-component :style="{height: formContent.lineHeight+'px'}"></input-component>
          <input-component :style="{height: formContent.lineHeight+'px'}"></input-component>
        </form>
    </div>
</template>

<style scoped>
.titleImg {
  position: absolute;
  z-index: 10;
}
.form-content {
  background: transparent;
  position: relative;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  z-index: 97;
  box-sizing: border-box;
}
.form-content > img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 97;
}
</style>

<script>
import Bus from "../assets/js/bus";
import InputComponent from "./InputComponent.vue"
export default {
  name: "formContent",
  props: ["formContent"],
  data() {
    return {
      
    };
  },
  components: {
    InputComponent
  },
  methods: {
    moveForm(e) {
      e.preventDefault();
      console.log("点击进入");
      var that = this;
      //先获取初始位置
      var eClientX = e.clientX;
      var eClientY = e.clientY;
      var initX = parseInt(this.formContent.x);
      var initY = parseInt(this.formContent.y);
      console.log("initX:", this.formContent.x);
      console.log("initY:", this.formContent.y);
      var target = e.target;
      var flag = 1;
      if (flag == 1) {
        target.onmousemove = function(e) {
          that.formContent.x = e.clientX - eClientX + initX;
          that.formContent.y = e.clientY - eClientY + initY;
          target.onmouseup = function() {
            target.onmousemove = null;
            target.onmousedown = null;
            console.log("放开1");
            console.log("formContent.x:", that.formContent.x);
            console.log("formContent.y:", that.formContent.y);
            var msg = JSON.parse(JSON.stringify(that.formContent));
            Bus.$emit("sendFormContent", msg);
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
    console.log("test: ", this.formContent);
  }
};
</script>

