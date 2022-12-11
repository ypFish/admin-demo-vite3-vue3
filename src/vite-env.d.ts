/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

interface ImportMetaEnv {
	// 更多环境变量提示
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_DESC: string;
	readonly VITE_APP_KEYWORDS: string;
	readonly VITE_APP_ICON: string;
	readonly VITE_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// declare module '*.json' {
// 	const value: any;
// 	export default value;
// }
