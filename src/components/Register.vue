<script>
import router from '../router'
import mdui from 'mdui'
export default{
    data(){
        return{
            email:"",
            buttonStatus:false
        }
    },
    methods:{
        next:function(){
            this.buttonStatus = true;
            this.sendData(this.email);
        },
        sendData: function(email){
      this.$axios.post("/Register/RegisterXmu",{ email: email}).then((response) => {
        if(response.data.code == 200 && response.data.status ==1){
            this.$cookies.set('email',email);
            router.push({name:'email',query:{email:email}});
        }else{
            mdui.alert(response.data.message)
            this.buttonStatus = false;
        }
      })
    },
    }
}
</script>

<template>
  <div id="Login" class="mdui-row mdui-center" style="padding-top:50px">
    <div class="mdui-col-md-6 mdui-col-offset-md-3 mdui-col-sm-7 mdui-col-offset-sm-2">
        <h1>注册 Register</h1>
        <div class="mdui-divider"></div>
            <div class="mdui-col-sm-10 mdui-col-offset-sm-1">
        <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">email</i>
        <label class="mdui-textfield-label">校园邮箱[学号@xmu.edu.my/cn]</label>
        <input class="mdui-textfield-input" type="email" v-model="email"/>
</div>
<div style="padding-bottom:20px"></div>
<button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple" @click="next" :disabled="buttonStatus">下一步</button>
</div>
    </div>
  </div>
</template>
