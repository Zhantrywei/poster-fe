<template>
  <div class="form" :style="{backgroundImage: 'url('+formBG.bgImgUrl+')', backgroundColor: formBG.bgColor}">
      <div class="formTitle">
          <h1 v-if="formTitle.type == 'text'" :style="{top: formTitle.y + 'px',left: formTitle.x + 'px', transform: 'rotate('+ formTitle.angle + 'deg)', fontFamily: formTitle.fontFamily, fontSize: formTitle.fontSize+'px', color: formTitle.fontColor}">{{formTitle.content}}</h1>
          <img v-else :src="formTitle.content" :width="formTitle.width" :height="formTitle.height" :style="{top: formTitle.y + 'px',left: formTitle.x + 'px', transform: 'rotate('+ formTitle.angle + 'deg)'}">
      </div>
      <div class="formDesc">
        <p  v-if="formDesc.type == 'text'" :style="{top: formDesc.y + 'px',left: formDesc.x + 'px', transform: 'rotate('+ formDesc.angle + 'deg)', fontFamily: formDesc.fontFamily, fontSize: formDesc.fontSize + 'px'   , color: formDesc.fontColor}" v-html="formDesc.content"></p>
        <img v-else :src="formDesc.content" :width="formDesc.width" :height="formDesc.height" :style="{top: formDesc.y + 'px',left: formDesc.x + 'px', transform: 'rotate('+ formDesc.angle + 'deg)'}">          
      </div>
      <div class="formContent"  :style="{width: formContent.width + 'px', height: formContent.height + 'px', top: formContent.y + 'px', left: formContent.x + 'px'  , transform:'rotate('+formContent.angle+'deg)', backgroundImage: 'url('+formContent.content+')', paddingTop: formContent.paddingTop + 'px'   ,paddingBottom: formContent.paddingBottom + 'px',paddingLeft: formContent.paddingLeft + 'px',paddingRight: formContent.paddingRight + 'px', fontSize: formContent.fontSize + 'px' , color: formContent.fontColor, fontFamily: formContent.fontFamily, backgroundColor: formContent.bgColor}">
          <form class="clearfix">
            <div v-for="(item,index) in componentContent" :key="index" class="clearfix">
                <input-component v-if="item.type=='text'||item.type=='password'" class="clearfix" :style="{height: formContent.lineHeight + 'px'   }" :com-data="item"></input-component>
                <textarea-component  v-if="item.type=='textarea'" class="clearfix" :style="{height: formContent.lineHeight + 'px'  }" :com-data="item"></textarea-component>
                <radio-component v-if="item.type=='radio'||item.type=='checkbox'" class="clearfix" :style="{height: formContent.lineHeight + 'px'  }" :com-data="item"></radio-component>
                <select-component v-if="item.type=='select'" class="clearfix" :style="{height: formContent.lineHeight + 'px'   }" :com-data="item"></select-component>
                <upload-component v-if="item.type=='upload'" class="clearfix" :style="{height: formContent.lineHeight + 'px'   }" :com-data="item"></upload-component>
                <submit-component v-if="item.type=='submit'" class="clearfix" :style="{height: formContent.lineHeight + 'px'   }" :com-data="item"></submit-component>
            </div>
          </form>
      </div>
  </div>
</template>
<style scoped>
.form {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.formTitle > h1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
  /* line-height: 1.5; */
  /* font-size: 30px; */
  z-index: 99;
}
.formTitle {
  background: transparent;
  position: relative;
}
.formTitle > img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.formDesc {
  overflow: hidden;
  /* position: relative; */
}
.formDesc > p {
  position: absolute;
  /* text-indent: 2em; */
  padding: 2px;
  margin: 0 auto;
  /* width: 100%; */
  box-sizing: border-box;
  /* line-height: 1.5; */
  /* font-size: 30px; */
  z-index: 98;
  cursor: pointer;
}
.formDesc > img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
}
.formContent {
  background: transparent;
  position: relative;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  z-index: 97;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
<style>
.el-message-box {
  display: inline-block;
  width: 200px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>

<script>
import InputComponent from "../components/InputComponent";
import RadioComponent from "../components/RadioComponent";
import SelectComponent from "../components/SelectComponent";
import SubmitComponent from "../components/SubmitFormComponent";
import TextareaComponent from "../components/TextareaComponent";
import UploadComponent from "../components/UploadFormComponent";
import Bus from "../assets/js/bus";
export default {
  data() {
    return {
      formInfo: {},
      formBG: {},
      formTitle: {},
      formDesc: {},
      formContent: {},
      componentContent: [],
      pxToRem: 0,
      formData: [],
      formId: "",
      activityId: ""
    };
  },
  components: {
    InputComponent,
    RadioComponent,
    SelectComponent,
    SubmitComponent,
    TextareaComponent,
    UploadComponent
  },
  methods: {
    setRem(doc, win) {
      var that = this;
      var docEl = doc.documentElement,
        resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
          var clientWidth = docEl.clientWidth;

          console.log(clientWidth);
          if (!clientWidth) return;

          //这里是假设在320px宽度设计稿的情况下，1rem = 20px；
          //可以根据实际需要修改
          docEl.style.fontSize = 20 * (clientWidth / 320) + "px";
          console.log("fontSize:", docEl.style.fontSize);
          that.pxToRem = 20 * (clientWidth / 320);
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    },
    checkCookie() {
      window.location.href = "http://xbl.youban.com/";
    }
  },
  mounted() {
    Bus.$on("getFormData", msg => {
      console.log(msg);
      var msg = JSON.parse(msg);
      var flag = 0;
      var index = -1;
      if (msg.type != "checkbox") {
        //先检测是否有这个id
        if (this.formData.length != 0) {
          for (var i = 0; i < this.formData.length; i++) {
            if (msg.id == this.formData[i].id) {
              flag = 1;
              index = i;
              break;
            }
          }
        }
        if (flag == 1) {
          //flag = 1说明有相同的
          if (index != -1) {
            this.formData[index].value = msg.value;
          }
        } else {
          this.formData.push(msg);
        }
      } else {
        if (this.formData.length != 0) {
          for (var i = 0; i < this.formData.length; i++) {
            if (msg.id == this.formData[i].id) {
              flag = 1;
              index = i;
              break;
            }
          }
        }
        if (flag == 1) {
          //flag = 1说明有相同的
          if (index != -1) {
            //非第一个
            console.log("2msg: ", msg);
            // debugger
            if (msg.checked) {
              //如果有被选的,查出来value有没有,有就不变,没有就加入
              var checkedFlag = 0;
              for (var i = 0; i < this.formData[index].value.length; i++) {
                if (msg.value == this.formData[index].value[i]) {
                  checkedFlag = 1; //证明已经在formData里面的value有这个值了
                  break;
                }
              }
              if (checkedFlag != 1) {
                this.formData[index].value.push(msg.value);
              }
            } else {
              //如果没有被轩的,查出来value有没有,有就删除,没有就不变
              // debugger
              var checkedFlag = 0;
              var checkedIndex = -1;
              for (var i = 0; i < this.formData[index].value.length; i++) {
                if (msg.value == this.formData[index].value[i]) {
                  checkedFlag = 1;
                  checkedIndex = i;
                  break;
                }
              }
              if (checkedFlag == 1) {
                console.log("start: ", this.formData[index].value);
                this.formData[index].value.splice(checkedIndex, 1);
                console.log("end: ", this.formData[index].value);
              }
            }
          }
        } else {
          //说明是第一个
          console.log("msg: ", msg);
          msg = {
            id: msg.id,
            type: "checkbox",
            value: [msg.value]
          };
          this.formData.push(msg);
        }
      }
    });
    Bus.$on("submitFormData", () => {
      // debugger
      console.log("formData: ", this.formData);
      if (this.formData.length == 0) {
        this.$alert("报名表单为空", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        return false;
      } else {
        let formData = new FormData();
        formData.append("form_data", JSON.stringify(this.formData));
        formData.append("form_id", this.formId);
        formData.append("activity_id", this.activityId);

        this.$http
          .post("/apis/enroll/sign.json", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.data.status == 100) {
              this.$alert("报名成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  // window.redirect("http://xbl.youban.com/")
                  location.reload();
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  },
  beforeMount() {
    // this.setRem(document, window);
    var formId = this.$route.query.formId;
    var activityId = this.$route.query.activityId;
    this.formId = formId;
    this.activityId = activityId;
    this.$http
      .get("/apis/common/one.json?type=form&id=" + formId)
      .then(res => {
        console.log(res);
        if (res.data.data.status == 100) {
          this.formBG = res.data.data.result.FformStyle.formBG;
          this.formTitle = res.data.data.result.FformStyle.formTitle;
          this.formDesc = res.data.data.result.FformStyle.formDesc;
          this.formContent = res.data.data.result.FformStyle.formContent;
          this.componentContent =
            res.data.data.result.FformStyle.componentContent;
          if (this.formDesc.type == "text") {
            this.formDesc.content = this.formDesc.content
              .replace(/\n/g, "<br>")
              .replace(/ /g, "&nbsp;");
          }
          //   this.formTitle.height = this.formTitle.height/this.pxToRem;
          //   this.formTitle.width = this.formTitle.width/this.pxToRem;
          //   this.formTitle.x = this.formTitle.x/this.pxToRem;
          //   this.formTitle.y = this.formTitle.y/this.pxToRem;
          //   this.formDesc.height = this.formDesc.height/this.pxToRem;
          //   this.formDesc.width = this.formDesc.width/this.pxToRem;
          //   this.formDesc.x = this.formDesc.x/this.pxToRem;
          //   this.formDesc.y = this.formDesc.y/this.pxToRem;
          //   this.formContent.height = this.formContent.height/this.pxToRem;
          //   this.formContent.width = this.formContent.width/this.pxToRem;
          //   this.formContent.x = this.formContent.x/this.pxToRem;
          //   this.formContent.y = this.formContent.y/this.pxToRem;
        } else {
          this.$alert(res.data.data.msg, "提示", {
            confirmButtonText: "确定"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
