<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	interface $$Props extends HTMLLabelAttributes {}
</script>

<legend {...$$restProps}><slot /></legend>
