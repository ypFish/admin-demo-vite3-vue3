<template>
	<div class="use-box">
		<h1>订单管理</h1>
		<p>展示局部加载条</p>
		<n-button type="primary"> Primary </n-button>
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { routeList } from '@/router/route-list';
import { useLoadingBar } from 'naive-ui';

const route = useRoute();
// 加载条
const loadingBar = useLoadingBar();

loadingBar.start();

onMounted(() => {
	console.log('route', route);
	console.log('routeList', routeList);

	setTimeout(() => {
		loadingBar.finish();
	}, 2000);
});
</script>
