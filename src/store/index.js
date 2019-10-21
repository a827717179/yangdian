import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);



const store = new Vuex.Store({
  state:{
    arr:[],
  },
  mutations:{
    Xadd(state,obj){
      console.log(obj);

      state.arr.push(obj)
    }
  },
  actions:{
    Xadd(store,obj){
      store.commit('Xadd',obj)
    }
  },


});

export default store
