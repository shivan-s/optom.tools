<script lang="ts">
	import { getOptometrists } from '$lib/sanity';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';
	import Error from '../../components/Error.svelte';

	const query = createQuery({
		queryKey: ['pracitioner'],
		queryFn: getOptometrists
	});

	$: optometrists = $query.data;
	$: isLoading = $query.isLoading;
	$: isSuccess = $query.isSuccess;
	$: isError = $query.isError;
	$: error = $query.error;

	if (isError) {
		console.error(error);
	}
</script>

<h1 class="text-center">Practitioners</h1>

{#if isError}
	<Error />
{/if}
{#if isLoading}
	<Loading />
{/if}
{#if isSuccess && optometrists}
	{#if optometrists && optometrists.length}
		<ul>
			{#each optometrists as optometrist}
				<li>{optometrist.name}</li>
			{/each}
		</ul>
	{:else}
		<p>No optometrists found.</p>
	{/if}
{/if}
