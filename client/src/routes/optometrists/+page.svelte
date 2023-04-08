<script lang="ts">
	import { getOptometrists } from '$lib/sanity';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['optometrists'],
		queryFn: getOptometrists()
	});

	console.log(query);

	$: data = $query.data;
	$: isLoading = $query.isLoading;
	$: isSuccess = $query.isSuccess;
	$: isError = $query.isError;
	$: error = $query.error;

	if (isError) {
		console.error(error);
	}
</script>

<h1 class="h1">Optometrist</h1>

{#if isLoading}
	...waiting
{/if}
{#if isSuccess && data}
	{#if data.optometrists && data.optometrists.length}
		<ul>
			{#each data.optometrists as optometrist}
				<li>{optometrist.name}</li>
			{/each}
		</ul>
	{:else}
		<p>No optometrists found.</p>
	{/if}
{/if}
