<script lang="ts">
	import type { Optometrist } from '../lib/types';
	import type { PageData } from './$types';

	let optometrists: Optometrist[];

	export let data: PageData;

	optometrists = data.optometrist;
</script>

<h1>Optometrist</h1>

{#if optometrists && optometrists.length}
	<ul>
		{#each optometrists as optometrist}
			<li>{optometrist.name}</li>
		{/each}
	</ul>
{:else}
	<p>No optometrists found.</p>
{/if}
