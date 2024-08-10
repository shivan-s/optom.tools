<script lang="ts">
	import { sineIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {}
</script>

<div in:fade={{ easing: sineIn }} {...$$restProps}>
	<slot />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		font-size: 1.5rem;
		margin: 1rem 0rem;
		padding: 1rem;
		width: 100%;
		border-radius: 0.25rem;
		border: 2px solid var(--primary);
		box-shadow: 0.25rem 0.25rem 0.5rem var(--primary);
		font-family: 'Optician Sans', sans-serif;
	}
</style>
