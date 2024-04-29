export class BaseService {
	async request(url: RequestInfo, options: RequestInit = {}) {
		return fetch(url, {
			...options,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...options.headers
			}
		});
	}
}
