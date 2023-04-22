import { createApp } from "vue";
import { createPinia } from "pinia";
import mdui from "mdui";
import VueCookies from "vue-cookies";
import axios from "axios";
import VueAxios from "vue-axios";
import md5 from "js-md5";

import App from "./App.vue";
import router from "./router";

import "./assets/css/mdui.min.css";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"; // 设置数据传输类型
axios.defaults.baseURL = "https://api.pamalee.cn/";
axios.defaults.withCredentials = false; // 跨域请求
import JSEncrypt from "jsencrypt";

const app = createApp(App);

app.use(createPinia());
app.use(router);
router.beforeEach(function (to, from, next) {
  if (VueCookies.get("token") == null) {
    //满足一定的条件再跳转
    if (to.path == "/pay") {
      mdui.alert("请先登陆", function () {
        next("/");
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
// 设置cookie过期时间
VueCookies.config("7d");

app.use(VueCookies);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$mdui = mdui;
app.config.globalProperties.$md5 = md5;
app.config.globalProperties.$getRsaCode = function (str) {
  // 注册方法
  let pubKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA63zr/JAe6i8y7lcDPdif
    YOKseFj3Hthjy2PJduVOsH+ENh21dAPUK/yWtbHgxoFv+RoaUCDxb0Epuie/n/30
    zNCnlM6cXvjYGrdfQaIbgc6Z8q1z4RBjyzgRq6FMZ12SxohjYYYrHBxcf4rSBP3P
    iwTPW5w7dt1w/bNKXR2YdEmpTn9Nn0zqYIhjhEIx65iogMTiZ87A2oOvG1JVMYrh
    f8sY/ISP8SGGwekvaP0BzRmtN4cCwMtkELYX6gZt1WbYQVrk5Xxq1jhzP3BL/tK9
    COXHY3kHZHCTOKSzEq+cxK1BMrdaP1DCvO0lqng9JkmfAdM2Wv7waSsMDOEO1aJd
    3wIDAQAB
    -----END PUBLIC KEY-----
    `; // ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString()); // 进行加密
  return data;
};

app.mount("#app");
