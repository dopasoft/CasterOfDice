<template>
  <div class="login-left-container clearfix">
    <p class="login-title">欢迎加入我们～！与全球玩家汇聚一堂</p>
    <div class="llc-media-box">
      <span class="chat"></span>
      <p>关注并与全球的内容创作者建立联系</p>
    </div>
    <div class="llc-media-box">
      <span class="diamond"></span>
      <p>每周都可免费获得一款精品产品</p>
    </div>
    <div class="llc-media-box">
      <span class="tag"></span>
      <p>轻松管理购买，下载和喜爱的产品</p>
    </div>
    <a class="login-left-link" href="#" @click="$store.commit('changLogState', 'login')">已经有账号？>></a>
  </div>
</template>
<script>
export default {
  name: 'signup-left'
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

  .llc-media-box{
    margin-left: 70px;
    text-align: left;
    vertical-align: top;
    margin-top: 60px;
  }

  .llc-media-box span {
    height: 52px;
    width: 52px;
    display: inline-block;
  }

  .llc-media-box .chat {
    background-image: url('../../assets/img/icon/icon_login_wechat.png');
  }

  .llc-media-box .diamond {
    background-image: url('../../assets/img/icon/icon_login_diamond.png');
  }

  .llc-media-box .tag {
    background-image: url('../../assets/img/icon/icon_login_tag.png');
  }

  .llc-media-box p {
    font-size: 15px;
    color: #9b9b9b;
    display: inline-block;
    vertical-align: top;
    margin-top: 17px;
    margin-left: 30px;
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