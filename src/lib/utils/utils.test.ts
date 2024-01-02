import { describe, it, expect } from 'vitest';
import { outputDioptre } from './utils';

describe('test suite', () => {
	it.each<{ input: number; output: string }>([
		{ input: -1, output: '-1.00' },
		{ input: 1, output: '+1.00' }
	])('$input turns into $output', ({ input, output }) => {
		const result = outputDioptre(input);
		expect(result).toBe(output);
	});
});
