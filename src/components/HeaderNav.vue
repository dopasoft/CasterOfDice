<template>
  <a-layout-header>
    <div class="logo" />
    <a-menu
      theme="dark"
      mode="horizontal"
      :default-selected-keys="['1']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">
        <router-link to="/">
          主页
        </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        人物系统
      </a-menu-item>
      <a-menu-item key="3">
        战局
      </a-menu-item>
      <a-menu-item :disabled='true'>
        <ul class="nav nav-pills nav-main">
          <li v-if="!user">
            <a href="#" @click="$store.commit('changLogState', 'login')">登录</a>
          </li>
          <li v-if="user" class="dropdown nb-dropdown">
            <a class="dropdown-toggle nav-avatar" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" id="dropdownMenu2">
              <img :src="user.profileImageURL" alt="">
            </a>
            <ul class="dropdown-menu nb-dropdown-menu-one" aria-labelledby="dropdownMenu2">
              <li><p class="dis-name">hey, {{user.displayName}}</p></li>
              <li role="separator" class="divider nb-divider"></li>
              <li><router-link href="#" to="/personalCenter/recent"> 个人资料</router-link></li>
              <li><router-link href="#" to="/personalCenter/bill"> 账户明细</router-link></li>
              <li><router-link href="#" to="/profile"> 账户设置</router-link></li>
              <li><a href="#" @click="logout()"> 退出</a></li>
            </ul>
          </li>
        </ul>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
export default {
  name: 'HeaderNav',
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  components: {
    
  },
  data () {
    return {
      
    }
  },
  mounted () {
    console.log(this.user)
  },
  methods: {}
}
</script>
<style type="text/css">

</style>