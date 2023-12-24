<script lang="ts">
	export let href: string;
</script>

<div>
	<a {href} {...$$restProps}><slot /></a>
</div>

<style>
	div {
		padding: 0.25rem 0.5rem;
		overflow-wrap: normal;
		border-top: none;
		border-left: none;
		border-right: none;
		border-bottom: 2px solid var(--primary);
		background-color: var(--primary-background);
		font-family: 'Optician Sans', sans-serif;
		color: var(--primary);
	}

	div:hover {
		border-radius: 0.25rem;
		background-color: var(--primary);
		color: var(--primary-background);
		box-shadow: 0.25rem 0.25rem 0.5rem var(--primary);
	}

	div:active {
		border-radius: 0.25rem;
		background-color: var(--primary-background);
		color: var(--primary);
		box-shadow: none;
		outline: 2px solid var(--primary);
	}

	a {
		text-align: center;
		color: inherit;
	}
</style>
