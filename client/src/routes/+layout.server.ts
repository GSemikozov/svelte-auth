import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	const { user } = locals;

	const result = {
		user
	};

	return result;
};
