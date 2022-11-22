<template>
	<div class="product-container">
		<h1>产品列表</h1>
		<ul>
			<li
				v-for="item in productStore.productList"
				:key="item.id"
				:style="'color:' + variables.common_color + ';font-size:' + variables.common_fontSize"
			>
				{{ item.name }}，价格：{{ item.price }}，剩余库存：{{ item.inventory }}，操作： -->
				<button :disabled="item.inventory <= 0" @click="addProduct(item)">添加</button>
			</li>
		</ul>
	</div>
</template>
<script lang="ts" setup>
import { useProductStore, IProduct } from '@store/product';
import { onMounted } from 'vue';
import { useCartStore } from '@store/cart';
import variables from '@/style/variables.module.styl';

// const textColor = 'blue';

//产品全局对象
const productStore = useProductStore();
//购物车全局对象
const cartStore = useCartStore();

onMounted(() => {
	//页面加载完成
	//加载产品列表
	productStore.initProductList();

	console.log('variables', variables);
});

const addProduct = (item: IProduct) => {
	console.log('添加一个', item.name);
	cartStore.addProduct(item);
};
</script>
<style lang="stylus" scoped>
.product-container
    width 45%;
    height 400px;
    display inline-block;
    position relative;
    vertical-align top;

    li
        height 40px;
</style>
