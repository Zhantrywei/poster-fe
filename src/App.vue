<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,
p,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
form {
    margin: 0;
}

ul,
ol,
input,
fieldset {
    margin: 0;
    padding: 0;
}

nav,
ul,
ol {
    list-style-type: none;
}

img {
    border: 0;
}

option,
em {
    font-style: normal
}

a {
    text-decoration: none;
    color: #c9c9c9;
}

a:hover {
    text-decoration: none;
    /* color: #999; */
}

input,
textarea {
    outline: none;
}

textarea {
    resize: none;
} 

.clearfix {
    zoom: 1
}
.clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both
}
html,body {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  box-sizing: border-box;
  /* background-color: #ccc; */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* background-color: lightsalmon; */
}

</style>
