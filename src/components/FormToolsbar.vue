<template>
  <div class="toolsbar" id="toolsbar">
    <header>
      <h2>表单设计工具</h2>
    </header>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <!-- 活动基本信息搞定 -->
      <el-collapse-item title="活动基本信息" name="1">
         <el-form :model="activityInfo" label-width="80px">
          <el-form-item label="活动名称" required>
            <el-input v-model="activityInfo.activityName"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-date-picker :editable="false" type="date" placeholder="选择开始日期" v-model="activityInfo.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col style="text-align: center" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker :editable="false" type="date" placeholder="选择结束时间" v-model="activityInfo.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="海报设计" required>
            <el-switch v-model="activityInfo.posterDesignStatus"></el-switch>
          </el-form-item>
         </el-form>
      </el-collapse-item>
      <!-- 表单背景设计单向通信搞定 -->
      <el-collapse-item title="表单背景设计" name="2">
        <el-form :model="formBG" label-width="80px">
          <el-form-item label="背景图片">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
              <span style="margin-left: 10px;" slot="tip" class="el-upload__tip">建议上传png文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景颜色" style="margin-bottom: 0px">
            <el-color-picker v-model="formBG.bgColor" show-alpha :predefine="predefineColors" @active-change="sendFormBG" @change="sendFormBG">
            </el-color-picker>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <!-- 表单标题设计双向通信搞定 -->
      <el-collapse-item title="表单标题设计" name="3">
        <el-form :model="formTitle" label-width="80px">
          <el-form-item label="标题形式">
            <el-radio-group v-model="formTitle.type">
              <el-radio label="text">文本</el-radio>
              <el-radio label="img">图片</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 标题为文本 -->
          <el-form-item label="标题内容" v-show="formTitle.type == 'text'">
            <el-input v-model="formTitle.content" @blur="sendFormTitle"></el-input>
          </el-form-item>
          <el-form-item label="标题字体" v-show="formTitle.type == 'text'">
            <el-select v-model="formTitle.fontFamily" clearable placeholder="请选择" @change="sendFormTitle">
              <el-option v-for="item in fontOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题大小" v-show="formTitle.type == 'text'">
            <el-input v-model="formTitle.fontSize" type="number" min="12" max="80" @change="sendFormTitle">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="标题颜色" v-show="formTitle.type == 'text'">
            <el-color-picker v-model="formTitle.fontColor" :predefine="preFontColors" @change="sendFormTitle">
            </el-color-picker>
          </el-form-item>
          <!-- 标题为图片 -->
          <el-form-item label="标题图片" v-show="formTitle.type == 'img'">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
              <span style="margin-left: 10px;" slot="tip" class="el-upload__tip">建议上传png文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="标题大小" v-show="formTitle.type == 'img'">
            <div style="margin-top: 10px;">
              <span style="margin-right: 10px">宽</span>
              <el-input v-model="formTitle.width" style="width: 50%;" type="number" @change="sendFormTitle" min="0">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">高</span>
              <el-input v-model="formTitle.height" style="width: 50%;" type="number" @change="sendFormTitle" min="0">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="标题位置">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">左边距 ( x )</span>
              <el-input v-model="formTitle.x" style="width: 50%;" type="number" @change="sendFormTitle">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">上边距 ( y )</span>
              <el-input v-model="formTitle.y" style="width: 50%;" type="number" @change="sendFormTitle">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="标题旋转" style="margin-bottom: 0px">
            <el-slider v-model="formTitle.angle" :min="0" :max="360" @change="sendFormTitle">
            </el-slider>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <!-- 表单描述设计双向通信搞定 -->
      <el-collapse-item title="表单描述设计" name="4">
        <el-form :model="formDesc" label-width="80px">      
          <!-- 表单简述 -->
          <el-form-item label="简述形式">
            <el-radio-group v-model="formDesc.type" @change="sendFormDesc">
              <el-radio label="text">文本</el-radio>
              <el-radio label="img">图片</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 文本简述 -->
          <el-form-item label="简述内容" v-show="formDesc.type == 'text'">
            <el-input v-model="formDesc.content" type="textarea" @blur="sendFormDesc" class="inputTextArea"></el-input>
          </el-form-item>
          <el-form-item label="简述字体" v-show="formDesc.type == 'text'">
            <el-select v-model="formDesc.fontFamily" clearable placeholder="请选择" @change="sendFormDesc">
              <el-option v-for="item in fontOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体大小" v-show="formDesc.type == 'text'">
            <el-input v-model="formDesc.fontSize" type="number" min="12" max="80" @change="sendFormDesc">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="字体颜色" v-show="formDesc.type == 'text'">
            <el-color-picker v-model="formDesc.fontColor" :predefine="preFontColors" @active-change="sendFormDesc" @change="sendFormDesc">
            </el-color-picker>
          </el-form-item>
          <!-- 简述为图片 -->
          <el-form-item label="简述图片" v-show="formDesc.type == 'img'">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
              <span style="margin-left: 10px;" slot="tip" class="el-upload__tip">建议上传png文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="简述大小" v-show="formDesc.type == 'img'">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">宽</span>
              <el-input v-model="formDesc.width" style="width: 50%;" type="number" @change="sendFormDesc">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">高</span>
              <el-input v-model="formDesc.height" style="width: 50%;" type="number" @change="sendFormDesc">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="简述位置">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">左边距 ( x )</span>
              <el-input v-model="formDesc.x" style="width: 50%;" type="number" @change="sendFormDesc">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">上边距 ( y )</span>
              <el-input v-model="formDesc.y" style="width: 50%;" type="number" @change="sendFormDesc">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="简述旋转" style="margin-bottom: 0px">
            <el-slider v-model="formDesc.angle" :min="0" :max="360"  @change="sendFormDesc">
            </el-slider>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <!-- 表单图片双向通信 -->
      <el-collapse-item title="表单基础设计" name="5">
        <el-form :model="formContent" label-width="80px">   
          <el-form-item label="表单图片">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
              <span style="margin-left: 10px;" slot="tip" class="el-upload__tip">建议上传png文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="表单大小">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">宽</span>
              <el-input v-model="formContent.width" style="width: 50%;" type="number"  @change="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">高</span>
              <el-input v-model="formContent.height" style="width: 50%;" type="number" @change="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="表单位置">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">左边距 ( x )</span>
              <el-input v-model="formContent.x" style="width: 50%;" type="number" @blur="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">上边距 ( y )</span>
              <el-input v-model="formContent.y" style="width: 50%;" type="number" @blur="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>   
          <el-form-item label="表单旋转" style="margin-bottom: 0px">
            <el-slider v-model="formContent.angle" :min="0" :max="360"  @change="sendFormContent">
            </el-slider>
          </el-form-item>
          <el-form-item label="内边距">
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">左内边距</span>
              <el-input v-model="formContent.paddingLeft" style="width: 50%;" type="number" @blur="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">右内边距</span>
              <el-input v-model="formContent.paddingRight" style="width: 50%;" type="number" @blur="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">上内边距</span>
              <el-input v-model="formContent.paddingTop" style="width: 50%;" type="number" @blur="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
            <div style="margin-top: 40px;">
              <span style="margin-right: 10px">下内边距</span>
              <el-input v-model="formContent.paddingBottom" style="width: 50%;" type="number" @blur="sendFormContent">
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="表单字体">
            <el-select v-model="formContent.fontFamily" clearable placeholder="请选择" @change="sendFormContent">
              <el-option v-for="item in fontOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input v-model="formContent.fontSize" type="number" min="12" max="80" @change="sendFormContent">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker v-model="formContent.fontColor" :predefine="preFontColors" @active-change="sendFormContent" @change="sendFormContent">
            </el-color-picker>
          </el-form-item>
          <el-form-item label="每行高度">
            <el-input v-model="formContent.lineHeight" style="width: 50%;" type="number" @change="sendFormContent">
                <template slot="append">px</template>
              </el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="表单内容控件设计" name="6">
        <el-form :model="formComponent" label-width="80px">
          <!-- 控件ID = model、id、name -->
          <el-form-item label="控件ID">
            <el-input v-model="formComponent.id" type="text"></el-input>
          </el-form-item>
          <el-form-item label="控件类型">
            <el-select v-model="formComponent.type" clearable placeholder="请选择">
              <el-option v-for="item in componentType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Label">
            <el-input v-model="formComponent.label" type="text"></el-input>
          </el-form-item>
          <!--<el-form-item label="Label宽度">
            <el-input v-model="formComponent.labelWidth" style="width: 50%;" min="0" type="number">
              <template slot="append">px</template>
            </el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="addComponent">创建控件</el-button>
          </el-form-item>
        </el-form>

      </el-collapse-item>
    </el-collapse>
    <!-- <el-form :model="formToolsbar" label-width="80px"> -->
      
      <!-- <el-form-item label="单行文本" class="addContent">
        <div style="margin-top: 40px;">
          <span style="margin-right: 10px;display:inline-block;width: 56px;">文本内容</span>
          <el-input style="width: 50%;"></el-input>
        </div>
        <div style="margin-top: 10px;">
          <span style="margin-right: 10px;display:inline-block;width: 56px;">默认值</span>
          <el-input style="width: 50%;"></el-input>
        </div>
        <div style="margin-top: 10px;">
          <el-button type="primary">添加单行文本</el-button>
        </div>
      </el-form-item>
      <el-form-item label="多行文本" class="addContent">
        <div style="margin-top: 40px;">
          <span style="margin-right: 10px;display:inline-block;width: 56px;vertical-align: top;">文本内容</span>
          <el-input style="width: 50%;" type="textarea" :rows="5"></el-input>
        </div>
        <div style="margin-top: 10px;">
          <span style="margin-right: 10px;display:inline-block;width: 56px;vertical-align: top;">默认值</span>
          <el-input style="width: 50%;" type="textarea" :rows="5"></el-input>
        </div>
        <div style="margin-top: 10px;">
          <el-button type="primary">添加多行文本</el-button>
        </div>
      </el-form-item>
      <el-form-item label="单选框" class="addContent">
        <div style="margin-top: 40px;">
          <span style="margin-right: 10px;display:inline-block;width: 56px;">名称</span>
          <el-input style="width: 50%;"></el-input><br><br>
          <span style="margin-right: 10px;display:inline-block;width: 56px;">单项名称</span>          
          <el-input style="width: 50%;"></el-input>
          <el-button type="primary" circle icon="el-icon-plus" size="mini"></el-button>
        </div>
        <div style="margin-top: 10px;">          
          <el-radio label="1">备选项</el-radio>
        </div>
        <div style="margin-top: 10px;">
          <el-button type="primary">添加单选框</el-button>
        </div>
      </el-form-item> -->
      <div class="componentPre" id="componentPre">

      </div>
  </div>
</template>
<style scoped>
.toolsbar {
  padding: 10px;
  position: relative;
}
header {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
}
.btnspan {
  display: inline-block;
  margin-bottom: 10px;
}
.inputTextArea textarea {
  white-space: pre;
}
</style>
<style>
.el-collapse-item__header {
  font-size: 16px;
  font-weight: 700;
}
</style>


<script>
import Bus from "../assets/js/bus";
import BGImg from "../assets/img/BGimg.jpg";
import ActivityTitle from "../assets/img/亲子游title.png";
import FormBGImg from "../assets/img/亲子游表单BG.png";
import TextCom from "./formComponentEdit/textCom";
import PasswordCom from "./formComponentEdit/passwordCom";
import TextareaCom from "./formComponentEdit/textareaCom";
export default {
  name: "toolsbar",
  data() {
    return {
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
      preFontColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585"
      ],
      fontOptions: [
        {
          value: "Helvetica Neue",
          label: "Helvetica Neue"
        },
        {
          value: "Helvetica",
          label: "Helvetica"
        },
        {
          value: "PingFang SC",
          label: "PingFang SC"
        },
        {
          value: "Hiragino Sans GB",
          label: "Hiragino Sans GB"
        },
        {
          value: "Microsoft YaHei",
          label: "Microsoft YaHei"
        },
        {
          value: "微软雅黑",
          label: "微软雅黑"
        },
        {
          value: "Arial",
          label: "Arial"
        },
        {
          value: "sans-serif",
          label: "sans-serif"
        }
      ],
      activeNames: ["6"],
      //活动基本信息, 不用与预览组件实现数据双向通信
      activityInfo: {
        activityName: "",
        startTime: "",
        endTime: "",
        posterDesignStatus: false
      },
      //表单背景设计, 需要和FormPreview通信,单项通信FormToolsbar -> FormPreview
      formBG: {
        // bgImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525245573&di=833509e0e4fc2558f6771579c24071b7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.lenovomm.com%2Fs3%2Fimg%2Fapp%2Fapp-img-lestore%2F1127-2016-07-01012755-1467350875451.jpg%3FisCompress%3Dtrue%26amp%3Bwidth%3D320%26amp%3Bheight%3D480%26amp%3Bquantity%3D1%26amp%3Brotate%3Dtrue',
        bgImgUrl: BGImg,
        bgColor: "#409EFF"
      },
      formTitle: {
        //文本标题
        // type: "text",
        // content: "",
        // fontFamily: "黑体",
        // fontSize: 32,
        // fontColor: '#C71585',
        // width: null,
        // height: null,
        // x: 0,
        // y: 0,
        // angle: 30,
        //图片标题
        type: "img",
        content: ActivityTitle,
        fontFamily: null,
        fontSize: null,
        fontColor: null,
        width: 245,
        height: 145,
        x: 65,
        y: 4,
        angle: 0
      },
      formDesc: {
        //文本描述
        type: "text",
        content: "",
        fontFamily: "黑体",
        fontSize: 32,
        fontColor: "#C71585",
        width: null,
        height: null,
        x: 0,
        y: 0,
        angle: 30
        //图片描述
        // type: "img",
        // content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524650893445&di=652b69f04ef1801032235485d88ee824&imgtype=0&src=http%3A%2F%2Fwww.soft711.com%2Fuploadfile%2F2014%2F0217%2F20140217020553126.png",
        // fontFamily: null,
        // fontSize: null,
        // fontColor: null,
        // width: 100,
        // height: 100,
        // x: 50,
        // y: 80,
        // angle: 30
      },
      formContent: {
        content: FormBGImg,
        fontFamily: "微软雅黑",
        fontSize: 15,
        fontColor: "#fff",
        width: 280,
        height: 392,
        x: 49,
        y: 145,
        angle: 0,
        paddingTop: 60,
        paddingBottom: 0,
        paddingLeft: 11,
        paddingRight: 11,
        lineHeight: 38
      },
      formComponent: {
        id: "",
        label: "",
        type: ""
      },
      componentType: [
        {
          value: "text",
          label: "单行文本"
        },
        {
          value: "password",
          label: "密码框"
        },
        {
          value: "textarea",
          label: "多行文本"
        },
        {
          value: "radio",
          label: "单选框"
        },
        {
          value: "checkbox",
          label: "多选框"
        },
        {
          value: "select",
          label: "下拉框"
        },
        {
          value: "upload",
          label: "图片上传"
        },
        {
          value: "submit",
          label: "提交按钮"
        }
      ],
      componentContent: [],
    };
  },
  components: {
    TextCom,
    TextareaCom,
    PasswordCom
  },
  watch: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleChange() {},
    //设置FormBG背景图片和背景色->单向通信到FormPreview设置背景图片和背景色
    sendFormBG() {
      var msg = JSON.parse(JSON.stringify(this.formBG));
      Bus.$emit("getFormBG", msg);
    },
    //设置FormBG背景图片->单向通信到FormPreview设置背景图片
    setFormBGImg(imgUrl) {
      this.formBG.bgImgUrl = imgUrl;
      this.sendFormBG();
    },
    //设置FormTitle信息
    sendFormTitle() {
      var msg = JSON.parse(JSON.stringify(this.formTitle));
      Bus.$emit("getFormTitle", msg); //触发getFormTitle事件,这个在FormPreview.vue里面
    },
    //设置FormTitleImg
    setFormTitleImg(imgUrl) {
      this.formTitle.content = imgUrl;
      this.sendFormTitle();
    },
    //设置FormDesc信息
    sendFormDesc() {
      var msg = JSON.parse(JSON.stringify(this.formDesc));
      Bus.$emit("getFormDesc", msg); //触发getFormDesc事件,这个在FormPreview.vue里面
    },
    //设置FormTitleImg
    setFormDescImg(imgUrl) {
      this.formDesc.content = imgUrl;
      this.sendFormDesc();
    },
    //设置FormContent信息
    sendFormContent() {
      var msg = JSON.parse(JSON.stringify(this.formContent));
      Bus.$emit("getFormContent", msg); //触发getFormContent事件,这个在FormPreview.vue里面
    },
    //设置FormTitleImg
    setFormContentImg(imgUrl) {
      this.formContent.content = imgUrl;
      this.sendFormContent();
    },
    //添加控件
    addComponent() {
      console.log("添加控件");
      console.log(this.formComponent);
    }
  },
  mounted() {
    this.sendFormBG();
    this.sendFormTitle();
    this.sendFormDesc();
    this.sendFormContent();
    Bus.$on("sendFormTitle", msg => {
      this.formTitle.x = msg.x;
      this.formTitle.y = msg.y;
    });
    Bus.$on("sendFormDesc", msg => {
      this.formDesc.x = msg.x;
      this.formDesc.y = msg.y;
    });
    Bus.$on("sendFormContent", msg => {
      this.formContent.x = msg.x;
      this.formContent.y = msg.y;
    });
  }
};
</script>

