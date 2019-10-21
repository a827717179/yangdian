<template>
  <div class="Shop">
    <div class="top">
      <span @click="$router.go(-1)"></span>
      <h2>购物车</h2>
    </div>
    <div class="blank" v-if="this.arr===null || this.arr.length===0">
      <span></span>
    </div>
    <div v-else>
      <div class="bottom">
        <div class="all" @click="all()">
          <input type="checkbox" v-model="allchoose" :class="{active: allchoose}" id="allchoose">
          <label for="allchoose"><span>全选</span></label>
        </div>
        <div class="bianjie">
          <input type="checkbox" v-model="bianji" :class="{active:bianji}" id="bianji">
          <label for="bianji"><span>编辑</span></label>
        </div>
        <div class="zongjia">
          <p>合计￥<span>{{allprice}}</span>.00</p>
          <p>(不含运费)</p>
        </div>
        <div class="jiesuan">结算</div>
      </div>
      <ul>
        <li v-for="(item,index) in arr">
          <h2>杭州保税区仓</h2>
          <div class="box clearfix">
            <div class="choose" v-show="!bianji">
              <input type="checkbox" v-model="item.flag" :class="{active:item.flag}" @click="inp(index)">
            </div>
            <div class="center">
              <img :src="item.data.swiperImgArr[0]" alt="" @click="cometo(item.id)">
              <div class="content">
                <h3 @click="cometo(item.id)">{{item.data.name}}</h3>
                <em>{{item.par1}}/{{item.par2}}</em>
                <p>
                  <span @click="jian(index)">-</span>
                  <input type="text" v-model="item.number">
                  <span @click="jia(index)">+</span>
                </p>
              </div>
              <h4>￥{{item.number*item.data.reduct_price}}</h4>
              <div class="del" v-show="bianji" @click="del(index)">删除</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <IndexFoot></IndexFoot>
  </div>
</template>

<script>
  import IndexFoot from '@/components/public/IndexFoot'

  export default {
    name: "Shop",
    data(){
      return {
        allchoose:false,
        bianji:false,
        number:1,
        arr:[],
        total:0
      }
    },
    components: {
      IndexFoot
    },
    methods:{
      jian(i){
        if (this.arr[i].number===1) {
          this.arr.splice(i,1)
        }else{
          this.arr[i].number--
        }
      },
      jia(i){
        this.arr[i].number++
      },
      del(i){
        this.arr.splice(i,1)
      },
      all(){
        if(!this.allchoose){
          this.arr.map(val => {
            val.flag = true
          })
        }else {
          this.arr.map(val => {
            val.flag = false
          })
        }
      },
      inp(i){
        this.arr[i].flag = !this.arr[i].flag;
        let tag = this.arr.every(val=>val.flag===true);
        tag?this.allchoose = true:this.allchoose = false;
      },
      cometo(id){
        this.$router.push({
          path:'/Details',
          query:{
            id
          }
        })
      }
    },
    mounted() {
      this.arr = JSON.parse(sessionStorage.getItem('res'));
    },
    computed:{
      allprice (){
        let sum = 0;
        this.arr.map(value => {
          if(value.flag){
            sum += value.data.reduct_price*value.number
          }
        });
        return sum
      }
    },
    updated() {
      sessionStorage.setItem('res',JSON.stringify(this.arr));
    }
  }
</script>

<style lang="stylus" scoped>
.Shop{
  width 7.5rem
  padding-top 1.4rem
  .top{
    padding-top .49rem
    position fixed
    top 0
    height .91rem
    width 7.5rem
    background #ff9900
    border-bottom .01rem solid #fdc064
    span{
      position absolute
      top .75rem
      left .3rem
      width .23rem
      height .37rem
      background url("../assets/images/icon_back.png") no-repeat center
      background-size contain
    }
    h2{
      text-align center
      line-height .91rem
      font-size .4rem
      color #ffffff
    }
  }
  .bottom{
    background #ffffff
    position fixed
    bottom 1.02rem
    width 7.5rem
    height 1.12rem
    border-top .03rem solid #eeeeee
    .all{
      float left
      margin-left .39rem
      margin-top .18rem
      input{
        margin-bottom .1rem
        margin-left .05rem
        display block
        width .42rem
        height .42rem
        background url("../assets/images/radio_nor.png") no-repeat center
        background-size contain
      }
      .active{
        background url("../assets/images/radio_yes.png") no-repeat center
        background-size contain
      }
      span{
        font-size .26rem
        color #666666
      }
    }
    .bianjie{
      float left
      margin-left .72rem
      margin-top .18rem
      input{
        margin-bottom .1rem
        margin-left .05rem
        display block
        width .42rem
        height .42rem
        background url("../assets/images/bianji.png") no-repeat center
        background-size contain
      }
      .active{
        background url("../assets/images/bianji_hig.png") no-repeat center
        background-size contain
      }
      span{
        font-size .26rem
        color #666666
      }
    }
    .zongjia{
      float left
      margin-top .29rem
      margin-left 1rem
      text-align center
      font-size .24rem
      p{
        margin-bottom .06rem
        color #999999
      }
    }
    .jiesuan{
      float right
      width 2.32rem
      height .1.15rem
      background #ff5500
      font-size .36rem
      color #ffffff
      text-align center
      line-height 1.15rem
    }
  }
  .blank{
    width 100%
    text-align center
    span{
      margin-top 3.34rem
      margin-bottom 3.34rem
      display inline-block
      width 2.26rem
      height 2.03rem
      background url("../assets/images/kongche.png") no-repeat center
      background-size contain
    }
  }
  ul{
    padding-bottom 2.13rem
    li{
      background #fafafa
      width 7.12rem
      padding-left .38rem
      padding-top .35rem
      h2{
        padding-left .62rem
        padding-bottom .45rem
        line-height .4rem
        font-size .26rem
        color #999999
        background url("../assets/images/store.png") no-repeat
        background-size .36rem .35rem
      }
      .box{
        .del{
          float right
          width .98rem
          line-height 2.09rem
          background #ff9900
          text-align center
          color #ffffff
          font-size .3rem
        }
        .choose{
          float left
          input{
            width .6rem
            height 1.57rem
            background url("../assets/images/radio_nor.png") no-repeat center
            background-size .42rem .42rem
          }
          .active{
            background url("../assets/images/radio_yes.png") no-repeat center
            background-size .42rem .42rem
          }
        }
        .center{
          float left
          display flex
          img{
            width 1.57rem
            height 1.57rem
            margin-right .21rem
            padding-bottom .52rem
          }
          .content{
            width 2.8rem
            h3{
              font-size .3rem
              line-height .4rem
            }
            em{
              color #999999
              font-size .26rem
              line-height .26rem
            }
            p{
              margin-top .08rem
              display flex
              width 2.28rem
              border .03rem solid #cccccc
              border-radius .08rem
              span{
                width .74rem
                line-height .41rem
                text-align center
                font-size .28rem
              }
              input{
                font-size .25rem
                text-align center
                width .79rem
                height .41rem
                border-left.03rem solid #cccccc
                border-right .03rem solid #cccccc
              }
            }
          }
          h4{
            margin-left .4rem
            font-size .25rem
            width 1.15rem
            line-height 1.57rem
          }
        }
      }
    }
  }
}
</style>
