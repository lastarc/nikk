import type { PageLoad } from './$types';
import { getAllStuff } from '$lib/pocketbase';

export const load: PageLoad = async () => {
	return getAllStuff();
};
