<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	let q = $page.url.searchParams.get('q');

	export let data: PageData;
</script>

<h1 class="text-center">Calculators</h1>

<form method="GET" action="?q" data-sveltekit-keepfocus>
	<div class="form-control">
		<label for="q" class="label"><span class="label-text">Search</span></label>
		<label class="input-group w-full">
			<input name="q" bind:value={q} class="input input-bordered" />
			<button class="btn btn-square">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</button>
		</label>
	</div>
</form>
<div class="flex gap-1">
	{#each data.calculators as calculator}
		<div class="tooltip" data-tip={calculator.description}>
			<a
				href={`/calculators${calculator.link}`}
				class="btn normal-case text-md no-underline text-white"
			>
				{calculator.label}
			</a>
		</div>
	{/each}
</div>
