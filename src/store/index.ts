import { defineStore } from 'pinia';

//定义并导出全局状体容器
export const useIndexStore = defineStore('index', {
	/**
	 * 全局状态对象；推荐使用箭头函数形式，因为在服务端渲染时，这样可以避免交叉请求导致数据状态污染的情况
	 */
	state: () => {
		return {
			count: 1,
			list: [] as number[],
		};
	},

	/**
	 * 获取器，类似于计算属性，用来获取一个或多个状态的封装数据，具有缓存功能
	 */
	getters: {
		// 使用传参写法，自动类型推导（推荐）
		doubleCount(state) {
			return state.count * 2;
		},

		// 使用this写法，需要声明获取器返回类型
		// doubleCount2(): number {
		//   return this.count * 2;
		// },
	},

	/*
	 * 全局状态处理函数，主要用于逻辑复用操作，支持同步和异步修改全局状态
	 */
	actions: {
		changeState() {
			//方式一：直接修改状态数据
			this.count++;

			//方式二：调用 patch 批量修改更新，传入一个修改后的对象（效率更高，同时保证响应式数据修改时序）
			// this.patch({
			//   count: this.count++,
			// });

			//方式三：调用 patch 批量修改更新，传入一个函数（效率更高，同时保证响应式数据修改时序）
			// this.patch((state) => {
			//   state.count++;
			//   state.list.push(1);
			// });
		},
	},
});
