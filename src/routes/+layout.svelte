<script lang="ts">
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Optom Tools</title>
</svelte:head>

<header>
	<Navbar />
</header>
{#key data.routePath}
	<main>
		<slot />
	</main>
{/key}
<footer>
	<Footer />
</footer>

<style>
	:root {
		--primary-background: #fff;
		--primary-text: #000;
		--primary: #000;
	}
	:global(*) {
		padding: 0;
		margin: 0;
		line-height: 1;
		text-decoration: none;
		box-sizing: border-box;
		transition: all 0.2s ease-in-out 0s;
	}
	header {
		position: sticky;
		top: 0;
		z-index: 1;
	}
	main {
		display: flex;
		margin-left: auto;
		margin-right: auto;
		flex-grow: 1;
		flex-direction: column;
		align-items: center;
		margin: 2rem 0 2rem 0;
		padding: 0 2rem 0 2rem;
	}
	/* Extra small devices (phones, 600px and down) */
	@media only screen and (max-width: 600px) {
		main {
			min-width: 320px;
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}

	/* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (min-width: 600px) {
		main {
			min-width: 480px;
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (min-width: 768px) {
		main {
			min-width: 600px;
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		main {
			min-width: 768px;
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}

	/* Extra large devices (large laptops and desktops, 1200px and up) */
	@media only screen and (min-width: 1200px) {
		main {
			min-width: 922px;
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}
	:global(html) {
		scroll-behavior: smooth;
		scroll-padding: 5rem;
	}
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--primary-background);
		color: var(--primary-text);
	}
	:global(:target) {
		outline: 2px dotted black;
	}
</style>
