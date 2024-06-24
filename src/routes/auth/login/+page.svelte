<script>
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	onMount(async () => {
		const authMethods = await pb.collection('users').listAuthMethods();
		const discordAuth = authMethods.authProviders.find((provider) => provider.name === 'discord');
		if (!discordAuth) {
			throw new Error('Discord auth provider not found');
		}
		localStorage.setItem('provider', JSON.stringify(discordAuth));
		const url = new URL(discordAuth.authUrl);
		url.searchParams.set('redirect_uri', window.location.origin + '/auth/callback');
		console.log(url.toString());
		window.location.href = url.toString();
	});
</script>
