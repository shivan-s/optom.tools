<script>
	import { scale } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	export let message = '';
</script>

<div in:scale class="alert alert-info shadow-lg">
	<div>
		<Icon icon="mdi:information-slab-circle-outline" />
		<span>{message}</span>
	</div>
</div>
