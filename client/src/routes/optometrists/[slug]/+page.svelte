<script lang="ts">
	import { getOptometristFromSlug } from '$lib/api';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../../components/Loading.svelte';
	import Error from '../../../components/Error.svelte';
	import { page } from '$app/stores';
	import { formatDistanceToNow } from 'date-fns';
	import Icon from '@iconify/svelte';
	import Alert from '../../../components/Alert.svelte';
	import ClinicCard from '../../../components/ClinicCard.svelte';

	const pathname = $page.url.pathname;

	let slug = pathname.slice(pathname.lastIndexOf('/') + 1);

	$: query = createQuery({
		queryKey: ['pracitioner-slug', slug],
		queryFn: () => getOptometristFromSlug(slug)
	});

	$: optometrist = $query.data;
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
{#if isSuccess && optometrist}
	<h1 class="text-center">{optometrist.attributes.Name}</h1>
	<div class="flex flex-wrap gap-1 justify-center">
		<div class="badge badge-primary capitalize">optometrist</div>
		{#if optometrist.attributes.Locum}
			<div class="badge badge-secondary capitalize">locum</div>
		{/if}
		{#if optometrist.attributes.Specialities}
			{#each optometrist.attributes.Specialities as { Specialities: specialty }}
				<div class="badge capitalize">
					{specialty.replace(/([A-Z])/g, ' $1')}
				</div>
			{/each}
		{/if}
	</div>
	<div class="flex flex-wrap gap-1 justify-center" />
	<h2>
		<span class="flex items-center gap-2"
			><Icon icon="icon-park-outline:glasses-one" />{optometrist.attributes.Clinics?.data.length === 1
				? 'Clinics'
				: 'Clinic'}</span
		>
	</h2>
	{#if optometrist.attributes.Clinics.data.length > 0}
		{#each optometrist.attributes.Clinics.data as clinic}
			<ClinicCard {clinic} />
		{/each}
	{:else}
		<Alert
			message={`${optometrist.attributes.Name} is not registered to any clinics`}
		/>
	{/if}
	<hr />
	<!-- <pre>{JSON.stringify(practitioner, null, 2)}</pre> -->
	<p class="text-sm text-right">
		Updated {formatDistanceToNow(new Date(optometrist.attributes.updatedAt), {
			addSuffix: true
		})}
	</p>
{/if}
