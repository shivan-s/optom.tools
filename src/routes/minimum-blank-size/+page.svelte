<script lang="ts">
	import Button from '$components/Button.svelte';
	import Input from '$components/Input.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	import VStack from '$components/VStack.svelte';
	import Box from '$components/Box.svelte';
	import { loading } from '$lib/stores';

	export let data: PageData;
	export let form: ActionData;
	const {
		form: f,
		constraints,
		enhance
	} = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		onSubmit: () => loading.set(true),
		onResult: () => loading.set(false)
	});
</script>

<VStack>
	<Box>
		<form method="POST" use:enhance>
			<VStack>
				<Input
					type="number"
					label="Right PD (mm)"
					name="rightPD"
					step="0.01"
					bind:value={$f.rightPD}
					{...$constraints.rightPD}
				/>
				<Input
					type="number"
					label="Left PD (mm)"
					name="leftPD"
					step="0.01"
					bind:value={$f.leftPD}
					{...$constraints.leftPD}
				/>
				<Input
					type="number"
					label="Frame Size (mm)"
					name="frameSize"
					step="0.01"
					bind:value={$f.frameSize}
					{...$constraints.frameSize}
				/>
				<Input
					type="number"
					label="Frame DBL (mm)"
					name="frameDBL"
					step="0.01"
					bind:value={$f.frameDBL}
					{...$constraints.frameDBL}
				/>
				<Input
					type="number"
					label="Effective Diameter (mm)"
					name="effectiveDiamter"
					step="0.01"
					bind:value={$f.effectiveDiameter}
					{...$constraints.effectiveDiameter}
				/>
				<Button type="submit">Submit</Button>
			</VStack>
		</form>
	</Box>
	{#if form?.result}
		<Box>
			<div class="content">
				<p>Right:</p>
				<p>{form.result.right.toFixed(2)}</p>
				<p>Left:</p>
				<p>{form.result.left.toFixed(2)}</p>
			</div>
		</Box>
	{/if}
</VStack>

<style>
	.content {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: 0.5rem;
	}
</style>
