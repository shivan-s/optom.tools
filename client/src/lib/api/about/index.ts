import { client } from '$lib/graphql';
import { gql } from 'graphql-request';
import type { About } from './types';

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

	const about = (await client.request(query)) as About;
	return { about };
}
