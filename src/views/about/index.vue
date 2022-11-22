<template>
	<div class="container">
		<h1>关于页</h1>
		<p>全局状态getters:{{ indexStore.doubleCount }}</p>
		<button @click="goToHome">跳转到主页</button>
		<img src="../../assets/vue.svg" class="logo vue" alt="Vue logo" />
	</div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useIndexStore } from '@store/index';

const indexStore = useIndexStore();

const router = useRouter();
const goToHome = () => {
	router.push({
		name: 'home',
		// params: { age: 32 },
		query: {
			age: 99,
		},
	});
};
</script>
<style lang="stylus" scoped>
.container
    width 100vw;
    position relative;
    color red;
    padding 20px;

    img
        width 200px;
</style>
