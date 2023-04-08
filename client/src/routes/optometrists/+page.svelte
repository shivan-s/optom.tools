<script lang="ts">
	import { getOptometrists } from '$lib/sanity';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';

	const query = createQuery({
		queryKey: ['optometrists'],
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

<h1 class="text-center">Optometrist</h1>

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
