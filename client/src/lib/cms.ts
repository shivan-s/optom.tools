import { error } from '@sveltejs/kit';
import { gql, GraphQLClient } from 'graphql-request';
import { NODE_ENV } from '$env/static/private';
import { CMS_PORT } from '$env/static/private';

const CMS_URL =
	NODE_ENV === 'development'
		? `http://cms:${CMS_PORT}/graphql`
		: `https://optom-resources-cms.pages.dev/graphql`;

const client = new GraphQLClient(CMS_URL, { headers: {} });

export async function getClinics(
	q: string | null | undefined = undefined,
	cursor: string | undefined = undefined,
	limit: number | undefined = undefined
) {
	console.log(q, cursor, limit);
	const query = gql`
		{
			clinics {
				data {
					attributes {
						Name
					}
				}
			}
		}
	`;
	const clinics = await client.request(query);
	console.log('clinics', clinics);
	return { clinics };
}

/* export async function getClinics( */
/*   q: string | null, */
/*   cursor: string | undefined, */
/*   limit: number | undefined */
/* ) { */
/*   let nextCursor = undefined; */
/*   const clinics = await client.fetch( */
/*     `*[ */
/*         _type == "clinic" */
/*         && name match "*${q || ''}*" */
/*         && _id > "${cursor || ''}"] | */
/*         order(_id) [0...${limit || 10}] */
/*     ` */
/*   ); */
/*   if (clinics.length > 0) { */
/*     nextCursor = clinics[clinics.length - 1]._id; */
/*   } else { */
/*     nextCursor = undefined; */
/*   } */
/*   return { clinics, cursor: nextCursor }; */
/* } */
