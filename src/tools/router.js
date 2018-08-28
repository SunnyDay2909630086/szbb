import Vue from 'vue';
//引入路由模块
import VueRouter from 'vue-router';

//引入index组件
import index from '../components/index.vue';
import goodsInfo from '../components/goodsInfo.vue';
import buyCar from '../components/buycar.vue';
import payOrder from '../components/payOrder.vue';
import login from '../components/login.vue';
import orderInfo from '../components/orderInfo.vue';
import paySuccess from '../components/paySuccess.vue';
import personalCenter from '../components/personalCenter.vue';
import orderCenter from '../components/orderCenter.vue';
import lookOrder from '../components/lookOrder.vue';

// 引入仓储模块
import store from './store'

//引入公共的axios;
import axios from "axios";
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 设置带上cookie
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

//使用路由中间件npm 
Vue.use(VueRouter);

//注册路由规则
const router = new VueRouter({
    routes: [{
            path: '/',
            component: index
        },
        {
            path: '/index',
            component: index
        },
        {
            path: '/goodsInfo/:id',
            component: goodsInfo
        },
        {
            path: '/buyCar',
            component: buyCar
        },
        {
            path:'/payOrder/:ids',
            component:payOrder,
            meta:{checkLogin:true}
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/orderInfo/:orderid',
            component:orderInfo,
            meta:{checkLogin:true}
        },
        {
            path:'/paySuccess',
            component:paySuccess,
            meta:{checkLogin:true}
        },
        {
            path:'/personalCenter',
            component:personalCenter,
            meta:{checkLogin:true}
        },
        {
            path:'/orderCenter',
            component:orderCenter,
            meta:{checkLogin:true}
        },
        {
            path:'/lookOrder/:orderId',
            component:lookOrder,
            meta:{checkLogin:true}
        },

    ]
});
// 注册路由守卫(每次路由跳转时 增加的过滤规则)
router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    // console.log(next)
    // 把来时的路径提交到仓库中的方法
    store.commit('rememberFromPath',from.path);
    if(to.meta.checkLogin){
        axios.get("site/account/islogin")
        .then(response=>{
            console.log(response);
            if(response.data.code=="nologin"){
                console.log('没登录');
                next('/login');
            }else{
                next();
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }else{
        next();
    }
});
export default router;