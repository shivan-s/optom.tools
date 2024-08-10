<script lang="ts">
	import Label from '$components/Label.svelte';
	import Input from '$components/Input.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		label: string;
	}
	export let label: string;
</script>

<Label>
	<span>{label}</span>
	<Input {...$$restProps} />
</Label>
