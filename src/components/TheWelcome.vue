<script>
import router from "../router";
import WelcomeItem from "./WelcomeItem.vue";
import mdui from "mdui";
export default {
  components: {
    WelcomeItem,
  },
  data() {
    return {
      AppLogo: null,
      AppName: null,
      AppId: null,
      AppDes: null,
      AppRecall: null,
      isLogin: false,
    };
  },
  updated() {
    this.getApp();
  },
  mounted() {
    this.getApp();
    // 如果存在token的cookie
    if (this.$cookies.isKey("token")) {
      this.isLogin = true;
    }
  },
  methods: {
    getApp() {
      // 如果存在action参数
      if (this.$route.query.action == "logout") {
        // 弹出确认框
        mdui.confirm(
          "确定要退出登录吗？<br> Are you sure you want to log out?",
          function () {
            // 点击确认后，清除所有cookie
            document.cookie.split(";").forEach(function (c) {
              document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            return;
          },
          function () {},
          { history: false, modal: true }
        );
      }

      let appid = this.$route.query.appid;
      this.$axios
        .post("/App/AppInfo", { method: "appid", appid: appid })
        .then((response) => {
          if (response.data.code == 200 && response.data.status == 1) {
            this.AppName = response.data.appInfo.appName;
            this.AppLogo = response.data.appInfo.logo;
            this.AppId = response.data.appInfo.appid;
            this.AppDes = response.data.appInfo.appDes;
            this.AppRecall = response.data.appInfo.recall;
            this.$cookies.set("appid", appid);
          } else {
            mdui.alert(
              response.data.message,
              function () {
                router.push("/error");
              },
              { history: false, modal: true }
            );
          }
        });
    },
  },
};
export { WelcomeItem };
</script>

<template>
  <WelcomeItem>
    <template #AppLogo>
      <img :src="AppLogo" class="mdui-img-fluid mdui-img-rounded" style="" />
    </template>
    <template #AppName>{{ AppName }}</template>
    <template #AppId>{{ AppId }}</template>
    {{ AppDes }}
  </WelcomeItem>
</template>

<style scoped>
#LoginSuccess {
  padding-top: 100px;
}
</style>