<template>
  <div id="formdesign" class="formdesign clearfix">
    <header>
      <img src="../assets/img/header-logo.png">
      <h2>表单设计</h2>        
    </header>
    <div class="left">
      <div class="main">
        <form-preview></form-preview>
      </div>
    </div>
    <div class="right">
      <form-tools-bar :change-form-data="msg"></form-tools-bar>
    </div>
  </div>
</template>

<style scoped>
.formdesign {
    width: 100%;
    height: 100%;
    background: #e8e8e8;
}
.formdesign header {
  width: 100%;
  height: 100px;
  background-color: #1BC7D5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50px;
}
.formdesign > header > img {
  height: 74.67532467532468px;
}
.formdesign > header > h2 {
  font-size: 42px;
  font-weight: 200;
  color: white;
  font-family: '微软雅黑'
}
.left {
    float: left;
    /* width: 80%; */
    width: calc(100% - 500px);
    height: calc(100% - 100px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}
.right {
    float: right;
    width: 500px;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    background: #ffffff;
}
.main {
    width: 375px;
    height: 667px;
    /* width: 187.5px;
    height: 333.5px; */
    background: #ffffff;
    /* background-image: url('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png'); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
<script>
import FormPreview from "../components/FormPreview";
import FormToolsBar from "../components/FormToolsbar";
import Bus from '../assets/js/bus'
export default {
    data() {
        return {
          msg: ""
        };
    },
    components: {
        FormPreview,
        FormToolsBar
    },
    methods: {},
    beforeMount(){
      console.log("进入表单设计")
      console.log(this.$route.params.row);
      if(this.$route.params.row){
        var msg = this.$route.params.row;
        console.log("msg: ",msg);
        this.msg = msg;
        // Bus.$emit("sendRow", msg);
      }
    }
};
</script>