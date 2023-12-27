<h1 {...$$restProps}>
	<slot />
</h1>

<style>
	h1 {
		color: var(--primary-text);
		text-decoration: captilize;
		margin: 0.5rem 0rem 2rem 0rem;
		padding: 1rem 2rem 1rem 2rem;
		border-left: 4px double green;
		border-right: 4px double red;
		font-family: 'Optician Sans', sans-serif;
	}
</style>
