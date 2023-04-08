import type { Calculator } from '$lib/types';
import type { PageLoad } from './$types';

const calculators: Calculator[] = [
	{
		link: '/cyl-transpose',
		label: 'Cylindrical Transposition',
		description: 'Calculate the cylindrical transposition.',
		tags: ['cylinder', 'transposition']
	},
	{
		link: '/back-vertex-power',
		label: 'Back Vertex Power',
		description: 'Calculate the back vertex power.',
		tags: ['bvd']
	}
];

export const load = (({ url }) => {
	const q = url.searchParams.get('q');
	let searchedCalculators;
	if (!q) {
		searchedCalculators = calculators;
	} else {
		searchedCalculators = calculators.filter(({ label }) => label.includes(q));
	}
	return {
		calculators: searchedCalculators,
		q
	};
}) satisfies PageLoad;
