// 引入Vue
import Vue from "vue";
//引入ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入懒加载
import VueLazyload from "vue-lazyload";
import moment from "moment";
// import path from 'path';
//引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//引入ui中间件
Vue.use(ElementUI);
//使用懒加载中间件
Vue.use(VueLazyload, {
    loading: require('../assets/images/01.gif')
});
//view中间件
Vue.use(iView);
//过滤器
Vue.filter("cutTime", function(value,myFormat) {
    if(myFormat){
        return moment(value).format(myFormat);
    }else{
         // return value.slice(0,10);
        return moment(value).format("YYYY-MM-DD");
    }
   
});


