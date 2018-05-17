<template>
  <div id="posterdesign" class="posterdesign clearfix">
    <header>
      <img src="../assets/img/header-logo.png">
      <h2>海报设计</h2>
    </header>
    <div class="preview clearfix">
      <div class="phoneview" :style="{backgroundImage: 'url('+posterBG.bgImgUrl+')', backgroundColor: posterBG.bgColor}">
        <div class="qrcode"  @mousedown="moveQrcode" :style="{height: qrCode.height + 'px',width: qrCode.width + 'px',top: qrCode.y + 'px',left: qrCode.x + 'px', transform: 'rotate('+ qrCode.angle + 'deg)'}"></div>
      </div>
    </div>
    <div class="toolsbar">
      <header>
        <h2>海报设计工具箱</h2>
      </header>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="活动基本信息" name="1">
          <el-form ref="form" :model="form" label-width="80px" style="border-top:1px solid #ebeef5;padding-top: 10px">
            <el-form-item label="活动名称 :" style="text-align: center;">
              <!-- <el-input v-model="form.name"></el-input> -->
              <span style="font-size: 20px; font-weight: 700">{{form.Fname}}</span>
            </el-form-item>
            <el-form-item label="活动时间 :">
              <el-col :span="11" style="text-align: center;">
                <span>{{form.FstartTime}}</span>
              </el-col>
              <el-col class="line" :span="2">至</el-col>
              <el-col :span="11" style="text-align: center;">
                <span>{{form.FendTime}}</span>
              </el-col>
            </el-form-item>
          </el-form>
          
        </el-collapse-item>
        <el-collapse-item title="海报背景设计" name="2">
          <el-form :model="posterBG" label-width="80px">
          <el-form-item label="背景图片">
            <el-upload class="upload-demo" action="/apis/common/uploadimg.debug" list-type="picture" :data="uploadData" :limit="1" :auto-upload="false" name="posterBGImg"  :on-change="changeBGFile" ref="uploadBG" :on-success="successBGFile" :on-remove="removeBGFile">
              <el-button size="small" type="primary">点击上传</el-button>
              <span style="margin-left: 10px;" slot="tip" class="el-upload__tip">建议上传png文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景颜色" style="margin-bottom: 0px">
            <el-color-picker v-model="posterBG.bgColor" show-alpha :predefine="predefineColors">
            </el-color-picker>
          </el-form-item>
        </el-form>
        </el-collapse-item>
        <el-collapse-item title="二维码设计" name="3">
          <!-- 二维码图片位置、大小 -->
        <el-form :model="qrCode" label-width="100px"> 
          <el-form-item label="二维码大小">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">宽</span>
              <el-input v-model="qrCode.width" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">高</span>
              <el-input v-model="qrCode.height" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="二维码位置">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">左边距 ( x )</span>
              <el-input v-model="qrCode.x" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">上边距 ( y )</span>
              <el-input v-model="qrCode.y" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="旋转角度" style="margin-bottom: 0px">
            <el-slider v-model="qrCode.angle" :min="0" :max="360" >
            </el-slider>
          </el-form-item>
          <el-form-item label="内边距" style="margin-bottom: 0px">
            <el-input v-model="qrCode.padding" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
          </el-form-item>
        </el-form>
        </el-collapse-item>
      </el-collapse>
      <!-- <el-form ref="form" :model="form" label-width="80px" style="border-top:1px solid #ebeef5;padding-top: 10px">
        <el-form-item label="活动名称">
          <span>{{form.Fname}}</span>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11" style="text-align: center;">
            <span>{{form.FstartTime}}</span>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11" style="text-align: center;">
            <span>{{form.FendTime}}</span>
          </el-col>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="btn">
        <button class="savebtn" @click.self="savePoster" v-if="addBtnShow">新增</button>
        <button class="savebtn" @click.self="savePoster" v-else>保存</button>
        <button class="resetbtn" @click.self="resetPoster">清空</button>
      </div>
  </div>
</template>
<style>
.posterdesign {
  width: 100%;
  height: 100%;
  background: #e8e8e8;
}
.posterdesign > header {
  width: 100%;
  height: 100px;
  background-color: #1bc7d5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50px;
}
.posterdesign > header > img {
  height: 74.67532467532468px;
}
.posterdesign > header > h2 {
  font-size: 42px;
  font-weight: 200;
  /* color: #fd9821; */
  color: #fff;
  font-family: "微软雅黑";
}
.preview {
  float: left;
  width: calc(100% - 500px);
  height: calc(100% - 100px);
  /* display: flex; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}
.phoneview {
  /* width: 375px; */
  /* height: 812px; */
  width: 375px;
  height: 667px;
  background: #ffffff;
  background-repeat: none;
  background-position: top center;
  background-size: cover;
  margin: auto;
  overflow: hidden;
}
.toolsbar {
  float: right;
  width: 500px;
  height: calc(100% - 100px);
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.toolsbar header {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
}
.btn {
  position: fixed;
  top: 120px;
  right: 520px;
  /* background-color: steelblue; */
}
.btn > button {
  width: 100px;
  height: 40px;
  border-radius: 6px;
  color: white;
  outline: none;
  border: 0px;
}
.btn > button:active {
  position: relative;
  top: 1px;
  left: 1px;
}
.savebtn {
  background-color: #81cef2;
  margin-right: 10px;
}
.resetbtn {
  background-color: #e4001d;
}
.qrcode {
  background-repeat: none;
  background-position: center center;
  background-size: cover;
  background-image: url("../assets/img/1526319209.png");
  width: 100px;
  height: 100px;
  position: relative;
}
</style>
<style>
.el-collapse-item__header {
  font-size: 16px;
  font-weight: 700;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
<script>
export default {
  data() {
    return {
      activeName: ["1"],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      addBtnShow: true,
      posterBG: {
        bgImgUrl: "",
        bgColor: ""
      },
      qrCode: {
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        angle: 0,
        padding: 0
      },
      //预定颜色
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577"
      ],
      uploadData: {
        img: "",
        directory: ""
      },
      activityId: "",
      formId: ""
    };
  },
  methods: {
    //设置FormBG背景图片和背景色->单向通信到FormPreview设置背景图片和背景色
    // sendPosterBG() {
    //   var msg = JSON.parse(JSON.stringify(this.posterBG));
    //   Bus.$emit("getPosterBG", msg);
    // },
    addPoster() {},
    savePoster() {
      let formData = new FormData();
        formData.append("poster_url", "");
        formData.append("poster_bg_img", JSON.stringify(this.posterBG));
        formData.append("poster_qrcode", JSON.stringify(this.qrCode));
        formData.append("poster_tips_txt", JSON.stringify(this.qrCode));
      this.$http.post('/apis/activity/design.json',formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(res=>{
            if(res.data.data.status == 100){
              this.$alert("海报设计成功!","提示",{
                confirmButtonText: "确定",
              })
            }
          }).catch(err=>{

          })
    },
    resetPoster() {
      this.posterBG={
        bgImgUrl: "",
        bgColor: ""
      }
      this.qrCode= {
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        angle: 0,
        padding: 0
      }
    },
    //上传表单背景设计
    changeBGFile(file, fileList) {
      console.log(file);
      console.log(name);
      var that = this;
      //this.imageUrl = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        // console.log("this-result: ", this.result); // 这个就是base64编码了
        that.uploadData.img = this.result;
        that.uploadData.directory = "posterBGImg";
        that.$refs.uploadBG.submit();
      };
    },
    //上传表单背景设计成功之后返回显示图片
    successBGFile(res, file, fileList) {
      console.log("res", res);
      if (res.data.status == 100) {
        this.posterBG.bgImgUrl = res.data.result;
        // this.sendPosterBG();
      }
    },
    //移除背景图片
    removeBGFile(file, fileList) {
      this.posterBG.bgImgUrl = "";
      // this.sendPosterBG();
    },
    moveQrcode(e) {
      e.preventDefault();
      console.log("点击进入");
      var that = this;
      //先获取初始位置
      var eClientX = e.clientX;
      var eClientY = e.clientY;
      var initX = parseInt(this.qrCode.x);
      var initY = parseInt(this.qrCode.y);
      console.log("initX:", this.qrCode.x);
      console.log("initY:", this.qrCode.y);
      var target = e.target;
      var flag = 1;
      if (flag == 1) {
        target.onmousemove = function(e) {
          that.qrCode.x = e.clientX - eClientX + initX;
          that.qrCode.y = e.clientY - eClientY + initY;
          target.onmouseup = function() {
            target.onmousemove = null;
            target.onmousedown = null;
            console.log("放开1");
            console.log("qrCode.x:", that.qrCode.x);
            console.log("qrCode.y:", that.qrCode.y);
            // var msg = JSON.parse(JSON.stringify(that.qrCode));
            // Bus.$emit("sendFormTitle", msg);
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
  mounted() {},
  beforeMount() {
    //接收传输
    // this.$route.query.id;
    // this.$route.params.id;
    if (this.$route.query.row) {
      var row = JSON.parse(this.$route.query.row);
      console.log(row)
      this.form = row;
      this.formId = row.FformId;
      this.activityId = row._id.$id;
      this.$http.get("/apis/common/one.json?type=activity&id="+this.activityId).then(res=>{
        if(res.data.data.status == 100){
          console.log(res)
        }
      }).catch(err=>{

      })
      if (row.FposterBgUrl) {
        this.addBtnShow = false;
      } else {
        this.posterBG.bgImgUrl = row.FposterBgUrl;
        this.qrCode = JSON.parse(row.FposterQrcode);
      }
    } else {
      this.$router.push({ name: "index" });
    }
    // console.log("row: ", row);

  }
};
</script>
