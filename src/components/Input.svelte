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
		flex-direction: column;
	}

	input {
		text-align: center;
		border-radius: 0.25rem;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: 2px solid var(--primary);
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
	}

	input:user-invalid {
		border-bottom: 2px solid red;
	}

	input:user-valid {
		border-bottom: 2px solid green;
	}

	input:focus {
		outline: 1px solid var(--primary);
	}

	input:focus:user-invalid {
		outline: 1px solid red;
	}

	input:focus:user-valid {
		outline: 1px solid green;
	}
</style>
