import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	sphere: z.number({ required_error: 'Please provide sphere' }).default(1),
	cylinder: z.number({ required_error: 'Please provide cylinder' }).default(-1),
	axis: z
		.number({ required_error: 'Please provide axis' })
		.nonnegative()
		.lte(180, { message: 'Axis is below 180' })
		.default(180)
});

type Prescription = {
	sphere: number;
	cylinder: number;
	axis: number;
};

function cylindricalTranspose(params: Prescription): Prescription {
	const sphere = params.sphere - params.cylinder;
	const cylinder = -1 * params.cylinder;
	const axis = params.axis > 90 ? params.axis - 90 : params.axis + 90;

	return { sphere, cylinder, axis };
}

export const load: PageServerLoad = async () => {
	const form = await superValidate(schema);
	return {
		form,
		pageTitle: 'Cylindrical Transposition'
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const result = cylindricalTranspose(form.data);
		return { result, form };
	}
} satisfies Actions;
