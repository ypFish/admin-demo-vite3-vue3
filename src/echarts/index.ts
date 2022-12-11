/*
 * @Author: Yu Peng
 * @Date: 2022-12-01 18:29:49
 * @LastEditTime: 2022-12-02 15:51:06
 * @Description: 使用 按需引入 的方式封装echarts引入
 */

import * as echarts from 'echarts/core';
import { ECharts as EChartsType } from 'echarts/core';

//在此引入 柱状图和折线图
import {
	BarChart,
	// 系列类型的定义后缀都为 SeriesOption
	BarSeriesOption,
	LineChart,
	LineSeriesOption,
	PieChart,
	PieSeriesOption,
} from 'echarts/charts';
import {
	TitleComponent,
	// 组件类型的定义后缀都为 ComponentOption
	TitleComponentOption,
	TooltipComponent,
	TooltipComponentOption,
	GridComponent,
	GridComponentOption,
	// 数据集组件
	DatasetComponent,
	DatasetComponentOption,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent,
	LegendComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
	BarSeriesOption | LineSeriesOption | PieSeriesOption | TitleComponentOption | TooltipComponentOption | GridComponentOption | DatasetComponentOption
>;

// echart对象类型
export type ECharts = EChartsType;

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LegendComponent,
	BarChart,
	LineChart,
	PieChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
]);

// 导出
export default echarts;
