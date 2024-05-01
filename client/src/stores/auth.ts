import { writable } from 'svelte/store';

import type { User } from '$modules/user';

export type AuthStore = {
	user: User | null;
};

const INITIAL_DATA: AuthStore = {
	user: null
};

export const auth = writable(INITIAL_DATA);
