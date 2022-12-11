<template>
	<div class="use-box">
		<h1>广告管理-广告位管理</h1>
		<n-button type="primary"> Primary </n-button>
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
	console.log('route', route);
});
</script>
