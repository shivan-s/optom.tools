<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import Footer from '$components/Footer.svelte';
	import H1 from '$components/H1.svelte';
	import Navbar from '$components/Navbar.svelte';
	import type { LayoutData } from './$types';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: LayoutData;

	$: pageTitle = $page.data['pageTitle'];
</script>

<svelte:head>
	{#if pageTitle}
		<title>
			{pageTitle} - OptomTools
		</title>
	{:else}
		<title>OptomTools</title>
	{/if}
</svelte:head>

<header>
	<Navbar />
</header>
{#key data.routePath}
	<main>
		<div class="inner">
			{#if dev && $page.data['form']}
				<div class="full">
					<SuperDebug data={$page.data['form']} />
				</div>
			{/if}
			{#if $page.data['pageTitle']}
				<a href={data.routePath}>
					<H1>{$page.data['pageTitle']}</H1>
				</a>
			{/if}
			<slot />
		</div>
	</main>
{/key}
<footer>
	<Footer />
</footer>

<style>
	@media (prefers-color-scheme: dark) {
		:root {
			--primary-background: hsla(185, 99%, 99%);
			--primary-nav-background: hsla(185, 99%, 99%, 0.9);
			--primary-text: hsla(185, 99%, 3%);
			--primary: hsla(185, 99%, 3%);
		}
	}
	@media (prefers-color-scheme: dark) {
		:root {
			--primary-background: hsla(185, 99%, 99%);
			--primary-nav-background: hsla(185, 99%, 99%, 0.9);
			--primary-text: hsla(185, 99%, 3%);
			--primary: hsla(185, 99%, 3%);
		}
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
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
		gap: 1rem;
		flex-grow: 1;
		align-items: center;
		margin: 2rem 0 2rem 0;
	}
	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 75ch;
		margin-bottom: 6rem;
	}
	.full {
		width: 100%;
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
		font-family: sans-serif;
	}
	:global(:target) {
		outline: 2px dotted black;
	}

	@font-face {
		font-family: 'Optician Sans';
		font-style: normal;
		font-weight: 400;
		src: url('/fonts/Optiker-K.eot');
		src:
			local(''),
			url('/fonts/Optiker-K.eot?#iefix') format('embedded-opentype'),
			url('/fonts/Optiker-K.woff') format('woff'),
			url('/fonts/Optiker-K.ttf') format('truetype');
	}
</style>
