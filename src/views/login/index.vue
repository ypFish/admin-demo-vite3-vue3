<template>
	<div class="login-container">
		<img class="logo" src="//fes.qyerstatic.com/FgVfajjovkLei3Q8PZUWW_LKCrtK?impwdslim" alt="logo" />
		<h1 class="title">ADMIN_DEMO</h1>
		<div class="login-content">
			<!-- 登录框 -->
			<h2 class="login-title">登录</h2>
			<n-form ref="formRef" :model="formValue" :rules="rules" :size="size" label-align="left" label-placement="left">
				<n-form-item path="user.name">
					<n-input v-model:value="formValue.user.name" placeholder="用户名" />
				</n-form-item>
				<n-form-item path="user.pwd">
					<n-input v-model:value="formValue.user.pwd" type="password" placeholder="密码" />
				</n-form-item>
				<n-form-item>
					<n-button class="login-button" attr-type="button" color="#16A085" :disabled="loading" :loading="loading" @click="handleValidateClick">
						登录
					</n-button>
				</n-form-item>
			</n-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { FormInst, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import { useUserStore } from '@store/user';
import { login } from '@api/index';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const formRef = ref<FormInst | null>(null);

const loading = ref(false);

const message = useMessage();
const size = ref<'small' | 'medium' | 'large'>('large');
const formValue = ref({
	user: {
		name: 'Peng',
		pwd: '',
	},
	phone: '',
});

const rules = {
	user: {
		name: {
			required: true,
			trigger: ['blur'],
			message: '请输入用户名',
		},
		pwd: {
			required: true,
			trigger: ['blur'],
			message: '请输入密码',
		},
	},
};
const handleValidateClick = (e: MouseEvent) => {
	e.preventDefault();
	loading.value = true;
	formRef.value?.validate(async (errors) => {
		if (!errors) {
			//前端验证通过
			let user = await login(formValue.value.user);
			// 正式环境登录
			// if (!user) {
			// 	user = {
			// 		id: 111,
			// 		session_id: '23e23r3-43223r2-33feewfe-2e22',
			// 		nick_name: 'zhangsan',
			// 		avatar: '//fes.qyerstatic.com/FgVfajjovkLei3Q8PZUWW_LKCrtK',
			// 		role: 'admin',
			// 	};
			// }
			if (user) {
				message.success('登录成功');
				console.log('登录成功', user);
				//写入到全局状态仓库中
				userStore.user = user;
				//跳转到首页中
				router.push({
					name: 'home',
				});
				user;
			} else {
				message.error('登录失败');
			}
		} else {
			message.error('登录失败');
		}
		loading.value = false;
	});
};
</script>
<style lang="less" scoped>
.login-container {
	width: 100vw;
	height: 100vh;
	background: url('//fes.qyerstatic.com/FkuxGXJ-8MY5Gdm2-RqSxANu6XT8') no-repeat 0 0 / cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;

	.logo {
		width: 64px;
		margin-top: -60px;
	}

	.title {
		color: #fff;
		font-weight: 700;
		font-size: 24px;
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
		font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol';
	}

	.login-content {
		width: clamp(300px, 90vw, 400px);
		height: 280px;
		margin-top: 20px;
		border-radius: 4px;
		background-color: #fff;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		padding: 20px;

		.login-title {
			font-weight: 600;
			font-size: 18px;
			margin-bottom: 20px;
		}

		.login-button {
			width: 100%;
			margin-top: 10px;
		}
	}
}
</style>
