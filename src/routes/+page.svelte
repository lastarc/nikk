<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import type { RecordModel } from 'pocketbase';
	import { getAllStuff, saveNewNick } from '$lib/pocketbase';

	export let data: PageData;
	const { profile } = data;

	const profiles = writable<RecordModel[]>(data.profiles);
	const characters = writable<RecordModel[]>(data.characters);
	const nicks = writable<RecordModel[]>(data.nicks);

	const editModal = writable<{
		character: RecordModel;
		currentNick?: RecordModel;
	} | null>(null);
	const newNick = writable('');

	const saveNick = async () => {
		if (!profile || !$editModal) return;
		await saveNewNick(profile.id, $editModal?.character.id, $newNick);
		editModal.set(null);
		newNick.set('');

		const updatedData = await getAllStuff();
		profiles.set(updatedData.profiles);
		characters.set(updatedData.characters);
		nicks.set(updatedData.nicks);
	};

	const imageBucketEndpoint = 'https://c1.nikk.cc';
</script>

<!--<pre>{JSON.stringify(profile, null, 2)}</pre>-->
<!--<pre>{JSON.stringify(nicks.slice(0, 10), null, 2)}</pre>-->

{#if !profile}
	<div
		class="oh-no is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-fullheight pt-4 is-row-gap-4"
	>
		<img src="/assets/images/fail.png" alt="ganyu oh no" class="w-32 h-auto" />
		<p class="text-center">You must be logged in to view this page</p>
	</div>
{:else}
	<div class={`modal ${$editModal ? 'is-active' : ''}`}>
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">
					{$editModal?.currentNick ? 'Edit' : 'Add'} nickname for {$editModal?.character
						.displayName}
				</p>
				<button class="delete" aria-label="close" on:click={() => editModal.set(null)}></button>
			</header>
			<section class="modal-card-body">
				<figure class="image is-9by16" style="width: 100%; height: 100%;">
					<img
						style="object-fit: contain; object-position: center;"
						src={`${imageBucketEndpoint}/${$editModal?.character.name}.card.jpg`}
						alt={`${$editModal?.character.displayName}'s card`}
					/>
				</figure>
			</section>
			<footer class="modal-card-foot is-display-flex is-justify-content-space-between">
				<div class="control">
					<input
						class={`input bg-${$editModal?.character.element}`}
						type="text"
						placeholder="Text input"
						bind:value={$newNick}
					/>
				</div>
				<div class="buttons">
					<!--				<button class="button" on:click={() => editModal.set(null)}>Cancel</button>-->
					<button class="button is-success" on:click={saveNick}>Save changes</button>
				</div>
			</footer>
		</div>
	</div>

	<div class="items">
		{#each $characters as character (character.id)}
			<div class={`card is-flex-grow-1 bg-${character.element}`}>
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-48x48">
								<img
									class="is-rounded"
									src={`${imageBucketEndpoint}/${character.name}.icon.png`}
									alt={`${character.displayName}'s icon`}
								/>
							</figure>
							<div class="mt-4">
								{#if profile}
									<button
										class="button is-small edit-button"
										on:click={() => {
											editModal.set({
												character,
												currentNick: $nicks.find(
													(nick) => nick.character === character.id && nick.profile === profile.id
												)
											});
											newNick.set($editModal?.currentNick?.name || '');
										}}
									>
										{#if $nicks.find((nick) => nick.character === character.id && nick.profile === profile.id)}
											Edit
										{:else}
											Add
										{/if}
									</button>
								{/if}
							</div>
						</div>
						<div class="media-content">
							<p class="title is-4 mb-2">
								{character.displayName}
							</p>
							<div class="subtitle is-6">
								{#each $nicks
									.filter((nick) => nick.character === character.id)
									.sort( (a, b) => (a.profile === profile?.id ? -1 : b.profile === profile?.id ? 1 : 0) )
									.map( (nick) => ({ id: nick.id, byMe: nick.profile === profile?.id, name: nick.name, user: $profiles.find((profile) => profile.id === nick.profile)?.name }) ) as nick (nick.id)}
									<div class="my-1 is-flex is-align-items-start is-gap-1">
										<span class={`tag ${nick.byMe ? 'has-text-weight-bold' : ''}`}>
											{nick.user}
										</span>
										<span class="nick-name">
											{nick.name}
										</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.oh-no {
		height: 60vh;
	}

	.items {
		display: grid;
		grid-template-columns: repeat(auto-fill, min(350px, calc(100vw - 3rem)));
		grid-template-rows: auto;
		grid-gap: 1.5rem;
		justify-items: center;
		justify-content: space-around;
	}

	.card {
		width: 100%;
		transition: transform 0.2s ease-in-out;
	}

	.card:hover {
		transform: scale(1.05) translateY(-0.5rem);
	}

	.card:not(:last-child) {
		margin-bottom: 0;
	}

	.nick-name {
		line-height: 1.5;
	}

	.bg-anemo {
		background-color: rgb(209 250 229); /* emerald-100 */
	}

	.bg-geo {
		background-color: rgb(254 249 195); /* yellow-100 */
	}

	.bg-electro {
		background-color: rgb(243 232 255); /* purple-100 */
	}

	.bg-dendro {
		background-color: rgb(187 247 208); /* green-200 */
	}

	.bg-hydro {
		background-color: rgb(219 234 254); /* blue-100 */
	}

	.bg-pyro {
		background-color: rgb(254 226 226); /* red-100 */
	}

	.bg-cryo {
		background-color: rgb(207 250 254); /* cyan-100 */
	}
</style>
