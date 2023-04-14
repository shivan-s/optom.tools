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

export async function getPractitioners(
	filter: string,
	q: string | null,
	cursor: string | undefined,
	limit: number | undefined
) {
	let nextCursor = undefined;
	const practitioners = await client.fetch(
		`*[
            _type == "practitioner"
            && name match "*${q || ''}*"
            ${filter !== '' ? `&& '${filter}' in profession` : ''}
            && _id > "${cursor || ''}"] |
            order(_id) [0...${limit || 10}]
        `
	);
	if (practitioners.length > 0) {
		nextCursor = practitioners[practitioners.length - 1]._id;
	} else {
		nextCursor = undefined;
	}
	return { practitioners, cursor: nextCursor };
}

export async function getPracititionerFromSlug(slug: string) {
	const practitioner = await client.fetch(
		`*[
            _type == "practitioner" && slug.current == "${slug}"][0]{...,
            "clinics": *[_type == "clinic" && references(^._id)]
          }`
	);
	if (!practitioner) {
		throw error(404, `/${slug} not found`);
	}
	return practitioner;
}

export async function getClinics(
	q: string | null,
	cursor: string | undefined,
	limit: number | undefined
) {
	let nextCursor = undefined;
	const clinics = await client.fetch(
		`*[
        _type == "clinic"
        && name match "*${q || ''}*"
        && _id > "${cursor || ''}"] |
        order(_id) [0...${limit || 10}]
    `
	);
	if (clinics.length > 0) {
		nextCursor = clinics[clinics.length - 1]._id;
	} else {
		nextCursor = undefined;
	}
	return { clinics, cursor: nextCursor };
}

export async function getClinicFromSlug(slug: string) {
	const clinic = await client.fetch(
		`*[
            _type == "clinic" && slug.current == "${slug}"][0]{...,
            "practitioners": *[_type == "practitioner" && references(^._id)]
          }`
	);
	if (!clinic) {
		throw error(404, `/${slug} not found`);
	}
	return clinic;
}
