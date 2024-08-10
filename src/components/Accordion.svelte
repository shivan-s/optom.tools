<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		id: HTMLBaseAttributes['id'];
	}
	export let id: HTMLBaseAttributes['id'];
</script>

<section {...$$restProps}>
	<input {id} type="checkbox" checked />
	<header>
		<label for={id}>
			<slot name="header" />
		</label>
	</header>
	<div>
		<slot />
	</div>
</section>

<style>
	section {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	section > header > label {
		display: flex;
		width: 100%;
		padding: 1rem;
	}
	section > header {
		display: flex;
		border: 1px solid var(--primary);
		background-color: var(--primary);
		color: var(--primary-background);
		border-radius: 0.25rem;
	}
	section > input[type='checkbox'] {
		position: absolute;
		opacity: 0;
	}
	section > div {
		max-height: 0rem;
		overflow: hidden;
	}
	section > input:checked ~ div {
		max-height: 30rem;
		overflow: auto;
		overflow-y: scroll;
		border: 2px solid var(--primary);
	}
	section > input:checked ~ header {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
