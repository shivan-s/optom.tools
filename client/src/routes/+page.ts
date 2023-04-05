import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'oqtkv07s',
	dataset: 'production',
	apiVersion: '2023-04-05',
	useCdn: false
};

const client = createClient(config);

export const load = async ({ params }) => {
	const data = await client.fetch(`*[_type == "optometrist"]`);

	if (data) {
		return {
			optometrist: data
		};
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
};
