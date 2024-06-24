<script lang="ts">
	import '../app.scss';
	import NavBar from '$lib/components/ui/navbar.svelte';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';

	onMount(() => {
		// pb.authStore.loadFromCookie(document.cookie);
		//
		// try {
		// 	pb.authStore.isValid && pb.collection('users').authRefresh();
		// } catch (e) {
		// 	// do nothing
		// }
	});
</script>

<NavBar />

<section class="section">
	<div class="container">
		<slot />
	</div>
</section>

<style>
</style>
