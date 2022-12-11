<template>
	<div class="layout-container">
		<!-- 侧边栏 -->
		<div class="sidebar-box">
			<sidebar :collapsed="collapsed" :header="header"> </sidebar>
		</div>
		<!-- 主页面区 -->
		<div class="main-box">
			<!-- 顶部导航栏 -->
			<div class="nav-box">
				<navbar @handle-menu-collapse="operateCollapsed" />
			</div>
			<!-- 视图容器 -->
			<!-- 加载条 -->
			<n-loading-bar-provider :to="loadingBarTargetRef" container-style="position: absolute;">
				<div class="content-box">
					<!-- 视图区 -->
					<div ref="loadingBarTargetRef" class="view-box">
						<router-view v-slot="{ Component }">
							<!-- 增加过渡动画 -->
							<transition name="fade" mode="out-in">
								<component :is="Component" />
							</transition>
						</router-view>
					</div>
				</div>
			</n-loading-bar-provider>
		</div>
	</div>
</template>

<script setup lang="ts">
import variables from '@/style/variables.module.less';
import Sidebar from './components/sidebar/index.vue';
import navbar from './components/nav/index.vue';
import { ref, onMounted, Ref } from 'vue';

// 侧边栏是否折叠
const collapsed = ref(false);

//侧边栏 顶部区域展示信息
const header = {
	//标题
	title: 'admin Demo',
	//logo
	logo: '//fes.qyerstatic.com/FgVfajjovkLei3Q8PZUWW_LKCrtK',
};

const operateCollapsed = () => {
	collapsed.value = !collapsed.value;
};

const loadingBarTargetRef: Ref<null | HTMLElement> = ref(null);

onMounted(() => {
	console.log('css modules', variables);
});
</script>

<style lang="css">
body,
#app {
	width: 100%;
	height: 100%;
}
/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>

<style lang="less" scoped>
//导入全局变量
@import '@style/variables.module.less';

.layout-container {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	display: flex;
	background-color: @common_backgoundColor;

	.sidebar-box {
		height: 100%;
		overflow: hidden;
		background-color: @common_sidebar_backgoundColor;
		position: relative;
		box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
	}

	.main-box {
		flex: 1;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.nav-box {
			width: 100%;
			height: @common_nav_height;
			background-color: @common_nav_backgoundColor;
		}

		.content-box {
			box-sizing: border-box;
			width: 100%;
			flex: 1;
			padding: 8px 8px 0 8px;
			overflow: hidden;
			// pointer-events: none;
			// position: relative;

			.view-box {
				color: #333;
				width: 100%;
				height: 100%;
				position: relative;
				background-color: @common_view_backgoundColor;
				overflow: scroll;
			}
		}
	}
}
</style>
