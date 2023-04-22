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
      forgot_email: "",
      sending_forgot: false,
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
    forgot: function () {
      // 弹出输入邮件对话框
      const dialog = new mdui.Dialog("#forgot");
      dialog.open();

      // 点击发送按钮
      document.getElementById("forgot_submit").onclick = () => {
        this.sending_forgot = true;
        let email = this.forgot_email;
        this.$axios.post("/Login/Forgot", { email: email }).then((response) => {
          if (response.data.code == 200 && response.data.status == 1) {
            dialog.close();
            mdui.alert(
              "我们已经向您的邮箱发送了一封邮件，请点击邮件中的链接重置您的密码。|We have sent an email to your mailbox. Please click the link in the email to reset your password.",
              function () {
                
              },
              { history: false }
            );
          } else {
            mdui.alert(response.data.message);
            this.sending_forgot = false;
          }
        });
      };
    },
  },
};
</script>

<template>
  <div class="mdui-dialog" id="forgot">
    <div class="mdui-dialog-title">忘记密码 Forgot Password</div>
    <div style="padding: 30px">
      <div class="mdui-textfield">
        <label class="mdui-textfield-label">Email</label>
        <input class="mdui-textfield-input" type="email" v-model="forgot_email" />
      </div>
      <button
        class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right"
        id="forgot_submit"
        :disabled="sending_forgot"
      >
        发送 Send
      </button>
      <div class="mdui-clearfix"></div>
    </div>
  </div>
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
        <div style="margin-top: 50px"></div>
        <a
          target="_blank"
          class="mdui-color-pink"
          style="padding: 5px"
          @click="forgot"
          >忘记密码 | Forgot Your Password?</a
        >
      </div>
    </div>
  </div>
</template>
