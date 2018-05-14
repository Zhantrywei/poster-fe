<template>
  <div class="uploadComponent" @dblclick="editComponent(comData.index)" :style="{backgroundColor: comData.backgroundColor}">
    <label :for="comData.id"  v-text="comData.label" v-show="comData.label" :style="{width: comData.labelWidth + 'px'}"  style="text-align: center"></label>
    <!-- <el-upload :action="uploadUrl"  list-type="picture" :limit="1" :data="uploadData" :auto-upload="false" :on-change="changeImgFile" ref="uploadImg" :on-success="successImgFile" :name="comData.id"> -->
    <el-upload :action="uploadUrl" :data="uploadData" :auto-upload="false" :show-file-list="false" :on-change="changeFile" ref="upload" :name="comData.id" :on-success="successFile" >
      <el-button size="small" type="primary" @click="upload">{{comData.value}}</el-button>
      <div slot="tip" class="el-upload__tip">{{comData.placeholder}}</div>
    </el-upload>
  </div>

</template>
<style>
textarea {
  border: 0px;
  padding: 0 6px;
  color: inherit;
}
.uploadComponent {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  box-sizing: border-box;
}
.uploadComponent .content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.btnBgColorRed {
  background-color: #f5888a;
}
.btnBgColorBlue {
  background-color: #69b2fd;
}
</style>
<style scoped>
.operation {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 100%;
  height: 30px;
  align-items: center;
}
.operation > button {
  width: 20px;
  height: 20px;
  border: 0px;
  border-radius: 10px;
  font-size: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline: none;
}
.active {
  border: 1px dotted #eee;
  padding: 1px;
}
</style>


<script>
import Bus from "../assets/js/bus";
export default {
  name: "uploadComponent",
  props: ["comData"],
  data() {
    return {
      uploadUrl: "/apis/common/uploadimg.debug",
      uploadData: {
        img: "",
        directory: ""
      }
    };
  },
  methods: {
    editComponent(index) {
      event.preventDefault();
      var index = index - 1;
      console.log("comData.index: ", index);
      Bus.$emit("getIndex", index);
      this.isActive = true;
      var msg = 6;
      Bus.$emit("getActive", msg);
    },
    //上传表单背景设计
    changeFile(file, fileList) {
      // console.log(file);
      // console.log(name);
      var that = this;
      //this.imageUrl = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        // console.log("this-result: ", this.result); // 这个就是base64编码了
        that.uploadData.img = this.result;
        that.uploadData.directory = that.comData.id;
        that.$refs.upload.submit();
      };
    },
    //上传表单背景设计成功之后返回显示图片
    successFile(res, file, fileList) {
      console.log("res", res);
      if (res.data.status == 100) {
        this.$alert("上传成功","提示",{
          confirmButtonText: "确定"
        })
      }
      var msg = {
        id: this.comData.id,
        type: 'upload',
        value: res.data.result
      }
      Bus.$emit("getFormData",JSON.stringify(msg))

    },
    upload(e){
      e.preventDefault();
    }
  },
  mounted() {}
};
</script>

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
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
</style>


