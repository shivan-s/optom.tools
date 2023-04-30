<script lang="ts">
	import type { Clinic } from '$lib/types';

	export let clinic: Clinic;
</script>

<div class="card lg:card-side bg-base-100 shadow-xl">
	<!-- <figure> -->
	<!-- 	<img -->
	<!-- 		src="https://media-exp1.licdn.com/dms/image/C5616AQESzK-_ikMJ0A/profile-displaybackgroundimage-shrink_200_800/0/1639983225117?e=2147483647&v=beta&t=_ojvy-ycYmCCJJnnEybfsKz5L_RaPwIJYY0jbwgjCag" -->
	<!-- 		alt="Album" -->
	<!-- 	/> -->
	<!-- </figure> -->
	<div class="card-body">
		<h3 class="card-title">{clinic.attributes.Name}</h3>
		<div class="card-actions justify-end">
			<a
				data-sveltekit-preload-code
				data-sveltekit-preload-data
				href={`/clinics/${clinic.attributes.Slug}`}
				class="btn btn-primary no-underline text-normal">More</a
			>
		</div>
	</div>
</div>
