import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { routeList } from './route-list';
import { routerGenerate } from './generator';
import { createRouterGuard } from './guard';

//路由表
//将自定义路由表转化为vue-router识别的路由表
export const routes: RouteRecordRaw[] = routerGenerate(routeList);

//使用工厂函数创建路由实例
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

//设置路由守卫
createRouterGuard(router);

export default router;
