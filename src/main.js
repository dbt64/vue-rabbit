import { createApp } from "vue";
import { createPinia } from "pinia";

// 引入初始化样式文件
import "@/styles/common.scss";
import { lazyPlugin } from "@/directives/index";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.use(lazyPlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");
