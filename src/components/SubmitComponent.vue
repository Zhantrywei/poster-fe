<template>
  <div class="submitComponent" @dblclick="editComponent(comData.index)">
    <!-- <el-button type="primary" :style="{width: comData.width, height: comData.height}">{{comData.label}}</el-button> -->
    <button class="el-button el-button--primary" :style="{width: comData.width + 'px', height: comData.height + 'px'}">{{comData.label}}</button>
  </div>

</template>
<style>
</style>
<style scoped>
.submitComponent {
  text-align: center;
}
</style>


<script>
import Bus from "../assets/js/bus";
export default {
  name: "submitComponent",
  props: ["comData"],
  data() {
    return {
    };
  },
  methods: {
    editComponent(index) {
      event.preventDefault();
      var index = index - 1;
      console.log("comData.index: ", index);
      Bus.$emit("getIndex", index);
      this.isActive = true;
      var msg = 6;
      Bus.$emit("getActive", msg);
    }
  },
  mounted() {}
};
</script>

