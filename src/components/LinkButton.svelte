<script lang="ts">
	export let href: string;
</script>

<a {href} {...$$restProps}><slot /></a>

<style>
	a {
		text-transform: uppercase;
		padding: 0.5rem 1rem 0.5rem 1rem;
		border: 2px solid var(--primary-text);
	}
</style>
