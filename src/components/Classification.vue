<template>
    <div class="Classification">
      <IndexFoot></IndexFoot>
      <div class="search">
        <input type="text" placeholder="Montagne jeunesse">
        <span></span>
      </div>
      <div class="content">
        <div class="left">
          <router-link :to="item.pa" active-class="active1" v-for="(item,index) in path" :key="index">{{item.name}}</router-link>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>

</template>

<script>
  import IndexFoot from '@/components/public/IndexFoot'
    export default {
      name: "Classification",
      data(){
        return {
          path:[
            {
              pa:'/Classification/Baby',
              name:'母婴专区'
            },
            {
              pa:'/Classification/Beauty',
              name:'美妆护肤'
            },
            {
              pa:'/Classification/Food',
              name:'家居生活'
            },
            {
              pa:'/Classification/Household',
              name:'食品营养'
            },
            {
              pa:'/Classification/Global',
              name:'全球直邮'
            }
          ],

        }
      },
      components:{
        IndexFoot
      },
    }
</script>

<style lang="stylus" scoped>
  .Classification{
    width: 7.5rem;
    margin: 0 auto;
    padding-bottom: 1.03rem;
    padding-top 1.46rem
    .search{
      position: fixed;
      top 0
      width: 7.5rem;
      height: 1.46rem;
      text-align: center;
      background: #ff9900;
      input{
        width: 4.93rem;
        height: .62rem;
        padding-left: .23rem;
        margin-top: .65rem;
        border-radius: .12rem;
        background: rgba(255,255,255,.6);
        font-size: .28rem;
        line-height: .62rem;
      }
      span{
        position: absolute;
        top: .76rem;
        right: 1.39rem;
        width: .37rem;
        height: .39rem;
        background: url("../assets/images/search.png") no-repeat center;
        background-size: 100%;
      }
    }
    .content{
      height:10.85rem;
      .left{
        height:100%;
        float: left;
        background: #fafafa;
        a{
          display: block;
          width:2.25rem;
          height:.93rem;
          border-left: .1rem solid #fafafa;
          font-size: .28rem;
          color: #333333;
          text-align:center;
          line-height:.93rem;
        }
        .active1{
          background: #ffffff;
          border-left: .1rem solid #1d84a7;
          color: #ffb444;
        }
      }
      .right{
        float: left;
        width:5.15rem;
        height:10rem;
      }
    }
  }
</style>
