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
    // 如果参数中没有token
    if (this.$route.query.token == null) {
      router.push("error");
    } else {
      // 检查token是否有效
      this.$axios
        .post("/Login/Forgot", {
          action: "check",
          token: this.$route.query.token,
        })
        .then((response) => {
          if (response.data.code != 200 && response.data.status != 1) {
            router.push("error");
          }
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
      this.sendData();
    },
    sendData: function () {
      this.next = true;
      let time = Date.now().toString().substring(0, 10);
      let password = this.$md5(this.password);
      let pwd = this.$getRsaCode(password);
      this.$axios
        .post("/Login/Forgot", {
          token: this.$route.query.token,
          password: pwd,
          t: time,
          action: "reset",
        })
        .then((response) => {
          if (response.data.code == 200 && response.data.status == 1) {
            mdui.alert(
              "重置成功",
              function () {
                router.push("index");
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
      <h1>重置密码 | Reset Password</h1>
      <div class="mdui-divider"></div>
      <div class="mdui-col-sm-10 mdui-col-offset-sm-1">
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
          确定 | Confirm
        </button>
      </div>
    </div>
  </div>
</template>
