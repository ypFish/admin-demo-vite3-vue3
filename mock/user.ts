/*
 * @Author: Yu Peng
 * @Date: 2022-11-08 19:52:47
 * @LastEditTime: 2022-11-17 16:51:58
 * @Description: 模拟请求返回的数据，文档参考：https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
 */

import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/api/user',
		method: 'get',
		// 设置应答响应时间
		timeout: 1500,
		// 设置状态码
		// statusCode: 200,
		// rawResponse:()=>{},
		response: () => {
			// console.log('body>>>>>>>>', JSON.stringify(body))
			return {
				code: 0,
				message: 'ok',
				data: {
					time: 3,
					user: {
						name: 'yp',
						age: 18,
					},
				},
			};
		},
	},
	{
		url: '/api/product-list',
		method: 'get',
		// 设置应答响应时间
		timeout: 1500,
		// 设置状态码
		// statusCode: 200,
		// rawResponse:()=>{},
		response: () => {
			// console.log('body>>>>>>>>', JSON.stringify(body))
			return {
				code: 0,
				message: 'ok',
				data: {
					time: 10,
					product_list: [
						{
							id: 10001,
							name: 'Iphone 14 限量紫色款',
							price: 5799,
							inventory: 3,
						},
						{
							id: 10025,
							name: 'Puma 联名休闲鞋',
							price: 669,
							inventory: 8,
						},
						{
							id: 10036,
							name: 'Muji 男士休闲衬衫',
							price: 230,
							inventory: 2,
						},
					],
				},
			};
		},
	},
] as MockMethod[];
