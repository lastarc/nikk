import PocketBase, { type AuthModel, type RecordModel } from 'pocketbase';
import { env } from '$env/dynamic/public';
import { writable, readonly } from 'svelte/store';

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

const _user = writable<AuthModel>(pb.authStore.model);

pb.authStore.onChange(() => {
	_user.set(pb.authStore.model);
});

export const user = readonly(_user);

export const getAllStuff = async () => {
	const profiles = await pb.collection('profiles').getFullList({
		sort: '+created',
		fields: 'id, name, user'
	});
	const characters = await pb.collection('characters').getFullList({
		sort: '+created',
		fields: 'id, name, displayName, element'
	});
	const nicks = await pb.collection('nicks').getFullList({
		sort: '+created',
		fields: 'id, profile, character, name'
	});
	return { profiles, characters, nicks };
};

export const saveNewNick = async (profileId: string, characterId: string, name: string) => {
	let existingNick: RecordModel | null = null;
	try {
		existingNick = await pb.collection('nicks').getFirstListItem(
			pb.filter('profile = {:profile} && character = {:character}', {
				profile: profileId,
				character: characterId
			})
		);
	} catch (e) {}
	if (existingNick && name.trim() === '') {
		await pb.collection('nicks').delete(existingNick.id);
		return;
	}
	if (existingNick) {
		await pb.collection('nicks').update(existingNick.id, { name });
	} else {
		await pb.collection('nicks').create({
			profile: profileId,
			character: characterId,
			name
		});
	}
};
