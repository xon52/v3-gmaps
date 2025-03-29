/**
 * Custom error class for v3-gmaps library
 * Provides consistent error formatting and handling
 */
export class GmapsError extends Error {
	private readonly prefix = 'v3-gmaps :: ';

	/**
	 * Creates a new GmapsError instance
	 * @param message The error message
	 * @param options Optional Error constructor options
	 */
	constructor(message: string, options?: ErrorOptions) {
		// Automatically prefix all error messages for consistency
		const formattedMessage = message.startsWith('v3-gmaps :: ') ? message : `v3-gmaps :: ${message}`;

		super(formattedMessage, options);

		// Ensure proper prototype chain for instanceof checks
		Object.setPrototypeOf(this, GmapsError.prototype);
		this.name = 'GmapsError';
	}

	/**
	 * Static factory method for creating errors from unknown sources
	 * @param error Any error-like object or string
	 * @returns A properly formatted GmapsError
	 */
	static from(error: unknown): GmapsError {
		if (error instanceof GmapsError) {
			return error;
		}

		if (error instanceof Error) {
			return new GmapsError(error.message);
		}

		return new GmapsError(typeof error === 'string' ? error : 'Unknown error occurred');
	}
}
