import { PUBLIC_API_URL } from '$env/static/public';
import { BaseService } from './base';

export type RegisterPayload = {
	telegramId: string;
	password: string;
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
}

export const authService = new AuthService();
