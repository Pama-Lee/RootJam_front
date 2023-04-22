<script>
import router from "../router";
import cookies from "vue-cookies";
import mdui from "mdui";
import axios from "axios";
axios.defaults.withCredentials = false; // 跨域请求
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let username = this.username;
      let password = this.password;
      let time = Date.now().toString().substring(0, 10);
      password = this.$md5(password);
      password = this.$md5(time + password + time);
      let pwd = this.$getRsaCode(password);
      let method = "rootjam";
      this.sendData(username, pwd, time, method);
    },
    loginXmum: function () {
      let username = this.username;
      let password = this.password;
      let time = Date.now().toString().substring(0, 10);
      let pwd = this.$getRsaCode(password);
      let method = "xmum";
      this.sendData(username, pwd, time, method);
    },
    sendData: function (username, password, time, method) {
      let appid = this.$route.query.appid;
      this.$axios
        .post("/Login/LoginApp", {
          method: method,
          username: username,
          password: password,
          t: time,
        })
        .then((response) => {
          if (response.data.code == 200 && response.data.status == 1) {
            mdui.alert(
              response.data.message,
              function () {
                if (appid == null) {
                  router.push("/error");
                } else {
                  cookies.set("token", response.data.token);
                  router.push("/?appid=" + appid);
                }
              },
              { history: false }
            );
          } else {
            mdui.alert(response.data.message);
          }
        });
    },
  },
};
</script>

<template>
  <div id="Login" class="mdui-row mdui-center" style="padding-top: 50px">
    <div
      class="mdui-col-md-6 mdui-col-offset-md-3 mdui-col-sm-7 mdui-col-offset-sm-2"
    >
      <h1>登陆 LOGIN</h1>
      <div class="mdui-divider"></div>
      <div class="mdui-col-sm-10 mdui-col-offset-sm-1">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">&#xe851;</i>
          <label class="mdui-textfield-label">学号/Student ID</label>
          <input
            class="mdui-textfield-input"
            type="username"
            v-model="username"
          />
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">&#xe32a;</i>
          <label class="mdui-textfield-label">密码/Password</label>
          <input
            class="mdui-textfield-input"
            type="password"
            v-model="password"
          />
        </div>
        <div style="padding-bottom: 10px; text-align: right"></div>

        <div class="mdui-row">
          <div class="mdui-col-xs-4">
            <h4>登录方式<br />Login Method</h4>
          </div>
          <div class="mdui-col-xs-8">
            <div class="mdui-divider mdui-m-t-3"></div>
          </div>
        </div>
        <div class="mdui-row">
          <div class="mdui-col-xs-6">
            <button
              class="mdui-btn mdui-center mdui-color-theme-accent mdui-ripple"
              @click="login"
            >
              RootJam
            </button>
          </div>
          <div class="mdui-col-xs-6">
            <button
              class="mdui-btn mdui-center mdui-color-light-blue-700 mdui-ripple"
              @click="loginXmum"
            >
              XMUM ID
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
