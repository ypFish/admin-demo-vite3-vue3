<template>
	<div class="cart-container">
		<h1>购物车列表</h1>
		<ul>
			<li v-for="item in cartStore.cartProductList" :key="item.id">{{ item.name }}，价格：{{ item.price }}，数量：{{ item.count }}</li>
		</ul>
		<p>购物车内总花费：{{ cartStore.totalFee }}</p>
	</div>
</template>
<script lang="ts" setup>
import { useCartStore } from '@store/cart';
//购物车列表
const cartStore = useCartStore();
</script>
