import { defineStore } from 'pinia';
import { User } from '@api/types';

//默认用户对象
const defaultUser: User = {
	id: -1,
	session_id: '',
	nick_name: '',
	avatar: '',
	role: '',
};

//定义并导出全局状体容器
export const useUserStore = defineStore('user', {
	/**
	 * 全局状态对象
	 */
	state: () => {
		return {
			user: defaultUser as User,
		};
	},

	/**
	 * 获取器，类似于计算属性，用来获取一个或多个状态的封装数据，具有缓存功能
	 */
	getters: {
		// 使用传参写法，自动类型推导（推荐）
	},

	/*
	 * 全局状态处理函数，主要用于逻辑复用操作，支持同步和异步修改全局状态
	 */
	actions: {
		/**
		 * @description: 清空用户信息
		 * @return {*}
		 */
		clearUserInfo() {
			this.user = defaultUser;
		},
	},
});
