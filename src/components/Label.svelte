<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	interface $$Props extends HTMLLabelAttributes {}
</script>

<label {...$$restProps}>
	<slot />
</label>

<style>
	label {
		display: flex;
		text-align: center;
		font-size: 0.75rem;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
