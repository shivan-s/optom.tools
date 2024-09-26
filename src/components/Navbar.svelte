<script>
	import Logo from '$components/logo/Logo.svelte';
</script>

<nav>
	<a href="/">
		<Logo width="2rem" color="var(--primary-text)" />
		<span>OptomTools</span></a
	>
</nav>

<style>
	nav {
		padding: 1rem;
		border-bottom: 2px solid var(--primary-text);
		display: flex;
		justify-content: space-around;
		backdrop-filter: blur(2px);
		background-color: var(--primary-nav-background);
	}
	a {
		display: flex;
		align-items: center;
	}
	span {
		color: var(--primary-text);
		font-size: 2rem;
		font-family: 'Optician Sans', sans-serif;
	}
</style>
