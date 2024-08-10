<script lang="ts">
	import Box from '$components/Box.svelte';
	import HStack from '$components/HStack.svelte';
	import InputLabel from '$components/InputLabel.svelte';
	import VStack from '$components/VStack.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData, ActionData } from './$types';
	import { loading } from '$lib/stores';
	import Button from '$components/Button.svelte';
	import FieldSet from '$components/FieldSet.svelte';
	import Legend from '$components/Legend.svelte';
	import Input from '$components/Input.svelte';
	import Label from '$components/Label.svelte';

	export let data: PageData;
	export let form: ActionData;

	const {
		form: f,
		constraints,
		capture,
		restore,
		enhance
	} = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		onSubmit: () => loading.set(true),
		onResult: () => loading.set(false)
	});
	export const snapshot = { capture, restore };
</script>

<VStack>
	<Box>
		<form method="POST" use:enhance>
			<VStack>
				<HStack>
					<VStack id="right">
						<HStack>
							<FieldSet>
								<Legend>Right Lens</Legend>
								<VStack>
									<HStack>
										<InputLabel
											type="number"
											label="Sphere"
											name="rightLensSphere"
											bind:value={$f.right.lensSphere}
											{...$constraints.right?.lensSphere}
										/>
										<InputLabel
											type="number"
											label="Cylinder"
											name="rightLensCylinder"
											bind:value={$f.right.lensCylinder}
											{...$constraints.right?.lensCylinder}
										/>
										<InputLabel
											type="number"
											label="Axis"
											name="rightLensAxis"
											bind:value={$f.right.lensAxis}
											{...$constraints.right?.lensAxis}
										/>
									</HStack>
									<HStack style="width: 100%; justify-content: end; align-items: center">
										{#each [{ id: 'cw', label: 'Clockwise' }, { id: 'ccw', label: 'Counter-Clockwise' }] as direction}
											<Label>
												<abbr title={direction.label}>{direction.id}</abbr>
												<Input
													id="right-{direction.id}"
													type="radio"
													name="rightLensRotationDirection"
													bind:group={$f.right.lensRotationDirection}
													value={direction.id}
													{...$constraints.right?.lensRotationDirection}
												/>
											</Label>
										{/each}
										<InputLabel
											type="number"
											label="Lens Rotation"
											name="rightLensRotation"
											bind:value={$f.right.lensRotation}
											{...$constraints.right?.lensRotation}
										/>
									</HStack>
								</VStack>
							</FieldSet>
						</HStack>
						<HStack>
							<FieldSet>
								<Legend>Right Over Rx</Legend>
								<VStack>
									<HStack>
										<InputLabel
											type="number"
											label="Sphere"
											name="rightOverRxSphere"
											bind:value={$f.right.lensSphere}
											{...$constraints.right?.overRxSphere}
										/>
										<InputLabel
											type="number"
											label="Cylinder"
											name="rightOverRxCylinder"
											bind:value={$f.right.lensCylinder}
											{...$constraints.right?.overRxCylinder}
										/>
										<InputLabel
											type="number"
											label="Axis"
											name="rightOverRxAxis"
											bind:value={$f.right.lensAxis}
											{...$constraints.right?.overRxAxis}
										/>
									</HStack>
									<HStack style="width: 100%; justify-content: start">
										<Label>
											Vertex
											<Input
												type="number"
												name="rightVertex"
												bind:value={$f.right.vertex}
												{...$constraints.right?.vertex}
											/>
										</Label>
									</HStack>
								</VStack>
							</FieldSet>
						</HStack>
					</VStack>
					<VStack id="left">
						<HStack>
							<FieldSet>
								<Legend>Left Lens</Legend>
								<VStack>
									<HStack>
										<InputLabel
											type="number"
											label="Sphere"
											name="leftLensSphere"
											bind:value={$f.left.lensSphere}
											{...$constraints.left?.lensSphere}
										/>
										<InputLabel
											type="number"
											label="Cylinder"
											name="leftLensCylinder"
											bind:value={$f.left.lensCylinder}
											{...$constraints.left?.lensCylinder}
										/>
										<InputLabel
											type="number"
											label="Axis"
											name="leftLensAxis"
											bind:value={$f.left.lensAxis}
											{...$constraints.left?.lensAxis}
										/>
									</HStack>
									<HStack style="width: 100%; justify-content: end">
										{#each [{ id: 'cw', label: 'Clockwise' }, { id: 'ccw', label: 'Counter-Clockwise' }] as direction}
											<Label>
												<abbr title={direction.label}>{direction.id}</abbr>
												<Input
													type="radio"
													name="leftLensRotationDirection"
													bind:group={$f.left.lensRotationDirection}
													value={direction}
													{...$constraints.left?.lensRotationDirection}
												/>
											</Label>
										{/each}
										<InputLabel
											type="number"
											label="Lens Rotation"
											name="leftLensRotation"
											bind:value={$f.left.lensRotation}
											{...$constraints.left?.lensRotation}
										/>
									</HStack>
								</VStack>
							</FieldSet>
						</HStack>
						<HStack>
							<FieldSet>
								<Legend>Left Over Rx</Legend>
								<HStack>
									<InputLabel
										type="number"
										label="Sphere"
										name="leftOverRxSphere"
										bind:value={$f.left.lensSphere}
										{...$constraints.left?.overRxSphere}
									/>
									<InputLabel
										type="number"
										label="Cylinder"
										name="leftOverRxCylinder"
										bind:value={$f.left.lensCylinder}
										{...$constraints.left?.overRxCylinder}
									/>
									<InputLabel
										type="number"
										label="Axis"
										name="leftOverRxAxis"
										bind:value={$f.left.lensAxis}
										{...$constraints.left?.overRxAxis}
									/>
								</HStack>
							</FieldSet>
						</HStack>
					</VStack>
				</HStack>
				<HStack>
					<Button type="submit">Submit</Button>
				</HStack>
			</VStack>
		</form>
	</Box>
	{#if form?.result}
		<output>
			<Box>
				<div class="content">
					<pre>{JSON.stringify(form.result, null, 2)}</pre>
				</div>
			</Box>
		</output>
	{/if}
</VStack>

<style>
	.content {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: 0.5rem;
	}
</style>
