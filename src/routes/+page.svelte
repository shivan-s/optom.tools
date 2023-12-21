<script lang="ts">
	import LinkButton from '$components/LinkButton.svelte';
	import HStack from '$components/HStack.svelte';
	import VStack from '$components/VStack.svelte';
	import type { PageData } from './$types';
	import Button from '$components/Button.svelte';

	export let data: PageData;
	console.log(data);
</script>

<VStack>
	<search>
		<form data-sveltekit-noscroll data-sveltekit-keepfocus data-sveltekit-replacestate method="GET">
			<input name="q" placeholder="Search" /><Button>Search</Button>
		</form>
	</search>
	<HStack>
		{#each data.links as { name, url }}
			<LinkButton href={url}>{name}</LinkButton>
		{/each}
	</HStack>
</VStack>
