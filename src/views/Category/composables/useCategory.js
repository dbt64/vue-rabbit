// 分装分类数据业务相关代码
import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
export function useCategory() {
  // 获取数据
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };

  onBeforeRouteUpdate((to) => {
    // 存在的问题：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id);
  });

  onMounted(() => {
    getCategory();
  });

  return {
    categoryData,
  };
}
