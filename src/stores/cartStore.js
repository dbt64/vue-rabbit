// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";

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

    // 删除购物车
    const delCart = (skuId) => {
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
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
    return {
      count,
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
    };
  },
  {
    persist: true,
  }
);
