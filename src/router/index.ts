import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';

//主页
const Home = () => import('../views/home/index.vue');
const About = () => import('../views/about/index.vue');
const NotFound = () => import('../views/not-found/index.vue');

//路由表
const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		props: (route: RouteLocationNormalized) => ({ age: route.query.age }),
		// props: {
		// 	age: 18,
		// },
	},
	{
		path: '/about',
		name: 'about',
		component: About,
		props: true,
	},
	// 404页面配置，将匹配所有内容并将其放在 `$route.params.pathMatch` 下
	{ path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
];

//使用工厂函数创建路由实例
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
