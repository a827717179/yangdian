<template>
    <div class="IndexFoot">
      <ul class="nav">
        <li v-for="(a,i) in arr" :key="i">
          <router-link :to="a.path" active-class="active">
            <span :class='"logo"+i'></span>
            <h3>{{a.name}}</h3>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "IndexFoot",
      data(){
          return {
            arr:[
              {
                name:'首页',
                path:'/Index'
              },
              {
                name:'分类',
                path:'/Classification'
              },
              {
                name:'购物车',
                path:'/Shop'
              },
              {
                name:'我',
                path:'/Home'
              }
            ],
          }
      },
      methods:{

      },
    }
</script>

<style lang="stylus" scoped>
.IndexFoot{
  position fixed
  bottom 0
  width 7.5rem
  height 1.01rem
  background #ffffff
  border-top .02rem solid #eeeeee

  .nav{
    display flex
    justify-content space-around
    li{
      text-align center
      padding-top .14rem
      span{
        display inline-block
        width .43rem
        height .42rem
      }
      .logo0{
        background: url("../../assets/images/tab_home_nor.png") no-repeat center;
        background-size: contain;
      }
      .logo1{
        background: url("../../assets/images/tab_menu_nor.png") no-repeat center;
        background-size: contain;
      }
      .logo2{
        background: url("../../assets/images/tab_shopping_nor.png") no-repeat center;
        background-size: contain;
      }
      .logo3{
        background: url("../../assets/images/tab_me_nor.png") no-repeat center;
        background-size: contain;
      }
      h3{
        font-size .24rem
        color #333333
        line-height .48rem
      }
    }
    .active{
      h3{
        color #fb9b00
      }
      .logo0{
        background: url("../../assets/images/tab_home_hig.png") no-repeat center;
        background-size: contain;
      }
      .logo1{
        background: url("../../assets/images/tab_menu_hig.png") no-repeat center;
        background-size: contain;
      }
      .logo2{
        background: url("../../assets/images/tab_shopping_hig.png") no-repeat center;
        background-size: contain;
      }
      .logo3{
        background: url("../../assets/images/tab_me_hig.png") no-repeat center;
        background-size: contain;
      }
    }
  }
}



</style>
