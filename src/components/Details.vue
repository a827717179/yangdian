<template>
  <div class="details">
    <div class="top"></div>
    <div class="lunbo">
      <!-- Swiper -->
      <div class="small">
        <span class="left" @click="$router.go(-1)"></span>
        <div class="right"><span class="sp1" @click="goshop()"></span><span class="sp2"></span></div>
      </div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in data.swiperImgArr" :key="index"><img :src="item"/></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="title">
      <div class="name">
        <h2>{{data.name}}</h2>
        <div>
          <span></span>
          <p>收藏</p>
        </div>
      </div>
      <div class="price">
        <h3>￥{{data.reduct_price}}.00</h3>
        <span>{{(data.allowance*10).toFixed(1)}}折</span>
        <span v-show="data.isFreeShip">包邮</span>
      </div>
      <div class="yuanjia">
        <h3>￥{{data.original_price}}.00</h3>
        <span v-for="item in data.describe">{{item}}</span>
      </div>
    </div>
    <div class="list">
      <span :class="!flag?'active':''" @click="change1()">商品详情</span>
      <span :class="flag?'active':''" @click="change2()">买家口碑</span>
    </div>
    <div class="shopDes" v-show="!flag">
      <img v-for="item in data.shopDes" :src="item" alt="">
    </div>
    <div class="evaluate" v-show="flag">
      <ul class="itemlist">
        <li :class="num===0?'active':''" @click="change_item(0)">全部评价</li>
        <li :class="num===1?'active':''" @click="change_item(1)">好评</li>
        <li :class="num===2?'active':''" @click="change_item(2)">差评</li>
        <li :class="num===3?'active':''" @click="change_item(3)">晒单</li>
      </ul>
      <ul class="content">
        <li v-for="item in arr[chag]">
          <div class="user_name">
            <h2>{{item.buyerName}}</h2>
            <p>{{item.createTime | totime}}</p>
          </div>
          <div class="the_img">
            <img v-for="i in item.postImg" :src="i" alt="">
          </div>
          <p class="neirong">{{item.postDescribe}}</p>
          <p class="shangjia" v-show="item.adminReviews===''">{{item.adminReviews}}</p>
        </li>
      </ul>
    </div>
    <div class="footer">
      <p class="num" v-if="tan">总价：<span>￥{{data.reduct_price*number}}.00</span></p>
      <p class="num" v-else>总价：<span>￥0.00</span></p>
      <div class="goshop">
        <span class="jia" @click="add()">加入购物车</span>
        <span class="mai" @click="goshop()">立即购买</span>
      </div>
    </div>
    <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
      <div class="tanchu" v-show="tan">
        <div class="price">
          <img :src="shopimg" alt="">
          <div class="price_num">
            <span class="sp1">￥{{data.reduct_price}}.00</span>
            <span>库存{{data.total}}件</span>
            <span>请选择商品属性</span>
          </div>
          <div class="guanbi" @click="guan()"></div>
        </div>
        <div class="operation">
          <p>购买数量</p>
          <div>
            <span @click="jian()">-</span>
            <input type="text" v-model="number">
            <span @click="jia()">+</span>
          </div>
        </div>
        <div class="buySelect" v-for="(item,index) in buySelect" :key="index">
          <h4>{{item.name}}</h4>
          <ul>
            <li v-for="(it,i) in item.list" :key="i" @click="dataa(index,i)" :class="{active:index===0?i===x:i===y}">
              {{it}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import format from 'time-conversion'
  import Swiper from 'swiper'
  import '../../node_modules/swiper/css/swiper.css'

  export default {
    name: 'Details',
    data() {
      return {
        id: '',
        data: {},
        flag: false,
        num: 0,
        tan: false,
        arr: {},
        list: ['all', 'good', 'bad', 'postForm'],
        chag: 'all',
        shopimg: '',
        number: 1,
        buySelect: [],
        x: 0,
        y: 0,
        key: 0,
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.$http({
        url: 'http://yd.msword.top/getDetails?pid=' + this.id
      }).then((res) => {
        this.data = res.data.data;
        this.buySelect = res.data.data.buySelect;
        this.shopimg = res.data.data.swiperImgArr[0];
        this.arr = res.data.data.buyerReviews;
        this.$nextTick(() => {
          var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            }
          });
        })
      });
    },
    methods: {
      change1() {
        this.flag = false
      },
      change2() {
        this.flag = true
      },
      change_item(ev) {
        this.num = ev;
        this.chag = this.list[ev];
      },
      goshop() {
        this.$router.push({
          path: '/Shop'
        })
      },
      guan() {
        this.tan = false
      },
      jian() {
        if (this.number === 1) {
          this.number = 1
        } else {
          this.number--
        }
      },
      jia() {
        this.number++
      },
      add() {
        this.tan = !this.tan;
        if (!this.tan) {
          if(JSON.parse(sessionStorage.getItem('data'))===null){
            alert('请登录您的账号!!');
            this.$router.push('/Login')
          }else{
            var obj = {
              id: this.data.pid,
              number: this.number,
              par1: this.buySelect[0].list[this.x],
              par2: this.buySelect[1].list[this.y],
              data: this.data,
              flag: false
            };
            if (JSON.parse(sessionStorage.getItem('res')) === null) {
              sessionStorage.setItem('res', JSON.stringify([obj]));
            } else {
              var flag = false;
              let res = JSON.parse(sessionStorage.getItem('res'));
              res.some(val => {
                if (val.id === obj.id) {
                  if (val.par1 === obj.par1 && val.par2 === obj.par2) {
                    flag = true;
                    if (flag) {
                      val.number += this.number;
                      sessionStorage.setItem('res', JSON.stringify(res));
                    }
                    return true
                  } else {
                    flag = false;
                  }
                }
              });
              if (!flag) {
                res.push(obj);
                sessionStorage.setItem('res', JSON.stringify(res));
              }
            }
          }
        }
      },
      dataa(i, j) {
        i === 0 ? this.x = j : this.y = j
      }
    },
    filters: {
      totime(ev) {
        return format('YYYY-MM-DD hh:mm:ss', Number(ev))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .details {
    width: 7.5rem;
    padding-top .49rem

    .top {
      position fixed
      top 0
      z-index 999
      width: 7.5rem;
      height: .49rem;
      background: #ff9900;
    }

    .lunbo {
      position relative
      width: 7.5rem;
      height: 5.42rem;
      border-bottom: .02rem solid #eeeeee;

      img {
        width: 100%;
        height: 5.42rem;
      }

      .small {
        z-index 99
        position absolute
        top: .08rem
        left: .23rem
        width: 6.99rem
        height: .56rem
        display flex
        justify-content space-between

        .left {
          width: .56rem
          height: .56rem
          background: url("../assets/images/houtui.png") no-repeat center
          background-size contain
        }

        .right {
          width 1.45rem
          display flex
          justify-content space-between

          .sp1 {
            width: .52rem
            height: .52rem
            background: url("../assets/images/shopcar.png") no-repeat center
            background-size contain
          }

          .sp2 {
            width: .52rem
            height: .52rem
            background: url("../assets/images/sandian.png") no-repeat center
            background-size contain
          }
        }
      }
    }

    .title {
      height 1.81rem
      border-bottom .32rem solid #eeeeee

      .name {
        padding .08rem 0 .08rem .29rem
        display flex
        justify-content space-between

        h2 {
          width 5.8rem
          line-height .35rem
          font-size .28rem
        }

        div {
          width .98rem
          height .7rem
          text-align center
          border-left .01rem solid #dddddd

          span {
            display inline-block
            width .36rem
            height .36rem
            background url("../assets/images/shoucang.png") no-repeat center
            background-size contain
            margin-top .02rem
            margin-bottom .13rem
          }

          p {
            line-height .16rem
            color #e71f19
            font-size .16rem
          }
        }
      }

      .price {
        display flex
        justify-content left
        margin-top .05rem

        h3 {
          color #eb2222
          line-height .3rem
          font-size .26rem
          margin-right .39rem
          margin-left .32rem
        }

        span {
          color #ffffff
          font-size .19rem
          width .7rem
          line-height .3rem
          text-align center
          background #ff9900
          margin-right .2rem
        }
      }

      .yuanjia {
        display flex
        justify-content left
        margin-top .1rem

        h3 {
          color #999999
          line-height .3rem
          font-size .18rem
          margin-right .7rem
          margin-left .3rem
          text-decoration line-through
        }

        span {
          color #ff9900
          font-size .19rem
          padding 0 .09rem
          line-height .26rem
          border .02rem solid #ff9900
          text-align center
          margin-right .18rem
        }
      }
    }

    .list {
      display flex
      justify-content space-around
      margin-top .12rem
      margin-bottom .26rem

      span {
        width 1.5rem
        border-bottom .03rem solid transparent
        color #999999
        text-align center
        line-height .45rem
        font-size .25rem
      }

      .active {
        border-color #ff9900
        color #ff9900
      }
    }

    .shopDes {
      padding 0 .46rem .98rem

      img {
        width 6.58rem
      }
    }

    .evaluate {
      padding-bottom .98rem
      border-top .01rem solid #dddddd

      .itemlist {
        margin 0 .3rem
        height .7rem
        border-bottom .01rem solid #dddddd
        display flex
        justify-content space-around
        align-items center

        li {
          width 1.35rem
          height .5rem
          background #999999
          color #ffffff
          line-height .5rem
          text-align center
          border-radius .25rem
        }

        .active {
          background #ff9900
        }
      }

      .content {

        li {
          padding 0 .3rem .2rem
          border-bottom .01rem solid #dddddd

          .user_name {
            height .62rem
            display flex
            justify-content space-between

            h2 {
              line-height .62rem
              font-size .24rem
              color #ff9900
            }

            p {
              line-height .62rem
              font-size .14rem
              color #b2b2b2
            }
          }

          .the_img {
            img {
              width 1.51rem
              height 1.51rem
              margin-right .05rem
            }
          }

          .neirong {
            font-size .2rem
            line-height .38rem
            color #999999
          }

          .shangjia {
            padding .13rem .1rem
            background #dddddd
            color #666666
            font-size .16rem
            line-height .24rem
            border-radius .12rem
          }
        }
      }
    }

    .footer {
      z-index 99
      position fixed
      bottom 0
      width 7.5rem
      height .97rem
      border-top .01rem solid #dddddd
      background #ffffff
      display flex
      justify-content space-between

      .num {
        padding-left .3rem
        line-height .97rem
        color #666666
        font-size .3rem

        span {
          color #eb2222
          font-size .26rem
          margin-left .2rem
        }
      }

      .goshop {
        display flex
        width 3.98rem

        span {
          width 1.99rem
          line-height .97rem
          color #ffffff
          text-align center
          font-size .3rem
        }

        .jia {
          background #ff9900
        }

        .mai {
          background #eb2222
        }
      }
    }

    .tanchu {
      z-index 99
      background: #ffffff
      padding 0 .42rem
      width 6.66rem
      position fixed
      bottom .98rem

      .price {
        height 2.09rem
        display flex

        img {
          width 2.02rem
          height 2.02rem
          border .07rem solid #dddddd
          border-radius .1rem
          margin-top -.28rem
        }

        .price_num {
          margin-left .23rem
          margin-top .66rem

          span {
            display block
            margin-bottom .1rem
            color #333333
            font-size .24rem
            line-height .24rem
          }

          .sp1 {
            color #eb2222
          }
        }

        .guanbi {
          width .56rem
          height .56rem
          background url("../assets/images/guanbi.png") no-repeat center
          background-size contain
          margin-top .29rem
          margin-left 2rem
        }
      }

      .operation {
        height .5rem
        display flex
        justify-content space-between
        line-height .5rem
        margin-bottom .4rem

        p {
          font-size .28rem
        }

        div {
          display flex

          span {
            width .5rem
            height .5rem
            background #999999
            color #ffffff
            text-align center
            font-size .4rem
          }

          input {
            width 1rem
            height .44rem
            border-top .03rem solid #dddddd
            border-bottom .03rem solid #dddddd
            line-height .44rem
            text-align center
            font-size .24rem
          }
        }
      }

      .buySelect {
        margin-bottom .26rem

        h4 {
          font-size .28rem
          line-height .28rem
          margin-bottom .2rem
        }

        ul {
          display flex

          li {
            margin-right .2rem
            margin-bottom .2rem
            padding 0 .35rem
            line-height .45rem
            background #dddddd
            color #999999
            border-radius .22rem
          }

          .active {
            background #ff9900
            color #ffffff
          }
        }
      }
    }
  }

  /*swiper*/
  .swiper-container {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
    }
  }
</style>
