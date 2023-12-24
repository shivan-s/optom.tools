<button {...$$restProps}>
	<slot />
</button>

<style>
	button {
		padding: 0.5rem 1rem 0.5rem 1rem;
		border-top: none;
		border-left: none;
		border-right: none;
		border-bottom: 2px solid var(--primary);
		background-color: var(--primary-background);
		color: var(--primary-text);
		font-family: 'Optician Sans', sans-serif;
		font-size: 1.5rem;
	}

	button:hover {
		border-radius: 0.25rem;
		background-color: var(--primary);
		color: var(--primary-background);
		box-shadow: 0.25rem 0.25rem 0.5rem var(--primary);
	}

	button:active {
		border-radius: 0.25rem;
		background-color: var(--primary-background);
		color: var(--primary);
		box-shadow: none;
		outline: 2px solid var(--primary);
	}
</style>
