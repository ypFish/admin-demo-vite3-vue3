/*
 * @Author: Yu Peng
 * @Date: 2022-11-29 14:50:35
 * @LastEditTime: 2022-11-30 10:58:27
 * @Description: 封装的请求接口
 */

import request from '@api/request';
import type { ResData, Login } from '@api/types';

/**
 * @description: 获取当前系统时间
 * @return {*}
 */
export const getCurrent = async () => {
	let current = -1;

	try {
		const res: ResData = await request({
			url: '/system/current',
			method: 'get',
			data: {},
		});
		current = res.data.current;
	} catch (error) {
		return current;
	}
	return current;
};

/**
 * @description: 获取当前系统时间
 * @return {*}
 */
export const getUserList = async () => {
	let userList = [];

	try {
		const res: ResData = await request({
			//如果使用本地mock数据，可以将baseUrl设置为''
			// baseURL: '',
			url: '/system/user-list',
			method: 'get',
			data: {},
		});
		userList = res.data.user_list;
	} catch (error) {
		return userList;
	}
	return userList;
};

/**
 * @description: 登录
 * @param {*} userInfo 用户登录验证信息
 * @return {*}
 */
export const login: Login = async (userInfo) => {
	let user = null;

	try {
		const res: ResData = await request({
			//如果使用本地mock数据，可以将baseUrl设置为''
			baseURL: '',
			url: '/system/login',
			method: 'post',
			data: {
				...userInfo,
			},
		});
		user = res.data.user;
	} catch (error) {
		return user;
	}
	return user;
};
