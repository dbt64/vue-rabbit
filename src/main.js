import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 引入初始化样式文件
import "@/styles/common.scss";
import { lazyPlugin } from "@/directives/index";
import App from "./App.vue";
import router from "./router";
import { componentPlugin } from "@/components/index";
const app = createApp(App);
app.use(lazyPlugin);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(componentPlugin);
app.mount("#app");
