type Prescription = {
	sphere: number;
	cylinder: number;
	axis: number;
};

export function cylinderTranspose(
	sphere: number,
	cylinder: number,
	axis: number
): Prescription {
	const newSphere = sphere - cylinder;
	const newCylinder = -1 * cylinder;
	const newAxis = axis > 90 ? axis - 90 : axis + 90;

	return { sphere: newSphere, cylinder: newCylinder, axis: newAxis };
}
