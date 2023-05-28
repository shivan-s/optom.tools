import type { Actions } from './$types';
import { z } from 'zod';

const FormSchema = z.object({
	sphere: z.number({ required_error: 'Please enter a sphere' }),
	cylinder: z.number({ required_error: 'Please enter a cylinder' }),
	axis: z
		.number({ required_error: 'Please enter a axis' })
		.min(0, { message: 'Axis is between 0 to 180' })
		.max(180, { message: 'Axis is between 0 to 180' })
});

type Prescription = {
	sphere: number;
	cylinder: number;
	axis: number;
};

function cylinderTranspose(
	sphere: number,
	cylinder: number,
	axis: number
): Prescription {
	const newSphere = sphere - cylinder;
	const newCylinder = -1 * cylinder;
	const newAxis = axis > 90 ? axis - 90 : axis + 90;

	return { sphere: newSphere, cylinder: newCylinder, axis: newAxis };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const sphere = formData.get('sphere');
		const cylinder = formData.get('cylinder');
		const axis = formData.get('axis');

		const result = FormSchema.safeParse({
			sphere: parseFloat(String(sphere) ?? ''),
			cylinder: parseFloat(String(cylinder ?? '')),
			axis: parseFloat(String(axis ?? ''))
		});

		if (!result.success) {
			const { fieldErrors, formErrors } = result.error.flatten();
			return {
				success: false,
				formErrors,
				fieldErrors,
				sphere,
				cylinder,
				axis
			};
		} else {
			return {
				success: true,
				result: cylinderTranspose(
					result.data.sphere,
					result.data.cylinder,
					result.data.axis
				),
				sphere,
				axis,
				cylinder
			};
		}
	}
} satisfies Actions;
