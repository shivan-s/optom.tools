<button {...$$restProps}>
	<slot />
</button>

<style>
	button {
		padding: 0.5rem 1rem 0.5rem 1rem;
		border: 2px solid var(--primary-text);
		background-color: var(--primary);
		color: var(--primary-background);
		border-radius: 1rem;
		font-family: 'Optician Sans', sans-serif;
	}

	button:hover {
		background-color: var(--primary-background);
		color: var(--primary);
	}

	button:active {
		background-color: var(--primary-background);
		color: var(--primary);
	}
</style>
