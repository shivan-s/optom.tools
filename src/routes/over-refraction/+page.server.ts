import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { PageServerLoad, Actions } from './$types';
import { addAngles } from '$lib/utils';

const eye = z.object({
	lensSphere: z.number().min(-30).max(30).step(0.25).optional().default(0),
	lensCylinder: z.number().min(-10).max(10).step(0.25).optional().default(0),
	lensAxis: z.number().min(1).max(180).step(1).optional().default(0),
	lensRotation: z.number().min(0).max(180).step(1).optional().default(0),
	lensRotationDirection: z.enum(['cw', 'ccw']).optional().default('cw'),
	vertex: z.number().nonnegative().step(0.01).default(12),
	overRxSphere: z.number().min(-30).max(30).step(0.25).optional().default(0),
	overRxCylinder: z.number().min(-10).max(10).step(0.25).optional().default(0),
	overRxAxis: z.number().min(1).max(180).step(1).optional().default(0)
});

const schema = z.object({
	right: eye,
	left: eye
});

function calculateOverRefraction(params: {
	lensSphere: number;
	lensCylinder: number;
	lensAxis: number;
	lensRotationDirection: 'cw' | 'ccw';
	lensRotation: number;
	overRxSphere: number;
	overRxCylinder: number;
	overRxAxis: number;
}) {
	const lensSphericalMeridian = {
		power: params.lensSphere,
		angle: params.lensAxis
	};
	const lensCylindricalMeridian = {
		power: params.lensSphere + params.lensCylinder,
		angle: addAngles(params.lensAxis, 90)
	};
	const overRxSphericalMeridian = {
		power: params.overRxSphere,
		angle: params.overRxAxis
	};
	const overRxCylindricalMeridian = {
		power: params.overRxSphere + params.overRxCylinder,
		angle: addAngles(params.overRxAxis, 90)
	};

	return {
		sphere: finalSphere,
		cylinder: finalCylinder
	};
}

export const load: PageServerLoad = async () => {
	const form = await superValidate(schema);
	return {
		form,
		pageTitle: 'Over Refraction'
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}
		const result = {
			right: calculateOverRefraction(form.data.right)
		};
		return { result, form };
	}
};
