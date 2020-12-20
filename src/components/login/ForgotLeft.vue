<template>
  <div class="login-left-container clearfix">
    <p class="login-title">忘记密码了吗？没问题～</p>
    <div class="llc-main-span">
      <span class="forgot"></span>
    </div>
    <a class="login-left-link" href="#" @click="$store.commit('changLogState', 'login')">密码想起来了>></a>
  </div>
</template>
<script>
export default {
  name: 'login-left'
}
</script>
<style type="text/css">
  .login-title {
    font-size: 20px;
    color: #000000;
    text-align: left;
    margin-top: 50px;
    margin-left: 70px;
    padding-bottom: 25px;
  }

  .llc-main-span {
    margin-top: 120px;
    width: 200px;
    height: 231px;
    padding-bottom: 31px;
    margin-left: auto;
    margin-right: auto;
  }

  .llc-main-span .forgot {
    width: 200px;
    height: 200px;
    display: block;
    background-image: url('../../assets/img/icon/icon_forgot.png');
  }

  .login-left-link {
    margin-top: 98px;
    text-align: left;
    margin-left: 70px;
    color: #5da9ed;
    font-size: 13px;
    display: block;
  }
</style>