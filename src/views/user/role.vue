<template>
	<div class="use-box">
		<h1>用户管理-权限管理</h1>
		<n-button type="primary"> Primary </n-button>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const internalInstance = getCurrentInstance();
console.log(internalInstance?.appContext.config.globalProperties.$http);

onMounted(() => {
	console.log('route', route);
});
</script>
