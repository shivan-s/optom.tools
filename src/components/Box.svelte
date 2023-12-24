<script>
	import { sineIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<div in:fade={{ easing: sineIn }} {...$$restProps}>
	<slot />
</div>

<style>
	div {
		text-align: center;
		margin: 1rem 0rem;
		padding: 1rem;
		width: 100%;
		border-radius: 0.25rem;
		border: 2px solid var(--primary);
		box-shadow: 0.25rem 0.25rem 0.5rem var(--primary);
	}
</style>
