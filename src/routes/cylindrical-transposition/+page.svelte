<script lang="ts">
	import Button from '$components/Button.svelte';
	import Input from '$components/Input.svelte';
	import HStack from '$components/HStack.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	import VStack from '$components/VStack.svelte';
	import Box from '$components/Box.svelte';

	export let data: PageData;
	export let form: ActionData;
	const { form: f, constraints } = superForm(data.form);
</script>

<form method="POST">
	<VStack>
		<HStack>
			<Input
				type="number"
				label="Sphere"
				name="sphere"
				step="0.25"
				bind:value={$f.sphere}
				{...$constraints.sphere}
			/>
			<Input
				type="number"
				label="Cylinder"
				name="cylinder"
				step="0.25"
				bind:value={$f.cylinder}
				{...$constraints.cylinder}
			/>
			<Input
				type="number"
				label="Axis"
				name="axis"
				step="0.5"
				bind:value={$f.axis}
				{...$constraints.axis}
			/>
			<Button>Submit</Button>
		</HStack>
		{#if form?.result}
			<Box>
				{form.result.sphere.toFixed(2)} / {form.result.cylinder.toFixed(2)} x {form.result.axis}
			</Box>
		{/if}
	</VStack>
</form>
