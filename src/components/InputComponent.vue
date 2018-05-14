<template>
  <div class="inputComponent" @dblclick="editComponent(comData.index)">
    <!-- <label :for="componentData.id"  v-text="componentData.label" :style="{width: componentData.labelWidth + 'px'}"></label>
    <input type="text" :id="componentData.id" :style="{borderRadius: componentData.borderRadius+'px',width: 'calc( 100% - '+componentData.labelWidth+'px )'}"> -->
    <div class="content">
    <label :for="comData.id"  v-text="comData.label" v-show="comData.label" :style="{width: comData.labelWidth + 'px'}" style="text-align:center"></label>
    <input :type="comData.type" :class="{input: !comData.borderShow}" :id="comData.id" :model="comData.id" :value="comData.value" :placeholder="comData.placeholder" :style="{borderRadius: comData.borderRadius+'px',width: 'calc( 100% - '+comData.labelWidth+'px )',backgroundColor: comData.backgroundColor,height: comData.inputHeight+'px'}" @blur="blurInput">
    </div>
  </div>

</template>
<style>
.input {
  border: 0px;
  padding: 0 6px;
  /* color: white; */
  color: inherit
}
.inputComponent {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  box-sizing: border-box;
}
.inputComponent .content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.btnBgColorRed {
  background-color: #F5888A
}
.btnBgColorBlue {
  background-color: #69B2FD
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
.operation>button{
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
import Bus from '../assets/js/bus'
export default {
  name: "inputComponent",
  props: [
    'comData'
  ],
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
    editComponent(index){
      event.preventDefault();
      var index = index-1;
      console.log("comData.index: ",index);
      Bus.$emit("getIndex", index);
      this.isActive = true;
      var msg = 0;
      Bus.$emit("getActive",msg);
    },
    blurInput(e){
      console.log(e);
      var id = e.target.id;
      var value = e.target.value;
      var msg = {
        id: id,
        value: value,
        type: 'input',
      }
      Bus.$emit("getFormData",JSON.stringify(msg));
    }
  },
  mounted() {}
};
</script>

