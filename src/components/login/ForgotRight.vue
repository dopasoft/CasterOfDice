<template>
  <div class="login-right-container clearfix">
    <div class="lrc-first-row-3">
      <div class="input-group">
        <input type="email" placeholder="电子邮箱"/>
      </div>
    </div>
    <div class="lrc-row">
      <div class="input-group">
        <button class="lrc-submit">恢复</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginRight',
  data () {
    return {
      posts: []
    }
  },
  methods: {
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

  .lrc-first-row-3 {
    margin-top: 215px;
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