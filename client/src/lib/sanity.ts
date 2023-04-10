import { createClient, type ClientConfig } from '@sanity/client';
import { error } from '@sveltejs/kit';

const NODE_ENV = process.env.NODE_ENV;

const config: ClientConfig = {
	projectId: 'oqtkv07s',
	dataset: NODE_ENV === 'production' ? 'production' : 'staging',
	apiVersion: '2023-04-05',
	useCdn: false
};

export const client = createClient(config);

export async function getPractitioners(filter: string, q: string | null) {
	if (filter === '') {
		return await client.fetch(
			`*[_type == "practitioner" && name match "*${q || ''}*"]`
		);
	} else if (['optometrist', 'ophthalmologist'].includes(filter)) {
		return await client.fetch(
			`*[_type == "practitioner" && profession in ["${filter}"] && name match "*${
				q || ''
			}*"]`
		);
	}
}

export async function getPracititionerFromSlug(slug: string) {
	const clinic = await client.fetch(
		`*[_type == "practitioner" && slug.current == "${slug}"][0]{
            ...,
            "clinic": *[_type == "clinic" && references(^._id)]
          }`
	);
	if (!clinic) {
		throw error(404, `/${slug} not found`);
	}
	return clinic;
}

export async function getClinics(q: string | null) {
	return await client.fetch(`*[_type == "clinic"][name match "*${q || ''}*"]`);
}

export async function getClinicFromSlug(slug: string) {
	const clinic = await client.fetch(
		`*[_type == "clinic" && slug.current == "${slug}"][0]{
            ...,
            "practitioners": *[_type == "practitioner" && references(^._id)]
          }`
	);
	if (!clinic) {
		throw error(404, `/${slug} not found`);
	}
	return clinic;
}
