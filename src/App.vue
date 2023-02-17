<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
  <div class="mdui-appbar">
  <div class="mdui-toolbar mdui-color-theme">
    <a href="./" class="mdui-btn-icon">
      <img src="./assets/logo.png" height="30px">
    </a>
    <p class="mdui-typo-headline">RootJam</p>
    <div class="mdui-toolbar-spacer"></div>
    <a href="javascript:location.reload()" class="mdui-btn mdui-btn-icon">
      <i class="mdui-icon material-icons">refresh</i>
    </a>
      <button class="mdui-btn mdui-color-theme-accent mdui-ripple" onclick="window.location.href='/register'">注册</button>
  </div>
</div>
<div class="mdui-container">
  <RouterView />
</div>
</template>
