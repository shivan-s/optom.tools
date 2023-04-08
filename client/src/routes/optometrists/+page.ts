import type { PageLoad } from './$types';
import { getOptometrists } from '$lib/sanity';

export const load: PageLoad = async ({ parent }) => {
	const { queryClient } = await parent();
	/* await queryClient.prefetchQuery({ */
	/* 	queryKey: ['optometrists'], */
	/* 	queryFn: getOptometrists */
	/* }); */
};
