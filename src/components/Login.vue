<template>
  <div class="Login">
    <div class="top">
      <span @click="$router.go(-1)"></span>
      <h2>登录</h2>
      <p @click="register()">注册</p>
    </div>
    <div class="content">
      <p>手机号:<input type="text" v-model="phone"></p>
      <p>密&nbsp;&nbsp;&nbsp;码:<input type="password" v-model="password"></p>
    </div>
    <div class="dianji">
      <p><span>忘记密码</span></p>
      <h3 @click="login()">登录</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return {
        phone:'',
        password:''
      }
    },
    methods: {
      register() {
        this.$router.push({
          path: '/Register'
        })
      },
      login(){
        let ph = /^1[3-9][0-9]{9}/;
        let pw = /^\w{6,18}/;
        if(!ph.test(this.phone)){
          alert('请填写正确手机号码！');
        }else if(!pw.test(this.password)) {
          alert('请输入6-18位密码！');
        }else{
          this.$http({
            url:'http://yd.msword.top/login',
            method: 'get',
            params:{
              phone:this.phone,
              password:this.password
            }
          }).then(res =>{
            alert(res.data['msg']);
            if(res.data['msg']==='登录成功。'){
              this.$router.push({
                path: '/Home',
              });
              sessionStorage.setItem('data',JSON.stringify({
                name:'来啦老弟！',
                img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570723488926&di=da7724a5bfa11bc86e2450de7bf25d7f&imgtype=0&src=http%3A%2F%2Fim6.leaderhero.com%2Femotion%2F6192%2F1829535711%2Fad84b59439.gif'
              }))
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .Login {
    width 7.5rem
    .top {
      padding .5rem .28rem 0 .34rem
      height .9rem
      width 6.88rem
      background #ff9900
      border-bottom .01rem solid #fdc064
      display flex
      justify-content space-between

      span {
        margin-top .24rem
        width .23rem
        height .37rem
        background url("../assets/images/icon_back.png") no-repeat center
        background-size contain
      }

      h2 {
        line-height .9rem
        font-size .36rem
        color #ffffff
      }

      p {
        line-height .9rem
        font-size .36rem
        color #ffffff
      }
    }

    .content {
      padding 1.98rem .75rem .43rem

      p {
        line-height 1.12rem
        border-bottom .02rem solid #b8b8b8
        font-size .32rem

        input {
          padding-left .2rem
          font-size .3rem
          color #666666
        }
      }
    }
    .dianji{
      padding 0 .75rem
      h3{
        width 6rem
        line-height 1rem
        text-align center
        color #ffffff
        background #ff9900
        border-radius .1rem
        font-size .34rem
      }
      p{
        text-align right
        font-size .26rem
        color #666666
        margin-bottom .29rem
      }
    }
  }
</style>
