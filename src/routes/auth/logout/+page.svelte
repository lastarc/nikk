<script lang="ts">
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';

	onMount(() => {
		const url = new URL(window.location.href);
		pb.authStore.clear();
		document.cookie = pb.authStore.exportToCookie({
			secure: false,
			httpOnly: false
		});
		const next = url.searchParams.get('next') || '/';
		window.location.replace(next);
	});
</script>
