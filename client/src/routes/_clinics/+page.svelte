<script lang="ts">
	import { getClinics } from '$lib/api';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';
	import Error from '../../components/Error.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import Alert from '../../components/Alert.svelte';
  import ClinicCard from '../../components/ClinicCard.svelte';

	const LIMIT = 10;
	let q = $page.url.searchParams.get('q') || '';

	$: query = createInfiniteQuery({
		queryKey: ['clinics', q],
		queryFn: ({ pageParam = 0 }) => getClinics(q, pageParam, LIMIT),
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

<h1 class="text-center">Clinics</h1>

<form method="GET" action="?q" data-sveltekit-keepfocus>
	<div class="form-control">
		<label class="input-group w-full">
			<input name="q" bind:value={q} class="input input-bordered w-full" placeholder="Search clinics" />
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
	{#if pages.length > 0 && pages[0].clinics.data.length > 0}
		{#each pages as { clinics }}
			{#each clinics.data as clinic}
				<ClinicCard clinic={clinic} />
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
