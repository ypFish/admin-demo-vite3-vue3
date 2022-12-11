<template>
	<!-- 顶部导航条 -->
	<div class="nav-container">
		<!-- 收缩侧边栏按钮 -->
		<div class="collapse-button" @click="handleMenuCollapseOperate">
			<n-button text style="font-size: 24px">
				<n-icon>
					<list-outline />
				</n-icon>
			</n-button>
		</div>
		<!-- 面包屑导航 -->
		<div class="bread-box">
			<n-breadcrumb>
				<n-breadcrumb-item
					v-for="item in breadcrumbList"
					:key="item.name"
					:clickable="item.externalLink || item.isComponent"
					:class="item.externalLink || item.isComponent ? '' : 'bread-not-clickable'"
				>
					<a v-if="item.externalLink" :href="item.externalLink" target="_blank" rel="noopenner noreferrer">{{ item.title }}</a>
					<router-link v-else-if="item.isComponent" :to="{ name: item.name }">{{ item.title }}</router-link>
					<span v-else>{{ item.title }}</span>
				</n-breadcrumb-item>
			</n-breadcrumb>
		</div>
		<!-- 用户内容展示 -->
		<n-dropdown :options="options" @select="handleSelect">
			<div class="user-box">
				<n-avatar round :size="20" :src="userStore.user.avatar" fallback-src="https://dummyimage.com/200x200/16A085/FFF&text=U" />
				<n-text class="nick-name">
					<span>{{ userStore.user.nick_name }}</span>
					<n-icon class="nick-name-icon">
						<chevron-down></chevron-down>
					</n-icon>
				</n-text>
			</div>
		</n-dropdown>
	</div>
</template>

<script setup lang="ts">
import { ListOutline, ChevronDown, PersonCircleOutline as UserIcon, LogOutOutline as LogoutIcon } from '@vicons/ionicons5';
import { BreadcrumbItem } from '@/router/types';
import { breadcrumbGenerate } from '@/router/generator';
import { routeList } from '@/router/route-list';
import { watch, ref, Ref, h } from 'vue';
import type { Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@store/user';
import { NIcon } from 'naive-ui';

const renderIcon = (icon: Component) => {
	return () => {
		return h(NIcon, null, {
			default: () => h(icon),
		});
	};
};

//获取当前路由
const currentRoute = useRoute();
//路由对象
const router = useRouter();
//用户对象仓库
const userStore = useUserStore();

const emit = defineEmits<{ (e: 'handleMenuCollapse'): void }>();

/**
 * @description: 点击按钮收缩菜单栏
 * @return {*}
 */
const handleMenuCollapseOperate = () => {
	emit('handleMenuCollapse');
};

//根据自定义路由表生成面包屑全路由字典
const breadcrumbObject: {
	[name: string]: BreadcrumbItem[];
} = breadcrumbGenerate(routeList);

//当前面包屑路径
let breadcrumbList: Ref<BreadcrumbItem[]> = ref([]);

//观测路由变化生成新的面包屑路径
watch(
	() => currentRoute.name,
	(newValue) => {
		if (newValue && breadcrumbObject[newValue as string]) {
			breadcrumbList.value = breadcrumbObject[newValue as string];
		}
	},
	{
		immediate: true,
	}
);

//下拉菜单
const options = [
	{
		label: '身份：' + userStore.user.role,
		key: 'role',
		disabled: true,
		icon: renderIcon(UserIcon),
	},
	{
		label: '退出登录',
		key: 'logout',
		icon: renderIcon(LogoutIcon),
	},
];

const handleSelect = (key: string) => {
	if (key === 'logout') {
		//清空用户信息
		userStore.clearUserInfo();
		//跳转到登录页
		router.push({ name: 'login' });
	}
};
</script>

<style lang="less" scoped>
.nav-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;

	.collapse-button {
		width: 60px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.bread-box {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		overflow: scroll;
		margin: 0 10px;

		&:deep(.n-breadcrumb) {
			.n-breadcrumb-item {
				.n-breadcrumb-item__link {
					color: var(--n-item-text-color-hover);
					transition: background-color 0.3s var(--n-bezier), color 0.3s var(--n-bezier);
					&:hover {
						border-radius: var(--n-item-border-radius);
						cursor: pointer;
						background-color: var(--n-item-color-hover);
						color: var(--n-item-text-color-hover);
					}
				}
			}

			.bread-not-clickable {
				.n-breadcrumb-item__link {
					color: var(--n-item-text-color);

					&:hover {
						background-color: rgba(0, 0, 0, 0);
						color: var(--n-item-text-color);
						cursor: default;
					}
				}
			}
		}
	}

	.user-box {
		margin-right: 20px;
		max-width: 200px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		.nick-name {
			display: inline-block;
			max-width: 150px;
			margin-left: 10px;
			font-size: 16px;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			span {
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.nick-name-icon {
				margin-left: 4px;
			}
		}
	}
}
</style>
