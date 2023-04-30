export type Optometrist = {
	id?: string;
	attributes: {
		Name: string;
		Slug: string;
		Locum: string;
		Specialities: { Specialities: string }[];
		Image: Image;
	};
};

export type OptometristFromSlug = {
	id?: string;
	attributes: {
		Name: string;
		Locum: boolean;
		Specialities: { Specialities: string }[];
		Image: Image;
		Clinics: { data: Clinic[] };
		updatedAt: string;
	};
};

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
			data: Optometrist[];
		};
		updatedAt: string;
	};
};

export type Image = {
	data: {
		attributes: {
			url: string;
			alternativeText: string;
		};
	};
};

export type AboutPage = {
	data: {
		attributes: {
			Main: string;
			updatedAt: string;
		};
	};
};

export type Calculator = {
	link: string;
	label: string;
	description: string;
	tags: string[];
};

export type NavbarItem = {
	label: string;
	link: string;
	icon: string;
};
