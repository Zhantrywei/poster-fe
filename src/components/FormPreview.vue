<template>
    <div class="preview" id="preview" :style="{backgroundImage: 'url('+formBG.bgImgUrl+')', backgroundColor: formBG.bgColor}">
        <form-title-img :form-img="formTitle" v-if="formTitle.type == 'img'"></form-title-img>
        <form-title-text :form-text="formTitle"  v-else></form-title-text>
        <form-desc-text :form-desc-text="formDesc" v-if="formDesc.type == 'text'"></form-desc-text>
        <form-desc-img :form-desc-img="formDesc" v-else></form-desc-img>
        <form-border-img :form-border-img="formBorderImg"></form-border-img>
    </div>
</template>
<style scoped>
.preview {
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.test {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<script>
import BGimg from "../assets/img/BGimg.jpg";
import FormNameContent from "../assets/img/title_formtitleimg.png";
import FormTitleImg from "./FormTitleImg";
import FormTitleText from "./FormTitleText";
import FormDescImg from "./FormDescImg";
import FormDescText from "./FormDescText";
import FormBorderImg from "./FormBorderImg";
import Bus from "@/assets/js/bus";
export default {
  name: "preview",
  data() {
    return {
      posterData: {},
      formBG: {
        bgImgUrl: "",
        bgColor: ""
      },
      formTitle: {
        type: "text",
        content: "",
        fontFamily: "黑体",
        fontSize: 32,
        fontColor: "#409EFF",
        width: null,
        height: null,
        x: 50,
        y: 80,
        angle: 30
      },
      formDesc: {
        type: "img",
        content: "",
        fontFamily: "黑体",
        fontSize: 32,
        fontColor: "#409EFF",
        width: null,
        height: null,
        x: 50,
        y: 80,
        angle: 30
      },
      formBorderImg: {
        type: "img",
        content: "",
        fontFamily: "黑体",
        fontSize: 32,
        fontColor: "#409EFF",
        width: null,
        height: null,
        x: 50,
        y: 80,
        angle: 0
      }
    };
  },
  components: {
    FormTitleImg,
    FormTitleText,
    FormDescImg,
    FormDescText,
    FormBorderImg
  },
  methods: {},
  beforeMount() {
    Bus.$on("getFormData", msg => (this.formData = msg));
    Bus.$on("getFormBG", msg => (this.formBG = msg));
    //getFormTitle事件是在FormToolsbar触发的
    Bus.$on("getFormTitle", msg => (this.formTitle = msg));
    //getFormDesc事件是在FormToolsbar触发的
    Bus.$on("getFormDesc", msg => {
      this.formDesc = msg;
      if (this.formDesc.type == "text") {
        this.formDesc.content = msg.content
          .replace(/\n/g, "<br>")
          .replace(/ /g, "&nbsp;");
      }
    });
    //getFormBorderImg事件是在Formtoolsbar触发的
    Bus.$on("getFormBorderImg", msg => (this.formBorderImg = msg));
  }
};
</script>

