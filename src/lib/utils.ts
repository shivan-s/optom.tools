/**
 * Ensures angle is within 180
 */
export function addAngles(a: number, b: number): number {
	return (a + b) % 180;
}

/**
 *  Cosine function but takes degrees input and output
 */
export function cosine(x: number): number {
	x = (x * Math.PI) / 180;
	return Math.cos(x);
}
