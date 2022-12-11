<template>
	<div class="sidebar-container" :class="props.collapsed ? 'sidebar-container-collapsed' : ''">
		<div class="header-box">
			<!-- 顶部区域插槽 -->
			<img :src="props.header.logo" alt="" class="logo" />
			<span class="title">{{ props.header.title }}</span>
		</div>
		<div class="menu-box">
			<!-- 菜单导航栏 -->
			<n-menu ref="menuInstRef" v-model:value="selectedKey" :options="menuOptions" :indent="10" :accordion="true" :collapsed="collapsed" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { MenuOption, MenuInst } from 'naive-ui';
import { menuGenerate } from '@/router/generator';
import { AppRoute } from '@/router/types';
import { routeList } from '@/router/route-list';
import { withDefaults, defineProps, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@store/user';

//获取当前路由
const currentRoute = useRoute();
//用户仓库数据
const userStore = useUserStore();

const props = withDefaults(
	defineProps<{
		//是否折叠
		collapsed: boolean;
		// 顶部区域展示数据
		header: {
			logo: string;
			title: string;
		};
	}>(),
	{
		collapsed: false,
		//注意：此处为一个回调函数
		header: () => ({ logo: '//fes.qyerstatic.com/FgVfajjovkLei3Q8PZUWW_LKCrtK', title: 'Admin Demo' }),
	}
);

//初始化菜单栏选项
const menuOptions: MenuOption[] = menuGenerate(routeList[0].children as AppRoute[], userStore.user.role);

//菜单选择项的key（在本系统中默认为name值）
const selectedKey = ref('');
//菜单组件
const menuInstRef = ref<MenuInst | null>(null);

//观察当前路由值变化
watch(
	() => currentRoute.name,
	(newValue) => {
		if (newValue && newValue !== selectedKey.value) {
			selectedKey.value = newValue as string;
			menuInstRef.value?.showOption(newValue as string);
		}
	},
	{
		immediate: true,
	}
);
</script>
<style lang="less" scoped>
@import '@style/variables.module.less';
.sidebar-container {
	width: @common_sidebar_width;
	height: 100%;
	display: flex;
	flex-direction: column;
	transition: width 0.2s ease 0s;

	.header-box {
		width: 100%;
		box-sizing: border-box;
		height: @common_nav_height;
		overflow: hidden;
		border-bottom: 1px dashed #e0e0e0;
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		.logo {
			width: 32px;
		}
		.title {
			font-size: 16px;
			text-indent: 4px;
			width: auto;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	.menu-box {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		overflow: scroll;
	}
}

.sidebar-container-collapsed {
	width: 68px;

	.header-box {
		.title {
			visibility: hidden;
			opacity: 0;
		}
	}
}
</style>
