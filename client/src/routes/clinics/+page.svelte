<script lang="ts">
	import { getClinics } from '$lib/sanity';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';
	import Error from '../../components/Error.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';

	let q = $page.url.searchParams.get('q');

	$: clinics = createQuery({
		queryKey: ['clinics', q],
		queryFn: () => getClinics(q)
	});

	$: isError = $clinics.isError;

	if (isError) {
		console.error($clinics.error);
	}
</script>

<h1 class="text-center">Clinics</h1>

<form method="GET" action="?q" data-sveltekit-keepfocus>
	<div class="form-control">
		<label class="input-group w-full">
			<input name="q" bind:value={q} class="input input-bordered w-full" />
			<button class="btn btn-square">
				<Icon icon="ic:outline-search" />
			</button>
		</label>
	</div>
</form>

{#if $clinics.isError}
	<Error />
{/if}
{#if $clinics.isLoading}
	<Loading />
{/if}
{#if $clinics.isSuccess && $clinics.data}
	{#if $clinics.data && $clinics.data.length}
		{#each $clinics.data as clinic}
			<div class="card lg:card-side bg-base-100 shadow-xl">
				<figure>
					<img
						src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
						alt="Album"
					/>
				</figure>
				<div class="card-body">
					<h3 class="card-title">{clinic.name}</h3>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">More</button>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<p>No clinics found.</p>
	{/if}
{/if}
