<script lang="ts">
	import LinkButton from '$components/LinkButton.svelte';
	import HStack from '$components/HStack.svelte';
	import VStack from '$components/VStack.svelte';
	import type { PageData } from './$types';
	import Search from '$components/Search.svelte';

	export let data: PageData;
</script>

<VStack>
	<Search value={data.q} />
	<HStack>
		{#each data.links as { name, url }}
			<span>
				<LinkButton href={url}>{name}</LinkButton>
			</span>
		{/each}
	</HStack>
</VStack>

<style>
	span {
		margin: 0.5rem 0rem;
		text-align: center;
	}
	span:nth-child(1) {
		font-size: 3rem;
	}
	span:nth-child(2) {
		font-size: 2rem;
	}
	span:nth-child(3) {
		font-size: 1.5rem;
	}
	span:nth-child(4) {
		font-size: 1.25rem;
	}
	span:nth-child(5) {
		font-size: 1.125rem;
	}
</style>
