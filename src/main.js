import Vue from 'vue';
import App from './App.vue';
// 引入自己封装的router
import router from './tools/router';
// 引入第三方包
import './tools/libs';
// 引入Vuex相关
import store from './tools/store';

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    store,
    beforeCreate(){
        this.axios.get('/site/account/islogin')
        .then(response=>{
            store.state.isLogin=response.data.code=="logined";
        })
        .catch(err=>{
            console.log(err);
        })
    }
});

