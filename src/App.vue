<template>
  <div id="app">
    
    <router-view></router-view>
    <login-modal></login-modal>
  </div>
</template>

<script>
import LoginModal from '@/components/login/LoginModal'
export default {
  name: 'app',
  components: {
    'loginModal': LoginModal,
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
