import { client } from '$lib/graphql';
import { gql } from 'graphql-request';
import type { AboutPage } from '$lib/types';

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

	const about = (await client.request(query)) as AboutPage;
	return { about };
}
