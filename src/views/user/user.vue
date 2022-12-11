<template>
	<div class="user-box">
		<h1>用户管理-人员管理</h1>
		<!-- 测试css伪选择器 -->
		<div class="test-box">
			<p>:focus-widthin测试</p>
			<div class="test-wrap">
				<n-button type="primary"> 按钮 </n-button>
				<n-input v-model:value="value" type="text" placeholder="输入框" />
			</div>
		</div>

		<div class="object-box">
			<img src="http://picb2b.qyer.com/b2b/top50/18.jpg" alt="" class="pic" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCurrent, getUserList } from '@/api/index';

const value = ref(null);

const route = useRoute();

onMounted(async () => {
	// console.log('route', route);
	// console.log('route name', route.name);
	// console.log('route meta', route.meta);
	// console.log('MODE', import.meta.env.MODE);
	// console.log('BASE_URL', import.meta.env.BASE_URL);
	// console.log('VITE_TITLE', import.meta.env.VITE_TITLE);
	// console.log('VITE_DESC', import.meta.env.VITE_DESC);

	const current = await getCurrent();
	console.log('最终current', current);

	const userList = await getUserList();
	console.log('userList', userList);
});
</script>
<style lang="less" scoped>
.test-box {
	width: 600px;
	height: 400px;
	border: 1px solid red;

	.test-wrap {
		width: 400px;
		height: 300px;
		border: 1px solid blue;
	}

	.test-wrap:focus-within {
		background-color: cadetblue;
	}
}

.test-box:focus-within {
	background-color: burlywood;
}

.object-box {
	width: 50%;
	aspect-ratio: 1/1;
	border: 1px solid green;
	// overflow: hidden;
	// margin-bottom: 200px;

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}
}
</style>
