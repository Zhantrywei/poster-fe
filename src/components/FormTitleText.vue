<template>
  <div class="form-title-text" id="formTitleText">
    <h1 id="formTitle">{{formTitle}}</h1>
    <!-- <hr v-show="formTitle == ''? false:true"> -->
  </div>
</template>
<script>
export default {
  name: 'formTitleText',
  props: ['formTitle','color','fontSize'],
  data(){
    return {
    }
  },
  watch: {
    color(curVal,oldVal){
      console.log("now: ",curVal);
      console.log("old: ",oldVal);
      document.getElementById('formTitle').style.color = curVal;
    },
    fontSize(curVal,oldVal){
      console.log("now: ",curVal);
      console.log("old: ",oldVal);
      var formtitle = document.getElementById('formTitle');
      console.log("fontsize: ",formtitle.style.fontSize)
      formtitle.style.fontSize = curVal+ "px";
      console.log("change fontsize: ",formtitle.style.fontSize)
      
    }
  },
  mounted(){
    // console.log(typeof(this.$props.color))
  },
  updated(){
  }
}
</script>
<style scoped>
.form-title-text {
  overflow: hidden;
}
.form-title-text h1{
  text-align: center;
  line-height: 1.5;
  /* font-size: 30px; */
}
</style>


