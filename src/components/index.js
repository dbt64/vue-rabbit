// 把components中的所有组件都进行全局化注册
import imagesView from "./imagesView/index.vue";
export const componentPlugin = {
  install(app) {
    app.component("ImagesView", imagesView);
  },
};
