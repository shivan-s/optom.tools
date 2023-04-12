<script lang="ts">
	import { getClinics } from '$lib/sanity';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';
	import Error from '../../components/Error.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import Alert from '../../components/Alert.svelte';

	const LIMIT = 10;
	let q = $page.url.searchParams.get('q');

	$: query = createInfiniteQuery({
		queryKey: ['clinics', q],
		queryFn: ({ pageParam = undefined }) => getClinics(q, pageParam, LIMIT)
	});

	$: pages = $query.data?.pages;
	$: isLoading = $query.isLoading;
	$: isSuccess = $query.isSuccess;
	$: isError = $query.isError;
	$: error = $query.error;
	$: fetchNextPage = $query.fetchNextPage;
	$: hasNextPage = $query.hasNextPage;
	$: isFetching = $query.isFetching;
	$: isFetchingNextPage = $query.isFetchingNextPage;

	if (isError) {
		console.error(error);
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

{#if isError}
	<Error />
{/if}
{#if isLoading}
	<Loading />
{/if}
{#if isSuccess && pages}
	<hr />
	{#if pages.length > 0 && pages[0].clinics?.length > 0}
		{#each pages as { clinics }}
			{#each clinics as clinic}
				<div class="card lg:card-side bg-base-100 shadow-xl">
					<!-- <figure> -->
					<!-- 	<img -->
					<!-- 		src="https://media-exp1.licdn.com/dms/image/C5616AQESzK-_ikMJ0A/profile-displaybackgroundimage-shrink_200_800/0/1639983225117?e=2147483647&v=beta&t=_ojvy-ycYmCCJJnnEybfsKz5L_RaPwIJYY0jbwgjCag" -->
					<!-- 		alt="Album" -->
					<!-- 	/> -->
					<!-- </figure> -->
					<div class="card-body">
						<h3 class="card-title">{clinic.name}</h3>
						<div class="card-actions justify-end">
							<a
								data-sveltekit-preload-code
								data-sveltekit-preload-data
								href={`/clinics/${clinic.slug.current}`}
								class="btn btn-primary no-underline text-normal">More</a
							>
						</div>
					</div>
				</div>
			{/each}
		{/each}
		<hr />
		<button
			disabled={!hasNextPage || isFetchingNextPage}
			on:click={() => fetchNextPage()}
			class="btn"
		>
			{#if isFetching}
				<span class="flex gap-1 items-center"><Loading /> Loading...</span>
			{:else if hasNextPage}
				Load more
			{:else}
				No more to load
			{/if}
		</button>
	{:else}
		<Alert message="No clinics found" />
	{/if}
{/if}
