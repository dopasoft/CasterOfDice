<template>
	<div class="character-nav">
		<div class="nav-body">
			<div class="left-img"></div>
			<div class="nav-box">
				<div class="nav-outter">
					<span class="coc_nav_img"></span>
					<p>克苏鲁的呼唤</p>
				</div>
				<div class="nav-outter">
					<span>龙与地下城</span>
				</div>
			</div>
			<div class="right-img"></div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'CharacterNav',
  computed: {
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
  .nav-body {
    height: calc(100vh - 133px);
  }

  .nav-box {
  	display: flex;
	  justify-content: center;
  }

  .nav-outter {
  	height: 450px;
  	width: 350px;
  	border-radius: 8px;
  	border: solid 1px #ccc;
  	margin-left: 30px;
  	margin-right: 30px;
  	margin-top: 8 0px;
  	color: rgba(0,0,0,.65);
  }

  .nav-outter p {
  	text-align: center;
  	margin-top: 20px;
  	font-size: 16px;
  }

  .coc_nav_img {
  	display: block;
  	background-image: url('@/assets/img/pic/coc.icon.png');
  	height: 300px;
  	width: 300px;
  	background-size: 300px 300px;
  	background-repeat: no-repeat;
  	margin-top: 50px;
  	margin-left: auto;
  	margin-right: auto;
  }
</style>