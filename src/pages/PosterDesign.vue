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
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="二维码设计" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
      <el-form ref="form" :model="form" label-width="80px" style="border-top:1px solid #ebeef5;padding-top: 10px">
        <el-form-item label="活动名称">
          <!-- <el-input v-model="form.name"></el-input> -->
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.phoneview {
  /* width: 375px; */
  /* height: 812px; */
  width: 375px;
  height: 667px;
  background: #ffffff;
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
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  mounted() {},
  beforeMount() {
    //接收传输
    // this.$route.query.id;
    // this.$route.params.id;
    if (this.$route.query.row) {
      var row = JSON.parse(this.$route.query.row);

      this.form = row;
    }else{
      this.$router.push({ name: "index"})
    }
    console.log("row: ", row);
  }
};
</script>
