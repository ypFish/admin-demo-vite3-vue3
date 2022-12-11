/*
 * @Author: Yu Peng
 * @Date: 2022-11-29 11:55:32
 * @LastEditTime: 2022-11-29 16:54:06
 * @Description: axios 封装
 */

import axios from 'axios';
import { useRouter } from 'vue-router';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const router = useRouter();

// 创建一个 axios 实例, 配置默认值
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: { 'Content-Type': 'application/json;charset=utf-8' },
	timeout: 10000, // 指定请求超时的毫秒数(0 表示无超时时间)
});

// 请求拦截器
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// 在请求发送之前做一些处理
		const token = localStorage.token;
		// 判断是否存在token，如果存在的话，则每个http请求 header都加上token
		if (token && config.headers) {
			config.headers['token'] = token;
		}
		return config;
	},
	(error) => {
		// 请求失败
		return Promise.reject(error);
	}
);

//响应拦截器
service.interceptors.response.use(
	(res: AxiosResponse) => {
		if (res.status == 200) {
			// axios 返回数据中的 data
			const resData = res.data;
			// 这个状态码是和后端约定的
			const code = resData.code;
			if (code === 0) {
				return resData;
			} else {
				return Promise.reject(resData);
			}
		} else {
			return Promise.reject(res);
		}
	},
	(err) => {
		switch (err.response.status) {
			case 401:
				console.error('用户信息过期，请重新登录');
				setTimeout(() => {
					router.push({ name: 'login' });
				}, 1000);
				break;
			default:
				console.warn(`status= ${err.response.status}`);
				break;
		}
		return Promise.reject(err);
	}
);

export default service;
