<template>
  <div class="index">
    <div class="banner">
      <div class="banner1">
        <input type="text" placeholder="Montagne jeunesse">
        <span></span>
      </div>
      <div class="banner2"></div>
    </div>
    <Today></Today>
    <NavFoot1></NavFoot1>
    <NavFoot2></NavFoot2>
    <NavFoot3></NavFoot3>
    <NavFoot4></NavFoot4>
    <NavFoot5></NavFoot5>
    <IndexFoot></IndexFoot>
  </div>
</template>

<script>
  import Today from '@/components/Index/Today'
  import NavFoot1 from '@/components/Index/NavFoot1'
  import NavFoot2 from '@/components/Index/NavFoot2'
  import NavFoot3 from '@/components/Index/NavFoot3'
  import NavFoot4 from '@/components/Index/NavFoot4'
  import NavFoot5 from '@/components/Index/NavFoot5'
  import IndexFoot from '@/components/public/IndexFoot'
  export default {
    name: "Index",
    data(){
      return {

      }
    },
    components:{
      Today,
      NavFoot1,
      NavFoot2,
      NavFoot3,
      NavFoot4,
      NavFoot5,
      IndexFoot
    }
  }
</script>

<style scoped>
  .index{
    width: 7.5rem;
    margin: 0 auto;
    padding-bottom: 1.24rem;
    background: #fafafa;
  }
  .index .banner{
    width: 7.5rem;
    height: 5.21rem;

  }
  .index .banner .banner1{
    position: relative;
    width: 100%;
    height: 1.46rem;
    text-align: center;
    background: url("../assets/images/banner1.png") no-repeat center;
    background-size: 100%;
  }
  .index .banner .banner1 input{
    width: 4.93rem;
    height: .62rem;
    padding-left: .23rem;
    margin-top: .65rem;
    border-radius: .12rem;
    background: rgba(255,255,255,.6);
    font-size: .28rem;
    line-height: .62rem;
  }
  .index .banner .banner1 span{
    position: absolute;
    top: .76rem;
    right: 1.39rem;
    width: .37rem;
    height: .39rem;
    background: url("../assets/images/search.png") no-repeat center;
    background-size: 100%;
  }
  .index .banner .banner2{
    margin-top: -.05rem;
    width: 100%;
    height: 3.8rem;
    background: url("../assets/images/banner2.png") no-repeat center;
    background-size: 100%;
  }
</style>
