<script lang="ts">
	import GitHub from '$components/logo/GitHub.svelte';
	import HStack from '$components/HStack.svelte';
	import shivanLogo from '$lib/assets/img/Shivan-Logo-Black.png';
	import Img from '$components/Img.svelte';
	const LOVE = '💗';
</script>

<nav>
	<HStack style="align-items: center; gap: 0.5rem">
		<span>Made with <abbr title="LOVE">{LOVE}</abbr> by</span>
		<a rel="external" href="https://shivan.xyz"
			><Img alt="Shivan" title="Shivan" src={shivanLogo} style="width: 2rem; height: 2rem" /></a
		></HStack
	>
	<a rel="external" title="Source code on GitHub" href="https://github.com/shivan-s/optom.tools">
		<HStack style="align-items: center; gap: 0.5rem; justify-content: center">
			<GitHub width="2rem" height="2rem" />
			<span>Code</span>
		</HStack>
	</a>
</nav>

<style>
	nav {
		padding: 2rem;
		border-top: 2px solid var(--primary-text);
		display: flex;
		justify-content: space-around;
		backdrop-filter: blur(2px);
		background-color: var(--primary-nav-background);
		display: flex;
		justify-content: space-around;
	}
</style>
