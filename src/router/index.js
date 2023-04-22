import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/IndexView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/email",
      name: "email",
      component: () => import("../views/EmailView.vue"),
    },
    {
      path: "/pay",
      name: "pay",
      component: () => import("../views/PayView.vue"),
    },
    {
      path: "/error",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () => import("../views/ForgotView.vue"),
    },
  ],
});

export default router;
