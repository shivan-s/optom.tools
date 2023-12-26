import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	eyeSize: z.number().nonnegative()
});

export const load = async () => {
	const form = superValidate(schema);
	return {
		form,
		pageTitle: 'Minimum Blank Size'
	};
};

export const actions = {
	default: async () => {
		const form = superValidate(schema);
		return {
			form
		};
	}
};
