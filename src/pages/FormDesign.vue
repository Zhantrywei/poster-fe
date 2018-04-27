<template>
  <div id="formdesign" class="formdesign clearfix">
    <header>报名表单设计</header>
    <div class="left">
      <div class="main">
        <form-preview></form-preview>
      </div>
    </div>
    <div class="right">
      <form-tools-bar></form-tools-bar>
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
    background-color: lightblue;
}
.left {
    float: left;
    /* width: 80%; */
    width: calc(100% - 440px);
    height: calc(100% - 100px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.right {
    float: right;
    width: 440px;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    background: #ffffff;
}
.main {
    width: 375px;
    /* height: 812px; */
    /* width: 24.6323%; */
    /* height: 88.7249%; */
    height: 667px;
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
export default {
    data() {
        return {};
    },
    components: {
        FormPreview,
        FormToolsBar
    },
    methods: {}
};
</script>