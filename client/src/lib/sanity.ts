import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'oqtkv07s',
	dataset: 'production',
	apiVersion: '2023-04-05',
	useCdn: false
};

export const client = createClient(config);

export function getOptometrists() {
	return client.fetch(`*[_type == "optometrist"]`);
}
