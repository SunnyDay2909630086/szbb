<template>
    <div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="this.imglist.length!=0">
                                <ProductZoomer
                                    :baseImages="images"
                                    :base-zoomer-options="zoomerOptions"
                                ></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==1}">
                                                        <i class="el-icon-minus" @click="buyNum==1?1:buyNum--"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase" :class="{'is-disabled':buyNum==goodsinfo.stock_quantity}">
                                                        <i class="el-icon-plus" @click="buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buyNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="isShowDesc" :class="{selected:isShowDesc}" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" style="display: block;">
                                内容
                            </div>
                            <div class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="error" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li>
                                            <div class="avatar-box">
                                               <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220"> 
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item,index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodsInfo/`+item.id">{{item.title}}</router-link>
                                           <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>                                                              
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 去顶部 -->
        <BackTop></BackTop>
        <!-- 加入购物车的小图片 -->
        <img class="moveImg" v-if="imglist.length!=0" style="display:none" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
    // 引入轮播图组件
    import ProductZoomer from 'vue-product-zoomer';
    import $ from 'jquery';

    export default {
        name: "goodsinfo",
        data: function() {
            return {
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                isShowDesc: true,
                //轮播图数据
                images: {
                    normal_size: []
                },
                //轮播图的配置
                zoomerOptions: {
                    zoomFactor: 3,
                    pane: 'pane',
                    hoverDelay: 300,
                    namespace: 'zoomer',
                    move_by_click: false,
                    scroll_items: 7,
                    choosed_thumb_border_color: "#dd2c00"
                },
                //购买数量
                buyNum: 1
            }
        },
        methods: {
            getgoodsinfo() {
                // 强制初始化
                this.imglist = [];
                // 清空预览图片的数组
                this.images.normal_size = [];
                this.axios(`site/goods/getgoodsinfo/${this.$route.params.id}`)
                    .then(response => {
                        // console.log(response);
                        this.goodsinfo = response.data.message.goodsinfo;
                        this.hotgoodslist = response.data.message.hotgoodslist;
                        this.imglist = response.data.message.imglist;
                        this.imglist.forEach((v, i) => {
                            this.images.normal_size.push({
                                id: v.id,
                                url: v.original_path
                            });
                        });
                    })
                    .catch(error => {})
            },
            error() {
                this.$Message.error('This is an error tip');
            },
            cartAdd() {

                // 获取按钮的位置 
                let offset = $('#buyButton .add').offset();
                // console.log(offset);//输出的是top和left的值
                //获取购物车的位置
                let cartOffset = $('.icon-cart').offset();
                // console.log(cartOffset);
                $('.moveImg').show().addClass('move').css(offset).animate(cartOffset, 1000, () => {
                    $('.moveImg').removeClass('move').hide();
                });
                this.$store.commit('buyGood', {
                    goodId:this.$route.params.id, // 商品id
                    goodNum:this.buyNum });
            }
        },
        // 注册组件
        components: {
            ProductZoomer
        },
        // 生命周期函数
        beforeCreate() {

        },
        created() {
            // console.log(this);
            this.getgoodsinfo();
            console.log(this.$store);
        },
        beforeMount() {

        },
        mounted() {},
        watch: {
            //to新值  from老值
            $route(to, from) {
                // 对路由变化作出响应...
                // console.log(to);
                // console.log(from);
                this.getgoodsinfo();
            }
        }
    };
</script>
<style>
    /* 引入字体图标 */
    
    @import url("../../node_modules/font-awesome/css/font-awesome.min.css");
    .zoomer-zoomer-box {
        width: 368px;
    }
    
    .pic-box .control-box .thumb-list {
        display: flex;
    }
    
    .thumb-list img {
        height: 78px;
        width: 78px;
        margin: 5px;
    }
    
    .control i {
        text-align: center;
    }
    
    .moveImg {
        width: 40px;
        /* height: 30px; */
        position: absolute;
        top: 0;
        right: 50px;
        background-color: red;
    }
    
    .moveImg.move {
        /* transform: scale(.5,.5) rotateZ(3600deg); */
        opacity: .4;
        transition: transform 1s, opacity 1s;
    }
</style>