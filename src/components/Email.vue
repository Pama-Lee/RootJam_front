<script>
import router from "../router";
import mdui from "mdui";
export default {
  data() {
    return {
      next: false,
      email: "",
      token: "",
      password: "",
      cpassword: "",
      checkPassword: false,
      textClass: {
        "mdui-textfield": true,
        "mdui-textfield-floating-label": true,
        "mdui-textfield-invalid": false,
      },
    };
  },
  mounted() {
    if (this.$cookies.get("email") != this.$route.query.email) {
      router.push("error");
    } else {
      this.email = this.$route.query.email;
      mdui.snackbar({
        message:
          "邮件成功发送,如未收到请检查垃圾箱,重发邮件请返回上一步\nEmail sent successfully, if not please check the dustbin, resend mail please step back",
        buttonText: "上一步/Previous",
        onButtonClick: function () {
          router.back();
        },
        position: "top",
        timeout: 0,
        closeOnOutsideClick: false,
      });
    }
  },
  methods: {
    changeText: function () {
      this.textClass["mdui-textfield-invalid"] = false;
      this.checkPassword = false;
    },
    nexts: function () {
      if (this.cpassword != this.password) {
        this.checkPassword = true;
        this.textClass["mdui-textfield-invalid"] = true;
        return;
      }
      this.sendData(this.email);
    },
    sendData: function (email) {
      this.next = true;
      let time = Date.now().toString().substring(0, 10);
      let password = this.$md5(this.password);
      let pwd = this.$getRsaCode(password);
      this.$axios
        .post("/Register/RegisterXmu", {
          email: email,
          token: this.token,
          password: pwd,
          t: time,
        })
        .then((response) => {
          if (response.data.code == 200 && response.data.status == 1) {
            this.$cookies.set("email", null);
            let appid = this.$cookies.get("appid");
            mdui.alert(
              "注册成功",
              function () {
                if (appid == null) {
                  router.push("error");
                } else {
                  router.push("/login?appid=" + appid);
                }
              },
              { history: false }
            );
          } else {
            this.next = false;
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
      <h1>注册 Register</h1>
      <div class="mdui-divider"></div>
      <div class="mdui-col-sm-10 mdui-col-offset-sm-1">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">email</i>
          <label class="mdui-textfield-label"
            >邮箱验证码|E-mail verification code</label
          >
          <input class="mdui-textfield-input" type="text" v-model="token" />
        </div>
        <div :class="textClass">
          <i class="mdui-icon material-icons">&#xe32a;</i>
          <label class="mdui-textfield-label">设置密码|Password</label>
          <div class="mdui-textfield-error" v-if="checkPassword">
            两次密码不相同|Two passwords are different
          </div>
          <input
            class="mdui-textfield-input"
            type="password"
            v-model="password"
            @input="changeText"
          />
        </div>
        <div :class="textClass">
          <i class="mdui-icon material-icons">&#xe32a;</i>
          <label class="mdui-textfield-label">确认密码|Confirm Password</label>
          <div class="mdui-textfield-error">
            两次密码不相同|Two passwords are different
          </div>
          <input
            class="mdui-textfield-input"
            type="password"
            v-model="cpassword"
            @input="changeText"
          />
        </div>
        <div style="padding-bottom: 20px"></div>
        <button
          id="next"
          class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple"
          @click="nexts"
        >
          下一步|Next Step
        </button>
      </div>
    </div>
  </div>
</template>
