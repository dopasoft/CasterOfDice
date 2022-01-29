<template>
  <div class="login-right-container clearfix">
    <div class="lrc-first-row-2">
      <div class="input-group">
        <input type="email" placeholder="电子邮箱" v-model="user.username"/>
      </div>
    </div>
    <div class="lrc-row">
      <div class="input-group">
        <input type="password" placeholder="密码" v-model="user.password"/>
      </div>
    </div>
    <div class="lrc-row">
      <div class="input-group">
        <button class="lrc-submit" @click="login()">登录</button>
      </div>
    </div>
    <div class="lrc-row">
      <div class="input-group">
        <a href="#" class="lrc-forgot" @click="$store.commit('changLogState', 'forgot')">忘记密码？</a>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from '@/services/UserService'
import { DicEnum } from '@/assets/lib/DicMap'
export default {
  name: 'LoginRight',
  data () {
    return {
      posts: [],
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      UserService.signin(this.user)
        .then(res => {
          this.$store.commit('setUser', res.data)
          this.$store.commit('changLogState', DicEnum.loginMode.CLOSE)
          this.$swal.fire("欢迎回来，" + res.data.displayName + "。")
        })
        .catch(res => {
          console.log(res)
        })
    }
  }
}
</script>
<style type="text/css">
  .login-right-container {
    padding-left: 60px;
    padding-right: 60px;
    height: 615px;
    position: relative;
    z-index: 1;
  }

  .input-group input {
    background-color: #2a2a2a;
    border-radius: 3px;
    font-size: 13px;
    padding: 24px 30px;
    border: none;
    box-shadow: none;
    width: 424px;
    color: #fff;
  }

  .input-group input:focus,
  .input-group input:hover {
    outline: none;
  }

  .lrc-row {
    margin-top: 55px;
  }

  .lrc-first-row-2 {
    margin-top: 130px;
  }

  .lrc-group-inline:last-child input {
    margin-left: 45px;
  }

  .lrc-submit {
    padding: 16px 198px;
    background-image: linear-gradient(180deg, 
    #3db86d 0%, 
    #198f4e 100%);
    border-radius: 7px;
    font-size: 13px;
    color: #ffffff;
    border: none;
    margin-top: 5px;
  }

  .lrc-forgot {
    font-size: 13px;
    color: #a9a9a9;
    display: block;
    margin-left: 180px;
  }

  .lrc-forgot:hover,
  .lrc-forgot:focus {
    color: #fff;
  }
</style>