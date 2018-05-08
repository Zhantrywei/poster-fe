<template>
  <div id="posterdesign" class="posterdesign clearfix">
    <header>
      <img src="../assets/img/header-logo.png">
      <h2>海报设计</h2>
    </header>
    <div class="preview">
      <div class="phoneview"></div>
    </div>
    <div class="toolsbar">
      <h2>海报设计工具箱</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
.posterdesign {
    width: 100%;
    height: 100%;
    background: #e8e8e8;
}
.posterdesign header {
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
.posterdesign > header > img {
  height: 74.67532467532468px;
}
.posterdesign > header > h2 {
  font-size: 42px;
  font-weight: 200;
  /* color: #fd9821; */
  color: #fff;
  font-family: '微软雅黑'
}
.preview {
    float: left;
    width: 80%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.phoneview {
    /* width: 375px; */
    /* height: 812px; */
    width: 24.6323%;
    height: 88.7249%;
    background: #ffffff;
}
.toolsbar {
    float: right;
    width: 20%;
    height: calc(100% - 100px);
    background: #f8f8f8;
}
.toolsbar h2 {
    text-align: center;
}
</style>
<script>
export default {
    data() {
        return {
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            }
        };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
};
</script>
