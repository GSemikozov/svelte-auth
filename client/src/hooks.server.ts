import { redirect } from '@sveltejs/kit';

import { authService } from '$services/auth';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const isIndexRoute = event.route.id === '/';
	const isProtectedRoute = event.route.id?.startsWith('/(protected)');
	const isAuthRoute = event.route.id?.startsWith('/(auth)');

	if (isProtectedRoute) {
		const accessToken = event.cookies.get('accessToken');

		if (!accessToken) {
			throw redirect(302, '/login');
		}

		const currentUserResponse = await authService.getCurrentUser(accessToken);

		if (currentUserResponse.status !== 'ok') {
			throw redirect(302, '/login');
		}

		event.locals.user = currentUserResponse.result.user;
	}

	if (isIndexRoute || isAuthRoute) {
		const accessToken = event.cookies.get('accessToken');

		if (accessToken) {
			const currentUserResponse = await authService.getCurrentUser(accessToken);

			if (currentUserResponse.status === 'ok') {
				throw redirect(302, '/profile');
			}
		}
	}

	const response = await resolve(event);

	return response;
};
