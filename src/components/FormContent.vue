<template>
    <div @dblclick.self="contentDBClick" class="form-content clearfix borderShow" id="formContent" :style="{width: formContent.width+'px', height: formContent.height+'px', top: formContent.y+'px', left: formContent.x+'px', transform:'rotate('+formContent.angle+'deg)', backgroundImage: 'url('+formContent.content+')', paddingTop: formContent.paddingTop+'px',paddingBottom: formContent.paddingBottom + 'px',paddingLeft: formContent.paddingLeft + 'px',paddingRight: formContent.paddingRight + 'px', fontSize: formContent.fontSize+'px', color: formContent.fontColor, fontFamily: formContent.fontFamily}" @mousedown.self="moveForm">
        <!-- <img :src="formContent.content" :width="formContent.width" :height="formContent.height" :style="{top: formContent.y + 'px',left: formContent.x + 'px', transform: 'rotate('+ formContent.angle + 'deg)'}" @mousedown="moveDesc"> -->
        <!-- <form v-for="(item,index) in componentContent" :key="index">
          <div v-if="item.type=='text'||item.type=='password'" class="clearfix" :class="{borderShow: item.index == borderIndex}">
            <input-component :style="{height: formContent.lineHeight+'px'}" :com-data="item"></input-component>
          </div>
          <div v-if="item.type=='textarea'" class="clearfix" :class="{borderShow: item.index == borderIndex}">
            <textarea-component :style="{height: formContent.lineHeight+'px'}" :com-data="item"></textarea-component>
          </div>
          <div v-if="item.type=='radio'||item.type=='checkbox'" class="clearfix" :class="{borderShow: item.index == borderIndex}">
            <radio-component :style="{height: formContent.lineHeight+'px'}" :com-data="item"></radio-component>
          </div>
          <div v-if="item.type=='select'" class="clearfix" :class="{borderShow: item.index == borderIndex}">
            <select-component :style="{height: formContent.lineHeight+'px'}" :com-data="item"></select-component>
          </div>
          <div v-if="item.type=='upload'" class="clearfix" :class="{borderShow: item.index == borderIndex}">
            <upload-component :style="{height: formContent.lineHeight+'px'}" :com-data="item"></upload-component>
          </div>
          <div v-if="item.type=='submit'" class="clearfix" :class="{borderShow: item.index == borderIndex}" >
            <submit-component :style="{height: formContent.lineHeight+'px'}" :com-data="item"></submit-component>
          </div>
        </form> -->
        <form class="clearfix">
          <div v-for="(item,index) in componentContent" :key="index" class="clearfix">
            <input-component v-if="item.type=='text'||item.type=='password'" class="clearfix" :class="{borderShow: item.index == borderIndex}" :style="{height: formContent.lineHeight+'px'}" :com-data="item"></input-component>
            <textarea-component  v-if="item.type=='textarea'" class="clearfix" :class="{borderShow: item.index == borderIndex}" :style="{height: formContent.lineHeight+'px'}" :com-data="item"></textarea-component>
            <radio-component v-if="item.type=='radio'||item.type=='checkbox'" class="clearfix" :class="{borderShow: item.index == borderIndex}" :style="{height: formContent.lineHeight+'px'}" :com-data="item"></radio-component>
            <select-component v-if="item.type=='select'" class="clearfix" :class="{borderShow: item.index == borderIndex}" :style="{height: formContent.lineHeight+'px'}" :com-data="item"></select-component>
            <upload-component v-if="item.type=='upload'" class="clearfix" :class="{borderShow: item.index == borderIndex}" :style="{height: formContent.lineHeight+'px'}" :com-data="item"></upload-component>
            <submit-component v-if="item.type=='submit'" class="clearfix" :class="{borderShow: item.index == borderIndex}" :style="{height: formContent.lineHeight+'px'}" :com-data="item"></submit-component>
          </div>
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
.borderShow {
  border: 1px dotted #eee;
}
</style>

<script>
import Bus from "../assets/js/bus";
import InputComponent from "./InputComponent.vue";
import TextareaComponent from "./TextareaComponent.vue";
import RadioComponent from "./RadioComponent.vue";
import SelectComponent from "./SelectComponent.vue";
import UploadComponent from "./UploadComponent.vue";
import SubmitComponent from "./SubmitComponent.vue";
export default {
  name: "formContent",
  props: ["formContent"],
  data() {
    return {
      componentContent: [],
      borderIndex: 1
    };
  },
  components: {
    InputComponent,
    TextareaComponent,
    RadioComponent,
    SelectComponent,
    UploadComponent,
    SubmitComponent
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
    },
    loadContent() {},
    contentDBClick() {
      var msg = 5;
      Bus.$emit("getActive", msg);
    }
  },
  mounted() {
    var that = this;
    console.log("test: ", this.formContent);
    // Bus.$on("getComponentContent", msg => (this.componentContent = msg));
    console.log("componentContent: ", this.componentContent);
  },
  beforeMount() {
    Bus.$on("getComponentContent", msg => (this.componentContent = msg));
    Bus.$on("getBorderIndex", msg => (this.borderIndex = msg));
  }
};
</script>

