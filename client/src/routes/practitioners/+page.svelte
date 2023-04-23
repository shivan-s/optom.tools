<script lang="ts">
	import { getPractitioners } from '$lib/cms';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';
	import Error from '../../components/Error.svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import Alert from '../../components/Alert.svelte';

	const LIMIT = 10;
	let filter = $page.url.searchParams.get('filter') || '';
	let q = $page.url.searchParams.get('q');

	$: query = createInfiniteQuery({
		queryKey: ['pracitioners', filter, q],
		queryFn: ({ pageParam = undefined }) =>
			getPractitioners(filter, q, pageParam, LIMIT),
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

<h1 class="text-center">Practitioners</h1>

<form
	class="flex flex-col gap-2"
	method="GET"
	action="?q"
	data-sveltekit-keepfocus
>
	<div class="form-control">
		<label for="filter" class="label"
			><span class="label-text">Filter</span></label
		>
		<select
			class="select select-bordered w-fit"
			name="filter"
			bind:value={filter}
		>
			<option selected value={''}>All</option>
			<option value="optometrist">Optometrist</option>
			<option value="ophthalmologist">Ophthalmologist</option>
		</select>
	</div>
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
	{#if pages.length > 0 && pages[0].practitioners?.length > 0}
		{#each pages as { practitioners }}
			{#each practitioners as practitioner}
				<div class="card lg:card-side bg-base-100 shadow-xl">
					<!-- <figure> -->
					<!-- 	<img -->
					<!-- 		src="https://media-exp1.licdn.com/dms/image/C5616AQESzK-_ikMJ0A/profile-displaybackgroundimage-shrink_200_800/0/1639983225117?e=2147483647&v=beta&t=_ojvy-ycYmCCJJnnEybfsKz5L_RaPwIJYY0jbwgjCag" -->
					<!-- 		alt="Album" -->
					<!-- 	/> -->
					<!-- </figure> -->
					<div class="card-body">
						<h3 class="card-title">{practitioner.name}</h3>
						<div class="flex flex-wrap gap-1">
							{#each practitioner.profession as profession}
								<div class="capitalize badge badge-primary">{profession}</div>
							{/each}
							{#if practitioner.specialties}
								{#each practitioner.specialties as specialty}
									<div class="capitalize badge">
										{specialty.replace(/([A-Z])/g, ' $1')}
									</div>
								{/each}
							{/if}
							{#if practitioner.subSpecialties}
								{#each practitioner.subSpecialties as specialty}
									<div class="capitalize badge">
										{specialty.replace(/([A-Z])/g, ' $1')}
									</div>
								{/each}
							{/if}
						</div>
						<div class="card-actions justify-end">
							<a
								href={`/practitioners/${practitioner.slug.current}`}
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
