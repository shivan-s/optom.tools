import { getClinics } from '$lib/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const clinics = getClinics();
	console.log(clinics);
	return { clinics };
};
