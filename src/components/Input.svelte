<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		value?: HTMLInputAttributes['value'];
		group?: HTMLInputAttributes['bind:group'];
	}

	export let value: HTMLInputAttributes['value'] = null;
	export let group: HTMLInputAttributes['bind:group'] = null;
</script>

{#if $$props['type'] === 'radio'}
	<input type="radio" bind:group {...$$restProps} />
{:else if $$props['type'] === 'checkbox'}
	<input type="checkbox" bind:group {...$$restProps} />
{:else}
	<input bind:value {...$$restProps} />
{/if}

<style>
	input {
		text-align: center;
		font-size: 1rem;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: 2px solid var(--primary);
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		background-color: var(--primary-background);
	}

	input:user-invalid {
		border-bottom: 2px solid red;
	}

	input:user-valid {
		border-bottom: 2px solid green;
	}

	input:focus {
		border-radius: 0.25rem;
		outline: 1px solid var(--primary);
	}

	input:focus:user-invalid {
		outline: 1px solid red;
	}

	input:focus:user-valid {
		outline: 1px solid green;
	}
</style>
