// NOTE: This is for testing, ensures a page will give a 404 error
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	error(404, 'Not Found');
};
