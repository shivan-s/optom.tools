import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
/* import { getAbout, getClinics } from '$lib/api'; */

export const load: LayoutLoad = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	/* TODO need to fix this soon. */
	/* await queryClient.prefetchQuery({ */
	/* 	queryKey: ['about'], */
	/* 	queryFn: getAbout */
	/* }); */
	/**/
	/* await queryClient.prefetchQuery({ */
	/* 	queryKey: ['clinics', ''], */
	/* 	queryFn: ({ pageParam = 0 }) => getClinics('', pageParam, 10) */
	/* }); */

	return { queryClient };
};
