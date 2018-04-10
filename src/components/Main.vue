<template>
  <div id="main" class="main clearfix">
    <header>
      <h1>后台管理系统</h1>
    </header>
    <nav>
      <router-link :to="{name:'activity'}" tag="li">报名海报设置</router-link>
      <router-link :to="{name:'user'}" tag="li">活动报名详情</router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.main header {
  width: 100%;
  height: 100px;
  background-color: lightblue;
}
.main nav{
  float: left;
  width: 200px;
  height: calc(100% - 100px);
  background-color: lightgreen;
  
}
.main main {
  float: right;
  width: calc(100% - 200px);
  height: calc(100% - 100px);
  background-color: lightcoral;
}
</style>
