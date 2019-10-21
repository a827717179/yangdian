<template>
  <div class="Register">
    <div class="top">
      <span @click="$router.go(-1)"></span>
      <h2>注册</h2>
      <p @click="login()">登录</p>
    </div>
    <div class="content">
      <p>手机号:<input type="text" v-model="phone"></p>
      <p>密&nbsp;&nbsp;&nbsp;码:<input type="password" v-model="password"></p>
      <p class="yanzheng"><span>验证码:<input type="text"  v-model="yanzheng"></span><em @click="getphone()">点击获取</em></p>
    </div>
    <div class="dianji">
      <h3 @click="go()">注册</h3>
      <p><input type="checkbox" v-model="flag">我已阅读并同意使用<span>条款和隐私政策</span></p>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: "Register",
    data(){
      return {
        flag:false,
        phone:'',
        password:'',
        yanzheng:'',
      }
    },
    methods: {
      login() {
        this.$router.push({
          path: '/Login'
        })
      },
      getphone(){
        let ph = /^1[3-9][0-9]{9}/;
        if(ph.test(this.phone)){
          this.$http({
            url:'http://49.232.129.237:3000/captcha/sent?phone='+this.phone
          }).then(res=>{
            alert('获取验证码成功，注意查收！');
          })
        }else{
          alert('请填写正确手机号码');
        }
      },
      go(){
        let params = {
          phone:this.phone,
          password:this.password
        };
        let ph = /^1[3-9][0-9]{9}/;
        let pw = /^\w{6,18}/;
        if(!ph.test(this.phone)){
          alert('请填写正确手机号码！');
        }else if(!pw.test(this.password)) {
          alert('请输入6-18位密码！');
        }else if(this.flag){
          this.$http({
            url: 'http://49.232.129.237:3000/captcha/verify?phone='+this.phone+'&captcha='+this.yanzheng
          }).then(res => {
            if(res.status===200) {
              this.$http({
                url:'http://yd.msword.top/register',
                method: 'post',
                data:qs.stringify(params)
              }).then(res =>{
                alert(res.data.msg);
                if(res.data.msg==='注册成功'){
                  this.$router.push({
                    path: '/Login'
                  })
                }
              })
            }
          }).catch(()=>{
            alert('请填写正确的验证码！');
          })
        }else {
          alert('未同意条款和隐私条例');
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .Register {
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
      padding 1.2rem .75rem .48rem

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
      .yanzheng{
        display flex
        justify-content space-between
        em{
          font-size .28rem
          color #fe0041
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
        margin-top .5rem
        font-size .28rem
        line-height .28rem
        color #666666
        display flex
        align-items center
        span{
          color #333333
        }
        input{
          -webkit-appearance checkbox
          width .3rem
          height .3rem
          margin-right .20rem
        }
      }
    }
  }
</style>
