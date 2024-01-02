export type Prescription = {
	sphere: number;
	cylinder: number;
	axis: number;
};

export function outputDioptre(n: number): string {
	let sign = '+';
	if (n < 0) {
		// since '-' is always given for negative numbers
		sign = '';
	}
	return `${sign}${n.toFixed(2)}`;
}
