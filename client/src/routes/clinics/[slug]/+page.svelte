<script lang="ts">
	import { getClinicFromSlug } from '$lib/api';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../../components/Loading.svelte';
	import Error from '../../../components/Error.svelte';
	import { page } from '$app/stores';
	import { formatDistanceToNow } from 'date-fns';
	import Icon from '@iconify/svelte';
	import { PUBLIC_CMS_BASE_URL } from '$env/static/public';
	import Alert from '../../../components/Alert.svelte';

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
	<pre>{JSON.stringify(clinic, null, 2)}</pre>
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
	<h2>
		<span class="flex items-center gap-2"
			><Icon icon="mdi:account-outline" />Practitioners</span
		>
	</h2>
	{#if clinic.attributes.Optometrists.data.length > 0}
		{#each clinic.attributes.Optometrists.data as optometrist}
			<div class="card lg:card-side bg-base-100 shadow-xl">
				<figure>
					<img
						src={`${PUBLIC_CMS_BASE_URL}${
							optometrist.attributes.Image.data.attributes.url ||
							'/uploads/placeholder.png'
						}`}
						alt={optometrist.attributes.Image.data.attributes
							.alternativeText || `${optometrist.attributes.Name}'s Image`}
					/>
				</figure>
				<div class="card-body">
					<h3 class="card-title">{optometrist.attributes.Name}</h3>
					<div class="flex flex-wrap gap-1">
						<div class="badge badge-primary capitalize">Optometrist</div>
						{#each optometrist.attributes.Specialities as speciality}
							<div class="badge capitalize">{speciality.Specialities}</div>
						{/each}
					</div>
					<div class="card-actions justify-end">
						<a
							href={`/practitioners/${optometrist.attributes.Slug}`}
							class="btn btn-primary no-underline text-normal">More</a
						>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<Alert message={`${clinic.name} has no practitioners registered`} />
	{/if}
	<hr />
	<p class="text-sm text-right">
		Updated {formatDistanceToNow(new Date(clinic.attributes.updatedAt), {
			addSuffix: true
		})}
	</p>
	<!-- {JSON.stringify(data.practitioners, null, 4)} -->
{/if}
