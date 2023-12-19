import { createApp } from "vue";
import { createPinia } from "pinia";

// 引入初始化样式文件
import "@/styles/common.scss";

import App from "./App.vue";
import router from "./router";
// 测试我们的接口函数
// import { getCategory } from "@/apis/testAPI";
// getCategory().then((res) => console.log(res));
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
