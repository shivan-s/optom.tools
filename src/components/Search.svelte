<script lang="ts">
	export let value: string | null;
</script>

<search>
	<form data-sveltekit-noscroll data-sveltekit-keepfocus data-sveltekit-replacestate method="GET">
		<span>
			<input placeholder="Search OptomTools..." name="q" {value} /><button type="submit"
				>Submit</button
			>
		</span>
	</form>
	{#if value}
		<a href="/">Clear filter "{value}"</a>
	{/if}
</search>

<style>
	search {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		justify-content: center;
		align-items: center;
	}

	span:hover {
		display: flex;
		border-radius: 0.25rem;
		box-shadow: 0.25rem 0.25rem 0.5rem var(--primary);
		outline: 2px solid var(--primary);
	}

	input {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: 2px solid var(--primary);
		padding: 0.5rem 1rem 0.5rem 1rem;
	}

	input:focus {
		outline: none;
	}

	button {
		padding: 0.5rem 1rem 0.5rem 1rem;
		border-top: none;
		border-left: none;
		border-right: none;
		border-bottom: 2px solid var(--primary);
		background-color: var(--primary-background);
		color: var(--primary-text);
		font-family: 'Optician Sans', sans-serif;
	}

	button:hover {
		background-color: var(--primary);
		color: var(--primary-background);
		box-shadow: 0.25rem 0.25rem 0.5rem var(--primary);
	}

	button:active {
		background-color: var(--primary-background);
		color: var(--primary);
		box-shadow: none;
	}
</style>
