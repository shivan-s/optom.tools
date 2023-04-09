<script>
	import { scale } from 'svelte/transition';
	import Icon from '@iconify/svelte';
</script>

<div in:scale class="alert alert-error shadow-lg">
	<div>
		<Icon icon="material-symbols:error" />
		<span>Something went wrong.</span>
	</div>
</div>
