import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { getAbout } from '$lib/cms';

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

	return { queryClient };
};
