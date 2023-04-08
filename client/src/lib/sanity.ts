import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'oqtkv07s',
	dataset: 'production',
	apiVersion: '2023-04-05',
	useCdn: false
};

export const client = createClient(config);

export async function getOptometrists() {
	console.log(client);
	return await client.fetch(`*[_type == "optometrist"]`);
}
