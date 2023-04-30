<script lang="ts">
	import { getClinicFromSlug } from '$lib/api';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../../components/Loading.svelte';
	import Error from '../../../components/Error.svelte';
	import { page } from '$app/stores';
	import { formatDistanceToNow } from 'date-fns';
	import Icon from '@iconify/svelte';
	import OptometristCard from '../../../components/OptometristCard.svelte';

	const pathname = $page.url.pathname;

	let slug = pathname.slice(pathname.lastIndexOf('/') + 1);

	$: query = createQuery({
		queryKey: ['clinic', slug],
		queryFn: () => getClinicFromSlug(slug)
	});

	$: clinic = $query.data;
	$: error = $query.error;
	$: isLoading = $query.isLoading;
	$: isSuccess = $query.isSuccess;
	$: isError = $query.isError;

	if (isError) {
		console.error(error);
	}
</script>

{#if isError}
	<Error />
{/if}
{#if isLoading}
	<Loading />
{/if}
{#if isSuccess && clinic}
	<h1 class="text-center">{clinic.attributes.Name}</h1>
	{#if clinic.attributes.Link}
		<a href={clinic.attributes.Link}>{clinic.attributes.Link}</a>
	{/if}
	<h2>
		<span class="flex items-center gap-2">
			<Icon icon="material-symbols:location-on" />
			Locations</span
		>
	</h2>
	<div class="flex flex-col gap-2">
		{#each clinic.attributes.Address as address}
			<div class="flex flex-col gap-1">
				<span>{address.Street}</span>
				<span>{address.City}</span>
				<span>{address.Country.replaceAll('_', ' ')}</span>
			</div>
		{/each}
	</div>
	{#if clinic.attributes.Optometrists.data.length > 0}
		<h2>
			<span class="flex items-center gap-2"
				><Icon icon="mdi:account-outline" />Optometrists</span
			>
		</h2>
		{#each clinic.attributes.Optometrists.data as optometrist}
			<OptometristCard {optometrist} />
		{/each}
	{/if}
	<hr />
	<p class="text-sm text-right">
		Updated {formatDistanceToNow(new Date(clinic.attributes.updatedAt), {
			addSuffix: true
		})}
	</p>
{/if}
