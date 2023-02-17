<script>
import router from '../router'
import cookies from 'vue-cookies'
import mdui from 'mdui'
export default{
    data(){
        return{
            username:"",
            password:"",
        }
    },
    methods:{
        login: function(){
            let username = this.username;
            let password = this.password;
            let time = Date.now().toString().substring(0,10);
            password = this.$md5(password);
            password = this.$md5(time+password+time);
            let pwd = this.$getRsaCode(password);
            this.sendData(username,pwd,time);
        },
        sendData: function(username,password,time){
          let appid = this.$route.query.appid;
      this.$axios.post("/Login/LoginApp",{ username: username, password: password , t:time}).then((response) => {
        if(response.data.code == 200 && response.data.status ==1){
          mdui.alert(response.data.message, function(){
            if(appid == null){
                router.push('/error');
            }else{
              cookies.set('token',response.data.token);
              router.push("/?appid="+appid);
            }
          },{history:false});

              
        }else{
          mdui.alert(response.data.message)
        }
        
      })
    },
    }
}
</script>

<template>
  <div id="Login" class="mdui-row mdui-center" style="padding-top:50px">
    <div class="mdui-col-md-6 mdui-col-offset-md-3 mdui-col-sm-7 mdui-col-offset-sm-2">
        <h1>登陆 LOGIN</h1>
        <div class="mdui-divider"></div>
            <div class="mdui-col-sm-10 mdui-col-offset-sm-1">
        <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">&#xe851;</i>
        <label class="mdui-textfield-label">学号</label>
        <input class="mdui-textfield-input" type="username" v-model="username"/>
</div>
<div class="mdui-textfield mdui-textfield-floating-label">
    <i class="mdui-icon material-icons">&#xe32a;</i>
  <label class="mdui-textfield-label">密码</label>
  <input class="mdui-textfield-input" type="password" v-model="password"/>
</div>
<div style="padding-bottom:20px"></div>
<button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple" @click="login">登陆</button>
</div>
    </div>
  </div>
</template>
