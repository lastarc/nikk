import type { LayoutLoad } from './$types';
import { pb } from '$lib/pocketbase';
import type { RecordModel } from 'pocketbase';

export const load: LayoutLoad = async () => {
	pb.authStore.loadFromCookie(document.cookie);

	try {
		pb.authStore.isValid && (await pb.collection('users').authRefresh());
	} catch (_) {
		pb.authStore.clear();
	}

	const user = pb.authStore.model;
	let profile: RecordModel | null = null;
	try {
		profile =
			user &&
			(await pb
				.collection('profiles')
				.getFirstListItem(pb.filter('user = {:user}', { user: user.id })));
	} catch (e) {}
	return { user, profile };
};

export const ssr = false;
