<script lang="ts">
	import { getPracititionerFromSlug } from '$lib/sanity';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../../components/Loading.svelte';
	import Error from '../../../components/Error.svelte';
	import { page } from '$app/stores';
	import { formatDistanceToNow } from 'date-fns';
	import Icon from '@iconify/svelte';
	import Alert from '../../../components/Alert.svelte';

	const pathname = $page.url.pathname;

	let slug = pathname.slice(pathname.lastIndexOf('/') + 1);

	$: query = createQuery({
		queryKey: ['pracitioner-slug', slug],
		queryFn: () => getPracititionerFromSlug(slug)
	});

	$: practitioner = $query.data;
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
{#if isSuccess && practitioner}
	<h1 class="text-center">{practitioner.name}</h1>
	<div class="flex flex-wrap gap-1 justify-center">
		{#each practitioner.profession as profession}
			<div class="badge badge-primary capitalize">{profession}</div>
		{/each}
		{#if practitioner.locum}
			<div class="badge badge-secondary capitalize">locum</div>
		{/if}
		{#if practitioner.subSpecialties}
			{#each practitioner.subSpecialties as specialty}
				<div class="badge capitalize">
					{specialty.replace(/([A-Z])/g, ' $1')}
				</div>
			{/each}
		{/if}
		{#if practitioner.specialties}
			{#each practitioner.specialties as specialty}
				<div class="badge capitalize">
					{specialty.replace(/([A-Z])/g, ' $1')}
				</div>
			{/each}
		{/if}
	</div>
	<div class="flex flex-wrap gap-1 justify-center" />
	<h2>
		<span class="flex items-center gap-2"
			><Icon icon="icon-park-outline:glasses-one" />{practitioner.clinics
				?.length === 1
				? 'Clinics'
				: 'Clinic'}</span
		>
	</h2>
	{#if practitioner.clinics.length > 0}
		{#each practitioner.clinics as clinic}
			<div class="card lg:card-side bg-base-100 shadow-xl">
				<!-- <figure> -->
				<!-- 	<img -->
				<!-- 		src="https://media-exp1.licdn.com/dms/image/C5616AQESzK-_ikMJ0A/profile-displaybackgroundimage-shrink_200_800/0/1639983225117?e=2147483647&v=beta&t=_ojvy-ycYmCCJJnnEybfsKz5L_RaPwIJYY0jbwgjCag" -->
				<!-- 		alt="Album" -->
				<!-- 	/> -->
				<!-- </figure> -->
				<div class="card-body">
					<h3 class="card-title">{clinic.name}</h3>
					<div class="card-actions justify-end">
						<a
							href={`/pracitioners/${practitioner.slug.current}`}
							class="btn btn-primary no-underline text-normal">More</a
						>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<Alert message={`${practitioner.name} is not registered to any clinics`} />
	{/if}
	<hr />
	<!-- <pre>{JSON.stringify(practitioner, null, 2)}</pre> -->
	<p class="text-sm text-right">
		Updated {formatDistanceToNow(new Date(practitioner._updatedAt), {
			addSuffix: true
		})}
	</p>
{/if}
