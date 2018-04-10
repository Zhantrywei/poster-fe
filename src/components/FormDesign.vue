<template>
  <div id="formdesign" class="formdesign clearfix">
    <header>报名表单设计</header>
    <div class="preview">
      <div class="phoneview" id="formBGImg">
        <div class="formTitle" id="formTitle"></div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="submitForm('activity')">保存</el-button>
        <el-button type="danger" @click="resetForm('activity')">清空</el-button>
      </div>
    </div>
    <div class="toolsbar">
      <h2>报名表单设计工具箱</h2>
      <el-form ref="activity" :rules="activityRules" :model="activity" label-width="90px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="activity.activityName"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="activityTime">
          <el-date-picker v-model="activity.activityTime" type="daterange" value-format="yyyyMMdd" :picker-options="starttimeOption" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="开始时间" prop="starttime">
          <el-date-picker v-model="activity.starttime" :editable='false' type="date" placeholder="选择日期" value-format="yyyyMMdd" :picker-options="starttimeOption">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endtime">
          <el-date-picker v-model="activity.endtime" :editable='false' type="date" placeholder="选择日期" value-format="yyyyMMdd" :picker-options="endtimeOption">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="海报助力">
          <el-switch v-model="activity.assistance" active-color="#13ce66">
          </el-switch>
        </el-form-item>
        <el-form-item label="背景图片">
          <!-- 这里上传成功后后台返回imgurl, 成功回调设置背景图片 -->
          <el-upload :limit='1' action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :on-success="uploadSuccess" :on-error="uploadError">
            <el-button size="small" type="primary">点击上传</el-button>
            <span style="margin-left:10px" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="表单题目">
          <el-radio-group v-model="formTitleRadio" @change="updateFormTitle">
            <el-radio label="text">文本</el-radio>
            <el-radio label="image">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="formTitleRadio=='text'">
          <el-form-item label="题目内容">
            <el-input v-model="form.formName.content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker v-model="form.formName.fontColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input-number v-model="form.formName.fontSize" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
          </el-form-item>
        </div>
        <el-form-item v-else>
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="表单简述">
          <el-switch v-model="formdescswitch" active-color="#13ce66"></el-switch>
          <el-input type="textarea" v-model="form.desc" v-show="formdescswitch"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="表单宽度">
          <el-input v-model="input" placeholder="请输入内容">
            <template slot="append">px</template>
          </el-input>
        </el-form-item> -->
        <!-- <el-form-item label="表单高度">
          <el-input v-model="input" placeholder="请输入内容">
            <template slot="append">px</template>
          </el-input>
        </el-form-item> -->
        <!-- <el-form-item label="表单背景">
          <el-radio-group v-model="formBGRadio">
            <el-radio label="color">背景色</el-radio>
            <el-radio label="image">图片</el-radio>
          </el-radio-group>
          <div v-if="formBGRadio=='color'">
            <el-form-item label="背景色">
              <el-color-picker v-model="color1"></el-color-picker>
            </el-form-item>
          </div>
          <div v-else>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-form-item> -->
        <!-- <el-form-item label="表单内容">
          <el-form-item label="上内边距">
            <el-input class="padding" v-model="input" placeholder="请输入内容">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="下内边距">
            <el-input v-model="input" placeholder="请输入内容">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="左内边距">
            <el-input v-model="input" placeholder="请输入内容">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="右内边距">
            <el-input v-model="input" placeholder="请输入内容">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="单行文本">
            <el-button type="primary">添加单行文本</el-button>
          </el-form-item>
          <el-form-item label="多行文本">
            <el-button type="primary">添加多行文本</el-button>
          </el-form-item>
          <el-form-item label="单选框">
            <el-button type="primary">添加单选框</el-button>
          </el-form-item>
          <el-form-item label="多选框">
            <el-button type="primary">添加多选框</el-button>
          </el-form-item>
          <el-form-item label="下拉框">
            <el-button type="primary">添加下拉框</el-button>
          </el-form-item>
          <el-form-item label="图片上传">
            <el-button type="primary">添加图片上传</el-button>
          </el-form-item>
          <el-form-item label="提交按钮">
            <el-button type="primary">添加提交按钮</el-button>
          </el-form-item>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item> -->
      </el-form>
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
.preview {
    float: left;
    /* width: 80%; */
    width: calc(100% - 440px);
    height: calc(100% - 100px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.phoneview {
    width: 375px;
    /* height: 812px; */
    /* width: 24.6323%; */
    /* height: 88.7249%; */
    height: 667px;
    background: #ffffff;
    /* background-image: url('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png'); */
    /* background-image: url('../assets/img/BGimg.jpg'); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
.toolsbar {
    float: right;
    /* width: 20%; */
    width: 440px;
    height: calc(100% - 100px);
    overflow-y: auto;
    background: #f8f8f8;
}
.toolsbar h2 {
    text-align: center;
}

.btn {
    position: absolute;
    right: 440px;
    /* left: 0; */
    top: 100px;
    margin: 10px;
}
</style>
<script>
export default {
    data() {
        return {
            //提交的活动信息
            activity: {
                activityName: "",
                activityTime: "",
                assistance: true
            },
            //校验活动提交规则
            activityRules: {
                activityName: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 20,
                        message: "长度在 3 到 20 个字符",
                        trigger: "blur"
                    }
                ],
                activityTime: [
                    {
                        required: true,
                        message: "请选择活动时间",
                        trigger: "blur"
                    }
                ]
            },
            starttimeOption: {
                disabledDate(time) {
                    return time.getTime() + 3600 * 24 * 1000 < Date.now();
                }
            },
            formTitleRadio: "text",
            formdescswitch: true,
            formBGRadio: "color",
            //
            form: {
                bgImgUrl: "",
                formName: {
                    type: "text",
                    content: "",
                    fontSize: "",
                    fontColor: "",
                    position: {
                        //位置, 文本默认居中对齐, 图片可移动
                        x: '', //距离顶点向左为正,向右为负
                        y: '' //距离顶点向下为正,向上为负
                    },
                    size: {
                        //大小, 文本默认水平居中垂直对齐,图片可缩放
                        width: '', //宽度
                        height: '' //高度
                    },
                    rotate: '' //旋转角度,文本默认为0,图片可以旋转
                }
            }
        };
    },
    methods: {
        setBG(imgurl) {
            //测试过,用连接的url没有问题,本地地址的有问题
            // var imgurl = 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/00/04/ChMkJlfJWDiIJwULAAmCdZ-7FYwAAU-IwH2mdoACYKN321.jpg'
            var formBGImg = document.getElementById("formBGImg");
            formBGImg.style.backgroundImage = "url(" + imgurl + ")";
        },
        setFormTitle(formName) {
            if (formName.type == "text") {
            } else if (formName.type == "img") {
            }
        },
        updateFormTitle() {
            // console.log()
        },
        //提交活动
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.activity);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //重置提交活动
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        uploadSuccess(response, file, fileList) {
            var imgurl =
                "https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/00/04/ChMkJlfJWDiIJwULAAmCdZ-7FYwAAU-IwH2mdoACYKN321.jpg";
            this.setBG(imgurl);
        },
        uploadError(err, file, fileList) {
            var imgurl =
                "https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/00/04/ChMkJlfJWDiIJwULAAmCdZ-7FYwAAU-IwH2mdoACYKN321.jpg";
            this.setBG(imgurl);
        },
        handleChange(value) {
            console.log(value);
        }
    }
};
</script>