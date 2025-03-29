import { describe, it, expect } from 'vitest';
import { GmapsError } from './errors';

describe('GmapsError', () => {
	describe('constructor', () => {
		it('should create a GmapsError with proper prefix', () => {
			const error = new GmapsError('Test error');
			expect(error.message).toBe('v3-gmaps :: Test error');
			expect(error.name).toBe('GmapsError');
			expect(error instanceof Error).toBe(true);
			expect(error instanceof GmapsError).toBe(true);
		});

		it('should not add duplicate prefix', () => {
			const error = new GmapsError('v3-gmaps :: Test error');
			expect(error.message).toBe('v3-gmaps :: Test error');
		});

		it('should pass error options to parent constructor', () => {
			const cause = new Error('Original error');
			const error = new GmapsError('Test error', { cause });
			expect(error.cause).toBe(cause);
		});
	});

	describe('from static method', () => {
		it('should return the same GmapsError if passed one', () => {
			const originalError = new GmapsError('Original error');
			const resultError = GmapsError.from(originalError);
			expect(resultError).toBe(originalError);
		});

		it('should convert a standard Error to GmapsError', () => {
			const originalError = new Error('Standard error');
			const resultError = GmapsError.from(originalError);
			expect(resultError instanceof GmapsError).toBe(true);
			expect(resultError.message).toBe('v3-gmaps :: Standard error');
		});

		it('should convert a string to GmapsError', () => {
			const resultError = GmapsError.from('String error');
			expect(resultError instanceof GmapsError).toBe(true);
			expect(resultError.message).toBe('v3-gmaps :: String error');
		});

		it('should handle unknown error types', () => {
			const resultError = GmapsError.from(null);
			expect(resultError instanceof GmapsError).toBe(true);
			expect(resultError.message).toBe('v3-gmaps :: Unknown error occurred');
		});

		it('should handle numeric error values', () => {
			const resultError = GmapsError.from(404);
			expect(resultError instanceof GmapsError).toBe(true);
			expect(resultError.message).toBe('v3-gmaps :: Unknown error occurred');
		});

		it('should handle object error values', () => {
			const resultError = GmapsError.from({ custom: 'error' });
			expect(resultError instanceof GmapsError).toBe(true);
			expect(resultError.message).toBe('v3-gmaps :: Unknown error occurred');
		});
	});
});
