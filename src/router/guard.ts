/*
 * @Author: Yu Peng
 * @Date: 2022-11-30 16:21:56
 * @LastEditTime: 2022-12-02 16:13:33
 * @Description: 创建路由导航守卫
 */

import { Router } from 'vue-router';
import { useUserStore } from '@/store/user';

/**
 * @description: 全局前置路由导航守卫
 * @param {Router} router
 * @return {*}
 */
export const createRouterGuard = (router: Router) => {
	router.beforeEach((to) => {
		//获取全局用户
		const userStore = useUserStore();
		if (!userStore.user.session_id && to.name !== 'login' && to.name !== 'notfound') {
			//未登录，需要跳转到登录页
			return { name: 'login' };
		}

		//获取当前用户角色
		const validRole = userStore.user.role || 'none';

		// 权限检查
		// 注意：会合并父级到子集的所有meta，从父级向下检查每一层
		if (to.matched) {
			for (const routeItem of to.matched) {
				if (!routeItem.meta.ignoreAuth) {
					if (!routeItem.meta || !routeItem.meta.permissions || !(routeItem.meta.permissions as { [key: string]: boolean })[validRole]) {
						alert('当前用户身份无法查看，请重新登录');
						//没有权限查看，需要跳转到登录页
						return { name: 'login' };
					}
				}
			}
		}
	});
};
