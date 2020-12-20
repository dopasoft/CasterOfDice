<template>
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close modal-login-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
        <div class="modal-login clearfix">
          <div class="modal-login-left">
            <transition name="fade">
              <sign-up-left v-if="isSignup"></sign-up-left>
              <login-left v-if="isLogin"></login-left>
              <forgot-left v-if="isForgot"></forgot-left>
            </transition>
          </div>
          <div class="modal-login-right">
            <transition name="swipe">
              <sign-up-right v-if="isSignup"></sign-up-right>
              <login-right v-if="isLogin"></login-right>
              <forgot-right v-if="isForgot"></forgot-right>
            </transition>
            <canvas height="615" width="545" class="modal-login-back" ref="modal_login_back"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpLeft from '@/components/login/SignUpLeft'
import SignUpRight from '@/components/login/SignUpRight'
import LoginLeft from '@/components/login/LoginLeft'
import LoginRight from '@/components/login/LoginRight'
import ForgotLeft from '@/components/login/ForgotLeft'
import ForgotRight from '@/components/login/ForgotRight'
export default {
  name: 'login-modal',
  components: {
    'signUpLeft': SignUpLeft,
    'signUpRight': SignUpRight,
    'loginLeft': LoginLeft,
    'loginRight': LoginRight,
    'forgotLeft': ForgotLeft,
    'forgotRight': ForgotRight
  },
  computed: {},
  data () {
    return {
      isSignup: false,
      isLogin: false,
      isForgot: false
    }
  },
  watch: {
    '$store.state.loginMode': {
      handler: function (to, from) {
        if (to === 'signup') {
          this.isSignup = true
          this.isLogin = false
          this.isForgot = false
        } else if (to === 'login') {
          this.isSignup = false
          this.isLogin = true
          this.isForgot = false
        } else if (to === 'forgot') {
          this.isSignup = false
          this.isLogin = false
          this.isForgot = true
        }
        //('#loginModal').modal()
        this.$store.commit('changLogState', 'none')
      },
      immediate: true
    }
  },
  mounted () {
    var canvas = this.$refs.modal_login_back
    var context = canvas.getContext('2d')

    var canvasWidth = 545
    var canvasHeight = 615

    var playAnimation = true

    context.globalAlpha = 0.2

    // 为每个图形创建对象
    var Asteroid = function (x, y, radius, mass, vX, vY, aX, aY, img) {
      this.x = x
      this.y = y
      this.radius = radius// 半径
      this.mass = mass// 质量

      this.vX = vX// 速度（速率和方向）
      this.vY = vY
      this.aX = aX// 加速度
      this.aY = aY
      this.img = new Image()
      this.img.src = img
    }

    // 创建数组存储所有图形的状态
    var asteroids = []

    // 生成随机形状
    for (var i = 0; i < 14; i++) {
      var x = 20 + (Math.random() * (canvasWidth - 40))
      var y = 20 + (Math.random() * (canvasHeight - 40))
      var radius = 15 + Math.random() * 20// 半径

      var mass = radius / 2

      var vX = Math.random() * 1 - 0.5// 介于-2到2之间的位移
      var vY = Math.random() * 1 - 0.5
      var aX = Math.random() * 0.1 - 0.5// 介于-0.1到0.1之间的加速度
      var aY = Math.random() * 0.1 - 0.5
      var img = 'img/pic/game_' + (Math.ceil(Math.random() * 8) + 1) + '.png'

      asteroids.push(new Asteroid(x, y, radius, mass, vX, vY, aX, aY, img))
    }

    // 循环执行更新，清除，绘制
    function animate () {
      context.clearRect(0, 0, canvasWidth, canvasHeight)// 清除
      context.fillStyle = 'rgb(255,255,255)'

      var asteroidsLength = asteroids.length
      for (var i = 0; i < asteroidsLength; i++) { // 绘制
        var tmpAsteroid = asteroids[i]

        // 所有小行星圆心之间的距离做比较
        for (var j = i + 1; j < asteroidsLength; j++) {
          var tmpAsteroidB = asteroids[j]

          var dX = tmpAsteroidB.x - tmpAsteroid.x
          var dY = tmpAsteroidB.y - tmpAsteroid.y
          var distance = Math.sqrt((dX * dX) + (dY * dY))

          // 判断圆心间距离和半径间的大小
          if (distance < tmpAsteroid.radius + tmpAsteroidB.radius) {
            // 重叠了
            var angle = Math.atan2(dY, dX)// 反正切 两个圆之间的角度
            var sine = Math.sin(angle)// dX与斜边的比值
            var cosine = Math.cos(angle)// dY与斜边的比值

            // 把每个圆的位置和速度进行旋转(待研究)
            var x = 0
            var y = 0

            var xB = dX * cosine + dY * sine
            var yB = dY * cosine - dX * sine

            var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine
            var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine

            var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine
            var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine

            // 根据动能改变速度
            var vTotal = vX - vXb
            vX = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vX + 2 * tmpAsteroidB.mass * vXb) / (tmpAsteroid.mass + tmpAsteroidB.mass)
            vXb = vTotal + vX

            // 相互分离
            xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius)

            // 旋转到原来位置，使用新的速度
            tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine)
            tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine)

            tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB * sine)
            tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine + xB * sine)

            tmpAsteroid.vX = vX * cosine - vY * sine
            tmpAsteroid.vY = vY * cosine - vX * sine

            tmpAsteroidB.vX = vXb * cosine - vYb * sine
            tmpAsteroidB.vY = vYb * cosine - vXb * sine
          }
        }

        tmpAsteroid.x += tmpAsteroid.vX
        tmpAsteroid.y += tmpAsteroid.vY

        // 赋予加速度 且防止速度无限大
        if (Math.abs(tmpAsteroid.vX) < 2) {
          tmpAsteroid.vX += tmpAsteroid.aX
        }

        if (Math.abs(tmpAsteroid.vX) > 6) {
          tmpAsteroid.vX /= 3
        }

        if (Math.abs(tmpAsteroid.vY) < 2) {
          tmpAsteroid.vY += tmpAsteroid.aY
        }

        if (Math.abs(tmpAsteroid.vY) > 6) {
          tmpAsteroid.vX /= 3
        }

        context.beginPath()
        context.drawImage(tmpAsteroid.img, tmpAsteroid.x - tmpAsteroid.radius, tmpAsteroid.y - tmpAsteroid.radius, tmpAsteroid.radius * 2, tmpAsteroid.radius * 2)

        context.closePath()
        context.fill()

        // 边界检查 防止飞出边界 改变 速度 加速度
        if (tmpAsteroid.x - tmpAsteroid.radius < 0) {
          tmpAsteroid.x = tmpAsteroid.radius
          tmpAsteroid.vX *= -1
          tmpAsteroid.aX *= -1
        } else if (tmpAsteroid.x + tmpAsteroid.radius > canvasWidth) {
          tmpAsteroid.x = canvasWidth - tmpAsteroid.radius
          tmpAsteroid.vX *= -1
          tmpAsteroid.aX *= -1
        }

        if (tmpAsteroid.y - tmpAsteroid.radius < 0) {
          tmpAsteroid.y = tmpAsteroid.radius
          tmpAsteroid.vY *= -1
          tmpAsteroid.aY *= -1
        } else if (tmpAsteroid.y + tmpAsteroid.radius > canvasHeight) {
          tmpAsteroid.y = canvasHeight - tmpAsteroid.radius
          tmpAsteroid.vY *= -1
          tmpAsteroid.aY *= -1
        }
      }
      if (playAnimation) {
        setTimeout(animate, 33)// 更新
      }
    }

    animate()
  },
  methods: {}
}
</script>
<style type="text/css">
  .modal-login {
    height: 615px;
    width: 1090px;
    border-radius: 6px;
    overflow: hidden;
  }

  .modal-login-left {
    width: 50%;
    float: left;
    height: 615px;
  }

  .modal-login-right {
    width: 50%;
    float: left;
    height: 615px;
    background-color: #303030;
  }

  .modal-login-close {
    position: absolute;
    top: -25px;
    left: 1065px;
  }

  .modal-login-close span {
    height: 50px;
    width: 50px;
    display: block;
    background-image: url('../../assets/img/icon/icon_close.png');
    background-size: 50px 50px;
  }

  .modal-login-back {
    height: 615px;
    width: 545px;
    margin-top: -615px;
    display: block;
  }

  @media (min-width: 768px) {
    .modal-dialog {
      width: 1090px;
      margin: 130px auto;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s ease;
    height: 615px;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-to {
    height: 0px;
  }

  .swipe-enter-active,
  .swipe-leave-active {
    transition: all 0.4s ease;
    opacity: 1;
    overflow: hidden;
  }

  .swipe-enter,
  .swipe-leave-to {
    opacity: 0;
  }

</style>
