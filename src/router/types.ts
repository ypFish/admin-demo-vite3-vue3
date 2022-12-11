import { Component } from 'vue';
import { RouteComponent, RouteLocationNormalized, LocationQuery } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { RouteRecordRaw } from 'vue-router';

//自定义路由类型
export interface AppRoute {
	//路径
	path: string;
	//路由命名（同时也是导航栏唯一标示，必填）
	name: string;
	//重定向
	// redirect?: RouteRecordRedirectOption;
	//别名
	alias?: string | string[];
	//视图组件
	component?: RouteComponent;
	//携带参数
	props?: Recordable | boolean | ((to: RouteLocationNormalized) => Record<string, any>);
	//子路由
	children?: AppRoute[];
	//原信息
	meta: {
		// 标题名称
		title: string;
		// 导航栏的自定义图标
		icon?: Component;
		// 导航栏静态传递参数，挂载到导航栏router-link中
		query?: LocationQuery;
		// 导航栏是否隐藏
		hidden?: boolean;
		// 外链跳转地址，导航栏中会使用a标签渲染
		externalLink?: string;
		// 是否忽略权限
		ignoreAuth?: boolean;
		// 路由允许显示和进入的权限名称，key为权限名称，value为是否允许通过
		permissions?: {
			[role: string]: boolean;
		};
	};
}

//自定义面包屑内容项
export interface BreadcrumbItem {
	title: string;
	name: string;
	externalLink?: string;
	isComponent: boolean;
	query?: LocationQuery;
}

// 路由表转换函数类型
export interface RouterGenerate {
	(routeList: AppRoute[]): RouteRecordRaw[];
}

// 侧边菜单栏转化函数类型
export interface MeunGenerate {
	(routeList: AppRoute[], role: Role): MenuOption[];
}

// 面包屑字典转化函数
export interface BreadcrumbGenerate {
	(routeList: AppRoute[]): { [name: string]: BreadcrumbItem[] };
}

// export interface Meta {
// 	// 名称
// 	title: string;
// 	// 是否忽略权限
// 	ignoreAuth?: boolean;
// 	permissions?: string[];
// 	// 是否不缓存
// 	noKeepAlive?: boolean;
// 	// 是否固定在tab上
// 	affix?: boolean;
// 	// tab上的图标
// 	icon?: string;
// 	// 跳转地址
// 	frameSrc?: string;
// 	// 外链跳转地址
// 	externalLink?: string;
// 	//隐藏
// 	hidden?: boolean;
// }

// export interface Menu {
// 	title: string;
// 	label: string;
// 	key: string;
// 	meta: RouteMeta;
// 	name: string;
// 	component?: Component | string;
// 	components?: Component;
// 	children?: AppRouteRecordRaw[];
// 	props?: Recordable;
// 	fullPath?: string;
// 	icon?: any;
// 	path: string;
// 	permissions?: string[];
// 	redirect?: string;
// 	sort?: number;
// }
