export type Clinic = {
	id: string;
	attributes: {
		Name: string;
		Slug: string;
		Link: string;
		Email: string;
	};
};

export type ClinicFromSlug = {
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
					Slug: string;
					Specialities: { Specialities: string }[];
					Image: {
						data: { attributes: { url: string; alternativeText: string } };
					};
				};
			}[];
		};
		updatedAt: string;
	};
};
