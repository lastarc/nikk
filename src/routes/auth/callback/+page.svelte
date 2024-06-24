<script>
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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

		window.location.replace('/');
	});
</script>
