import type { PageLoad } from './$types';
import Fuse from 'fuse.js';

export const load: PageLoad = ({ url }) => {
	const sp = url.searchParams;
	let links: { url: string; name: string }[] = [
		{ url: '/cylindrical-transposition', name: 'Cylindrical Transposition' },
		{ url: '/minimum-blank-size', name: 'Minimum Blank Size' },
		{ url: '/back-vertex-power', name: 'Back Vertex Power' },
		{ url: '/over-refraction', name: 'Over Refraction' }
	].sort((a, b) => {
		if (a.name > b.name) {
			return 1;
		} else if (a.name < b.name) {
			return -1;
		} else {
			return 0;
		}
	});
	const fuse = new Fuse(links, { keys: ['url', 'name'] });
	const q = sp.get('q');
	if (q) {
		const result = fuse.search(q);
		links = result.map((l) => l.item);
	}
	return {
		q,
		links
	};
};
