import { describe, it, expect } from 'vitest';
import { cylinderTranspose } from './utils';

describe('testing cylindrical transposition', () => {
	it.each([
		{
			input: {
				sphere: 1,
				cylinder: -1,
				axis: 90
			},
			output: {
				sphere: 2,
				cylinder: 1,
				axis: 180
			}
		}
	])('works', ({ input, output }) => {
		expect(
			cylinderTranspose(input.sphere, input.cylinder, input.axis)
		).toStrictEqual(output);
	});
});
