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
        <router-link to="/character">
          人物系统
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        战局
      </a-menu-item>
      <a-menu-item :disabled='true' class="title-mune">
        <ul class="nav nav-pills nav-main">
          <li v-if="!user">
            <a href="#" @click="$store.commit('changLogState', 'login')">登录</a>
          </li>
          <li v-if="user" class="dropdown hn-dropdown">
            <a-dropdown>
              <a class="nav-avatar" href="#" role="button" aria-haspopup="true" @click="e => e.preventDefault()">
                <img :src="user.profileImageURL" alt="">
              </a>
              <a-menu slot="overlay">
                <a-menu-item><p class="dis-name">hey, {{user.displayName}}</p></a-menu-item>
                <a-menu-item role="separator" class="divider nb-divider"></a-menu-item>
                <a-menu-item><router-link href="#" to="/personalCenter/recent"> 个人资料</router-link></a-menu-item>
                <a-menu-item><router-link href="#" to="/personalCenter/bill"> 账户明细</router-link></a-menu-item>
                <a-menu-item><router-link href="#" to="/profile"> 账户设置</router-link></a-menu-item>
                <a-menu-item><a href="#" @click="logout()"> 退出</a></a-menu-item>
              </a-menu>
            </a-dropdown>
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
  methods: {
    logout() {
      return this.$store.commit('logout')
    }
  }
}
</script>
<style type="text/css">
  .nav-avatar > img {
    height: 40px;
    border-radius: 20px;
  }

  .title-mune {
    cursor: pointer;
    float: right;
  }
</style>