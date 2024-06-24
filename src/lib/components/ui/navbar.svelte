<script lang="ts">
	import { onMount } from 'svelte';
	import { pb, user } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import { ClientResponseError } from 'pocketbase';

	onMount(() => {
		// https://bulma.io/documentation/components/navbar/
		const navbarBurgers = Array.prototype.slice.call(
			document.querySelectorAll('.navbar-burger'),
			0
		);

		navbarBurgers.forEach((el) => {
			el.addEventListener('click', () => {
				const targetSelector = el.dataset.target;
				const target = document.getElementById(targetSelector);

				el.classList.toggle('is-active');
				target?.classList.toggle('is-active');
			});
		});
	});

	let userDropdown = false;

	let editUsernameModalOpen = false;
	let editUsernameError = '';
	let newUsernameInput: HTMLInputElement;

	const saveUsername = async () => {
		const newUsername = newUsernameInput.value.trim();
		if (!newUsername) return;
		try {
			await pb.collection('profiles').update($page.data.profile.id, { name: newUsername });
			window.location.reload();
		} catch (e) {
			console.error(e);
			if (
				e instanceof ClientResponseError &&
				e.response.data.name?.code === 'validation_not_unique'
			) {
				editUsernameError = 'Username already taken';
			} else if (e instanceof Error) {
				editUsernameError = e.message;
			} else {
				editUsernameError = 'An error occurred';
			}
			return;
		}
		editUsernameModalOpen = false;
		newUsernameInput.value = '';
	};
</script>

<div class={`modal ${editUsernameModalOpen ? 'is-active' : ''}`}>
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Edit username</p>
			<button class="delete" aria-label="close" on:click={() => (editUsernameModalOpen = false)}
			></button>
		</header>
		<section class="modal-card-body">
			<input
				class="input"
				type="text"
				placeholder="Text input"
				bind:this={newUsernameInput}
				on:keypress={(e) => e.key === 'Enter' && saveUsername()}
			/>
		</section>
		<footer class="modal-card-foot is-display-flex is-justify-content-space-between">
			<div class="control">
				<p class="help is-danger is-size-6">{editUsernameError}</p>
			</div>
			<div class="buttons">
				<button class="button is-success" on:click={saveUsername}>Save changes</button>
			</div>
		</footer>
	</div>
</div>

<nav class="navbar" aria-label="main navigation">
	<div class="container is-display-flex is-justify-content-space-between">
		<div class="navbar-start">
			<div class="navbar-brand px-2">
				<a class="navbar-item is-family-monospace is-size-3" href="/">
					<img src="/favicon.png" alt="logo" class="" />
					nikk
				</a>
			</div>
		</div>

		<div class="navbar-end is-display-flex is-align-items-center">
			<div class="navbar-item">
				<div class="buttons">
					{#if !$user}
						<a href="/auth/login" class="button is-text">
							<strong>Login</strong>
						</a>
					{:else}
						<div
							class={`navbar-item dropdown is-right ${userDropdown ? 'is-active' : 'is-hoverable'}`}
						>
							<div class="dropdown-trigger">
								<button
									class="navbar-link button is-text"
									on:click={() => (userDropdown = !userDropdown)}
								>
									{$page.data.profile?.name || $user.username}
								</button>
							</div>

							<div class="dropdown-menu">
								<div class="dropdown-content">
									<button
										class="button is-text is-small dropdown-item navbar-item is-display-block"
										on:click={() => (editUsernameModalOpen = true)}
									>
										Edit Username
									</button>
									<hr class="dropdown-divider" />
									<a
										href="/auth/logout"
										class="button is-small is-text dropdown-item navbar-item is-display-block"
									>
										Logout
									</a>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
