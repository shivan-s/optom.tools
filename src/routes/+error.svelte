<script lang="ts">
	import { page } from '$app/stores';
	import H1 from '$components/H1.svelte';
</script>

<svelte:head>
	<title>{$page.status} Error - Optom Tools</title>
</svelte:head>
{#if $page.error}
	<H1>
		{#each Array.from($page.status.toString()) as l}
			<span class="header">
				{l}
			</span>
		{/each}
	</H1>
	<p>
		{#each $page.error.message.split(' ') as w}
			<span class="message">
				{w}
			</span>
		{/each}
	</p>
{/if}

<style>
	@keyframes fade {
		from {
			opacity: 0.8;
			filter: blur(10px);
		}
	}
	span.header {
		font-size: 6rem;
		animation: fade 1.5s cubic-bezier(0.2, 2, 0.8, -2);
	}

	p {
		font-size: 2rem;
		animation: fade 1s cubic-bezier(0.2, 2, 0.8, -2);
	}

	span.header:hover,
	span.message:hover {
		filter: blur(2px);
	}
</style>
