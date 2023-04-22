<script setup>
import { RouterLink, RouterView } from "vue-router";
import imgUrl from "@/assets/logo.png";
</script>
<template>
  <div class="mdui-appbar">
    <div class="mdui-toolbar mdui-color-theme">
      <a href="./" class="mdui-btn-icon">
        <img :src="imgUrl" height="50" />
      </a>
      <p class="mdui-typo-headline">RootJam</p>
      <div class="mdui-toolbar-spacer"></div>
      <button
        class="mdui-btn mdui-color-theme-accent mdui-ripple"
        onclick="window.location.href='/register'"
      >
        注册/Register
      </button>
    </div>
  </div>
  <div class="mdui-container">
    <RouterView />
  </div>
</template>
