// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    // 1、定义state - cartList
    const cartList = ref([]);
    const count = ref(1);
    // 定义一个action
    const addCart = async (goods) => {
      if (isLogin.value) {
        // 登录之后的加入购物车的逻辑
        await insertCartAPI(goods);
        updateNewList();
      } else {
        // 添加购物车操作
        // 以添加过 - count + 1
        // 没有添加过直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能再cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          // 找到了
          item.count += count.value;
        } else {
          // 没找到
          cartList.value.push(goods);
        }
      }
    };

    // 清楚购物车
    const clearCart = () => {
      cartList.value = [];
    };

    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 调用接口实现接口购车的删除功能
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };

    // 获取最新购物车列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    // 计算属性
    // 总的数量 所有项目的count之和
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    // 总价 所有项的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );
    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项 然后把他的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    // 全选功能
    const allCheck = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选矿状态
      cartList.value.forEach((item) => {
        item.selected = selected;
      });
    };

    // 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    return {
      count,
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      selectedCount,
      selectedPrice,
      clearCart,
      updateNewList,
    };
  },
  {
    persist: true,
  }
);
