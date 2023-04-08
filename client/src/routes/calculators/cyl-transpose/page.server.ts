import type { Actions } from './$types';
import { z } from 'zod';

const FormSchema = z.object({
	sphereTop: z.number().optional(),
	cylinderTop: z.number().optional(),
	axisTop: z
		.number()
		.min(0, { message: 'Axis is between 0 to 180' })
		.max(180, { message: 'Axis is between 0 to 180' })
		.optional(),
	sphereBottom: z.number().optional(),
	cylinderBottom: z.number().optional(),
	axisBottom: z
		.number()
		.min(0, { message: 'Axis is between 0 to 180' })
		.max(180, { message: 'Axis is between 0 to 180' })
		.optional()
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
	cylTranspose: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const result = FormSchema.safeParse(formData);

		if (!result.success) {
			const { error } = result;
			return {
				success: false,
				...formData,
				error
			};
		} else {
			let {
				sphereTop,
				cylinderTop,
				axisTop,
				sphereBottom,
				cylinderBottom,
				axisBottom
			} = result.data;

			if (
				(sphereTop && cylinderTop && axisTop) ||
				(sphereBottom && cylinderBottom && axisBottom)
			) {
				if (sphereTop && cylinderTop && axisTop) {
					const result = cylinderTranspose(sphereTop, cylinderTop, axisTop);
					sphereBottom = result.sphere;
					cylinderBottom = result.cylinder;
					axisBottom = result.axis;
				} else if (sphereBottom && cylinderBottom && axisBottom) {
					const result = cylinderTranspose(
						sphereBottom,
						cylinderBottom,
						axisBottom
					);
					sphereTop = result.sphere;
					cylinderTop = result.cylinder;
					axisTop = result.axis;
				}
			}
			return {
				success: true,
				sphereTop,
				cylinderTop,
				axisTop,
				sphereBottom,
				cylinderBottom,
				axisBottom
			};
		}
	}
} satisfies Actions;
