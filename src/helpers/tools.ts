/**
 * Throttle a given function over a given period
 * @param func - The function to throttle
 * @param timeout - Time in milliseconds to wait before allowing the next call
 * @returns A throttled version of the function
 */
export const throttle = (func: (...args: any[]) => void, timeout: number = 500) => {
	let ready = true;
	return (...args: any[]) => {
		if (!ready) return;
		ready = false;
		func(...args);
		setTimeout(() => {
			ready = true;
		}, timeout);
	};
};

/**
 * Debounce a given function to only return if stable for a given time, but always called within a max time
 * @param func - The function to debounce
 * @param wait - Time in milliseconds before considered stable
 * @param maxWait - Time in milliseconds before called regardless if stable
 * @returns A debounced version of the function
 */
export const debounce = (func: (...args: any[]) => void, wait: number = 300, maxWait: number = 1000) => {
	let timer: NodeJS.Timeout | null;
	let maxTimer: NodeJS.Timeout | null;
	return (...args: any[]) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			if (maxTimer) clearTimeout(maxTimer);
			maxTimer = null;
			func(...args);
		}, wait);
		if (maxWait && !maxTimer) {
			maxTimer = setTimeout(() => {
				if (timer) clearTimeout(timer);
				maxTimer = null;
				func(...args);
			}, maxWait);
		}
	};
};

/**
 * Check if two objects/primitives are equal
 * @param a - First object or primitive
 * @param b - Second object or primitive
 * @returns True if equal, false otherwise
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
	// Get type
	const getType = (obj: unknown) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	// Compare Arrays
	const isArraysEqual = (arr1: unknown[], arr2: unknown[]) => {
		if (arr1.length !== arr2.length) return false;
		for (let i = 0; i < arr1.length; i++) {
			if (!isEqual(arr1[i], arr2[i])) return false;
		}
		return true;
	};
	// Compare Objects
	const isObjectsEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);
		if (keys1.length !== keys2.length) return false;
		for (const key of keys1) {
			if (!Object.prototype.hasOwnProperty.call(obj2, key) || !isEqual(obj1[key], obj2[key])) return false;
		}
		return true;
	};
	// Compare Functions
	const isFunctionsEqual = (fn1: Function, fn2: Function) => fn1.toString() === fn2.toString();
	// Test
	const type = getType(a);
	if (type !== getType(b)) return false;
	if (type === 'array') return isArraysEqual(a as unknown[], b as unknown[]);
	if (type === 'object') return isObjectsEqual(a as Record<string, unknown>, b as Record<string, unknown>);
	if (type === 'function') return isFunctionsEqual(a as Function, b as Function);
	return a === b;
};
