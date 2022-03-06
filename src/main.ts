import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.110.110:8000/api/";
axios.defaults.withCredentials = true;

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.use(createPinia());
app.use(router);

app.mount("#app");
