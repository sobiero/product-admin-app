import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import LoggedInWrapperVue from "@/pages/LoggedInWrapper.vue";
import Home from "../pages/HomeDashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/UserRegister.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/UserLogin.vue"),
  },
  {
    path: "",
    name: "loggedinwrapper",
    component: LoggedInWrapperVue,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../pages/AppAbout.vue"),
      },
      {
        path: "/users",
        name: "users",
        component: () => import("../pages/users/UserList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
