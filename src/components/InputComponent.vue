<template>
  <div class="inputComponent" id="inputComponent">
    <!-- <label :for="componentData.id"  v-text="componentData.label" :style="{width: componentData.labelWidth + 'px'}"></label>
    <input type="text" :id="componentData.id" :style="{borderRadius: componentData.borderRadius+'px',width: 'calc( 100% - '+componentData.labelWidth+'px )'}"> -->
    <div class="content" @click="operationShow = true">
    <label :for="componentData.id"  v-text="componentData.label" v-show="componentData.label" :style="{width: componentData.labelWidth + 'px'}"></label>
    <input type="text" :id="componentData.id" :style="{borderRadius: componentData.borderRadius+'px',width: 'calc( 100% - '+componentData.labelWidth+'px )',backgroundColor: componentData.backgroundColor,height: componentData.inputHeight+'px'}">
    </div>
    <div class="operation" v-show="operationShow">
      <button class="btnBgColorRed" @click="deleteComponent"><i class="el-icon-delete"></i></button>
      <button class="btnBgColorBlue"  @click="upComponent"><i class="el-icon-arrow-up"></i></button>
      <button class="btnBgColorBlue"  @click="downComponent"><i class="el-icon-arrow-down"></i></button>
    </div>
  </div>

</template>
<style>
input {
  border: 0px;
  padding: 0 6px;
  color: white;
}
.inputComponent {
  position: relative;
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
</style>


<script>
export default {
  name: "inputComponent",
  data() {
    return {
      operationShow: false,
      componentData: {
        type: "text", //password,textarea
        label: "姓名",
        model: "username",
        id: "username",
        borderRadius: 4,
        labelWidth: 50,
        backgroundColor: "#0F5BAA",
        inputHeight: 30
      }
    };
  },
  methods: {
    deleteComponent(e){
      e.preventDefault();
      console.log("deleteComponent")
      this.operationShow = !this.operationShow;
    },
    upComponent(e){
      e.preventDefault();
      console.log("upComponent")
      this.operationShow = !this.operationShow;
    },
    downComponent(e){
      e.preventDefault();
      console.log("downComponent")
      this.operationShow = !this.operationShow;
    }
  },
  mounted() {}
};
</script>

