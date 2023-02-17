<script>
import router from '../router';
import WelcomeItem from './WelcomeItem.vue'
import mdui from 'mdui'
export default{
  components:{
      WelcomeItem
  },
  data(){
    return{
      AppLogo:null,
      AppName:null,
      AppId:null,
      AppDes:null,
      AppRecall:null
    }
  },
  updated(){
    this.getApp();
  },
    mounted(){
       this.getApp();
    },
    methods:{
      getApp(){
        let appid = this.$route.query.appid;
        this.$axios.post("/App/AppInfo",{method:'appid',appid:appid}).then((response)=>{
          if(response.data.code == 200 && response.data.status == 1){
            this.AppName = response.data.appInfo.appName;
            this.AppId = response.data.appInfo.appid;
            this.AppDes = response.data.appInfo.appDes;
            this.AppRecall =response.data.appInfo.recall;
            this.$cookies.set('appid',appid);
          }else{
            mdui.alert(response.data.message, function(){
            router.push("/error");
          },{history:false,modal:true});
          }
        })
      }
    }     
    }
    export{WelcomeItem};

</script>

<template>
  <WelcomeItem>
    <template #AppLogo>
     <img src="../assets/logo.png" class="mdui-img-fluid mdui-img-rounded" style="">
    </template>
    <template #AppName>{{AppName}}</template>
    <template #AppId>{{AppId}}</template>
    {{AppDes}}
  </WelcomeItem>
</template>
