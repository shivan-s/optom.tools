<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	console.log(form);
</script>

<h1>Cylindrical Transposition</h1>

<p>Useful if you have to transpose between positive and negative cylinders.</p>

<form method="POST" use:enhance>
	<div class="grid sm:grid-cols-3 grid-cols-1 gap-1">
		<div class="form-control">
			<label for="sphere" class="label">
				<span class="label-text">Sphere (DS)</span>
			</label>
			<input
				value={form?.sphere ?? ''}
				name="sphere"
				class="input input-bordered {form?.fieldErrors?.sphere &&
					'input-error'}"
			/>
			<label for="sphere" class="label">
				<span class="label-text-alt text-error"
					>{#if form?.fieldErrors?.sphere}{#each form?.fieldErrors?.sphere as e}{e}{/each}{/if}
				</span>
			</label>
		</div>
		<div class="form-control">
			<label for="cylinder" class="label">
				<span class="label-text">Cylinder (DC)</span>
			</label>
			<input
				value={form?.cylinder ?? ''}
				name="cylinder"
				class="input input-bordered {form?.fieldErrors?.cylinder &&
					'input-error'}"
			/>
			<label for="cylinder" class="label">
				<span class="label-text-alt text-error"
					>{#if form?.fieldErrors?.cylinder}{#each form?.fieldErrors?.cylinder as e}{e}{/each}{/if}
				</span>
			</label>
		</div>
		<div class="form-control">
			<label for="axis" class="label">
				<span class="label-text"> Axis </span>
			</label>
			<input
				value={form?.axis ?? ''}
				name="axis"
				class="input input-bordered {form?.fieldErrors?.axis && 'input-error'}"
			/>
			<label for="axis" class="label">
				<span class="label-text-alt text-error"
					>{#if form?.fieldErrors?.axis}{#each form?.fieldErrors?.axis as e}{e}{/each}{/if}
				</span>
			</label>
		</div>
		<button class="sm:col-span-3 btn">Submit</button>
	</div>
</form>
{#if form?.success}
	<div class="grid sm:grid-cols-3 grid-cols-1 gap-1">
		<div class="form-control">
			<label for="sphere" class="label">
				<span class="label-text">Sphere (DS)</span>
			</label>
			<input
				value={form?.result?.sphere ?? ''}
				disabled={true}
				name="sphere"
				class="input input-bordered {form?.fieldErrors?.sphere &&
					'input-error'}"
			/>
		</div>
		<div class="form-control">
			<label for="cylinder" class="label">
				<span class="label-text">Cylinder (DC)</span>
			</label>
			<input
				value={form?.result?.cylinder ?? ''}
				disabled={true}
				name="cylinder"
				class="input input-bordered {form?.fieldErrors?.cylinder &&
					'input-error'}"
			/>
		</div>
		<div class="form-control">
			<label for="axis" class="label">
				<span class="label-text"> Axis </span>
			</label>
			<input
				value={form?.result?.axis ?? ''}
				disabled={true}
				name="axis"
				class="input input-bordered {form?.fieldErrors?.axis && 'input-error'}"
			/>
		</div>
	</div>
{/if}
