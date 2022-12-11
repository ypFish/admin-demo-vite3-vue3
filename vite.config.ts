import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
//mock 插件
import { viteMockServe } from 'vite-plugin-mock';
//eslint 插件
import eslint from 'vite-plugin-eslint';
//html 压缩，数据注入、MPA模式插件
import { createHtmlPlugin } from 'vite-plugin-html';
//组件自动引入：插件会自动解析模板中的使用到的组件，并导入组件
import Components from 'unplugin-vue-components/vite';
//naive ui 自动引入解析器
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	console.log('\x1B[34m%s\x1B[39m', '【admin-demo模板：vite3+vue3.2+ts+mock+eslint+prettier+stylus+vue-router4】');

	// 根据当前工作目录中的 `mode` 加载 .env 文件
	// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
	const env = loadEnv(mode, process.cwd(), '');

	return {
		resolve: {
			//配置项目路径别名
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@comps': path.join(__dirname, 'src', 'components'),
				'@views': path.join(__dirname, 'src', 'views'),
				'@store': path.join(__dirname, 'src', 'store'),
				'@style': path.join(__dirname, 'src', 'style'),
				'@api': path.join(__dirname, 'src', 'api'),
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
						//网页ejs注入的数据，通过本地环境变量.env[mode]读取
						title: env.VITE_APP_TITLE,
						desc: env.VITE_APP_DESC,
						keywords: env.VITE_APP_KEYWORDS,
						icon: env.VITE_APP_ICON,
					},
					tags: [
						{
							injectTo: 'body-prepend',
							tag: 'div',
							attrs: {
								id: 'body-tag',
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
				// 监控本地mock文件更改，并重新加载 mock 数据
				watchFiles: true,
			}),
			//自动根据模板内组件名称按需引入naive ui库
			Components({
				resolvers: [NaiveUiResolver()],
			}),
		],
	};
});
