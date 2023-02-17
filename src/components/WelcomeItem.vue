
<script>
import router from '../router';
import mdui from 'mdui'

export default{
  data(){
  return{
    recall:null
  }
  },
  name:"WelcomeItem",
  methods:{
    getApp(){
        let appid = this.$route.query.appid;
        this.$axios.post("/App/AppInfo",{method:'appid',appid:appid}).then((response)=>{
          if(response.data.code == 200 && response.data.status == 1){
            this.login(response.data.appInfo.recall)
          }else{
            mdui.alert(response.data.message, function(){
            router.push("/error");
          },{history:false,modal:true});
          }
        })
      },
    login: function(recall){
      //let token1 = this.$cookies.set("token","123");
      let token = this.$cookies.get("token");
      if(token==null){
          let appid = this.$route.query.appid;
          mdui.alert('您还未登陆', function(){
            router.push({
              name: 'login',
              query:{
                appid: appid
              }
            });
          },{history:false});

      }else{
        this.sendData(recall);
      }
    },
    sendData: function(recall){
      let appid = this.$route.query.appid;
      let token = this.$cookies.get('token')
      this.$axios.post("/Login/LoginToken",{ token: token }).then((response) => {
        if(response.data.code==200 && response.data.status==1){
          mdui.alert("登陆成功!",function(){
            window.open(recall+"?token="+token,"_blank");
          });
        }else{
          this.$cookies.remove('token')
          mdui.alert("登陆失效",function(){
            router.push({
              name: 'login',
              query:{
                appid: appid
              }
            });
          },{history:false})
        }
      })
    },
  }
}
</script>



<template>
  <div>
    <div class="mdui-row" style="padding-top:50px">
      <div class="mdui-col-xs-4 mdui-col-sm-3 mdui-col-offset-sm-1 mdui-col-md-2 mdui-col-offset-md-3">
        <div id="logo">
    
    <slot name="AppLogo"></slot>
    </div>
      </div>
      <div class="mdui-col-sm-4">
        <h1 id="AppName">
        <slot name="AppName"></slot>
      </h1>
      <h3>AppID:
        <slot name="AppId"></slot>
      </h3>
      <slot></slot>
      <div style="padding-top:30px"><button @click="getApp" class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple">确认登陆</button></div>
    </div>
      </div>
</div>
</template>
