<template>
  <div class="submitComponent" @dblclick="editComponent(comData.index)">
  </div>

</template>
<style>
</style>
<style scoped>
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

