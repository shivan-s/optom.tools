import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
	rightPD: z.number({ required_error: 'Please provide right PD' }).nonnegative(),
	leftPD: z.number({ required_error: 'Please provide left PD' }).nonnegative(),
	frameSize: z.number({ required_error: 'Please provide frame size' }).nonnegative(),
	frameDBL: z.number({ required_error: 'Please provide frame DBL' }).nonnegative(),
	effectiveDiameter: z
		.number({ required_error: 'Please provide effective diameter' })
		.nonnegative(),
	bleed: z.number({ required_error: 'Please provide bleed' }).nonnegative().default(2)
});

function calculateMinimumBlankSize(params: {
	monoPD: number;
	frameSize: number;
	frameDBL: number;
	effectiveDiameter: number;
	bleed: number;
}): number {
	const framePD = params.frameSize - params.frameDBL;
	const decentration = Math.abs(framePD / 2 - params.monoPD);
	const minimumBlankSize = decentration + params.effectiveDiameter + params.bleed;
	return minimumBlankSize;
}

export const load: PageServerLoad = async () => {
	const form = await superValidate(schema);
	return {
		form,
		pageTitle: 'Minimum Blank Size'
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const result = {
			right: calculateMinimumBlankSize({ monoPD: form.data.rightPD, ...form.data }),
			left: calculateMinimumBlankSize({ monoPD: form.data.leftPD, ...form.data })
		};
		return {
			result,
			form
		};
	}
} satisfies Actions;
