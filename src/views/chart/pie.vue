<template>
	<div class="chat-box">
		<h1>可视化图表-饼状图</h1>
		<n-button type="primary" @click="change"> 改变饼状图 </n-button>
		<div id="pie-chart" class="pie-chart"></div>
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
	chartDom = document.getElementById('pie-chart') as HTMLElement;
	//初始化
	myChart = echarts.init(chartDom);
	//绘制数据
	const option: ECOption = {
		tooltip: {
			trigger: 'item',
		},
		legend: {
			top: '5%',
			left: 'center',
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2,
				},
				label: {
					show: false,
					position: 'center',
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '40',
						fontWeight: 'bold',
					},
				},
				labelLine: {
					show: false,
				},
				data: [
					{ value: 1048, name: '搜索' },
					{ value: 735, name: '广告点击' },
					{ value: 580, name: '推送' },
					{ value: 484, name: '扫码' },
					{ value: 300, name: '其他' },
				],
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
		const data = [
			{
				name: '搜索',
				value: ~~(Math.random() * 200 + 1), //生成[min,max]随机数
			},
			{
				name: '广告点击',
				value: ~~(Math.random() * 200 + 1), //生成[min,max]随机数
			},
			{
				name: '推送',
				value: ~~(Math.random() * 200 + 1), //生成[min,max]随机数
			},
			{
				name: '扫码',
				value: ~~(Math.random() * 200 + 1), //生成[min,max]随机数
			},
			{
				name: '其他',
				value: ~~(Math.random() * 200 + 1), //生成[min,max]随机数
			},
		];
		myChart.setOption({
			series: [
				{
					data,
					color: ['#16A085', '#FE975C', '#F66E73'],
					smooth: true,
				},
			],
		});
	}
};
</script>
<style lang="less" scoped>
.chat-box {
	width: 100%;
	height: 100%;
	padding: 16px;
	.pie-chart {
		margin-top: 20px;
		width: 600px;
		height: 600px;
	}
}
</style>
