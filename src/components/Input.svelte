<script lang="ts">
	export let label: string | null = null;
</script>

{#if label}
	<label>
		<span>{label}</span>
		<input {...$$restProps} />
	</label>
{:else}
	<input {...$$restProps} />
{/if}

<style>
	label {
		display: flex;
		text-align: center;
		font-size: 0.75rem;
		flex-direction: column;
		gap: 0.5rem;
	}

	input {
		text-align: center;
		font-size: 1.5rem;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: 2px solid var(--primary);
		padding: 0.5rem 1rem 0.5rem 1rem;
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
