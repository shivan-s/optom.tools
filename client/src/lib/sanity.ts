import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'oqtkv07s',
	dataset: 'production',
	apiVersion: '2023-04-05',
	useCdn: false
};

export const client = createClient(config);

export async function getPracititioners(
	filter: 'optometrist' | 'ophthalmologist' | undefined,
	q: string | undefined
) {
	if (filter === undefined) {
		return await client.fetch(
			`*[_type in ["optometrist","ophthalmologist"] && name match *${q}*]`
		);
	} else {
		return await client.fetch(`*[_type == ${filter} && name match *${q}*]`);
	}
}

export async function getClinics(q: string | null) {
	return await client.fetch(`*[_type == "clinic"][name match "*${q || ''}*"]`);
}
