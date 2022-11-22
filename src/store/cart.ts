import { defineStore } from 'pinia';
import { IProduct, useProductStore } from './product';

export type ICartProduct = {
	count: number;
} & Omit<IProduct, 'inventory'>;

//定义并导出全局状体容器
export const useCartStore = defineStore('cart', {
	/**
	 * 全局状态对象
	 */
	state: () => {
		return {
			cartProductList: [] as ICartProduct[],
		};
	},

	/**
	 * 获取器，类似于计算属性，用来获取一个或多个状态的封装数据，具有缓存功能
	 */
	getters: {
		totalFee: (state) => {
			return state.cartProductList.reduce((p, item) => {
				return p + item.count * item.price;
			}, 0);
		},
	},

	/*
	 * 全局状态处理函数，主要用于逻辑复用操作，支持同步和异步修改全局状态
	 */
	actions: {
		addProduct(product: IProduct) {
			const productStore = useProductStore();
			const originProduct = productStore.productList.find((item) => {
				return item.id === product.id;
			});

			if (!originProduct || originProduct.inventory <= 0) {
				return;
			}

			const targetProuct = this.cartProductList.find((item) => {
				return product.id === item.id;
			});
			originProduct.inventory--;
			if (targetProuct) {
				//购物车中存在
				targetProuct.count++;
			} else {
				//新加入购物车
				this.cartProductList.push({
					id: product.id,
					name: product.name,
					price: product.price,
					count: 1,
				});
			}
		},
	},
});
