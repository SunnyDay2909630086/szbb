<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <router-link to="/buyCar">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 有数据时显示 -->
                                <tr v-if="message&&message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 没数据时显示 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <!-- <el-input-number v-model="item.buycount" @change="Change($event,index)" size="mini" :min="1" :max="10" label="描述文字"></el-input-number> -->
                                        <!-- 使用自己的组件进行替代 -->
                                        <numControl @change="change($event,index)" :count="item.buycount" max="100" min="1"></numControl>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="delIndex=index;showModal=true" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button @click="toPayOrder" class="submit" >立即结算</button>
                                                     
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <Modal v-model="showModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>警告</span>
            </p>
            <div style="text-align:center">
                <p>你确定要删掉他</p>
            </div>
            <div slot="footer">
                <Row>
                    <Col span="12">
                    <Button type="success" size="large" long @click="showModal=false">取消</Button>
                    </Col>
                    <Col span="12">
                    <Button type="error" size="large" long @click="del">删除</Button>
                    </Col>
                </Row>

            </div>
        </Modal>
   </div>
</template>
<script>
    import numControl from "./buycar_component";
    export default{
        name:"buycar",
        data:function(){
            return {
                message:undefined,
                showModal: false,
                delIndex: 0
            }
        },
        created() {
            this.$Spin.show();
            // console.log(this.$store.state.buyList);
            let buyList = this.$store.state.buyList;
            let ids = "";
            for (const key in buyList) {
                ids += key;
                ids += ",";
            }
           
            if(ids==""){
                setTimeout(()=>{
                    this.message=[];
                    this.$Spin.hide();
                },500);
                return;
            }
            // 最后多了一个 ,
            ids = ids.slice(0, -1);
            // console.log(ids);

            this.axios.get(`site/comment/getshopcargoods/${ids}`)
            .then(response=>{
                // console.log(response);
                //vue默认是跟踪不了新增的动态数据的，要先初始化好才赋值
                response.data.message.forEach((v,i)=>{
                    v.buycount=buyList[v.id];
                    v.isSelected=true
                });
                 this.message = response.data.message;
                 setTimeout(()=>{
                     this.$Spin.hide();
                 },500)
            })
            .catch(err=>{
                console.log(err);
            });
        },
        computed:{
            // 选中的商品数
            selectedCount(){
                let totalCount=0;
                if(this.message==undefined) return totalCount;
                this.message.forEach(v=>{
                    if(v.isSelected) totalCount+=v.buycount;
                });
                return totalCount;
            },
            totalPrice(){
                let price=0;
                if(this.message==undefined) return price;
                this.message.forEach(v=>{
                    if(v.isSelected) price+=v.buycount*v.sell_price;
                });
                return price;
            }
        },
        methods:{
            //更新数量
            change(count,index){
                this.message[index].buycount=count;
                // 把对象添加到vuex仓库里的changeCount方法中
                this.$store.commit('changeCount',{
                    goodId:this.message[index].id,
                    goodNum:count
                })
            },
            del(){
                // console.log(this.delIndex);
                this.$store.commit('delGoodById',this.message[this.delIndex].id);
                this.message.splice(this.delIndex,1);
                this.showModal=false;

            },
            toPayOrder(){
                let ids="";
                this.message.forEach(v=>{
                    if(v.isSelected){
                        ids+=v.id;
                        ids+=",";
                    }
                });
                if(ids==""){
                    this.$message({
                        message:"请至少选择一个商品",
                        duration:1000
                    });
                    return;
                }
                ids=ids.slice(0,-1);
                this.$router.push('/payOrder/'+ids);
            }
        },
        // 注册组件
        components:{
            numControl
        }

        
    }
</script>

<style scoped>

</style>
