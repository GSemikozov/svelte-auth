import { PUBLIC_API_URL } from '$env/static/public';

import { BaseService } from './base';

export type RegisterPayload = {
	telegramId: string;
	password: string;
};

export type StartLoginChallengePayload = {
	telegramId: string;
	password: string;
};

export type LoginChallengePayload = {
	telegramId: string;
	password: string;
	token: string;
};

class AuthService extends BaseService {
	async register(payload: RegisterPayload) {
		try {
			const response = await this.request(PUBLIC_API_URL + '/register', {
				method: 'POST',
				body: JSON.stringify(payload)
			});

			const json = await response.json();

			return json;
		} catch (error) {
			console.log(error);
		}
	}

	async startLoginChallenge(payload: StartLoginChallengePayload) {
		try {
			const response = await this.request(PUBLIC_API_URL + '/pre-login', {
				method: 'POST',
				body: JSON.stringify(payload)
			});

			const json = await response.json();

			return json;
		} catch (error) {
			console.log(error);
		}
	}

	async login(payload: LoginChallengePayload) {
		try {
			const response = await this.request(PUBLIC_API_URL + '/login', {
				method: 'POST',
				body: JSON.stringify(payload)
			});

			const json = await response.json();

			return json;
		} catch (error) {
			console.log(error);
		}
	}

	async getCurrentUser(accessToken: string) {
		try {
			const response = await this.request(PUBLIC_API_URL + '/get-current-user', {
				method: 'GET',
				headers: {
					Authorization: accessToken
				}
			});

			const json = await response.json();

			return json;
		} catch (error) {
			console.log(error);
		}
	}
}

export const authService = new AuthService();
