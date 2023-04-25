import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { getAbout, getClinics } from '$lib/cms';

export const load: LayoutLoad = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	await queryClient.prefetchQuery({
		queryKey: ['about'],
		queryFn: getAbout
	});

	await queryClient.prefetchQuery({
		queryKey: ['clinics', null],
		queryFn: ({ pageParam = 0 }) => getClinics(null, pageParam, 10)
	});

	return { queryClient };
};
