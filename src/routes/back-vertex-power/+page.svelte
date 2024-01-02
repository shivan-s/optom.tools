<script lang="ts">
	import { enhance } from '$app/forms';
	import Box from '$components/Box.svelte';
	import Input from '$components/Input.svelte';
	import VStack from '$components/VStack.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	import Button from '$components/Button.svelte';
	import { outputDioptre } from '$lib';

	export let data: PageData;
	export let form: ActionData;
	const { form: f, constraints } = superForm(data.form);
</script>

<VStack>
	<Box>
		<form method="POST" use:enhance>
			<VStack>
				<Input
					type="number"
					placeholder="-1.00"
					label="Sphere (D)"
					name="sphere"
					step="0.25"
					bind:value={$f.sphere}
					{...$constraints.sphere}
				/>
				<Input
					type="number"
					placeholder="-1.00"
					label="Cylinder (D)"
					name="cylinder"
					step="0.25"
					bind:value={$f.cylinder}
					{...$constraints.cylinder}
				/>
				<Input
					type="number"
					placeholder="90"
					label="Axis (deg)"
					name="axis"
					step="0.5"
					bind:value={$f.axis}
					{...$constraints.axis}
				/>
				<Input
					type="number"
					placeholder="12"
					label="Spectacle BVP (mm)"
					name="specBVD"
					step="0.1"
					bind:value={$f.specBVD}
					{...$constraints.specBVD}
				/>
				<Button>Submit</Button>
			</VStack>
		</form>
	</Box>
	{#if form?.result}
		<Box>
			<span>
				{outputDioptre(form.result.sphere)} / {outputDioptre(form.result.cylinder)} x {form.result
					.axis}
			</span>
		</Box>
	{/if}
</VStack>
