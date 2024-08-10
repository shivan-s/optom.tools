<script lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	// eslint-disable-next-line no-unused-vars
	interface $$Props extends HTMLFieldsetAttributes {}
</script>

<fieldset {...$$restProps}><slot /></fieldset>

<style>
	fieldset {
		padding: 0.5rem;
		border: solid 1px var(--primary);
		border-radius: 0.25rem;
	}
</style>
