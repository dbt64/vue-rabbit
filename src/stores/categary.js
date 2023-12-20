import { ref } from "vue";
import { defineStore } from "pinia";
import { getCatgoryAPI } from "@/apis/layout";

export const useCategoryStore = defineStore("category", () => {
  // 导航列表的数据管理
  // state 导航列表数据
  const categoryList = ref([]);

  // action 获取导航数据的方法
  const getCatgary = async () => {
    const res = await getCatgoryAPI();
    categoryList.value = res.result;
  };

  return {
    getCatgary,
    categoryList,
  };
});
