<template>
  <div class="Today">
    <div class="title">
      <h2>{{title}}</h2>
      <img src="../../assets/images/hot.png" alt="">
    </div>
    <ul class="foods">
      <li v-for="(item,index) in list" :key="index" @click="ToDetails(item.id)">
        <img :src="item.thumbnail" alt="">
        <p><span>￥{{item.reduct_price}}.00</span><span class="orange">￥{{item.original_price}}.00</span></p>
        <h2>{{item.name}}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Today",
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
        this.title = res.data.data[0].name;
        this.list = res.data.data[0].list
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .Today {
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
        left: .23rem;
        width: .29rem;
        height: .38rem;
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
          line-height: .47rem;
          color: #666666;
          height .84rem;
        }

        p {

          line-height: .42rem;
          font-size: .28rem;
          color: #e60012;
          display: flex;
          justify-content space-around
          .orange{
            font-size: .24rem;
            color: #666666;
            text-decoration:line-through;
            text-decoration-color:#666666;
          }
        }
      }
    }
  }


</style>
