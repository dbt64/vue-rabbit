// 封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    // 1、定义state - cartList
    const cartList = ref([]);
    const count = ref(1);
    // 定义一个action
    const addCart = (goods) => {
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
    };
    return {
      count,
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);
