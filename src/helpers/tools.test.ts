import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle, debounce, isEqual } from './tools';

describe('throttle', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should call the function immediately on first call', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn();
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should not call the function again before timeout', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn();
		throttledFn();
		throttledFn();

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should wait for the remaining time before executing again', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn('first');
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenLastCalledWith('first');

		// Advance halfway through the throttle period
		vi.advanceTimersByTime(50);

		// Call again with new args - should be queued
		throttledFn('second');
		expect(mockFn).toHaveBeenCalledTimes(1);

		// Advance to complete the throttle period
		vi.advanceTimersByTime(50);

		// The queued call should now execute
		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenLastCalledWith('second');
	});

	it('should use the most recent arguments for the delayed call', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn('first');
		expect(mockFn).toHaveBeenCalledTimes(1);

		// Multiple calls during throttle period
		vi.advanceTimersByTime(50);
		throttledFn('ignored');
		vi.advanceTimersByTime(20);
		throttledFn('last');

		// Only the most recent args should be used
		vi.advanceTimersByTime(30);
		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenLastCalledWith('last');
	});

	it('should handle zero throttle by returning the original function', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 0);

		// With throttle=0, every call should go through immediately
		throttledFn('a');
		throttledFn('b');
		throttledFn('c');

		expect(mockFn).toHaveBeenCalledTimes(3);
		expect(mockFn).toHaveBeenNthCalledWith(1, 'a');
		expect(mockFn).toHaveBeenNthCalledWith(2, 'b');
		expect(mockFn).toHaveBeenNthCalledWith(3, 'c');
	});

	it('should pass arguments to the throttled function', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn('test', 123);
		expect(mockFn).toHaveBeenCalledWith('test', 123);
	});

	it('should execute a trailing call with latest arguments after timeout', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn('first call');
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenLastCalledWith('first call');

		// These calls are within throttle period, so they don't execute immediately
		throttledFn('ignored call');
		throttledFn('last call');
		expect(mockFn).toHaveBeenCalledTimes(1);

		// After throttle period, the last pending call should execute
		vi.advanceTimersByTime(101);
		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenLastCalledWith('last call');
	});
});

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should not call function immediately', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn();
		expect(mockFn).not.toHaveBeenCalled();
	});

	it('should call function after wait time if no additional calls', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn();
		vi.advanceTimersByTime(101);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should reset timer on subsequent calls', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn();
		vi.advanceTimersByTime(50);
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(51);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should call function after maxWait regardless of continued calls', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100, 300);

		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn();
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(50);
		debouncedFn();
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should pass the most recent arguments to the function', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn('first', 1);
		debouncedFn('second', 2);
		debouncedFn('third', 3);

		vi.advanceTimersByTime(101);
		expect(mockFn).toHaveBeenCalledWith('third', 3);
	});
});

describe('isEqual', () => {
	it('should return true for identical primitives', () => {
		expect(isEqual(1, 1)).toBe(true);
		expect(isEqual('string', 'string')).toBe(true);
		expect(isEqual(true, true)).toBe(true);
		expect(isEqual(null, null)).toBe(true);
		expect(isEqual(undefined, undefined)).toBe(true);
	});

	it('should return false for different primitives', () => {
		expect(isEqual(1, 2)).toBe(false);
		expect(isEqual('string', 'different')).toBe(false);
		expect(isEqual(true, false)).toBe(false);
		expect(isEqual(null, undefined)).toBe(false);
	});

	it('should return true for identical arrays', () => {
		expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
		expect(isEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
		expect(isEqual([1, 'a', true], [1, 'a', true])).toBe(true);
	});

	it('should return false for different arrays', () => {
		expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
		expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
		expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
	});

	it('should return true for identical nested arrays', () => {
		expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
	});

	it('should return false for different nested arrays', () => {
		expect(isEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
	});

	it('should return true for identical objects', () => {
		expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
	});

	it('should return false for different objects', () => {
		expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
		expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
		expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
	});

	it('should return true for identical nested objects', () => {
		expect(isEqual({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } })).toBe(true);
	});

	it('should return false for different nested objects', () => {
		expect(isEqual({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 4 } })).toBe(false);
	});

	it('should return true for identical complex nested structures', () => {
		const obj1 = { a: 1, b: [1, 2, { c: 3 }], d: { e: [4, 5] } };
		const obj2 = { a: 1, b: [1, 2, { c: 3 }], d: { e: [4, 5] } };
		expect(isEqual(obj1, obj2)).toBe(true);
	});

	it('should return false for different complex nested structures', () => {
		const obj1 = { a: 1, b: [1, 2, { c: 3 }], d: { e: [4, 5] } };
		const obj2 = { a: 1, b: [1, 2, { c: 3 }], d: { e: [4, 6] } };
		expect(isEqual(obj1, obj2)).toBe(false);
	});

	it('should return true for identical functions', () => {
		const fn1 = function (a: number) {
			return a + 1;
		};
		const fn2 = function (a: number) {
			return a + 1;
		};
		expect(isEqual(fn1, fn2)).toBe(true);
	});

	it('should return false for different functions', () => {
		const fn1 = function (a: number) {
			return a + 1;
		};
		const fn2 = function (a: number) {
			return a + 2;
		};
		expect(isEqual(fn1, fn2)).toBe(false);
	});
});
