<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLAnchorAttributes {}
</script>

<a href={$$props['href']} {...$$props}>
	<slot />
</a>
