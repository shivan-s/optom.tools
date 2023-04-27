import { gql } from 'graphql-request';
import { client } from '$lib/graphql';
import { error } from '@sveltejs/kit';
import type { Clinic, ClinicFromSlug } from './types';

export async function getClinics(
	q: string | null | undefined = undefined,
	cursor: string | undefined = undefined,
	limit: number | undefined = undefined
) {
	const LIMIT = 10;
	let nextCursor = undefined;

	const query = gql`
        {
            clinics(
            filters: { Name: { containsi: "${q}" } }
            pagination: { limit: ${limit || LIMIT}, start: ${cursor || 0} }
                  ) {
                    data {
                        id
                        attributes {
                            Name
                            Slug
                            Link
                            Email
                        }
                  }
            }

        }`;

	const { clinics } = (await client.request(query)) as {
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
	const query = gql`{
                clinics(filters: { Slug: { eq: "${slug}" } }) {
                    data {
                        id
                        attributes {
                            Name
                            Link
                            Email
                            Address {
                              Street
                              City
                              Country
                            }
                            Optometrists {
                              data {
                                attributes {
                                  Name
                                  Slug
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
                            updatedAt
                        }
                    }
            }
        }`;

	const { clinics } = (await client.request(query)) as {
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
