<template>
    <div class="Beauty">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <img :src="item.thumbnail" alt="">
          <h2>{{item.name}}</h2>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Beauty",
      data(){
        return {
          list:[]
        }
      },
      mounted() {
        this.$http({
          url:'http://yd.msword.top/getClassify'
        }).then((res) => {
          this.list = res.data.data[1].list
        })
      }
    }
</script>

<style lang="stylus" scoped>
  .Beauty{
    ul{
      li{
        float left
        margin-top .23rem
        margin-left .19rem
        height 2.35rem
        width 2.24rem
        border .03rem solid #2b8cad
        border-radius .1rem
        text-align center
        img{
          margin-top .15rem
          width 1.63rem
          height 1.7rem
        }
        h2{
          margin-top .05rem
          line-height .46rem
          font-size .24rem
          color #ffffff
          background #2b8cad
        }
      }
    }
  }
</style>
