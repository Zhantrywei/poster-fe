<template>
  <div class="radioComponent" @dblclick="editComponent(comData.index)">
    <!-- <label :for="componentData.id"  v-text="componentData.label" :style="{width: componentData.labelWidth + 'px'}"></label>
    <input type="text" :id="componentData.id" :style="{borderRadius: componentData.borderRadius+'px',width: 'calc( 100% - '+componentData.labelWidth+'px )'}"> -->
    
      <label :for="comData.id"  v-text="comData.label" v-show="comData.label" :style="{width: comData.labelWidth + 'px'}" style="text-align: center"></label>
    <div class="content" v-for="(item,index) in comData.values" :key="index">
      <input :type="comData.type" :name="comData.id" :class="{radioClass: comData.type=='radio', checkboxClass: comData.type=='checkbox', checkClass: comData.value == item.value}" :checked="comData.value == item.value" :value="item.value" :style="{height: comData.inputHeight+'px'}" @click="blurInput">{{item.text}}
    <!-- <textarea :id="comData.id" :model="comData.id" :value="comData.value" :placeholder="comData.placeholder" :style="{borderRadius: comData.borderRadius+'px',width: 'calc( 100% - '+comData.labelWidth+'px )',backgroundColor: comData.backgroundColor,height: comData.inputHeight+'px'}"></textarea> -->
    </div>
  </div>

</template>
<style>
textarea {
  border: 0px;
  padding: 0 6px;
  /* color: white; */
  color: inherit;
}
.radioComponent {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  box-sizing: border-box;
}
.radioComponent .content {
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
.radioClass {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}
.checkboxClass {
}
.checkClass {
  border-color: #409eff;
  background: #409eff;
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
  name: "radioComponent",
  props: ["comData"],
  data() {
    return {
      operationShow: false,
      // componentData: {
      //   type: "text", //password,textarea
      //   label: "姓名",
      //   model: "username",
      //   id: "username",
      //   borderRadius: 4,
      //   labelWidth: 50,
      //   backgroundColor: "#0F5BAA",
      //   inputHeight: 30,
      //   inputType: 'password'
      // },
      isActive: false
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
    blurInput(e) {
      console.log(e);
      if (e.target.type == "radio") {
        var id = e.target.name;
        var value = e.target.value;
        var msg = {
          id: id,
          value: value,
          type: 'radio'
        };
        Bus.$emit("getFormData", JSON.stringify(msg));
      }else if(e.target.type == 'checkbox'){
        var id = e.target.name;
        var checked = e.target.checked;
        var value = e.target.value;
        if(checked){
          //如果为true,即失焦的对象应该加入value中
        }else{
          //如果为false,即失焦的对象应该删除在value中
        }
        var msg = {
          id: id,
          value: value,
          type: 'checkbox',
          checked: checked
        };
        Bus.$emit("getFormData", JSON.stringify(msg));
      }
    }
  },
  mounted() {}
};
</script>

