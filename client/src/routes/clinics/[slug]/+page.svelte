<script lang="ts">
	import { getClinicFromSlug } from '$lib/sanity';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../../components/Loading.svelte';
	import Error from '../../../components/Error.svelte';
	import { page } from '$app/stores';
	import { formatDistanceToNow } from 'date-fns';
	import Icon from '@iconify/svelte';

	const pathname = $page.url.pathname;

	let slug = pathname.slice(pathname.lastIndexOf('/') + 1);

	$: query = createQuery({
		queryKey: ['clinic-slug', slug],
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

	const COUNTRY = { nz: 'New Zealand', aus: 'Australia' };
</script>

{#if isError}
	<Error />
{/if}
{#if isLoading}
	<Loading />
{/if}
{#if isSuccess && clinic}
	<h1 class="text-center">{clinic.name}</h1>
	<a href={clinic.link}>{clinic.link}</a>
	<h2>
		<span class="flex items-center gap-2">
			<Icon icon="material-symbols:location-on" />
			Locations</span
		>
	</h2>
	<div class="flex flex-col gap-2">
		{#each clinic.addresses as address}
			<div class="flex flex-col gap-1">
				<span>{address.street}</span>
				<span>{address.city} {address.postcode || ''}</span>
				<span>{COUNTRY[address.country]}</span>
			</div>
		{/each}
	</div>
	<h2>
		<span class="flex items-center gap-2"
			><Icon icon="mdi:account-outline" />Practitioners</span
		>
	</h2>
	{#each clinic.practitioners as practitioner}
		<div class="card lg:card-side bg-base-100 shadow-xl">
			<!-- <figure> -->
			<!-- 	<img -->
			<!-- 		src="https://media-exp1.licdn.com/dms/image/C5616AQESzK-_ikMJ0A/profile-displaybackgroundimage-shrink_200_800/0/1639983225117?e=2147483647&v=beta&t=_ojvy-ycYmCCJJnnEybfsKz5L_RaPwIJYY0jbwgjCag" -->
			<!-- 		alt="Album" -->
			<!-- 	/> -->
			<!-- </figure> -->
			<div class="card-body">
				<h3 class="card-title">{practitioner.name}</h3>
				<div class="flex flex-wrap gap-1">
					{#each practitioner.profession as profession}
						<div class="badge badge-primary capitalize">{profession}</div>
					{/each}
					{#each practitioner.subSpecialties as subSpeciality}
						<div class="badge capitalize">{subSpeciality}</div>
					{/each}
				</div>
				<div class="card-actions justify-end">
					<a
						href={`/practitioners/${practitioner.slug.current}`}
						class="btn btn-primary no-underline text-normal">More</a
					>
				</div>
			</div>
		</div>
	{/each}
	<hr />
	<p class="text-sm text-right">
		Updated {formatDistanceToNow(new Date(clinic._updatedAt), {
			addSuffix: true
		})}
	</p>
	<!-- {JSON.stringify(data.practitioners, null, 4)} -->
{/if}
