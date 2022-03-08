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
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("../pages/UserProfile.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../pages/AppAbout.vue"),
      },
      {
        path: "/users",
        name: "users-list",
        component: () => import("../pages/users/UserList.vue"),
      },
      {
        path: "/users/create",
        name: "user-create",
        component: () => import("../pages/users/UserCreate.vue"),
      },
      {
        path: "/users/:id/edit",
        name: "user-edit",
        component: () => import("../pages/users/UserEdit.vue"),
      },
      {
        path: "/roles",
        name: "roles-list",
        component: () => import("../pages/roles/RoleList.vue"),
      },
      {
        path: "/roles/create",
        name: "role-create",
        component: () => import("../pages/roles/RoleCreate.vue"),
      },
      {
        path: "/roles/:id/edit",
        name: "role-edit",
        component: () => import("../pages/roles/RoleEdit.vue"),
      },
      {
        path: "/products",
        name: "products-list",
        component: () => import("../pages/products/ProductList.vue"),
      },
      {
        path: "/products/create",
        name: "product-create",
        component: () => import("../pages/products/ProductCreate.vue"),
      },
      {
        path: "/products/:id/edit",
        name: "product-edit",
        component: () => import("../pages/products/ProductEdit.vue"),
      },
      {
        path: "/orders",
        name: "orders-list",
        component: () => import("../pages/orders/OrderList.vue"),
      },
      /* {
        path: "/products/create",
        name: "product-create",
        component: () => import("../pages/products/ProductCreate.vue"),
      },
      {
        path: "/products/:id/edit",
        name: "product-edit",
        component: () => import("../pages/products/ProductEdit.vue"),
      },*/
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
