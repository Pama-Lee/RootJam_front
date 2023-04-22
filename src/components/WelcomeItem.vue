<script>
import router from "../router";
import mdui from "mdui";

export default {
  data() {
    return {
      recall: null,
    };
  },
  name: "WelcomeItem",
  methods: {
    getApp() {
      let appid = this.$route.query.appid;
      this.$axios
        .post("/App/AppInfo", { method: "appid", appid: appid })
        .then((response) => {
          if (response.data.code == 200 && response.data.status == 1) {
            this.login(response.data.appInfo.recall);
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
    join() {
      mdui.alert(
        "如果您想将您的应用加入到这里，请联系Ministry of CODE: join@mocd.cc <br><br> If you want to join your application to here, please contact Ministry of CODE: join@mocd.cc",
        "加入开发者|Join the developer"
      );
    },
    login: function (recall) {
      //let token1 = this.$cookies.set("token","123");
      let token = this.$cookies.get("token");
      if (token == null) {
        let appid = this.$route.query.appid;
        mdui.alert(
          "您还未登陆|You have not login",
          function () {
            router.push({
              name: "login",
              query: {
                appid: appid,
              },
            });
          },
          { history: false }
        );
      } else {
        this.sendData(recall);
      }
    },
    sendData: function (recall) {
      let appid = this.$route.query.appid;
      let token = this.$cookies.get("token");
      this.$axios
        .post("/Login/LoginToken", { token: token })
        .then((response) => {
          if (response.data.code == 200 && response.data.status == 1) {
            //window.open(recall+"?token="+token,"_blank");
            window.location.href = recall + "?token=" + token;
          } else {
            this.$cookies.remove("token");
            mdui.alert(
              "登陆失效|Logon failure",
              function () {
                router.push({
                  name: "login",
                  query: {
                    appid: appid,
                  },
                });
              },
              { history: false }
            );
          }
        });
    },
  },
};
</script>

<template>
  <div>
    <div
      class="mdui-row mdui-col-md-6 mdui-col-offset-md-3"
      style="padding-top: 50px"
    >
      <div class="mdui-col-xs-4">
        <div id="logo">
          <slot name="AppLogo"></slot>
        </div>
      </div>
      <div class="mdui-col-xs-8">
        <h1 id="AppName">
          <slot name="AppName"></slot>
        </h1>
        AppID:
        <slot name="AppId"></slot>
        <slot></slot>
        <div style="padding-top: 30px">
          <button
            @click="getApp"
            class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple"
          >
            确认登陆|Login
          </button>
        </div>
      </div>
    </div>
    <div id="footer">
      <div class="mdui-divider"></div>
      <div class="mdui-row">
        <div class="mdui-col-xs-6">
          <img
            src="https://img.mjj.today/2023/04/08/07845ab971e5393c957f013006ff1d91.png"
            style="height: 40px"
          />
        </div>
        <div class="mdui-col-xs-6">
          <button
            @click="join"
            class="mdui-btn mdui-color-theme mdui-btn-dense mdui-ripple"
          >
            接入RootJam
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
