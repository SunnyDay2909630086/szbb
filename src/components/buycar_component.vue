<template>
    <div class="numControl">
        <span class="sub" :class="{disabled:mycount==min}" @click="sub">-</span>
        <input type="number" v-model="mycount" >
        <span class="add" :class="{disabled:mycount==max}" @click="add">+</span>
    </div>
</template>
<script>
    export default{
        props:['count','max','min'],
        data:function(){
            return {
                mycount:0
            }
        },
        created(){
            this.mycount=this.count;
        },
        methods:{
            sub(){
                if(this.mycount==this.min){
                    return;
                }
                this.mycount--;
                this.$emit("change",this.mycount);
            },
            add(){
                if(this.mycount==this.max){
                    return;
                }
                this.mycount++;
                this.$emit("change",this.mycount);
            }
        }
    }
</script>
<style scoped lang="scss"> 
    .numControl {
  display: flex;
  span {
    border: 1px solid #000;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    // 当 span被禁用时的样式
    &.disabled {
      // 不被允许
      cursor: not-allowed;
    }
  }
  input {
    width: 80px;
    border: 1px solid #000;
  }
}
</style>

