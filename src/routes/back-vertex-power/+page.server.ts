import { z } from 'zod';
import type { PageLoad } from '../$types';
import type { Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	sphere: z.number({ required_error: 'Please provide right sphere' }).default(-1),
	cylinder: z.number().default(-1),
	axis: z.number().nonnegative().lte(180, { message: 'Axis is below 180' }).default(90),
	specBVD: z
		.number({
			required_error: 'Please provide spectacle back vertex'
		})
		.nonnegative()
		.default(12)
});

type Presciption = {
	sphere: number;
	cylinder: number;
	axis: number;
};

function backVertexPower(params: Presciption & { specBVD: number; CLBVD: number }): Presciption {
	const sphere = params.sphere / (1 - (params.specBVD / 1000) * params.sphere);
	const cylinder =
		(params.sphere + params.cylinder) /
			(1 - (params.specBVD / 1000) * (params.sphere + params.cylinder)) -
		sphere;
	const axis = params.axis;
	return {
		sphere,
		cylinder,
		axis
	};
}

export const load: PageLoad = async () => {
	const form = await superValidate(schema);
	return { form, pageTitle: 'Back Vertex Power' };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const result = backVertexPower({
			sphere: form.data.sphere,
			cylinder: form.data.cylinder,
			axis: form.data.axis,
			specBVD: form.data.specBVD,
			CLBVD: 0
		});
		return {
			result,
			form
		};
	}
} satisfies Actions;
