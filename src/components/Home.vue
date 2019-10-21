<template>
  <div class="Home">
    <div class="top">
      <div class="title">
        <span></span>
        <h2>个人中心</h2>
        <em></em>
      </div>
    </div>
    <div class="sec">
      <div class="me" @click="login()">
        <div class="img">
          <img :src="img" alt="">
        </div>
        <h3>{{name}}</h3>
      </div>
      <p>我的收藏</p>
    </div>
    <div class="shops">
      <div class="dingdan">
        <p>我的订单</p>
        <span>查看全部订单</span>
      </div>
      <ul class="list">
        <li>
          <span class="sp1"></span>
          <p>待付款</p>
        </li>
        <li>
          <span class="sp2"></span>
          <p>待发货</p>
        </li>
        <li>
          <span class="sp3"></span>
          <p>待收货</p>
        </li>
        <li>
          <span class="sp4"></span>
          <p>待评价</p>
        </li>
        <li>
          <span class="sp5"></span>
          <p>退款/售后</p>
        </li>
      </ul>
      <div class="dizhi">收货地址管理</div>
    </div>
    <IndexFoot></IndexFoot>
  </div>
</template>

<script>
  import IndexFoot from '@/components/public/IndexFoot'

  export default {
    name: "Home",
    data(){
      return {
        name:'点击登录',
        img:''
      }
    },
    components: {
      IndexFoot,
    },
    methods:{
      login(){
        if(JSON.parse(sessionStorage.getItem('data'))===null){
          this.$router.push({
            path:'/Login'
          })
        }else{
          if(confirm('确定退出账号吗？')){
            sessionStorage.clear();
            window.location.reload()
          }
        }
      }
    },
    mounted() {
      if(JSON.parse(sessionStorage.getItem('data'))!==null){
        this.name = JSON.parse(sessionStorage.getItem('data')).name;
        this.img = JSON.parse(sessionStorage.getItem('data')).img;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .Home {
    width: 7.5rem;
    padding-bottom 1.5rem
    background #efeeee
    .top {
      padding-top .7rem
      width: 7.5rem;
      height: 3rem;
      background: #ff9900;
      .title{
        padding 0 .3rem
        display flex
        justify-content space-between
        h2{
          font-size .38rem
          color #ffffff
        }
        span{
          width .5rem
          height .5rem
          background url("../assets/images/set.png") no-repeat center
          background-size contain
        }
        em{
          width .53rem
          height .47rem
          background url("../assets/images/news.png") no-repeat center
          background-size contain
        }
      }
    }
    .sec{
      padding-top 1.8rem
      position relative
      background #fafafa
      height .82rem
      width 7.5rem
      border-bottom .13rem solid #efeeee
      .me{
        text-align center
        position absolute
        top -1.33rem
        left 2.7rem
        .img{
          display inline-block
          width 1.82rem
          height 1.82rem
          border .12rem solid #ffffff
          background #cccccc
          border-radius 50%
          img{
            border-radius 50%
            width 1.82rem
            height 1.82rem
          }
        }
        h3 {
          font-size .32rem
          line-height .78rem
        }
      }
      p{
        margin-left .43rem
        line-height .36rem
        font-size .32rem
        padding-left .62rem
        background url("../assets/images/keep.png") no-repeat
        background-size contain
      }
    }
    .shops{
      background #fafafa
      .dingdan{
        height 1.24rem
        border-bottom .01rem solid #b3b3b3
        font-size .32rem
        display flex
        justify-content space-between
        p{
          line-height 1.24rem
          margin-left .46rem
        }
        span{
          line-height 1.24rem
          color #999999
          margin-right .05rem
        }
      }
      .list{
        padding-top .45rem
        height 1.43rem
        display flex
        justify-content space-around
        border-bottom .14rem solid #efeeee
        li{
          text-align center
          p{
            font-size .24rem
            line-height .78rem
            color #666666
          }
          span{
            display inline-block
            width .59rem
            height .48rem
          }
          .sp1{
            background url("../assets/images/daifukuan.png") no-repeat center
            background-size contain
          }
          .sp2{
            background url("../assets/images/daifahuo.png") no-repeat center
            background-size contain
          }
          .sp3{
            background url("../assets/images/daishouhuo.png") no-repeat center
            background-size contain
          }
          .sp4{
            background url("../assets/images/daipingjia.png") no-repeat center
            background-size contain
          }
          .sp5{
            background url("../assets/images/tuikuan.png") no-repeat center
            background-size contain
          }
        }
      }
      .dizhi{
        height 1.29rem
        padding-left .45rem
        line-height 1.29rem
        font-size .32rem
        color #999999
      }
    }
  }
</style>
