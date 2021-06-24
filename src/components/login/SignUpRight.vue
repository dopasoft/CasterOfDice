<template>
  <div class="login-right-container clearfix">
    <div class="lrc-first-row">
      <div class="lrc-group-inline">
        <input type="text" placeholder="名字" v-model="user.firstName"/>
      </div>
      <div class="lrc-group-inline">
        <input type="text" placeholder="姓" v-model="user.lastName"/>
      </div>
    </div>
    <div class="lrc-row">
      <div class="input-group">
        <input type="email" placeholder="电子邮箱" v-model="user.email"/>
      </div>
    </div>
    <div class="lrc-row">
      <div class="input-group">
        <input type="password" placeholder="密码" v-model="user.password"/>
      </div>
    </div>
    <div class="lrc-row">
      <div class="input-group">
        <button class="lrc-submit" @click="signUp()">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from '@/services/UserService'
export default {
  name: 'SignupRight',
  data () {
    return {
      posts: [],
      user: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signUp () {
      this.user.username = this.user.email
      UserService.signup(this.user)
        .then(res => {
          console.log(res)
        })
        .catch(res => {
          console.log(res.response.data)
        })
    }
  }
}
</script>
<style type="text/css" scoped>
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

  .lrc-first-row {
    margin-top: 100px;
  }

  .lrc-group-inline {
    display: table-cell;
    position: relative;
  }

  .lrc-group-inline input {
    background-color: #2a2a2a;
    border-radius: 3px;
    font-size: 13px;
    padding: 24px 30px;
    border: none;
    box-shadow: none;
    color: #fff;
    width: 190px;
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
</style>