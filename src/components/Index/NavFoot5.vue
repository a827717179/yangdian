<template>
  <div class="NavFoot5">
    <div class="title">
      <h2>{{title}}</h2>
      <img src="../../assets/images/airplane.png" alt="">
    </div>
    <ul class="foods">
      <li v-for="(item,index) in list" :key="index" @click="ToDetails(item.id)">
        <img :src="item.thumbnail" alt="">
        <h2>{{item.name}}</h2>
        <p><span class="orange">￥{{item.reduct_price}}.00</span><span>￥{{item.original_price}}.00</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "NavFoot5",
    data() {
      return {
        title: '',
        list:[],
      }
    },
    methods:{
      ToDetails(id){
        this.$router.push({
          path:'/Details',
          query:{
            id:id
          }
        })
      }
    },
    mounted() {
      this.$http({
        url:'http://yd.msword.top/getIndexData'
      }).then((res)=>{
        this.title = res.data.data[5].name;
        this.list = res.data.data[5].list
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .NavFoot5 {
    width: 7.5rem;
    height: 5.65rem;

    .title {
      position: relative;

      h2 {
        line-height: .95rem;
        font-size: .28rem;
        padding-left: .71rem;
      }

      img {
        position: absolute;
        top: .27rem;
        left: .19rem;
        width: .39rem;
        height: .39rem;
      }
    }

    .foods {
      padding-left: .19rem;
      display flex;
      overflow: auto;

      li {
        width: 3.25rem;
        height: 4.64rem;
        border: .03rem solid #eeeeee;
        margin-right: .23rem;
        background: #ffffff

        img {
          width: 3.25rem;
        }

        h2 {
          font-size: .28rem;
          padding: 0 .18rem;
          line-height: .42rem;
          height .84rem;
        }

        p {
          font-size: .28rem;
          line-height: .48rem;
          display: flex;
          justify-content space-around;
          color: #666666;
          
          .orange{
            color: #ffae43;
          }
        }
      }
    }
  }


</style>
