/*
 * @Author: Yu Peng
 * @Date: 2022-11-08 19:52:47
 * @LastEditTime: 2022-11-30 18:43:44
 * @Description: 模拟请求返回的数据，文档参考：https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
 */

import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/system/login',
		method: 'post',
		// 设置应答响应时间
		timeout: 1200,
		// 设置状态码
		// statusCode: 200,
		// rawResponse:()=>{},
		response: ({ body, query, headers }) => {
			console.log('body>>>>>>>>', JSON.stringify(body));
			console.log('query>>>>>>>>', JSON.stringify(query));
			console.log('headers>>>>>>>>', JSON.stringify(headers));
			return {
				code: 0,
				msg: 'ok',
				data: {
					user: {
						id: '@increment(1000)',
						session_id: '@guid',
						nick_name: body.name,
						avatar: `@image(200x200,` + '@color' + ',#FFF,' + (body.name[0] || 'A').toUpperCase() + `)`,
						'role|1': ['admin', 'developer', 'user'],
					},
				},
				time: 120,
			};
		},
	},
	{
		url: '/system/current',
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
				msg: 'ok',
				data: {
					current: 112233,
				},
				time: 0,
			};
		},
	},
	{
		url: '/system/user-list',
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
				msg: 'ok',
				data: {
					//返回10行
					'user_list|10': [
						{
							id: '@guid',
							// 属性 gradeId 是一个自增数，起始值为 1，每次增 1
							'gradeId|+1': 1,
							//随机中文名称
							cname: '@cname',
							//随机英文名称
							name: '@name',
							//随机ip地址
							ip: '@ip',
							//随机图片地址（尺寸,背景色,前景色,文字）
							avatar: "@image('200x100', '#00405d', '#FFF', 'Mock.js')",
							// 随机字符串
							str: '@string',
							// 随机数值（1-100）
							int: '@integer(1,100)',
							// @ctitle 随机生成一句中文标题。
							title: '@ctitle(10,15)',
							// 限定年龄
							'age|20-30': 23,

							// 随机数组中的一个
							'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师'],
						},
					],
				},
			};
		},
	},
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
