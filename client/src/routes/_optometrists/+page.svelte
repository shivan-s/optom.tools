<script lang="ts">
	import { getOptometrists } from '$lib/api';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';
	import Error from '../../components/Error.svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import Alert from '../../components/Alert.svelte';
	import OptometristCard from '../../components/OptometristCard.svelte';

	const LIMIT = 10;
	let q = $page.url.searchParams.get('q');

	$: query = createInfiniteQuery({
		queryKey: ['pracitioners', q],
		queryFn: ({ pageParam = 0 }) => getOptometrists(q, pageParam, LIMIT),
		getNextPageParam: (lastPage) => {
			if (lastPage.cursor) {
				return lastPage.cursor;
			}
			return undefined;
		}
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

<h1 class="text-center">Optometrists</h1>

<form
	class="flex flex-col gap-2"
	method="GET"
	action="?q"
	data-sveltekit-keepfocus
>
	<div class="form-control">
		<label class="input-group w-full">
			<input
				placeholder="Search optometrists"
				name="q"
				bind:value={q}
				class="input input-bordered w-full"
			/>
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
	{#if pages.length > 0 && pages[0].optometrists?.data.length > 0}
		{#each pages as { optometrists }}
			{#each optometrists.data as optometrist}
				<OptometristCard optometrist={optometrist} />
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
		<Alert message="No optometrists found" />
	{/if}
{/if}
