/*
 * @Author: Yu Peng
 * @Date: 2022-11-25 18:23:03
 * @LastEditTime: 2022-12-05 21:06:10
 * @Description: 自定义路由表，用于转化为vue-router路由和侧边栏菜单
 */

//引用的图标
import { PersonOutline, ClipboardOutline, RadioOutline, PieChartOutline } from '@vicons/ionicons5';
import { ESMap } from 'typescript';
import { AppRoute } from './types';

//主页
const Home = () => import('@views/layout/index.vue');

//登录页
const Login = () => import('@views/login/index.vue');

/* ---广告管理--- */
//用户管理
const User = () => import('@views/user/user.vue');
//权限管理
const Role = () => import('@views/user/role.vue');
//三级目录
//中国
const China = () => import('@views/country/china.vue');
//美国
const Usa = () => import('@views/country/usa.vue');
//日本
const Japan = () => import('@views/country/japan.vue');

/* ---订单管理--- */
//订单管理
const Order = () => import('@views/order/order.vue');

/* ---广告管理--- */
//广告数据
const AdvertData = () => import('@views/advert/advert-data.vue');
//广告投放
const AdvertServing = () => import('@views/advert/advert-serving.vue');
//广告位管理
const AdvertAdsense = () => import('@views/advert/advert-adsense.vue');

/* ---图表实例--- */
//折线图
const Line = () => import('@/views/chart/line.vue');
//折线图
const Bar = () => import('@views/chart/bar.vue');
//折线图
const Pie = () => import('@/views/chart/pie.vue');

//广告数据
const NotFound = () => import('@views/not-found/index.vue');

//全局自定义路由信息表
export const routeList: AppRoute[] = [
	{
		path: '/',
		name: 'home',
		alias: '/home',
		component: Home,
		meta: {
			title: '首页',
			hidden: false,
			ignoreAuth: true,
		},
		children: [
			{
				//用户管理导航
				path: 'user',
				name: 'user',
				meta: {
					title: '用户管理',
					icon: PersonOutline,
					hidden: false,
					ignoreAuth: false,
					//允许查看路由的导航角色
					permissions: {
						admin: true,
						developer: true,
					},
				},
				children: [
					{
						//人员管理页面
						path: 'user/user',
						name: 'user_user',
						component: User,
						meta: {
							title: '人员管理',
							hidden: false,
							permissions: {
								admin: true,
								developer: true,
							},
						},
					},
					{
						//权限管理页面
						path: 'user/role',
						name: 'user_role',
						component: Role,
						meta: {
							title: '权限管理',
							hidden: false,
							permissions: {
								admin: true,
								developer: true,
							},
						},
					},
					{
						path: 'user/country',
						name: 'user_country',
						meta: {
							title: '三级目录',
							icon: PersonOutline,
							hidden: false,
							permissions: {
								admin: true,
								developer: true,
							},
						},
						children: [
							{
								//人员管理页面
								path: 'user/country/china',
								name: 'user_country_china',
								component: China,
								meta: {
									title: '中国',
									hidden: false,
									permissions: {
										admin: true,
										developer: true,
									},
								},
							},
							{
								//人员管理页面
								path: 'user/country/usa',
								name: 'user_country_usa',
								component: Usa,
								meta: {
									title: '美国',
									hidden: false,
									permissions: {
										admin: true,
										developer: true,
									},
								},
							},
							{
								//人员管理页面
								path: 'user/country/japan',
								name: 'user_country_japan',
								component: Japan,
								meta: {
									title: '日本',
									hidden: false,
									permissions: {
										admin: true,
										developer: true,
									},
								},
							},
							{
								//人员管理页面
								path: 'user/country/huxiu',
								name: 'user_country_huxiu',
								// component: Japan,
								meta: {
									title: '外部链接-虎嗅',
									hidden: false,
									ignoreAuth: true,
									externalLink: 'https://www.huxiu.com/',
								},
							},
						],
					},
				],
			},
			{
				//订单管理也米娜
				path: 'order',
				name: 'order',
				component: Order,
				meta: {
					title: '订单管理',
					icon: ClipboardOutline,
					hidden: false,
					ignoreAuth: true,
				},
			},
			{
				//广告管理导航
				path: 'advert',
				name: 'advert',
				meta: {
					title: '广告管理',
					icon: RadioOutline,
					hidden: false,
					ignoreAuth: true,
				},
				children: [
					{
						//广告数据页面
						path: 'advert/data',
						name: 'advert_data',
						component: AdvertData,
						meta: {
							title: '广告数据',
							hidden: false,
							//允许查看路由的导航角色
							ignoreAuth: false,
							permissions: {
								admin: true,
							},
						},
					},
					{
						//投放管理也米娜
						path: 'user/serving',
						name: 'user_serving',
						component: AdvertServing,
						meta: {
							title: '投放管理',
							hidden: false,
							ignoreAuth: true,
						},
					},
					{
						//广告位管理也米娜
						path: 'user/adsense',
						name: 'user_adsense',
						component: AdvertAdsense,
						meta: {
							title: '广告位管理',
							hidden: false,
							ignoreAuth: true,
						},
					},
				],
			},
			{
				//图表展示导航
				path: 'chart',
				name: 'chart',
				meta: {
					title: '图表展示',
					icon: PieChartOutline,
					hidden: false,
					ignoreAuth: true,
				},
				children: [
					{
						//折线图页面
						path: 'chart/line',
						name: 'chart_line',
						component: Line,
						meta: {
							title: '折线图',
							hidden: false,
							ignoreAuth: true,
						},
					},
					{
						//柱状图页面
						path: 'chart/bar',
						name: 'chart_bar',
						component: Bar,
						meta: {
							title: '柱状图',
							hidden: false,
							ignoreAuth: true,
						},
					},
					{
						//饼状图页面
						path: 'chart/pie',
						name: 'chart_pei',
						component: Pie,
						meta: {
							title: '饼状图',
							hidden: false,
							ignoreAuth: true,
						},
					},
				],
			},
		],
	},
	{
		//登录页
		path: '/login',
		name: 'login',
		component: Login,
		props: true,
		meta: {
			title: '登录页',
			hidden: true,
			ignoreAuth: true,
		},
		children: [],
	},
	{
		// 404页面配置，将匹配所有内容并将其放在 `$route.params.pathMatch` 下
		path: '/:pathMatch(.*)*',
		name: 'notfound',
		component: NotFound,
		meta: {
			title: '404',
			hidden: true,
			ignoreAuth: true,
		},
	},
];

const test = () => {
	type UserInfo = {
		name: string;
		age: number;
		sex?: number;
	};

	type Users = keyof UserInfo;

	const p1: Users = 'name';
	const p2: Users = 'age';
	const p3: Users = 'sex';

	console.log('p1', p1);
	console.log('p2', p2);
	console.log('p3', p3);

	type Page = 'home' | 'about' | 'news';

	// type feff = Record<Page, number>;
	const nav: Record<Page, string> = {
		home: 'fa',
		about: 'fa2',
		// news: 'news',
	};

	interface Ads {
		id: number;
		name: string;
		show?: boolean;
		count?: number;
	}

	const ads: Required<Ads> = {
		id: 102,
		name: '顶部通栏',
		show: true,
		count: 34343,
	};

	ads.count++;

	const adsInfo: Readonly<Ads> = {
		id: 232,
		name: '轮播图第三帧',
		show: false,
		count: 0,
	};
	adsInfo.count++;

	type AdTypes = 'wap' | 'PC' | 'app' | 'miniprogram';

	const mobileAd: Exclude<AdTypes, 'PC' | 'wap'> = 'app';

	type AppAds = Extract<AdTypes, 'wap' | 'app'>;

	const appAd: AppAds = 'wap';

	const map = new Map([
		[32, false],
		[123, false],
	]);

	map.set('fe', false);

	console.log(map);
};
