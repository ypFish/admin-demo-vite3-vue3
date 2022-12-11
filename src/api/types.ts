export interface ResData {
	code: number;
	msg: string;
	data: {
		[key: string]: any;
	};
}

export interface User {
	id: number;
	session_id: string;
	nick_name: string;
	avatar?: string;
	role: Role;
}

/**
 * @description: 登录函数
 * @return {*}
 */
export interface Login {
	(userInfo: { name: string; pwd: string }): Promise<User | null>;
}
