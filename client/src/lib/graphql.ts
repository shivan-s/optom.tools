import { GraphQLClient } from 'graphql-request';
import { PUBLIC_CMS_URL } from '$env/static/public';

export const client = new GraphQLClient(PUBLIC_CMS_URL, { headers: {} });
