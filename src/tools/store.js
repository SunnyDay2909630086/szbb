import Vue from 'vue';
//引入vuex状态管理模式(数据同步)
import Vuex from 'vuex';

//vue中间件
Vue.use(Vuex);

//实例化一个vuex的仓库
const store = new Vuex.Store({
    //数量
    state: {
        buyList: JSON.parse(window.localStorage.getItem('buyList')) || {},
        isLogin:false,
        fromPath:''
    },
    getters: {
        totalCount(state) {
            let num = 0;
            for (const key in state.buyList) {
                //累加总数
                num += parseInt(state.buyList[key]);
            }
            return num;
        }
    },
    mutations: {
        buyGood(state, info) {
            if (state.buyList[info.goodId]) {
                //商品id对应的数量值
                let oldNum = parseInt(state.buyList[info.goodId]);
                //有 就累加
                oldNum += parseInt(info.goodNum);
                state.buyList[info.goodId] = oldNum;
            } else {
                //     // 没有值就赋值
                //     // state.buyList[info.goodId] = info.goodNum;
                Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
            }
        },
        changeCount(state,info){
            //更新某个ID对应得数值
            state.buyList[info.goodId]=info.goodNum;
        },
        delGoodById(state,id){
            Vue.delete(state.buyList,id);
        },
        changeLogin(state,isLogin){
            state.isLogin=isLogin;
        },
        rememberFromPath(state,path){
            state.fromPath=path;
        }
    }
});

//vuex数据常驻到localstorage
window.onbeforeunload = function() {
    window.localStorage.setItem('buyList', JSON.stringify(store.state.buyList));
}

// 暴露 store
export default store;