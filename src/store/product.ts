import { defineStore } from 'pinia';

export interface IProduct {
	id: number;
	name: string;
	price: number;
	inventory: number;
}

//定义并导出全局状体容器
export const useProductStore = defineStore('product', {
	/**
	 * 全局状态对象
	 */
	state: () => {
		return {
			productList: [] as IProduct[],
		};
	},

	/**
	 * 获取器，类似于计算属性，用来获取一个或多个状态的封装数据，具有缓存功能
	 */
	getters: {},

	/*
	 * 全局状态处理函数，主要用于逻辑复用操作，支持同步和异步修改全局状态
	 */
	actions: {
		/**
		 * @description: 初始化产品列表
		 * @param {Array} productList
		 * @return {*}
		 */
		async initProductList() {
			const res = await fetch('/api/product-list');
			const productData = await res.json();
			//获取产品列表
			const productDataList: IProduct[] = productData?.data?.product_list || [];
			console.log('获取到商品数据', productDataList);
			this.$patch((state) => {
				state.productList = [...productDataList];
			});
		},
	},
});
