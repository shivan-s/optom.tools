import { gql } from 'graphql-request';
import { client } from '$lib/graphql';
import { error } from '@sveltejs/kit';
import type { Clinic, ClinicFromSlug } from '$lib/types';

export async function getClinics(
	q: string | null | undefined = undefined,
	cursor: string | undefined = undefined,
	limit: number | undefined = undefined
) {
	const LIMIT = 10;
	let nextCursor = undefined;

	const query = gql`
		query getClinics($q: String!, $limit: Int!, $cursor: Int!) {
			clinics(
				filters: { Name: { containsi: $q } }
				pagination: { limit: $limit, start: $cursor }
				sort: ["updatedAt"]
			) {
				data {
					id
					attributes {
						Name
						Slug
					}
				}
			}
		}
	`;

	const variables = {
		q,
		limit: limit || LIMIT,
		cursor
	};

	const { clinics } = (await client.request(query, variables)) as {
		clinics: {
			data: Clinic[];
		};
	};
	if (clinics.data.length > 0) {
		nextCursor = Number(clinics.data[clinics.data.length - 1].id);
	} else {
		nextCursor = undefined;
	}

	return { clinics, cursor: nextCursor };
}

export async function getClinicFromSlug(slug: string) {
	const query = gql`
		query getClinic($slug: String!) {
			clinics(filters: { Slug: { eq: $slug } }) {
				data {
					id
					attributes {
						Name
						updatedAt
						Optometrists {
							data {
								attributes {
									Name
									Slug
									Locum
									Specialities {
										Specialities
									}
									Image {
										data {
											attributes {
												url
												alternativeText
											}
										}
									}
								}
							}
						}
						Address {
							Street
							City
							Country
						}
					}
				}
			}
		}
	`;

	const variables = {
		slug
	};

	const { clinics } = (await client.request(query, variables)) as {
		clinics: {
			data: ClinicFromSlug[];
		};
	};

	if (!clinics.data.length) {
		throw error(404, `/${slug} not found`);
	}

	const clinic = clinics.data[0];
	return clinic;
}
