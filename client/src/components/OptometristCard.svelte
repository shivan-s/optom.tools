<script lang="ts">
	import { PUBLIC_CMS_URL } from '$env/static/public';
	import type { Optometrist } from '$lib/types';

	export let optometrist: Optometrist;
</script>

<div class="card bg-base-100 shadow-xl">
	<figure>
		<img
			src={`${PUBLIC_CMS_URL}${
				optometrist.attributes.Image.data.attributes.url ||
				'/uploads/placeholder.png'
			}`}
			alt={optometrist.attributes.Image.data.attributes.alternativeText ||
				`${optometrist.attributes.Name}'s Image`}
		/>
	</figure>
	<div class="card-body items-center text-center">
		<h3 class="card-title">{optometrist.attributes.Name}</h3>
		<div class="flex flex-wrap gap-1">
			{#if optometrist.attributes.Locum}
				<div class="badge badge-secondary capitalize">Locum</div>
			{/if}
			{#each optometrist.attributes.Specialities as speciality}
				<div class="badge capitalize">{speciality.Specialities}</div>
			{/each}
		</div>
		<div class="card-actions">
			<a
				href={`/optometrists/${optometrist.attributes.Slug}`}
				class="btn btn-primary no-underline text-normal">More</a
			>
		</div>
	</div>
</div>
