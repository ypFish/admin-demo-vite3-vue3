/*
 * @Author: Yu Peng
 * @Date: 2022-11-24 16:54:28
 * @LastEditTime: 2022-11-30 16:28:42
 * @Description: 生成器，将路由信息转化为 vue-router识别的路径信息和侧边栏菜单信息
 */

import { h, Component } from 'vue';
import { RouterLink, RouteRecordRaw } from 'vue-router';
import { AppRoute, MeunGenerate, RouterGenerate, BreadcrumbItem, BreadcrumbGenerate } from './types';
import type { MenuOption } from 'naive-ui';

//默认图标
import { ReorderFourOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';

/**
 * @description: 将自定义路由表转化为 侧边栏菜单
 * @param {*} routeList 自定义路由表
 * @return {*}
 */
export const menuGenerate: MeunGenerate = (routeList = [], role = '') => {
	//渲染图标方法
	function renderIcon(icon: Component) {
		return () => h(NIcon, null, { default: () => h(icon) });
	}

	//默认图标
	const DEFAULT_ICON = ReorderFourOutline;

	return routeList.reduce((prev: MenuOption[], current: AppRoute) => {
		if (current.meta.hidden) {
			//导航栏中隐藏
			return prev;
		}
		if (!current.meta.ignoreAuth) {
			//权限过滤
			const validRole = role || 'none';
			if (!current.meta.permissions || !current.meta.permissions[validRole]) {
				return prev;
			}
		}
		let menuItem: MenuOption = {};
		if (current.meta.externalLink) {
			//如果是外部链接，使用a标签渲染
			menuItem = {
				label: () =>
					h(
						'a',
						{
							href: current.meta.externalLink,
							target: '_blank',
							rel: 'noopenner noreferrer',
						},
						current.meta.title
					),
				key: current.name,
				icon: renderIcon(current.meta.icon || DEFAULT_ICON),
			};
		} else {
			//内部链接
			if (current.component) {
				//页面视图
				menuItem = {
					label: () =>
						h(
							RouterLink,
							{
								to: {
									name: current.name,
									query: current.meta.query || {},
								},
							},
							{ default: () => current.meta.title }
						),
					key: current.name,
					icon: renderIcon(current.meta.icon || DEFAULT_ICON),
				};
			} else {
				//纯粹导航节点
				menuItem = {
					label: current.meta.title,
					key: current.name,
					icon: renderIcon(current.meta.icon || DEFAULT_ICON),
				};
			}
			if (current.children && current.children.length > 0) {
				//存在子节点
				menuItem.children = menuGenerate(current.children, role);
			}
		}
		prev.push(menuItem);

		return prev;
	}, []);
};

/**
 * @description: 将自定义路由表转化为 vue-router 识别的路由表
 * @param {*} routeList 自定义路由表
 * @return {*}
 */
export const routerGenerate: RouterGenerate = (routeList = []) => {
	return routeList.reduce((prev: RouteRecordRaw[], current: AppRoute) => {
		if (current.meta.externalLink) {
			//如果是外部链接，不进入路由表
			return prev;
		}
		if (current.component) {
			//视图页面
			const currentRoute: RouteRecordRaw = {
				path: current.path,
				name: current.name,
				component: current.component,
				meta: current.meta,
				children: [],
			};
			if (current.alias) {
				currentRoute.alias = current.alias;
			}
			if (current.props) {
				currentRoute.props = current.props;
			}

			//如果存在子节点
			if (current.children && current.children.length > 0) {
				currentRoute.children = routerGenerate(current.children);
			}
			prev.push(currentRoute);
		} else {
			//导航节点，忽略自身节点内容，直接将子节点打入到同级中
			if (current.children && current.children.length > 0) {
				prev.push(...routerGenerate(current.children));
			}
		}
		return prev;
	}, []);
};

/**
 * @description: 将自定义路由表转化为 面包屑字典，{ name: 面包屑路径列表 }
 * @param {*} routeList 自定义路由表
 * @return {*}
 */
export const breadcrumbGenerate: BreadcrumbGenerate = (routeList = []) => {
	const breadcrumbResult: { [name: string]: BreadcrumbItem[] } = {};

	const handleRoute = (appRoute: AppRoute, breadcrumbList: BreadcrumbItem[] = []) => {
		const ownerBreadcrumbList = [...breadcrumbList];
		const BreadcrumbItem: BreadcrumbItem = {
			title: appRoute.meta.title,
			externalLink: appRoute.meta.externalLink,
			name: appRoute.name,
			isComponent: appRoute.component ? true : false,
			query: appRoute.meta.query,
		};
		ownerBreadcrumbList.push(BreadcrumbItem);

		if (appRoute.component) {
			breadcrumbResult[appRoute.name] = ownerBreadcrumbList;
		}
		if (appRoute.children && appRoute.children.length > 0) {
			//还存在子节点
			appRoute.children.forEach((item) => {
				handleRoute(item, ownerBreadcrumbList);
			});
		} else {
			//自身为最终节点，加入到最终字典中
			breadcrumbResult[appRoute.name] = ownerBreadcrumbList;
		}
	};

	routeList.forEach((appRoute) => {
		handleRoute(appRoute, []);
	});

	return breadcrumbResult;
};
