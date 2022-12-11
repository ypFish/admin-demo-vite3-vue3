<template>
	<h1>{{ msg }}</h1>
	<div class="card">
		<!-- <button type="button" @click="count++">数量 {{ count }}</button> -->
		<p>count:{{ indexStore.count }}</p>
		<p>count:{{ count }}</p>
		<p>两倍count:{{ indexStore.doubleCount }}</p>
		<button @click="addStoreCount">增加全局count</button>
		<div class="box">
			<p>{{ userName }}</p>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useIndexStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import { getCurrent, getUserList } from '@api/index';

defineProps<{ msg: string }>();

// const count = ref(50);

const userName = ref('');

const indexStore = useIndexStore();

const { count } = storeToRefs(useIndexStore());

const addStoreCount = () => {
	indexStore.changeState();
};

/**
 * @description: 定义获取用户数据接口
 * @return {*}
 */
interface GetUser {
	(): void;
}
/**
 * @description: 获取用户数据
 * @return {*}
 */
const getUser: GetUser = async () => {
	interface UserData {
		data: {
			user: {
				name: string;
				age: number;
			};
		};
	}
	const res = await fetch('/api/user');
	const userData: UserData = await res.json();
	console.log('用户数据', userData);
	userName.value = userData?.data?.user?.name || '';
};

onMounted(async () => {
	getUser();

	const current = await getCurrent();
	console.log('最终current', current);

	const userList = await getUserList();
	console.log('userList', userList);
});
</script>
<!-- 
<style lang="stylus" scoped>
.box
	border 1px solid blue;
	width 100%;
	height 100px;
	display flex;
	align-items center;
	justify-content center;

  p
	 color: #888;
</style> -->
