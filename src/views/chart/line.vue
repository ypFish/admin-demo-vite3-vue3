<template>
	<div class="line-box">
		<h1>可视化图表-折线图</h1>
		<n-button type="primary" @click="change"> 改变折线图 </n-button>
		<div id="line-chart" class="line-chart"></div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import echarts, { ECOption, ECharts } from '@/echarts/index';

onMounted(() => {
	//初始化echart
	initChart();
});

let chartDom: HTMLElement | null = null;

let myChart: ECharts | null = null;

/**
 * @description: 初始化echart
 * @return {*}
 */
const initChart = () => {
	//获取容器
	chartDom = document.getElementById('line-chart') as HTMLElement;
	//初始化
	myChart = echarts.init(chartDom);
	//绘制数据
	const option: ECOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		xAxis: {
			type: 'category',
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'line',
				name: '收入',
			},
		],
	};
	//绘制
	myChart.setOption(option);
};

/**
 * @description: 修改数据，并重新渲染图形
 * @return {*}
 */
const change = () => {
	if (myChart && chartDom) {
		const data = Array.from({ length: 7 }, () => ~~(Math.random() * 199 + 1));
		myChart.setOption({
			series: [
				{
					data,
					color: ['#16A085'],
					smooth: true,
				},
			],
		});
	}
};
</script>
<style lang="less" scoped>
.line-box {
	width: 100%;
	height: 100%;
	padding: 16px;
	.line-chart {
		margin-top: 20px;
		width: 600px;
		height: 400px;
	}
}
</style>
