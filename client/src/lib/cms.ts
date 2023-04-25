import { error } from '@sveltejs/kit';
import { gql, GraphQLClient } from 'graphql-request';
import { PUBLIC_CMS_PORT } from '$env/static/public';

const CMS_URL = `http://localhost:${PUBLIC_CMS_PORT}/graphql`;

const client = new GraphQLClient(CMS_URL, { headers: {} });

export async function getAbout() {
	const query = gql`
		{
			about {
				data {
					attributes {
						Main
						updatedAt
					}
				}
			}
		}
	`;

	const about = await client.request(query);
	return { about };
}

type Clinic = {
	id: string;
	attributes: {
		Name: string;
		Slug: string;
		Link: string;
		Email: string;
	};
};

export async function getClinics(
	q: string | null | undefined = undefined,
	cursor: string | undefined = undefined,
	limit: number | undefined = undefined
) {
	const LIMIT = 10;

	let nextCursor = undefined;

	const query = gql`
        {
            clinics(pagination: {
                limit: ${limit || LIMIT},
                start: ${cursor || 0} }) {
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

type ClinicFromSlug = {
	id: string;
	attributes: {
		Name: string;
		Slug: string;
		Link: string;
		Email: string;
		Address: {
			Street: string;
			City: string;
			Country: string;
		}[];
		Optometrists: {
			data: {
				attributes: {
					Name: string;
				}[];
			};
		};
	};
};

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
