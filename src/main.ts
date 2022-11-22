import { createApp } from 'vue';
//全局默认样式
import './style.css';

import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';

createApp(App).use(createPinia()).use(router).mount('#app');
