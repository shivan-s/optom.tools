<script lang="ts">
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import Footer from '../components/Footer.svelte';
	import Icon from '@iconify/svelte';
	import type { NavbarItem } from '$lib/types';
	import type { LayoutData } from './$types';

	const navbarItems: NavbarItem[] = [
		{
			label: 'Home',
			link: '/',
			icon: 'ic:outline-home'
		},
		/* { label: 'About', link: '/about', icon: 'mdi:about-circle-outline' }, */
		{
			label: 'Calculators',
			link: '/calculators',
			icon: 'mdi:calculator'
		},
		/* { */
		/* 	label: 'Optometrists', */
		/* 	link: '/optometrists', */
		/* 	icon: 'mdi:account-outline' */
		/* }, */
		/* { */
		/* 	label: 'Clinics', */
		/* 	link: '/clinics', */
		/* 	icon: 'icon-park-outline:glasses-one' */
		/* } */
	];

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Optometry Resources</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<div class="drawer drawer-mobile">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content bg-base-200">
			<div class="flex flex-col justify-around w-full">
				<div class="navbar bg-base-100 shadow-md">
					<div class="navbar-start">
						<label for="my-drawer" class="btn btn-ghost btn-square lg:hidden">
							<Icon icon="quill:hamburger-sidebar" />
						</label>
					</div>
					<div class="navbar-center">
						<a href="/" class="btn btn-ghost normal-case text-xl"
							>Optometry Resources</a
						>
					</div>
					<div class="navbar-end" />
				</div>
				<div
					class="py-6 container prose mx-auto flex flex-col min-h-screen flex-grow gap-4"
				>
					<slot />
				</div>
				<Footer />
			</div>
		</div>
		<div class="drawer-side">
			<label for="my-drawer" class="drawer-overlay" />
			<ul
				class="menu flex flex-col gap-1 p-4 w-60 bg-base-100 text-base-content"
			>
				{#each navbarItems as navbarItem}
					<li>
						<a
							class={$page.url.pathname === navbarItem.link
								? 'active'
								: 'inactive'}
							href={navbarItem.link}
							data-sveltekit-preload-data
							data-sveltekit-preload-code
							><span>
								<Icon icon={navbarItem.icon} />
							</span>
							{navbarItem.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</QueryClientProvider>

<style>
	div :global(svg) {
		font-size: 24px;
		line-height: 1em;
	}
</style>
