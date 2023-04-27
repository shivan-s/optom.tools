import { GraphQLClient } from 'graphql-request';
import { PUBLIC_CMS_PORT } from '$env/static/public';

const CMS_URL = `http://localhost:${PUBLIC_CMS_PORT}/graphql`;

export const client = new GraphQLClient(CMS_URL, { headers: {} });
