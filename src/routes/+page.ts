import type { PageLoad } from './$types';
import Fuse from 'fuse.js';

export const load: PageLoad = ({ url }) => {
	const sp = url.searchParams;
	let links: { url: string; name?: string }[] = [{ url: '/cylindrical-transposition' }];
	const fuse = new Fuse(links, { keys: ['url', 'name'] });
	const q = sp.get('q');
	// if (q !== null) {
	// 	const result = fuse.search(q);
	// 	links = result.map((l) => l.item);
	// }
	return {
		links: links.map((l) => {
			if (typeof l.name === 'string') {
				return { ...l };
			} else {
				return {
					url: l.url,
					name: l.url.replaceAll('-', ' ').replace('/', '')
				};
			}
		})
	};
};
