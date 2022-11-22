import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
//mock 插件
import { viteMockServe } from 'vite-plugin-mock';
//eslint 插件
import eslint from 'vite-plugin-eslint';
//html 压缩，数据注入、MPA模式插件
import { createHtmlPlugin } from 'vite-plugin-html';
//配置信息
import config from './src/config/index.json';

const { page } = config;

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	console.log('\x1B[34m%s\x1B[39m', '【admin-demo模板：vite3+vue3.2+ts+mock+eslint+prettier+stylus+vue-router4】');
	return {
		resolve: {
			//配置项目路径别名
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@comps': path.join(__dirname, 'src', 'components'),
				'@store': path.join(__dirname, 'src', 'store'),
			},
		},
		plugins: [
			//vue
			vue(),
			//注册 eslint 插件
			eslint(),
			//注册 html数据注入插件
			createHtmlPlugin({
				minify: true,
				entry: 'src/main.ts',
				template: 'index.html',
				inject: {
					data: {
						//网页ejs注入的数据
						...page,
					},
					tags: [
						{
							injectTo: 'body-prepend',
							tag: 'div',
							attrs: {
								id: 'tag',
							},
						},
					],
				},
			}),
			//注册 mock 插件
			viteMockServe({
				//详细配置见：https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md
				//mock文件夹路径
				mockPath: 'mock',
				//设置本地可用
				localEnabled: command === 'serve',
			}),
		],
	};
});
