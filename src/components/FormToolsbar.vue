<template>
  <div class="toolsbar" id="toolsbar">
    <header>
      <h2>表单设计工具</h2>
    </header>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <!-- 活动基本信息搞定 -->
      <el-collapse-item title="活动基本信息" name="1">
         <el-form :rules="activityRules" ref="activityInfo" :model="activityInfo" label-width="80px">
          <el-form-item label="活动名称" required prop="activityName">
            <el-input v-model="activityInfo.activityName"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" required >
            <el-col :span="11">
              <el-form-item prop="startTime">
              <el-date-picker value-format="yyyy-MM-dd" :editable="false" type="date" placeholder="选择开始日期" v-model="activityInfo.startTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col style="text-align: center" :span="2">-</el-col>
            <el-col :span="11" prop="endTime">
              <el-form-item prop="endTime">
              <el-date-picker value-format="yyyy-MM-dd" :editable="false" type="date" placeholder="选择结束时间" v-model="activityInfo.endTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
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
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1" name="formBGImg">
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
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1" name="formTitleImg">
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
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1" name="formDescImg">
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
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" :limit="1" name="formContentImg">
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
          <!-- <el-form-item label="每行高度">
            <el-input v-model="formContent.lineHeight" style="width: 50%;" type="number" @change="sendFormContent">
                <template slot="append">px</template>
              </el-input>
          </el-form-item> -->
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
      
      
      <div class="componentPre" id="componentPre">
        <!-- 控件显示 -->
        <!-- input单项类型的（text,password） -->
        <div class="inputCom" v-show="inputComShow">
          <el-form ref="form" :model="inputCom" label-width="80px">
            <el-form-item label="序号">
              <span v-text="inputCom.index"></span>
            </el-form-item>
            <el-form-item label="类型">
              <span v-text="inputCom.type"></span>
            </el-form-item>
            <el-form-item label="控件ID">
              <!-- <el-input v-model="inputCom.id" type="text"></el-input> -->
              <span v-text="inputCom.id"></span>
            </el-form-item>
            <el-form-item label="Label">
              <el-input v-model="inputCom.label" type="text"></el-input>
            </el-form-item>
            <el-form-item label="Label宽度">
              <el-input v-model="inputCom.labelWidth" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </el-form-item> 
            <el-form-item label="框高度">
              <el-input v-model="inputCom.inputHeight" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </el-form-item>  
            <el-form-item label="默认值">
              <el-input v-model="inputCom.value" type="text"></el-input>
            </el-form-item>
            <el-form-item label="提示文本">
              <el-input v-model="inputCom.placeholder" type="text"></el-input>
            </el-form-item>
            <el-form-item label="背景颜色">
              <el-color-picker v-model="inputCom.backgroundColor" show-alpha :predefine="predefineColors">
              </el-color-picker>
            </el-form-item>
            <el-form-item label="边框弧度">
              <el-input v-model="inputCom.borderRadius" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </el-form-item>  
            <el-form-item label="显示边框">              
            <el-switch v-model="inputCom.borderShow"></el-switch>
            </el-form-item>   
            <el-form-item>
              <el-button type="success" icon="el-icon-check" circle @click="inputComSubmit(inputCom)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="inputComDelete(inputCom)"></el-button>
              <el-button type="primary" icon="el-icon-arrow-up" circle @click="inputComUp(inputCom)"></el-button>
              <el-button type="primary" icon="el-icon-arrow-down" circle @click="inputComDown(inputCom)"></el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- radio类型 -->
        <div class="radio" v-show="radioShow">
          <el-form ref="form" :model="radioCom" label-width="80px">
            <el-form-item label="序号">
              <span v-text="radioCom.index"></span>
            </el-form-item>
            <el-form-item label="类型">
              <span v-text="radioCom.type"></span>
            </el-form-item>
            <el-form-item label="控件ID">
              <!-- <el-input v-model="radioCom.id" type="text"></el-input> -->
              <span v-text="radioCom.id"></span>
            </el-form-item>
            <el-form-item label="Label">
              <el-input v-model="radioCom.label" type="text"></el-input>
            </el-form-item>
            <el-form-item label="Label宽度">
              <el-input v-model="radioCom.labelWidth" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </el-form-item> 
            <!-- <el-form-item label="背景颜色">
              <el-color-picker v-model="radioCom.backgroundColor" show-alpha :predefine="predefineColors">
              </el-color-picker>
            </el-form-item> -->
            <!-- <el-form-item label="边框弧度">
              <el-input v-model="radioCom.borderRadius" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </el-form-item>  -->
            <el-form-item label="name">
              <!-- <el-input v-model="radioCom.id" type="text"></el-input> -->
              <span v-text="radioCom.id"></span>
            </el-form-item> 
            <el-form-item label="默认值">
              <el-input v-model="radioCom.value" type="text"></el-input>
            </el-form-item>
            <el-form-item label="value">
              <el-input type="text" v-model="radioItem.value"></el-input>
            </el-form-item>
            <el-form-item label="text">
              <el-input type="text" v-model="radioItem.text"></el-input>
            </el-form-item>
            <el-form-item label="已有项">
              <div v-for="(item,index) in radioCom.values" :key="index" >
              <input :type="formComponent.type" :name="radioCom.id" :value="item.value">{{item.text}}

              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="success" icon="el-icon-check" circle @click="radioComSubmit(radioCom)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="radioComDelete(radioCom)"></el-button>
              <el-button type="primary" icon="el-icon-arrow-up" circle @click="radioComUp(radioCom)"></el-button>
              <el-button type="primary" icon="el-icon-arrow-down" circle @click="radioComDown(radioCom)"></el-button>
              <el-button type="primary" icon="el-icon-plus" circle @click="radioComAdd(radioCom,radioItem)"></el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- checkbox类型 -->
        <!-- <div class="checkbox" v-show="checkboxShow">
          <el-form ref="form" :model="checkboxoCom" label-width="80px">
            <el-form-item label="序号">
              <span v-text="checkboxCom.index"></span>
            </el-form-item>
            <el-form-item label="类型">
              <span v-text="checkboxCom.type"></span>
            </el-form-item>
            <el-form-item label="控件ID">
              <span v-text="checkboxCom.id"></span>
            </el-form-item>
            <el-form-item label="Label">
              <el-input v-model="checkboxCom.label" type="text"></el-input>
            </el-form-item>
            <el-form-item label="Label宽度">
              <el-input v-model="checkboxCom.labelWidth" style="width: 50%;" type="number">
                <template slot="append">px</template>
              </el-input>
            </el-form-item>
            <el-form-item label="name">
              <span v-text="checkboxCom.id"></span>
            </el-form-item> 
            <el-form-item label="默认值">
              <el-input v-model="checkboxCom.value" type="text"></el-input>
            </el-form-item>
            <el-form-item label="value">
              <el-input type="text" v-model="checkboxItem.value"></el-input>
            </el-form-item>
            <el-form-item label="text">
              <el-input type="text" v-model="checkboxItem.text"></el-input>
            </el-form-item>
            <el-form-item label="已有项">
              <div v-for="(item,index) in checkboxCom.values" :key="index">
              <input type="radio" :name="checkboxCom.id" :value="item.value">{{item.text}}

              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="success" icon="el-icon-check" circle @click="checkboxComSubmit(checkboxCom)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="checkboxComDelete(checkboxCom)"></el-button>
              <el-button type="primary" icon="el-icon-arrow-up" circle @click="checkboxComUp(checkboxCom)"></el-button>
              <el-button type="primary" icon="el-icon-arrow-down" circle @click="checkboxComDown(checkboxCom)"></el-button>
              <el-button type="primary" icon="el-icon-plus" circle @click="checkboxComAdd(checkboxCom,checkboxItem)"></el-button>
            </el-form-item>
          </el-form>
        </div> -->
      </div>

      <div class="btn">
        <button class="savebtn" @click.self="addActivity">保存</button>
        <button class="resetbtn" @click.self="resetActivity">清空</button>
      </div>
      <div class="qrcode" v-show="qrcodeShow">
        <!-- <qrcode class="qrcodeDemo"></qrcode> -->
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.qrcodeDemo {
  width: 20%;
  height: 20%;
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
      activeNames: ["0"],
      //活动基本信息, 不用与预览组件实现数据双向通信
      activityInfo: {
        activityName: "",
        startTime: "",
        endTime: "",
        posterDesignStatus: false
      },
      //活动提交校验
      activityRules: {
        activityName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ]
      },
      //表单背景设计, 需要和FormPreview通信,单项通信FormToolsbar -> FormPreview
      formBG: {
        // bgImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525245573&di=833509e0e4fc2558f6771579c24071b7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.lenovomm.com%2Fs3%2Fimg%2Fapp%2Fapp-img-lestore%2F1127-2016-07-01012755-1467350875451.jpg%3FisCompress%3Dtrue%26amp%3Bwidth%3D320%26amp%3Bheight%3D480%26amp%3Bquantity%3D1%26amp%3Brotate%3Dtrue',
        bgImgUrl: "",
        bgColor: "#fff"
      },
      formTitle: {
        //文本标题
        type: "text",
        content: "",
        fontFamily: "黑体",
        fontSize: 32,
        fontColor: "#C71585",
        width: null,
        height: null,
        x: 0,
        y: 0,
        angle: 0
        // //图片标题
        // type: "img",
        // content: ActivityTitle,
        // fontFamily: null,
        // fontSize: null,
        // fontColor: null,
        // width: 245,
        // height: 145,
        // x: 65,
        // y: 4,
        // angle: 0
      },
      formDesc: {
        //文本描述
        type: "text",
        content: "",
        fontFamily: "黑体",
        fontSize: 18,
        fontColor: "#C71585",
        width: null,
        height: null,
        x: 0,
        y: 0,
        angle: 0
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
        content: "",
        fontFamily: "微软雅黑",
        fontSize: 15,
        fontColor: "#000",
        width: 280,
        height: 392,
        x: 49,
        y: 145,
        angle: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 11,
        paddingRight: 11,
        lineHeight: ""
      },
      formComponent: {
        id: "",
        label: "",
        type: ""
      },
      //下拉选择控件
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
      //表单控件列表项
      componentContent: [],
      inputComShow: false,
      inputCom: {
        index: "",
        type: "text", //password,text
        label: "姓名",
        model: "username",
        id: "username",
        value: "",
        placeholder: "请输入内容",
        borderRadius: 4,
        labelWidth: 50,
        backgroundColor: "",
        inputHeight: 30,
        borderShow: true
      },
      radioShow: false,
      radioCom: {
        id: "sex",
        model: "sex",
        index: "",
        label: "",
        value: "boy",
        type: "radio",
        // values: [{ value: "boy", text: "男" }, { value: "girl", text: "女" }],
        values: [],
        labelWidth: 50,
        // backgroundColor: "#0F5BAA",
        inputHeight: 30
      },
      radioItem: {
        value: "",
        text: ""
      },
      checkboxShow: false,
      checkboxCom: {
        id: "",
        model: "",
        index: "",
        label: "",
        value: "boy",
        type: "radio",
        values: [{ value: "boy", text: "男" }, { value: "girl", text: "女" }],
        labelWidth: 50,
        inputHeight: 30
      },
      checkboxItem: {
        value: "",
        text: ""
      },
      qrcodeShow: false
    };
  },
  components: {
    TextCom,
    TextareaCom,
    PasswordCom
  },
  watch: {
    "inputCom.index": {
      handler: (val, oldVal) => {
        console.log("indexVal: ", val);
        console.log("indexOldVal: ", oldVal);
        Bus.$emit("getBorderIndex", val);
      },
      // 深度观察
      deep: true
    },
    "radio.index": {
      handler: (val, oldVal) => {
        console.log("indexVal: ", val);
        console.log("indexOldVal: ", oldVal);
        Bus.$emit("getBorderIndex", val);
      },
      // 深度观察
      deep: true
    },
    "componentContent.length": {
      handler: (val, oldVal) => {
        console.log("indexVal: ", val);
        console.log("indexOldVal: ", oldVal);
        Bus.$emit("getBorderIndex", val);
      },
      deep: true
    }
  },
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
      if (
        this.formComponent.id == null ||
        this.formComponent.label == null ||
        this.formComponent.type == null
      ) {
        return false;
      }
      //先定义不同组件需要的字段
      //单行文本、密码
      // var inputCom = {
      //     index: this.componentContent.length+1,
      //     id: this.formComponent.id,
      //     model: this.formComponent.id,
      //     type: this.formComponent.type,
      //     label: this.formComponent.label,
      //     value: '', //默认值
      //     placeholder: this.formComponent.type=='password'?'请输入密码':'请输入内容'
      // },
      //多行文本
      /* var textareaCom = {
             index: this.componentContent.length+1,
             id: this.formComponent.id,
             model: this.formComponent.id,
             type: this.formComponent.type,
             label: this.formComponent.label,
             value: '', //默认值
             placeholder: '请输入内容'
      }
      */
      if (
        this.formComponent.type == "text" ||
        this.formComponent.type == "password" ||
        this.formComponent.type == "textarea"
      ) {
        var inputCom = {
          index: this.componentContent.length + 1,
          id: this.formComponent.id,
          model: this.formComponent.id,
          type: this.formComponent.type,
          label: this.formComponent.label,
          value: "", //默认值
          placeholder:
            this.formComponent.type == "password" ? "请输入密码" : "请输入内容",
          borderRadius: this.inputCom.borderRadius,
          labelWidth: this.inputCom.labelWidth,
          backgroundColor: this.inputCom.backgroundColor,
          inputHeight: this.inputCom.inputHeight
        };
        this.inputCom = inputCom;
        this.inputComShow = true;
        this.radioShow = false;
        // this.checkboxShow = false;
        this.componentContent.push(inputCom);
        this.sendComponentContent();
      } else if (
        this.formComponent.type == "radio" ||
        this.formComponent.type == "checkbox" ||
        this.formComponent.type == "select"
      ) {
        var radioCom = {
          index: this.componentContent.length + 1,
          id: this.formComponent.id,
          model: this.formComponent.id,
          type: this.formComponent.type,
          label: this.formComponent.label,
          value: this.radioCom.value,
          labelWidth: this.radioCom.labelWidth,
          backgroundColor: this.radioCom.backgroundColor,
          inputHeight: this.radioCom.inputHeight,
          values: this.radioCom.values
        };
        this.radioCom = radioCom;
        this.radioShow = true;
        this.inputComShow = false;
        // this.checkboxShow = false;
        this.componentContent.push(radioCom);
        this.sendComponentContent();
      }
      // else if(this.formComponent.type == "checkbox"){
      //   var checkboxCom = {
      //     index: this.componentContent.length + 1,
      //     id: this.formComponent.id,
      //     model: this.formComponent.id,
      //     type: this.formComponent.type,
      //     label: this.formComponent.label,
      //     value: this.checkboxCom.value,
      //     labelWidth: this.checkboxCom.labelWidth,
      //     inputHeight: this.checkboxCom.inputHeight,
      //     values: this.checkboxCom.values
      //   };
      //   this.checkboxCom = checkboxCom;
      //   this.checkboxShow = true;
      //   this.radioShow = false;
      //   this.inputComShow = false;
      //   this.componentContent.push(checkboxCom);
      //   this.sendComponentContent()
      // }
    },
    //inputCom按钮
    inputComSubmit(inputCom) {
      var index = inputCom.index - 1;
      console.log("inputCom: ", inputCom);
      this.componentContent[index] = JSON.parse(JSON.stringify(inputCom));
      console.log("submit component: ", this.componentContent);
      this.sendComponentContent();
    },
    inputComDelete(inputCom) {
      console.log("inputCom: ", inputCom);
      var index = inputCom.index - 1;
      // this.componentContent.splice(index, 1);
      // 数组截取，拿index前面的数组不变
      if (index != 0) {
        var beforeArray = this.componentContent.slice(0, index);
      } else {
        var beforeArray = [];
      }
      var afterArray = this.componentContent.slice(index + 1);
      afterArray.forEach(function(item) {
        item.index--;
      });
      this.componentContent = beforeArray.concat(afterArray);
      console.log("delete: ", this.componentContent);
      this.sendComponentContent();
      if (this.componentContent.length == 0) {
        this.inputComShow = false;
        this.inputCom = {
          id: "",
          label: "",
          index: "",
          type: "",
          value: "",
          placeholder: "请输入内容",
          borderRadius: 4,
          labelWidth: 50,
          backgroundColor: "#0F5BAA",
          inputHeight: 30
        };
        alert("表单已空");
      } else {
        this.inputCom = JSON.parse(
          JSON.stringify(
            this.componentContent[this.componentContent.length - 1]
          )
        );
      }
    },
    inputComUp(inputCom) {
      console.log("inputCom: ", inputCom.index);
      var index = inputCom.index - 1;
      if (index <= 0) {
        alert("不能再向上移动了");
        return false;
      } else {
        var beforeIndex = index - 1;
        var temp = JSON.parse(
          JSON.stringify(this.componentContent[beforeIndex])
        );
        this.componentContent[beforeIndex] = JSON.parse(
          JSON.stringify(this.componentContent[index])
        );
        this.componentContent[index] = temp;
        console.log("up component: ", this.componentContent);
        this.inputCom.index -= 1;
        this.sendComponentContent();
      }
    },
    inputComDown(inputCom) {
      console.log("inputCom: ", inputCom.index);
      var index = inputCom.index - 1;
      if (index + 1 < this.componentContent.length) {
        var afterIndex = index + 1;
        var temp = JSON.parse(
          JSON.stringify(this.componentContent[afterIndex])
        );
        this.componentContent[afterIndex] = JSON.parse(
          JSON.stringify(this.componentContent[index])
        );
        this.componentContent[index] = temp;
        console.log("down component: ", this.componentContent);
        this.inputCom.index += 1;
        this.sendComponentContent();
      } else {
        alert("不能再向下移动了");
        return false;
      }
    },

    //inputCom按钮
    radioComSubmit(radioCom) {
      var index = radioCom.index - 1;
      this.componentContent[index] = JSON.parse(JSON.stringify(radioCom));
      console.log("submit component: ", this.componentContent);
      this.sendComponentContent();
    },
    //添加radioCom.values
    radioComAdd(radioCom, item) {
      if (item.value == "" || item.text == "") {
        return false;
      } else {
        radioCom.values.push(item);
        this.radioItem = {
          value: "",
          text: ""
        };
        console.log("radioCom: ", radioCom);
        console.log("add component: ", this.componentContent);
        this.sendComponentContent();
      }
    },
    //删除radioCom
    radioComDelete(radioCom) {
      console.log("radioCom: ", radioCom);
      var index = radioCom.index - 1;
      // this.componentContent.splice(index, 1);
      // 数组截取，拿index前面的数组不变
      if (index != 0) {
        var beforeArray = this.componentContent.slice(0, index);
      } else {
        var beforeArray = [];
      }
      var afterArray = this.componentContent.slice(index + 1);
      afterArray.forEach(function(item) {
        item.index--;
      });
      this.componentContent = beforeArray.concat(afterArray);
      console.log("delete: ", this.componentContent);
      this.sendComponentContent();
      if (this.componentContent.length == 0) {
        this.radioShow = false;
        this.radioCom = {
          id: "",
          model: "",
          index: "",
          label: "",
          value: "",
          type: "radio",
          values: [],
          labelWidth: 50,
          backgroundColor: "#0F5BAA",
          inputHeight: 30
        };
        alert("表单已空");
      } else {
        if (
          this.componentContent[this.componentContent.length - 1].type ==
          "radio"
        ) {
          this.radioShow = true;
          this.inputComShow = false;
          this.radioCom = JSON.parse(
            JSON.stringify(
              this.componentContent[this.componentContent.length - 1]
            )
          );
        } else {
          this.radioShow = false;
          this.inputComShow = true;
          this.inputCom = JSON.parse(
            JSON.stringify(
              this.componentContent[this.componentContent.length - 1]
            )
          );
        }
      }
    },
    //上移radioCom
    radioComUp(radioCom) {
      console.log("radioCom: ", radioCom.index);
      var index = radioCom.index - 1;
      if (index <= 0) {
        alert("不能再向上移动了");
        return false;
      } else {
        var beforeIndex = index - 1;
        var temp = JSON.parse(
          JSON.stringify(this.componentContent[beforeIndex])
        );
        this.componentContent[beforeIndex] = JSON.parse(
          JSON.stringify(this.componentContent[index])
        );
        this.componentContent[index] = temp;
        console.log("up component: ", this.componentContent);
        this.radioCom.index -= 1;
        this.sendComponentContent();
      }
    },
    //下移radioCom
    radioComDown(radioCom) {
      console.log("radioCom: ", radioCom.index);
      var index = radioCom.index - 1;
      if (index + 1 < this.componentContent.length) {
        var afterIndex = index + 1;
        var temp = JSON.parse(
          JSON.stringify(this.componentContent[afterIndex])
        );
        this.componentContent[afterIndex] = JSON.parse(
          JSON.stringify(this.componentContent[index])
        );
        this.componentContent[index] = temp;
        console.log("down component: ", this.componentContent);
        this.radioCom.index += 1;
        this.sendComponentContent();
      } else {
        alert("不能再向下移动了");
        return false;
      }
    },

    //设置FormContent信息
    sendComponentContent() {
      console.log("component: ", this.componentContent);
      var msg = JSON.parse(JSON.stringify(this.componentContent));
      Bus.$emit("getComponentContent", msg); //触发getComponentContent事件,这个在FormPreview.vue里面
    },

    //新增活动
    addActivity() {
      var that = this;
      if (this.activityInfo.startTime > this.activityInfo.endTime) {
        console.log("开始时间: ", this.activityInfo.startTime);
        console.log("结束时间: ", this.activityInfo.endTime);
        that.$alert("活动时间错误", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.activeNames = ["1"];
          }
        });
        return false;
      }
      this.$refs["activityInfo"].validate(valid => {
        if (valid) {
          var Fname = this.activityInfo.activityName + "表单";
          var Fstatus = 1;
          var formStyle = {
            //表单背景
            formBG: this.formBG,
            formTitle: this.formTitle,
            formDesc: this.formDesc,
            formContent: this.formContent,
            componentContent: this.componentContent
          };
          console.log("fname: ", Fname);
          console.log("Fstatus: ", Fstatus);
          console.log("formStyle: ", JSON.stringify(formStyle));
          // var that = this;
          // debugger;
          let formData = new FormData();
          formData.append("name", Fname);
          formData.append("status", Fstatus);
          formData.append("form_style", JSON.stringify(formStyle));

          this.$http
            .post("/apis/form/insert.json", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(function(res) {
              if (res.data.data.status == 100) {
                console.log("新增表单返回的表单id: ", res.data.data.result);
                var formId = res.data.data.result;
                var activityData = new FormData();
                activityData.append("name", that.activityInfo.activityName);
                activityData.append("start_time", that.activityInfo.startTime);
                activityData.append("end_time", that.activityInfo.endTime);
                activityData.append("summary", "");
                activityData.append("form_id", formId);
                if (that.activityInfo.posterDesignStatus) {
                  activityData.append("poster_sts", 0);
                  activityData.append("assist_sts", 1);
                } else {
                  activityData.append("poster_sts", -1);
                  activityData.append("assist_sts", -1);
                }
                activityData.append("status", 0);
                console.log("activityData: ", activityData);
                that.$http
                  .post("/apis/activity/insert.json", activityData, {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                  })
                  .then(function(res) {
                    console.log("新增活动返回的数据: ", res);
                    console.log("formId: ", formId);
                    var activityId = res.data.data.result;
                    console.log("activityId: ", activityId);
                  })
                  .catch(function(err) {
                    console.log("新增活动返回的错误: ", err);
                    that.$alert(err, "提示", {
                      confirmButtonText: "确定"
                    });
                  });
              } else {
                that.$alert(res.data.data.msg, "提示", {
                  confirmButtonText: "确定"
                  // callback: action => {
                  //   this.$message({
                  //     type: "info",
                  //     message: `action: ${action}`
                  //   });
                  // }
                });
              }
            })
            .catch(function(err) {
              console.log("fname: ", Fname);
              console.log("新增表单返回的错误: ", err);
            });
        } else {
          console.log("error submit!!");
          that.activeNames = ["1"];
          return false;
        }
      });
    },
    //清空表单设计
    resetActivity() {}
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
    this.sendComponentContent();
    Bus.$on("getIndex", msg => {
      console.log("msg: ", msg);
      if (
        this.componentContent[msg].type == "text" ||
        this.componentContent[msg].type == "password" ||
        this.componentContent[msg].type == "textarea"
      ) {
        this.inputCom = this.componentContent[msg];
        this.inputComShow = true;
        this.radioShow = false;
      } else if (this.componentContent[msg].type == "radio") {
        this.radioCom = this.componentContent[msg];
        this.inputComShow = false;
        this.radioShow = true;
        Bus.$emit("getBorderIndex", msg + 1);
      }
      // else{
      //   console.log("abd: ",this.componentContent[msg].type)
      // }
    });
    Bus.$on("getActive", msg => (this.activeNames = "" + msg));
  }
};
</script>

