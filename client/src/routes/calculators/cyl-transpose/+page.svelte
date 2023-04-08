<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	console.log(form);
</script>

<h1>Cylindrical Transposition</h1>

<form
	method="POST"
	action="?cylTranspose"
	use:enhance={() =>
		async ({ update }) =>
			await update()}
>
	<div class="grid sm:grid-cols-3 grid-cols-1 gap-1">
		<div class="form-control">
			<label for="sphereTop" class="label">
				<span class="label-text">Sphere (DS)</span>
			</label>
			<input
				value={form?.sphereTop}
				name="sphereTop"
				type="number"
				step="0.25"
				class="input input-bordered"
			/>
		</div>
		<div class="form-control">
			<label for="cylinderTop" class="label">
				<span class="label-text">Cylinder (DC)</span>
			</label>
			<input
				value={form?.cylinderTop}
				name="cylinderTop"
				type="number"
				step="0.25"
				class="input input-bordered"
			/>
		</div>
		<div class="form-control">
			<label for="axisTop" class="label">
				<span class="label-text"> Axis </span>
			</label>
			<input
				value={form?.axisTop}
				name="axisTop"
				type="number"
				step="1"
				min="0"
				max="180"
				class="input input-bordered"
			/>
		</div>
		<button class="col-start-3 col-end-3 btn">Submit</button>
	</div>
	<div class="grid sm:grid-cols-3 grid-cols-1 gap-1">
		<div class="form-control">
			<label for="sphere" class="label">
				<span class="label-text">Sphere (DS)</span>
			</label>
			<input
				value={form?.sphereBottom}
				name="sphere"
				type="number"
				step="0.25"
				class="input input-bordered"
			/>
		</div>
		<div class="form-control">
			<label for="cylinder" class="label">
				<span class="label-text">Cylinder (DC)</span>
			</label>
			<input
				value={form?.cylinderBottom}
				name="cylinder"
				type="number"
				step="0.25"
				class="input input-bordered"
			/>
		</div>
		<div class="form-control">
			<label for="axis" class="label">
				<span class="label-text"> Axis </span>
			</label>
			<input
				value={form?.axisBottom}
				name="axis"
				type="number"
				step="1"
				min="0"
				max="180"
				class="input input-bordered"
			/>
		</div>
	</div>
</form>
