import { gql } from 'graphql-request';
import { client } from '$lib/graphql';
import type { Optometrist, OptometristFromSlug } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function getOptometrists(
	q: string | null | undefined = undefined,
	cursor: string | undefined = undefined,
	limit: number | undefined = undefined
) {
	const LIMIT = 10;
	let nextCursor = undefined;

	const query = gql`
		query getOptometrists($q: String, $limit: Int!, $cursor: Int) {
			optometrists(
				filters: { Name: { containsi: $q } }
				pagination: { limit: $limit, start: $cursor }
			) {
				data {
					id
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
		}
	`;

	const variables = {
		q,
		limit: limit || LIMIT,
		cursor
	};

	const { optometrists } = (await client.request(query, variables)) as {
		optometrists: {
			data: Optometrist[];
		};
	};
	if (optometrists.data.length > 0) {
		nextCursor = Number(optometrists.data[optometrists.data.length - 1].id);
	} else {
		nextCursor = undefined;
	}

	return { optometrists, cursor: nextCursor };
}

export async function getOptometristFromSlug(slug: string) {
	const query = gql`
		query getOptometrist($slug: String!) {
			optometrists(filters: { Slug: { eq: $slug } }) {
				data {
					id
					attributes {
						Name
						updatedAt
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
						Clinics {
							data {
								attributes {
									Name
									Slug
								}
							}
						}
					}
				}
			}
		}
	`;

	const variables = {
		slug
	};

	const { optometrists } = (await client.request(query, variables)) as {
		optometrists: {
			data: OptometristFromSlug[];
		};
	};

	if (!optometrists.data.length) {
		throw error(404, `/${slug} not found`);
	}

	const optometrist = optometrists.data[0];

	return optometrist;
}
