<template>
  <div class="uploadComponent" @dblclick="editComponent(comData.index)" :style="{backgroundColor: comData.backgroundColor}">
    <label :for="comData.id"  v-text="comData.label" v-show="comData.label" :style="{width: comData.labelWidth + 'px'}"  style="text-align: center"></label>
    <!-- <el-upload :action="uploadUrl"  list-type="picture" :limit="1" :data="uploadData" :auto-upload="false" :on-change="changeImgFile" ref="uploadImg" :on-success="successImgFile" :name="comData.id"> -->
    <el-upload :action="uploadUrl" :show-file-list="false" :disabled="true">
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
    // deleteComponent(e){
    //   e.preventDefault();
    //   console.log("deleteComponent")
    //   this.operationShow = !this.operationShow;
    // },
    // upComponent(e){
    //   e.preventDefault();
    //   console.log("upComponent")
    //   this.operationShow = !this.operationShow;
    // },
    // downComponent(e){
    //   e.preventDefault();
    //   console.log("downComponent")
    //   this.operationShow = !this.operationShow;
    // }
    editComponent(index) {
      event.preventDefault();
      var index = index - 1;
      console.log("comData.index: ", index);
      Bus.$emit("getIndex", index);
      this.isActive = true;
      var msg = 6;
      Bus.$emit("getActive", msg);
    },
    // //上传图片
    // changeImgFile(file, fileList) {
    //   console.log(file);
    //   console.log(name);
    //   var that = this;
    //   //this.imageUrl = URL.createObjectURL(file.raw);
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file.raw);
    //   reader.onload = function(e) {
    //     // console.log("this-result: ", this.result); // 这个就是base64编码了
    //     that.uploadData.img = this.result;
    //     that.uploadData.directory = comData.id;
    //     that.$refs.uploadImg.submit();
    //   };
    // },
    // //上传图片成功之后返回显示图片
    // successImgFile(res, file, fileList) {
    //   console.log("res", res);
    //   if (res.data.status == 100) {
    //     this.$alert("上传成功", "提示", {
    //       confirmButtonText: "确定",
    //       callback: action => {}
    //     });
    //   }
    // }
    upload(e){
      e.preventDefault();
    }
  },
  mounted() {}
};
</script>

