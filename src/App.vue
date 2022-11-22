<template>
	<!-- <div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div> -->
	<!-- 导航栏 -->
	<div class="nav-box">
		<ul>
			<li>
				<router-link :to="{ name: 'home', query: { age: 27 } }">Go to Home</router-link>
			</li>
			<li>
				<router-link to="/about"><button>Go to About</button></router-link>
			</li>
		</ul>
	</div>
	<!-- 视图容器 -->
	<div class="view-box">
		<router-view v-slot="{ Component }">
			<!-- 增加过渡动画 -->
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
	<hr />
	<HelloWorld msg="Vite + Vue" />
	<Product />
	<Cart />
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import Product from '@/components/Product.vue';
import Cart from '@/components/Card.vue';
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>

<style scoped lang="stylus">
.view-box
	width 100%;
	height 400px;
	border 1px solid #999;
</style>
