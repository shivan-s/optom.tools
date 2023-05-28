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
