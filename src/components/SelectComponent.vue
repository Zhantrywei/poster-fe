<template>
  <div class="radioComponent" @dblclick="editComponent(comData.index)">
    
      <label :for="comData.id"  v-text="comData.label" v-show="comData.label" :style="{width: comData.labelWidth + 'px'}" style="text-align: center"></label>
    <select :name="comData.id" :id="comData.id" @change="changeSelect">
      <option v-for="(item,index) in comData.values" :key="index" :value="item.value" >{{item.text}}</option>
    </select>
  </div>

</template>
<style>
textarea {
  border: 0px;
  padding: 0 6px;
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
    changeSelect(e) {
      console.log(e);
      var id = e.target.name;
      var value = e.target.value;
      var msg = {
        id: id,
        value: value,
        type: 'select'
      };
      Bus.$emit("getFormData", JSON.stringify(msg));
    }
  },
  mounted() {}
};
</script>

