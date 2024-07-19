<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { RecordModel } from 'pocketbase';

	onMount(async () => {
		const params = new URL(window.location.href).searchParams;
		const state = params.get('state');
		const code = params.get('code');

		try {
			const provider = JSON.parse(localStorage.getItem('provider') || '{}');

			if (provider.state !== state || !code) {
				throw "State parameters don't match.";
			}

			await pb.collection('users').authWithOAuth2Code(
				provider.name,
				code,
				provider.codeVerifier,
				window.location.origin + '/auth/callback',
				// pass optional user create data
				{
					emailVisibility: false
				}
			);
			console.log(pb.authStore);

			document.cookie = pb.authStore.exportToCookie({
				secure: false,
				httpOnly: false
			});
		} catch (error) {
			console.error(error);
			await goto('/auth/login');
		} finally {
			localStorage.removeItem('provider');
		}

		if (!pb.authStore.model) {
			throw new Error('User not found');
		}

		let profile: RecordModel | null = null;
		try {
			profile = await pb
				.collection('profiles')
				.getFirstListItem(pb.filter('user = {:user}', { user: pb.authStore.model.id }));
		} catch (e) {
			/* noop */
		}

		if (!profile) {
			await pb.collection('profiles').create({
				user: pb.authStore.model.id,
				name: pb.authStore.model.username || pb.authStore.model.email.split('@')[0]
			});
		}

		window.location.replace('/');
	});
</script>
