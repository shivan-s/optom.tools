import { gql } from 'graphql-request';
import { client } from '$lib/graphql';
/* import { error } from '@sveltejs/kit'; */
import type { Optometrist } from './types';

export async function getOptometrists(
	q: string | null | undefined = undefined,
	cursor: string | undefined = undefined,
	limit: number | undefined = undefined
) {
	const LIMIT = 10;
	let nextCursor = undefined;

	const query = gql`
        {
            optometrists(
            filters: { Name: { containsi: "${q}" } }
            pagination: { limit: ${limit || LIMIT}, start: ${cursor || 0} }
                  ) {
                    data {
                        id
                        attributes {
                            Name
                            Slug
                        }
                  }
            }

        }`;

	const { optometrists } = (await client.request(query)) as {
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
