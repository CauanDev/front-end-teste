<template>
  <div id="app">  
    <SideBar/>  

    <router-view/> 

    
  </div>
</template>

<script>
import SideBar from './components/SideBar/SideBar.vue';


export default {
  name: 'App',
  components:{
    SideBar
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
body {
  font-family: 'Poppins', sans-serif;
  background-color: rgb(243 244 246);
}
</style>