<script>
import mdui from 'mdui'
import router from '../router'
export default{
    data(){
        return{
            username:'underfind',
            own:'',
            money:1,
            wechat_img:'',
            buttonPay:false
        }
    },
    mounted:function(){
        this.getUserInfo();
    },
    methods:{
        wechat:function(){
            if(this.money != ''){
                this.sendPayRequest();
                this.buttonPay = true;
            }else{
                mdui.alert('请填写金额');
                this.money = 1;
            }
        },
        getUserInfo: function(){
            let token = this.$cookies.get('token');
            this.$axios.post("/Pay/GetInfo",{token: token}).then((response) => {
        if(response.data.code==200 && response.data.status==1){
          this.username = response.data.user;
          this.own = response.data.money;
        }else{
          mdui.alert(response.data.message);
        }
      })
        },
        sendPayRequest:function(){
            let token = this.$cookies.get('token');
            this.$axios.post("/Pay/GetPay",{token: token,RM:this.money}).then((response) => {
        if(response.data.code==200 && response.data.status==1){
          this.wechat_img = response.data.url;
          this.$cookies.set('bill',response.data.order);
          setTimeout(this.getStatus,2500)
        }else{
          mdui.alert(response.data.message);
        }
      })
        },
        getStatus:function(){
            let bill = this.$cookies.get('bill');
            this.$axios.post("/Pay/GetStatus",{bill: bill}).then((response) => {
        if(response.data.code==200 && response.data.status==1){
            this.$cookies.set('bill',null);
          mdui.alert('支付成功!',function(){
            location.reload();
            router.push('/pay');
          },{history:false});
        }else{
            setTimeout(this.getStatus,2500)
        }
      })
        },
    }
}
</script>

<template>
    <div class="mdui-container">
    <div class="mdui-col-md-6 mdui-col-offset-md-3" style="padding-top: 75px">

        <h1 style="text-align: center">充值</h1>
        <h3>请使用电脑/平板打开此界面充值,此界面的支付二维码无法截图后在微信支付,请使用手机扫码</h3>
        <div id="pay">
                <input type="hidden" id="g-recaptcha-response" name="rec">
                <h2>用户:{{username}}</h2>
                <h2>余额:{{own}}</h2>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">attach_money</i>
                    <label class="mdui-textfield-label">RM</label>
                    <input class="mdui-textfield-input" type="text" v-model="money"/>
                </div>
                <input class="mdui-textfield-input" type="text" required value="1" name="money" id="money_1" hidden/>
                <button class="mdui-btn mdui-color-theme-accent mdui-ripple" disabled>支付宝(暂不开放)</button>
                <button class="mdui-btn mdui-color-theme mdui-ripple" id="submit_wechat" @click="wechat" :disabled="buttonPay">微信</button>
            <img :src="wechat_img" id="wechat_pay">
        
        </div>
    </div>

</div>


</template>