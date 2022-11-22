<template>
	<div class="container">
		<h1>主页{{ age || 1 }}</h1>
		<img src="/vite.svg" class="logo" alt="Vite logo" />
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
	age?: number;
}>();

console.log('params1', route.params);

onMounted(() => {
	console.log('age', props.age);
	console.log('role', route.query.role);
	console.log('age', route.query.age);
});

console.log('props', props);
</script>
<style lang="stylus" scoped>
.container
    width 100vw;
    position relative;
    color blue;
    padding 20px;

    img
        width 200px;
</style>
